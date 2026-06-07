import { useState, useEffect, useRef, forwardRef } from 'react'
import { X, Phone, Mail, Check, Loader2, ArrowLeft } from 'lucide-react'

const PRODUCT_TYPES = [
  'קבוצות הנוער',
  'מכינה',
  'שיתוף פעולה',
  'יואב',
  'קשר עם עמיר',
]

// Quick-contact channels shown on the brand panel.
// Single source of truth: the phone button reuses the WhatsApp number.
const WHATSAPP = '972500000000' // international format (972 = IL)
const EMAIL = 'info@fivefingers.co.il'
// Israeli local display: 9725XXXXXXXX → 05X-XXX-XXXX
const PHONE_DISPLAY = `0${WHATSAPP.slice(3, 5)}-${WHATSAPP.slice(5, 8)}-${WHATSAPP.slice(8)}`

const INITIAL_FORM = { name: '', phone: '', email: '', productType: '' }

export default function ContactModal({ isOpen, onClose, defaultProduct = '' }) {
  const [form, setForm] = useState(INITIAL_FORM)
  const [status, setStatus] = useState('idle') // idle | loading | success
  const overlayRef = useRef(null)
  const firstFieldRef = useRef(null)

  useEffect(() => {
    if (isOpen) {
      setForm({ ...INITIAL_FORM, productType: defaultProduct })
      setStatus('idle')
      document.body.style.overflow = 'hidden'
      // Focus the first field once the entrance settles.
      const t = setTimeout(() => firstFieldRef.current?.focus(), 360)
      return () => clearTimeout(t)
    }
    document.body.style.overflow = ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen, defaultProduct])

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose() }
    if (isOpen) window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [isOpen, onClose])

  const handleBackdrop = (e) => {
    if (e.target === overlayRef.current) onClose()
  }

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (status === 'loading') return
    setStatus('loading')
    console.log('Contact form submission:', form)
    // Simulate async send so the user gets real submit feedback.
    setTimeout(() => setStatus('success'), 900)
  }

  return (
    <div
      ref={overlayRef}
      onClick={handleBackdrop}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
      style={{
        background: 'rgba(6,8,22,0.78)',
        backdropFilter: 'blur(6px)',
        WebkitBackdropFilter: 'blur(6px)',
        opacity: isOpen ? 1 : 0,
        pointerEvents: isOpen ? 'auto' : 'none',
        transition: 'opacity 280ms ease',
      }}
      aria-modal="true"
      role="dialog"
      aria-label="יצירת קשר"
    >
      <div
        dir="rtl"
        className="relative w-full bg-white overflow-hidden flex flex-col md:flex-row"
        style={{
          width: 'min(900px, calc(100vw - 32px))',
          maxHeight: 'calc(100dvh - 48px)',
          borderRadius: '30px',
          boxShadow: '0 30px 90px -20px rgba(0,0,0,0.55)',
          transform: isOpen ? 'translateY(0) scale(1)' : 'translateY(24px) scale(0.96)',
          opacity: isOpen ? 1 : 0,
          transition: 'transform 420ms cubic-bezier(0.22, 1, 0.36, 1), opacity 320ms ease',
        }}
      >
        {/* Close button (top-left = trailing edge in RTL) */}
        <button
          onClick={onClose}
          aria-label="סגירה"
          className="absolute top-4 left-4 z-30 flex items-center justify-center rounded-full transition-all duration-200"
          style={{
            width: '40px', height: '40px',
            background: 'rgba(255,255,255,0.12)',
            color: '#fff',
            backdropFilter: 'blur(4px)',
            border: '1px solid rgba(255,255,255,0.18)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(255,255,255,0.22)'
            e.currentTarget.style.transform = 'rotate(90deg)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(255,255,255,0.12)'
            e.currentTarget.style.transform = 'rotate(0deg)'
          }}
        >
          <X size={18} strokeWidth={2.5} />
        </button>

        {/* ─── Brand panel ─────────────────────────────── */}
        <BrandPanel />

        {/* ─── Form panel ──────────────────────────────── */}
        <div
          className="relative flex-1 overflow-y-auto"
          style={{ background: '#ffffff' }}
        >
          <div className="px-7 sm:px-10 py-9 sm:py-11">
            {status === 'success' ? (
              <SuccessState onClose={onClose} name={form.name} />
            ) : (
              <>
                <p className="font-mono text-[11px] tracking-[0.25em] uppercase text-[#ff8714] mb-2">
                  טופס הצטרפות
                </p>
                <h2 className="font-ragmarom text-[#0d1b4b] mb-1.5" style={{ fontSize: '2rem', lineHeight: 1.1 }}>
                  ספרו לנו עליכם
                </h2>
                <p className="text-sm mb-6" style={{ color: '#9aa0ad' }}>
                  כמה פרטים קצרים ונחזור אליכם תוך 24 שעות.
                </p>

                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                  {/* Interest chips — replaces the dull dropdown */}
                  <ChipGroup
                    value={form.productType}
                    onSelect={(v) => setForm((p) => ({ ...p, productType: v }))}
                  />

                  <GlowField
                    ref={firstFieldRef}
                    label="שם מלא"
                    name="name"
                    type="text"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="ישראל/ה ישראלי/ת"
                    autoComplete="name"
                    required
                  />

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <GlowField
                      label="טלפון"
                      name="phone"
                      type="tel"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="050-0000000"
                      autoComplete="tel"
                      dir="rtl"
                      required
                    />
                    <GlowField
                      label="מייל"
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="example@mail.com"
                      autoComplete="email"
                      required
                    />
                  </div>

                  <SubmitButton loading={status === 'loading'} />

                  <p className="text-center text-xs" style={{ color: '#b3b8c2' }}>
                    הפרטים שלכם נשמרים אצלנו בלבד 🤝
                  </p>
                </form>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Scoped keyframes for the modal */}
      <style>{`
        @keyframes ff-glow {
          0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.55; }
          50% { transform: translate(8%, -6%) scale(1.18); opacity: 0.8; }
        }
        @keyframes ff-pop {
          0% { transform: scale(0.6); opacity: 0; }
          60% { transform: scale(1.08); opacity: 1; }
          100% { transform: scale(1); opacity: 1; }
        }
        @keyframes ff-draw {
          to { stroke-dashoffset: 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          .ff-glow-blob { animation: none !important; }
        }
      `}</style>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────── */

function BrandPanel() {
  const channels = [
    { Icon: WhatsAppIcon, label: 'וואטסאפ', value: 'שלחו הודעה', href: `https://wa.me/${WHATSAPP}` },
    { Icon: Phone, label: 'טלפון', value: PHONE_DISPLAY, href: `tel:+${WHATSAPP}` },
    { Icon: Mail, label: 'מייל', value: EMAIL, href: `mailto:${EMAIL}` },
  ]

  return (
    <div
      className="relative overflow-hidden md:w-[42%] shrink-0 px-7 sm:px-10 py-9 sm:py-11"
      style={{ background: 'linear-gradient(150deg, #0d1b4b 0%, #0a1230 55%, #06081a 100%)' }}
    >
      {/* Animated orange glow */}
      <div
        className="ff-glow-blob absolute -top-16 -right-10 rounded-full pointer-events-none"
        style={{
          width: '240px', height: '240px',
          background: 'radial-gradient(circle, rgba(255,135,20,0.55) 0%, rgba(255,135,20,0) 70%)',
          filter: 'blur(8px)',
          animation: 'ff-glow 7s ease-in-out infinite',
        }}
      />

      <div className="relative z-10 flex flex-col h-full">
        <p className="font-mono text-[11px] tracking-[0.3em] uppercase text-[#ff8714] mb-4">
          בואו נדבר
        </p>
        <h3 className="font-ragmarom text-white leading-[1.05] mb-4" style={{ fontSize: '2.6rem' }}>
          מוכנים
          <br />
          לצעד <span className="text-[#ff8714]">הבא?</span>
        </h3>
        <p className="text-white/55 text-sm leading-relaxed mb-8 max-w-[260px]">
          צעירים/ות, הורים או ארגון — בכל דרך שתבחרו, אנחנו כאן בשבילכם.
        </p>

        {/* Quick contact channels */}
        <div className="mt-auto flex flex-col gap-2.5">
          {channels.map(({ Icon, label, value, href }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith('http') ? '_blank' : undefined}
              rel={href.startsWith('http') ? 'noreferrer' : undefined}
              className="group flex items-center gap-3 rounded-2xl px-3.5 py-3 transition-all duration-200"
              style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)' }}
              onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,135,20,0.15)'; e.currentTarget.style.borderColor = 'rgba(255,135,20,0.4)' }}
              onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)' }}
            >
              <span
                className="flex items-center justify-center rounded-xl shrink-0 transition-colors"
                style={{ width: '38px', height: '38px', background: 'rgba(255,135,20,0.16)' }}
              >
                <Icon size={17} className="text-[#ff8714]" strokeWidth={2} />
              </span>
              <span className="flex flex-col">
                <span className="text-[11px] text-white/45">{label}</span>
                <span className="text-sm font-semibold text-white" dir="ltr" style={{ textAlign: 'right' }}>{value}</span>
              </span>
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}

function ChipGroup({ value, onSelect }) {
  return (
    <fieldset className="border-0 p-0 m-0">
      <legend className="block text-sm font-semibold mb-2.5" style={{ color: '#3a3f4b' }}>
        מה מעניין אתכם?
      </legend>
      <div role="radiogroup" aria-label="מה מעניין אתכם" className="flex flex-wrap gap-2">
        {PRODUCT_TYPES.map((type) => {
          const active = value === type
          return (
            <button
              key={type}
              type="button"
              role="radio"
              aria-checked={active}
              onClick={() => onSelect(active ? '' : type)}
              className="relative rounded-full text-sm font-medium transition-all duration-200"
              style={{
                minHeight: '40px',
                padding: '0 16px',
                background: active ? '#ff8714' : '#f4f5f7',
                color: active ? '#fff' : '#4a4f5a',
                border: `1.5px solid ${active ? '#ff8714' : '#e8eaee'}`,
                transform: active ? 'translateY(-1px)' : 'none',
                boxShadow: active ? '0 6px 16px -4px rgba(255,135,20,0.5)' : 'none',
              }}
              onMouseEnter={(e) => { if (!active) { e.currentTarget.style.borderColor = '#ff8714'; e.currentTarget.style.color = '#ff8714' } }}
              onMouseLeave={(e) => { if (!active) { e.currentTarget.style.borderColor = '#e8eaee'; e.currentTarget.style.color = '#4a4f5a' } }}
            >
              {active && <Check size={14} strokeWidth={3} className="inline-block ml-1 -mt-0.5" />}
              {type}
            </button>
          )
        })}
      </div>
    </fieldset>
  )
}

const GlowField = forwardRef(function GlowField(
  { label, name, type, value, onChange, placeholder, required, dir, autoComplete },
  ref
) {
  const [focused, setFocused] = useState(false)
  const id = `ff-${name}`
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-semibold mb-2" style={{ color: '#3a3f4b' }}>
        {label}{required && <span className="text-[#ff8714]"> *</span>}
      </label>
      <input
        ref={ref}
        id={id}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        autoComplete={autoComplete}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        dir={dir}
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
})

function SubmitButton({ loading }) {
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
          שליחה
          <ArrowLeft size={18} strokeWidth={2.5} className="transition-transform duration-200 group-hover:-translate-x-1" />
        </span>
      )}
    </button>
  )
}

