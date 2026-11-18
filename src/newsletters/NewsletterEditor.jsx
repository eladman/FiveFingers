import { useEffect, useRef, useState } from 'react'
import { ChevronRight, Upload, FileCode2, Smartphone, Monitor, Trash2 } from 'lucide-react'
import { fetchHtml } from './data'
import { withFrameHelpers } from './frame'

const MAX_BYTES = 10 * 1024 * 1024
const SLUG_RE = /^[a-z0-9][a-z0-9-]{1,58}[a-z0-9]$/

/**
 * Create / edit a newsletter. Content comes from an uploaded .html file or
 * pasted code; the preview is the same sandboxed iframe the public page uses,
 * shown at phone width by default because that's where families open it.
 */
export default function NewsletterEditor({ newsletter, isTaken, onSave, onCancel, onDelete }) {
  const editing = Boolean(newsletter)
  const [title, setTitle] = useState(newsletter?.title || '')
  const [description, setDescription] = useState(newsletter?.description || '')
  const [slug, setSlug] = useState(newsletter?.slug || defaultSlug())
  const [published, setPublished] = useState(newsletter?.is_published ?? true)
  const [html, setHtml] = useState('')
  const [fileName, setFileName] = useState('')
  const [mode, setMode] = useState('file')
  const [htmlLoading, setHtmlLoading] = useState(editing)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [fileError, setFileError] = useState('')
  const [confirmDelete, setConfirmDelete] = useState(false)

  useEffect(() => {
    if (!editing) return
    fetchHtml(newsletter.id).then(({ html, error }) => {
      if (error) setError('לא הצלחנו לטעון את התוכן: ' + error.message)
      setHtml(html)
      setFileName('התוכן הנוכחי')
      setHtmlLoading(false)
    })
  }, [editing, newsletter?.id])

  const slugError = !slug
    ? ''
    : !SLUG_RE.test(slug)
      ? 'אותיות באנגלית קטנות, ספרות ומקפים בלבד (3 תווים לפחות, לא מתחיל או נגמר במקף)'
      : isTaken(slug)
        ? 'הכתובת הזו כבר בשימוש'
        : ''

  const valid = title.trim() && slug && !slugError && html.trim() && !htmlLoading

  async function takeFile(file) {
    setFileError('')
    if (!file) return
    if (/\.(jsx|tsx|js|ts)$/i.test(file.name)) {
      return setFileError('זה קובץ קוד React ולא דף HTML. בקשו מ-Claude: "convert this artifact to a single self-contained HTML file" והעלו את הקובץ שיתקבל.')
    }
    if (file.size > MAX_BYTES) return setFileError('הקובץ גדול מ-10MB. בקשו מ-Claude לכווץ את התמונות או להשתמש בקישורים לתמונות.')
    const text = await file.text()
    if (!looksLikeHtml(text)) return setFileError('הקובץ לא נראה כמו דף HTML.')
    setHtml(text)
    setFileName(file.name)
    if (!title.trim()) setTitle(titleFrom(text) || file.name.replace(/\.html?$/i, ''))
  }

  async function submit(e) {
    e.preventDefault()
    if (!valid || saving) return
    if (new Blob([html]).size > MAX_BYTES) return setError('התוכן גדול מ-10MB.')
    setSaving(true)
    setError('')
    const res = await onSave({
      title: title.trim(),
      description: description.trim() || null,
      slug,
      html,
      is_published: published,
    })
    setSaving(false)
    if (res?.error) setError('השמירה לא הצליחה: ' + res.error.message)
  }

  return (
    <form onSubmit={submit}>
      <button type="button" onClick={onCancel} className="mb-6 inline-flex items-center gap-1 text-sm font-semibold text-navy/60 hover:text-navy">
        <ChevronRight size={16} /> חזרה
      </button>
      <p className="ds-eyebrow mb-2 text-orange-ink">{editing ? 'עריכת ניוזלטר' : 'ניוזלטר חדש'}</p>
      <h1 className="mb-8 text-3xl font-bold">{editing ? newsletter.title : 'העלאה ושיתוף'}</h1>

      <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
        <div className="dash-card grid gap-7 p-6 sm:p-8">
          <Field label="1. התוכן">
            <div className="mb-3 flex gap-1 rounded-full bg-surface-2 p-1 text-sm font-semibold">
              {[
                ['file', 'העלאת קובץ', Upload],
                ['paste', 'הדבקת קוד', FileCode2],
              ].map(([id, label, Icon]) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => setMode(id)}
                  aria-pressed={mode === id}
                  className={`flex flex-1 items-center justify-center gap-1.5 rounded-full px-3 py-1.5 transition-colors ${mode === id ? 'bg-white text-navy shadow-sm' : 'text-navy/50 hover:text-navy'}`}
                >
                  <Icon size={15} /> {label}
                </button>
              ))}
            </div>

            {mode === 'file' ? (
              <DropZone fileName={fileName} loading={htmlLoading} onFile={takeFile} />
            ) : (
              <textarea
                className="dash-textarea min-h-[12rem] font-mono text-xs"
                dir="ltr"
                spellCheck={false}
                value={html}
                onChange={(e) => {
                  setHtml(e.target.value)
                  setFileName('קוד שהודבק')
                  if (!title.trim()) {
                    const t = titleFrom(e.target.value)
                    if (t) setTitle(t)
                  }
                }}
                placeholder="<!DOCTYPE html> ... הדביקו כאן את קוד ה-HTML של הארטיפקט"
              />
            )}
            {fileError && <p className="mt-2 text-sm text-red-600">{fileError}</p>}
            <p className="mt-2 text-xs leading-relaxed text-navy/50">
              ארטיפקט מ-Claude: בתפריט הארטיפקט בחרו Download (קובץ ‎.html) או Copy והדביקו כאן. אם יורד קובץ ‎.jsx, בקשו מ-Claude גרסת HTML אחת עצמאית.
            </p>
          </Field>

          <Field label="2. כותרת" htmlFor="nl-title" hint="מופיעה בתצוגה המקדימה של הקישור בוואטסאפ">
            <input
              id="nl-title"
              className="dash-input"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              maxLength={200}
              placeholder="למשל: ניוזלטר נובמבר — הליבה"
              required
            />
          </Field>

          <Field label="שורת תיאור (רשות)" htmlFor="nl-desc" hint="השורה שמתחת לכותרת בתצוגה המקדימה של הקישור">
            <textarea
              id="nl-desc"
              className="dash-textarea min-h-[5rem]"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              maxLength={300}
              placeholder="מה עשינו החודש, מה מחכה לנו ומה חשוב לדעת"
            />
          </Field>

          <Field label="3. כתובת הקישור" htmlFor="nl-slug">
            <div className="nl-slug" dir="ltr">
              <span className="text-navy/45">{location.host}/newsletter/</span>
              <input
                id="nl-slug"
                value={slug}
                onChange={(e) => setSlug(e.target.value.toLowerCase().replace(/[\s_]+/g, '-').replace(/[^a-z0-9-]/g, ''))}
                maxLength={60}
                required
                aria-invalid={Boolean(slugError)}
              />
            </div>
            {slugError && <p className="mt-2 text-sm text-red-600">{slugError}</p>}
            {editing && slug !== newsletter.slug && !slugError && (
              <p className="mt-2 text-sm text-orange-ink">שימו לב: הקישור הישן ({newsletter.slug}) יפסיק לעבוד.</p>
            )}
          </Field>

          <label className="flex cursor-pointer items-start gap-3">
            <input type="checkbox" className="mt-1 h-4 w-4 accent-[var(--orange)]" checked={published} onChange={(e) => setPublished(e.target.checked)} />
            <span>
              <span className="block font-semibold">פורסם</span>
              <span className="block text-sm text-navy/55">כשזה כבוי, הקישור מציג "הניוזלטר לא נמצא".</span>
            </span>
          </label>

          {error && <p className="rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-600">{error}</p>}

          <div className="flex flex-wrap items-center justify-between gap-3">
            <button type="submit" disabled={!valid || saving} className="dash-btn-primary">
              {saving ? 'שומר…' : editing ? 'שמירת שינויים' : 'שמירה וקבלת קישור'}
            </button>
            {editing &&
              (confirmDelete ? (
                <span className="flex items-center gap-2 text-sm">
                  <span className="text-navy/60">למחוק לצמיתות?</span>
                  <button type="button" onClick={onDelete} className="dash-btn-ghost lx-danger">כן, למחוק</button>
                  <button type="button" onClick={() => setConfirmDelete(false)} className="dash-btn-ghost">ביטול</button>
                </span>
              ) : (
                <button type="button" onClick={() => setConfirmDelete(true)} className="dash-btn-ghost lx-danger">
                  <Trash2 size={16} /> מחיקה
                </button>
              ))}
          </div>
        </div>

        <Preview html={html} loading={htmlLoading} />
      </div>
    </form>
  )
}

