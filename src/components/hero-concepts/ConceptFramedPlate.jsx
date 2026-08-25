import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ChevronLeft } from 'lucide-react'
import Button from '../ui/Button'

/**
 * Concept 5 — FRAMED PLATE (לוח ממוסגר)
 * A light, gallery-quiet hero: a bordered cinematic image plate above centered
 * display text. Reverent and refined — formalizes the Academy treatment into a
 * reusable template. Suits: Academy, Alumni / prestige pages.
 */

export default function ConceptFramedPlate({
  eyebrow = 'מכינת חמש אצבעות · שנת י״ג',
  title = 'המכינה',
  subtitle = 'שנה שמעצבת מנהיגים ומנהיגות של מצוינות ערכית - בגוף, ברוח ובמעשה.',
  cta = 'להגשת מועמדות',
}) {
  const root = useRef(null)

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const ctx = gsap.context(() => {
      if (reduce) {
        gsap.set('.fp-plate', { opacity: 1, y: 0 })
        gsap.set('.fp-reveal', { opacity: 1, y: 0 })
        gsap.set('.fp-rule', { scaleX: 1 })
        return
      }
      gsap.fromTo('.fp-plate', { opacity: 0, y: 26 },
        { opacity: 1, y: 0, duration: 1.1, ease: 'expo.out' })
      gsap.fromTo('.fp-reveal', { opacity: 0, y: 20 },
        { opacity: 1, y: 0, stagger: 0.12, duration: 0.95, ease: 'expo.out', delay: 0.25 })
      gsap.fromTo('.fp-rule', { scaleX: 0 },
        { scaleX: 1, duration: 0.9, ease: 'expo.out', delay: 0.55 })
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={root}
      dir="rtl"
      className="relative flex flex-col items-center"
      style={{
        minHeight: '100dvh', background: '#fafaf8', justifyContent: 'center',
        padding: 'clamp(4rem, 7vh, 5.5rem) clamp(1.25rem, 5vw, 4rem) clamp(2.5rem, 5vh, 3.5rem)',
      }}
    >
      {/* faint orange glow + halftone for warmth */}
      <div aria-hidden style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'radial-gradient(60% 40% at 50% 0%, rgba(255,135,20,0.07), transparent 70%)',
      }} />

      {/* framed image plate */}
      <div
        className="fp-plate relative w-full overflow-hidden rounded-xl"
        style={{
          maxWidth: '64rem',
          height: 'min(44vh, 430px)',
          border: '1px solid rgba(0,0,50,0.12)',
          boxShadow: '0 30px 60px -30px rgba(0,0,50,0.35)',
        }}
      >
        <img src="/Hero-Pics/214A0114.jpg" alt="" className="absolute inset-0 w-full h-full object-cover"
             style={{ objectPosition: 'center 28%' }} />
        <div aria-hidden style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.4) 0%, transparent 38%)',
        }} />
        <div aria-hidden style={{
          position: 'absolute', inset: 0, mixBlendMode: 'overlay',
          background: 'rgba(255,135,20,0.05)',
        }} />
      </div>

      {/* text block */}
      <div className="relative text-center" style={{ maxWidth: '46rem', marginTop: 'clamp(2rem, 5vh, 3.2rem)' }}>
        <div className="fp-reveal" style={{
          fontFamily: 'JetBrains Mono, monospace', color: '#b35600',
          fontSize: 'clamp(0.62rem, 0.95vw, 0.78rem)', letterSpacing: '0.3em',
        }}>
          {eyebrow}
        </div>

        <h1 className="fp-reveal" style={{
          margin: 'clamp(1rem, 2.5vh, 1.6rem) 0 0', fontFamily: 'RagMarom, sans-serif', color: '#000032',
          fontSize: 'clamp(3rem, 8vw, 6.5rem)', lineHeight: 1.0, whiteSpace: 'pre-line',
        }}>
          {title}
        </h1>

        <div className="fp-rule" style={{
          height: '4px', width: '5rem', background: '#ff8714', borderRadius: '2px',
          margin: 'clamp(1.3rem, 3vh, 2rem) auto', transformOrigin: 'center',
        }} />

        <p className="fp-reveal" style={{
          margin: '0 auto', maxWidth: '40ch', color: 'rgba(0,0,50,0.65)',
          fontFamily: 'Heebo, sans-serif', fontSize: 'clamp(1.05rem, 1.7vw, 1.4rem)', lineHeight: 1.65,
        }}>
          {subtitle}
        </p>

        <div className="fp-reveal" style={{ marginTop: 'clamp(1.6rem, 3.5vh, 2.4rem)' }}>
          <Button variant="primary" size="md" icon={ChevronLeft} href="#contact">{cta}</Button>
        </div>
      </div>
    </section>
  )
}
