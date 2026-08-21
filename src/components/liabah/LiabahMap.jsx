import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { MapPin, Clock, X, ChevronLeft, ChevronRight, Check } from 'lucide-react'
import { locations } from '../../data/liabahData'
import { ISRAEL_PATH, VIEWBOX_W, VIEWBOX_H, project } from '../../data/israelOutline'
import { GlowField, SelectField, DateField, SubmitButton } from '../contactFields'
import { YOUTH_GROUP_FIELDS, YOUTH_GROUP_PRODUCT } from '../../data/youthGroupFields'

gsap.registerPlugin(ScrollTrigger)

const REGIONS = ['מרכז', 'שרון', 'צפון']

// ─── Mobile region-tabs + city list ──────────────────────────────────────────
function MobileLocations({ onSelect }) {
  const [activeRegion, setActiveRegion] = useState('מרכז')
  const cities = locations.filter((l) => l.region === activeRegion)

  return (
    <div className="pb-16">
      {/* Region tabs */}
      <div className="flex gap-2 mb-5">
        {REGIONS.map((r) => (
          <button
            key={r}
            onClick={() => setActiveRegion(r)}
            className={`flex-1 min-h-[44px] py-2.5 rounded-xl font-heebo font-bold text-sm transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange ${
              activeRegion === r
                ? 'bg-orange text-white shadow-md shadow-orange/30'
                : 'bg-white border border-navy/10 text-navy/60 hover:border-orange/40'
            }`}
          >
            {r}
          </button>
        ))}
      </div>

      {/* Cities in active region */}
      <div className="flex flex-col gap-2">
        {cities.map((loc) => (
          <button
            key={loc.id}
            type="button"
            onClick={() => onSelect(loc.id)}
            className="text-right rounded-xl border border-navy/8 bg-white p-4 transition-all duration-200 hover:border-orange/40 hover:bg-orange/[0.03] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange"
          >
            <div className="flex items-center gap-2">
              <MapPin size={16} className="text-orange shrink-0" />
              <h3 className="font-heebo font-bold text-navy">{loc.city}</h3>
              <span className="font-heebo text-navy/40 text-xs">· {loc.teams.length} קבוצות</span>
              <ChevronLeft size={16} className="mr-auto shrink-0 text-navy/25" />
            </div>
            <div className="flex items-center gap-2 mt-1.5 pr-1">
              <Clock size={13} className="text-navy/40 shrink-0" />
              <span className="font-heebo text-navy/55 text-sm">{loc.days}</span>
            </div>
          </button>
        ))}
      </div>

      <p className="font-heebo text-navy/45 text-sm mt-4">
        לא מצאתם קבוצה באזורכם? השאירו פרטים ונעדכן אתכם בפתיחת קבוצה קרובה.
      </p>
    </div>
  )
}

/** Drop the leading city name from a team name for a cleaner per-city label. */
function teamLabel(name, city) {
  const stripped = name.startsWith(city) ? name.slice(city.length).trim() : name
  return stripped || name
}

/**
 * Per-team interest form. Mirrors the youth-group ("קבוצות הנוער") flow of the
 * main ContactModal — same fields, same components, same payload — but framed
 * around the team the visitor already picked on the map. That chosen team
 * (city · team · coach) is shown up top with a "change" link and travels along
 * in the payload as extra data (team/city/coach + a readable inquiryDetails).
 *
 * Persistence reuses the same Make.com webhook as ContactModal — the only
 * sanctioned write into `contact_submissions` (browser inserts are RLS-blocked;
 * Make writes with the service_role key). product_type = 'קבוצות הנוער', so it
 * lands beside every other youth-group lead in the staff dashboard.
 */
