import { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Check } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

/**
 * עולמות התוכן — the page's signature moment. The three content worlds
 * ignite one after another inside a pin (the Liabah journey treatment):
 * duotone photo panel, giant ghost numeral, tools checklist, three-segment
 * progress. Mobile / reduced motion: stacked panels with plain reveals.
 */

const WORLDS = [
  {
    n: '1',
    title: 'חוסן מנטלי',
    subtitle: 'האקס פקטור מול מציאות משתנה',
    image: '/liba_pics/214A1343.jpg',
    text: 'בעולם שבו הדבר היחיד שוודאי הוא אי־הוודאות, חוסן מנטלי הוא כלי הכרחי לכל תהליך של התפתחות וגדילה.',
    tools: ['ויסות רגשי', 'התמודדות עם לחץ ואי־ודאות', 'ביטחון ומסוגלות', 'יציאה מאזור הנוחות'],
  },
  {
    n: '2',
    title: 'מנהיגות מעשית',
    subtitle: 'להוביל רעיונות ואנשים כדי להשפיע על המציאות',
    image: '/liba_pics/214A0362.jpg',
    text: 'מנהיגות היא לא נתון מולד אלא שריר שאפשר לאמן: לקחת אחריות, להוביל תהליך ולהשפיע מתוך עשייה.',
    tools: ['לקיחת אחריות', 'עבודת צוות', 'קבלת החלטות', 'השפעה והובלת תהליכים'],
  },
  {
    n: '3',
    title: 'מצוינות כתרבות',
    subtitle: 'למקסם את הפוטנציאל, בלי לאבד את עצמך בדרך',
    image: '/liba_pics/214A9700.jpg',
    text: 'מצוינות אמיתית היא לא תוצאה חד־פעמית אלא הרגל ותרבות: להציב יעדים, להתמיד ולהשתפר כל יום.',
    tools: ['הצבת יעדים', 'התמדה ומשמעת עצמית', 'שיפור מתמיד', 'איזון ובריאות'],
  },
]

