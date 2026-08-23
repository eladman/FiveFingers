import { useEffect, useMemo, useState } from 'react'
import { supabase } from './supabaseClient.js'

const DAY = 24 * 60 * 60 * 1000

export default function Traffic() {
  const [views, setViews] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [includeInternal, setIncludeInternal] = useState(false)
  const [chartMetric, setChartMetric] = useState('visitors') // 'visitors' | 'views'

  useEffect(() => {
    async function load() {
      setLoading(true)
      setError('')
      // Last 30 days only — keeps the payload small.
      const since = new Date(Date.now() - 30 * DAY).toISOString()
      const { data, error } = await supabase
        .from('page_views')
        .select('id, path, created_at, referrer, visitor_id, session_id, is_internal')
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

  const internalCount = useMemo(() => views.filter((v) => v.is_internal).length, [views])
  const stats = useMemo(
    () => computeStats(views, includeInternal),
    [views, includeInternal],
  )

  if (loading) return <div className="dash-card p-10 text-center text-navy/40 text-sm">טוען…</div>
  if (error) return <div className="dash-card p-10 text-center text-red-600 text-sm">{error}</div>

  const chartSeries = chartMetric === 'visitors' ? stats.dailyVisitors : stats.dailyViews

  return (
    <div className="space-y-6">
      {/* Internal-traffic toggle */}
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <p className="text-xs text-navy/45">
          מבקרים ייחודיים נספרים לפי מזהה אנונימי (ללא עוגיות, ללא מידע אישי).
        </p>
        <label className="flex items-center gap-2 text-xs text-navy/60 cursor-pointer select-none">
          <input
            type="checkbox"
            checked={includeInternal}
            onChange={(e) => setIncludeInternal(e.target.checked)}
            className="accent-orange-ink"
          />
          כלול תנועה פנימית של הצוות
          {internalCount > 0 && (
            <span className="text-navy/35">({internalCount} צפיות)</span>
          )}
        </label>
      </div>

      {/* Primary KPIs — unique visitors, with page views underneath */}
      <div className="grid grid-cols-3 gap-3">
        <Kpi label="היום" value={stats.today.visitors} sub={`${stats.today.views} צפיות`} accent />
        <Kpi label="7 ימים אחרונים" value={stats.week.visitors} sub={`${stats.week.views} צפיות`} />
        <Kpi label="30 ימים אחרונים" value={stats.month.visitors} sub={`${stats.month.views} צפיות`} />
      </div>

      {/* Secondary detail strip (30 days) */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <MiniStat label="ביקורים (סשנים)" value={stats.sessions} />
        <MiniStat label="דפים לביקור" value={stats.pagesPerSession} />
        <MiniStat label="מבקרים חוזרים" value={stats.returning} />
        <MiniStat label="סה״כ צפיות" value={stats.month.views} />
      </div>

      {/* Daily chart with metric toggle */}
      <div className="dash-card p-5">
        <div className="flex items-start justify-between gap-3 mb-4">
          <div>
            <h3 className="font-bold text-navy mb-1">
              {chartMetric === 'visitors' ? 'מבקרים ייחודיים לפי יום' : 'צפיות לפי יום'}
            </h3>
            <p className="text-xs text-navy/45">30 הימים האחרונים</p>
          </div>
          <div className="flex items-center gap-1 bg-surface-2 rounded-full p-1 shrink-0">
            <ToggleBtn active={chartMetric === 'visitors'} onClick={() => setChartMetric('visitors')}>
              מבקרים
            </ToggleBtn>
            <ToggleBtn active={chartMetric === 'views'} onClick={() => setChartMetric('views')}>
              צפיות
            </ToggleBtn>
          </div>
        </div>
        {stats.month.views === 0 ? <EmptyChart /> : <BarChart series={chartSeries} />}
      </div>

      {/* Top pages + traffic sources */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="dash-card p-5">
          <h3 className="font-bold text-navy mb-4">עמודים מובילים</h3>
          <RankedList
            items={stats.topPaths}
            labelOf={(p) => prettyPath(p.key)}
            countOf={(p) => p.count}
            empty="אין עדיין נתונים."
          />
        </div>

        <div className="dash-card p-5">
          <h3 className="font-bold text-navy mb-1">מקורות תנועה</h3>
          <p className="text-xs text-navy/45 mb-4">מבקרים ייחודיים לפי מקור</p>
          <RankedList
            items={stats.topSources}
            labelOf={(s) => s.key}
            countOf={(s) => s.count}
            empty="אין עדיין נתונים."
            ltr={false}
          />
        </div>
      </div>

      <div className="text-xs text-navy/40 text-center">
        {stats.month.visitors} מבקרים ייחודיים · {stats.month.views} צפיות ב־30 הימים האחרונים ·
        ללא עוגיות, ללא מידע אישי
      </div>
    </div>
  )
}

// A row's stable identity for unique counting. Rows logged before the unique-id
// upgrade have no visitor_id/session_id — fall back to the row id so each legacy
// hit counts as its own visit (can't de-duplicate retroactively). New rows
// de-duplicate properly by their anonymous ids.
function visitorKey(v) {
  return v.visitor_id || `legacy:${v.id}`
}
function sessionKey(v) {
  return v.session_id || `legacy:${v.id}`
}

function computeStats(allViews, includeInternal) {
  const views = includeInternal ? allViews : allViews.filter((v) => !v.is_internal)

  const now = new Date()
  const startToday = new Date(now)
  startToday.setHours(0, 0, 0, 0)
  const weekAgo = now.getTime() - 7 * DAY
  const monthAgo = now.getTime() - 30 * DAY

  const win = {
    today: { views: 0, visitors: new Set() },
    week: { views: 0, visitors: new Set() },
    month: { views: 0, visitors: new Set() },
  }
  const byDayViews = new Map()
  const byDayVisitors = new Map() // dayKey -> Set(visitorKey)
  const byPath = new Map()
  const bySource = new Map() // source -> Set(visitorKey)
  const sessions = new Set()
  const sessionsByVisitor = new Map() // visitorKey -> Set(sessionKey)

  for (const v of views) {
    const t = new Date(v.created_at).getTime()
    const vk = visitorKey(v)
    if (t >= startToday.getTime()) {
      win.today.views++
      win.today.visitors.add(vk)
    }
    if (t >= weekAgo) {
      win.week.views++
      win.week.visitors.add(vk)
    }
    if (t >= monthAgo) {
      win.month.views++
      win.month.visitors.add(vk)
    }

    const dayKey = dayKeyOf(new Date(v.created_at))
    byDayViews.set(dayKey, (byDayViews.get(dayKey) || 0) + 1)
    if (!byDayVisitors.has(dayKey)) byDayVisitors.set(dayKey, new Set())
    byDayVisitors.get(dayKey).add(vk)

    byPath.set(v.path, (byPath.get(v.path) || 0) + 1)

    const src = sourceOf(v.referrer)
    if (src) {
      if (!bySource.has(src)) bySource.set(src, new Set())
      bySource.get(src).add(vk)
    }

    sessions.add(sessionKey(v))
    if (!sessionsByVisitor.has(vk)) sessionsByVisitor.set(vk, new Set())
    sessionsByVisitor.get(vk).add(sessionKey(v))
  }

  // Dense 30-day series (fill gaps with 0) for both metrics.
  const dailyViews = []
  const dailyVisitors = []
  for (let i = 29; i >= 0; i--) {
    const d = new Date(now.getTime() - i * DAY)
    const key = dayKeyOf(d)
    const label = `${d.getDate()}/${d.getMonth() + 1}`
    dailyViews.push({ key, label, count: byDayViews.get(key) || 0 })
    dailyVisitors.push({ key, label, count: byDayVisitors.get(key)?.size || 0 })
  }

  const topPaths = Array.from(byPath.entries())
    .map(([key, count]) => ({ key, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 8)

  const topSources = Array.from(bySource.entries())
    .map(([key, set]) => ({ key, count: set.size }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 6)

  const returning = Array.from(sessionsByVisitor.values()).filter((s) => s.size > 1).length
  const monthVisitors = win.month.visitors.size
  const pagesPerSession = sessions.size ? (win.month.views / sessions.size).toFixed(1) : '0'

  return {
    today: { views: win.today.views, visitors: win.today.visitors.size },
    week: { views: win.week.views, visitors: win.week.visitors.size },
    month: { views: win.month.views, visitors: monthVisitors },
    sessions: sessions.size,
    pagesPerSession,
    returning,
    dailyViews,
    dailyVisitors,
    topPaths,
    topSources,
  }
}

function dayKeyOf(d) {
  return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`
}

function prettyPath(path) {
  if (!path || path === '/') return 'דף הבית'
  return path
}

// Reduce a raw referrer to a human traffic source. Null/empty → direct.
// Same-site referrers (in-site navigation) are dropped (return null).
function sourceOf(ref) {
  if (!ref) return 'ישיר / מסומן'
  try {
    const host = new URL(ref).hostname.replace(/^www\./, '')
    if (host === window.location.hostname) return null // internal navigation, not a source
    if (/google\./.test(host)) return 'Google'
    if (/(facebook|fb)\./.test(host)) return 'Facebook'
    if (/instagram\./.test(host)) return 'Instagram'
    if (/(t\.co|twitter|x)\./.test(host)) return 'X / Twitter'
    if (/wa\.me|whatsapp\./.test(host)) return 'WhatsApp'
    if (/(youtube|youtu\.be)\./.test(host)) return 'YouTube'
    if (/linkedin\./.test(host)) return 'LinkedIn'
    if (/tiktok\./.test(host)) return 'TikTok'
    return host
  } catch {
    return 'אחר'
  }
}

// A count-ranked list with a relative bar. Generic over pages/sources.
function RankedList({ items, labelOf, countOf, empty, ltr = true }) {
  if (!items.length) return <div className="text-sm text-navy/40">{empty}</div>
  const max = countOf(items[0]) || 1
  return (
    <ul className="space-y-2">
      {items.map((it, i) => (
        <li key={i} className="flex items-center gap-3">
          <span
            dir={ltr ? 'ltr' : 'rtl'}
            className={`text-sm text-navy/70 truncate flex-1 ${ltr ? 'text-left' : 'text-right'}`}
          >
            {labelOf(it)}
          </span>
          <div className="w-32 h-2 rounded-full bg-surface-2 overflow-hidden">
            <div
              className="h-full rounded-full"
              style={{
                width: `${(countOf(it) / max) * 100}%`,
                background: 'linear-gradient(90deg, var(--orange-lift), var(--orange-deep))',
              }}
            />
          </div>
          <span className="text-sm font-semibold text-navy w-10 text-left tabular-nums">
            {countOf(it)}
          </span>
        </li>
      ))}
    </ul>
  )
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

function ToggleBtn({ active, onClick, children }) {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-1 rounded-full text-xs font-semibold transition-colors ${
        active ? 'bg-white text-navy shadow-sm' : 'text-navy/50 hover:text-navy'
      }`}
    >
      {children}
    </button>
  )
}

function Kpi({ label, value, sub, accent }) {
  return (
    <div className="dash-card p-4">
      <div className="text-xs text-navy/45 mb-1">{label}</div>
      <div className={`text-3xl font-bold ${accent ? 'text-orange-ink' : 'text-navy'}`}>{value}</div>
      {sub && <div className="text-xs text-navy/40 mt-1">{sub}</div>}
    </div>
  )
}

function MiniStat({ label, value }) {
  return (
    <div className="dash-card p-4">
      <div className="text-xs text-navy/45 mb-1">{label}</div>
      <div className="text-xl font-bold text-navy tabular-nums">{value}</div>
    </div>
  )
}
