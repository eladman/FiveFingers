import { useState, useEffect, useRef } from 'react'
import { X, ChevronDown } from 'lucide-react'

const PRODUCT_TYPES = [
  'קבוצות הנוער',
  'מכינה',
  'שיתוף פעולה',
  'יואב',
  'קשר עם עמיר',
]

const INITIAL_FORM = { name: '', phone: '', email: '', productType: '' }

export default function ContactModal({ isOpen, onClose }) {
  const [form, setForm] = useState(INITIAL_FORM)
  const [submitted, setSubmitted] = useState(false)
  const overlayRef = useRef(null)

  useEffect(() => {
    if (isOpen) {
      setForm(INITIAL_FORM)
      setSubmitted(false)
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

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
    console.log('Contact form submission:', form)
    setSubmitted(true)
  }

  return (
    <div
      ref={overlayRef}
      onClick={handleBackdrop}
      className="fixed inset-0 z-[100] flex items-center justify-center p-6"
      style={{
        background: 'rgba(0,0,0,0.75)',
        opacity: isOpen ? 1 : 0,
        pointerEvents: isOpen ? 'auto' : 'none',
        transition: 'opacity 250ms ease',
      }}
      aria-modal="true"
      role="dialog"
    >
      {/* Main card */}
      <div
          dir="rtl"
          className="relative w-full bg-white overflow-hidden"
          style={{
            width: 'min(580px, calc(100vw - 48px))',
            borderRadius: '28px',
            boxShadow: '0 8px 40px rgba(0,0,0,0.18)',
            transform: isOpen ? 'translateY(0) scale(1)' : 'translateY(12px) scale(0.97)',
            transition: 'transform 320ms cubic-bezier(0.22, 1, 0.36, 1)',
          }}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            aria-label="סגור"
            className="absolute top-5 left-5 z-10 flex items-center justify-center transition-all duration-150"
            style={{
              width: '30px',
              height: '30px',
              borderRadius: '50%',
              background: '#f3f3f3',
              color: '#999',
              border: 'none',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#e8e8e8'
              e.currentTarget.style.color = '#555'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = '#f3f3f3'
              e.currentTarget.style.color = '#999'
            }}
          >
            <X size={14} strokeWidth={2.5} />
          </button>

          {/* Content */}
          <div className="px-10 pt-10 pb-10">
            {submitted ? (
              <SuccessState onClose={onClose} />
            ) : (
              <>
                {/* Header */}
                <h2
                  className="font-bold text-[#111111] mb-1"
                  style={{ fontSize: '1.9rem', letterSpacing: '-0.02em', lineHeight: 1.15 }}
                >
                  יצירת קשר
                </h2>
                <p className="text-sm mb-7" style={{ color: '#999' }}>
                  נשמח לחזור אליכם בהקדם האפשרי
                </p>

                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                  <CleanField
                    label="שם מלא"
                    name="name"
                    type="text"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="ישראל ישראלי"
                    required
                  />

                  <CleanField
                    label="מספר טלפון"
                    name="phone"
                    type="tel"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="050-0000000"
                    rtl
                    required
                  />

                  <CleanField
                    label="מייל"
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="example@mail.com"
                    required
                  />

                  <CleanSelect
                    label="סוג מוצר"
                    name="productType"
                    value={form.productType}
                    onChange={handleChange}
                    required
                  />

                  <button
                    type="submit"
                    className="w-full font-bold text-white mt-1"
                    style={{
                      height: '52px',
                      borderRadius: '999px',
                      background: '#ff8714',
                      fontSize: '1rem',
                      border: 'none',
                      cursor: 'pointer',
                      transition: 'opacity 200ms ease, transform 200ms ease',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.opacity = '0.9'
                      e.currentTarget.style.transform = 'scale(1.01)'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.opacity = '1'
                      e.currentTarget.style.transform = 'scale(1)'
                    }}
                  >
                    שליחה
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
    </div>
  )
}

function CleanField({ label, name, type, value, onChange, placeholder, required, rtl }) {
  const [focused, setFocused] = useState(false)

  return (
    <div>
      <label
        className="block text-sm font-semibold mb-2"
        style={{ color: '#333' }}
      >
        {label}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        dir={rtl ? 'rtl' : undefined}
        className="w-full text-sm outline-none bg-white"
        style={{
          height: '46px',
          borderRadius: '10px',
          border: `1.5px solid ${focused ? '#ff8714' : '#e2e2e2'}`,
          padding: '0 14px',
          color: '#111',
          transition: 'border-color 150ms ease',
        }}
      />
    </div>
  )
}

function CleanSelect({ label, name, value, onChange, required }) {
  const [focused, setFocused] = useState(false)

  return (
    <div>
      <label
        className="block text-sm font-semibold mb-2"
        style={{ color: '#333' }}
      >
        {label}
      </label>
      <div className="relative">
        <select
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className="w-full text-sm outline-none appearance-none bg-white"
          style={{
            height: '46px',
            borderRadius: '10px',
            border: `1.5px solid ${focused ? '#ff8714' : '#e2e2e2'}`,
            padding: '0 14px',
            paddingLeft: '36px',
            color: value ? '#111' : '#aaa',
            transition: 'border-color 150ms ease',
            cursor: 'pointer',
          }}
        >
          <option value="" disabled>בחרו סוג מוצר</option>
          {PRODUCT_TYPES.map((type) => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
        <ChevronDown
          size={15}
          strokeWidth={2}
          className="absolute pointer-events-none"
          style={{
            left: '12px',
            top: '50%',
            transform: 'translateY(-50%)',
            color: focused ? '#ff8714' : '#aaa',
            transition: 'color 150ms ease',
          }}
        />
      </div>
    </div>
  )
}

function SuccessState({ onClose }) {
  return (
    <div className="text-center py-6">
      <div
        className="flex items-center justify-center mx-auto mb-5"
        style={{
          width: '56px',
          height: '56px',
          borderRadius: '50%',
          background: '#fff5eb',
        }}
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="#ff8714" strokeWidth="2.5" className="w-6 h-6">
          <polyline points="20 6 9 17 4 12" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      <h3 className="font-bold text-[#111] mb-2" style={{ fontSize: '1.4rem' }}>תודה רבה!</h3>
      <p className="text-sm" style={{ color: '#999' }}>
        קיבלנו את פנייתכם ונחזור אליכם בהקדם.
      </p>
      <button
        onClick={onClose}
        className="mt-6 font-bold text-white"
        style={{
          padding: '12px 40px',
          borderRadius: '999px',
          background: '#ff8714',
          fontSize: '0.9rem',
          border: 'none',
          cursor: 'pointer',
          transition: 'opacity 150ms ease',
        }}
        onMouseEnter={(e) => { e.currentTarget.style.opacity = '0.88' }}
        onMouseLeave={(e) => { e.currentTarget.style.opacity = '1' }}
      >
        סגירה
      </button>
    </div>
  )
}
