import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'

/**
 * Design 1 — DIAGONAL SPLIT (קיצוב אלכסוני)
 * Vision: A magazine cover torn in two. The photo bleeds raw and uncropped on the left,
 * while a deep navy panel cuts in diagonally from the right, claiming the space for the brand.
 * The orange diagonal seam is the tension point — photo world vs. text world colliding.
 * Inspired by Vogue Italia covers and Der Spiegel double-page spreads.
 */

const IMAGES = [
  '/Hero-Pics/214A0011.jpg',
  '/Hero-Pics/214A0027.jpg',
  '/Hero-Pics/214A0034.jpg',
  '/Hero-Pics/214A0088.jpg',
  '/Hero-Pics/214A0114.jpg',
  '/Hero-Pics/214A0511.jpg',
  '/Hero-Pics/_14A9355.jpg',
]

export default function HeroV1DiagonalSplit() {
  const [current, setCurrent] = useState(0)
  const [ready, setReady] = useState(false)
  const navyRef = useRef(null)
  const textRef = useRef(null)

  // Slideshow
  useEffect(() => {
    const id = setInterval(() => setCurrent(i => (i + 1) % IMAGES.length), 5500)
    return () => clearInterval(id)
  }, [])

  // Animate navy panel sliding in, then text
  useEffect(() => {
    const t = setTimeout(() => setReady(true), 60)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    if (!ready) return
    const ctx = gsap.context(() => {
      gsap.fromTo('.ds-line',
        { scaleX: 0 },
        { scaleX: 1, duration: 1.2, ease: 'expo.out', delay: 0.7 }
      )
      gsap.fromTo('.ds-text',
        { opacity: 0, x: 30 },
        { opacity: 1, x: 0, stagger: 0.14, duration: 1.2, ease: 'expo.out', delay: 0.5 }
      )
    }, textRef)
    return () => ctx.revert()
  }, [ready])

  return (
    <section
      dir="rtl"
      style={{
        minHeight: '100dvh',
        position: 'relative',
        overflow: 'hidden',
        background: '#000032',
      }}
    >
      {/* ── PHOTO LAYER — left/center zone ── */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          clipPath: ready
            ? 'polygon(0 0, 63% 0, 49% 100%, 0 100%)'
            : 'polygon(0 0, 0% 0, 0% 100%, 0 100%)',
          transition: 'clip-path 1.1s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        {IMAGES.map((src, i) => (
          <img
            key={src}
            src={src}
            alt=""
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center 25%',
              opacity: i === current ? 1 : 0,
              transition: 'opacity 1.3s ease-in-out',
            }}
          />
        ))}
        {/* Subtle dark vignette on photo edges */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to left, rgba(0,0,0,0.25) 0%, transparent 40%)',
          pointerEvents: 'none',
        }} />
      </div>

      {/* ── ORANGE SVG DIAGONAL LINE ── */}
      <svg
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
          zIndex: 6,
          overflow: 'visible',
        }}
        preserveAspectRatio="none"
      >
        <line
          x1="63%" y1="0%"
          x2="49%" y2="100%"
          stroke="#ff8714"
          strokeWidth="3"
          style={{
            opacity: ready ? 1 : 0,
            transition: 'opacity 0.4s ease 0.9s',
          }}
        />
        {/* Glow duplicate */}
        <line
          x1="63%" y1="0%"
          x2="49%" y2="100%"
          stroke="#ff8714"
          strokeWidth="12"
          strokeOpacity="0.12"
          style={{
            opacity: ready ? 1 : 0,
            transition: 'opacity 0.4s ease 0.9s',
          }}
        />
      </svg>

      {/* ── NAVY PANEL — right zone ── */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: '#000032',
          clipPath: ready
            ? 'polygon(65% 0, 100% 0, 100% 100%, 51% 100%)'
            : 'polygon(100% 0, 100% 0, 100% 100%, 100% 100%)',
          transition: 'clip-path 1.1s cubic-bezier(0.16, 1, 0.3, 1)',
          zIndex: 4,
        }}
      />

      {/* ── TEXT CONTENT — sits on the navy zone, right side ── */}
      <div
        ref={textRef}
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 10,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: 'clamp(1.5rem, 4vh, 3rem) clamp(1.5rem, 5vw, 4rem)',
          paddingRight: 'clamp(1.5rem, 5vw, 4rem)',
          // Text lives in the right ~40% of the screen
          paddingLeft: '58vw',
        }}
      >
        {/* Top label */}
        <div className="ds-text" style={{
          fontFamily: 'JetBrains Mono, monospace',
          color: 'rgba(255,135,20,0.6)',
          fontSize: 'clamp(0.55rem, 0.85vw, 0.68rem)',
          letterSpacing: '0.3em',
          textTransform: 'uppercase',
        }}>
          EST. 2014 · ISRAEL
        </div>

        {/* Main headline — stacked in the navy slice */}
        <div>
          <h1 style={{ margin: 0, lineHeight: 0.85 }}>
            <span className="ds-text" style={{
              display: 'block',
              fontFamily: 'Frank Ruhl Libre, serif',
              fontWeight: 900,
              color: '#fff',
              fontSize: 'clamp(2.8rem, 6.5vw, 6.5rem)',
              letterSpacing: '-0.04em',
            }}>חמש</span>
            <span className="ds-text" style={{
              display: 'block',
              fontFamily: 'Frank Ruhl Libre, serif',
              fontWeight: 900,
              color: '#ff8714',
              fontSize: 'clamp(2.8rem, 6.5vw, 6.5rem)',
              letterSpacing: '-0.04em',
            }}>אצבעות</span>
          </h1>

          {/* Horizontal divider */}
          <div
            className="ds-line"
            style={{
              height: '1px',
              background: 'linear-gradient(to right, rgba(255,135,20,0.8), transparent)',
              margin: 'clamp(1rem, 2.5vh, 2rem) 0',
              transformOrigin: 'right',
            }}
          />

          <p className="ds-text" style={{
            fontFamily: 'Frank Ruhl Libre, serif',
            fontStyle: 'italic',
            fontWeight: 300,
            color: 'rgba(255,255,255,0.6)',
            fontSize: 'clamp(1rem, 2.2vw, 2rem)',
            margin: 0,
            letterSpacing: '-0.01em',
          }}>חינוך למצוינות</p>

          <a
            className="ds-text"
            href="#contact"
            style={{
              display: 'inline-flex',
              marginTop: 'clamp(1.2rem, 2.5vh, 2rem)',
              fontFamily: 'Heebo, sans-serif',
              background: '#ff8714',
              color: '#000032',
              padding: '0.6rem 1.5rem',
              borderRadius: '999px',
              textDecoration: 'none',
              fontSize: '0.85rem',
              fontWeight: 800,
            }}
          >הצטרף אלינו ←</a>
        </div>

        {/* Bottom stats */}
        <div className="ds-text" style={{
          borderTop: '1px solid rgba(255,255,255,0.08)',
          paddingTop: '1.5rem',
          display: 'flex',
          gap: 'clamp(1rem, 2.5vw, 2rem)',
          flexWrap: 'wrap',
        }}>
          {[['3,000+', 'חניכים'], ['12', 'שנים'], ['3', 'תוכניות']].map(([n, l]) => (
            <div key={n}>
              <div style={{ fontFamily: 'JetBrains Mono, monospace', color: '#ff8714', fontSize: 'clamp(1rem, 2vw, 1.6rem)', fontWeight: 700, lineHeight: 1 }}>{n}</div>
              <div style={{ color: 'rgba(255,255,255,0.28)', fontSize: '0.65rem', fontFamily: 'Heebo, sans-serif', marginTop: '0.2rem', letterSpacing: '0.05em' }}>{l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Photo slide counter dots — bottom left ── */}
      <div style={{
        position: 'absolute',
        bottom: '2rem',
        left: '2rem',
        zIndex: 10,
        display: 'flex',
        gap: '6px',
      }}>
        {IMAGES.map((_, i) => (
          <div key={i} style={{
            width: i === current ? '20px' : '6px',
            height: '3px',
            borderRadius: '2px',
            background: i === current ? '#ff8714' : 'rgba(255,255,255,0.3)',
            transition: 'all 0.4s ease',
          }} />
        ))}
      </div>
    </section>
  )
}
