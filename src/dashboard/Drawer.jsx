import { useEffect, useState } from 'react'
import { supabase } from './supabaseClient.js'
import { DETAIL_FIELDS, FIELD_LABELS, STATUSES } from './constants.js'

export default function Drawer({ row, onClose, onSaved }) {
  const [status, setStatus] = useState(row.status || 'new')
  const [notes, setNotes] = useState(row.staff_notes || '')
  const [saving, setSaving] = useState(false)
  const [savedAt, setSavedAt] = useState(false)
  const [error, setError] = useState('')

  // Reset local state when a different row is opened.
  useEffect(() => {
    setStatus(row.status || 'new')
    setNotes(row.staff_notes || '')
    setSavedAt(false)
    setError('')
  }, [row.id])

  // Close on Escape.
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  const dirty = status !== (row.status || 'new') || notes !== (row.staff_notes || '')

  async function save() {
    setSaving(true)
    setError('')
    const patch = { status, staff_notes: notes, updated_at: new Date().toISOString() }
    const { error } = await supabase.from('contact_submissions').update(patch).eq('id', row.id)
    setSaving(false)
    if (error) {
      setError('שמירה נכשלה: ' + error.message)
      return
    }
    setSavedAt(true)
    onSaved(patch)
    setTimeout(() => setSavedAt(false), 2000)
  }

  const detailRows = DETAIL_FIELDS.filter((f) => row[f] != null && String(row[f]).trim() !== '')

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* backdrop */}
      <div
        className="absolute inset-0 bg-navy-deep/50 backdrop-blur-[2px]"
        onClick={onClose}
        aria-hidden
      />
      {/* panel (slides from the inline-start edge in RTL) */}
      <aside
        className="relative ms-auto h-full w-full max-w-md bg-white shadow-2xl overflow-y-auto animate-[dashslide_.28s_cubic-bezier(0.22,1,0.36,1)]"
        role="dialog"
        aria-modal="true"
      >
        <div className="sticky top-0 bg-white/90 backdrop-blur-xl border-b border-line px-6 h-16 flex items-center justify-between">
          <h2 className="font-bold text-navy truncate">{row.name}</h2>
          <button
            onClick={onClose}
            className="text-navy/40 hover:text-navy text-2xl leading-none w-8 h-8 flex items-center justify-center"
            aria-label="סגירה"
          >
            ×
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Core contact */}
          <section className="space-y-3">
            <Row label={FIELD_LABELS.phone} value={row.phone} ltr copyable />
            <Row label={FIELD_LABELS.email} value={row.email} ltr copyable />
            <Row label={FIELD_LABELS.product_type} value={row.product_type} />
            <Row label="התקבל" value={formatDate(row.created_at)} />
          </section>

          {/* Interest-specific fields */}
          {detailRows.length > 0 && (
            <section className="space-y-3 pt-2 border-t border-line">
              {detailRows.map((f) => (
                <Row key={f} label={FIELD_LABELS[f] || f} value={row[f]} multiline />
              ))}
            </section>
          )}

          {/* Management */}
          <section className="space-y-4 pt-2 border-t border-line">
            <div>
              <span className="block text-sm font-semibold text-navy/70 mb-2">סטטוס</span>
              <div className="flex gap-2">
                {STATUSES.map((s) => (
                  <button
                    key={s.value}
                    onClick={() => setStatus(s.value)}
                    className={`dash-btn-ghost h-9 px-4 text-sm ${status === s.value ? 'is-active' : ''}`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>

            <label className="block">
              <span className="block text-sm font-semibold text-navy/70 mb-1.5">הערות צוות</span>
              <textarea
                className="dash-textarea"
                placeholder="הערות פנימיות לצוות…"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </label>

            {error && <div className="text-sm text-red-600">{error}</div>}

            <div className="flex items-center gap-3">
              <button className="dash-btn-primary" onClick={save} disabled={!dirty || saving}>
                {saving ? 'שומר…' : 'שמירה'}
              </button>
              {savedAt && <span className="text-sm text-green-600 font-semibold">נשמר ✓</span>}
            </div>
          </section>

          {/* Raw payload, collapsed */}
          {row.raw_payload && (
            <details className="pt-2 border-t border-line">
              <summary className="text-xs text-navy/40 cursor-pointer select-none">
                נתונים גולמיים (raw)
              </summary>
              <pre
                dir="ltr"
                className="mt-2 text-[11px] bg-surface-2 rounded-xl p-3 overflow-x-auto text-navy/60"
              >
                {JSON.stringify(row.raw_payload, null, 2)}
              </pre>
            </details>
          )}
        </div>
      </aside>

      <style>{`@keyframes dashslide{from{transform:translateX(-24px);opacity:.4}to{transform:translateX(0);opacity:1}}`}</style>
    </div>
  )
}

function Row({ label, value, ltr, multiline, copyable }) {
  return (
    <div>
      <div className="text-xs text-navy/45 mb-0.5">{label}</div>
      <div
        dir={ltr ? 'ltr' : undefined}
        className={`text-[15px] text-navy ${ltr ? 'text-left' : ''} ${
          multiline ? 'whitespace-pre-line leading-relaxed' : ''
        }`}
      >
        {copyable ? (
          <a
            href={label.includes('מייל') ? `mailto:${value}` : `tel:${value}`}
            className="hover:text-orange-ink transition-colors"
          >
            {value}
          </a>
        ) : (
          value
        )}
      </div>
    </div>
  )
}

function formatDate(iso) {
  if (!iso) return ''
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return iso
  const pad = (n) => String(n).padStart(2, '0')
  return `${pad(d.getDate())}/${pad(d.getMonth() + 1)}/${d.getFullYear()} ${pad(d.getHours())}:${pad(d.getMinutes())}`
}
