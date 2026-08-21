import { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowLeft, ArrowUpLeft } from 'lucide-react'
import { ZONES } from '../../data/amirData'

gsap.registerPlugin(ScrollTrigger)

/**
 * הזירות שלנו — the three offerings as one clean, photo-free section.
 * Icon-led cards in a single grid (replaces the old cinematic image rows):
 * each zone shows its lucide icon, badge, title, copy and CTA. The workshop
 * card links out to the dedicated 0→1 site; the others open the contact modal.
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
  const cls = 'tap-safe group/link inline-flex items-center gap-2.5 font-heebo font-bold text-navy text-lg'

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

      gsap.fromTo('.azn-card',
        { y: 48, opacity: 0 },
        {
          y: 0, opacity: 1, stagger: 0.12, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: '.azn-grid', start: 'top 82%', once: true },
        }
      )
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

      <div className="relative z-10 max-w-screen-xl mx-auto px-6 sm:px-10 md:px-16 pt-24 md:pt-32 pb-24 md:pb-32">

        <div className="azn-heading max-w-3xl">
          <p className="ds-eyebrow text-orange-ink mb-4">הזירות שלנו</p>
          <h2 className="ds-section-title text-navy">איפה נפגשים</h2>
          <p className="ds-section-subtitle text-orange-ink mt-4">
            מהבמה הגדולה ועד אחד־על־אחד. בחרו את הזירה שלכם.
          </p>
        </div>

        <div className="azn-grid mt-14 md:mt-20 grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {ZONES.map((zone) => {
            const Icon = zone.icon
            return (
              <article
                key={zone.title}
                className="azn-card group relative flex flex-col rounded-[1.75rem] bg-white border border-navy/[0.07] p-8 lg:p-9 shadow-[0_18px_44px_rgba(0,0,30,0.06)] transition-all duration-300 hover:-translate-y-1.5 hover:border-orange/30 hover:shadow-[0_26px_60px_rgba(255,135,20,0.14)]"
              >
                <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-orange/10 text-orange-ink transition-colors duration-300 group-hover:bg-orange group-hover:text-white">
                  {Icon ? <Icon size={26} strokeWidth={2} aria-hidden="true" /> : null}
                </span>

                <span className="mt-6 inline-flex w-fit items-center rounded-full bg-orange/10 text-orange-ink font-heebo font-semibold px-3.5 py-1 text-sm">
                  {zone.badge}
                </span>

                <h3
                  className="font-ragmarom text-navy leading-[0.98] mt-4"
                  style={{ fontSize: 'clamp(1.9rem, 2.4vw, 2.5rem)' }}
                >
                  {zone.title}
                </h3>

                <p className="font-heebo text-navy/70 leading-[1.8] mt-3 text-[0.98rem]">
                  {zone.text}
                </p>

                <div className="mt-7 pt-6 border-t border-navy/[0.07]">
                  <ZoneCta zone={zone} onBook={onBook} />
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
