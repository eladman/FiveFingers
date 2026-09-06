import { createClient } from '@supabase/supabase-js'

const url = import.meta.env.VITE_SUPABASE_URL
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// Surfaced by the UI if the project hasn't been configured yet.
export const isConfigured = Boolean(url && anonKey)

// The dashboard has ONE shared staff account — no per-person emails. Everyone
// who should see the leads gets the same password; the login form asks for the
// password only and signs in against this address behind the scenes.
// Rotate the password in Supabase → Authentication → Users (no code change).
// Not a secret: the account's email is visible in the bundle either way, and
// the password is what actually gates the data (RLS allows reads only to a
// logged-in session).
export const SHARED_LOGIN_EMAIL =
  import.meta.env.VITE_DASHBOARD_LOGIN_EMAIL || 'dashboard@fivefingers.co.il'

export const supabase = isConfigured
  ? createClient(url, anonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
      },
    })
  : null
