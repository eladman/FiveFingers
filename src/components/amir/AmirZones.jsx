import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ChevronLeft } from 'lucide-react'
import Button from '../ui/Button'
import { ZONES } from '../../data/amirData'

gsap.registerPlugin(ScrollTrigger)

// Parallelogram clip paths — mirror Programs.jsx
const CLIP_EVEN = 'polygon(6% 0%, 100% 0%, 94% 100%, 0% 100%)'
const CLIP_ODD  = 'polygon(0% 0%, 94% 0%, 100% 100%, 6% 100%)'

/**
 * "הזירות שלנו" — the three offerings displayed in the same alternating-row +
 * parallelogram-image style as the homepage Programs section.
 */
export default function AmirZones({ onBook }) {
  const ref = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      if (reduced) {
        gsap.set('.az-heading, .az-animate', { opacity: 1, y: 0 })
        return
      }
      gsap.fromTo(
        '.az-heading',
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1, stagger: 0.08, duration: 1.1, ease: 'power3.out',
          scrollTrigger: { trigger: ref.current, start: 'top 80%' },
        }
      )
      ref.current.querySelectorAll('.az-row').forEach((row) => {
        gsap.fromTo(
          row.querySelectorAll('.az-animate'),
          { y: 60, opacity: 0 },
          {
            y: 0, opacity: 1, stagger: 0.1, duration: 1.3, ease: 'power3.out',
            scrollTrigger: { trigger: row, start: 'top 78%' },
          }
        )
      })
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <section id="amir-zones" ref={ref} dir="rtl" className="relative w-full overflow-hidden bg-surface">
      <div className="max-w-screen-xl mx-auto px-6 md:px-12 lg:px-20">

        {/* Section heading */}
        <div className="text-center pt-20 md:pt-28 pb-12 md:pb-16">
          <p className="az-heading ds-eyebrow text-orange mb-4">הזירות שלנו</p>
          <h2
            className="az-heading font-ragmarom text-navy"
            style={{ fontSize: 'clamp(2.4rem, 5vw, 4.5rem)', lineHeight: 0.98 }}
          >
            איפה נפגשים
          </h2>
          <div className="az-heading mt-6 mx-auto h-1 w-16 rounded-full bg-orange" />
          <p
            className="az-heading font-heebo text-navy/60 mt-6 mx-auto max-w-2xl leading-relaxed"
            style={{ fontSize: 'clamp(1.05rem, 1.6vw, 1.3rem)' }}
          >
            שלוש דרכים לעבוד יחד — מהבמה הגדולה ועד הליווי האישי, אחד על אחד.
          </p>
        </div>

        {/* Alternating rows */}
        <div className="flex flex-col">
          {ZONES.map((z, i) => {
            const isEven = i % 2 === 0
            const clip = isEven ? CLIP_EVEN : CLIP_ODD
            // Mobile: always text first (order-1), image second (order-2)
            // Desktop RTL: even → image left (order-2), text right (order-1)
            //              odd  → image right (order-1), text left (order-2)
            const imageOrder = isEven ? 'order-2 md:order-2' : 'order-2 md:order-1'
            const textOrder  = isEven ? 'order-1 md:order-1' : 'order-1 md:order-2'
            const textAlign  = isEven ? 'text-right' : 'text-right md:text-left'
            const isLast = i === ZONES.length - 1
            const isExternal = Boolean(z.href)

            return (
              <div
                key={z.title}
                className={`az-row grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center py-16 md:py-20 ${
                  !isLast ? 'border-b border-navy/[0.08]' : 'pb-24'
                }`}
              >
                {/* Image column */}
                <div className={`az-animate ${imageOrder}`}>
                  <div className="relative">
                    <div
                      className="absolute bg-orange"
                      style={{
                        inset: 0,
                        clipPath: clip,
                        transform: isEven ? 'translate(14px, 14px)' : 'translate(-14px, 14px)',
                      }}
                    />
                    <div className="relative aspect-[4/3] overflow-hidden" style={{ clipPath: clip }}>
                      <img
                        src={z.imageSrc}
                        alt={z.title}
                        loading="lazy"
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </div>

                {/* Text column */}
                <div className={`az-animate ${textOrder} flex flex-col gap-5 ${textAlign}`}>
                  <h3
                    className="font-heebo font-extrabold text-navy leading-[0.95] tracking-tight"
                    style={{ fontSize: 'clamp(2.4rem, 4vw, 5rem)' }}
                  >
                    {z.title}
                  </h3>
                  <span
                    className="self-start inline-flex items-center rounded-full bg-orange/10 text-orange font-heebo font-semibold px-4 py-1.5"
                    style={{ fontSize: 'clamp(0.9rem, 1.2vw, 1.1rem)' }}
                  >
                    {z.badge}
                  </span>
                  <p
                    className="font-heebo text-navy/65 leading-relaxed"
                    style={{ fontSize: 'clamp(0.95rem, 1.1vw, 1.1rem)' }}
                  >
                    {z.text}
                  </p>
                  <div>
                    {isExternal ? (
                      <Button variant="primary" size="lg" href={z.href} icon={ChevronLeft}>
                        {z.cta}
                      </Button>
                    ) : (
                      <Button variant="primary" size="lg" icon={ChevronLeft} onClick={() => onBook?.(z.contactLabel)}>
                        {z.cta}
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>

      </div>
    </section>
  )
}
