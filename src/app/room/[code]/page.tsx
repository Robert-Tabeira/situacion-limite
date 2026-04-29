'use client'

import { useEffect, useState, useCallback, useRef } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { RoomView, PLAYER_COLORS, LETTERS } from '@/lib/types'

// ─── helpers ──────────────────────────────────────────────────────────────────
function getSession() {
  if (typeof window === 'undefined') return ''
  let s = localStorage.getItem('sl_session')
  if (!s) { s = crypto.randomUUID(); localStorage.setItem('sl_session', s) }
  return s
}

function ColorDot({ idx, size = 'md' }: { idx: number; size?: 'sm' | 'md' | 'lg' }) {
  const c = PLAYER_COLORS[idx % PLAYER_COLORS.length]
  const sz = size === 'sm' ? 'w-2.5 h-2.5' : size === 'lg' ? 'w-4 h-4' : 'w-3 h-3'
  return <span className={`inline-block rounded-full flex-shrink-0 ${sz}`} style={{ background: c.hex }} />
}

function PlayerName({ session_id, players }: { session_id: string; players: RoomView['players'] }) {
  const p = players.find(p => p.session_id === session_id)
  return <>{p?.name ?? '?'}</>
}

// ─── main component ───────────────────────────────────────────────────────────
export default function RoomPage() {
  const params = useParams()
  const router = useRouter()
  const code = (params.code as string).toUpperCase()
  const session = useRef(getSession())
  const [room, setRoom] = useState<RoomView | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [actionLoading, setActionLoading] = useState(false)
  const [selectedOption, setSelectedOption] = useState<number | null>(null)
  const [myVoteConfirmed, setMyVoteConfirmed] = useState(false)

  const fetchRoom = useCallback(async () => {
    try {
      const res = await fetch(`/api/rooms/${code}?session=${session.current}`, { cache: 'no-store' })
      if (res.status === 404) { router.push('/'); return }
      if (!res.ok) return
      const data: RoomView = await res.json()
      setRoom(prev => {
        if (prev && prev.round_num !== data.round_num) {
          setSelectedOption(null)
          setMyVoteConfirmed(false)
        }
        setMyVoteConfirmed(data.votes.some(v => v.session_id === session.current))
        return data
      })
      setError('')
    } catch {
      setError('No se pudo actualizar la sala.')
    } finally {
      setLoading(false)
    }
  }, [code, router])

  useEffect(() => {
    fetchRoom()

    // Realtime: subscribe to all changes in this room
    const ch = supabase
      .channel(`room-${code}`)
      .on('postgres_changes', { event: '*', schema: 'public', table: 'sl_rooms', filter: `code=eq.${code}` }, () => fetchRoom())
      .on('postgres_changes', { event: '*', schema: 'public', table: 'sl_players', filter: `room_code=eq.${code}` }, () => fetchRoom())
      .on('postgres_changes', { event: '*', schema: 'public', table: 'sl_votes', filter: `room_code=eq.${code}` }, () => fetchRoom())
      .subscribe()

    const interval = window.setInterval(() => {
      fetchRoom()
    }, 2500)

    return () => {
      window.clearInterval(interval)
      supabase.removeChannel(ch)
    }
  }, [code, fetchRoom])

  // ── actions ──
  async function doStart() {
    setActionLoading(true)
    try {
      const res = await fetch(`/api/rooms/${code}/start`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ session_id: session.current }),
      })
      const data = await res.json().catch(() => null)
      if (!res.ok) {
        setError(data?.error || 'No se pudo iniciar la partida.')
        return
      }
      await fetchRoom()
    } finally {
      setActionLoading(false)
    }
  }

  async function doPick(option: number) {
    if (!room || room.center_session !== session.current) return
    setActionLoading(true)
    setSelectedOption(option)
    try {
      const res = await fetch(`/api/rooms/${code}/pick`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ session_id: session.current, option }),
      })
      const data = await res.json().catch(() => null)
      if (!res.ok) {
        setError(data?.error || 'No se pudo guardar la respuesta.')
        setSelectedOption(null)
        return
      }
      await fetchRoom()
    } finally {
      setActionLoading(false)
    }
  }

  async function doVote() {
    if (selectedOption === null || !room) return
    setActionLoading(true)
    try {
      const res = await fetch(`/api/rooms/${code}/vote`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ session_id: session.current, option: selectedOption }),
      })
      const data = await res.json().catch(() => null)
      if (!res.ok) {
        setError(data?.error || 'No se pudo confirmar tu respuesta.')
        return
      }
      setMyVoteConfirmed(true)
      await fetchRoom()
    } finally {
      setActionLoading(false)
    }
  }

  async function doNext() {
    setActionLoading(true)
    try {
      const res = await fetch(`/api/rooms/${code}/next`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ session_id: session.current }),
      })
      const data = await res.json().catch(() => null)
      if (!res.ok) {
        setError(data?.error || 'No se pudo avanzar a la siguiente ronda.')
        return
      }
      await fetchRoom()
    } finally {
      setActionLoading(false)
    }
  }

  async function doReplay() {
    setActionLoading(true)
    try {
      const res = await fetch(`/api/rooms/${code}/replay`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ session_id: session.current }),
      })
      const data = await res.json().catch(() => null)
      if (!res.ok) {
        setError(data?.error || 'No se pudo reiniciar la partida.')
        return
      }
      setSelectedOption(null)
      setMyVoteConfirmed(false)
      await fetchRoom()
    } finally {
      setActionLoading(false)
    }
  }

  // ── render ──
  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <p className="font-display text-3xl font-black text-gray-800 mb-2">Situación<span className="text-red-500"> Límite</span></p>
        <p className="text-gray-400 text-sm animate-pulse">Conectando...</p>
      </div>
    </div>
  )

  if (!room) return null

  const me = room.players.find(p => p.session_id === session.current)
  const isCenter = room.center_session === session.current
  const isHost = room.host_session === session.current
  const centerPlayer = room.players.find(p => p.session_id === room.center_session)

  return (
    <div className="min-h-screen bg-[#FAFAF7] pb-10">
      {/* Top bar */}
      <div className="sticky top-0 z-10 bg-white border-b border-gray-100 px-4 py-3 flex items-center justify-between">
        <span className="font-display text-xl font-black text-gray-900">
          Situación<span className="text-red-500"> Límite</span>
        </span>
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs text-gray-400 tracking-widest">{code}</span>
          {me && <span className="flex items-center gap-1.5 text-sm font-medium text-gray-700">
            <ColorDot idx={me.color_idx} />
            {me.name}
          </span>}
        </div>
      </div>

      <div className="max-w-lg mx-auto px-4 pt-5 space-y-4">
        {error && <div className="bg-red-50 text-red-600 text-sm rounded-xl px-4 py-3">{error}</div>}

        {/* ── LOBBY ── */}
        {room.status === 'lobby' && (
          <LobbyView room={room} isHost={isHost} session={session.current} onStart={doStart} loading={actionLoading} />
        )}

        {/* ── PLAYING ── */}
        {room.status === 'playing' && room.situacion && (
          <>
            {/* Scoreboard */}
            <ScoreBoard room={room} session={session.current} />

            {/* Round info */}
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <span className="font-mono text-xs tracking-widest bg-gray-100 px-2 py-1 rounded-md">
                Ronda {room.round_num}
              </span>
              <span>·</span>
              <span>Centro:</span>
              <ColorDot idx={centerPlayer?.color_idx ?? 0} size="sm" />
              <span className="font-medium text-gray-700">{centerPlayer?.name}</span>
            </div>

            {/* Card */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
              <p className="text-[10px] font-mono tracking-widest text-gray-400 uppercase mb-3">La situación</p>
              <p className="text-gray-900 text-[15px] leading-relaxed">{room.situacion}</p>
            </div>

            {/* PICKING phase */}
            {room.phase === 'picking' && (
              <PickingPhase
                room={room} isCenter={isCenter} session={session.current}
                selected={selectedOption} onPick={doPick} loading={actionLoading}
              />
            )}

            {/* GUESSING phase */}
            {room.phase === 'guessing' && (
              <GuessingPhase
                room={room} isCenter={isCenter} session={session.current}
                selected={selectedOption} confirmed={myVoteConfirmed}
                onSelect={setSelectedOption} onConfirm={doVote} loading={actionLoading}
              />
            )}

            {/* REVEALING phase */}
            {room.phase === 'revealing' && (
              <RevealPhase
                room={room} session={session.current}
                onNext={doNext} loading={actionLoading}
              />
            )}
          </>
        )}

        {/* ── FINISHED ── */}
        {room.status === 'finished' && (
          <FinishedSummaryView
            room={room}
            session={session.current}
            onHome={() => router.push('/')}
            onReplay={doReplay}
            loading={actionLoading}
          />
        )}
      </div>
    </div>
  )
}