export default function CollabsWorldsV2() {
  const ref = useRef(null)
  const pinRef = useRef(null)
  const segsRef = useRef([])
  const counterRef = useRef(null)

  useLayoutEffect(() => {
    const mm = gsap.matchMedia()

    mm.add(
      '(min-width: 1024px) and (prefers-reduced-motion: no-preference)',
      () => {
        const stages = gsap.utils.toArray('.cw2-stage', ref.current)
        gsap.set(stages[0], { opacity: 1, y: 0 })
        gsap.set(stages.slice(1), { opacity: 0, y: 60 })

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: pinRef.current,
            start: 'top top',
            end: '+=240%',
            pin: true,
            scrub: 0.8,
            anticipatePin: 1,
            onUpdate: (self) => {
              const idx = Math.min(2, Math.floor(self.progress * 3))
              segsRef.current.forEach((seg, i) => {
                if (seg) seg.style.opacity = i <= idx ? '1' : '0.22'
              })
              if (counterRef.current) counterRef.current.textContent = `${idx + 1} / 3`
            },
          },
        })

        stages.slice(1).forEach((stage, i) => {
          const prev = stages[i]
          tl.to(prev, { opacity: 0, y: -60, filter: 'blur(6px)', duration: 0.4, ease: 'power2.in' }, i + 0.6)
            .to(stage, { opacity: 1, y: 0, duration: 0.45, ease: 'power2.out' }, i + 0.85)
        })
        tl.to({}, { duration: 0.7 })

        return () => tl.scrollTrigger?.kill()
      }
    )

    // Mobile + reduced motion: stacked panels, simple reveals.
    mm.add('(max-width: 1023px), (prefers-reduced-motion: reduce)', () => {
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      gsap.set('.cw2-stage', { opacity: 1, y: 0, clearProps: 'filter' })
      if (reduced) return
      gsap.utils.toArray('.cw2-stage', ref.current).forEach((el) => {
        gsap.fromTo(el.querySelectorAll('.cw2-el'),
          { y: 40, opacity: 0 },
          {
            y: 0, opacity: 1, stagger: 0.08, duration: 1, ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 78%', once: true },
          }
        )
      })
    })

    return () => mm.revert()
  }, [])

  return (
    <section
      id="collabs-worlds"
      ref={ref}
      dir="rtl"
      className="relative w-full overflow-hidden bg-navy-deep"
    >
      {/* faint warm ember */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: 'radial-gradient(ellipse 80% 50% at 50% 30%, rgba(255,135,20,0.06) 0%, transparent 65%)' }}
      />

      <div ref={pinRef} className="relative lg:h-[100dvh] flex flex-col">
        {/* header */}
        <div className="relative z-20 max-w-screen-2xl w-full mx-auto px-6 sm:px-10 md:px-16 lg:px-24 pt-20 lg:pt-24 flex items-end justify-between gap-6">
          <div>
            <p className="ds-eyebrow text-orange mb-3">התוכן</p>
            <h2 className="font-ragmarom text-white leading-[0.95]" style={{ fontSize: 'clamp(2.2rem, 4vw, 4.2rem)' }}>
              שלושה עולמות. <span className="text-orange">בחרו את שלכם.</span>
            </h2>
          </div>
          <span ref={counterRef} dir="ltr" className="hidden lg:block font-heebo font-bold text-white/50 text-lg tabular-nums shrink-0">
            1 / 3
          </span>
        </div>

        {/* stages */}
        <div className="relative flex-1 flex flex-col gap-20 lg:gap-0 lg:block py-16 lg:py-0">
          {WORLDS.map((w) => (
            <div
              key={w.n}
              className="cw2-stage relative lg:absolute lg:inset-0 flex items-center will-change-transform"
            >
              <div className="relative w-full max-w-screen-2xl mx-auto px-6 sm:px-10 md:px-16 lg:px-24 grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-8 lg:gap-16 items-center">
                {/* giant ghost numeral */}
                <span
                  aria-hidden="true"
                  className="hidden lg:block absolute top-1/2 -translate-y-1/2 right-4 font-ragmarom text-white/[0.05] leading-none select-none pointer-events-none"
                  style={{ fontSize: 'clamp(11rem, 24vw, 24rem)' }}
                >
                  {w.n}
                </span>

                {/* text side */}
                <div className="relative order-2 lg:order-1">
                  <p className="cw2-el font-heebo font-bold text-orange tracking-[0.3em] text-xs md:text-sm mb-5" dir="ltr" style={{ textAlign: 'right' }}>
                    {w.n}
                  </p>
                  <h3 className="cw2-el font-ragmarom text-white leading-[0.95]" style={{ fontSize: 'clamp(2.6rem, 5.5vw, 5.5rem)' }}>
                    {w.title}
                  </h3>
                  <p className="cw2-el font-heebo font-semibold text-orange mt-3" style={{ fontSize: 'clamp(1.05rem, 1.4vw, 1.3rem)' }}>
                    {w.subtitle}
                  </p>
                  <p className="cw2-el font-heebo text-white/75 leading-[1.8] mt-5 max-w-lg" style={{ fontSize: 'clamp(1rem, 1.2vw, 1.2rem)' }}>
                    {w.text}
                  </p>
                  <ul className="cw2-el mt-7 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3 max-w-lg">
                    {w.tools.map((t) => (
                      <li key={t} className="flex items-center gap-2.5 font-heebo text-white/85" style={{ fontSize: '0.98rem' }}>
                        <Check size={17} className="text-orange shrink-0" strokeWidth={2.5} />
                        {t}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* photo side — duotone, colors on hover */}
                <div className="cw2-el relative order-1 lg:order-2 group overflow-hidden rounded-[1.6rem] lg:rounded-[2rem]">
                  <div className="relative aspect-[16/10] lg:aspect-[4/5] lg:max-h-[58vh] overflow-hidden">
                    <img
                      src={w.image}
                      alt={w.title}
                      loading="lazy"
                      decoding="async"
                      className="absolute inset-0 w-full h-full object-cover transition-all duration-700 group-hover:scale-[1.04]"
                      style={{ filter: 'grayscale(0.55) contrast(1.05)' }}
                      onMouseEnter={(e) => (e.currentTarget.style.filter = 'grayscale(0) contrast(1)')}
                      onMouseLeave={(e) => (e.currentTarget.style.filter = 'grayscale(0.55) contrast(1.05)')}
                    />
                    <div className="absolute inset-0 bg-orange/15 mix-blend-multiply pointer-events-none" />
                    <div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(90deg, rgba(8,16,40,0.4) 0%, transparent 40%)' }} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* three-segment progress (desktop) */}
        <div className="hidden lg:flex absolute bottom-10 left-1/2 -translate-x-1/2 z-20 items-center gap-2 pointer-events-none" aria-hidden="true">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              ref={(el) => (segsRef.current[i] = el)}
              className="h-[7px] w-12 rounded-full bg-orange"
              style={{
                opacity: i === 0 ? 1 : 0.22,
                transition: 'opacity 380ms cubic-bezier(0.25,0.46,0.45,0.94)',
              }}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
