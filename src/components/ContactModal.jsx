import { useState, useEffect, useRef } from 'react'
import { X, Phone, Mail, Check, ChevronDown } from 'lucide-react'
import { WHATSAPP_HREF, PHONE_HREF, EMAIL, EMAIL_HREF, PHONE_DISPLAY } from '../data/contact'
import { getLenis } from '../lib/smoothScroll'
import { submitToHubSpot } from '../lib/hubspot'
import { GlowField, DateField, SelectField, SubmitButton } from './contactFields'
import { YOUTH_GROUP_FIELDS } from '../data/youthGroupFields'

// Interest options grouped by life-stage / intent, so youth, pre-army young
// adults, graduates, and organizations each see their own lane instead of one
// flat cloud. The `items` strings are the actual productType values (unchanged),
// so deep-links from pages still preselect correctly. מכינה / Boost / כרמל are
// the three tracks of the Academy, hence one group.
const INTEREST_GROUPS = [
  { label: 'נוער', hint: 'גילאי 10-18', items: ['קבוצות הנוער'] },
  { label: 'מכינה והכנה לצבא', hint: 'מלש״בים', items: ['מכינה', 'Boost', 'כרמל'] },
  { label: 'בוגרים', hint: '21+', items: ['יואב'] },
  { label: 'שותפויות וקשר', hint: '', items: ['שיתוף פעולה', 'קשר עם עמיר'] },
]

const JOBS_LABEL = 'משרות בתנועה'
const JOB_ROLES = ['מאמן/ת', 'הדרכה בהזנק', 'צוות מטה', 'הדרכה במכינה']

// Some page CTAs deep-link us with a program/section label that isn't the exact
// chip value (e.g. an Alumni page says "בוגרים", the chip is "יואב"). Map those
// to a real chip so the preselected interest actually highlights when expanded.
const TYPE_ALIASES = {
  'בוגרים': 'יואב',
  'קהילת הבוגרים': 'יואב',
  'שיתופי פעולה': 'שיתוף פעולה',
  'המכינה הקדם צבאית': 'מכינה',
  'הזנק': 'Boost',
}
const normalizeType = (t) => TYPE_ALIASES[t] || t

// Every movement role is a job application, so they all collect the same
// application details. Rendered only once a specific role is selected.
const JOB_APPLICATION_FIELDS = [
  { name: 'residence', label: 'מקום מגורים', type: 'text', placeholder: 'עיר / יישוב', autoComplete: 'address-level2', required: true },
  { name: 'birthDate', label: 'תאריך לידה', type: 'date', required: true },
  { name: 'experience', label: 'ניסיון תעסוקתי רלוונטי', type: 'textarea', placeholder: 'ספרו בקצרה על תפקידים וניסיון שרלוונטיים לתפקיד', required: true },
  { name: 'certificates', label: 'תעודות (אם יש)', type: 'textarea', placeholder: 'פירוט תעודות והסמכות רלוונטיות, או קישור אליהן', required: false },
]

// "שיתוף פעולה" (partnership) inquiries come from an organization rather than
// an individual, so we collect who they represent and a target date instead
// of the personal/job fields above.
const PARTNERSHIP_FIELDS = [
  { name: 'orgName', label: 'ארגון', type: 'text', placeholder: 'שם הארגון', required: true },
  { name: 'orgRole', label: 'תפקיד בארגון', type: 'text', placeholder: 'התפקיד שלכם בארגון', required: true },
  { name: 'inquiryDetails', label: 'פירוט', type: 'textarea', placeholder: 'ספרו לנו על השיתוף פעולה שאתם מדמיינים', required: true },
  { name: 'targetDate', label: 'תאריך מבוקש', type: 'date', required: false },
]

// "יואב" (alumni) inquiries are otherwise contact-only, so we add a single
// free-text field asking what the graduate wants to reach out about.
const ALUMNI_FIELDS = [
  { name: 'inquiryDetails', label: 'פירוט הפנייה', type: 'textarea', placeholder: 'ספרו לנו במה תרצו לעזור/להיעזר', required: true },
]

