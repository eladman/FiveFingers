import { useState } from 'react'
import { supabase } from './supabaseClient.js'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setLoading(true)
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    setLoading(false)
    if (error) {
      setError('פרטי ההתחברות שגויים. בדקו את המייל והסיסמה ונסו שוב.')
    }
    // On success, onAuthStateChange in Dashboard swaps the view.
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
          <h1 className="text-2xl font-bold text-navy">לוח בקרה</h1>
          <p className="text-sm text-navy/50 mt-2">התחברות לחברי צוות בלבד</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Field label="מייל">
            <input
              type="email"
              required
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="dash-input"
              placeholder="name@fivefingers.co.il"
            />
          </Field>
          <Field label="סיסמה">
            <input
              type="password"
              required
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="dash-input"
              placeholder="••••••••"
            />
          </Field>

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

function Field({ label, children }) {
  return (
    <label className="block">
      <span className="block text-sm font-semibold text-navy/70 mb-1.5">{label}</span>
      {children}
    </label>
  )
}
