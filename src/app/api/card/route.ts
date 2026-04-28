import { NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'
import { getFallbackCard } from '@/lib/cards'

const aiCardsEnabled = process.env.ENABLE_AI_CARDS === 'true'
const client = aiCardsEnabled && process.env.ANTHROPIC_API_KEY
  ? new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })
  : null

const SYSTEM = `Eres el generador de cartas del juego de mesa "Situación Límite".
Genera una tarjeta apropiada para mayores de 14 años.

FORMATO — Solo JSON válido, sin markdown ni backticks:
{
  "situacion": "Situación en segunda persona, presente (máx 55 palabras, tono directo e incómodo)",
  "opciones": ["Opción A", "Opción B", "Opción C", "Opción D"]
}

REGLAS:
- La situación debe ser incómoda, divertida o emocionalmente desafiante
- Las 4 opciones representan personalidades distintas: valiente, cobarde, graciosa, práctica
- Ninguna opción debe ser claramente "correcta" — todas plausibles
- Varía temas: vergüenza pública, dilemas morales, decisiones sociales, presión, secretos
- Cada opción máx 12 palabras
- Idioma: Español rioplatense (Argentina/Uruguay)
- SOLO JSON, nada más`

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}))
  const excludeSituations = Array.isArray(body?.excludeSituations)
    ? body.excludeSituations.filter((value: unknown): value is string => typeof value === 'string')
    : []

  if (!client) {
    return NextResponse.json(getFallbackCard(excludeSituations))
  }

  try {
    const msg = await client.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 400,
      system: SYSTEM,
      messages: [{
        role: 'user',
        content: `Genera una carta nueva. Tema variado y original. Evita repetir o parecerte demasiado a estas situaciones ya usadas: ${excludeSituations.join(' | ') || 'ninguna'}.`,
      }],
    })

    const raw = msg.content.map(b => (b.type === 'text' ? b.text : '')).join('')
    const card = JSON.parse(raw.replace(/```json|```/g, '').trim())

    if (!card.situacion || !Array.isArray(card.opciones) || card.opciones.length !== 4) {
      throw new Error('Invalid card format')
    }

    return NextResponse.json(card)
  } catch (e) {
    console.warn('AI card generation failed, using fallback card instead.')
    return NextResponse.json(getFallbackCard(excludeSituations))
  }
}
