import { useCallback, useEffect, useState } from 'react'
import { Plus, Copy, Check, ExternalLink, Pencil, Eye } from 'lucide-react'
import { supabase, isConfigured, SHARED_LOGIN_EMAIL } from '../dashboard/supabaseClient.js'
import Login from '../dashboard/Login.jsx'
import NewsletterEditor from './NewsletterEditor.jsx'
import { fetchNewsletters, createNewsletter, updateNewsletter, deleteNewsletter, shareUrl, whatsappUrl } from './data'

/**
 * /newslaterprep — staff upload a finished HTML newsletter (e.g. a Claude
 * artifact) and get a link to send to parents and students:
 * /newsletter/<slug>. Same staff login as the dashboard.
 * Route lives in the query string (?new, ?edit=<id>) like /lectures.
 */
export default function NewslettersApp() {
  const [session, setSession] = useState(null)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    if (!isConfigured) return setReady(true)
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session)
      setReady(true)
    })
    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => setSession(s))
    return () => sub.subscription.unsubscribe()
  }, [])

  if (!isConfigured) return <Centered>חסרים משתני הסביבה של Supabase (VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY).</Centered>
  if (!ready) return <Centered pulse>טוען…</Centered>
  if (!session) return <Login client={supabase} email={SHARED_LOGIN_EMAIL} title="הכנת ניוזלטר" />
  return <Workspace />
}

function readRoute() {
  const p = new URLSearchParams(location.search)
  if (p.has('new')) return { view: 'new' }
  if (p.get('edit')) return { view: 'edit', id: p.get('edit') }
  return { view: 'list' }
}

function writeRoute(r) {
  const qs = r.view === 'new' ? '?new' : r.view === 'edit' ? `?edit=${r.id}` : ''
  history.pushState(null, '', qs || location.pathname)
}

function Workspace() {
  const [route, setRouteState] = useState(readRoute)
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [justSaved, setJustSaved] = useState(null)

  const go = useCallback((r) => {
    writeRoute(r)
    setRouteState(r)
    window.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    const onPop = () => setRouteState(readRoute())
    window.addEventListener('popstate', onPop)
    return () => window.removeEventListener('popstate', onPop)
  }, [])

  const load = useCallback(async () => {
    setError('')
    const res = await fetchNewsletters()
    if (res.error) setError('שגיאה בטעינת הנתונים: ' + res.error.message)
    setItems(res.data)
    setLoading(false)
  }, [])

  useEffect(() => {
    load()
  }, [load])

  const current = items.find((n) => n.id === route.id)
  const taken = (slug, exceptId) => items.some((n) => n.slug === slug && n.id !== exceptId)

  let body
  if (loading) body = <Centered pulse inline>טוען…</Centered>
  else if (route.view === 'new') {
    body = (
      <NewsletterEditor
        isTaken={(s) => taken(s)}
        onCancel={() => go({ view: 'list' })}
        onSave={async (fields) => {
          const res = await createNewsletter(fields)
          if (res.error) return res
          setItems((ns) => [res.data, ...ns])
          setJustSaved(res.data.id)
          go({ view: 'list' })
        }}
      />
    )
  } else if (route.view === 'edit' && !current) {
    body = <Centered inline>הניוזלטר לא נמצא. <button className="mr-2 font-bold text-orange-ink underline" onClick={() => go({ view: 'list' })}>לכל הניוזלטרים</button></Centered>
  } else if (route.view === 'edit') {
    body = (
      <NewsletterEditor
        key={current.id}
        newsletter={current}
        isTaken={(s) => taken(s, current.id)}
        onCancel={() => go({ view: 'list' })}
        onSave={async (fields) => {
          const res = await updateNewsletter(current.id, fields)
          if (res.error) return res
          setItems((ns) => ns.map((n) => (n.id === current.id ? res.data : n)))
          setJustSaved(current.id)
          go({ view: 'list' })
        }}
        onDelete={async () => {
          const res = await deleteNewsletter(current.id)
          if (res.error) return setError('המחיקה לא הצליחה: ' + res.error.message)
          setItems((ns) => ns.filter((n) => n.id !== current.id))
          go({ view: 'list' })
        }}
      />
    )
  } else {
    body = <List items={items} justSaved={justSaved} onNew={() => go({ view: 'new' })} onEdit={(id) => go({ view: 'edit', id })} />
  }

  return (
    <div className="min-h-screen bg-surface text-navy" dir="rtl">
      <header className="sticky top-0 z-30 border-b border-line bg-white/80 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
          <button onClick={() => go({ view: 'list' })} className="flex items-center gap-3">
            <img src="/logo.png" alt="חמש אצבעות" className="h-8" />
            <span className="font-bold">ניוזלטר</span>
          </button>
          <div className="flex items-center gap-4">
            <button onClick={load} className="hidden text-sm font-semibold text-navy/60 hover:text-orange-ink sm:inline">רענון</button>
            <button onClick={() => supabase.auth.signOut()} className="text-sm font-semibold text-navy/60 transition-colors hover:text-orange-ink">
              התנתקות
            </button>
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        {error && <p className="mb-6 rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-600">{error}</p>}
        {body}
      </main>
    </div>
  )
}

