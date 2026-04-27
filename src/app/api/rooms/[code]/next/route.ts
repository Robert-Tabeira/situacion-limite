import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase-server'

export async function POST(req: NextRequest, { params }: { params: { code: string } }) {
  const { session_id } = await req.json()
  const code = params.code.toUpperCase()
  const db = createServerClient()

  const { data: room } = await db.from('sl_rooms').select('*').eq('code', code).single()
  if (!room) return NextResponse.json({ error: 'Sala no encontrada' }, { status: 404 })
  if (room.phase !== 'revealing') return NextResponse.json({ error: 'Fase incorrecta' }, { status: 400 })

  void session_id // any player can trigger next round

  // Next center
  const centerOrder: string[] = room.center_order
  const nextIdx = (room.current_center_idx + 1) % centerOrder.length

  // Generate card
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || `https://${req.headers.get('host')}`
  const cardRes = await fetch(`${baseUrl}/api/card`, { method: 'POST' })
  if (!cardRes.ok) return NextResponse.json({ error: 'Error generando carta' }, { status: 500 })
  const card = await cardRes.json()

  const { error } = await db.from('sl_rooms').update({
    phase: 'picking',
    current_center_idx: nextIdx,
    round_num: room.round_num + 1,
    center_session: centerOrder[nextIdx],
    situacion: card.situacion,
    opciones: card.opciones,
    center_answer: null,
    updated_at: new Date().toISOString(),
  }).eq('code', code)

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ ok: true })
}
