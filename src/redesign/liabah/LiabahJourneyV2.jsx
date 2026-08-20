import { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { essence } from '../../data/liabahData'

gsap.registerPlugin(ScrollTrigger)

/**
 * The journey — מסוגלות → שייכות → השפעה, the page's signature moment.
 *
 * A single connected path: all three phases live on screen at once, threaded
 * by one orange spine that draws itself in as the section enters view (the
 * literal "דרך אחת"). The page scrolls normally — no pin, no scrub, no
 * content swapping in place. Each step fades up in sequence; reduced motion
 * shows everything immediately.
 *
 * Below, the method triptych: three duotone photos, one line each.
 */

/** One-line summary per pillar — the first sentence of the full copy. */
const firstSentence = (text) => {
  const s = text.trim().split('. ')[0].trim()
  return s.endsWith('.') ? s : s + '.'
}

export default function LiabahJourneyV2() {
  const ref = useRef(null)

  useLayoutEffect(() => {
    const mm = gsap.matchMedia()

    // The path + steps reveal on enter — same choreography every viewport.
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.fromTo('.jr-step',
        { y: 44, opacity: 0 },
        {
          y: 0, opacity: 1, stagger: 0.18, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: '.jr-path', start: 'top 75%', once: true },
        }
      )

      // The spine draws itself top-to-bottom, tracing the "one path".
      gsap.fromTo('.jr-spine-fill',
        { scaleY: 0 },
        {
          scaleY: 1, duration: 1.5, ease: 'power2.out',
          scrollTrigger: { trigger: '.jr-path', start: 'top 72%', once: true },
        }
      )

      gsap.fromTo('.jr-pillar',
        { y: 50, opacity: 0 },
        {
          y: 0, opacity: 1, stagger: 0.12, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: '.jr-pillars', start: 'top 78%', once: true },
        }
      )
    })

    // Reduced motion: everything present, no animation.
    mm.add('(prefers-reduced-motion: reduce)', () => {
      gsap.set('.jr-step, .jr-pillar', { opacity: 1, y: 0 })
      gsap.set('.jr-spine-fill', { scaleY: 1 })
    })

    return () => mm.revert()
  }, [])

  return (
    <section
      id="liabah-journey"
      ref={ref}
      dir="rtl"
      className="relative w-full overflow-hidden bg-navy-deep"
    >
      {/* faint warm ember */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: 'radial-gradient(ellipse 80% 50% at 50% 30%, rgba(255,135,20,0.06) 0%, transparent 65%)' }}
      />

      {/* ── The journey: one connected path ── */}
      <div className="relative max-w-screen-2xl w-full mx-auto px-6 sm:px-10 md:px-16 lg:px-24 pt-20 lg:pt-28">
        {/* header */}
        <div className="relative z-20">
          <p className="ds-eyebrow text-orange mb-3">התהליך</p>
          <h2 className="font-ragmarom text-white leading-[0.95]" style={{ fontSize: 'clamp(2.2rem, 4vw, 4.2rem)' }}>
            שלושה שלבים. <span className="text-orange">דרך אחת.</span>
          </h2>
        </div>

        {/* the path — all three steps at once, threaded by one spine */}
        <div className="jr-path relative mt-14 lg:mt-20">
          {essence.stages.map((s, i) => {
            const last = i === essence.stages.length - 1
            return (
              <div
                key={s.num}
                className="jr-step relative grid grid-cols-[3.25rem_1fr] lg:grid-cols-[4.5rem_1fr] gap-x-6 lg:gap-x-12 pb-14 lg:pb-24 last:pb-0"
              >
                {/* spine column: node + connecting line */}
                <div className="relative flex flex-col items-center">
                  <span className="relative z-10 grid place-items-center rounded-full bg-navy-deep border-2 border-orange text-orange font-heebo font-bold shrink-0 h-[3.25rem] w-[3.25rem] lg:h-[4.5rem] lg:w-[4.5rem]"
                    style={{ boxShadow: '0 0 0 6px rgba(255,135,20,0.10), 0 0 32px rgba(255,135,20,0.28)', fontSize: 'clamp(1rem, 1.4vw, 1.4rem)' }}
                    dir="ltr"
                  >
                    {i + 1}
                  </span>
                  {!last && (
                    <span aria-hidden="true" className="relative flex-1 w-[3px] mt-2 overflow-hidden rounded-full bg-white/10">
                      <span className="jr-spine-fill absolute inset-0 origin-top rounded-full bg-gradient-to-b from-orange to-orange/40" />
                    </span>
                  )}
                </div>

                {/* content */}
                <div className="relative pb-2 lg:pb-6">
                  <h3 className="relative font-ragmarom text-white leading-[0.95]" style={{ fontSize: 'clamp(2.4rem, 5.5vw, 5rem)' }}>
                    {s.title}
                  </h3>
                  <p className="relative font-heebo text-white/75 leading-[1.8] mt-4 lg:mt-6 max-w-md" style={{ fontSize: 'clamp(1.02rem, 1.25vw, 1.25rem)' }}>
                    {s.text}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* ── The method triptych ── */}
      <div className="relative z-10 max-w-screen-2xl mx-auto px-6 sm:px-10 md:px-16 lg:px-24 pt-8 lg:pt-24 pb-24 lg:pb-32">
        <div className="jr-pillars grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {essence.pillars.map((p) => (
            <figure key={p.title} className="jr-pillar group relative overflow-hidden rounded-[1.6rem] lg:rounded-[2rem]">
              <div className="relative aspect-[4/3] lg:aspect-[5/4] overflow-hidden">
                <img
                  src={p.imageSrc}
                  alt={p.title}
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 w-full h-full object-cover transition-all duration-700 group-hover:scale-[1.04]"
                  style={{ filter: 'grayscale(0.55) contrast(1.05)', objectPosition: p.objectPosition || '50% 50%' }}
                  onMouseEnter={(e) => (e.currentTarget.style.filter = 'grayscale(0) contrast(1)')}
                  onMouseLeave={(e) => (e.currentTarget.style.filter = 'grayscale(0.55) contrast(1.05)')}
                />
                <div className="absolute inset-0 bg-orange/15 mix-blend-multiply pointer-events-none" />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/90 via-navy-deep/15 to-transparent pointer-events-none" />
              </div>
              <figcaption className="absolute inset-x-0 bottom-0 p-6 lg:p-8">
                <h4 className="font-ragmarom text-white leading-none" style={{ fontSize: 'clamp(1.7rem, 2.4vw, 2.4rem)' }}>
                  {p.title}
                </h4>
                <p className="font-heebo text-white/70 leading-relaxed mt-3 max-w-sm" style={{ fontSize: 'clamp(0.92rem, 1vw, 1.05rem)' }}>
                  {firstSentence(p.text)}
                </p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
