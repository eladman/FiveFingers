import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { yearTimeline } from '../../data/liabahData'
import { SectionBg, SectionHeading } from './shared'

gsap.registerPlugin(ScrollTrigger)

/** Vertical RTL timeline of "a year in ליבה" with a scroll-driven progress line. */
export default function LiabahYear() {
  const ref = useRef(null)

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const root = ref.current

    const ctx = gsap.context(() => {
      const fills = root.querySelectorAll('.ly-fill')

      if (reduced) {
        gsap.set('.ly-heading, .ly-item', { opacity: 1, x: 0, y: 0 })
        gsap.set('.ly-progress', { scaleY: 1 })
        gsap.set(fills, { scale: 1 })
        return
      }

      gsap.fromTo('.ly-heading', { y: 50, opacity: 0 }, {
        y: 0, opacity: 1, stagger: 0.1, duration: 1.2, ease: 'power3.out',
        scrollTrigger: { trigger: root, start: 'top 80%' },
      })

      gsap.fromTo('.ly-item', { x: 40, opacity: 0 }, {
        x: 0, opacity: 1, stagger: 0.12, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: '.ly-list', start: 'top 80%' },
      })

      // The orange line fills as you scroll through the list.
      gsap.fromTo('.ly-progress', { scaleY: 0 }, {
        scaleY: 1, ease: 'none',
        scrollTrigger: { trigger: '.ly-list', start: 'top 65%', end: 'bottom 75%', scrub: true },
      })

      // Each node lights up as the line reaches it.
      fills.forEach((fill) => {
        gsap.fromTo(fill, { scale: 0 }, {
          scale: 1, duration: 0.4, ease: 'back.out(2)',
          scrollTrigger: { trigger: fill, start: 'top 75%' },
        })
      })
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <section
      id="liabah-year"
      ref={ref}
      dir="rtl"
      className="relative w-full overflow-hidden bg-surface"
    >
      <SectionBg flip />

      <div className="relative z-10 max-w-4xl mx-auto px-6 md:px-12 lg:px-20">
        <SectionHeading eyebrow="המסע" title="שנה בליבה" subtitle="מה חווה מתאמן/ת לאורך השנה" animateClass="ly-heading" />

        {/* Timeline — vertical line on the right (RTL) */}
        <div className="ly-list relative pb-24 pr-6 md:pr-10">
          {/* Background track */}
          <div className="absolute top-2 bottom-24 right-[7px] md:right-[11px] w-0.5 bg-navy/10" />
          {/* Progress fill */}
          <div
            className="ly-progress absolute top-2 bottom-24 right-[7px] md:right-[11px] w-0.5 bg-orange"
            style={{ transformOrigin: 'top', transform: 'scaleY(0)' }}
          />

          <div className="flex flex-col gap-10">
            {yearTimeline.map((item) => (
              <div key={item.period} className="ly-item relative">
                {/* Node */}
                <div className="absolute right-[-1.5rem] md:right-[-2.5rem] top-1.5 w-4 h-4 md:w-6 md:h-6 rounded-full border-2 border-orange/50 bg-surface ring-4 ring-surface overflow-hidden">
                  <span
                    className="ly-fill block w-full h-full rounded-full bg-orange"
                    style={{ transform: 'scale(0)' }}
                  />
                </div>
                <div className="text-right">
                  <span className="font-heebo text-[#ff8714] font-bold text-sm md:text-base">{item.period}</span>
                  <h3 className="font-heebo font-extrabold text-navy text-xl md:text-2xl mt-1">{item.title}</h3>
                  <p className="font-heebo text-navy/65 leading-relaxed mt-2 max-w-xl">{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
