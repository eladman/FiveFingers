import { useEffect, useMemo, useState } from 'react'
import { supabase } from './supabaseClient.js'

const DAY = 24 * 60 * 60 * 1000

export default function Traffic() {
  const [views, setViews] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function load() {
      setLoading(true)
      setError('')
      // Last 30 days only — keeps the payload small.
      const since = new Date(Date.now() - 30 * DAY).toISOString()
      const { data, error } = await supabase
        .from('page_views')
        .select('path, created_at')
        .gte('created_at', since)
        .order('created_at', { ascending: false })
      if (error) {
        setError('שגיאה בטעינת נתוני התנועה: ' + error.message)
        setViews([])
      } else {
        setViews(data || [])
      }
      setLoading(false)
    }
    load()
  }, [])

  const stats = useMemo(() => computeStats(views), [views])

  if (loading) return <div className="dash-card p-10 text-center text-navy/40 text-sm">טוען…</div>
  if (error) return <div className="dash-card p-10 text-center text-red-600 text-sm">{error}</div>

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-3 gap-3">
        <Kpi label="היום" value={stats.today} accent />
        <Kpi label="7 ימים אחרונים" value={stats.week} />
        <Kpi label="30 ימים אחרונים" value={stats.month} />
      </div>

      <div className="dash-card p-5">
        <h3 className="font-bold text-navy mb-1">צפיות לפי יום</h3>
        <p className="text-xs text-navy/45 mb-4">30 הימים האחרונים</p>
        {stats.total === 0 ? (
          <EmptyChart />
        ) : (
          <BarChart series={stats.daily} />
        )}
      </div>

      <div className="dash-card p-5">
        <h3 className="font-bold text-navy mb-4">עמודים מובילים</h3>
        {stats.topPaths.length === 0 ? (
          <div className="text-sm text-navy/40">אין עדיין נתונים.</div>
        ) : (
          <ul className="space-y-2">
            {stats.topPaths.map((p) => (
              <li key={p.path} className="flex items-center gap-3">
                <span dir="ltr" className="text-sm text-navy/70 truncate flex-1 text-left">
                  {prettyPath(p.path)}
                </span>
                <div className="w-32 h-2 rounded-full bg-surface-2 overflow-hidden">
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: `${(p.count / stats.topPaths[0].count) * 100}%`,
                      background: 'linear-gradient(90deg, var(--orange-lift), var(--orange-deep))',
                    }}
                  />
                </div>
                <span className="text-sm font-semibold text-navy w-10 text-left tabular-nums">
                  {p.count}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="text-xs text-navy/40 text-center">
        סה״כ {stats.total} צפיות ב־30 הימים האחרונים · ללא עוגיות, ללא מידע אישי
      </div>
    </div>
  )
}

function computeStats(views) {
  const now = new Date()
  const startToday = new Date(now)
  startToday.setHours(0, 0, 0, 0)
  const weekAgo = now.getTime() - 7 * DAY
  const monthAgo = now.getTime() - 30 * DAY

  let today = 0
  let week = 0
  let month = 0
  const byDay = new Map()
  const byPath = new Map()

  for (const v of views) {
    const t = new Date(v.created_at).getTime()
    if (t >= startToday.getTime()) today++
    if (t >= weekAgo) week++
    if (t >= monthAgo) month++

    const dayKey = dayKeyOf(new Date(v.created_at))
    byDay.set(dayKey, (byDay.get(dayKey) || 0) + 1)
    byPath.set(v.path, (byPath.get(v.path) || 0) + 1)
  }

  // Build a dense 30-day series (fill gaps with 0).
  const daily = []
  for (let i = 29; i >= 0; i--) {
    const d = new Date(now.getTime() - i * DAY)
    const key = dayKeyOf(d)
    daily.push({ key, label: `${d.getDate()}/${d.getMonth() + 1}`, count: byDay.get(key) || 0 })
  }

  const topPaths = Array.from(byPath.entries())
    .map(([path, count]) => ({ path, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 8)

  return { today, week, month, total: views.length, daily, topPaths }
}

function dayKeyOf(d) {
  return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`
}

function prettyPath(path) {
  if (!path || path === '/') return 'דף הבית'
  return path
}

// Minimal, dependency-free bar chart.
function BarChart({ series }) {
  const max = Math.max(1, ...series.map((d) => d.count))
  const W = 720
  const H = 160
  const gap = 3
  const barW = (W - gap * (series.length - 1)) / series.length

  return (
    <div className="overflow-x-auto">
      <svg viewBox={`0 0 ${W} ${H + 22}`} className="w-full min-w-[560px]" role="img">
        {series.map((d, i) => {
          const h = (d.count / max) * H
          const x = i * (barW + gap)
          const showLabel = i % 5 === 0 || i === series.length - 1
          return (
            <g key={d.key}>
              <rect
                x={x}
                y={H - h}
                width={barW}
                height={h}
                rx={Math.min(3, barW / 2)}
                fill="url(#dashbar)"
              >
                <title>{`${d.label}: ${d.count}`}</title>
              </rect>
              {showLabel && (
                <text
                  x={x + barW / 2}
                  y={H + 15}
                  textAnchor="middle"
                  fontSize="10"
                  fill="rgba(13,27,75,0.4)"
                >
                  {d.label}
                </text>
              )}
            </g>
          )
        })}
        <defs>
          <linearGradient id="dashbar" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#ffa347" />
            <stop offset="100%" stopColor="#e56f00" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  )
}

function EmptyChart() {
  return (
    <div className="h-40 flex items-center justify-center text-sm text-navy/40 bg-surface-2 rounded-xl">
      אין עדיין נתוני תנועה. הנתונים יופיעו לאחר שהמבקרים יגלשו באתר.
    </div>
  )
}

function Kpi({ label, value, accent }) {
  return (
    <div className="dash-card p-4">
      <div className="text-xs text-navy/45 mb-1">{label}</div>
      <div className={`text-3xl font-bold ${accent ? 'text-orange-ink' : 'text-navy'}`}>{value}</div>
    </div>
  )
}