function DropZone({ fileName, loading, onFile }) {
  const input = useRef(null)
  const [over, setOver] = useState(false)
  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => input.current?.click()}
      onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && (e.preventDefault(), input.current?.click())}
      onDragOver={(e) => {
        e.preventDefault()
        setOver(true)
      }}
      onDragLeave={() => setOver(false)}
      onDrop={(e) => {
        e.preventDefault()
        setOver(false)
        onFile(e.dataTransfer.files?.[0])
      }}
      className="nl-drop"
      data-over={over || undefined}
    >
      <Upload size={22} className="text-orange-ink" />
      {loading ? (
        <span className="text-sm text-navy/50">טוען…</span>
      ) : fileName ? (
        <>
          <span className="font-semibold" dir="auto">{fileName}</span>
          <span className="text-xs text-navy/50">לחצו או גררו קובץ אחר כדי להחליף</span>
        </>
      ) : (
        <>
          <span className="font-semibold">גררו לכאן קובץ HTML</span>
          <span className="text-xs text-navy/50">או לחצו לבחירה</span>
        </>
      )}
      <input
        ref={input}
        type="file"
        accept=".html,.htm,text/html,.jsx,.tsx"
        hidden
        onChange={(e) => {
          onFile(e.target.files?.[0])
          e.target.value = ''
        }}
      />
    </div>
  )
}

