import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase-server'

export async function POST(req: NextRequest, { params }: { params: { code: string } }) {
  const { session_id } = await req.json()
  const code = params.code.toUpperCase()
  const db = createServerClient()

  const [{ data: room }, { data: players }] = await Promise.all([
    db.from('sl_rooms').select('*').eq('code', code).single(),
    db.from('sl_players').select('*').eq('room_code', code).order('joined_at'),
  ])

  if (!room) return NextResponse.json({ error: 'Sala no encontrada' }, { status: 404 })
  if (room.host_session !== session_id) return NextResponse.json({ error: 'Solo el host puede iniciar' }, { status: 403 })
  if (room.status !== 'lobby') return NextResponse.json({ error: 'La partida ya comenzó' }, { status: 400 })
  if (!players || players.length < 2) return NextResponse.json({ error: 'Necesitás al menos 2 jugadores' }, { status: 400 })

  // Generate card
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || `https://${req.headers.get('host')}`
  const cardRes = await fetch(`${baseUrl}/api/card`, { method: 'POST' })
  if (!cardRes.ok) return NextResponse.json({ error: 'Error generando carta' }, { status: 500 })
  const card = await cardRes.json()

  // Shuffle player order for centers
  const sessions = players.map((p: { session_id: string }) => p.session_id)
  const shuffled = [...sessions].sort(() => Math.random() - 0.5)

  const { error } = await db.from('sl_rooms').update({
    status: 'playing',
    phase: 'picking',
    center_order: shuffled,
    current_center_idx: 0,
    round_num: 1,
    center_session: shuffled[0],
    situacion: card.situacion,
    opciones: card.opciones,
    center_answer: null,
    updated_at: new Date().toISOString(),
  }).eq('code', code)

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ ok: true })
}