// Per-interest custom fields, keyed by the exact chip/role label.
const EXTRA_FIELDS = {
  ...Object.fromEntries(JOB_ROLES.map((role) => [role, JOB_APPLICATION_FIELDS])),
  'קבוצות הנוער': YOUTH_GROUP_FIELDS,
  'שיתוף פעולה': PARTNERSHIP_FIELDS,
  'יואב': ALUMNI_FIELDS,
}

const INITIAL_FORM = { name: '', phone: '', email: '', productType: '' }

// The reserved core keys — everything else on the form object is an extra field.
const CORE_KEYS = Object.keys(INITIAL_FORM)

const CONTACT_CHANNELS = [
  { Icon: WhatsAppIcon, label: 'וואטסאפ', value: 'שלחו הודעה', href: WHATSAPP_HREF },
  { Icon: Phone, label: 'טלפון', value: PHONE_DISPLAY, href: PHONE_HREF },
  { Icon: Mail, label: 'מייל', value: EMAIL, href: EMAIL_HREF },
]

export default function ContactModal({ isOpen, onClose, defaultProduct = '' }) {
  const [form, setForm] = useState(INITIAL_FORM)
  const [status, setStatus] = useState('idle') // idle | loading | success
  const [jobsOpen, setJobsOpen] = useState(false) // "משרות בתנועה" role sub-panel expanded?
  // When a page deep-links us with a specific interest, the full lane picker is
  // collapsed down to just the preselected chip (with a "change" affordance).
  // Opened from the homepage / navbar / footer (no product) it starts expanded.
  const [pickerExpanded, setPickerExpanded] = useState(true)
  const overlayRef = useRef(null)
  const firstFieldRef = useRef(null)

  useEffect(() => {
    if (isOpen) {
      const product = normalizeType(defaultProduct)
      setForm({ ...INITIAL_FORM, productType: product })
      setStatus('idle')
      // If a page opened us tagged with a specific role, expand the jobs panel.
      setJobsOpen(JOB_ROLES.includes(product))
      // Collapse the picker only when we arrived pre-tagged from a page.
      setPickerExpanded(!defaultProduct)
      document.body.style.overflow = 'hidden'
      // Lenis drives page scroll via its own RAF loop, so body overflow:hidden
      // alone doesn't stop a wheel/touch gesture over the overlay from
      // scrolling the page underneath — pause it while the modal is open.
      getLenis()?.stop()
      // Focus the first field once the entrance settles.
      const t = setTimeout(() => firstFieldRef.current?.focus(), 360)
      return () => clearTimeout(t)
    }
    document.body.style.overflow = ''
    getLenis()?.start()
    return () => {
      document.body.style.overflow = ''
      getLenis()?.start()
    }
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

  // Switching interest type: drop any prior type's extra answers and seed the
  // new type's fields as empty so the payload never carries stale data.
  const handleTypeSelect = (type) => {
    setForm((prev) => {
      const core = Object.fromEntries(CORE_KEYS.map((k) => [k, prev[k]]))
      const seeded = Object.fromEntries((EXTRA_FIELDS[type] || []).map((f) => [f.name, '']))
      return { ...core, ...seeded, productType: type }
    })
  }

  // Picking a normal top-level chip closes the jobs panel and — once a real
  // type is chosen — collapses the picker down to that selection (deselecting
  // back to '' keeps it open so there's something to pick).
  const handleSelectTop = (type) => {
    setJobsOpen(false)
    handleTypeSelect(type)
    if (type) setPickerExpanded(false)
  }

  // Picking a specific job role collapses the picker just like a top-level chip.
  const handleSelectRole = (role) => {
    handleTypeSelect(role)
    if (role) setPickerExpanded(false)
  }

  // The "משרות בתנועה" chip just toggles the role sub-panel; no role committed yet.
  const handleToggleJobs = () => {
    setJobsOpen((open) => !open)
    handleTypeSelect('')
  }

  const extraFields = EXTRA_FIELDS[form.productType] || []

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (status === 'loading') return
    setStatus('loading')

    // Per-interest extra answers — sent both as raw keys (for scripting) and as
    // a Hebrew label→value map (for a readable email) so the Make.com automation
    // needs no per-type schema.
    const extraValues = Object.fromEntries(extraFields.map((f) => [f.name, form[f.name] ?? '']))
    const details = Object.fromEntries(extraFields.map((f) => [f.label, form[f.name] ?? '']))

    // Payload sent to the Make.com webhook that fires the thank-you automation.
    const payload = {
      name: form.name,
      phone: form.phone,
      email: form.email,
      productType: form.productType,
      ...extraValues,
      details,
      submittedAt: new Date().toISOString(),
      source: 'fivefingers-website',
      pageUrl: window.location.href,
    }

    // Mirror the lead into HubSpot as a Contact Record. Deliberately outside the
    // try below and not awaited: the visitor's success/error state stays driven
    // purely by Make.com, so HubSpot can never break the form.
    submitToHubSpot(payload)

    const webhookUrl = import.meta.env.VITE_MAKE_WEBHOOK_URL

    try {
      if (webhookUrl) {
        const res = await fetch(webhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        })
        if (!res.ok) throw new Error(`Webhook responded ${res.status}`)
      } else {
        // No webhook configured yet — keep the simulated send for local dev.
        console.warn('VITE_MAKE_WEBHOOK_URL not set — skipping Make webhook.', payload)
        await new Promise((r) => setTimeout(r, 900))
      }
      setStatus('success')
    } catch (err) {
      console.error('Contact form submission failed:', err)
      setStatus('error')
    }
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
        className="relative w-full bg-white overflow-hidden flex flex-col"
        style={{
          width: 'min(600px, calc(100vw - 32px))',
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
          // 44px to clear the minimum touch target (it measured 40×40). The
          // hover rotate moved to CSS: on touch the mouseenter fired without a
          // matching mouseleave, leaving the ✕ stuck at 90°.
          className="cm-close absolute top-4 left-4 z-30 flex items-center justify-center rounded-full transition-all duration-200"
          style={{
            width: '44px', height: '44px',
            background: 'rgba(13,27,75,0.06)',
            color: '#0d1b4b',
            border: '1px solid rgba(13,27,75,0.12)',
          }}
        >
          <X size={18} strokeWidth={2.5} />
        </button>

        {/* ─── Form panel ──────────────────────────────── */}
        <div
          data-lenis-prevent
          className="relative flex-1 min-h-0 overflow-y-auto"
          style={{ background: '#ffffff' }}
        >
          <div className="px-6 py-6 sm:px-10 sm:py-11">
            {status === 'success' ? (
              <SuccessState onClose={onClose} name={form.name} />
            ) : (
              <>
                <p className="font-mono text-[11px] tracking-[0.25em] uppercase text-orange mb-2">
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
                    jobsOpen={jobsOpen}
                    expanded={pickerExpanded}
                    onExpand={() => setPickerExpanded(true)}
                    onSelectTop={handleSelectTop}
                    onToggleJobs={handleToggleJobs}
                    onSelectRole={handleSelectRole}
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

                  {/* Per-interest questions come after the core contact fields,
                      so name / phone / email are always filled first. */}
                  {extraFields.length > 0 && (
                    <div key={form.productType} className="flex flex-col gap-5" style={{ animation: 'ff-reveal 320ms cubic-bezier(0.22,1,0.36,1)' }}>
                      {extraFields.map((field) =>
                        field.type === 'date' ? (
                          <DateField
                            key={field.name}
                            label={field.label}
                            name={field.name}
                            value={form[field.name] ?? ''}
                            onChange={handleChange}
                            required={field.required}
                          />
                        ) : field.type === 'select' ? (
                          <SelectField
                            key={field.name}
                            label={field.label}
                            name={field.name}
                            value={form[field.name] ?? ''}
                            onChange={handleChange}
                            options={field.options}
                            required={field.required}
                          />
                        ) : (
                          <GlowField
                            key={field.name}
                            label={field.label}
                            name={field.name}
                            type={field.type}
                            value={form[field.name] ?? ''}
                            onChange={handleChange}
                            placeholder={field.placeholder}
                            autoComplete={field.autoComplete}
                            required={field.required}
                          />
                        )
                      )}
                    </div>
                  )}

                  {status === 'error' && (
                    <p className="text-center text-sm" style={{ color: '#d23a3a' }}>
                      משהו השתבש בשליחה. נסו שוב, או דברו איתנו בוואטסאפ 🙏
                    </p>
                  )}

                  <SubmitButton loading={status === 'loading'} />

                  <p className="text-center text-xs" style={{ color: '#b3b8c2' }}>
                    הפרטים שלכם נשמרים אצלנו בלבד 🤝
                  </p>
                </form>
              </>
            )}

            <ContactBar />
          </div>
        </div>
      </div>

      {/* Scoped keyframes for the modal */}
      <style>{`
        @keyframes ff-pop {
          0% { transform: scale(0.6); opacity: 0; }
          60% { transform: scale(1.08); opacity: 1; }
          100% { transform: scale(1); opacity: 1; }
        }
        @keyframes ff-draw {
          to { stroke-dashoffset: 0; }
        }
        @keyframes ff-reveal {
          from { opacity: 0; transform: translateY(-6px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes ff-settle {
          0% { opacity: 0; transform: scale(0.85) translateY(-4px); }
          55% { opacity: 1; transform: scale(1.06); }
          100% { opacity: 1; transform: scale(1) translateY(0); }
        }
      `}</style>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────── */

/* Quick contact channels — sits at the very bottom of the form for every
   screen size (replaces the old navy brand panel). Each channel shows its
   icon, label, and the actual value (number / address). */
function ContactBar() {
  return (
    <div className="mt-7 pt-6" style={{ borderTop: '1px solid #eef0f3' }}>
      <p className="text-xs font-semibold mb-3" style={{ color: '#9aa0ad' }}>
        או דברו איתנו ישירות
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
        {CONTACT_CHANNELS.map(({ Icon, label, value, href }) => (
          <a
            key={label}
            href={href}
            target={href.startsWith('http') ? '_blank' : undefined}
            rel={href.startsWith('http') ? 'noreferrer' : undefined}
            className="flex items-center gap-2.5 rounded-2xl px-3 py-2.5 transition-all duration-200"
            style={{ background: '#f7f8fa', border: '1px solid #eef0f3' }}
            onMouseEnter={(e) => { e.currentTarget.style.background = '#fff3e6'; e.currentTarget.style.borderColor = 'rgba(255,135,20,0.35)' }}
            onMouseLeave={(e) => { e.currentTarget.style.background = '#f7f8fa'; e.currentTarget.style.borderColor = '#eef0f3' }}
          >
            <span
              className="flex items-center justify-center rounded-xl shrink-0"
              style={{ width: '36px', height: '36px', background: 'rgba(255,135,20,0.12)' }}
            >
              <Icon size={17} className="text-orange" strokeWidth={2} />
            </span>
            <span className="flex flex-col min-w-0">
              <span className="text-[11px]" style={{ color: '#9aa0ad' }}>{label}</span>
              <span className="text-[13px] font-semibold truncate" dir="ltr" style={{ color: '#3a3f4b', textAlign: 'right' }}>{value}</span>
            </span>
          </a>
        ))}
      </div>
    </div>
  )
}

function Chip({ label, active, onClick, trailing, inactiveBg = '#f4f5f7', ...aria }) {
  return (
    <button
      type="button"
      onClick={onClick}
      {...aria}
      // cm-chip carries the hover tint in CSS (pointer-gated) — as inline
      // handlers it stuck on touch, leaving an un-selected chip looking active.
      data-active={active ? 'true' : undefined}
      className="cm-chip relative rounded-full text-sm font-medium transition-all duration-200 flex items-center"
      style={{
        minHeight: '44px',
        padding: '0 16px',
        background: active ? '#ff8714' : inactiveBg,
        color: active ? '#fff' : '#4a4f5a',
        border: `1.5px solid ${active ? '#ff8714' : '#e8eaee'}`,
        transform: active ? 'translateY(-1px)' : 'none',
        boxShadow: active ? '0 6px 16px -4px rgba(255,135,20,0.5)' : 'none',
      }}
    >
      {active && <Check size={14} strokeWidth={3} className="inline-block ml-1 -mt-0.5" />}
      {label}
      {trailing}
    </button>
  )
}

// Small caption above each interest lane: "נוער · גילאי 10-18".
function GroupHeader({ label, hint }) {
  return (
    <div className="flex items-baseline gap-1.5 mb-2">
      <span className="text-[12px] font-bold" style={{ color: '#0d1b4b' }}>{label}</span>
      {hint && <span className="text-[11px] font-medium" style={{ color: '#aeb4bf' }}>· {hint}</span>}
    </div>
  )
}

function ChipGroup({ value, jobsOpen, expanded, onExpand, onSelectTop, onToggleJobs, onSelectRole }) {
  // Deep-linked from a page: show just the preselected interest with a way to
  // change it, instead of the full set of lanes.
  if (!expanded && value) {
    return (
      <fieldset className="border-0 p-0 m-0">
        <legend className="block text-sm font-semibold mb-3" style={{ color: '#3a3f4b' }}>
          מה מעניין אתכם?
        </legend>
        <div className="flex flex-wrap items-center gap-3">
          <span style={{ display: 'inline-flex', animation: 'ff-settle 380ms cubic-bezier(0.22,1,0.36,1)' }}>
            <Chip label={value} active onClick={onExpand} />
          </span>
          <button
            type="button"
            onClick={onExpand}
            className="text-sm font-semibold transition-colors duration-200"
            style={{ color: '#9aa0ad', textDecoration: 'underline', textUnderlineOffset: '3px', animation: 'ff-reveal 320ms ease 140ms both' }}
            onMouseEnter={(e) => { e.currentTarget.style.color = '#ff8714' }}
            onMouseLeave={(e) => { e.currentTarget.style.color = '#9aa0ad' }}
          >
            לא זה? שנו בחירה
          </button>
        </div>
      </fieldset>
    )
  }

  return (
    <fieldset className="border-0 p-0 m-0">
      <legend className="block text-sm font-semibold mb-3" style={{ color: '#3a3f4b' }}>
        מה מעניין אתכם?
      </legend>

      <div className="flex flex-col gap-4" style={{ animation: 'ff-reveal 300ms ease' }}>
        {/* Life-stage lanes */}
        {INTEREST_GROUPS.map((group) => (
          <div key={group.label}>
            <GroupHeader label={group.label} hint={group.hint} />
            <div role="radiogroup" aria-label={group.label} className="flex flex-wrap gap-2">
              {group.items.map((type) => (
                <Chip
                  key={type}
                  label={type}
                  active={value === type}
                  role="radio"
                  aria-checked={value === type}
                  onClick={() => onSelectTop(value === type ? '' : type)}
                />
              ))}
            </div>
          </div>
        ))}

        {/* Careers lane — the roles hide behind one chip that expands below */}
        <div>
          <GroupHeader label="הצטרפות לצוות" />
          <div className="flex flex-wrap gap-2">
            <Chip
              label={JOBS_LABEL}
              active={jobsOpen}
              aria-expanded={jobsOpen}
              onClick={onToggleJobs}
              trailing={
                <ChevronDown
                  size={15}
                  strokeWidth={2.5}
                  className="mr-1 -ml-0.5 transition-transform duration-200"
                  style={{ transform: jobsOpen ? 'rotate(180deg)' : 'none' }}
                />
              }
            />
          </div>

          {jobsOpen && (
            <div
              className="mt-3 rounded-2xl"
              style={{ background: '#f7f8fa', border: '1px solid #eef0f3', padding: '14px', animation: 'ff-reveal 240ms ease' }}
            >
              <p className="text-xs font-semibold mb-2.5" style={{ color: '#6b7180' }}>
                בחרו תפקיד
              </p>
              <div role="radiogroup" aria-label="בחירת תפקיד" className="flex flex-wrap gap-2">
                {JOB_ROLES.map((role) => (
                  <Chip
                    key={role}
                    label={role}
                    active={value === role}
                    inactiveBg="#fff"
                    role="radio"
                    aria-checked={value === role}
                    onClick={() => onSelectRole(value === role ? '' : role)}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </fieldset>
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
        קיבלנו את הפנייה שלך - נחזור אלייך תוך 24 שעות. נתראה בזירה. 🔥
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
