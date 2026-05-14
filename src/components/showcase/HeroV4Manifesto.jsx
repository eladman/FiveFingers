import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'

/**
 * Design 4 — MISSION HUD (לוח בקרת המשימה)
 * Vision: Excellence is precision. Innovation is systematic.
 * This hero treats the movement like a high-performance operation —
 * a pilot's heads-up display, a sports analytics screen, a mission briefing.
 * The cycling photos play underneath a precision overlay:
 * corner targeting brackets, a scanning sweep line, crosshair reticle,
 * and the 5 values displayed as monitored metrics.
 * Concept: "We track excellence like a mission. Every value, every participant, measured."
 * Combines: innovation, vision, sport analytics, education, precision.
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

const VALUES = [
  { id: '01', he: 'מצוינות מקצועית', en: 'Professional Excellence', pct: 94 },
  { id: '02', he: 'גמישות',           en: 'Adaptability',           pct: 87 },
  { id: '03', he: 'עמידות',           en: 'Grit',                   pct: 91 },
  { id: '04', he: 'יוזמה',            en: 'Initiative',             pct: 88 },
  { id: '05', he: 'שייכות',           en: 'Belonging',              pct: 96 },
]

function CornerBracket({ corner }) {
  const isRight = corner.includes('right')
  const isBottom = corner.includes('bottom')
  return (
    <div style={{
      position: 'absolute',
      [isBottom ? 'bottom' : 'top']: 'clamp(1rem, 2.5vh, 2rem)',
      [isRight ? 'right' : 'left']: 'clamp(1rem, 2.5vw, 2rem)',
      width: '32px',
      height: '32px',
      borderTop: !isBottom ? '2px solid rgba(255,135,20,0.55)' : 'none',
      borderBottom: isBottom ? '2px solid rgba(255,135,20,0.55)' : 'none',
      borderLeft: !isRight ? '2px solid rgba(255,135,20,0.55)' : 'none',
      borderRight: isRight ? '2px solid rgba(255,135,20,0.55)' : 'none',
      zIndex: 8,
    }} />
  )
}

export default function HeroV4MissionHUD() {
  const [current, setCurrent] = useState(0)
  const scanRef = useRef(null)
  const ref = useRef(null)

  useEffect(() => {
    const id = setInterval(() => setCurrent(i => (i + 1) % IMAGES.length), 5000)
    return () => clearInterval(id)
  }, [])

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Scanning line — slow sweep from top to bottom, repeating
      gsap.fromTo(scanRef.current,
        { top: '0%', opacity: 0 },
        {
          top: '100%',
          opacity: 1,
          duration: 4,
          ease: 'none',
          repeat: -1,
          repeatDelay: 1.5,
          onRepeat: () => gsap.set(scanRef.current, { top: '0%', opacity: 0 }),
        }
      )

      // Content elements fade in on mount
      gsap.fromTo('.hud-el',
        { opacity: 0, y: 18 },
        { opacity: 1, y: 0, stagger: 0.1, duration: 1.2, ease: 'expo.out', delay: 0.3 }
      )

      // Corner brackets pop in
      gsap.fromTo('.hud-bracket',
        { opacity: 0, scale: 0.5 },
        { opacity: 1, scale: 1, stagger: 0.1, duration: 0.8, ease: 'expo.out', delay: 0.1 }
      )

      // Reticle rings expand
      gsap.fromTo('.hud-ring',
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, stagger: 0.12, duration: 1.4, ease: 'expo.out', delay: 0.2 }
      )

      // Value bars animate in (width from 0 to target)
      gsap.fromTo('.hud-bar-fill',
        { width: 0 },
        { width: 'auto', stagger: 0.08, duration: 1.2, ease: 'expo.out', delay: 0.6 }
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
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        padding: 'clamp(1.5rem, 4vh, 3rem) clamp(1.5rem, 6vw, 5rem)',
      }}
    >
      {/* ── BACKGROUND: Cycling photos ── */}
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
            transition: 'opacity 1.4s ease-in-out',
            filter: 'brightness(0.45) saturate(0.9)',
          }}
        />
      ))}

      {/* HUD color wash — slight blue-teal tint to photo for "tech" feel */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'rgba(0,15,40,0.45)',
        pointerEvents: 'none',
        zIndex: 1,
      }} />

      {/* Subtle grid lines */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 2, pointerEvents: 'none' }}>
        {[25, 50, 75].map(pct => (
          <div key={pct} style={{ position: 'absolute', top: 0, bottom: 0, left: `${pct}%`, width: '1px', background: 'rgba(255,255,255,0.035)' }} />
        ))}
        {[33, 66].map(pct => (
          <div key={pct} style={{ position: 'absolute', left: 0, right: 0, top: `${pct}%`, height: '1px', background: 'rgba(255,255,255,0.035)' }} />
        ))}
      </div>

      {/* ── SCANNING LINE — the heartbeat ── */}
      <div
        ref={scanRef}
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          height: '2px',
          background: 'linear-gradient(to right, transparent 0%, rgba(255,135,20,0.1) 20%, rgba(255,135,20,0.5) 50%, rgba(255,135,20,0.1) 80%, transparent 100%)',
          boxShadow: '0 0 12px rgba(255,135,20,0.3)',
          zIndex: 5,
          pointerEvents: 'none',
        }}
      />

      {/* ── CORNER BRACKETS ── */}
      {['top-right', 'top-left', 'bottom-right', 'bottom-left'].map(c => (
        <div key={c} className="hud-bracket" style={{ opacity: 0 }}>
          <CornerBracket corner={c} />
        </div>
      ))}

      {/* ── TARGETING RETICLE — top left (LTR: top-right visual area) ── */}
      <div style={{
        position: 'absolute',
        top: 'clamp(3rem, 8vh, 6rem)',
        left: 'clamp(3rem, 7vw, 6rem)',
        zIndex: 8,
      }}>
        <svg
          width="90" height="90"
          viewBox="0 0 90 90"
          style={{ display: 'block' }}
        >
          {[42, 30, 16].map((r, i) => (
            <circle
              key={r}
              className="hud-ring"
              cx="45" cy="45" r={r}
              fill="none"
              stroke={`rgba(255,135,20,${0.15 + i * 0.1})`}
              strokeWidth="0.8"
              style={{ opacity: 0 }}
            />
          ))}
          {/* Crosshairs */}
          <line x1="45" y1="0" x2="45" y2="90" stroke="rgba(255,135,20,0.15)" strokeWidth="0.6" />
          <line x1="0" y1="45" x2="90" y2="45" stroke="rgba(255,135,20,0.15)" strokeWidth="0.6" />
          {/* Center dot */}
          <circle className="hud-ring" cx="45" cy="45" r="3" fill="rgba(255,135,20,0.7)" style={{ opacity: 0 }} />
        </svg>
        <div style={{ fontFamily: 'JetBrains Mono, monospace', color: 'rgba(255,135,20,0.4)', fontSize: '0.5rem', letterSpacing: '0.2em', marginTop: '0.4rem', textAlign: 'center' }}>TARGET</div>
      </div>

      {/* ── MISSION ID — top right ── */}
      <div className="hud-el" style={{
        position: 'absolute',
        top: 'clamp(1.5rem, 4vh, 3rem)',
        right: 'clamp(1.5rem, 6vw, 5rem)',
        zIndex: 8,
        textAlign: 'right',
        opacity: 0,
      }}>
        <div style={{ fontFamily: 'JetBrains Mono, monospace', color: 'rgba(255,135,20,0.55)', fontSize: '0.6rem', letterSpacing: '0.3em', textTransform: 'uppercase' }}>
          MISSION · 2014 — {new Date().getFullYear()}
        </div>
        <div style={{ fontFamily: 'JetBrains Mono, monospace', color: 'rgba(255,255,255,0.2)', fontSize: '0.52rem', letterSpacing: '0.2em', marginTop: '0.2rem' }}>
          ISRAEL / STATUS: ACTIVE
        </div>
      </div>

      {/* ── RIGHT SIDE: VALUES AS METRICS ── */}
      <div className="hud-el" style={{
        position: 'absolute',
        top: '50%',
        transform: 'translateY(-50%)',
        left: 'clamp(1.5rem, 6vw, 5rem)',
        zIndex: 8,
        display: 'flex',
        flexDirection: 'column',
        gap: '0.9rem',
        opacity: 0,
      }}>
        {VALUES.map(v => (
          <div key={v.id} style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem' }}>
              <span style={{ fontFamily: 'JetBrains Mono, monospace', color: 'rgba(255,135,20,0.5)', fontSize: '0.5rem', letterSpacing: '0.15em' }}>{v.id}</span>
              <span style={{ fontFamily: 'Heebo, sans-serif', color: 'rgba(255,255,255,0.7)', fontSize: '0.72rem', fontWeight: 600 }}>{v.he}</span>
              <span style={{ fontFamily: 'JetBrains Mono, monospace', color: 'rgba(255,135,20,0.6)', fontSize: '0.55rem' }}>{v.pct}%</span>
            </div>
            {/* Progress bar */}
            <div style={{ height: '2px', background: 'rgba(255,255,255,0.08)', borderRadius: '1px', overflow: 'hidden', width: '160px' }}>
              <div
                className="hud-bar-fill"
                style={{
                  height: '100%',
                  width: `${v.pct}%`,
                  background: 'linear-gradient(to right, rgba(255,135,20,0.4), #ff8714)',
                  borderRadius: '1px',
                }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Bottom gradient */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: '55%',
        background: 'linear-gradient(to top, rgba(0,5,20,0.97) 0%, rgba(0,5,20,0.6) 55%, transparent 100%)',
        zIndex: 4,
        pointerEvents: 'none',
      }} />

      {/* ── BOTTOM CONTENT ── */}
      <div style={{ position: 'relative', zIndex: 10 }}>

        {/* Slide counter */}
        <div className="hud-el" style={{
          position: 'absolute',
          bottom: '100%',
          left: 0,
          right: 0,
          marginBottom: 'clamp(1.5rem, 4vh, 3rem)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          opacity: 0,
        }}>
          <div style={{ display: 'flex', gap: '5px' }}>
            {IMAGES.map((_, i) => (
              <div key={i} style={{
                width: i === current ? '20px' : '4px',
                height: '2px',
                borderRadius: '1px',
                background: i === current ? '#ff8714' : 'rgba(255,255,255,0.18)',
                transition: 'all 0.4s ease',
              }} />
            ))}
          </div>
          <div style={{ fontFamily: 'JetBrains Mono, monospace', color: 'rgba(255,135,20,0.4)', fontSize: '0.52rem', letterSpacing: '0.2em' }}>
            FEED {String(current + 1).padStart(2, '0')}/{IMAGES.length}
          </div>
        </div>

        {/* Headline */}
        <h1 className="hud-el" style={{ margin: 0, marginBottom: '0.8rem', opacity: 0 }}>
          <span style={{
            display: 'block',
            fontFamily: 'Frank Ruhl Libre, serif',
            fontWeight: 900,
            color: '#fff',
            fontSize: 'clamp(3.2rem, 10vw, 9.5rem)',
            lineHeight: 0.83,
            letterSpacing: '-0.04em',
            textShadow: '0 2px 20px rgba(0,0,0,0.8)',
          }}>חמש</span>
          <span style={{
            display: 'block',
            fontFamily: 'Frank Ruhl Libre, serif',
            fontWeight: 900,
            color: '#ff8714',
            fontSize: 'clamp(3.2rem, 10vw, 9.5rem)',
            lineHeight: 0.83,
            letterSpacing: '-0.04em',
            textShadow: '0 2px 16px rgba(0,0,0,0.7)',
          }}>אצבעות</span>
        </h1>

        <div className="hud-el" style={{
          height: '1px',
          background: 'linear-gradient(to left, rgba(255,135,20,0.6), transparent)',
          marginBottom: 'clamp(0.8rem, 1.8vh, 1.5rem)',
          opacity: 0,
        }} />

        <p className="hud-el" style={{
          fontFamily: 'Frank Ruhl Libre, serif',
          fontStyle: 'italic',
          fontWeight: 300,
          color: 'rgba(255,255,255,0.45)',
          fontSize: 'clamp(1rem, 2.5vw, 2.2rem)',
          margin: 0,
          marginBottom: 'clamp(1rem, 2.5vh, 2rem)',
          opacity: 0,
        }}>חינוך למצוינות</p>

        {/* Stats + CTA */}
        <div className="hud-el" style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1.5rem',
          paddingTop: 'clamp(0.8rem, 2vh, 1.5rem)',
          borderTop: '1px solid rgba(255,255,255,0.07)',
          opacity: 0,
        }}>
          <div style={{ display: 'flex', gap: 'clamp(1.5rem, 4vw, 3rem)' }}>
            {[['3,000+', 'חניכים'], ['12', 'שנות פעילות'], ['3', 'תוכניות']].map(([n, l]) => (
              <div key={n}>
                <div style={{ fontFamily: 'JetBrains Mono, monospace', color: '#ff8714', fontSize: 'clamp(1rem, 2vw, 1.6rem)', fontWeight: 700, lineHeight: 1 }}>{n}</div>
                <div style={{ color: 'rgba(255,255,255,0.25)', fontSize: '0.62rem', fontFamily: 'Heebo, sans-serif', marginTop: '0.2rem' }}>{l}</div>
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', gap: '0.7rem' }}>
            <a href="#contact" style={{
              fontFamily: 'Heebo, sans-serif',
              background: '#ff8714',
              color: '#000',
              padding: '0.62rem 1.55rem',
              borderRadius: '999px',
              textDecoration: 'none',
              fontSize: '0.85rem',
              fontWeight: 800,
            }}>הצטרף אלינו ←</a>
            <a href="#features" style={{
              fontFamily: 'Heebo, sans-serif',
              color: 'rgba(255,255,255,0.45)',
              border: '1px solid rgba(255,255,255,0.15)',
              padding: '0.62rem 1.35rem',
              borderRadius: '999px',
              textDecoration: 'none',
              fontSize: '0.85rem',
              fontWeight: 400,
            }}>גלו עוד</a>
          </div>
        </div>
      </div>
    </section>
  )
}