function TeamInterestForm({ team, city, onBack }) {
  const teamName = teamLabel(team.name, city)
  // Core + youth-group fields, with the child's city pre-filled to the team's
  // city as a sensible (still editable) default.
  const [form, setForm] = useState(() => ({
    name: '',
    phone: '',
    email: '',
    ...Object.fromEntries(YOUTH_GROUP_FIELDS.map((f) => [f.name, f.name === 'childCity' ? city : ''])),
  }))
  const [status, setStatus] = useState('idle') // idle | loading | error
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (status === 'loading') return
    setStatus('loading')

    // Same shape ContactModal sends, so the existing Make scenario maps it with
    // no changes. Extra keys = the chosen team (readable in the drawer + raw).
    const extraValues = Object.fromEntries(YOUTH_GROUP_FIELDS.map((f) => [f.name, form[f.name] ?? '']))
    const details = Object.fromEntries(YOUTH_GROUP_FIELDS.map((f) => [f.label, form[f.name] ?? '']))
    const payload = {
      name: form.name,
      phone: form.phone,
      email: form.email,
      productType: YOUTH_GROUP_PRODUCT,
      ...extraValues,
      // The team the visitor chose on the map:
      team: team.name,
      city,
      coach: team.coach || '',
      inquiryDetails: `קבוצה שנבחרה: ${teamName} · עיר: ${city}${team.coach ? ` · מאמן/ת: ${team.coach}` : ''}`,
      details: {
        ...details,
        'קבוצה שנבחרה': teamName,
        'עיר הקבוצה': city,
        'מאמן/ת הקבוצה': team.coach || '',
      },
      submittedAt: new Date().toISOString(),
      source: 'fivefingers-website',
      pageUrl: window.location.href,
    }

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
        // No webhook configured yet — keep a simulated send for local dev.
        console.warn('VITE_MAKE_WEBHOOK_URL not set — skipping Make webhook.', payload)
        await new Promise((r) => setTimeout(r, 800))
      }
      setSubmitted(true)
    } catch (err) {
      console.error('Team interest submission failed:', err)
      setStatus('error')
    }
  }

  if (submitted) {
    return (
      <div className="px-6 sm:px-8 pt-6 pb-10 text-center animate-[fadeIn_0.25s_ease-out]">
        <div
          className="flex items-center justify-center mx-auto mb-5 rounded-full"
          style={{ width: '72px', height: '72px', background: '#fff3e6', boxShadow: '0 0 0 8px rgba(255,135,20,0.08)' }}
        >
          <Check size={32} className="text-orange" strokeWidth={2.5} />
        </div>
        <h3 className="font-heebo font-bold text-navy text-2xl tracking-tight">
          {form.name ? `תודה, ${form.name.split(' ')[0]}!` : 'תודה רבה!'}
        </h3>
        <p className="font-heebo text-navy/55 text-[15px] leading-relaxed max-w-[300px] mx-auto mt-2">
          קיבלנו את הפנייה לקבוצת {teamName} ב{city} — נחזור אליכם תוך 24 שעות. נתראה בזירה. 🔥
        </p>
        <button
          type="button"
          onClick={onBack}
          className="mt-6 font-heebo font-semibold text-orange text-[15px] hover:opacity-70 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange rounded px-2 py-1"
        >
          חזרה לפרטי העיר
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="px-6 sm:px-8 pt-8 pb-8 flex flex-col gap-5">
      {/* Back to the city detail */}
      <button
        type="button"
        onClick={onBack}
        className="flex items-center gap-0.5 self-start -mr-1 font-heebo font-medium text-navy/50 text-[15px] hover:text-navy transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange rounded"
      >
        <ChevronRight size={18} />
        חזרה לפרטי העיר
      </button>

      {/* Heading — matches the ContactModal join form */}
      <div>
        <p className="font-mono text-[11px] tracking-[0.25em] uppercase text-orange mb-2">טופס הצטרפות</p>
        <h3 className="font-heebo font-bold text-navy text-[26px] leading-tight tracking-tight">ספרו לנו עליכם</h3>
        <p className="font-heebo text-navy/45 text-sm mt-1">כמה פרטים קצרים ונחזור אליכם תוך 24 שעות.</p>
      </div>

      {/* The team the visitor already chose on the map */}
      <div className="rounded-2xl p-4" style={{ background: '#f7f8fa', border: '1px solid #eef0f3' }}>
        <div className="flex items-center justify-between gap-3">
          <span className="font-heebo text-[11px] font-semibold" style={{ color: '#9aa0ad' }}>הקבוצה שבחרתם</span>
          <button
            type="button"
            onClick={onBack}
            className="font-heebo text-[13px] font-semibold text-orange hover:opacity-70 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange rounded"
          >
            שינוי
          </button>
        </div>
        <div className="font-heebo font-bold text-navy mt-1.5">{teamName}</div>
        <div className="font-heebo text-[13px]" style={{ color: '#6b7180' }}>
          {city}{team.coach ? ` · מאמן/ת ${team.coach}` : ''}
        </div>
      </div>

      {/* Core contact */}
      <GlowField label="שם מלא" name="name" type="text" value={form.name} onChange={handleChange} placeholder="ישראל/ה ישראלי/ת" autoComplete="name" required />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <GlowField label="טלפון" name="phone" type="tel" value={form.phone} onChange={handleChange} placeholder="050-0000000" autoComplete="tel" dir="rtl" required />
        <GlowField label="מייל" name="email" type="email" value={form.email} onChange={handleChange} placeholder="example@mail.com" autoComplete="email" required />
      </div>

      {/* Youth-group questions — identical to the ContactModal flow */}
      <div className="flex flex-col gap-5">
        {YOUTH_GROUP_FIELDS.map((field) =>
          field.type === 'date' ? (
            <DateField key={field.name} label={field.label} name={field.name} value={form[field.name] ?? ''} onChange={handleChange} required={field.required} />
          ) : field.type === 'select' ? (
            <SelectField key={field.name} label={field.label} name={field.name} value={form[field.name] ?? ''} onChange={handleChange} options={field.options} required={field.required} />
          ) : (
            <GlowField key={field.name} label={field.label} name={field.name} type={field.type} value={form[field.name] ?? ''} onChange={handleChange} placeholder={field.placeholder} autoComplete={field.autoComplete} required={field.required} />
          )
        )}
      </div>

      {status === 'error' && (
        <p className="font-heebo text-center text-sm" style={{ color: '#d23a3a' }} role="alert">
          משהו השתבש בשליחה. נסו שוב, או דברו איתנו בוואטסאפ 🙏
        </p>
      )}

      <SubmitButton loading={status === 'loading'} />

      <p className="font-heebo text-center text-xs" style={{ color: '#b3b8c2' }}>
        הפרטים שלכם נשמרים אצלנו בלבד 🤝
      </p>
    </form>
  )
}

