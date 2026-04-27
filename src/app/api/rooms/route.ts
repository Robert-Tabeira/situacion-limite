import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase-server'

function makeCode(len = 5) {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
  return Array.from({ length: len }, () => chars[Math.floor(Math.random() * chars.length)]).join('')
}

export async function POST(req: NextRequest) {
  const { name, session_id, steps_to_win = 10 } = await req.json()
  if (!name || !session_id) return NextResponse.json({ error: 'Faltan datos' }, { status: 400 })

  const db = createServerClient()

  // Generate unique code
  let code = ''
  for (let i = 0; i < 10; i++) {
    code = makeCode()
    const { data } = await db.from('sl_rooms').select('code').eq('code', code).single()
    if (!data) break
  }

  const { error: roomErr } = await db.from('sl_rooms').insert({
    code, host_session: session_id, steps_to_win,
    status: 'lobby', phase: 'waiting',
  })
  if (roomErr) return NextResponse.json({ error: roomErr.message }, { status: 500 })

  const { error: playerErr } = await db.from('sl_players').insert({
    room_code: code, session_id, name: name.trim(), color_idx: 0, score: 0,
  })
  if (playerErr) return NextResponse.json({ error: playerErr.message }, { status: 500 })

  return NextResponse.json({ code })
}
