import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ChevronLeft } from 'lucide-react'
import { hero } from '../../data/academyData'
import { PrimaryButton, QuietButton, Atmosphere } from './shared'

const HERO_IMAGE = '/Hero-Pics/214A0511.jpg'

/**
 * Museum hero: a framed cinematic plate at the top (with a dark top-gradient so the
 * floating navbar stays legible), over a calm parchment text block. Restrained,
 * scholarly — deliberately not Liabah's full-bleed dark slideshow + giant word.
 */
export default function AcademyHero({ onRegister }) {
  const ref = useRef(null)

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const ctx = gsap.context(() => {
      if (reduced) {
        gsap.set('.ah-plate, .ah-reveal', { opacity: 1, y: 0, clipPath: 'inset(0% 0% 0% 0%)' })
        return
      }
      gsap.fromTo('.ah-plate', { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 1, ease: 'power3.out' })
      gsap.fromTo('.ah-reveal', { opacity: 0, y: 22 }, {
        opacity: 1, y: 0, duration: 0.9, ease: 'power3.out', stagger: 0.12, delay: 0.15,
      })
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={ref}
      dir="rtl"
      id="academy-top"
      className="relative w-full min-h-dvh bg-surface flex flex-col"
    >
      {/* Framed cinematic plate */}
      <div className="ah-plate relative w-full px-3 pt-3 md:px-5 md:pt-5">
        <div className="relative overflow-hidden border border-navy/10" style={{ height: 'min(52vh, 520px)' }}>
          <img
            src={HERO_IMAGE}
            alt="חניכי וחניכות האקדמיה"
            className="absolute inset-0 w-full h-full object-cover"
            style={{ objectPosition: 'center 32%' }}
            loading="eager"
          />
          {/* Top gradient keeps the floating navbar legible over a light page */}
          <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black/45 to-transparent" />
          {/* Faint warm wash to tie the plate to the page */}
          <div className="absolute inset-0 bg-orange/5 mix-blend-overlay" />
        </div>
      </div>

      {/* Text block on the page surface */}
      <div className="relative flex-1 flex items-center justify-center">
        <Atmosphere />
        <div className="relative z-10 w-full max-w-3xl mx-auto px-6 md:px-10 py-12 md:py-16 text-center">
          <p
            className="ah-reveal font-heebo font-semibold text-[#ff8714] mb-5"
            style={{ fontSize: 'clamp(0.7rem, 0.95vw, 0.85rem)', letterSpacing: '0.3em' }}
          >
            {hero.eyebrow} · שנת י״ג
          </p>
          <h1
            className="ah-reveal font-ragmarom text-navy leading-[1.0] tracking-tight"
            style={{ fontSize: 'clamp(3rem, 8vw, 7rem)' }}
          >
            {hero.title}
          </h1>
          <div className="ah-reveal mx-auto mt-7 h-1 w-20 rounded-full bg-orange" />
          <p
            className="ah-reveal font-heebo text-navy/65 mt-7 mx-auto max-w-2xl leading-relaxed"
            style={{ fontSize: 'clamp(1.05rem, 1.8vw, 1.5rem)' }}
          >
            {hero.subtitle}
          </p>

          <div className="ah-reveal flex flex-wrap gap-4 justify-center mt-10">
            <PrimaryButton onClick={onRegister} icon={ChevronLeft}>
              {hero.primaryCta}
            </PrimaryButton>
            <QuietButton href="#academy-manifesto">גלו עוד</QuietButton>
          </div>
        </div>
      </div>
    </section>
  )
}
