import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase-server'

export async function POST(req: NextRequest, { params }: { params: { code: string } }) {
  const { name, session_id } = await req.json()
  const code = params.code.toUpperCase()
  if (!name || !session_id) return NextResponse.json({ error: 'Faltan datos' }, { status: 400 })

  const db = createServerClient()
  const { data: room } = await db.from('sl_rooms').select('status').eq('code', code).single()
  if (!room) return NextResponse.json({ error: 'Sala no encontrada' }, { status: 404 })
  if (room.status !== 'lobby') return NextResponse.json({ error: 'La partida ya comenzó' }, { status: 400 })

  const { data: existing } = await db.from('sl_players')
    .select('id').eq('room_code', code).eq('session_id', session_id).single()
  if (existing) return NextResponse.json({ code })

  const { count } = await db.from('sl_players').select('*', { count: 'exact', head: true }).eq('room_code', code)
  if ((count || 0) >= 6) return NextResponse.json({ error: 'Sala llena (máx 6)' }, { status: 400 })

  const { error } = await db.from('sl_players').insert({
    room_code: code, session_id, name: name.trim(), color_idx: count || 0, score: 0,
  })
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ code })
}
