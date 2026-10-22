import { pct } from './stats'

/** Horizontal bars. The leading row is orange, the rest navy. */
export function Bars({ rows, total, sort = false }) {
  const list = sort ? [...rows].sort((a, b) => b.count - a.count) : rows
  const max = Math.max(...list.map((r) => r.count), 1)
  const lead = Math.max(...list.map((r) => r.count))
  return (
    <ul className="grid gap-3">
      {list.map((r) => (
        <li key={r.value} className="grid grid-cols-[minmax(0,11rem)_1fr_3.2rem] items-center gap-3 text-sm">
          <span className="font-medium leading-snug">{r.label}</span>
          <span className="h-3 overflow-hidden rounded-full bg-[var(--fill-soft)]">
            <span
              className="block h-full rounded-full transition-[width] duration-700 ease-brand"
              style={{
                width: `${(r.count / max) * 100}%`,
                background: r.count === lead && lead > 0 ? 'var(--orange)' : 'var(--navy)',
                opacity: r.count === lead ? 1 : 0.75,
              }}
            />
          </span>
          <span className="text-left font-inter tabular-nums text-navy/70">{pct(r.count, total)}%</span>
        </li>
      ))}
    </ul>
  )
}

export function Kpi({ label, value, hint, accent = false }) {
  return (
    <div className={`dash-card flex flex-col justify-between p-5 ${accent ? 'lx-card-accent' : ''}`}>
      <p className="text-sm font-semibold opacity-70">{label}</p>
      <div>
        <p className="mt-4 font-ragmarom text-5xl leading-none" dir="ltr" style={{ textAlign: 'right' }}>{value}</p>
        {hint && <p className="mt-2 text-xs opacity-60">{hint}</p>}
      </div>
    </div>
  )
}

export function Chip({ children, tone = 'navy' }) {
  const cls =
    tone === 'orange'
      ? 'bg-[var(--orange-soft)] text-orange-ink'
      : 'bg-[var(--fill-soft)] text-navy/75'
  return <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${cls}`}>{children}</span>
}

export function StatusBadge({ open }) {
  return (
    <span className={`dash-badge ${open ? 'bg-emerald-50 text-emerald-700' : 'bg-[var(--fill-soft)] text-navy/55'}`}>
      <span className="dot" style={{ background: open ? '#10b981' : 'rgba(13,27,75,0.35)' }} />
      {open ? 'פתוח למשובים' : 'סגור'}
    </span>
  )
}

/** Numeric ranges stay left-to-right inside Hebrew text (else 1–5 renders 5–1). */
export function Range({ children }) {
  return <bdi dir="ltr" className="font-inter">{children}</bdi>
}
