import { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Button from '../../components/ui/Button'
import useMagnetic from '../useMagnetic'
import { FINALE, YOAV_URL } from '../../data/alumniData'

gsap.registerPlugin(ScrollTrigger)

/**
 * The last beat — one question, one door (the FinaleCTA language).
 * The forest-circle shot pushes in slowly behind a heavy scrim, a
 * magnetic primary CTA out to the Yoav site, and the contact door as the
 * quiet alternative.
 */
export default function AlumniFinaleV2({ onBook }) {
  const ref = useRef(null)
  const magnetRef = useMagnetic(0.3)

  useLayoutEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const ctx = gsap.context(() => {
      if (reduced) return

      gsap.fromTo('.alf-photo',
        { scale: 1.14 },
        {
          scale: 1,
          ease: 'none',
          scrollTrigger: { trigger: ref.current, start: 'top bottom', end: 'bottom top', scrub: 1 },
        }
      )

      gsap.fromTo('.alf-el',
        { y: 44, opacity: 0 },
        {
          y: 0, opacity: 1, stagger: 0.12, duration: 1.1, ease: 'power3.out',
          scrollTrigger: { trigger: ref.current, start: 'top 68%', once: true },
        }
      )
    }, ref)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="alumni-cta"
      ref={ref}
      dir="rtl"
      className="relative w-full min-h-[92dvh] overflow-hidden flex items-center justify-center bg-navy-deep"
    >
      <div className="absolute inset-0 overflow-hidden">
        <img
          src={FINALE.src}
          alt=""
          aria-hidden="true"
          loading="lazy"
          decoding="async"
          className="alf-photo absolute inset-0 w-full h-full object-cover will-change-transform"
          style={{ objectPosition: 'center 35%' }}
        />
        <div className="absolute inset-0 bg-orange/10 mix-blend-multiply" />
        <div className="absolute inset-0 bg-black/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/60" />
      </div>

      <div className="relative z-10 w-full max-w-4xl mx-auto px-6 sm:px-10 text-center py-28">
        <h2
          className="alf-el font-ragmarom text-white leading-[1.0]"
          style={{ fontSize: 'clamp(2.8rem, 7vw, 7rem)', textShadow: '0 4px 32px rgba(0,0,0,0.9)', textWrap: 'balance' }}
        >
          מוכנים/ות <span className="text-orange">לצעד הבא?</span>
        </h2>
        <p
          className="alf-el font-heebo text-white/80 mt-6 max-w-xl mx-auto leading-relaxed"
          style={{ fontSize: 'clamp(1.05rem, 1.4vw, 1.3rem)', textShadow: '0 2px 16px rgba(0,0,0,0.8)' }}
        >
          הגישו מועמדות לתוכנית יואב, או דברו איתנו כדי להבין אם התוכנית מתאימה לכם/ן.
        </p>

        <div className="alf-el mt-11 flex flex-wrap items-center justify-center gap-5">
          <span ref={magnetRef} className="inline-block">
            <Button
              variant="primary"
              size="lg"
              glow
              href={YOAV_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              להגשת מועמדות
            </Button>
          </span>
          <Button variant="ghost" size="lg" onClick={() => onBook?.()}>
            דברו איתנו
          </Button>
        </div>
      </div>
    </section>
  )
}
