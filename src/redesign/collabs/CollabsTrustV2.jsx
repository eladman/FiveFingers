import { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'

/**
 * כבר עובדים איתנו — the partner logos as a quiet seamless marquee
 * (the PulseBand loop: two identical halves, one half-width per cycle).
 * Replaces both the old logo grid section and the hero trust strip.
 * Reduced motion: a static wrapped row.
 */

const PARTNERS = [
  { src: '/partners/idf.png', name: 'צה״ל' },
  { src: '/partners/defense.png', name: 'משרד הביטחון' },
  { src: '/partners/education.png', name: 'משרד החינוך' },
  { src: '/partners/reichman.png', name: 'אוניברסיטת רייכמן' },
  { src: '/partners/herzliya.png', name: 'עיריית הרצליה' },
  { src: '/partners/tel-aviv-yafo.png', name: 'עיריית תל אביב-יפו' },
  { src: '/partners/tzofim.png', name: 'תנועת הצופים' },
  { src: '/partners/bnei-akiva.png', name: 'בני עקיבא' },
  { src: '/partners/branco-weiss.png', name: 'מכון ברנקו וייס' },
  { src: '/partners/ort.png', name: 'רשת אורט' },
  { src: '/partners/azrieli.png', name: 'קרן עזריאלי' },
  { src: '/partners/ssi.png', name: 'SSI – Sport Social Impact' },
  { src: '/partners/hadar-habaa.png', name: 'קרן הדר הב״א' },
]

function LogoRow() {
  return PARTNERS.map((p) => (
    <img
      key={p.src}
      src={p.src}
      alt={p.name}
      title={p.name}
      loading="lazy"
      decoding="async"
      className="h-12 md:h-16 w-auto object-contain grayscale opacity-60 hover:opacity-100 hover:grayscale-0 transition-all duration-300 mx-7 md:mx-10 shrink-0"
    />
  ))
}

export default function CollabsTrustV2() {
  const ref = useRef(null)
  const trackRef = useRef(null)

  useLayoutEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const ctx = gsap.context(() => {
      if (reduced) return
      gsap.set(trackRef.current, { xPercent: -50 })
      gsap.to(trackRef.current, {
        xPercent: 0,
        duration: 45,
        ease: 'none',
        repeat: -1,
      })
    }, ref)

    return () => ctx.revert()
  }, [])

  const reduced =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

  return (
    <section
      ref={ref}
      dir="rtl"
      aria-label="השותפים שלנו"
      className="relative w-full overflow-hidden bg-white py-14 md:py-20 border-y border-navy/8"
    >
      <div className="max-w-screen-2xl mx-auto px-6 sm:px-10 md:px-16 lg:px-24 mb-8 md:mb-10">
        <p className="ds-eyebrow text-orange-ink">כבר עובדים איתנו</p>
      </div>

      {reduced ? (
        <div className="flex flex-wrap items-center justify-center gap-y-8 px-6">
          <LogoRow />
        </div>
      ) : (
        <div className="overflow-hidden" dir="ltr">
          <div ref={trackRef} className="flex w-max items-center will-change-transform">
            <div className="flex items-center shrink-0" dir="rtl">
              <LogoRow />
            </div>
            <div className="flex items-center shrink-0" dir="rtl" aria-hidden="true">
              <LogoRow />
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
