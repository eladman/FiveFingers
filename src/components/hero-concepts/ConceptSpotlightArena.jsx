import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ChevronLeft } from 'lucide-react'
import Button from '../ui/Button'

/**
 * Concept 4 — SPOTLIGHT ARENA (זרקור)
 * A dark theatrical stage. One dramatic photo lit by a single spotlight cone,
 * heavy vignette pulling focus to "the person in the arena". Single image,
 * cinematic — distinct from the homepage's rotating fullscreen. Suits: Liabah, Academy.
 */

export default function ConceptSpotlightArena({
  eyebrow = 'האדם בזירה',
  title = 'מי שבוחר\nלהיכנס פנימה',
  subtitle = 'לא מהצד. לא בתגובה. אלא מתוך אחריות, תשוקה ועוז.',
  cta = 'בואו נכיר',
}) {
  const root = useRef(null)
  const imgRef = useRef(null)

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const ctx = gsap.context(() => {
      if (reduce) { gsap.set('.sa-reveal', { opacity: 1, y: 0 }); return }
      gsap.fromTo('.sa-reveal', { opacity: 0, y: 22 },
        { opacity: 1, y: 0, stagger: 0.13, duration: 1, ease: 'expo.out', delay: 0.35 })
      gsap.fromTo(imgRef.current, { scale: 1.0 },
        { scale: 1.1, duration: 14, ease: 'none' })
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={root}
      dir="rtl"
      className="relative flex flex-col items-center justify-end text-center"
      style={{ minHeight: '100dvh', background: '#04040a', overflow: 'hidden' }}
    >
      {/* dramatic photo */}
      <img
        ref={imgRef}
        src="/Hero-Pics/214A0511.jpg"
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
        style={{ objectPosition: 'center 22%', filter: 'contrast(1.08) saturate(1.05)' }}
      />

      {/* spotlight cone — bright center, dark edges */}
      <div aria-hidden style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background:
          'radial-gradient(58% 48% at 50% 34%, rgba(0,0,0,0) 0%, rgba(4,4,10,0.45) 62%, rgba(4,4,10,0.94) 100%)',
      }} />
      {/* warm orange wash from the top, like stage light */}
      <div aria-hidden style={{
        position: 'absolute', inset: 0, pointerEvents: 'none', mixBlendMode: 'soft-light',
        background: 'radial-gradient(50% 35% at 50% 12%, rgba(255,135,20,0.5), transparent 70%)',
      }} />
      {/* bottom scrim for text */}
      <div aria-hidden style={{
        position: 'absolute', left: 0, right: 0, bottom: 0, height: '60%', pointerEvents: 'none',
        background: 'linear-gradient(to top, rgba(4,4,10,0.96) 8%, rgba(4,4,10,0.5) 45%, transparent 100%)',
      }} />

      {/* content */}
      <div
        className="relative"
        style={{ padding: '0 1.25rem clamp(3rem, 9vh, 6rem)', maxWidth: '62rem' }}
      >
        <div className="sa-reveal" style={{
          display: 'inline-flex', alignItems: 'center', gap: '0.55rem',
          fontFamily: 'JetBrains Mono, monospace', color: '#ff8714',
          fontSize: 'clamp(0.62rem, 1vw, 0.74rem)', letterSpacing: '0.3em',
          marginBottom: 'clamp(1rem, 2.5vh, 1.6rem)',
        }}>
          <span style={{
            width: '7px', height: '7px', borderRadius: '50%', background: '#ff8714',
            boxShadow: '0 0 10px rgba(255,135,20,0.9)', animation: 'pulseRing 2.2s ease-in-out infinite',
          }} />
          {eyebrow}
        </div>

        <h1 className="sa-reveal" style={{
          margin: 0, fontFamily: 'RagMarom, sans-serif', color: '#fff',
          fontSize: 'clamp(2.8rem, 8vw, 7rem)', lineHeight: 1.0, whiteSpace: 'pre-line',
          textShadow: '0 4px 40px rgba(0,0,0,0.8)',
        }}>
          {title}
        </h1>

        <p className="sa-reveal" style={{
          margin: 'clamp(1.2rem, 3vh, 1.8rem) auto 0', maxWidth: '44ch',
          color: 'rgba(255,255,255,0.78)', fontFamily: 'Heebo, sans-serif',
          fontSize: 'clamp(1.05rem, 1.8vw, 1.4rem)', lineHeight: 1.6,
          textShadow: '0 2px 16px rgba(0,0,0,0.7)',
        }}>
          {subtitle}
        </p>

        <div className="sa-reveal" style={{ marginTop: 'clamp(1.6rem, 3.5vh, 2.4rem)' }}>
          <Button variant="primary" size="md" icon={ChevronLeft} href="#contact">{cta}</Button>
        </div>
      </div>
    </section>
  )
}
