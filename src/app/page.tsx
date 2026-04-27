'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function Home() {
  const router = useRouter()
  const [mode, setMode] = useState<'home' | 'create' | 'join'>('home')
  const [name, setName] = useState('')
  const [code, setCode] = useState('')
  const [steps, setSteps] = useState(10)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  function session() {
    let s = localStorage.getItem('sl_session')
    if (!s) { s = crypto.randomUUID(); localStorage.setItem('sl_session', s) }
    return s
  }

  async function create() {
    if (!name.trim()) { setError('Ingresá tu nombre'); return }
    setLoading(true); setError('')
    const res = await fetch('/api/rooms', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: name.trim(), session_id: session(), steps_to_win: steps }),
    })
    const data = await res.json()
    if (!res.ok) { setError(data.error || 'Error'); setLoading(false); return }
    router.push(`/room/${data.code}`)
  }

  async function join() {
    if (!name.trim()) { setError('Ingresá tu nombre'); return }
    if (!code.trim()) { setError('Ingresá el código'); return }
    setLoading(true); setError('')
    const res = await fetch(`/api/rooms/${code.toUpperCase()}/join`, {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: name.trim(), session_id: session() }),
    })
    const data = await res.json()
    if (!res.ok) { setError(data.error || 'Error'); setLoading(false); return }
    router.push(`/room/${code.toUpperCase()}`)
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#FAFAF7] p-6">
      <div className="w-full max-w-sm">
        <div className="text-center mb-10">
          <h1 className="font-display text-6xl font-black text-gray-900 leading-none mb-2">
            Situación<br /><span className="text-red-500">Límite</span>
          </h1>
          <p className="text-gray-400 text-xs font-mono tracking-widest uppercase">
            El juego de los dilemas extremos
          </p>
        </div>

        {mode === 'home' && (
          <div className="space-y-3">
            <button onClick={() => setMode('create')}
              className="w-full py-4 bg-gray-900 text-white rounded-2xl font-medium text-base hover:bg-gray-800 active:scale-[.98] transition-all">
              Crear partida
            </button>
            <button onClick={() => setMode('join')}
              className="w-full py-4 bg-white text-gray-900 rounded-2xl font-medium text-base border border-gray-200 hover:bg-gray-50 active:scale-[.98] transition-all">
              Unirse con código
            </button>
          </div>
        )}

        {(mode === 'create' || mode === 'join') && (
          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 space-y-4">
            <h2 className="font-display text-2xl font-bold">
              {mode === 'create' ? 'Nueva partida' : 'Unirse a partida'}
            </h2>

            <div>
              <label className="block text-xs font-mono tracking-widest text-gray-400 uppercase mb-1.5">Tu nombre</label>
              <input value={name} onChange={e => setName(e.target.value)}
                placeholder="¿Cómo te llamás?"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:border-gray-400 text-gray-900"
                onKeyDown={e => e.key === 'Enter' && (mode === 'create' ? create() : join())} />
            </div>

            {mode === 'join' && (
              <div>
                <label className="block text-xs font-mono tracking-widest text-gray-400 uppercase mb-1.5">Código de sala</label>
                <input value={code} onChange={e => setCode(e.target.value.toUpperCase())}
                  placeholder="ABCDE" maxLength={6}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:border-gray-400 text-gray-900 font-mono text-2xl tracking-widest text-center uppercase"
                  onKeyDown={e => e.key === 'Enter' && join()} />
              </div>
            )}

            {mode === 'create' && (
              <div>
                <label className="block text-xs font-mono tracking-widest text-gray-400 uppercase mb-2">Meta de puntos</label>
                <div className="flex gap-2">
                  {[5, 10, 20].map(s => (
                    <button key={s} onClick={() => setSteps(s)}
                      className={`flex-1 py-2.5 rounded-xl text-sm font-medium transition-colors ${steps === s ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <div className="flex gap-2 pt-1">
              <button onClick={() => { setMode('home'); setError('') }}
                className="flex-1 py-3 rounded-xl border border-gray-200 text-gray-600 text-sm hover:bg-gray-50">
                Volver
              </button>
              <button onClick={mode === 'create' ? create : join} disabled={loading}
                className="flex-1 py-3 rounded-xl bg-gray-900 text-white text-sm font-medium hover:bg-gray-800 disabled:opacity-40">
                {loading ? '...' : mode === 'create' ? 'Crear' : 'Entrar'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
