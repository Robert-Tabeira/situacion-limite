import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase-server'

export async function POST(req: NextRequest, { params }: { params: { code: string } }) {
  const { session_id, option } = await req.json()
  const code = params.code.toUpperCase()
  if (typeof option !== 'number' || option < 0 || option > 3)
    return NextResponse.json({ error: 'Opción inválida' }, { status: 400 })

  const db = createServerClient()
  const { data: room } = await db.from('sl_rooms').select('*').eq('code', code).single()
  if (!room) return NextResponse.json({ error: 'Sala no encontrada' }, { status: 404 })
  if (room.phase !== 'guessing') return NextResponse.json({ error: 'No es momento de adivinar' }, { status: 400 })
  if (room.center_session === session_id) return NextResponse.json({ error: 'El centro no vota' }, { status: 403 })

  // Upsert vote
  const { error: voteErr } = await db.from('sl_votes').upsert(
    { room_code: code, round_num: room.round_num, session_id, chosen_option: option },
    { onConflict: 'room_code,round_num,session_id' }
  )
  if (voteErr) return NextResponse.json({ error: voteErr.message }, { status: 500 })

  // Check if all non-center players voted
  const { data: players } = await db.from('sl_players').select('session_id').eq('room_code', code)
  const guessers = (players || []).filter((p: { session_id: string }) => p.session_id !== room.center_session)
  const { data: votes } = await db.from('sl_votes').select('session_id')
    .eq('room_code', code).eq('round_num', room.round_num)
  const votedSet = new Set((votes || []).map((v: { session_id: string }) => v.session_id))
  const allVoted = guessers.every((p: { session_id: string }) => votedSet.has(p.session_id))

  if (allVoted) {
    // Get all votes with chosen option
    const { data: allVotes } = await db.from('sl_votes').select('session_id, chosen_option')
      .eq('room_code', code).eq('round_num', room.round_num)
    const winners = (allVotes || [])
      .filter((v: { chosen_option: number }) => v.chosen_option === room.center_answer)
      .map((v: { session_id: string }) => v.session_id)

    // Award points
    const { data: currentPlayers } = await db.from('sl_players').select('*').eq('room_code', code)
    for (const p of (currentPlayers || [])) {
      if (winners.includes(p.session_id)) {
        await db.from('sl_players').update({ score: p.score + 1 })
          .eq('room_code', code).eq('session_id', p.session_id)
      }
    }

    // Check win
    const { data: updated } = await db.from('sl_players').select('score').eq('room_code', code)
    const hasWinner = (updated || []).some((p: { score: number }) => p.score >= room.steps_to_win)

    const centerPlayer = (currentPlayers || []).find((player: { session_id: string; name: string }) => player.session_id === room.center_session)
    const roundHistory = Array.isArray(room.round_history) ? room.round_history : []
    const historyEntry = {
      round_num: room.round_num,
      center_session: room.center_session,
      center_name: centerPlayer?.name || 'Centro',
      situacion: room.situacion || '',
      opciones: Array.isArray(room.opciones) ? room.opciones : [],
      center_answer: room.center_answer,
      winners,
    }

    await db.from('sl_rooms').update({
      phase: hasWinner ? 'finished' : 'revealing',
      status: hasWinner ? 'finished' : 'playing',
      round_history: [...roundHistory, historyEntry],
      updated_at: new Date().toISOString(),
    }).eq('code', code)
  }

  return NextResponse.json({ ok: true, all_voted: allVoted })
}
