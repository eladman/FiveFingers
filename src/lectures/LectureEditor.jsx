import { useState } from 'react'
import { ChevronRight, Check } from 'lucide-react'
import { AUDIENCES, CATEGORIES } from '../feedback/taxonomy'
import { questionsFor, AUDIENCE_QUESTIONS } from '../feedback/questions'

/**
 * Create / edit a lecture. Audience decides which questions listeners see, so
 * it's locked once the lecture has responses (they answered a specific set).
 */
export default function LectureEditor({ lecture, responseCount = 0, onSave, onCancel }) {
  const editing = Boolean(lecture)
  const [title, setTitle] = useState(lecture?.title || '')
  const [date, setDate] = useState(lecture?.lecture_date || new Date().toISOString().slice(0, 10))
  const [audience, setAudience] = useState(lecture?.audience || '')
  const [category, setCategory] = useState(lecture?.category || '')
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const audienceLocked = editing && responseCount > 0

  const valid = title.trim() && date && audience && category

  async function submit(e) {
    e.preventDefault()
    if (!valid || saving) return
    setSaving(true)
    setError('')
    const res = await onSave({ title: title.trim(), lecture_date: date, audience, category })
    setSaving(false)
    if (res?.error) setError('השמירה לא הצליחה: ' + res.error.message)
  }

  const extra = audience ? (AUDIENCE_QUESTIONS[audience] || []).length : 0

  return (
    <form onSubmit={submit} className="mx-auto max-w-2xl">
      <button type="button" onClick={onCancel} className="mb-6 inline-flex items-center gap-1 text-sm font-semibold text-navy/60 hover:text-navy">
        <ChevronRight size={16} /> חזרה
      </button>
      <p className="ds-eyebrow text-orange-ink mb-2">{editing ? 'עריכת הרצאה' : 'הרצאה חדשה'}</p>
      <h1 className="mb-8 text-3xl font-bold">{editing ? lecture.title : 'פרטי ההרצאה'}</h1>

      <div className="dash-card grid gap-7 p-6 sm:p-8">
        <Field label="שם ההרצאה" htmlFor="lx-title">
          <input
            id="lx-title"
            className="dash-input"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            maxLength={200}
            placeholder="למשל: האדם בזירה — מכינת רבין"
            required
            autoFocus={!editing}
          />
        </Field>

        <Field label="תאריך" htmlFor="lx-date">
          <input id="lx-date" type="date" className="dash-input max-w-[14rem]" value={date} onChange={(e) => setDate(e.target.value)} required />
        </Field>

        <Field
          label="קהל יעד"
          hint={audienceLocked ? 'נעול — כבר התקבלו משובים לפי קהל היעד הזה' : audience ? `${questionsFor(audience).length} שאלות${extra ? ` (כולל ${extra} ייעודיות לקהל הזה)` : ''}` : null}
        >
          <Picker options={AUDIENCES} value={audience} onChange={setAudience} disabled={audienceLocked} columns="grid-cols-2" />
        </Field>

        <Field label="קטגוריה">
          <Picker options={CATEGORIES} value={category} onChange={setCategory} columns="grid-cols-1 sm:grid-cols-2" />
        </Field>

        {error && <p className="rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-600">{error}</p>}

        <div className="flex flex-wrap gap-3 border-t border-line pt-6">
          <button type="submit" className="dash-btn-primary" disabled={!valid || saving}>
            {saving ? 'שומרים…' : editing ? 'שמירת שינויים' : 'יצירת הרצאה וקוד QR'}
          </button>
          <button type="button" className="dash-btn-ghost" onClick={onCancel}>ביטול</button>
        </div>
      </div>
    </form>
  )
}

function Field({ label, hint, htmlFor, children }) {
  const Tag = htmlFor ? 'label' : 'div'
  return (
    <Tag className="block" {...(htmlFor ? { htmlFor } : { role: 'group', 'aria-label': label })}>
      <span className="mb-2 block text-sm font-bold text-navy/80">{label}</span>
      {children}
      {hint && <span className="mt-2 block text-xs text-navy/50">{hint}</span>}
    </Tag>
  )
}

function Picker({ options, value, onChange, disabled, columns }) {
  return (
    <div className={`grid gap-2 ${columns}`} role="radiogroup">
      {options.map((o) => {
        const on = value === o.key
        return (
          <button
            key={o.key}
            type="button"
            role="radio"
            aria-checked={on}
            disabled={disabled && !on}
            onClick={() => !disabled && onChange(o.key)}
            className="lx-pick"
            data-on={on || undefined}
          >
            <span>{o.label}</span>
            {on && <Check size={16} strokeWidth={3} />}
          </button>
        )
      })}
    </div>
  )
}
