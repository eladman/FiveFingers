import { useMemo, useState } from 'react'
import { Download } from 'lucide-react'
import { AUDIENCES, CATEGORIES } from '../feedback/taxonomy'
import { GENERAL_QUESTIONS } from '../feedback/questions'
import { formatDate } from '../feedback/format'
import { summarize, topOption, fmt1 } from './stats'
import { exportResponses } from './exportCsv'

const Q = Object.fromEntries(GENERAL_QUESTIONS.map((q) => [q.id, q]))

/** Cross-lecture comparison: how each category and each audience did. */
export default function Analysis({ lectures, feedback, onOpen }) {
  const [from, setFrom] = useState('')
  const [to, setTo] = useState('')

  const inRange = useMemo(
    () => lectures.filter((l) => (!from || l.lecture_date >= from) && (!to || l.lecture_date <= to)),
    [lectures, from, to],
  )
  const rows = useMemo(() => {
    const ids = new Set(inRange.map((l) => l.id))
    return feedback.filter((r) => ids.has(r.lecture_id))
  }, [inRange, feedback])

  const lectureOf = useMemo(() => new Map(lectures.map((l) => [l.id, l])), [lectures])
  const groupRows = (field, key) => rows.filter((r) => lectureOf.get(r.lecture_id)?.[field] === key)
  const groupLectures = (field, key) => inRange.filter((l) => l[field] === key)
  const total = summarize(rows)

  return (
    <div className="grid gap-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="ds-eyebrow text-orange-ink mb-2">ניתוח</p>
          <h1 className="text-3xl font-bold">איך הלך לכל קטגוריה וקהל</h1>
          <p className="mt-2 text-navy/60">
            {inRange.length === 1 ? 'הרצאה אחת' : `${inRange.length} הרצאות`} · {total.n === 1 ? 'משוב אחד' : `${total.n} משובים`} · משמעותיות ממוצעת {fmt1(total.meaningful)}
          </p>
        </div>
        <div className="flex flex-wrap items-end gap-2">
          <label className="text-xs font-semibold text-navy/60">
            מתאריך
            <input type="date" className="dash-input mt-1 h-10 w-40" value={from} onChange={(e) => setFrom(e.target.value)} />
          </label>
          <label className="text-xs font-semibold text-navy/60">
            עד תאריך
            <input type="date" className="dash-input mt-1 h-10 w-40" value={to} onChange={(e) => setTo(e.target.value)} />
          </label>
          <button
            type="button"
            className="dash-btn-ghost"
            disabled={!rows.length}
            onClick={() => exportResponses(rows, lectures, 'lecture-feedback.csv')}
          >
            <Download size={16} /> כל המשובים (CSV)
          </button>
        </div>
      </div>

      <CompareTable
        title="לפי קטגוריה"
        groups={CATEGORIES.map((c) => ({ key: c.key, label: c.label, lectures: groupLectures('category', c.key), rows: groupRows('category', c.key) }))}
      />
      <CompareTable
        title="לפי קהל יעד"
        groups={AUDIENCES.map((a) => ({ key: a.key, label: a.label, lectures: groupLectures('audience', a.key), rows: groupRows('audience', a.key) }))}
      />
      <CompareTable
        title="לפי הרצאה"
        sortByScore
        hideLectureCount
        groups={inRange.map((l) => ({
          key: l.id,
          label: l.title,
          sub: formatDate(l.lecture_date),
          lectures: [l],
          rows: rows.filter((r) => r.lecture_id === l.id),
          onClick: () => onOpen(l.id),
        }))}
      />
    </div>
  )
}

function CompareTable({ title, groups, sortByScore = false, hideLectureCount = false }) {
  const data = groups.map((g) => ({ ...g, s: summarize(g.rows) }))
  if (sortByScore) data.sort((a, b) => (b.s.meaningful ?? -1) - (a.s.meaningful ?? -1))
  const best = Math.max(...data.filter((d) => d.s.n).map((d) => d.s.meaningful ?? 0), 0)

  return (
    <section>
      <h2 className="mb-3 text-lg font-bold">{title}</h2>
      <div className="dash-card overflow-x-auto">
        <table className="w-full min-w-[820px] text-sm">
          <thead className="whitespace-nowrap text-right text-xs text-navy/50">
            <tr className="border-b border-line">
              <th className="px-5 py-3 font-semibold"> </th>
              {!hideLectureCount && <th className="px-3 py-3 font-semibold">הרצאות</th>}
              <th className="px-3 py-3 font-semibold">משובים</th>
              <th className="px-3 py-3 font-semibold">משמעותיות</th>
              <th className="px-3 py-3 font-semibold">המלצה</th>
              <th className="px-3 py-3 font-semibold">ללא ערך</th>
              <th className="px-3 py-3 font-semibold">לקחו בעיקר</th>
              <th className="px-5 py-3 font-semibold">נושא מבוקש</th>
            </tr>
          </thead>
          <tbody>
            {data.map((d) => {
              const empty = !d.s.n
              const Name = d.onClick ? 'button' : 'span'
              return (
                <tr key={d.key} className={`border-b border-line last:border-0 ${empty ? 'text-navy/35' : 'hover:bg-surface'}`}>
                  <td className="px-5 py-3">
                    <Name
                      {...(d.onClick ? { type: 'button', onClick: d.onClick } : {})}
                      className={`text-right font-bold ${d.onClick ? 'hover:text-orange-ink hover:underline' : ''}`}
                    >
                      {d.label}
                    </Name>
                    {d.sub && <span className="mr-2 font-inter text-xs text-navy/45">{d.sub}</span>}
                  </td>
                  {!hideLectureCount && <td className="px-3 py-3 font-inter tabular-nums">{d.lectures.length}</td>}
                  <td className="px-3 py-3 font-inter tabular-nums">{d.s.n}</td>
                  <td className="px-3 py-3">
                    <Score value={d.s.meaningful} best={!empty && d.s.meaningful === best && data.length > 1} />
                  </td>
                  <td className="px-3 py-3"><Score value={d.s.recommend} /></td>
                  <td className="px-3 py-3 font-inter tabular-nums">{empty ? '—' : `${d.s.noValuePct}%`}</td>
                  <td className="px-3 py-3">{empty ? '—' : topOption(Q.takeaways, d.rows)}</td>
                  <td className="px-5 py-3">{empty ? '—' : topOption(Q.topic, d.rows)}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </section>
  )
}

/** 1–5 average with a small bar. */
function Score({ value, best = false }) {
  if (value == null) return <span>—</span>
  return (
    <span className="flex items-center gap-2">
      <span className={`font-inter font-bold tabular-nums ${best ? 'text-orange-ink' : ''}`}>{fmt1(value)}</span>
      <span className="h-1.5 w-14 overflow-hidden rounded-full bg-[var(--fill-soft)]">
        <span className="block h-full rounded-full" style={{ width: `${(value / 5) * 100}%`, background: best ? 'var(--orange)' : 'var(--navy)' }} />
      </span>
    </span>
  )
}