function List({ items, justSaved, onNew, onEdit }) {
  return (
    <div>
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="ds-eyebrow mb-2 text-orange-ink">להורים ולחניכים</p>
          <h1 className="text-3xl font-bold">ניוזלטרים</h1>
        </div>
        <button onClick={onNew} className="dash-btn-primary">
          <Plus size={18} /> ניוזלטר חדש
        </button>
      </div>

      {items.length === 0 ? (
        <div className="dash-card px-6 py-16 text-center">
          <p className="text-lg font-bold">עוד אין ניוזלטרים</p>
          <p className="mx-auto mt-2 max-w-md text-sm text-navy/60">
            מעלים קובץ HTML (למשל ארטיפקט מ-Claude), מקבלים קישור, ושולחים אותו להורים ולחניכים.
          </p>
          <button onClick={onNew} className="dash-btn-primary mt-6">
            <Plus size={18} /> ניוזלטר ראשון
          </button>
        </div>
      ) : (
        <ul className="grid gap-4">
          {items.map((n) => (
            <Row key={n.id} n={n} highlight={n.id === justSaved} onEdit={() => onEdit(n.id)} />
          ))}
        </ul>
      )}
    </div>
  )
}

function Row({ n, highlight, onEdit }) {
  const [copied, setCopied] = useState(false)
  const link = shareUrl(n.slug)

  async function copy() {
    try {
      await navigator.clipboard.writeText(link)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch {
      window.prompt('העתיקו את הקישור:', link)
    }
  }

  return (
    <li className={`dash-card p-5 sm:p-6 ${highlight ? 'nl-saved' : ''}`}>
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="text-lg font-bold leading-snug">{n.title}</h2>
            <span className={`dash-badge ${n.is_published ? 'bg-emerald-50 text-emerald-700' : 'bg-[var(--fill-soft)] text-navy/55'}`}>
              <span className="dot" style={{ background: n.is_published ? '#10b981' : 'rgba(13,27,75,0.35)' }} />
              {n.is_published ? 'פורסם' : 'טיוטה — הקישור כבוי'}
            </span>
          </div>
          <p className="mt-1 text-sm text-navy/55">
            {formatDate(n.created_at)}
            <span className="mx-2 opacity-40">·</span>
            <Eye size={14} className="-mt-0.5 inline" /> <bdi className="font-inter tabular-nums">{n.views}</bdi> צפיות
          </p>
        </div>
        <button onClick={onEdit} className="dash-btn-ghost">
          <Pencil size={16} /> עריכה
        </button>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-2">
        <a href={link} target="_blank" rel="noopener" dir="ltr" className="nl-link">
          {link.replace(/^https?:\/\//, '')}
        </a>
        <button onClick={copy} className="dash-btn-ghost">
          {copied ? <Check size={16} /> : <Copy size={16} />} {copied ? 'הועתק' : 'העתקת קישור'}
        </button>
        <a href={whatsappUrl(n.title, n.slug)} target="_blank" rel="noopener" className="dash-btn-ghost">
          <WhatsAppIcon /> שליחה בוואטסאפ
        </a>
        <a href={link} target="_blank" rel="noopener" className="dash-btn-ghost">
          <ExternalLink size={16} /> פתיחה
        </a>
      </div>
    </li>
  )
}

function WhatsAppIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm0 18.2c-1.5 0-3-.4-4.3-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8s-.4-.1-.6.1-.7.8-.8 1-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.2-.4.7-1.4.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.1 5.1 0 0 0 1.1 2.7 11.6 11.6 0 0 0 4.5 4c1.7.7 2.3.8 3.2.6.5-.1 1.5-.6 1.7-1.2s.2-1.1.2-1.2-.2-.2-.5-.3z" />
    </svg>
  )
}

function formatDate(iso) {
  return new Date(iso).toLocaleDateString('he-IL', { day: 'numeric', month: 'long', year: 'numeric' })
}

function Centered({ children, pulse = false, inline = false }) {
  return (
    <div className={`flex items-center justify-center px-4 text-center text-sm text-navy/50 ${inline ? 'min-h-[40vh]' : 'min-h-screen bg-surface'} ${pulse ? 'animate-pulse' : ''}`}>
      <div>{children}</div>
    </div>
  )
}
