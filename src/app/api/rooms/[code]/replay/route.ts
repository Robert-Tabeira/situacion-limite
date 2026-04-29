import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase-server'

export async function POST(req: NextRequest, { params }: { params: { code: string } }) {
  const { session_id } = await req.json()
  const code = params.code.toUpperCase()
  const db = createServerClient()

  const [{ data: room }, { data: players }] = await Promise.all([
    db.from('sl_rooms').select('*').eq('code', code).single(),
    db.from('sl_players').select('session_id').eq('room_code', code).order('joined_at'),
  ])

  if (!room) return NextResponse.json({ error: 'Sala no encontrada' }, { status: 404 })
  if (room.host_session !== session_id) return NextResponse.json({ error: 'Solo el host puede reiniciar' }, { status: 403 })
  if (!players || players.length < 2) return NextResponse.json({ error: 'Necesitás al menos 2 jugadores' }, { status: 400 })

  const playerSessions = players.map((player: { session_id: string }) => player.session_id)

  const [deleteVotes, resetScores, resetRoom] = await Promise.all([
    db.from('sl_votes').delete().eq('room_code', code),
    db.from('sl_players').update({ score: 0 }).eq('room_code', code),
    db.from('sl_rooms').update({
      status: 'lobby',
      phase: 'waiting',
      round_num: 0,
      center_order: [],
      used_cards: [],
      current_center_idx: 0,
      center_session: null,
      center_answer: null,
      situacion: null,
      opciones: null,
      updated_at: new Date().toISOString(),
    }).eq('code', code),
  ])

  if (deleteVotes.error) return NextResponse.json({ error: deleteVotes.error.message }, { status: 500 })
  if (resetScores.error) return NextResponse.json({ error: resetScores.error.message }, { status: 500 })
  if (resetRoom.error) return NextResponse.json({ error: resetRoom.error.message }, { status: 500 })

  return NextResponse.json({ ok: true, players: playerSessions.length })
}
