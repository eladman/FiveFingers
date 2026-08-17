import { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ChevronLeft } from 'lucide-react'
import Button from '../../components/ui/Button'
import { AXES, YOAV_FACTS, YOAV_URL } from '../../data/alumniData'

gsap.registerPlugin(ScrollTrigger)

/**
 * תוכנית יואב — the main event. Dark Mode B band (the AmirContent "studio"
 * treatment): the flagship alumni program with its three axes as glass cards,
 * quick-fact chips, the tribute to יואב שחר ז"ל, and the primary funnel out
 * to yoavprogram.com.
 */
export default function AlumniYoavV2() {
  const ref = useRef(null)

  useLayoutEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const ctx = gsap.context(() => {
      if (reduced) return

      gsap.fromTo('.ayv-heading',
        { y: 46, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 1.1, ease: 'power3.out',
          scrollTrigger: { trigger: ref.current, start: 'top 78%', once: true },
        }
      )
      gsap.fromTo('.ayv-card',
        { y: 54, opacity: 0 },
        {
          y: 0, opacity: 1, stagger: 0.12, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: '.ayv-cards', start: 'top 80%', once: true },
        }
      )
      gsap.fromTo('.ayv-el',
        { y: 32, opacity: 0 },
        {
          y: 0, opacity: 1, stagger: 0.1, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: '.ayv-foot', start: 'top 85%', once: true },
        }
      )
    }, ref)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="alumni-yoav"
      ref={ref}
      dir="rtl"
      className="relative w-full overflow-hidden"
      style={{ background: 'linear-gradient(155deg, #1e3578 0%, #0d1b4b 45%, #081028 100%)' }}
    >
      {/* top orange radial accent */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: 'radial-gradient(ellipse 90% 45% at 50% 0%, rgba(255,135,20,0.07) 0%, transparent 65%)' }}
      />

      <div className="relative z-10 max-w-screen-xl mx-auto px-6 sm:px-10 md:px-16 py-24 md:py-32">

        <div className="ayv-heading max-w-3xl">
          <p className="ds-eyebrow text-orange mb-4">תוכנית הדגל של הבוגרים</p>
          <h2 className="ds-section-title text-white" style={{ textShadow: '0 2px 24px rgba(0,0,0,0.5)' }}>
            תוכנית יואב
          </h2>
          <p className="ds-section-subtitle text-white/70 mt-4">
            למקסם את הפוטנציאל שלך · להשפיע על המציאות שלנו.
          </p>
          <p className="font-heebo text-white/60 mt-5 leading-relaxed max-w-2xl" style={{ fontSize: 'clamp(0.98rem, 1.2vw, 1.15rem)' }}>
            תוכנית ייחודית לצעירות וצעירים בגילאי 22–29, שמלווה תהליך של התפתחות אישית,
            חשיפה לעומק החברה הישראלית ויצירת השפעה בשטח.
          </p>
        </div>

        {/* Three axes — glass cards */}
        <div className="ayv-cards mt-14 md:mt-20 grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-7">
          {AXES.map((a, i) => {
            const Icon = a.icon
            return (
              <div
                key={a.title}
                className="ayv-card group relative flex flex-col rounded-[1.6rem] md:rounded-[2rem] bg-white/5 ring-1 ring-white/10 p-8 md:p-9 transition-all duration-300 hover:bg-white/10 hover:ring-orange/50"
              >
                <div className="flex items-center justify-between">
                  <span className="flex items-center justify-center w-14 h-14 rounded-full bg-orange/15 text-orange transition-colors duration-300 group-hover:bg-orange group-hover:text-white">
                    <Icon size={26} strokeWidth={1.9} />
                  </span>
                  <span className="font-mono text-white/25 text-sm tracking-widest" dir="ltr">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>
                <h3 className="font-ragmarom text-white mt-7 leading-none" style={{ fontSize: 'clamp(1.8rem, 2.6vw, 2.4rem)' }}>
                  {a.title}
                </h3>
                <p className="font-heebo font-semibold text-orange mt-2.5" style={{ fontSize: '0.98rem' }}>
                  {a.subtitle}
                </p>
                <p className="font-heebo text-white/70 leading-[1.8] mt-4 flex-1" style={{ fontSize: 'clamp(0.95rem, 1.05vw, 1.05rem)' }}>
                  {a.text}
                </p>
              </div>
            )
          })}
        </div>

        <div className="ayv-foot">
          {/* Quick-fact chips */}
          <div className="ayv-el mt-12 flex flex-wrap justify-center gap-3">
            {YOAV_FACTS.map((f) => (
              <span
                key={f}
                className="font-heebo text-white/85 text-sm md:text-base rounded-full ring-1 ring-white/15 bg-white/5 px-5 py-2"
              >
                {f}
              </span>
            ))}
          </div>

          {/* Tribute line */}
          <p
            className="ayv-el mt-12 mx-auto max-w-2xl text-center font-heebo text-white/55 leading-relaxed"
            style={{ fontSize: 'clamp(0.9rem, 1.2vw, 1rem)' }}
          >
            התוכנית נקראת על שמו של יואב שחר ז״ל ושואבת השראה מדרכו — איש של חזון
            ומעשים, מנהיג, לוחם ומעל הכל בן אדם.
          </p>

          {/* Primary funnel CTA */}
          <div className="ayv-el mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              variant="primary"
              size="lg"
              glow
              icon={ChevronLeft}
              href={YOAV_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              להגשת מועמדות לתוכנית יואב
            </Button>
            <Button
              variant="ghost"
              size="lg"
              href={YOAV_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              לאתר התוכנית
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