function SuccessState({ onClose, name }) {
  return (
    <div className="text-center py-8" style={{ animation: 'ff-pop 420ms cubic-bezier(0.22,1,0.36,1)' }}>
      <div
        className="flex items-center justify-center mx-auto mb-6 rounded-full"
        style={{ width: '76px', height: '76px', background: '#fff3e6', boxShadow: '0 0 0 8px rgba(255,135,20,0.08)' }}
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="#ff8714" strokeWidth="2.6" className="w-9 h-9">
          <polyline
            points="20 6 9 17 4 12"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ strokeDasharray: 30, strokeDashoffset: 30, animation: 'ff-draw 500ms ease 200ms forwards' }}
          />
        </svg>
      </div>
      <h3 className="font-ragmarom text-[#0d1b4b] mb-2" style={{ fontSize: '1.9rem' }}>
        {name ? `תודה, ${name.split(' ')[0]}!` : 'תודה רבה!'}
      </h3>
      <p className="text-sm leading-relaxed mb-7 max-w-[280px] mx-auto" style={{ color: '#9aa0ad' }}>
        קיבלנו את הפנייה שלכם — נחזור אליכם תוך 24 שעות. נתראה בזירה. 🔥
      </p>
      <button
        onClick={onClose}
        className="font-bold text-white"
        style={{
          padding: '13px 44px',
          borderRadius: '999px',
          background: '#0d1b4b',
          fontSize: '0.95rem',
          border: 'none',
          cursor: 'pointer',
          transition: 'transform 160ms ease, opacity 160ms ease',
        }}
        onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-2px)' }}
        onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)' }}
      >
        סגירה
      </button>
    </div>
  )
}

// Brand-accurate WhatsApp glyph (lucide has no official one).
function WhatsAppIcon({ size = 18, className }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" className={className}>
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2zm0 18.15h-.01a8.2 8.2 0 0 1-4.18-1.14l-.3-.18-3.11.82.83-3.04-.2-.31a8.18 8.18 0 0 1-1.26-4.39c0-4.54 3.7-8.23 8.24-8.23 2.2 0 4.27.86 5.82 2.42a8.18 8.18 0 0 1 2.41 5.82c0 4.54-3.7 8.23-8.24 8.23zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.13-.16.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.01-.38.11-.51.11-.11.25-.29.37-.43.13-.14.17-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.43.06-.66.31-.22.25-.86.85-.86 2.07 0 1.22.89 2.4 1.01 2.56.12.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.14-1.18-.06-.11-.22-.17-.47-.29z" />
    </svg>
  )
}
