import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ChevronLeft } from 'lucide-react'
import Button from '../ui/Button'

/**
 * Concept 1 — EDITORIAL SPLIT (פיצול עורכי)
 * A clean vertical split: a full-height photo panel on one side, a solid navy
 * panel holding the headline on the other. Magazine-cover composure — no diagonal,
 * no fullscreen scrim. Reads as an inner-page hero, not the homepage.
 * Suits: Liabah, Collaborations.
 */

const IMAGES = [
  '/Hero-Pics/214A0027.jpg',
  '/Hero-Pics/214A0088.jpg',
  '/Hero-Pics/214A0114.jpg',
  '/Hero-Pics/_14A9355.jpg',
]

export default function ConceptEditorialSplit({
  eyebrow = 'קבוצות הנוער',
  title = 'הזירה שלך\nמתחילה כאן',
  subtitle = 'מסגרת חינוכית שבה בני ובנות נוער הופכים לאנשים שבוחרים לפעול.',
  cta = 'הצטרפו אלינו',
}) {
  const [current, setCurrent] = useState(0)
  const root = useRef(null)

  useEffect(() => {
    const id = setInterval(() => setCurrent(i => (i + 1) % IMAGES.length), 5000)
    return () => clearInterval(id)
  }, [])

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const ctx = gsap.context(() => {
      if (reduce) { gsap.set('.es-text', { opacity: 1, x: 0 }); gsap.set('.es-rule', { scaleX: 1 }); return }
      gsap.fromTo('.es-text', { opacity: 0, x: 28 },
        { opacity: 1, x: 0, stagger: 0.12, duration: 0.9, ease: 'expo.out', delay: 0.25 })
      gsap.fromTo('.es-rule', { scaleX: 0 },
        { scaleX: 1, duration: 1, ease: 'expo.out', delay: 0.5 })
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={root}
      dir="rtl"
      className="relative flex flex-col-reverse md:flex-row"
      style={{ minHeight: '100dvh', background: '#000032' }}
    >
      {/* ── NAVY TEXT PANEL ── */}
      <div
        className="relative flex flex-col justify-center"
        style={{
          flex: '0 0 44%',
          padding: 'clamp(2rem, 6vw, 4.5rem)',
        }}
      >
        <div
          className="es-text"
          style={{
            fontFamily: 'JetBrains Mono, monospace',
            color: 'rgba(255,135,20,0.85)',
            fontSize: 'clamp(0.6rem, 1vw, 0.72rem)',
            letterSpacing: '0.3em',
          }}
        >
          {eyebrow}
        </div>

        <h1
          className="es-text"
          style={{
            margin: '1.1rem 0 0',
            fontFamily: 'RagMarom, sans-serif',
            color: '#fff',
            fontSize: 'clamp(2.6rem, 5.5vw, 5.2rem)',
            lineHeight: 1.02,
            whiteSpace: 'pre-line',
          }}
        >
          {title}
        </h1>

        <div
          className="es-rule"
          style={{
            height: '3px',
            width: 'clamp(5rem, 12vw, 9rem)',
            background: '#ff8714',
            transformOrigin: 'right',
            margin: 'clamp(1.4rem, 3vh, 2.2rem) 0',
          }}
        />

        <p
          className="es-text"
          style={{
            margin: 0,
            color: 'rgba(255,255,255,0.72)',
            fontFamily: 'Heebo, sans-serif',
            fontSize: 'clamp(1.05rem, 1.7vw, 1.4rem)',
            lineHeight: 1.6,
            maxWidth: '34ch',
          }}
        >
          {subtitle}
        </p>

        <div className="es-text" style={{ marginTop: 'clamp(1.6rem, 3.5vh, 2.6rem)' }}>
          <Button variant="primary" size="md" icon={ChevronLeft} href="#contact">
            {cta}
          </Button>
        </div>
      </div>

      {/* ── PHOTO PANEL ── */}
      <div className="relative overflow-hidden" style={{ flex: '1 1 56%', minHeight: '38vh' }}>
        {IMAGES.map((src, i) => (
          <img
            key={src}
            src={src}
            alt=""
            style={{
              position: 'absolute', inset: 0,
              width: '100%', height: '100%',
              objectFit: 'cover', objectPosition: 'center 25%',
              opacity: i === current ? 1 : 0,
              transform: i === current ? 'scale(1.04)' : 'scale(1)',
              transition: 'opacity 1.3s ease-in-out, transform 6s ease-out',
            }}
          />
        ))}
        {/* soft seam shadow toward the navy panel */}
        <div
          aria-hidden
          style={{
            position: 'absolute', inset: 0, pointerEvents: 'none',
            background: 'linear-gradient(to right, rgba(0,0,50,0.35), transparent 22%)',
          }}
        />
        {/* slide dots */}
        <div style={{ position: 'absolute', bottom: '1.4rem', left: '1.4rem', display: 'flex', gap: '6px' }}>
          {IMAGES.map((_, i) => (
            <div key={i} style={{
              width: i === current ? '20px' : '6px', height: '3px', borderRadius: '2px',
              background: i === current ? '#ff8714' : 'rgba(255,255,255,0.45)',
              transition: 'all 0.4s ease',
            }} />
          ))}
        </div>
      </div>
    </section>
  )
}
