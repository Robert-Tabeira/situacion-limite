import { createClient } from '@supabase/supabase-js'

function decodeSupabaseRole(jwt: string) {
  try {
    const [, payload] = jwt.split('.')
    if (!payload) return 'unknown'

    const normalized = payload.replace(/-/g, '+').replace(/_/g, '/')
    const padded = normalized.padEnd(normalized.length + ((4 - normalized.length % 4) % 4), '=')
    const json = Buffer.from(padded, 'base64').toString('utf8')
    const data = JSON.parse(json) as { role?: string }
    return data.role || 'unknown'
  } catch {
    return 'unknown'
  }
}

export function createServerClient() {
  const url = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL
  const serviceKey = process.env.SUPABASE_SERVICE_KEY

  if (!url) {
    throw new Error('Missing SUPABASE_URL or NEXT_PUBLIC_SUPABASE_URL')
  }

  if (!serviceKey) {
    throw new Error('Missing SUPABASE_SERVICE_KEY')
  }

  const keyRole = decodeSupabaseRole(serviceKey)
  if (keyRole !== 'service_role') {
    throw new Error(`SUPABASE_SERVICE_KEY has role "${keyRole}", expected "service_role"`)
  }

  return createClient(
    url,
    serviceKey,
    {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    }
  )
}