function Preview({ html, loading }) {
  const [device, setDevice] = useState('phone')
  return (
    <div className="lg:sticky lg:top-24">
      <div className="mb-3 flex items-center justify-between">
        <p className="font-semibold">תצוגה מקדימה</p>
        <div className="flex gap-1 rounded-full bg-surface-2 p-1">
          {[
            ['phone', 'טלפון', Smartphone],
            ['desktop', 'מחשב', Monitor],
          ].map(([id, label, Icon]) => (
            <button
              key={id}
              type="button"
              onClick={() => setDevice(id)}
              aria-pressed={device === id}
              aria-label={label}
              title={label}
              className={`rounded-full p-1.5 transition-colors ${device === id ? 'bg-white text-navy shadow-sm' : 'text-navy/45 hover:text-navy'}`}
            >
              <Icon size={16} />
            </button>
          ))}
        </div>
      </div>
      <div className="nl-preview" data-device={device}>
        {html ? (
          <iframe
            title="תצוגה מקדימה"
            srcDoc={withFrameHelpers(html)}
            sandbox="allow-scripts allow-popups allow-popups-to-escape-sandbox allow-forms allow-modals"
          />
        ) : (
          <div className="flex h-full items-center justify-center p-6 text-center text-sm text-navy/40">
            {loading ? 'טוען…' : 'העלו קובץ כדי לראות איך זה ייראה'}
          </div>
        )}
      </div>
    </div>
  )
}

function Field({ label, htmlFor, hint, children }) {
  return (
    <div>
      <label htmlFor={htmlFor} className="mb-1.5 block font-semibold">{label}</label>
      {hint && <p className="-mt-1 mb-2 text-xs text-navy/50">{hint}</p>}
      {children}
    </div>
  )
}

function looksLikeHtml(text) {
  return /<(html|body|div|section|main|p|h1|table|style)[\s>]/i.test(text)
}

function titleFrom(html) {
  const m = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)
  return m ? m[1].replace(/\s+/g, ' ').trim().slice(0, 200) : ''
}

/** e.g. 2026-11 — the usual one-a-month case. Edit it for a second one. */
function defaultSlug() {
  const d = new Date()
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`
}
