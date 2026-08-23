import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { MapPin, Clock, X, ChevronLeft, ChevronRight, Check, Users } from 'lucide-react'
import { locations } from '../../data/liabahData'
import { GlowField, SelectField, DateField, SubmitButton } from '../contactFields'
import { YOUTH_GROUP_FIELDS, YOUTH_GROUP_PRODUCT } from '../../data/youthGroupFields'

gsap.registerPlugin(ScrollTrigger)

// Region bands, north → south. Each carries a one-line orientation cue.
const REGIONS = [
  { name: 'צפון', tag: 'עמק יזרעאל והכרמל' },
  { name: 'מרכז', tag: 'גוש דן וירושלים' },
  { name: 'שרון', tag: 'מהרצליה ועד עמק חפר' },
]

// ─── A single city card — the tap target that opens the city detail ──────────
function CityCard({ loc, onSelect }) {
  return (
    <button
      type="button"
      onClick={() => onSelect(loc.id)}
      className="group text-right rounded-2xl border border-navy/8 bg-white p-4 sm:p-5 transition-all duration-200 cursor-pointer hover:border-orange/50 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-navy/[0.06] active:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange focus-visible:ring-offset-2"
    >
      <div className="flex items-center gap-3">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-orange/10 text-orange transition-colors duration-200 group-hover:bg-orange group-hover:text-white">
          <MapPin size={18} strokeWidth={2.2} />
        </span>
        <div className="min-w-0 flex-1">
          <h4 className="font-heebo font-bold text-navy text-[17px] leading-tight truncate">{loc.city}</h4>
          <span className="font-heebo text-navy/45 text-[13px]">{loc.teams.length} קבוצות</span>
        </div>
        <ChevronLeft size={20} className="shrink-0 text-navy/25 transition-all duration-200 group-hover:text-orange group-hover:-translate-x-0.5" />
      </div>
      <div className="flex items-center gap-1.5 mt-3.5 pt-3.5 border-t border-navy/[0.06]">
        <Clock size={14} className="shrink-0 text-navy/40" />
        <span className="font-heebo text-navy/55 text-[13.5px]">{loc.days}</span>
      </div>
    </button>
  )
}

// ─── A region band — bold header + its city grid ─────────────────────────────
function RegionBand({ region, cities, onSelect }) {
  return (
    <div className="lm-animate">
      {/* Band header — region name leads, a rule carries the eye, count anchors the end */}
      <div className="flex items-center gap-4 mb-6">
        <div className="min-w-0">
          <h3 className="font-heebo font-extrabold text-navy text-2xl md:text-[28px] leading-none tracking-tight">
            {region.name}
          </h3>
          <p className="font-heebo text-navy/45 text-[13px] mt-1.5">{region.tag}</p>
        </div>
        <span className="h-px flex-1 bg-navy/10 min-w-4" />
        <span className="shrink-0 inline-flex items-center gap-1.5 rounded-full bg-navy/[0.04] px-3 py-1.5 font-heebo font-semibold text-navy/60 text-[13px]">
          <Users size={13} className="text-orange" />
          {cities.length} יישובים
        </span>
      </div>

      {/* City grid — scales from 1-up (mobile) to 3-up (desktop) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
        {cities.map((loc) => (
          <CityCard key={loc.id} loc={loc} onSelect={onSelect} />
        ))}
      </div>
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
        gsap.set('.lm-animate', { opacity: 1, y: 0 })
        return
      }

      gsap.fromTo('.lm-animate', { y: 40, opacity: 0 }, {
        y: 0, opacity: 1, stagger: 0.09, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: root, start: 'top 78%' },
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
        <div className="lm-animate max-w-3xl pt-24 md:pt-32 pb-8 md:pb-10">
          <p className="ds-eyebrow text-orange-ink mb-3">פריסה ארצית</p>
          <h2 className="ds-section-title text-navy">איפה אנחנו פועלים</h2>
          <p className="font-heebo text-navy/55 text-lg mt-4 leading-relaxed">
            <span className="font-bold text-navy">{locations.length} יישובים</span> בשלושה אזורים.
            בחרו את האזור שלכם, מצאו קבוצה — והצטרפו.
          </p>
        </div>

        {/* Region bands — north → south, each its own block of city cards */}
        <div className="flex flex-col gap-14 md:gap-16 pb-16">
          {REGIONS.map((region) => (
            <RegionBand
              key={region.name}
              region={region}
              cities={locations.filter((l) => l.region === region.name)}
              onSelect={setSelected}
            />
          ))}
        </div>

        {/* Fallback — for towns not yet on the list */}
        <div className="lm-animate flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-5 rounded-2xl border border-dashed border-navy/15 bg-white/40 px-6 py-5 mb-24">
          <p className="font-heebo text-navy/60 text-[15px] leading-relaxed flex-1">
            לא מצאתם קבוצה באזורכם? השאירו פרטים ונעדכן אתכם ברגע שנפתחת קבוצה קרובה.
          </p>
          <a
            href="#contact"
            className="shrink-0 inline-flex items-center justify-center gap-1 rounded-full bg-navy px-5 py-2.5 font-heebo font-bold text-white text-[14px] transition-colors hover:bg-navy/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange focus-visible:ring-offset-2"
          >
            עדכנו אותי
            <ChevronLeft size={16} className="-mr-1" />
          </a>
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
                  {selectedLoc.manager && (
                    <p className="font-heebo text-navy/55 text-[13.5px] mt-2">
                      מנהל/ת אזור · <span className="font-semibold text-navy/75">{selectedLoc.manager}</span>
                    </p>
                  )}
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
                            {(t.hours || t.venue || t.note) && (
                              <div className="flex flex-wrap items-center gap-x-2.5 gap-y-0.5 mt-1 font-heebo text-[12.5px]">
                                {t.hours && (
                                  <span className="inline-flex items-center gap-1 text-navy/50">
                                    <Clock size={12} className="text-orange/80 shrink-0" />
                                    {t.hours}
                                  </span>
                                )}
                                {t.venue && (
                                  <span className="inline-flex items-center gap-1 text-navy/50">
                                    <MapPin size={12} className="text-orange/80 shrink-0" />
                                    {t.venue}
                                  </span>
                                )}
                                {t.note && (
                                  <span className="text-orange font-semibold">{t.note}</span>
                                )}
                              </div>
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
