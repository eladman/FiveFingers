import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'

/**
 * Design 3 — TRIPTYCH (טריפטיך)
 * Vision: Three photos, three worlds — each with a completely different color language.
 * Left: drenched in warm amber-orange (fire, passion, action).
 * Center: natural, real, unfiltered — the widest panel, the heart.
 * Right: cool indigo-blue (depth, thought, belonging).
 * The three color grades represent the movement's journey: intensity → reality → depth.
 * The title spans all three panels like a film credit across a widescreen frame.
 * Inspired by triptych altarpieces, Wes Anderson compositions, and Cannes poster design.
 */

const PANELS = [
  {
    img: '/Hero-Pics/214A0027.jpg',
    grade: { filter: 'brightness(0.75) saturate(1.6) sepia(0.3)', overlay: 'rgba(180,60,0,0.35)' },
    label: 'עוצמה',
    sub: 'Intensity',
    flex: 0.9,
  },
  {
    img: '/Hero-Pics/_14A9355.jpg',
    grade: { filter: 'brightness(0.65) saturate(1.1)', overlay: 'rgba(0,0,30,0.4)' },
    label: 'מציאות',
    sub: 'Reality',
    flex: 1.3,
    center: true,
  },
  {
    img: '/Hero-Pics/214A0511.jpg',
    grade: { filter: 'brightness(0.7) saturate(0.7) hue-rotate(195deg)', overlay: 'rgba(0,20,90,0.4)' },
    label: 'עומק',
    sub: 'Depth',
    flex: 0.9,
  },
]

