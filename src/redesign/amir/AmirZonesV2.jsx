import { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowLeft, ArrowUpLeft } from 'lucide-react'
import { ZONES } from '../../data/amirData'

gsap.registerPlugin(ScrollTrigger)

/**
 * הזירות שלנו — the three offerings as ProgramsV2 cinematic rows: unclip
 * on scrub, inner parallax, overlapping text card, alternating sides.
 * Replaces the old parallelogram-clip rows. The workshop row links out to
 * the dedicated 0→1 site; the others open the tagged contact modal.
 */

function ZoneCta({ zone, onBook }) {
  const inner = (
    <>
      <span className="relative">
        {zone.cta}
        <span className="absolute -bottom-1 right-0 h-[2px] w-full bg-orange origin-right scale-x-100 group-hover/link:scale-x-0 transition-transform duration-300" />
        <span className="absolute -bottom-1 right-0 h-[2px] w-full bg-navy origin-left scale-x-0 group-hover/link:scale-x-100 transition-transform duration-300 delay-150" />
      </span>
      {zone.href ? (
        <ArrowUpLeft size={20} className="text-orange-ink transition-transform duration-300 group-hover/link:-translate-x-1 group-hover/link:-translate-y-1" aria-hidden="true" />
      ) : (
        <ArrowLeft size={20} className="text-orange-ink transition-transform duration-300 group-hover/link:-translate-x-1.5" aria-hidden="true" />
      )}
    </>
  )
  const cls = 'group/link inline-flex items-center gap-2.5 font-heebo font-bold text-navy text-lg'

  return zone.href ? (
    <a href={zone.href} target="_blank" rel="noopener noreferrer" className={cls}>
      {inner}
    </a>
  ) : (
    <button type="button" onClick={() => onBook?.(zone.contactLabel)} className={cls}>
      {inner}
    </button>
  )
}

export default function AmirZonesV2({ onBook }) {
  const ref = useRef(null)

  useLayoutEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const ctx = gsap.context(() => {
      if (reduced) return

      gsap.fromTo('.azn-heading',
        { y: 46, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 1.1, ease: 'power3.out',
          scrollTrigger: { trigger: ref.current, start: 'top 80%', once: true },
        }
      )

      gsap.utils.toArray('.azn-row', ref.current).forEach((row) => {
        const frame = row.querySelector('.azn-frame')
        const img = row.querySelector('.azn-img')

        gsap.fromTo(frame,
          { clipPath: 'inset(10% 6% 10% 6% round 2rem)' },
          {
            clipPath: 'inset(0% 0% 0% 0% round 2rem)',
            ease: 'none',
            scrollTrigger: { trigger: row, start: 'top 92%', end: 'top 45%', scrub: 0.6 },
          }
        )
        gsap.fromTo(img,
          { yPercent: -9 },
          {
            yPercent: 9,
            ease: 'none',
            scrollTrigger: { trigger: row, start: 'top bottom', end: 'bottom top', scrub: 1 },
          }
        )
        gsap.fromTo(row.querySelectorAll('.azn-el'),
          { y: 40, opacity: 0 },
          {
            y: 0, opacity: 1, stagger: 0.09, duration: 0.9, ease: 'power3.out',
            scrollTrigger: { trigger: row, start: 'top 68%', once: true },
          }
        )
      })
    }, ref)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="amir-zones"
      ref={ref}
      dir="rtl"
      className="relative w-full overflow-hidden bg-surface"
    >
      <div className="pointer-events-none absolute top-[5%] left-[-10%] w-[45vw] h-[45vh] rounded-full bg-orange/8 blur-[150px]" />
      <div className="pointer-events-none absolute bottom-[10%] right-[-8%] w-[40vw] h-[40vh] rounded-full bg-orange/10 blur-[150px]" />

      <div className="relative z-10 max-w-screen-xl mx-auto px-6 sm:px-10 md:px-16 pt-24 md:pt-32 pb-16 md:pb-24">

        <div className="azn-heading max-w-3xl">
          <p className="ds-eyebrow text-orange-ink mb-4">הזירות שלנו</p>
          <h2 className="ds-section-title text-navy">איפה נפגשים</h2>
          <p className="ds-section-subtitle text-orange-ink mt-4">
            מהבמה הגדולה ועד אחד־על־אחד — בחרו את הזירה שלכם.
          </p>
        </div>

        <div className="mt-16 md:mt-24 flex flex-col gap-24 md:gap-36">
          {ZONES.map((zone, i) => {
            const even = i % 2 === 0
            return (
              <article
                key={zone.title}
                className="azn-row grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-0 items-center"
              >
                {/* image — spans 8 columns, side alternates */}
                <div className={`lg:row-start-1 ${even ? 'lg:col-start-1' : 'lg:col-start-5'} lg:col-span-8`}>
                  <div className="azn-frame relative overflow-hidden rounded-[2rem] group" style={{ clipPath: 'inset(0% 0% 0% 0% round 2rem)' }}>
                    <div className="relative aspect-[16/10] md:aspect-[16/9] overflow-hidden">
                      <img
                        src={zone.imageSrc}
                        alt={zone.title}
                        loading="lazy"
                        decoding="async"
                        className="azn-img absolute inset-[-10%] w-[120%] h-[120%] max-w-none object-cover will-change-transform group-hover:scale-[1.04] transition-transform duration-700"
                        style={{ objectPosition: zone.imagePosition || 'center' }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-navy/35 via-transparent to-transparent opacity-70" />
                    </div>
                  </div>
                </div>

                {/* text card — overlaps the image edge on desktop */}
                <div className={`lg:row-start-1 ${even ? 'lg:col-start-8' : 'lg:col-start-1'} lg:col-span-5 relative z-10`}>
                  <div className="bg-surface/95 backdrop-blur rounded-[1.6rem] lg:rounded-[2rem] lg:shadow-[0_24px_60px_rgba(0,0,30,0.14)] p-0 lg:p-10">
                    <span className="azn-el inline-flex items-center rounded-full bg-orange/10 text-orange-ink font-heebo font-semibold px-4 py-1.5 text-sm md:text-base">
                      {zone.badge}
                    </span>
                    <h3
                      className="azn-el font-ragmarom text-navy leading-[0.98] mt-4"
                      style={{ fontSize: 'clamp(2.2rem, 4vw, 3.8rem)' }}
                    >
                      {zone.title}
                    </h3>
                    <p
                      className="azn-el font-heebo text-navy/70 leading-[1.8] mt-4"
                      style={{ fontSize: 'clamp(0.98rem, 1.1vw, 1.15rem)' }}
                    >
                      {zone.text}
                    </p>
                    <div className="azn-el mt-6">
                      <ZoneCta zone={zone} onBook={onBook} />
                    </div>
                  </div>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
