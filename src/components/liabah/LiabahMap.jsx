import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { MapPin, Clock, Users, User, X, ChevronLeft } from 'lucide-react'
import { locations, coaches } from '../../data/liabahData'
import { ISRAEL_PATH, VIEWBOX_W, VIEWBOX_H, project } from '../../data/israelOutline'
import { SectionBg, SectionHeading } from './shared'

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
            className={`flex-1 py-2.5 rounded-xl font-heebo font-bold text-sm transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange ${
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

export default function LiabahMap() {
  const ref = useRef(null)
  const [active, setActive] = useState(null)   // hovered/focused pin
  const [selected, setSelected] = useState(null) // clicked city → detail panel

  const selectedLoc = locations.find((l) => l.id === selected) || null
  const selectedCoach = selectedLoc ? coaches.find((c) => c.region === selectedLoc.region) : null

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
      className="relative w-full overflow-hidden bg-[#ffffff]"
    >
      <SectionBg watermark={false} />

      <div className="relative z-10 max-w-screen-xl mx-auto px-6 md:px-12 lg:px-20">
        <SectionHeading eyebrow="פריסה ארצית" title="איפה אנחנו פועלים" animateClass="lm-animate" />

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
                    aria-label={`${loc.city} — פרטים`}
                    className="lm-pin absolute rounded-full cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange focus-visible:ring-offset-2"
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
          onClick={() => setSelected(null)}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 animate-[fadeIn_0.2s_ease-out]"
          style={{ background: 'rgba(13,27,75,0.55)' }}
          role="dialog"
          aria-modal="true"
          aria-label={selectedLoc.city}
          dir="rtl"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-2xl bg-white shadow-2xl shadow-navy/30 animate-[fadeIn_0.25s_ease-out]"
          >
            <button
              onClick={() => setSelected(null)}
              aria-label="סגור"
              className="absolute top-4 left-4 z-10 flex items-center justify-center w-9 h-9 rounded-full bg-white/90 text-navy/70 hover:text-navy hover:bg-white shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange"
            >
              <X size={20} />
            </button>

            {/* Coach photo / placeholder */}
            <div className="relative w-full h-52 sm:h-60 overflow-hidden bg-navy/[0.04] rounded-t-2xl">
              {selectedCoach?.imageSrc ? (
                <>
                  <img
                    src={selectedCoach.imageSrc}
                    alt={selectedCoach.name}
                    className="absolute inset-0 w-full h-full object-cover"
                    style={{ objectPosition: selectedCoach.imgPosition }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/70 via-navy/10 to-transparent" />
                </>
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                  <div className="flex items-center justify-center w-16 h-16 rounded-full bg-orange/10">
                    <User size={32} className="text-orange" strokeWidth={1.5} />
                  </div>
                  <span className="font-heebo text-navy/40 text-sm">מנהל/ת אזור בקרוב</span>
                </div>
              )}

              {/* City badge */}
              <div className="absolute top-4 right-4 flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1 shadow-sm">
                <MapPin size={14} className="text-orange" />
                <span className="font-heebo font-bold text-navy text-sm">{selectedLoc.city}</span>
              </div>

              {/* Coach name over photo */}
              {selectedCoach?.imageSrc && (
                <div className="absolute bottom-4 right-5 text-white">
                  <h3 className="font-heebo font-bold text-2xl drop-shadow">{selectedCoach.name}</h3>
                  <p className="font-heebo text-white/85 text-sm drop-shadow">{selectedCoach.role}</p>
                </div>
              )}
            </div>

            {/* Body */}
            <div className="p-6 sm:p-7 flex flex-col gap-5">
              {/* Coach name + bio (when present) */}
              {selectedCoach && !selectedCoach.imageSrc && (
                <div>
                  <h3 className="font-heebo font-bold text-navy text-xl">{selectedCoach.name}</h3>
                  <p className="font-heebo text-[#ff8714] text-sm mt-0.5">{selectedCoach.role}</p>
                </div>
              )}
              {selectedCoach?.bio && (
                <p className="font-heebo text-navy/70 leading-relaxed">{selectedCoach.bio}</p>
              )}

              {/* Teams in the city */}
              <div className="flex gap-3">
                <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-orange/10 shrink-0">
                  <Users size={18} className="text-orange" />
                </div>
                <div className="flex-1">
                  <h4 className="font-heebo font-bold text-navy text-sm mb-2">
                    הקבוצות בעיר
                    <span className="font-normal text-navy/40"> · {selectedLoc.teams.length}</span>
                  </h4>
                  <ul className="flex flex-col gap-1.5">
                    {selectedLoc.teams.map((t) => (
                      <li key={t} className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-orange shrink-0" aria-hidden="true" />
                        <span className="font-heebo text-navy/70 text-sm">{teamLabel(t, selectedLoc.city)}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Workout days */}
              <div className="flex gap-3">
                <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-orange/10 shrink-0">
                  <Clock size={18} className="text-orange" />
                </div>
                <div>
                  <h4 className="font-heebo font-bold text-navy text-sm mb-1">ימי האימונים</h4>
                  <p className="font-heebo text-navy/65 text-sm leading-relaxed">{selectedLoc.days}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