export default function HeroV3Triptych() {
  const [hovered, setHovered] = useState(null)
  const ref = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Each panel fades up from below
      gsap.fromTo('.tp-panel',
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.12, duration: 1.4, ease: 'expo.out', delay: 0.1 }
      )
      gsap.fromTo('.tp-title',
        { y: 24, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.1, ease: 'power3.out', delay: 0.7 }
      )
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={ref}
      dir="rtl"
      style={{
        minHeight: '100dvh',
        display: 'flex',
        flexDirection: 'column',
        background: '#000',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      {/* ── THREE PANELS ── */}
      <div style={{ flex: 1, display: 'flex', minHeight: 0 }}>
        {PANELS.map((panel, i) => {
          const isHov = hovered === i
          const otherHov = hovered !== null && !isHov

          return (
            <div
              key={panel.label}
              className="tp-panel"
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              style={{
                flex: isHov
                  ? (panel.flex * 1.5)
                  : otherHov
                  ? (panel.flex * 0.7)
                  : panel.flex,
                transition: 'flex 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
                position: 'relative',
                overflow: 'hidden',
                // Thin gaps between panels
                borderLeft: i > 0 ? '2px solid #000' : 'none',
              }}
            >
              {/* Photo with color grade via filter */}
              <img
                src={panel.img}
                alt={panel.label}
                style={{
                  position: 'absolute',
                  inset: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: panel.center ? 'center 30%' : 'center 20%',
                  filter: panel.grade.filter,
                  transition: 'transform 0.7s ease, filter 0.5s ease',
                  transform: isHov ? 'scale(1.04)' : 'scale(1.01)',
                }}
              />

              {/* Color overlay for the grade */}
              <div style={{
                position: 'absolute',
                inset: 0,
                background: panel.grade.overlay,
                mixBlendMode: 'multiply',
                transition: 'opacity 0.5s ease',
                opacity: isHov ? 0.7 : 1,
              }} />

              {/* Bottom gradient */}
              <div style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(to top, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.2) 45%, transparent 70%)',
              }} />

              {/* Panel number — top center */}
              <div style={{
                position: 'absolute',
                top: '1.2rem',
                left: 0,
                right: 0,
                textAlign: 'center',
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: '0.58rem',
                letterSpacing: '0.28em',
                color: 'rgba(255,255,255,0.3)',
                transition: 'color 0.3s ease',
              }}>
                {`0${i + 1}`}
              </div>

              {/* Color grade label — appears on hover */}
              <div style={{
                position: 'absolute',
                bottom: 'clamp(1.5rem, 4vh, 3.5rem)',
                left: 0,
                right: 0,
                padding: '0 1rem',
                textAlign: 'center',
                transition: 'all 0.4s ease',
              }}>
                <div style={{
                  fontFamily: 'Frank Ruhl Libre, serif',
                  fontWeight: 700,
                  color: isHov ? '#ff8714' : 'rgba(255,255,255,0.65)',
                  fontSize: isHov ? 'clamp(1.4rem, 3.5vw, 2.6rem)' : 'clamp(0.9rem, 1.8vw, 1.5rem)',
                  lineHeight: 1.1,
                  transition: 'all 0.45s ease',
                  textShadow: '0 2px 12px rgba(0,0,0,0.8)',
                }}>{panel.label}</div>
                <div style={{
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: '0.58rem',
                  letterSpacing: '0.2em',
                  color: 'rgba(255,255,255,0.28)',
                  marginTop: '0.3rem',
                  textTransform: 'uppercase',
                  opacity: isHov ? 1 : 0.5,
                  transition: 'opacity 0.35s ease',
                }}>{panel.sub}</div>
              </div>

              {/* Left/Right orange accent strip on hover */}
              <div style={{
                position: 'absolute',
                top: 0,
                bottom: 0,
                [i === 0 ? 'left' : i === 2 ? 'right' : 'left']: 0,
                width: '3px',
                background: '#ff8714',
                opacity: isHov ? 1 : 0,
                transition: 'opacity 0.3s ease',
              }} />
            </div>
          )
        })}
      </div>

      {/* ── BOTTOM TITLE BAR ── */}
      <div
        className="tp-title"
        style={{
          background: '#000',
          borderTop: '1px solid rgba(255,135,20,0.2)',
          padding: 'clamp(1rem, 2.5vh, 2rem) clamp(1.5rem, 5vw, 4.5rem)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem',
          flexShrink: 0,
        }}
      >
        {/* Title */}
        <div>
          <span style={{
            fontFamily: 'Frank Ruhl Libre, serif',
            fontWeight: 900,
            color: '#fff',
            fontSize: 'clamp(1.6rem, 4vw, 3.2rem)',
            letterSpacing: '-0.035em',
          }}>חמש אצבעות</span>
          <span style={{
            fontFamily: 'Frank Ruhl Libre, serif',
            fontWeight: 300,
            fontStyle: 'italic',
            color: '#ff8714',
            fontSize: 'clamp(1.1rem, 2.5vw, 2rem)',
            marginRight: '0.8rem',
            letterSpacing: '-0.02em',
          }}>· חינוך למצוינות</span>
        </div>

        {/* Stats + CTA */}
        <div style={{ display: 'flex', gap: '2rem', alignItems: 'center', flexWrap: 'wrap' }}>
          {[['3,000+', 'חניכים'], ['12', 'שנים']].map(([n, l]) => (
            <div key={n} style={{ textAlign: 'center' }}>
              <div style={{ fontFamily: 'JetBrains Mono, monospace', color: '#ff8714', fontSize: 'clamp(0.95rem, 1.8vw, 1.3rem)', fontWeight: 700 }}>{n}</div>
              <div style={{ color: 'rgba(255,255,255,0.28)', fontSize: '0.62rem', fontFamily: 'Heebo, sans-serif' }}>{l}</div>
            </div>
          ))}
          <a href="#contact" style={{
            fontFamily: 'Heebo, sans-serif',
            background: '#ff8714',
            color: '#000',
            padding: '0.55rem 1.35rem',
            borderRadius: '999px',
            textDecoration: 'none',
            fontSize: '0.82rem',
            fontWeight: 800,
          }}>הצטרף ←</a>
        </div>
      </div>
    </section>
  )
}
