import { useState } from 'react'
import { Download } from 'lucide-react'
import { questionsFor } from '../feedback/questions'
import { summarize, optionCounts, scaleCounts, groupTexts, fmt1, pct } from './stats'
import { Bars, Kpi, Range } from './ui'
import { exportResponses } from './exportCsv'

/** Results of one lecture — every block is driven by the question config. */
export default function LectureResults({ lecture, rows }) {
  const s = summarize(rows)
  const questions = questionsFor(lecture.audience)

  if (!rows.length) {
    return (
      <div className="dash-card px-6 py-14 text-center">
        <p className="font-ragmarom text-4xl">עוד אין משובים.</p>
        <p className="mt-3 text-navy/60">הציגו את ה־QR בסוף ההרצאה — המשובים יופיעו כאן.</p>
      </div>
    )
  }

  return (
    <div className="grid gap-4">
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-xl font-bold">תוצאות</h2>
        <button type="button" className="dash-btn-ghost" onClick={() => exportResponses(rows, [lecture], `feedback-${lecture.code}.csv`)}>
          <Download size={16} /> ייצוא CSV
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-5">
        <Kpi label="משובים" value={s.n} />
        <Kpi label="משמעותיות" value={fmt1(s.meaningful)} hint="ממוצע מתוך 5" accent />
        <Kpi label="המלצה" value={fmt1(s.recommend)} hint="ממוצע מתוך 5" />
        <Kpi label="ללא ערך משמעותי" value={`${s.noValuePct}%`} hint="סימנו שלא קיבלו ערך" />
        <Kpi label="מיילים" value={s.emails} hint="רוצים/ות תכנים נוספים" />
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {questions.map((q) => (
          <QuestionBlock key={q.id} q={q} rows={rows} />
        ))}
      </div>
    </div>
  )
}

function QuestionBlock({ q, rows }) {
  const wide = q.type === 'text'
  const answered = rows.filter((r) => r[q.id] != null && r[q.id] !== '')
  return (
    <section className={`dash-card p-6 ${wide ? 'md:col-span-2' : ''}`}>
      <p className="text-xs font-semibold text-navy/50">{typeLabel(q)}</p>
      <h3 className="mt-1 mb-5 text-lg font-bold leading-snug">{q.title}</h3>

      {q.type === 'scale' && <Bars rows={scaleCounts(q, rows)} total={answered.length} />}
      {q.type === 'multi' && <Bars sort rows={optionCounts(q, rows)} total={rows.length} />}
      {q.type === 'choice' && (
        <>
          <Bars sort rows={optionCounts(q, rows)} total={answered.length} />
          {q.otherId && <OtherAnswers rows={rows} field={q.otherId} />}
        </>
      )}
      {q.type === 'text' && <Quotes rows={answered} field={q.id} />}
      {q.type === 'yesno' && <YesNoBlock q={q} rows={rows} />}
    </section>
  )
}

function typeLabel(q) {
  if (q.type === 'scale') return <>דירוג <Range>1–5</Range></>
  if (q.type === 'multi') return `בחירה של עד ${q.max}`
  if (q.type === 'choice') return 'בחירה אחת'
  if (q.type === 'text') return 'טקסט חופשי'
  return 'כן / לא'
}

function OtherAnswers({ rows, field }) {
  const list = groupTexts(rows, field)
  if (!list.length) return null
  return (
    <div className="mt-5 border-t border-line pt-4">
      <p className="mb-2 text-xs font-semibold text-navy/50">"אחר" — מה כתבו</p>
      <ul className="grid max-h-56 gap-1.5 overflow-auto text-sm">
        {list.map((t) => (
          <li key={t.text} className="flex items-start justify-between gap-3">
            <span>• {t.text}</span>
            {t.count > 1 && <span className="shrink-0 font-inter text-xs text-navy/45">×{t.count}</span>}
          </li>
        ))}
      </ul>
    </div>
  )
}

function Quotes({ rows, field }) {
  const [all, setAll] = useState(false)
  if (!rows.length) return <p className="text-navy/50">עוד לא נכתבו תשובות.</p>
  const shown = all ? rows : rows.slice(0, 6)
  return (
    <>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {shown.map((r) => (
          <figure key={r.id} className="rounded-2xl bg-surface-2 p-5">
            <blockquote className="font-frank text-lg leading-snug">״{r[field]}״</blockquote>
            <figcaption className="mt-3 flex items-center gap-2 text-xs text-navy/50">
              <span>משמעותיות {r.meaningful}/5</span>
              <span className="mr-auto font-inter">{dateTime(r.created_at)}</span>
            </figcaption>
          </figure>
        ))}
      </div>
      {rows.length > 6 && (
        <button type="button" onClick={() => setAll((x) => !x)} className="mt-4 text-sm font-bold text-orange-ink hover:underline">
          {all ? 'פחות תשובות' : `לכל ${rows.length} התשובות`}
        </button>
      )}
    </>
  )
}

function YesNoBlock({ q, rows }) {
  const yes = rows.filter((r) => r[q.id] === true)
  const emails = yes.map((r) => r[q.emailId]).filter(Boolean)
  return (
    <div>
      <div className="flex items-baseline gap-3">
        <span className="font-ragmarom text-6xl leading-none">{pct(yes.length, rows.length)}%</span>
        <span className="text-sm text-navy/55">ענו כן ({yes.length} מתוך {rows.length})</span>
      </div>
      {emails.length > 0 && (
        <div className="mt-5 border-t border-line pt-4">
          <div className="mb-2 flex items-center justify-between">
            <p className="text-xs font-semibold text-navy/50">מיילים ({emails.length})</p>
            <button
              type="button"
              className="text-xs font-bold text-orange-ink hover:underline"
              onClick={() => navigator.clipboard?.writeText(emails.join(', '))}
            >
              העתקת כל המיילים
            </button>
          </div>
          <ul className="grid max-h-48 gap-1 overflow-auto font-inter text-sm" dir="ltr">
            {emails.map((e, i) => (
              <li key={i} className="text-right">{e}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export const dateTime = (iso) =>
  new Date(iso).toLocaleString('he-IL', { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' })
