import { useState } from 'react'
import { ChevronRight, Copy, Check, Presentation, Download, Pencil, Lock, Unlock, Trash2, ExternalLink } from 'lucide-react'
import { AUDIENCE_LABEL, CATEGORY_LABEL } from '../feedback/taxonomy'
import { formatDate } from '../feedback/format'
import QrCode from './QrCode'
import PresentSlide from './PresentSlide'
import LectureResults from './LectureResults'
import { lectureUrl } from './data'
import { downloadPng, downloadSvg } from './qr'
import { Chip, StatusBadge } from './ui'

export default function LectureDetail({ lecture, rows, onBack, onEdit, onToggleOpen, onDelete }) {
  const [presenting, setPresenting] = useState(false)
  const [copied, setCopied] = useState(false)
  const [confirmDelete, setConfirmDelete] = useState(false)
  const [busy, setBusy] = useState(false)
  const url = lectureUrl(lecture.code)
  const file = `qr-${lecture.code}`

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch {
      /* clipboard blocked — the link is visible to copy by hand */
    }
  }

  const run = async (fn) => {
    setBusy(true)
    await fn()
    setBusy(false)
  }

  return (
    <div>
      <button type="button" onClick={onBack} className="mb-6 inline-flex items-center gap-1 text-sm font-semibold text-navy/60 hover:text-navy">
        <ChevronRight size={16} /> כל ההרצאות
      </button>

      <section className="grid grid-cols-1 gap-4 lg:grid-cols-[1.4fr_1fr]">
        {/* ── Lecture info ── */}
        <div className="dash-card flex flex-col p-6 sm:p-8">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-inter text-sm text-navy/55">{formatDate(lecture.lecture_date)}</span>
            <StatusBadge open={lecture.is_open} />
          </div>
          <h1 className="mt-3 font-ragmarom text-[clamp(2.2rem,4.5vw,3.6rem)] leading-[1]">{lecture.title}</h1>
          <div className="mt-4 flex flex-wrap gap-1.5">
            <Chip tone="orange">{AUDIENCE_LABEL[lecture.audience]}</Chip>
            <Chip>{CATEGORY_LABEL[lecture.category]}</Chip>
          </div>

          <div className="mt-8 flex flex-wrap gap-2 border-t border-line pt-6">
            <button type="button" className="dash-btn-ghost" onClick={onEdit}>
              <Pencil size={15} /> עריכה
            </button>
            <button type="button" className="dash-btn-ghost" disabled={busy} onClick={() => run(onToggleOpen)}>
              {lecture.is_open ? <><Lock size={15} /> סגירה למשובים</> : <><Unlock size={15} /> פתיחה מחדש</>}
            </button>
            {!confirmDelete ? (
              <button type="button" className="dash-btn-ghost lx-danger" onClick={() => setConfirmDelete(true)}>
                <Trash2 size={15} /> מחיקה
              </button>
            ) : (
              <div className="flex flex-wrap items-center gap-2 rounded-full bg-red-50 py-1 pl-1 pr-4 text-sm text-red-700" role="alert">
                למחוק את ההרצאה{rows.length === 1 ? ' ואת המשוב שלה' : rows.length ? ` ואת ${rows.length} המשובים שלה` : ''}?
                <button type="button" className="rounded-full bg-red-600 px-4 py-1.5 font-bold text-white" disabled={busy} onClick={() => run(onDelete)}>
                  מחיקה
                </button>
                <button type="button" className="rounded-full px-3 py-1.5 font-semibold" onClick={() => setConfirmDelete(false)}>
                  ביטול
                </button>
              </div>
            )}
          </div>
          {!lecture.is_open && <p className="mt-3 text-sm text-navy/55">הקישור מציג למשתתפים שהמשוב נסגר, ולא מקבל משובים חדשים.</p>}
        </div>

        {/* ── QR ── */}
        <div className="dash-card p-6">
          <div className="mx-auto max-w-[260px] rounded-2xl border border-line bg-white p-4">
            <QrCode url={url} />
          </div>

          <div className="mt-5 flex items-center gap-2 rounded-full bg-surface-2 p-1.5 pr-4">
            <a href={url} target="_blank" rel="noreferrer" className="min-w-0 flex-1 truncate font-inter text-sm text-navy/70 hover:text-navy" dir="ltr" style={{ textAlign: 'right' }}>
              {url.replace(/^https?:\/\//, '')}
            </a>
            <a href={url} target="_blank" rel="noreferrer" className="grid h-9 w-9 place-items-center rounded-full text-navy/50 hover:bg-white hover:text-navy" aria-label="פתיחת הטופס בלשונית חדשה">
              <ExternalLink size={15} />
            </a>
            <button type="button" onClick={copy} className="inline-flex h-9 items-center gap-1.5 rounded-full bg-white px-3 text-sm font-bold shadow-sm">
              {copied ? <><Check size={15} className="text-emerald-600" /> הועתק</> : <><Copy size={15} /> העתקה</>}
            </button>
          </div>

          <button type="button" className="dash-btn-primary mt-4 w-full" onClick={() => setPresenting(true)}>
            <Presentation size={18} /> מצב הצגה
          </button>
          <div className="mt-2 grid grid-cols-2 gap-2">
            <button type="button" className="dash-btn-ghost" onClick={() => downloadPng(url, `${file}.png`)}>
              <Download size={15} /> PNG
            </button>
            <button type="button" className="dash-btn-ghost" onClick={() => downloadSvg(url, `${file}.svg`)}>
              <Download size={15} /> SVG
            </button>
          </div>
        </div>
      </section>

      <div className="mt-10">
        <LectureResults lecture={lecture} rows={rows} />
      </div>

      {presenting && <PresentSlide lecture={lecture} onClose={() => setPresenting(false)} />}
    </div>
  )
}
