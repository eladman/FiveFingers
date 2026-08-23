import { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowLeft } from 'lucide-react'
import { agePages, agePageOrder } from '../../../data/liabahAgeData'

gsap.registerPlugin(ScrollTrigger)

/**
 * Cross-links to the two sibling age tracks — for a parent with kids in
 * more than one band, or one landing on the wrong page. Two quiet photo
 * cards, nothing that competes with the finale CTA right below.
 */
export default function AgeMoreTracks({ currentId }) {
  const ref = useRef(null)
  const siblings = agePageOrder.filter((id) => id !== currentId).map((id) => agePages[id])

  useLayoutEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const ctx = gsap.context(() => {
      if (reduced) return
      gsap.fromTo('.agm-el',
        { y: 36, opacity: 0 },
        {
          y: 0, opacity: 1, stagger: 0.1, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: ref.current, start: 'top 80%', once: true },
        }
      )
    }, ref)

    return () => ctx.revert()
  }, [currentId])

  return (
    <section dir="rtl" ref={ref} className="relative w-full overflow-hidden bg-surface-2">
      <div className="relative z-10 max-w-screen-xl mx-auto px-6 sm:px-10 md:px-16 py-16 md:py-24">
        <p className="agm-el ds-eyebrow text-orange-ink">גיל אחר בבית?</p>
        <h2 className="agm-el font-ragmarom text-navy leading-tight mt-3" style={{ fontSize: 'clamp(1.9rem, 3.4vw, 3rem)' }}>
          המסלולים הנוספים
        </h2>

        <div className="mt-9 grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-7">
          {siblings.map((sib) => (
            <a
              key={sib.id}
              href={sib.path}
              className="agm-el group relative overflow-hidden rounded-[1.8rem] flex items-end min-h-[220px] md:min-h-[260px] shadow-[0_16px_44px_rgba(0,0,30,0.12)]"
            >
              <img
                src={sib.hero.imageSrc}
                alt=""
                loading="lazy"
                decoding="async"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.05]"
                style={{ objectPosition: sib.hero.imagePosition }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/90 via-navy-deep/30 to-transparent" />
              <div className="relative z-10 p-7 md:p-8 w-full">
                <p className="font-heebo text-white/65 text-sm md:text-base">{sib.hero.eyebrow}</p>
                <div className="flex items-center justify-between gap-4 mt-1.5">
                  <h3 className="font-ragmarom text-white leading-none" style={{ fontSize: 'clamp(1.7rem, 2.8vw, 2.5rem)' }}>
                    {sib.navLabel}
                  </h3>
                  <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/10 backdrop-blur text-white group-hover:bg-orange group-hover:text-navy-deep transition-colors duration-300">
                    <ArrowLeft size={20} aria-hidden="true" />
                  </span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