export default function LiabahMap() {
  const ref = useRef(null)
  const [active, setActive] = useState(null)   // hovered/focused pin
  const [selected, setSelected] = useState(null) // clicked city → detail panel
  const [interestTeam, setInterestTeam] = useState(null) // team → interest form

  const selectedLoc = locations.find((l) => l.id === selected) || null

  const closePanel = () => {
    setSelected(null)
    setInterestTeam(null)
  }

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const root = ref.current

    const ctx = gsap.context(() => {
      if (reduced) {
        gsap.set('.lm-animate, .lm-pin', { opacity: 1, y: 0, scale: 1 })
        return
      }

      gsap.fromTo('.lm-animate', { y: 50, opacity: 0 }, {
        y: 0, opacity: 1, stagger: 0.06, duration: 1.0, ease: 'power3.out',
        scrollTrigger: { trigger: root, start: 'top 80%' },
      })

      gsap.fromTo('.lm-pin', { y: -16, opacity: 0, scale: 0.5 }, {
        y: 0, opacity: 1, scale: 1, stagger: 0.04, duration: 0.5, ease: 'back.out(2)',
        scrollTrigger: { trigger: '.lm-map', start: 'top 78%' },
      })
    }, ref)
    return () => ctx.revert()
  }, [])

  // Close the detail panel on Escape
  useEffect(() => {
    if (!selected) return
    const onKey = (e) => { if (e.key === 'Escape') setSelected(null) }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [selected])

  return (
    <section
      id="liabah-map"
      ref={ref}
      dir="rtl"
      className="relative w-full overflow-hidden bg-surface"
    >
      {/* warm glows — the redesign's light-section atmosphere */}
      <div className="pointer-events-none absolute top-[-8%] right-[-6%] w-[45vw] h-[45vh] rounded-full bg-orange/8 blur-[150px]" />
      <div className="pointer-events-none absolute bottom-[8%] left-[-8%] w-[40vw] h-[40vh] rounded-full bg-orange/10 blur-[150px]" />

      <div className="relative z-10 max-w-screen-xl mx-auto px-6 sm:px-10 md:px-16">
        {/* heading — right-anchored, the Home v2 language */}
        <div className="lm-animate max-w-3xl pt-24 md:pt-32 pb-12 md:pb-16">
          <p className="ds-eyebrow text-orange-ink mb-3">פריסה ארצית</p>
          <h2 className="ds-section-title text-navy">איפה אנחנו פועלים</h2>
        </div>

        {/* Mobile: region tabs — no map */}
        <div className="sm:hidden">
          <MobileLocations onSelect={setSelected} />
        </div>

        {/* sm+: original map + list layout */}
        <div className="hidden sm:grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center pb-24">
          {/* Map */}
          <div className="lm-animate order-2 lg:order-1 flex justify-center lg:sticky lg:top-24 self-start">
            <div
              className="lm-map relative w-[260px] sm:w-[340px] lg:w-[400px]"
              style={{ aspectRatio: `${VIEWBOX_W} / ${VIEWBOX_H}` }}
            >
              <svg
                viewBox={`0 0 ${VIEWBOX_W} ${VIEWBOX_H}`}
                className="w-full h-full overflow-visible"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d={ISRAEL_PATH}
                  fill="#0d1b4b"
                  fillOpacity="0.06"
                  stroke="#0d1b4b"
                  strokeOpacity="0.22"
                  strokeWidth="6"
                  strokeLinejoin="round"
                />
              </svg>

              {/* Pins — positioned by real geographic projection */}
              {locations.map((loc) => {
                const isActive = active === loc.id
                const { x, y } = project(loc.lng, loc.lat)
                return (
                  <button
                    key={loc.id}
                    onMouseEnter={() => setActive(loc.id)}
                    onMouseLeave={() => setActive(null)}
                    onFocus={() => setActive(loc.id)}
                    onBlur={() => setActive(null)}
                    onClick={() => setSelected(loc.id)}
                    aria-label={`פרטים על ${loc.city}`}
                    // The pin glyph is 18x18 — too small to tap comfortably on an
                    // iPad, where this map (sm+) is the primary view. The ::after
                    // grows the hit area to ~30px without moving the pin. It stops
                    // short of the full 44px on purpose: neighbouring towns (e.g.
                    // עמק חפר מזרח/מערב) sit close enough that 44px boxes would
                    // overlap and steal each other's taps. The locations list
                    // beside the map is the full-size affordance for every city.
                    className="lm-pin absolute rounded-full cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange focus-visible:ring-offset-2 after:absolute after:-inset-1.5 after:content-['']"
                    style={{
                      left: `${(x / VIEWBOX_W) * 100}%`,
                      top: `${(y / VIEWBOX_H) * 100}%`,
                      transform: 'translate(-50%, -100%)',
                      zIndex: isActive ? 30 : 10,
                    }}
                  >
                    {/* City label on hover/focus */}
                    {isActive && (
                      <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 whitespace-nowrap rounded-md bg-navy text-white text-xs font-heebo font-medium px-2 py-0.5 shadow-lg pointer-events-none">
                        {loc.city}
                      </span>
                    )}
                    {/* Pulse ring on active */}
                    {isActive && (
                      <span
                        aria-hidden="true"
                        className="absolute left-1/2 bottom-0 w-5 h-5 rounded-full bg-orange/40"
                        style={{ transform: 'translate(-50%, 50%)', animation: 'pulseRing 1.4s ease-out infinite' }}
                      />
                    )}
                    <MapPin
                      size={isActive ? 28 : 18}
                      className="relative text-orange drop-shadow transition-all duration-200"
                      fill={isActive ? '#ff8714' : '#ffffff'}
                      strokeWidth={2}
                    />
                  </button>
                )
              })}
            </div>
          </div>

          {/* Locations list */}
          <div className="order-1 lg:order-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {locations.map((loc) => {
                const isActive = active === loc.id
                return (
                  <button
                    key={loc.id}
                    type="button"
                    onMouseEnter={() => setActive(loc.id)}
                    onMouseLeave={() => setActive(null)}
                    onClick={() => setSelected(loc.id)}
                    className={`lm-animate text-right rounded-xl border p-4 transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange ${
                      isActive ? 'border-orange bg-orange/[0.05] shadow-sm -translate-y-0.5' : 'border-navy/8 bg-white'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <MapPin size={18} className="text-[#ff8714] shrink-0" />
                      <h3 className="font-heebo font-bold text-navy">{loc.city}</h3>
                      <span className="font-heebo text-navy/40 text-xs">· {loc.teams.length} קבוצות</span>
                      <ChevronLeft size={18} className={`mr-auto shrink-0 transition-colors ${isActive ? 'text-orange' : 'text-navy/25'}`} />
                    </div>
                    <div className="flex items-center gap-2 mt-2 pr-1">
                      <Clock size={15} className="text-navy/40 shrink-0" />
                      <span className="font-heebo text-navy/60 text-sm">{loc.days}</span>
                    </div>
                  </button>
                )
              })}
            </div>
            <p className="lm-animate font-heebo text-navy/45 text-sm mt-4">
              לא מצאתם קבוצה באזורכם? השאירו פרטים ונעדכן אתכם בפתיחת קבוצה קרובה.
            </p>
          </div>
        </div>
      </div>

      {/* City detail panel */}
      {selectedLoc && (
        <div
          onClick={closePanel}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 backdrop-blur-md animate-[fadeIn_0.2s_ease-out]"
          style={{ background: 'rgba(13,27,75,0.35)' }}
          role="dialog"
          aria-modal="true"
          aria-label={selectedLoc.city}
          dir="rtl"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-[28px] bg-white shadow-2xl shadow-navy/25 ring-1 ring-navy/[0.06] animate-[fadeIn_0.25s_ease-out]"
          >
            <button
              onClick={closePanel}
              aria-label="סגור"
              className="absolute top-5 left-5 z-10 flex items-center justify-center w-8 h-8 rounded-full bg-navy/[0.04] text-navy/45 hover:bg-navy/[0.08] hover:text-navy/70 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange"
            >
              <X size={18} />
            </button>

            {interestTeam ? (
              <TeamInterestForm
                team={interestTeam}
                city={selectedLoc.city}
                onBack={() => setInterestTeam(null)}
              />
            ) : (
              /* City detail — the city is the hero; the teams (each a join CTA) are the main event */
              <div className="pb-2">
                {/* Header — city name leads, training info sits quietly beneath as pills */}
                <div className="px-7 sm:px-8 pt-9 pb-5">
                  <p className="font-heebo font-semibold text-orange text-[12px] tracking-[0.06em] mb-2">
                    קבוצות הנוער · {selectedLoc.region}
                  </p>
                  <h3 className="font-heebo font-bold text-navy text-[30px] leading-[1.1] tracking-tight">
                    {selectedLoc.city}
                  </h3>
                  <div className="flex flex-wrap items-center gap-2 mt-4">
                    {selectedLoc.venue && (
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-navy/[0.04] px-3 py-1.5 font-heebo text-navy/70 text-[13px]">
                        <MapPin size={13} className="text-orange shrink-0" />
                        {selectedLoc.venue}
                      </span>
                    )}
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-navy/[0.04] px-3 py-1.5 font-heebo text-navy/70 text-[13px]">
                      <Clock size={13} className="text-orange shrink-0" />
                      {selectedLoc.days}
                    </span>
                  </div>
                </div>

                {/* Teams — the centerpiece. Each row is a standalone join CTA. */}
                <div className="border-t border-navy/[0.07]">
                  <div className="flex items-baseline justify-between px-7 sm:px-8 pt-5 pb-2">
                    <h4 className="font-heebo font-bold text-navy text-[17px]">בחרו קבוצה והצטרפו</h4>
                    <span className="font-heebo text-navy/40 text-[13px] shrink-0">{selectedLoc.teams.length} קבוצות</span>
                  </div>
                  <ul className="px-3 sm:px-4 pb-1">
                    {selectedLoc.teams.map((t) => (
                      <li key={t.name}>
                        <button
                          type="button"
                          onClick={() => setInterestTeam(t)}
                          className="group w-full flex items-center gap-3 rounded-2xl px-4 py-3.5 hover:bg-orange/[0.05] active:bg-orange/[0.08] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-orange"
                        >
                          <div className="flex-1 text-right min-w-0">
                            <div className="font-heebo font-bold text-navy text-[16px] leading-snug truncate">{teamLabel(t.name, selectedLoc.city)}</div>
                            {t.coach && (
                              <div className="font-heebo text-navy/45 text-[13px] mt-0.5 truncate">מאמן/ת {t.coach}</div>
                            )}
                          </div>
                          {/* Join affordance — orange at rest (mobile-legible), fills solid on hover/press */}
                          <span className="shrink-0 inline-flex items-center gap-0.5 rounded-full bg-orange/10 group-hover:bg-orange px-3.5 py-1.5 font-heebo font-bold text-orange group-hover:text-white text-[13px] transition-colors">
                            הצטרפו
                            <ChevronLeft size={15} className="-mr-1" />
                          </span>
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Soft fallback — for visitors unsure which group fits */}
                <div className="px-7 sm:px-8 pt-3 pb-7">
                  <button
                    type="button"
                    onClick={() => setInterestTeam(selectedLoc.teams[0])}
                    className="inline-flex items-center gap-1 font-heebo font-semibold text-navy/55 hover:text-orange text-[13.5px] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange rounded px-1 py-1"
                  >
                    <ChevronLeft size={15} className="shrink-0" />
                    לא בטוחים לאיזו קבוצה מתאים? השאירו פרטים ונכוון אתכם
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  )
}
