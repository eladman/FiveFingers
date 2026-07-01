import { useEffect, useState } from 'react'
import { User } from 'lucide-react'
import { coaches } from '../../data/liabahData'
import { SectionBg, SectionHeading } from './shared'
import useReveal from '../../hooks/useReveal'
import usePrefersReducedMotion from '../../hooks/usePrefersReducedMotion'

// ─── Mobile Coaches Carousel (same 3D format as StagesCarousel) ──────────────
function CoachesMobileCarousel() {
  const reduced = usePrefersReducedMotion()
  const [active, setActive] = useState(1)
  const [paused, setPaused] = useState(false)
  const n = coaches.length

  const goTo = (i) => setActive(((i % n) + n) % n)
  const next = () => setActive((a) => (a + 1) % n)
  const prev = () => setActive((a) => (a - 1 + n) % n)

  useEffect(() => {
    if (paused || reduced) return
    const id = setInterval(next, 5000)
    return () => clearInterval(id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paused, reduced, n])

  const getCardStyle = (i) => {
    const offset = ((i - active) % n + n) % n

    if (offset === 0) {
      return {
        transform: 'translateX(-50%) translateZ(90px) rotateY(0deg) scale(1)',
        opacity: 1,
        zIndex: 10,
        pointerEvents: 'none',
        boxShadow:
          '0 28px 70px -14px rgba(13,27,75,0.22), 0 12px 30px -6px rgba(255,135,20,0.16)',
        background: 'linear-gradient(150deg, #ffffff 0%, #fff7ee 100%)',
      }
    }

    const isRight = offset === n - 1
    const xPx = isRight ? 250 : -250

    return {
      transform: `translateX(calc(-50% + ${xPx}px)) translateZ(-110px) scale(0.86)`,
      opacity: 0.6,
      zIndex: 5,
      pointerEvents: 'auto',
      cursor: 'pointer',
      boxShadow: '0 6px 24px -4px rgba(13,27,75,0.07)',
      background: '#ffffff',
    }
  }

  return (
    <div
      className="w-full pb-4 rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange focus-visible:ring-offset-4 focus-visible:ring-offset-surface"
      tabIndex={0}
      role="group"
      aria-label="המאמנים והמאמנות"
      onKeyDown={(e) => {
        if (e.key === 'ArrowLeft') { e.preventDefault(); next() }
        if (e.key === 'ArrowRight') { e.preventDefault(); prev() }
      }}
    >
      <div
        className="relative mx-auto h-[360px] md:h-[420px]"
        style={{
          perspective: '1400px',
          maxWidth: '900px',
          WebkitMaskImage: 'linear-gradient(90deg, transparent 0%, #000 13%, #000 87%, transparent 100%)',
          maskImage: 'linear-gradient(90deg, transparent 0%, #000 13%, #000 87%, transparent 100%)',
        }}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {coaches.map((coach, i) => {
          const isActive = ((i - active + n) % n) === 0
          const cardStyle = getCardStyle(i)
          const isPlaceholder = !coach.imageSrc && coach.name === 'שם המאמן/ת'

          return (
            <div
              key={coach.id}
              onClick={() => { if (!isActive) goTo(i) }}
              dir="rtl"
              className="absolute top-0 left-1/2 w-[240px] md:w-[280px] rounded-2xl border border-navy/[0.06] overflow-hidden"
              style={{
                ...cardStyle,
                transition: 'all 0.52s cubic-bezier(0.4, 0, 0.2, 1)',
                willChange: 'transform, opacity',
                backfaceVisibility: 'hidden',
                WebkitBackfaceVisibility: 'hidden',
              }}
            >
              {/* Photo */}
              <div className="relative w-full aspect-[4/3] bg-navy/[0.04]">
                {coach.imageSrc ? (
                  <img
                    src={coach.imageSrc}
                    alt={coach.name}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                ) : (
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                    <div className="flex items-center justify-center w-14 h-14 rounded-full bg-orange/10">
                      <User size={28} className="text-orange" strokeWidth={1.5} />
                    </div>
                    <span className="font-heebo text-navy/35 text-xs">בקרוב</span>
                  </div>
                )}
              </div>

              {/* Text */}
              <div className="px-7 py-5">
                {isPlaceholder ? (
                  <p className="font-heebo text-navy/45 text-sm">מאמן/ת בקרוב</p>
                ) : (
                  <>
                    <h3
                      className="font-heebo font-black text-navy leading-tight tracking-tight"
                      style={{ fontSize: 'clamp(1.3rem, 2.5vw, 1.7rem)' }}
                    >
                      {coach.name}
                    </h3>
                    <div
                      className={`h-[3px] rounded-full mt-2 mb-2 transition-all duration-500 ${
                        isActive ? 'w-10 bg-orange' : 'w-5 bg-orange/40'
                      }`}
                    />
                    <p
                      className={`font-heebo leading-relaxed transition-colors duration-500 ${
                        isActive ? 'text-navy/70' : 'text-navy/45'
                      }`}
                      style={{ fontSize: '0.9rem' }}
                    >
                      {coach.role}
                    </p>
                  </>
                )}
              </div>

              {/* Inactive overlay */}
              {!isActive && (
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-white/0 to-white/20 pointer-events-none" />
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

// ─── Main component ───────────────────────────────────────────────────────────
export default function LiabahCoaches() {
  const ref = useReveal({ selector: '.lc-animate', y: 50, stagger: 0.1, duration: 1.1, start: 'top 80%' })

  return (
    <section
      id="liabah-coaches"
      ref={ref}
      dir="rtl"
      className="relative w-full overflow-hidden bg-surface"
    >
      <SectionBg />

      <div className="relative z-10 max-w-screen-xl mx-auto px-6 md:px-12 lg:px-20">
        <SectionHeading eyebrow="הצוות" title="המאמנים והמאמנות" subtitle="הדמויות שמובילות את הדרך" animateClass="lc-animate" />

        {/* Mobile: 3D carousel */}
        <div className="sm:hidden pb-20">
          <CoachesMobileCarousel />
        </div>

        {/* sm+: full grid */}
        <div className="hidden sm:grid grid-cols-3 gap-6 md:gap-8 pb-24 max-w-3xl mx-auto">
          {coaches.map((coach) => {
            const isPlaceholder = !coach.imageSrc && coach.name === 'שם המאמן/ת'
            return (
              <div key={coach.id} className="lc-animate group text-center">
                <div className="relative w-full aspect-square overflow-hidden rounded-2xl bg-navy/[0.04] border border-navy/8 mb-4 shadow-sm transition-all duration-300 group-hover:shadow-xl group-hover:shadow-navy/10 group-hover:-translate-y-1.5">
                  {coach.imageSrc ? (
                    <>
                      <img
                        src={coach.imageSrc}
                        alt={coach.name}
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-navy/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </>
                  ) : (
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                      <div className="flex items-center justify-center w-14 h-14 rounded-full bg-orange/10">
                        <User size={28} className="text-orange" strokeWidth={1.5} />
                      </div>
                      <span className="font-heebo text-navy/35 text-xs">בקרוב</span>
                    </div>
                  )}
                </div>
                {isPlaceholder ? (
                  <p className="font-heebo text-navy/45 text-sm">מאמן/ת בקרוב</p>
                ) : (
                  <>
                    <h3 className="font-heebo font-bold text-navy text-lg">{coach.name}</h3>
                    <p className="font-heebo text-orange text-sm mt-0.5">{coach.role}</p>
                    <p className="font-heebo text-navy/60 text-sm leading-relaxed mt-2">{coach.bio}</p>
                  </>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
