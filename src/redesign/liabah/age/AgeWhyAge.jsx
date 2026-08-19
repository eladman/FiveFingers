import { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * "למה דווקא בגיל הזה?" — the parents' beat, as one full-bleed dark
 * pull-quote instead of a boxed panel. A single large statement carries
 * the section; the three supporting reasons sit beneath as understated
 * columns divided by hairlines. High contrast, lots of air.
 */
export default function AgeWhyAge({ page }) {
  const ref = useRef(null)
  const { whyAgeLead, forParents } = page

  useLayoutEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const ctx = gsap.context(() => {
      if (reduced) return

      gsap.fromTo('.awa-photo',
        { scale: 1.12 },
        {
          scale: 1, ease: 'none',
          scrollTrigger: { trigger: ref.current, start: 'top bottom', end: 'bottom top', scrub: 1 },
        }
      )
      gsap.fromTo('.awa-el',
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1, stagger: 0.12, duration: 1.1, ease: 'power3.out',
          scrollTrigger: { trigger: ref.current, start: 'top 70%', once: true },
        }
      )
    }, ref)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={ref}
      dir="rtl"
      className="relative w-full overflow-hidden bg-navy-deep text-white"
    >
      {/* faint image + grade for atmosphere, kept well behind the type */}
      <div className="absolute inset-0">
        <img
          src={page.finale.imageSrc}
          alt=""
          aria-hidden="true"
          loading="lazy"
          decoding="async"
          className="awa-photo absolute inset-0 w-full h-full object-cover opacity-[0.16] will-change-transform"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-navy-deep via-navy-deep/85 to-navy-deep" />
        <div className="pointer-events-none absolute top-[-10%] right-[-8%] w-[45vw] h-[45vh] rounded-full bg-orange/12 blur-[170px]" />
      </div>

      <div className="relative z-10 max-w-screen-2xl mx-auto px-6 sm:px-10 md:px-16 lg:px-24 py-28 md:py-40">
        <p className="awa-el ds-eyebrow text-orange">להורים</p>

        {/* the statement */}
        <h2
          className="awa-el font-ragmarom leading-[1.02] mt-7 max-w-5xl"
          style={{ fontSize: 'clamp(2.2rem, 5.2vw, 5rem)', textWrap: 'balance' }}
        >
          {whyAgeLead}
        </h2>

        {/* supporting reasons — hairline-divided columns */}
        <div className="awa-el mt-16 md:mt-24 grid grid-cols-1 md:grid-cols-3 border-t border-white/15">
          {forParents.map((p) => (
            <div
              key={p.title}
              className="py-8 md:py-10 md:px-10 first:md:pr-0 border-b md:border-b-0 md:border-l border-white/15 last:border-none"
            >
              <h3 className="font-heebo font-bold text-white" style={{ fontSize: 'clamp(1.2rem, 1.5vw, 1.5rem)' }}>
                {p.title}
              </h3>
              <p className="font-heebo text-white/60 leading-[1.75] mt-3" style={{ fontSize: 'clamp(0.98rem, 1.1vw, 1.12rem)' }}>
                {p.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
