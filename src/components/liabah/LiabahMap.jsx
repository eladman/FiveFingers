import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { MapPin, Clock } from 'lucide-react'
import { locations } from '../../data/liabahData'
import { ISRAEL_PATH, VIEWBOX_W, VIEWBOX_H, project } from '../../data/israelOutline'
import { SectionBg, SectionHeading } from './shared'

gsap.registerPlugin(ScrollTrigger)

export default function LiabahMap() {
  const ref = useRef(null)
  const [active, setActive] = useState(null)

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const root = ref.current

    const ctx = gsap.context(() => {
      if (reduced) {
        gsap.set('.lm-animate, .lm-pin', { opacity: 1, y: 0, scale: 1 })
        return
      }

      gsap.fromTo('.lm-animate', { y: 50, opacity: 0 }, {
        y: 0, opacity: 1, stagger: 0.1, duration: 1.1, ease: 'power3.out',
        scrollTrigger: { trigger: root, start: 'top 80%' },
      })

      gsap.fromTo('.lm-pin', { y: -16, opacity: 0, scale: 0.5 }, {
        y: 0, opacity: 1, scale: 1, stagger: 0.08, duration: 0.5, ease: 'back.out(2)',
        scrollTrigger: { trigger: '.lm-map', start: 'top 78%' },
      })
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <section
      id="liabah-map"
      ref={ref}
      dir="rtl"
      className="relative w-full overflow-hidden bg-[#ffffff]"
    >
      <SectionBg watermark={false} />

      <div className="relative z-10 max-w-screen-xl mx-auto px-6 md:px-12 lg:px-20">
        <SectionHeading eyebrow="פריסה ארצית" title="איפה אנחנו פועלים" subtitle="קבוצות ליבה ברחבי הארץ" animateClass="lm-animate" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center pb-24">
          {/* Map */}
          <div className="lm-animate order-2 lg:order-1 flex justify-center">
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
                  fill="#000032"
                  fillOpacity="0.06"
                  stroke="#000032"
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
                    aria-label={`${loc.region} · ${loc.city}`}
                    className="lm-pin absolute rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange focus-visible:ring-offset-2"
                    style={{
                      left: `${(x / VIEWBOX_W) * 100}%`,
                      top: `${(y / VIEWBOX_H) * 100}%`,
                      transform: 'translate(-50%, -100%)',
                    }}
                  >
                    {/* Pulse ring on active */}
                    {isActive && (
                      <span
                        aria-hidden="true"
                        className="absolute left-1/2 bottom-0 w-5 h-5 rounded-full bg-orange/40"
                        style={{ transform: 'translate(-50%, 50%)', animation: 'pulseRing 1.4s ease-out infinite' }}
                      />
                    )}
                    <MapPin
                      size={isActive ? 30 : 22}
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
          <div className="order-1 lg:order-2 flex flex-col gap-3">
            {locations.map((loc) => {
              const isActive = active === loc.id
              return (
                <div
                  key={loc.id}
                  onMouseEnter={() => setActive(loc.id)}
                  onMouseLeave={() => setActive(null)}
                  className={`lm-animate rounded-xl border p-4 transition-all duration-200 ${
                    isActive ? 'border-orange bg-orange/[0.05] shadow-sm -translate-y-0.5' : 'border-navy/8 bg-white'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <MapPin size={18} className="text-[#b35600] shrink-0" />
                    <h3 className="font-heebo font-bold text-navy">{loc.region}</h3>
                    <span className="font-heebo text-navy/50 text-sm">· {loc.city}</span>
                  </div>
                  <div className="flex items-center gap-2 mt-2 pr-1">
                    <Clock size={15} className="text-navy/40 shrink-0" />
                    <span className="font-heebo text-navy/60 text-sm">{loc.hours}</span>
                  </div>
                </div>
              )
            })}
            <p className="lm-animate font-heebo text-navy/45 text-sm mt-2">
              לא מצאתם קבוצה באזורכם? השאירו פרטים ונעדכן אתכם בפתיחת קבוצה קרובה.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
