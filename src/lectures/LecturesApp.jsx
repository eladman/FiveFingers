import { useCallback, useEffect, useMemo, useState } from 'react'
import { supabase, isConfigured, LECTURES_LOGIN_EMAIL } from './supabaseClient'
import Login from '../dashboard/Login.jsx'
import LectureList from './LectureList'
import LectureEditor from './LectureEditor'
import LectureDetail from './LectureDetail'
import Analysis from './Analysis'
import { fetchLectures, fetchAllFeedback, createLecture, updateLecture, deleteLecture } from './data'

/**
 * Amir's assistant's workspace: create lectures, get each one's QR, read the
 * results. Route lives in the query string (?lecture=<id>, ?new, ?tab=analysis)
 * so a refresh or a shared link lands on the same screen.
 */
export default function LecturesApp() {
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
  if (!session) return <Login client={supabase} email={LECTURES_LOGIN_EMAIL} title="משוב הרצאות" />
  return <Workspace />
}

function readRoute() {
  const p = new URLSearchParams(location.search)
  if (p.has('new')) return { view: 'new' }
  if (p.get('edit')) return { view: 'edit', id: p.get('edit') }
  if (p.get('lecture')) return { view: 'detail', id: p.get('lecture') }
  if (p.get('tab') === 'analysis') return { view: 'analysis' }
  return { view: 'list' }
}

function writeRoute(r) {
  const p = new URLSearchParams()
  if (r.view === 'new') p.set('new', '')
  if (r.view === 'edit') p.set('edit', r.id)
  if (r.view === 'detail') p.set('lecture', r.id)
  if (r.view === 'analysis') p.set('tab', 'analysis')
  const qs = p.toString().replace(/=$/, '')
  history.pushState(null, '', qs ? `?${qs}` : location.pathname)
}

function Workspace() {
  const [route, setRouteState] = useState(readRoute)
  const [lectures, setLectures] = useState([])
  const [feedback, setFeedback] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

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
    const [l, f] = await Promise.all([fetchLectures(), fetchAllFeedback()])
    if (l.error || f.error) setError('שגיאה בטעינת הנתונים: ' + (l.error || f.error).message)
    setLectures(l.data)
    setFeedback(f.data)
    setLoading(false)
  }, [])

  useEffect(() => {
    load()
  }, [load])

  const feedbackByLecture = useMemo(() => {
    const m = new Map()
    for (const r of feedback) {
      if (!m.has(r.lecture_id)) m.set(r.lecture_id, [])
      m.get(r.lecture_id).push(r)
    }
    return m
  }, [feedback])

  const current = lectures.find((l) => l.id === route.id)
  const replaceLecture = (l) => setLectures((ls) => ls.map((x) => (x.id === l.id ? l : x)))

  let body
  if (loading) body = <Centered pulse inline>טוען…</Centered>
  else if (route.view === 'new') {
    body = (
      <LectureEditor
        onCancel={() => go({ view: 'list' })}
        onSave={async (fields) => {
          const res = await createLecture(fields)
          if (res.error) return res
          setLectures((ls) => [res.data, ...ls])
          go({ view: 'detail', id: res.data.id })
        }}
      />
    )
  } else if ((route.view === 'edit' || route.view === 'detail') && !current) {
    body = <Centered inline>ההרצאה לא נמצאה. <button className="mr-2 font-bold text-orange-ink underline" onClick={() => go({ view: 'list' })}>לכל ההרצאות</button></Centered>
  } else if (route.view === 'edit') {
    body = (
      <LectureEditor
        lecture={current}
        responseCount={(feedbackByLecture.get(current.id) || []).length}
        onCancel={() => go({ view: 'detail', id: current.id })}
        onSave={async (fields) => {
          const res = await updateLecture(current.id, fields)
          if (res.error) return res
          replaceLecture(res.data)
          go({ view: 'detail', id: current.id })
        }}
      />
    )
  } else if (route.view === 'detail') {
    body = (
      <LectureDetail
        lecture={current}
        rows={feedbackByLecture.get(current.id) || []}
        onBack={() => go({ view: 'list' })}
        onEdit={() => go({ view: 'edit', id: current.id })}
        onToggleOpen={async () => {
          const res = await updateLecture(current.id, { is_open: !current.is_open })
          if (res.error) setError('העדכון לא הצליח: ' + res.error.message)
          else replaceLecture(res.data)
        }}
        onDelete={async () => {
          const res = await deleteLecture(current.id)
          if (res.error) return setError('המחיקה לא הצליחה: ' + res.error.message)
          setLectures((ls) => ls.filter((l) => l.id !== current.id))
          setFeedback((fs) => fs.filter((r) => r.lecture_id !== current.id))
          go({ view: 'list' })
        }}
      />
    )
  } else if (route.view === 'analysis') {
    body = <Analysis lectures={lectures} feedback={feedback} onOpen={(id) => go({ view: 'detail', id })} />
  } else {
    body = (
      <LectureList
        lectures={lectures}
        feedbackByLecture={feedbackByLecture}
        onNew={() => go({ view: 'new' })}
        onOpen={(id) => go({ view: 'detail', id })}
      />
    )
  }

  const tab = route.view === 'analysis' ? 'analysis' : 'lectures'

  return (
    <div className="min-h-screen bg-surface text-navy" dir="rtl">
      <header className="sticky top-0 z-30 border-b border-line bg-white/80 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
          <div className="flex items-center gap-3">
            <img src="/logo.png" alt="חמש אצבעות" className="h-8" />
            <span className="hidden font-bold sm:inline">משוב הרצאות</span>
          </div>
          <nav className="flex items-center gap-1 rounded-full bg-surface-2 p-1">
            {[
              ['lectures', 'הרצאות', { view: 'list' }],
              ['analysis', 'ניתוח', { view: 'analysis' }],
            ].map(([id, label, r]) => (
              <button
                key={id}
                onClick={() => go(r)}
                aria-current={tab === id ? 'page' : undefined}
                className={`rounded-full px-4 py-1.5 text-sm font-semibold transition-colors ${tab === id ? 'bg-white text-navy shadow-sm' : 'text-navy/50 hover:text-navy'}`}
              >
                {label}
              </button>
            ))}
          </nav>
          <div className="flex items-center gap-3">
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

function Centered({ children, pulse = false, inline = false }) {
  return (
    <div className={`flex items-center justify-center px-4 text-center text-sm text-navy/50 ${inline ? 'min-h-[40vh]' : 'min-h-screen bg-surface'} ${pulse ? 'animate-pulse' : ''}`}>
      <div>{children}</div>
    </div>
  )
}
