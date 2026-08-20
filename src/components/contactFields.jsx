// Shared form primitives for the contact / interest forms. Extracted from
// ContactModal so the Liabah map's per-team form renders the identical UI.
import { useState, forwardRef } from 'react'
import { Loader2, ArrowLeft, ChevronDown } from 'lucide-react'

export const GlowField = forwardRef(function GlowField(
  { label, name, type, value, onChange, placeholder, required, dir, autoComplete },
  ref
) {
  const [focused, setFocused] = useState(false)
  const id = `ff-${name}`
  const multiline = type === 'textarea'
  const sharedStyle = {
    borderRadius: '13px',
    background: focused ? '#fff' : '#f7f8fa',
    border: `1.5px solid ${focused ? '#ff8714' : '#e8eaee'}`,
    boxShadow: focused ? '0 0 0 4px rgba(255,135,20,0.12)' : 'none',
    color: '#111',
    transition: 'border-color 160ms ease, box-shadow 160ms ease, background 160ms ease',
  }
  const shared = {
    ref,
    id,
    name,
    value,
    onChange,
    placeholder,
    required,
    autoComplete,
    onFocus: () => setFocused(true),
    onBlur: () => setFocused(false),
    dir,
    className: 'w-full text-sm outline-none',
  }
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-semibold mb-2" style={{ color: '#3a3f4b' }}>
        {label}{required && <span className="text-orange"> *</span>}
      </label>
      {multiline ? (
        <textarea
          {...shared}
          rows={3}
          style={{ ...sharedStyle, minHeight: '92px', padding: '12px 15px', resize: 'vertical', lineHeight: 1.5 }}
        />
      ) : (
        <input
          {...shared}
          type={type}
          style={{ ...sharedStyle, height: '48px', padding: '0 15px' }}
        />
      )}
    </div>
  )
})

/* ─── Date field ───────────────────────────────────────────
   Manual entry with a light DD/MM/YYYY mask: as digits are typed the
   slashes drop in automatically. Native required + pattern handle
   validation; the value stored/sent is the formatted DD/MM/YYYY string. */

function maskDate(raw) {
  const digits = raw.replace(/\D/g, '').slice(0, 8) // DDMMYYYY
  const parts = [digits.slice(0, 2)]
  if (digits.length >= 3) parts.push(digits.slice(2, 4))
  if (digits.length >= 5) parts.push(digits.slice(4, 8))
  return parts.join('/')
}

export function DateField({ label, name, value, onChange, required }) {
  const [focused, setFocused] = useState(false)
  const id = `ff-${name}`
  const handle = (e) => onChange({ target: { name, value: maskDate(e.target.value) } })
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-semibold mb-2" style={{ color: '#3a3f4b' }}>
        {label}{required && <span className="text-orange"> *</span>}
      </label>
      <input
        id={id}
        name={name}
        type="text"
        inputMode="numeric"
        dir="rtl"
        value={value}
        onChange={handle}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        placeholder="יום / חודש / שנה"
        required={required}
        pattern="\d{2}/\d{2}/\d{4}"
        title="בפורמט יום/חודש/שנה, לדוגמה 15/03/2005"
        maxLength={10}
        className="w-full text-sm outline-none"
        style={{
          height: '48px',
          borderRadius: '13px',
          background: focused ? '#fff' : '#f7f8fa',
          border: `1.5px solid ${focused ? '#ff8714' : '#e8eaee'}`,
          boxShadow: focused ? '0 0 0 4px rgba(255,135,20,0.12)' : 'none',
          padding: '0 15px',
          color: '#111',
          transition: 'border-color 160ms ease, box-shadow 160ms ease, background 160ms ease',
        }}
      />
    </div>
  )
}

/* ─── Select field ─────────────────────────────────────────
   Native <select> styled to match GlowField, with a closed option list.
   The empty first option acts as the placeholder and, being required with an
   empty value, forces a real choice on submit. */
export function SelectField({ label, name, value, onChange, options, required }) {
  const [focused, setFocused] = useState(false)
  const id = `ff-${name}`
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-semibold mb-2" style={{ color: '#3a3f4b' }}>
        {label}{required && <span className="text-orange"> *</span>}
      </label>
      <div className="relative">
        <select
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          required={required}
          dir="rtl"
          className="w-full text-sm outline-none appearance-none cursor-pointer"
          style={{
            height: '48px',
            borderRadius: '13px',
            background: focused ? '#fff' : '#f7f8fa',
            border: `1.5px solid ${focused ? '#ff8714' : '#e8eaee'}`,
            boxShadow: focused ? '0 0 0 4px rgba(255,135,20,0.12)' : 'none',
            padding: '0 15px',
            color: value ? '#111' : '#9aa0ad',
            transition: 'border-color 160ms ease, box-shadow 160ms ease, background 160ms ease',
          }}
        >
          <option value="" disabled>בחרו…</option>
          {options.map((opt) => (
            <option key={opt} value={opt} style={{ color: '#111' }}>{opt}</option>
          ))}
        </select>
        <ChevronDown
          size={18}
          strokeWidth={2.5}
          className="pointer-events-none absolute top-1/2 -translate-y-1/2"
          style={{ left: '14px', color: focused ? '#ff8714' : '#9aa0ad' }}
        />
      </div>
    </div>
  )
}

export function SubmitButton({ loading, label = 'שליחה' }) {
  return (
    <button
      type="submit"
      disabled={loading}
      className="group relative w-full overflow-hidden font-bold text-white mt-1 flex items-center justify-center gap-2"
      style={{
        height: '54px',
        borderRadius: '999px',
        background: '#ff8714',
        fontSize: '1.02rem',
        border: 'none',
        cursor: loading ? 'default' : 'pointer',
        boxShadow: '0 10px 26px -8px rgba(255,135,20,0.65)',
        opacity: loading ? 0.92 : 1,
        transition: 'transform 200ms ease, box-shadow 200ms ease',
      }}
      onMouseEnter={(e) => { if (!loading) { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 16px 32px -8px rgba(255,135,20,0.7)' } }}
      onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 10px 26px -8px rgba(255,135,20,0.65)' }}
    >
      {/* Shimmer sweep */}
      <span
        className="absolute inset-0 -translate-x-full group-hover:translate-x-full"
        style={{ background: 'linear-gradient(100deg, transparent, rgba(255,255,255,0.35), transparent)', transition: 'transform 700ms ease' }}
      />
      {loading ? (
        <Loader2 size={20} className="animate-spin relative" />
      ) : (
        <span className="relative flex items-center gap-2">
          {label}
          <ArrowLeft size={18} strokeWidth={2.5} className="transition-transform duration-200 group-hover:-translate-x-1" />
        </span>
      )}
    </button>
  )
}
