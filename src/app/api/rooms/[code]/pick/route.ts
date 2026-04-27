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
  if (room.phase !== 'picking') return NextResponse.json({ error: 'No es momento de elegir' }, { status: 400 })
  if (room.center_session !== session_id) return NextResponse.json({ error: 'No sos el centro esta ronda' }, { status: 403 })

  const { error } = await db.from('sl_rooms').update({
    center_answer: option,
    phase: 'guessing',
    updated_at: new Date().toISOString(),
  }).eq('code', code)

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ ok: true })
}
