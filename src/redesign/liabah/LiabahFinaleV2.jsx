import { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Button from '../../components/ui/Button'
import useMagnetic from '../useMagnetic'
import { WHATSAPP_HREF } from '../../data/contact'

gsap.registerPlugin(ScrollTrigger)

/**
 * The last beat — one question, one door (the FinaleCTA language).
 * A single photo push-in behind a heavy scrim, a magnetic primary CTA,
 * and the contact channels as one quiet line instead of three cards.
 */
export default function LiabahFinaleV2({ onRegister }) {
  const ref = useRef(null)
  const magnetRef = useMagnetic(0.3)

  useLayoutEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const ctx = gsap.context(() => {
      if (reduced) return

      gsap.fromTo('.lf2-photo',
        { scale: 1.14 },
        {
          scale: 1,
          ease: 'none',
          scrollTrigger: { trigger: ref.current, start: 'top bottom', end: 'bottom top', scrub: 1 },
        }
      )

      gsap.fromTo('.lf2-el',
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
      id="liabah-cta"
      ref={ref}
      dir="rtl"
      className="relative w-full min-h-[92dvh] overflow-hidden flex items-center justify-center bg-navy-deep"
    >
      <div className="absolute inset-0 overflow-hidden">
        <img
          src="/liba_pics/214A0362.jpg"
          alt=""
          aria-hidden="true"
          loading="lazy"
          decoding="async"
          className="lf2-photo absolute inset-0 w-full h-full object-cover will-change-transform"
        />
        <div className="absolute inset-0 bg-orange/10 mix-blend-multiply" />
        <div className="absolute inset-0 bg-black/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/60" />
      </div>

      <div className="relative z-10 w-full max-w-4xl mx-auto px-6 sm:px-10 text-center py-28">
        <h2
          className="lf2-el font-ragmarom text-white leading-[1.0]"
          style={{ fontSize: 'clamp(2.8rem, 7vw, 7rem)', textShadow: '0 4px 32px rgba(0,0,0,0.9)', textWrap: 'balance' }}
        >
          מוכנים להצטרף <span className="text-orange">לקבוצה?</span>
        </h2>
        <p
          className="lf2-el font-heebo text-white/80 mt-6 max-w-xl mx-auto leading-relaxed"
          style={{ fontSize: 'clamp(1.05rem, 1.4vw, 1.3rem)', textShadow: '0 2px 16px rgba(0,0,0,0.8)' }}
        >
          השאירו פרטים ונחבר אתכם/ן לקבוצה הקרובה אליכם/ן.
        </p>

        <div className="lf2-el mt-11 flex flex-wrap items-center justify-center gap-5">
          <span ref={magnetRef} className="inline-block">
            <Button variant="primary" size="lg" glow onClick={onRegister}>
              הרשמה לקבוצה
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
          className="lf2-el mt-14 pt-6 border-t border-white/15 flex flex-wrap items-center justify-center gap-x-8 gap-y-2 font-heebo text-sm md:text-base"
          style={{ textShadow: '0 1px 10px rgba(0,0,0,0.7)' }}
        >
          <a href="tel:0556855850" dir="ltr" className="tap-safe text-white/60 hover:text-white transition-colors">
            055-685-5850
          </a>
          <span className="w-1 h-1 rounded-full bg-orange inline-block" aria-hidden="true" />
          <a href="mailto:info@5fingers.org.il" dir="ltr" className="tap-safe text-white/60 hover:text-white transition-colors">
            info@5fingers.org.il
          </a>
        </div>
      </div>
    </section>
  )
}
