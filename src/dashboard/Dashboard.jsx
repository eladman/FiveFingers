import { useEffect, useState } from 'react'
import { supabase, isConfigured } from './supabaseClient.js'
import Login from './Login.jsx'
import Submissions from './Submissions.jsx'
import Traffic from './Traffic.jsx'

export default function Dashboard() {
  const [session, setSession] = useState(null)
  const [ready, setReady] = useState(false)
  const [tab, setTab] = useState('submissions')

  useEffect(() => {
    if (!isConfigured) {
      setReady(true)
      return
    }
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session)
      setReady(true)
    })
    const { data: sub } = supabase.auth.onAuthStateChange((_event, s) => {
      setSession(s)
    })
    return () => sub.subscription.unsubscribe()
  }, [])

  if (!isConfigured) return <NotConfigured />
  if (!ready) return <Splash />
  if (!session) return <Login />

  return (
    <div className="min-h-screen bg-surface text-navy">
      <Header tab={tab} setTab={setTab} />
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        {tab === 'submissions' ? <Submissions /> : <Traffic />}
      </main>
    </div>
  )
}

function Header({ tab, setTab }) {
  const tabs = [
    { id: 'submissions', label: 'פניות' },
    { id: 'traffic', label: 'תנועה באתר' },
  ]
  return (
    <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-xl border-b border-line">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <img src="/logo.png" alt="חמש אצבעות" className="h-8" />
          <span className="font-bold text-navy hidden sm:inline">לוח בקרה</span>
        </div>

        <nav className="flex items-center gap-1 bg-surface-2 rounded-full p-1">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-colors ${
                tab === t.id ? 'bg-white text-navy shadow-sm' : 'text-navy/50 hover:text-navy'
              }`}
            >
              {t.label}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <span className="text-sm text-navy/50 hidden md:inline">אזור צוות</span>
          <button
            onClick={() => supabase.auth.signOut()}
            className="text-sm font-semibold text-navy/60 hover:text-orange-ink transition-colors"
          >
            התנתקות
          </button>
        </div>
      </div>
    </header>
  )
}

function Splash() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-surface">
      <div className="text-navy/40 text-sm animate-pulse">טוען…</div>
    </div>
  )
}

function NotConfigured() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-surface px-4">
      <div className="dash-card max-w-lg p-8 text-center">
        <h1 className="text-xl font-bold text-navy mb-3">הלוח עדיין לא מוגדר</h1>
        <p className="text-sm text-navy/60 leading-relaxed">
          חסרים משתני הסביבה של Supabase. הוסיפו{' '}
          <code className="font-mono text-orange-ink">VITE_SUPABASE_URL</code> ו־
          <code className="font-mono text-orange-ink">VITE_SUPABASE_ANON_KEY</code> לקובץ{' '}
          <code className="font-mono">.env</code>, ובנו מחדש.
        </p>
      </div>
    </div>
  )
}
