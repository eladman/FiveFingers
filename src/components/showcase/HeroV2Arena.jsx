import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'

/**
 * Design 2 — KINETIC BLINDS (תריסים בתנועה)
 * Vision: Sport is about motion stopped and restarted. A photo of people in action is
 * split into horizontal strips — like venetian blinds — each strip flying in from
 * an alternating direction. The image ASSEMBLES itself, strip by strip, like a scoreboard
 * revealing the result. Orange hairlines between strips stay as a persistent grid.
 * Then the slideshow takes over behind the strips.
 * Concept: "The movement comes together one piece at a time."
 * Kinetic, athletic, revelatory — sport + education assembling into a whole.
 */

const IMAGES = [
  '/Hero-Pics/214A0088.jpg',
  '/Hero-Pics/214A0011.jpg',
  '/Hero-Pics/214A0027.jpg',
  '/Hero-Pics/214A0034.jpg',
  '/Hero-Pics/214A0114.jpg',
  '/Hero-Pics/214A0511.jpg',
  '/Hero-Pics/_14A9355.jpg',
]

const N = 14 // number of strips
const STRIP_H = 100 / N // vh per strip

export default function HeroV2KineticBlinds() {
  const [assembled, setAssembled] = useState(false)
  const [current, setCurrent] = useState(0)
  const textRef = useRef(null)
  const ref = useRef(null)

  // Trigger assembly
  useEffect(() => {
    const t = setTimeout(() => setAssembled(true), 80)
    return () => clearTimeout(t)
  }, [])

  // After assembly completes, animate in text
  useEffect(() => {
    if (!assembled) return
    const assemblyDuration = N * 55 + 1000 // last strip delay + transition duration
    const t = setTimeout(() => {
      gsap.fromTo('.kb-text',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.1, duration: 1.1, ease: 'expo.out' }
      )
    }, assemblyDuration)
    return () => clearTimeout(t)
  }, [assembled])

  // Slideshow cycling — starts after assembly
  useEffect(() => {
    if (!assembled) return
    const assemblyDuration = N * 55 + 1500
    const t = setTimeout(() => {
      const id = setInterval(() => setCurrent(i => (i + 1) % IMAGES.length), 5000)
      return () => clearInterval(id)
    }, assemblyDuration)
    return () => clearTimeout(t)
  }, [assembled])

  return (
    <section
      ref={ref}
      dir="rtl"
      style={{
        minHeight: '100dvh',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        padding: 'clamp(1.5rem, 4vh, 3rem) clamp(1.5rem, 6vw, 5rem)',
        background: '#000',
      }}
    >
      {/* ── STRIP ASSEMBLY — the image split into N horizontal slices ── */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 1 }}>
        {Array.from({ length: N }).map((_, i) => {
          const fromLeft = i % 2 === 0
          return (
            <div
              key={i}
              style={{
                position: 'relative',
                height: `${STRIP_H}vh`,
                overflow: 'hidden',
                // Orange hairline below each strip
                borderBottom: i < N - 1 ? '1px solid rgba(255,135,20,0.22)' : 'none',
                // Slide in from alternating sides
                transform: assembled
                  ? 'translateX(0)'
                  : `translateX(${fromLeft ? '-108%' : '108%'})`,
                transition: `transform 1.05s cubic-bezier(0.16, 1, 0.3, 1) ${i * 0.055}s`,
              }}
            >
              {/* First image — the assembly image */}
              <img
                src={IMAGES[0]}
                alt=""
                style={{
                  position: 'absolute',
                  top: `${-i * STRIP_H}vh`,
                  left: 0,
                  width: '100%',
                  height: '100vh',
                  objectFit: 'cover',
                  objectPosition: 'center 28%',
                  opacity: current === 0 ? 1 : 0,
                  transition: 'opacity 1.4s ease',
                }}
              />
              {/* Subsequent cycling images */}
              {IMAGES.slice(1).map((src, j) => (
                <img
                  key={src}
                  src={src}
                  alt=""
                  style={{
                    position: 'absolute',
                    top: `${-i * STRIP_H}vh`,
                    left: 0,
                    width: '100%',
                    height: '100vh',
                    objectFit: 'cover',
                    objectPosition: 'center 28%',
                    opacity: current === j + 1 ? 1 : 0,
                    transition: 'opacity 1.4s ease',
                  }}
                />
              ))}
            </div>
          )
        })}
      </div>

      {/* Dark gradient from bottom for text */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: '60%',
        background: 'linear-gradient(to top, rgba(0,0,10,0.95) 0%, rgba(0,0,10,0.55) 55%, transparent 100%)',
        zIndex: 3,
        pointerEvents: 'none',
      }} />

      {/* Subtle top fade */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '20%',
        background: 'linear-gradient(to bottom, rgba(0,0,0,0.5) 0%, transparent 100%)',
        zIndex: 3,
        pointerEvents: 'none',
      }} />

      {/* ── CONTENT ── */}
      <div style={{ position: 'relative', zIndex: 10 }} ref={textRef}>

        {/* Top identifier — pre-faded, shows from start */}
        <div
          className="kb-text"
          style={{
            position: 'absolute',
            bottom: '100%',
            marginBottom: 'clamp(1.5rem, 4vh, 3rem)',
            left: 0,
            right: 0,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            opacity: 0, // GSAP will reveal
          }}
        >
          <span style={{
            fontFamily: 'JetBrains Mono, monospace',
            color: 'rgba(255,135,20,0.55)',
            fontSize: 'clamp(0.55rem, 0.85vw, 0.68rem)',
            letterSpacing: '0.32em',
            textTransform: 'uppercase',
          }}>ISRAEL · EST. 2014</span>

          {/* Strip counter indicator */}
          <div style={{ display: 'flex', gap: '2px' }}>
            {Array.from({ length: N }).map((_, i) => (
              <div key={i} style={{
                width: '3px',
                height: '12px',
                background: assembled ? 'rgba(255,135,20,0.35)' : 'rgba(255,255,255,0.1)',
                borderRadius: '1.5px',
                transition: `background 0.3s ease ${i * 0.05}s`,
              }} />
            ))}
          </div>
        </div>

        {/* Main headline */}
        <h1 className="kb-text" style={{ margin: 0, opacity: 0 }}>
          <span style={{
            display: 'block',
            fontFamily: 'Frank Ruhl Libre, serif',
            fontWeight: 900,
            color: '#fff',
            fontSize: 'clamp(3.5rem, 11vw, 10.5rem)',
            lineHeight: 0.83,
            letterSpacing: '-0.04em',
            textShadow: '0 2px 24px rgba(0,0,0,0.9), 0 0 60px rgba(0,0,0,0.5)',
          }}>חמש</span>
          <span style={{
            display: 'block',
            fontFamily: 'Frank Ruhl Libre, serif',
            fontWeight: 900,
            color: '#ff8714',
            fontSize: 'clamp(3.5rem, 11vw, 10.5rem)',
            lineHeight: 0.83,
            letterSpacing: '-0.04em',
            textShadow: '0 2px 20px rgba(0,0,0,0.9)',
          }}>אצבעות</span>
        </h1>

        {/* Divider */}
        <div className="kb-text" style={{
          height: '1px',
          background: 'linear-gradient(to left, rgba(255,135,20,0.7), transparent)',
          margin: 'clamp(1rem, 2vh, 1.8rem) 0',
          opacity: 0,
        }} />

        <p className="kb-text" style={{
          fontFamily: 'Frank Ruhl Libre, serif',
          fontStyle: 'italic',
          fontWeight: 300,
          color: 'rgba(255,255,255,0.55)',
          fontSize: 'clamp(1.1rem, 2.8vw, 2.4rem)',
          margin: 0,
          marginBottom: 'clamp(1.2rem, 3vh, 2.2rem)',
          opacity: 0,
        }}>חינוך למצוינות</p>

        {/* Stats + CTA */}
        <div
          className="kb-text"
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '1.5rem',
            paddingTop: 'clamp(1rem, 2vh, 1.8rem)',
            borderTop: '1px solid rgba(255,255,255,0.07)',
            opacity: 0,
          }}
        >
          <div style={{ display: 'flex', gap: 'clamp(1.5rem, 4vw, 3.5rem)' }}>
            {[['3,000+', 'חניכים'], ['12', 'שנות פעילות'], ['3', 'תוכניות']].map(([n, l]) => (
              <div key={n}>
                <div style={{ fontFamily: 'JetBrains Mono, monospace', color: '#ff8714', fontSize: 'clamp(1rem, 2vw, 1.6rem)', fontWeight: 700, lineHeight: 1 }}>{n}</div>
                <div style={{ color: 'rgba(255,255,255,0.28)', fontSize: '0.62rem', fontFamily: 'Heebo, sans-serif', marginTop: '0.25rem' }}>{l}</div>
              </div>
            ))}
          </div>
          <a href="#contact" style={{
            fontFamily: 'Heebo, sans-serif',
            background: '#ff8714',
            color: '#000',
            padding: '0.65rem 1.6rem',
            borderRadius: '999px',
            textDecoration: 'none',
            fontSize: '0.85rem',
            fontWeight: 800,
            flexShrink: 0,
          }}>הצטרף אלינו ←</a>
        </div>
      </div>
    </section>
  )
}