// ─── sub-views ────────────────────────────────────────────────────────────────

function LobbyView({ room, isHost, session, onStart, loading }: {
  room: RoomView; isHost: boolean; session: string; onStart: () => void; loading: boolean
}) {
  const link = typeof window !== 'undefined' ? `${window.location.origin}/room/${room.code}` : ''
  const [copied, setCopied] = useState(false)

  function copy() {
    navigator.clipboard.writeText(room.code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="space-y-4">
      {/* Share code */}
      <div className="bg-white rounded-2xl border border-gray-100 p-5">
        <p className="text-xs font-mono tracking-widest text-gray-400 uppercase mb-3">Código de sala</p>
        <div className="flex items-center justify-between">
          <span className="font-display text-4xl font-black tracking-widest text-gray-900">{room.code}</span>
          <button onClick={copy}
            className="text-sm px-4 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium transition-colors">
            {copied ? '¡Copiado!' : 'Copiar'}
          </button>
        </div>
        <p className="text-xs text-gray-400 mt-2 break-all">{link}</p>
      </div>

      {/* Players */}
      <div className="bg-white rounded-2xl border border-gray-100 p-5">
        <div className="flex items-center justify-between gap-3 mb-3">
          <p className="text-xs font-mono tracking-widest text-gray-400 uppercase">
            Jugadores ({room.players.length})
          </p>
          <span className="text-[10px] font-mono tracking-widest text-gray-400 uppercase">
            minimo 2, sin maximo
          </span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {room.players.map(p => (
            <div key={p.session_id} className="rounded-xl border border-gray-100 bg-gray-50/70 px-3 py-2">
              <div className="flex items-center gap-2.5">
                <ColorDot idx={p.color_idx} size="md" />
                <span className="text-sm font-medium text-gray-800 truncate">{p.name}</span>
              </div>
              <div className="mt-1.5 flex gap-2 text-[10px] font-mono tracking-widest text-gray-400 uppercase">
                {p.session_id === room.host_session && <span>host</span>}
                {p.session_id === session && <span>vos</span>}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Steps config display */}
      <div className="text-sm text-gray-500 text-center">
        Meta: <span className="font-semibold text-gray-800">{room.steps_to_win} puntos</span>
      </div>

      {isHost ? (
        <button onClick={onStart} disabled={loading || room.players.length < 2}
          className="w-full py-4 bg-gray-900 text-white rounded-2xl text-base font-medium hover:bg-gray-800 disabled:opacity-40 transition-colors active:scale-[.98]">
          {loading ? 'Iniciando...' : 'Iniciar partida'}
        </button>
      ) : (
        <div className="text-center text-sm text-gray-400 py-2 animate-pulse">
          Esperando que el host inicie la partida...
        </div>
      )}
    </div>
  )
}

function ScoreBoard({ room, session }: { room: RoomView; session: string }) {
  const sorted = [...room.players].sort((a, b) => b.score - a.score)
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-4">
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
        {sorted.map((p, index) => {
          const c = PLAYER_COLORS[p.color_idx % PLAYER_COLORS.length]
          const pct = Math.min(100, Math.round(p.score / room.steps_to_win * 100))
          return (
            <div key={p.session_id} className="rounded-xl border border-gray-100 bg-gray-50/80 px-3 py-2.5">
              <div className="flex items-center justify-between gap-2 mb-2">
                <div className="flex items-center gap-2 min-w-0">
                  <ColorDot idx={p.color_idx} size="sm" />
                  <span className="text-xs font-medium text-gray-700 truncate">
                    {p.session_id === session ? 'Vos' : p.name}
                  </span>
                </div>
                <span className="text-[10px] font-mono text-gray-400">#{index + 1}</span>
              </div>
              <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden mb-1.5">
                <div className="h-full rounded-full transition-all duration-500"
                  style={{ width: `${pct}%`, background: c.hex }} />
              </div>
              <span className="text-xs font-mono text-gray-500">{p.score}/{room.steps_to_win}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

function PickingPhase({ room, isCenter, session, selected, onPick, loading }: {
  room: RoomView; isCenter: boolean; session: string; selected: number | null
  onPick: (n: number) => void; loading: boolean
}) {
  const center = room.players.find(p => p.session_id === room.center_session)
  if (!room.opciones) return null

  if (!isCenter) return (
    <div className="bg-amber-50 border border-amber-100 rounded-2xl p-5 text-center">
      <div className="flex items-center justify-center gap-2 mb-2">
        <ColorDot idx={center?.color_idx ?? 0} />
        <span className="font-medium text-amber-900">{center?.name}</span>
      </div>
      <p className="text-sm text-amber-700">está eligiendo su respuesta en secreto...</p>
      <div className="mt-3 grid grid-cols-2 gap-2">
        {room.opciones.map((o, i) => (
          <div key={i} className="bg-amber-100/60 rounded-xl p-3 text-left opacity-60">
            <span className="text-xs font-mono text-amber-600 mr-1">{LETTERS[i]}</span>
            <span className="text-xs text-amber-800">{o}</span>
          </div>
        ))}
      </div>
    </div>
  )

  return (
    <div className="space-y-3">
      <div className="bg-blue-50 border border-blue-100 rounded-2xl px-5 py-4 text-center">
        <p className="text-blue-900 font-medium text-sm">Sos el centro esta ronda</p>
        <p className="text-blue-600 text-xs mt-1">Elegí tu respuesta. Los demás intentarán adivinar.</p>
      </div>
      <div className="grid grid-cols-1 gap-2">
        {room.opciones.map((o, i) => (
          <button key={i} onClick={() => !loading && onPick(i)}
            disabled={loading}
            className={`flex items-start gap-3 p-4 rounded-xl border text-left transition-all active:scale-[.98]
              ${selected === i
                ? 'border-gray-900 bg-gray-900 text-white'
                : 'border-gray-200 bg-white hover:border-gray-400 text-gray-800'}`}>
            <span className={`font-display text-lg font-bold flex-shrink-0 leading-none mt-0.5 ${selected === i ? 'text-white' : 'text-gray-400'}`}>
              {LETTERS[i]}
            </span>
            <span className="text-sm leading-relaxed">{o}</span>
          </button>
        ))}
      </div>
      <p className="text-xs text-center text-gray-400">
        {selected !== null ? '¡Respuesta enviada! Esperando a los demás...' : 'Tocá una opción para enviarla'}
      </p>
    </div>
  )
}

function GuessingPhase({ room, isCenter, session, selected, confirmed, onSelect, onConfirm, loading }: {
  room: RoomView; isCenter: boolean; session: string; selected: number | null
  confirmed: boolean; onSelect: (n: number) => void; onConfirm: () => void; loading: boolean
}) {
  const { players, votes, opciones } = room
  const guessersCount = players.filter(p => p.session_id !== room.center_session).length
  const confirmedCount = votes.length

  if (!opciones) return null

  const lockedCenterAnswer = selected ?? room.center_answer

  if (isCenter) return (
    <div className="space-y-3">
      <div className="bg-emerald-50 border border-emerald-100 rounded-2xl px-5 py-5 text-center">
        <p className="text-emerald-900 font-medium">Tu respuesta está bloqueada</p>
        <div className="mt-3 bg-emerald-100 rounded-xl px-4 py-3 inline-block">
          <span className="text-lg font-display font-bold text-emerald-800">{lockedCenterAnswer !== null ? LETTERS[lockedCenterAnswer] : '?'}</span>
          <span className="text-sm text-emerald-700 ml-2">{lockedCenterAnswer !== null ? opciones[lockedCenterAnswer] : 'Esperando tu eleccion...'}</span>
        </div>
        <p className="text-sm text-emerald-600 mt-3">
          {confirmedCount} de {guessersCount} jugadores confirmaron su respuesta
        </p>
        <div className="flex gap-1.5 justify-center mt-2">
          {players.filter(p => p.session_id !== room.center_session).map(p => {
            const voted = votes.some(v => v.session_id === p.session_id)
            const c = PLAYER_COLORS[p.color_idx % PLAYER_COLORS.length]
            return (
              <div key={p.session_id} className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold text-white transition-all`}
                style={{ background: voted ? c.hex : '#E5E7EB', color: voted ? 'white' : '#9CA3AF' }}
                title={p.name}>
                {voted ? '✓' : '?'}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )

  // Non-center: show voting UI + live other votes
  const myVote = votes.find(v => v.session_id === session)

  return (
    <div className="space-y-3">
      <div className="text-xs text-center text-gray-500">
        <span className="font-semibold text-gray-700">{confirmedCount}</span> de{' '}
        <span className="font-semibold text-gray-700">{guessersCount}</span> confirmaron
      </div>

      {/* Who voted for what (live) */}
      <div className="grid grid-cols-1 gap-2">
        {opciones.map((o, i) => {
          const votersHere = votes.filter(v => v.chosen_option === i)
          const iSelected = selected === i
          const iConfirmedHere = myVote?.chosen_option === i

          return (
            <button key={i} onClick={() => !confirmed && !loading && onSelect(i)}
              disabled={confirmed || loading}
              className={`flex items-start gap-3 p-4 rounded-xl border text-left transition-all active:scale-[.98]
                ${iConfirmedHere ? 'border-gray-900 bg-gray-900 text-white'
                  : iSelected && !confirmed ? 'border-gray-400 bg-gray-50'
                  : 'border-gray-200 bg-white hover:border-gray-300'}`}>
              <span className={`font-display text-lg font-bold flex-shrink-0 leading-none mt-0.5
                ${iConfirmedHere ? 'text-white' : 'text-gray-400'}`}>
                {LETTERS[i]}
              </span>
              <div className="flex-1 min-w-0">
                <p className={`text-sm leading-relaxed ${iConfirmedHere ? 'text-white' : 'text-gray-800'}`}>{o}</p>
                {/* Show who voted here (others) */}
                {votersHere.filter(v => v.session_id !== session).length > 0 && (
                  <div className="flex gap-1 mt-2 flex-wrap">
                    {votersHere.filter(v => v.session_id !== session).map(v => {
                      const vp = room.players.find(p => p.session_id === v.session_id)
                      const vc = PLAYER_COLORS[(vp?.color_idx ?? 0) % PLAYER_COLORS.length]
                      return (
                        <span key={v.session_id} className="text-[10px] px-2 py-0.5 rounded-full text-white font-medium"
                          style={{ background: vc.hex }}>
                          {vp?.name}
                        </span>
                      )
                    })}
                  </div>
                )}
              </div>
            </button>
          )
        })}
      </div>

      {!confirmed ? (
        <button onClick={onConfirm} disabled={selected === null || loading}
          className="w-full py-3.5 bg-gray-900 text-white rounded-2xl text-sm font-medium hover:bg-gray-800 disabled:opacity-40 transition-colors active:scale-[.98]">
          {loading ? 'Confirmando...' : 'Confirmar mi respuesta'}
        </button>
      ) : (
        <div className="text-center text-sm text-gray-500 py-2 animate-pulse">
          Respuesta confirmada. Esperando a los demás...
        </div>
      )}
    </div>
  )
}

function RevealPhase({ room, session, onNext, loading }: {
  room: RoomView; session: string; onNext: () => void; loading: boolean
}) {
  const { players, votes, opciones, center_answer, center_session } = room
  if (!opciones || center_answer === null) return null

  const centerPlayer = players.find(p => p.session_id === center_session)
  const allVotes = [...votes]

  // Add center's answer to display
  const winners = votes.filter(v => v.chosen_option === center_answer).map(v => v.session_id)

  return (
    <div className="space-y-3">
      {/* Center reveal banner */}
      <div className="bg-gray-900 rounded-2xl p-5 text-center">
        <p className="text-gray-400 text-xs font-mono tracking-widest uppercase mb-2">Respuesta de {centerPlayer?.name}</p>
        <div className="inline-flex items-center gap-3 bg-white/10 rounded-xl px-5 py-3">
          <span className="font-display text-3xl font-black text-white">{LETTERS[center_answer]}</span>
          <span className="text-white text-sm leading-snug">{opciones[center_answer]}</span>
        </div>
      </div>

      {/* Options with votes */}
      <div className="grid grid-cols-1 gap-2">
        {opciones.map((o, i) => {
          const isCorrect = i === center_answer
          const votersHere = allVotes.filter(v => v.chosen_option === i)

          return (
            <div key={i} className={`flex items-start gap-3 p-4 rounded-xl border
              ${isCorrect ? 'border-emerald-300 bg-emerald-50' : 'border-gray-100 bg-white opacity-60'}`}>
              <span className={`font-display text-lg font-bold flex-shrink-0 leading-none mt-0.5
                ${isCorrect ? 'text-emerald-600' : 'text-gray-400'}`}>
                {LETTERS[i]}{isCorrect ? ' ✓' : ''}
              </span>
              <div className="flex-1">
                <p className={`text-sm leading-relaxed ${isCorrect ? 'text-emerald-900 font-medium' : 'text-gray-600'}`}>{o}</p>
                {votersHere.length > 0 && (
                  <div className="flex gap-1 mt-2 flex-wrap">
                    {votersHere.map(v => {
                      const vp = players.find(p => p.session_id === v.session_id)
                      const vc = PLAYER_COLORS[(vp?.color_idx ?? 0) % PLAYER_COLORS.length]
                      const correct = i === center_answer
                      return (
                        <span key={v.session_id} className="text-[10px] px-2 py-0.5 rounded-full text-white font-medium"
                          style={{ background: vc.hex }}>
                          {vp?.name} {correct ? '+1' : ''}
                        </span>
                      )
                    })}
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>

      {/* Winners summary */}
      {winners.length > 0 ? (
        <div className="bg-emerald-50 border border-emerald-100 rounded-xl px-4 py-3 text-sm text-emerald-800">
          <span className="font-semibold">¡Acertaron! </span>
          {winners.map(sid => players.find(p => p.session_id === sid)?.name).join(', ')} ganaron 1 punto.
        </div>
      ) : (
        <div className="bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-sm text-gray-500 text-center">
          Nadie acertó esta vez.
        </div>
      )}

      <button onClick={onNext} disabled={loading}
        className="w-full py-4 bg-gray-900 text-white rounded-2xl text-base font-medium hover:bg-gray-800 disabled:opacity-40 transition-colors active:scale-[.98]">
        {loading ? 'Cargando...' : 'Siguiente ronda →'}
      </button>
    </div>
  )
}

function FinishedSummaryView({ room, session, onHome, onReplay, loading }: {
  room: RoomView
  session: string
  onHome: () => void
  onReplay: () => void
  loading: boolean
}) {
  const sorted = [...room.players].sort((a, b) => b.score - a.score)
  const winner = sorted[0]
  const isHost = room.host_session === session
  const podium = sorted.slice(0, 3)
  const lastPlayer = sorted[sorted.length - 1]
  const wildCard = sorted[Math.floor(sorted.length / 2)]
  const awards = [
    {
      label: 'Mente maestra',
      player: winner,
      detail: `Cerró la partida con ${winner.score} puntos.`,
    },
    {
      label: 'Casi leyenda',
      player: sorted[1] ?? winner,
      detail: sorted[1]
        ? `Terminó muy cerca con ${sorted[1].score} puntos.`
        : 'Fue la referencia del resto de la sala.',
    },
    {
      label: 'Agente del caos',
      player: wildCard,
      detail: wildCard.session_id === winner.session_id
        ? 'Ganó y aun así dejó una partida impredecible.'
        : 'Se movió por la tabla y mantuvo el caos vivo.',
    },
    {
      label: 'Resistencia total',
      player: lastPlayer,
      detail: lastPlayer.session_id === winner.session_id
        ? 'Dominó la partida de principio a fin.'
        : 'Siguió peleando hasta el cierre de la sala.',
    },
  ]

  return (
    <div className="space-y-4">
      <div className="bg-gray-900 rounded-3xl p-8 text-center relative overflow-hidden">
        <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-white/10 to-transparent" />
        <p className="relative text-gray-400 text-xs font-mono tracking-widest uppercase mb-1">Ganador</p>
        <div className="relative flex items-center justify-center gap-2 mb-1">
          <ColorDot idx={winner.color_idx} size="lg" />
          <span className="font-display text-3xl font-black text-white">{winner.name}</span>
        </div>
        <span className="relative text-gray-400 text-sm">{winner.score} puntos</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {podium.map((player, index) => {
          const medal = index === 0 ? '1' : index === 1 ? '2' : '3'
          const medalBg = index === 0 ? '#FEF3C7' : index === 1 ? '#F3F4F6' : '#FCE7F3'
          const medalColor = index === 0 ? '#92400E' : index === 1 ? '#374151' : '#9D174D'
          return (
            <div key={player.session_id} className="rounded-2xl border border-gray-100 bg-white p-4 text-center">
              <div
                className="mx-auto mb-2 flex h-9 w-9 items-center justify-center rounded-full text-sm font-mono font-bold"
                style={{ background: medalBg, color: medalColor }}
              >
                {medal}
              </div>
              <div className="mb-2 flex items-center justify-center gap-2">
                <ColorDot idx={player.color_idx} size="sm" />
                <span className="text-sm font-semibold text-gray-800">
                  {player.name} {player.session_id === session && <span className="text-gray-400 font-normal">(vos)</span>}
                </span>
              </div>
              <p className="text-[10px] font-mono tracking-widest text-gray-400 uppercase">Puntaje final</p>
              <p className="mt-1 text-lg font-bold text-gray-900">{player.score}</p>
            </div>
          )
        })}
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 p-5">
        <p className="text-xs font-mono tracking-widest text-gray-400 uppercase mb-3">Tabla final</p>
        {sorted.map((p, i) => {
          const c = PLAYER_COLORS[p.color_idx % PLAYER_COLORS.length]
          return (
            <div key={p.session_id} className="flex items-center gap-3 py-2.5 border-b border-gray-50 last:border-0">
              <span className="text-sm font-mono text-gray-400 w-4">{i + 1}</span>
              <ColorDot idx={p.color_idx} />
              <span className="flex-1 text-sm font-medium text-gray-800">
                {p.name} {p.session_id === session && <span className="text-gray-400 font-normal">(vos)</span>}
              </span>
              <span className="font-mono text-sm font-bold" style={{ color: c.hex }}>{p.score}</span>
            </div>
          )
        })}
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 p-5">
        <p className="text-xs font-mono tracking-widest text-gray-400 uppercase mb-3">Premios de la sala</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {awards.map(award => (
            <div key={`${award.label}-${award.player.session_id}`} className="rounded-xl border border-gray-100 bg-gray-50/80 p-3">
              <p className="text-[10px] font-mono tracking-widest text-gray-400 uppercase mb-1">{award.label}</p>
              <div className="flex items-center gap-2 mb-1">
                <ColorDot idx={award.player.color_idx} size="sm" />
                <span className="text-sm font-semibold text-gray-800">
                  {award.player.name} {award.player.session_id === session && <span className="text-gray-400 font-normal">(vos)</span>}
                </span>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed">{award.detail}</p>
            </div>
          ))}
        </div>
      </div>

      {room.round_history.length > 0 && (
        <div className="bg-white rounded-2xl border border-gray-100 p-5">
          <p className="text-xs font-mono tracking-widest text-gray-400 uppercase mb-3">Historial de rondas</p>
          <div className="space-y-3">
            {[...room.round_history].reverse().map(round => {
              const centerAnswerLabel = round.opciones[round.center_answer] || ''
              const winnerNames = round.winners
                .map(sid => room.players.find(player => player.session_id === sid)?.name)
                .filter(Boolean) as string[]

              return (
                <div key={`round-${round.round_num}`} className="rounded-xl border border-gray-100 bg-gray-50/80 p-4">
                  <div className="flex items-center justify-between gap-3 mb-2">
                    <span className="text-[10px] font-mono tracking-widest text-gray-400 uppercase">
                      Ronda {round.round_num}
                    </span>
                    <span className="text-xs text-gray-500">
                      Centro: <span className="font-medium text-gray-700">{round.center_name}</span>
                    </span>
                  </div>
                  <p className="text-sm text-gray-800 leading-relaxed mb-3">{round.situacion}</p>
                  <div className="rounded-lg bg-white border border-gray-100 px-3 py-2 mb-3">
                    <p className="text-[10px] font-mono tracking-widest text-gray-400 uppercase mb-1">Respuesta real</p>
                    <p className="text-sm font-medium text-gray-800">
                      {LETTERS[round.center_answer]}. {centerAnswerLabel}
                    </p>
                  </div>
                  <p className="text-sm text-gray-600">
                    {winnerNames.length > 0
                      ? `${winnerNames.join(', ')} acertaron y sumaron 1 punto.`
                      : 'Nadie acertó en esta ronda.'}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {isHost ? (
        <button onClick={onReplay} disabled={loading}
          className="w-full py-4 bg-gray-900 text-white rounded-2xl text-base font-medium hover:bg-gray-800 disabled:opacity-40 transition-colors active:scale-[.98]">
          {loading ? 'Preparando revancha...' : 'Jugar otra partida'}
        </button>
      ) : (
        <div className="text-center text-sm text-gray-400 py-2 animate-pulse">
          Esperando que el host prepare otra partida...
        </div>
      )}

      <button onClick={onHome}
        className="w-full py-4 bg-white border border-gray-200 text-gray-700 rounded-2xl text-base font-medium hover:bg-gray-50 transition-colors active:scale-[.98]">
        Volver al inicio
      </button>
    </div>
  )
}

function FinishedView({ room, session, onHome, onReplay, loading }: {
  room: RoomView
  session: string
  onHome: () => void
  onReplay: () => void
  loading: boolean
}) {
  const sorted = [...room.players].sort((a, b) => b.score - a.score)
  const winner = sorted[0]
  const isHost = room.host_session === session

  return (
    <div className="space-y-4">
      <div className="bg-gray-900 rounded-3xl p-8 text-center">
        <div className="text-5xl mb-3">🏆</div>
        <p className="text-gray-400 text-xs font-mono tracking-widest uppercase mb-1">Ganador</p>
        <div className="flex items-center justify-center gap-2 mb-1">
          <ColorDot idx={winner.color_idx} size="lg" />
          <span className="font-display text-3xl font-black text-white">{winner.name}</span>
        </div>
        <span className="text-gray-400 text-sm">{winner.score} puntos</span>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 p-5">
        <p className="text-xs font-mono tracking-widest text-gray-400 uppercase mb-3">Tabla final</p>
        {sorted.map((p, i) => {
          const c = PLAYER_COLORS[p.color_idx % PLAYER_COLORS.length]
          return (
            <div key={p.session_id} className="flex items-center gap-3 py-2.5 border-b border-gray-50 last:border-0">
              <span className="text-sm font-mono text-gray-400 w-4">{i + 1}</span>
              <ColorDot idx={p.color_idx} />
              <span className="flex-1 text-sm font-medium text-gray-800">
                {p.name} {p.session_id === session && <span className="text-gray-400 font-normal">(vos)</span>}
              </span>
              <span className="font-mono text-sm font-bold" style={{ color: c.hex }}>{p.score}</span>
            </div>
          )
        })}
      </div>

      {isHost ? (
        <button onClick={onReplay} disabled={loading}
          className="w-full py-4 bg-gray-900 text-white rounded-2xl text-base font-medium hover:bg-gray-800 disabled:opacity-40 transition-colors active:scale-[.98]">
          {loading ? 'Preparando revancha...' : 'Jugar otra partida'}
        </button>
      ) : (
        <div className="text-center text-sm text-gray-400 py-2 animate-pulse">
          Esperando que el host prepare otra partida...
        </div>
      )}

      <button onClick={onHome}
        className="w-full py-4 bg-white border border-gray-200 text-gray-700 rounded-2xl text-base font-medium hover:bg-gray-50 transition-colors active:scale-[.98]">
        Volver al inicio
      </button>
    </div>
  )
}
