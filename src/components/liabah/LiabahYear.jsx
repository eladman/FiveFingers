import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { yearTimeline } from '../../data/liabahData'
import { SectionBg, SectionHeading } from './shared'

gsap.registerPlugin(ScrollTrigger)

/** Vertical RTL timeline of "a year in ליבה". */
export default function LiabahYear() {
  const ref = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.ly-heading', { y: 50, opacity: 0 }, {
        y: 0, opacity: 1, stagger: 0.1, duration: 1.2, ease: 'power3.out',
        scrollTrigger: { trigger: ref.current, start: 'top 80%' },
      })
      gsap.fromTo('.ly-item', { x: 40, opacity: 0 }, {
        x: 0, opacity: 1, stagger: 0.12, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: '.ly-list', start: 'top 80%' },
      })
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <section
      id="liabah-year"
      ref={ref}
      dir="rtl"
      className="relative w-full overflow-hidden bg-[#fafaf8]"
    >
      <SectionBg flip />

      <div className="relative z-10 max-w-4xl mx-auto px-6 md:px-12 lg:px-20">
        <SectionHeading title="שנה בליבה" subtitle="מה חווה מתאמן/ת לאורך השנה" animateClass="ly-heading" />

        {/* Timeline — vertical line on the right (RTL) */}
        <div className="ly-list relative pb-24 pr-6 md:pr-10">
          {/* The track */}
          <div className="absolute top-2 bottom-24 right-[7px] md:right-[11px] w-0.5 bg-[#ff8714]/25" />

          <div className="flex flex-col gap-10">
            {yearTimeline.map((item) => (
              <div key={item.period} className="ly-item relative">
                {/* Node */}
                <div className="absolute right-[-1.5rem] md:right-[-2.5rem] top-1.5 w-4 h-4 md:w-6 md:h-6 rounded-full bg-[#ff8714] ring-4 ring-[#fafaf8]" />
                <div className="text-right">
                  <span className="font-heebo text-[#ff8714] font-bold text-sm md:text-base">{item.period}</span>
                  <h3 className="font-heebo font-extrabold text-[#000032] text-xl md:text-2xl mt-1">{item.title}</h3>
                  <p className="font-heebo text-[#000032]/65 leading-relaxed mt-2 max-w-xl">{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
