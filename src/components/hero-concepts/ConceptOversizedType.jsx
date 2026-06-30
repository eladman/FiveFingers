import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ChevronLeft } from 'lucide-react'
import Button from '../ui/Button'

/**
 * Concept 2 — OVERSIZED TYPE (טיפוגרפיה ענקית)
 * One giant Hebrew word system fills the viewport on a light surface; the photo
 * is clipped *into* the letterforms (background-clip: text). Minimal, editorial,
 * unmistakably not the homepage. Suits: a statement page / Alumni.
 */

const IMAGES = [
  '/Hero-Pics/214A0034.jpg',
  '/Hero-Pics/214A0114.jpg',
  '/Hero-Pics/214A0511.jpg',
  '/Hero-Pics/214A0011.jpg',
]

export default function ConceptOversizedType({
  eyebrow = 'תנועת חמש אצבעות',
  title = 'נכנסים\nלזירה',
  subtitle = 'דור שמחנך את עצמו למצוינות ערכית — ובוחר לפעול.',
  cta = 'גלו עוד',
}) {
  const [current, setCurrent] = useState(0)
  const root = useRef(null)
  const wordRef = useRef(null)

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) return
    const id = setInterval(() => {
      // dissolve the word, swap the image underneath, dissolve back in
      gsap.to(wordRef.current, {
        opacity: 0.15, duration: 0.55, ease: 'power2.in',
        onComplete: () => {
          setCurrent(i => (i + 1) % IMAGES.length)
          gsap.to(wordRef.current, { opacity: 1, duration: 0.7, ease: 'power2.out' })
        },
      })
    }, 5200)
    return () => clearInterval(id)
  }, [])

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const ctx = gsap.context(() => {
      if (reduce) { gsap.set('.ot-reveal', { opacity: 1, y: 0 }); return }
      gsap.fromTo('.ot-reveal', { opacity: 0, y: 24 },
        { opacity: 1, y: 0, stagger: 0.14, duration: 1, ease: 'expo.out', delay: 0.2 })
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={root}
      dir="rtl"
      className="relative flex flex-col items-center justify-center text-center"
      style={{
        minHeight: '100dvh',
        background:
          'radial-gradient(120% 90% at 50% 0%, #ffffff 0%, #fafaf8 55%, #f3f0ea 100%)',
        padding: 'clamp(4rem, 9vh, 6rem) 1.25rem',
        overflow: 'hidden',
      }}
    >
      {/* faint halftone dots */}
      <div aria-hidden style={{
        position: 'absolute', inset: 0, pointerEvents: 'none', opacity: 0.5,
        backgroundImage: 'radial-gradient(rgba(0,0,50,0.05) 1px, transparent 1px)',
        backgroundSize: '22px 22px',
      }} />

      <div
        className="ot-reveal"
        style={{
          position: 'relative',
          fontFamily: 'JetBrains Mono, monospace',
          color: '#b35600',
          fontSize: 'clamp(0.62rem, 1vw, 0.75rem)',
          letterSpacing: '0.32em',
          marginBottom: 'clamp(1.2rem, 3vh, 2rem)',
        }}
      >
        {eyebrow}
      </div>

      {/* GIANT word with photo clipped inside */}
      <h1
        ref={wordRef}
        className="ot-reveal"
        style={{
          position: 'relative',
          margin: 0,
          fontFamily: 'RagMarom, sans-serif',
          fontWeight: 900,
          fontSize: 'clamp(4.5rem, 17vw, 16rem)',
          lineHeight: 0.92,
          whiteSpace: 'pre-line',
          backgroundImage: `url(${IMAGES[current]})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center 30%',
          WebkitBackgroundClip: 'text',
          backgroundClip: 'text',
          color: 'transparent',
          WebkitTextFillColor: 'transparent',
          // navy stroke keeps the letterforms defined even over bright parts of the photo
          WebkitTextStroke: '1.3px rgba(0,0,50,0.45)',
          filter: 'drop-shadow(0 3px 6px rgba(0,0,50,0.28))',
        }}
      >
        {title}
      </h1>

      <p
        className="ot-reveal"
        style={{
          position: 'relative',
          margin: 'clamp(1.4rem, 3vh, 2.2rem) auto 0',
          maxWidth: '40ch',
          color: 'rgba(0,0,50,0.7)',
          fontFamily: 'Heebo, sans-serif',
          fontSize: 'clamp(1.05rem, 1.8vw, 1.45rem)',
          lineHeight: 1.6,
        }}
      >
        {subtitle}
      </p>

      <div className="ot-reveal" style={{ position: 'relative', marginTop: 'clamp(1.6rem, 3.5vh, 2.4rem)' }}>
        <Button variant="primary" size="md" icon={ChevronLeft} href="#contact">
          {cta}
        </Button>
      </div>
    </section>
  )
}
