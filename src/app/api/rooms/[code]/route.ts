import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase-server'
import { RoomView } from '@/lib/types'

export async function GET(req: NextRequest, { params }: { params: { code: string } }) {
  const session_id = req.nextUrl.searchParams.get('session') || ''
  const code = params.code.toUpperCase()
  const db = createServerClient()

  const [{ data: room }, { data: players }, { data: allVotes }] = await Promise.all([
    db.from('sl_rooms').select('*').eq('code', code).single(),
    db.from('sl_players').select('*').eq('room_code', code).order('joined_at'),
    db.from('sl_votes').select('*').eq('room_code', code).eq('round_num', 0),
  ])

  if (!room) return NextResponse.json({ error: 'Sala no encontrada' }, { status: 404 })

  // Fetch votes for current round
  const { data: votes } = await db
    .from('sl_votes')
    .select('session_id, chosen_option')
    .eq('room_code', code)
    .eq('round_num', room.round_num)

  // Build player list
  const playerList = (players || []).map((p: { session_id: string; name: string; color_idx: number; score: number }) => ({
    session_id: p.session_id,
    name: p.name,
    color_idx: p.color_idx,
    score: p.score,
  }))

  // Hide center_answer until revealing phase
  const revealAnswer = room.phase === 'revealing' || room.phase === 'finished'

  const view: RoomView = {
    code: room.code,
    status: room.status,
    host_session: room.host_session,
    steps_to_win: room.steps_to_win,
    round_num: room.round_num,
    phase: room.phase,
    center_session: room.center_session,
    situacion: room.situacion,
    opciones: room.opciones,
    center_answer: revealAnswer ? room.center_answer : null,
    players: playerList,
    votes: (votes || []).filter((v: { session_id: string; chosen_option: number }) => v.session_id !== room.center_session),
    my_session: session_id,
  }

  void allVotes // suppress unused

  return NextResponse.json(view)
}
