import { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Button from '../../components/ui/Button'
import useMagnetic from '../useMagnetic'
import { STUDIO } from '../../data/amirData'
import { WHATSAPP_HREF, PHONE_HREF, PHONE_DISPLAY, EMAIL, EMAIL_HREF } from '../../data/contact'

gsap.registerPlugin(ScrollTrigger)

/**
 * The last beat — one question, one door (the FinaleCTA language).
 * The broadcast-studio shot pushes in slowly behind a heavy scrim (it
 * carries the old "בתקשורת" credibility strip implicitly), a magnetic
 * primary CTA, and the contact channels as one quiet line.
 */
export default function AmirFinaleV2({ onBook }) {
  const ref = useRef(null)
  const magnetRef = useMagnetic(0.3)

  useLayoutEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const ctx = gsap.context(() => {
      if (reduced) return

      gsap.fromTo('.afn-photo',
        { scale: 1.14 },
        {
          scale: 1,
          ease: 'none',
          scrollTrigger: { trigger: ref.current, start: 'top bottom', end: 'bottom top', scrub: 1 },
        }
      )

      gsap.fromTo('.afn-el',
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
      id="amir-cta"
      ref={ref}
      dir="rtl"
      className="relative w-full min-h-[92dvh] overflow-hidden flex items-center justify-center bg-navy-deep"
    >
      <div className="absolute inset-0 overflow-hidden">
        <img
          src={STUDIO.src}
          alt=""
          aria-hidden="true"
          loading="lazy"
          decoding="async"
          className="afn-photo absolute inset-0 w-full h-full object-cover will-change-transform"
          style={{ objectPosition: 'center 30%' }}
        />
        <div className="absolute inset-0 bg-orange/10 mix-blend-multiply" />
        <div className="absolute inset-0 bg-black/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/60" />
      </div>

      <div className="relative z-10 w-full max-w-4xl mx-auto px-6 sm:px-10 text-center py-28">
        <h2
          className="afn-el font-ragmarom text-white leading-[1.0]"
          style={{ fontSize: 'clamp(2.8rem, 7vw, 7rem)', textShadow: '0 4px 32px rgba(0,0,0,0.9)', textWrap: 'balance' }}
        >
          מוכנים/ות <span className="text-orange">לצעד הראשון?</span>
        </h2>
        <p
          className="afn-el font-heebo text-white/80 mt-6 max-w-xl mx-auto leading-relaxed"
          style={{ fontSize: 'clamp(1.05rem, 1.4vw, 1.3rem)', textShadow: '0 2px 16px rgba(0,0,0,0.8)' }}
        >
          להזמנת הרצאה, סדנה או ליווי אישי — השאירו פרטים ונחזור אליכם/ן.
        </p>

        <div className="afn-el mt-11 flex flex-wrap items-center justify-center gap-5">
          <span ref={magnetRef} className="inline-block">
            <Button variant="primary" size="lg" glow onClick={() => onBook?.()}>
              דברו איתי
            </Button>
          </span>
          <Button
            variant="ghost"
            size="lg"
            href={WHATSAPP_HREF}
            target="_blank"
            rel="noopener noreferrer"
          >
            דברו איתנו בוואטסאפ
          </Button>
        </div>

        {/* contact channels — one quiet line */}
        <div
          className="afn-el mt-14 pt-6 border-t border-white/15 flex flex-wrap items-center justify-center gap-x-8 gap-y-2 font-heebo text-sm md:text-base"
          style={{ textShadow: '0 1px 10px rgba(0,0,0,0.7)' }}
        >
          <a href={PHONE_HREF} dir="ltr" className="text-white/60 hover:text-white transition-colors">
            {PHONE_DISPLAY}
          </a>
          <span className="w-1 h-1 rounded-full bg-orange inline-block" aria-hidden="true" />
          <a href={EMAIL_HREF} dir="ltr" className="text-white/60 hover:text-white transition-colors">
            {EMAIL}
          </a>
        </div>
      </div>
    </section>
  )
}
