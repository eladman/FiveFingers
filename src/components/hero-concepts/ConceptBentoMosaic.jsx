import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ChevronLeft } from 'lucide-react'
import Button from '../ui/Button'

/**
 * Concept 3 — BENTO MOSAIC (בנטו)
 * The hero as a grid of tiles: a large text tile, photo tiles, and an orange
 * stat tile — all facets of the program visible at once. Modern, structured,
 * the opposite of a single fullscreen image. Suits: Collaborations / overviews.
 */

export default function ConceptBentoMosaic({
  eyebrow = 'בית תוכן והכשרות',
  title = 'שיטה שמשנה\nאת חוקי המשחק',
  subtitle = 'מביאים את שיטת חמש אצבעות לארגונים, צוותים ויחידות - מהלכה למעשה.',
  cta = 'לשיחת היכרות',
}) {
  const root = useRef(null)

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const ctx = gsap.context(() => {
      if (reduce) { gsap.set('.bm-tile', { opacity: 1, y: 0, scale: 1 }); return }
      gsap.fromTo('.bm-tile', { opacity: 0, y: 26, scale: 0.97 },
        { opacity: 1, y: 0, scale: 1, stagger: 0.09, duration: 0.85, ease: 'expo.out', delay: 0.1 })
    }, root)
    return () => ctx.revert()
  }, [])

  const tile = 'bm-tile relative overflow-hidden rounded-2xl'

  return (
    <section
      ref={root}
      dir="rtl"
      className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 p-3 md:p-6"
      style={{
        minHeight: '100dvh',
        background: '#0c0c14',
        gridAutoRows: 'minmax(130px, 1fr)',
        alignContent: 'stretch',
      }}
    >
      {/* ── TEXT TILE ── */}
      <div
        className={`${tile} col-span-2 row-span-2 flex flex-col justify-between`}
        style={{ background: '#000032', padding: 'clamp(1.5rem, 3vw, 2.6rem)' }}
      >
        <div style={{
          fontFamily: 'JetBrains Mono, monospace', color: 'rgba(255,135,20,0.85)',
          fontSize: 'clamp(0.6rem, 1vw, 0.72rem)', letterSpacing: '0.28em',
        }}>
          {eyebrow}
        </div>
        <div>
          <h1 style={{
            margin: 0, fontFamily: 'RagMarom, sans-serif', color: '#fff',
            fontSize: 'clamp(2.2rem, 4vw, 4rem)', lineHeight: 1.05, whiteSpace: 'pre-line',
          }}>
            {title}
          </h1>
          <p style={{
            margin: '1.1rem 0 0', color: 'rgba(255,255,255,0.68)', fontFamily: 'Heebo, sans-serif',
            fontSize: 'clamp(1rem, 1.4vw, 1.2rem)', lineHeight: 1.55, maxWidth: '38ch',
          }}>
            {subtitle}
          </p>
          <div style={{ marginTop: '1.6rem' }}>
            <Button variant="primary" size="md" icon={ChevronLeft} href="#contact">{cta}</Button>
          </div>
        </div>
      </div>

      {/* ── WIDE PHOTO ── */}
      <div className={`${tile} col-span-2 row-span-1`}>
        <img src="/Hero-Pics/214A0088.jpg" alt="" className="absolute inset-0 w-full h-full object-cover"
             style={{ objectPosition: 'center 30%' }} />
      </div>

      {/* ── TALL PHOTO ── */}
      <div className={`${tile} col-span-1 row-span-1`}>
        <img src="/Hero-Pics/214A0027.jpg" alt="" className="absolute inset-0 w-full h-full object-cover"
             style={{ objectPosition: 'center 25%' }} />
      </div>

      {/* ── ORANGE STAT TILE ── */}
      <div
        className={`${tile} col-span-1 row-span-1 flex flex-col items-center justify-center text-center`}
        style={{ background: '#ff8714', padding: '1rem' }}
      >
        <div style={{
          fontFamily: 'JetBrains Mono, monospace', color: '#000032', fontWeight: 800,
          fontSize: 'clamp(1.8rem, 3.4vw, 2.8rem)', lineHeight: 1,
        }}>
          3,000+
        </div>
        <div style={{
          marginTop: '0.4rem', color: 'rgba(0,0,50,0.75)', fontFamily: 'Heebo, sans-serif',
          fontWeight: 600, fontSize: 'clamp(0.75rem, 1vw, 0.9rem)',
        }}>
          בוגרים ובוגרות
        </div>
      </div>
    </section>
  )
}
