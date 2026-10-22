import { useState } from 'react'
import { supabase, SHARED_LOGIN_EMAIL } from './supabaseClient.js'

// Shared by the dashboard and the lectures page (src/lectures/) — each passes
// its own Supabase client + shared account email.
export default function Login({ client = supabase, email = SHARED_LOGIN_EMAIL, title = 'לוח בקרה' }) {
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setLoading(true)
    // One shared staff account — the email is fixed, only the password is typed.
    const { error } = await client.auth.signInWithPassword({
      email,
      password,
    })
    setLoading(false)
    if (error) {
      setError('הסיסמה שגויה. נסו שוב.')
    }
    // On success, the parent's onAuthStateChange swaps the view.
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-surface px-4">
      <div
        className="w-full max-w-md bg-white rounded-[24px] border border-line p-8 sm:p-10"
        style={{ boxShadow: 'var(--shadow-lg)' }}
      >
        <div className="text-center mb-8">
          <img src="/logo.png" alt="חמש אצבעות" className="h-12 mx-auto mb-5" />
          <div className="ds-eyebrow text-orange-ink mb-1">אזור צוות</div>
          <h1 className="text-2xl font-bold text-navy">{title}</h1>
          <p className="text-sm text-navy/50 mt-2">הזינו את סיסמת הצוות</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="block">
            <span className="block text-sm font-semibold text-navy/70 mb-1.5">סיסמה</span>
            <input
              type="password"
              required
              autoFocus
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="dash-input"
              placeholder="••••••••"
            />
          </label>

          {error && (
            <div className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-xl px-4 py-3">
              {error}
            </div>
          )}

          <button type="submit" disabled={loading} className="dash-btn-primary w-full mt-2">
            {loading ? 'מתחבר…' : 'כניסה'}
          </button>
        </form>
      </div>
    </div>
  )
}
