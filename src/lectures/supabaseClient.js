import { createClient } from '@supabase/supabase-js'

const url = import.meta.env.VITE_SUPABASE_URL
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const isConfigured = Boolean(url && anonKey)

// Amir's assistant has her own shared account (not the dashboard's), so she can
// manage lectures without seeing the website's contact leads — RLS in
// supabase/lectures.sql keys access off this email. Password lives only in
// Supabase → Authentication → Users.
export const LECTURES_LOGIN_EMAIL =
  import.meta.env.VITE_LECTURES_LOGIN_EMAIL || 'lectures@fivefingers.co.il'

// Own storageKey: the dashboard and this page share an origin, and the default
// key would make one login silently replace the other.
export const supabase = isConfigured
  ? createClient(url, anonKey, {
      auth: { persistSession: true, autoRefreshToken: true, storageKey: 'ff-lectures-auth' },
    })
  : null
