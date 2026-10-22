import { Plus, ChevronLeft } from 'lucide-react'
import { AUDIENCE_LABEL, CATEGORY_LABEL } from '../feedback/taxonomy'
import { formatDate } from '../feedback/format'
import { summarize, fmt1 } from './stats'
import { Chip, StatusBadge } from './ui'

export default function LectureList({ lectures, feedbackByLecture, onNew, onOpen }) {
  if (!lectures.length) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
        <p className="ds-eyebrow text-orange-ink mb-4">משוב הרצאות</p>
        <h1 className="font-ragmarom text-[clamp(2.6rem,6vw,4.5rem)] leading-[0.95]">
          עוד אין הרצאות.
          <br />
          <span className="text-orange">בואו ניצור את הראשונה.</span>
        </h1>
        <button type="button" onClick={onNew} className="dash-btn-primary mt-8">
          <Plus size={18} /> הרצאה חדשה
        </button>
      </div>
    )
  }

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="ds-eyebrow text-orange-ink mb-2">משוב הרצאות</p>
          <h1 className="text-3xl font-bold">הרצאות <span className="text-navy/35">({lectures.length})</span></h1>
        </div>
        <button type="button" onClick={onNew} className="dash-btn-primary">
          <Plus size={18} /> הרצאה חדשה
        </button>
      </div>

      <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {lectures.map((l) => {
          const s = summarize(feedbackByLecture.get(l.id) || [])
          return (
            <li key={l.id}>
              <button
                type="button"
                onClick={() => onOpen(l.id)}
                className="dash-card group flex h-full w-full flex-col p-5 text-right transition-shadow hover:shadow-[var(--shadow-md)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="font-inter text-sm text-navy/55">{formatDate(l.lecture_date)}</span>
                  <StatusBadge open={l.is_open} />
                </div>
                <h2 className="mt-3 text-xl font-bold leading-snug">{l.title}</h2>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  <Chip tone="orange">{AUDIENCE_LABEL[l.audience]}</Chip>
                  <Chip>{CATEGORY_LABEL[l.category]}</Chip>
                </div>
                <div className="mt-auto flex items-end justify-between gap-3 pt-6">
                  <div className="flex gap-6">
                    <Stat value={s.n} label="משובים" />
                    <Stat value={fmt1(s.meaningful)} label="משמעותיות" />
                  </div>
                  <ChevronLeft size={18} className="text-navy/30 transition-transform group-hover:-translate-x-1" />
                </div>
              </button>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

function Stat({ value, label }) {
  return (
    <div>
      <p className="font-ragmarom text-3xl leading-none">{value}</p>
      <p className="mt-1 text-xs text-navy/50">{label}</p>
    </div>
  )
}
