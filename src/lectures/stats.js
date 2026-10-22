import { optionLabel } from '../feedback/questions'

const avgOf = (rows, key) => {
  const vals = rows.map((r) => r[key]).filter((v) => typeof v === 'number')
  return vals.length ? vals.reduce((s, v) => s + v, 0) / vals.length : null
}

/** Headline numbers for any set of responses. */
export function summarize(rows) {
  const n = rows.length
  const noValue = rows.filter((r) => r.takeaways?.includes('no_value')).length
  return {
    n,
    meaningful: avgOf(rows, 'meaningful'),
    recommend: avgOf(rows, 'recommend'),
    noValuePct: n ? Math.round((noValue / n) * 100) : null,
    emails: rows.filter((r) => r.wants_more && r.email).length,
  }
}

/** [{ value, label, count }] for an option question, sorted by count (desc). */
export function optionCounts(q, rows) {
  const counts = new Map(q.options.map((o) => [o.value, 0]))
  for (const r of rows) {
    const v = r[q.id]
    for (const x of Array.isArray(v) ? v : [v]) if (counts.has(x)) counts.set(x, counts.get(x) + 1)
  }
  return q.options.map((o) => ({ value: o.value, label: o.label, count: counts.get(o.value) }))
}

/** [{ value, label, count }] for a 1–5 scale, 5 first. */
export function scaleCounts(q, rows) {
  return [5, 4, 3, 2, 1].map((v) => ({ value: v, label: String(v), count: rows.filter((r) => r[q.id] === v).length }))
}

/** Label of the most-picked option, or '—'. If it's "אחר", name the most common write-in. */
export function topOption(q, rows) {
  const best = optionCounts(q, rows).sort((a, b) => b.count - a.count)[0]
  if (!best || best.count === 0) return '—'
  const label = optionLabel(q, best.value)
  const isOther = q.options.find((o) => o.value === best.value)?.other
  const write = isOther && q.otherId ? groupTexts(rows.filter((r) => r[q.id] === best.value), q.otherId)[0] : null
  return write ? `${label}: ${write.text}` : label
}

/** Free-text answers grouped case/space-insensitively: [{ text, count }], most common first. */
export function groupTexts(rows, field) {
  const m = new Map()
  for (const r of rows) {
    const t = r[field]?.trim()
    if (!t) continue
    const k = t.replace(/\s+/g, ' ').toLowerCase()
    if (m.has(k)) m.get(k).count++
    else m.set(k, { text: t, count: 1 })
  }
  return [...m.values()].sort((a, b) => b.count - a.count)
}

export const fmt1 = (x) => (x == null ? '—' : x.toFixed(1))
export const pct = (x, total) => (total ? Math.round((x / total) * 100) : 0)
