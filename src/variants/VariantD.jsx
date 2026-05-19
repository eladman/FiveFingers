/**
 * Variant D — "ישראלי" · Earthy & Human
 * Vibe: Kinfolk / Patagonia / Israeli artisan brand — warm, authentic, grounded
 * Palette: warm stone · terracotta · olive green · warm near-black
 * Type: Frank Ruhl Libre (headings) + Heebo (body) · organic feel
 * Components: soft radius · noise texture · olive/terracotta accents · no harsh shadows
 */

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'

const TERRA  = '#c84b31'   // terracotta
const OLIVE  = '#3d4a2c'   // olive green
const STONE  = '#f5f0e8'   // warm stone background
const SURF   = '#ede7d9'   // slightly darker stone
const DARK   = '#2a2016'   // warm near-black text
const MUTED  = 'rgba(42,32,22,0.5)'

const CARDS = [
  {
    num: '01',
    he: 'מסוגלות',
    en: 'Competence',
    desc: 'פיתוח מיומנויות מקצועיות, חשיבה שיטתית ושאיפה מתמדת לשיפור. מצוינות שנרכשת בעשייה יומיומית.',
  },
  {
    num: '02',
    he: 'שייכות',
    en: 'Belonging',
    desc: 'קהילה עם ערכים משותפים, אמון הדדי ומחויבות לדרך. כוח שמגיע מלהיות חלק ממשהו גדול יותר.',
  },
  {
    num: '03',
    he: 'השפעה',
    en: 'Impact',
    desc: 'בוגרים שפועלים. מנהיגים שמשנים מציאות. הצעד מהתנועה אל קידמת החברה הישראלית.',
  },
]

// SVG noise texture — subtle grain overlay
const NoiseSVG = () => (
  <svg
    aria-hidden
    style={{
      position: 'absolute', inset: 0,
      width: '100%', height: '100%',
      opacity: 0.035, pointerEvents: 'none',
      mixBlendMode: 'multiply',
    }}
  >
    <filter id="vd-noise">
      <feTurbulence type="fractalNoise" baseFrequency="0.72" numOctaves="4" stitchTiles="stitch" />
      <feColorMatrix type="saturate" values="0" />
    </filter>
    <rect width="100%" height="100%" filter="url(#vd-noise)" />
  </svg>
)

export default function VariantD() {
  const containerRef = useRef(null)
  const [hoveredCard, setHoveredCard] = useState(null)
  const [hoveredCta, setHoveredCta] = useState(false)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.vd-hero-text',
        { opacity: 0, y: 45 },
        { opacity: 1, y: 0, stagger: 0.1, duration: 1.3, ease: 'expo.out', delay: 0.3 }
      )
    }, containerRef)
    return () => ctx.revert()
  }, [])

  return (
    <article
      dir="rtl"
      ref={containerRef}
      style={{ background: STONE, color: DARK, paddingTop: '80px' }}
    >
      {/* ── HERO — fullscreen warm image ── */}
      <section style={{
        position: 'relative',
        minHeight: 'calc(100dvh - 80px)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        overflow: 'hidden',
      }}>
        {/* Background image — warm grade */}
        <img
          src="/Hero-Pics/214A0114.jpg"
          alt=""
          style={{
            position: 'absolute', inset: 0,
            width: '100%', height: '100%',
            objectFit: 'cover', objectPosition: 'center 25%',
            filter: 'brightness(0.55) sepia(0.18) saturate(1.35)',
          }}
        />

        {/* Olive gradient from bottom */}
        <div style={{
          position: 'absolute', inset: 0,
          background: `linear-gradient(
            to top,
            rgba(61,74,44,0.95) 0%,
            rgba(61,74,44,0.6) 35%,
            rgba(61,74,44,0.1) 60%,
            transparent 80%
          )`,
        }} />

        {/* Subtle left stripe accent */}
        <div style={{
          position: 'absolute',
          top: 0, bottom: 0, right: 0,
          width: '3px',
          background: `linear-gradient(to bottom, transparent 0%, ${TERRA} 30%, ${TERRA} 70%, transparent 100%)`,
          opacity: 0.6,
        }} />

        {/* Text content */}
        <div style={{
          position: 'relative', zIndex: 10,
          padding: 'clamp(2rem, 5vw, 4.5rem)',
          paddingBottom: 'clamp(3.5rem, 8vh, 6rem)',
          maxWidth: '900px',
        }}>
          {/* EST label */}
          <div className="vd-hero-text" style={{
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: '0.58rem', letterSpacing: '0.42em',
            color: `rgba(245,240,232,0.45)`,
            textTransform: 'uppercase',
            marginBottom: '2rem',
          }}>EST. 2014 · חמש אצבעות · ישראל</div>

          {/* Main headline */}
          <h1 className="vd-hero-text" style={{
            fontFamily: 'Frank Ruhl Libre, serif', fontWeight: 700,
            fontSize: 'clamp(4rem, 12vw, 11rem)',
            letterSpacing: '-0.045em', lineHeight: 0.88,
            color: STONE, margin: 0,
          }}>
            <span style={{ display: 'block' }}>חמש</span>
            <span style={{ display: 'block' }}>אצבעות</span>
          </h1>

          {/* Terracotta rule */}
          <div className="vd-hero-text" style={{
            width: '4rem', height: '1px',
            background: TERRA, margin: '2rem 0',
          }} />

          {/* Subtitle */}
          <p className="vd-hero-text" style={{
            fontFamily: 'Frank Ruhl Libre, serif',
            fontStyle: 'italic', fontWeight: 300,
            fontSize: 'clamp(1.1rem, 3vw, 2.5rem)',
            color: `rgba(245,240,232,0.75)`,
            margin: '0 0 2.5rem',
            letterSpacing: '-0.01em', lineHeight: 1.35,
          }}>חינוך למצוינות ערכית שמשנה מציאות</p>

          {/* CTA */}
          <div className="vd-hero-text" style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <a
              href="#contact"
              onMouseEnter={() => setHoveredCta(true)}
              onMouseLeave={() => setHoveredCta(false)}
              style={{
                display: 'inline-block',
                background: hoveredCta ? '#a33a23' : TERRA,
                color: STONE,
                padding: '0.9rem 2.5rem',
                borderRadius: '0.5rem',
                fontFamily: 'Heebo, sans-serif', fontWeight: 700,
                fontSize: '0.88rem', textDecoration: 'none',
                transition: 'background 0.2s',
              }}
            >הצטרפו אלינו ←</a>

            <a
              href="#about"
              style={{
                display: 'inline-block',
                border: `1px solid rgba(245,240,232,0.35)`,
                color: `rgba(245,240,232,0.75)`,
                padding: '0.9rem 2.5rem',
                borderRadius: '0.5rem',
                fontFamily: 'Heebo, sans-serif', fontWeight: 600,
                fontSize: '0.88rem', textDecoration: 'none',
              }}
            >קראו עוד</a>
          </div>
        </div>
      </section>

      {/* ── CARDS — warm stone surface ── */}
      <section style={{
        background: STONE,
        position: 'relative',
        padding: 'clamp(5rem, 10vh, 8rem) clamp(1.5rem, 6vw, 6rem)',
        overflow: 'hidden',
      }}>
        <NoiseSVG />

        {/* Decorative watermark — faded logo */}
        <img
          src="/logo.png"
          alt=""
          aria-hidden
          style={{
            position: 'absolute',
            left: '-3%', top: '10%',
            width: 'min(340px, 50vw)',
            opacity: 0.04,
            filter: 'grayscale(1)',
            transform: 'rotate(15deg)',
            pointerEvents: 'none',
            userSelect: 'none',
          }}
        />

        <div style={{ position: 'relative', zIndex: 1 }}>
          {/* Section heading */}
          <div style={{ marginBottom: '4rem' }}>
            <div style={{
              fontFamily: 'Heebo, sans-serif', fontWeight: 600,
              fontSize: '0.72rem', letterSpacing: '0.22em',
              color: TERRA, textTransform: 'uppercase',
              marginBottom: '0.75rem',
            }}>מה אנחנו בונים</div>
            <h2 style={{
              fontFamily: 'Frank Ruhl Libre, serif', fontWeight: 700,
              fontSize: 'clamp(1.8rem, 4vw, 4rem)',
              letterSpacing: '-0.025em', color: OLIVE,
              margin: 0, lineHeight: 1.1,
            }}>שלושה מעגלי צמיחה</h2>
          </div>

          {/* Card grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1.5rem',
          }}>
            {CARDS.map((card, i) => (
              <div
                key={card.num}
                onMouseEnter={() => setHoveredCard(i)}
                onMouseLeave={() => setHoveredCard(null)}
                style={{
                  background: hoveredCard === i ? '#e5ddd0' : SURF,
                  borderRadius: '1.5rem',
                  padding: 'clamp(2rem, 4vw, 3rem)',
                  border: `1px solid rgba(42,32,22,0.09)`,
                  borderRight: `3px solid ${TERRA}`,
                  transition: 'background 0.25s ease, transform 0.25s ease',
                  transform: hoveredCard === i ? 'translateY(-3px)' : 'none',
                  position: 'relative', overflow: 'hidden',
                }}
              >
                {/* Number */}
                <div style={{
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: '0.58rem', letterSpacing: '0.35em',
                  color: `rgba(200,75,49,0.45)`, textTransform: 'uppercase',
                  marginBottom: '2rem',
                }}>{card.num}</div>

                {/* Title */}
                <h3 style={{
                  fontFamily: 'Frank Ruhl Libre, serif', fontWeight: 700,
                  fontSize: 'clamp(1.6rem, 2.8vw, 2.5rem)',
                  letterSpacing: '-0.025em',
                  color: OLIVE, margin: '0 0 0.5rem', lineHeight: 1.1,
                }}>{card.he}</h3>

                {/* EN label */}
                <div style={{
                  fontFamily: 'Heebo, sans-serif',
                  fontSize: '0.72rem', fontWeight: 500,
                  color: TERRA, marginBottom: '1.25rem',
                  letterSpacing: '0.06em',
                }}>{card.en}</div>

                {/* Body */}
                <p style={{
                  fontFamily: 'Heebo, sans-serif',
                  fontSize: 'clamp(0.88rem, 1.1vw, 0.95rem)',
                  lineHeight: 1.85, margin: 0, color: MUTED,
                }}>{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Organic divider ── */}
      <div style={{
        display: 'flex', alignItems: 'center',
        padding: '0 clamp(1.5rem, 6vw, 6rem)',
        background: STONE,
      }}>
        <div style={{ flex: 1, height: '1px', background: `rgba(42,32,22,0.1)` }} />
        <svg width="18" height="18" viewBox="0 0 18 18" style={{ margin: '0 1.5rem', flexShrink: 0 }}>
          <path
            d="M9 1 L10.5 7.5 L17 9 L10.5 10.5 L9 17 L7.5 10.5 L1 9 L7.5 7.5 Z"
            fill={TERRA} opacity="0.45"
          />
        </svg>
        <div style={{ flex: 1, height: '1px', background: `rgba(42,32,22,0.1)` }} />
      </div>

      {/* ── CTA BAND — olive green ── */}
      <section style={{
        background: OLIVE,
        position: 'relative',
        padding: 'clamp(5rem, 11vh, 9rem) clamp(1.5rem, 6vw, 6rem)',
        overflow: 'hidden',
      }}>
        <NoiseSVG />

        {/* Logo watermark */}
        <img
          src="/logo.png"
          alt=""
          aria-hidden
          style={{
            position: 'absolute',
            left: '55%', top: '50%',
            transform: 'translate(-50%, -50%)',
            width: 'min(500px, 70vw)',
            opacity: 0.05,
            filter: 'grayscale(1) brightness(3)',
            pointerEvents: 'none',
            userSelect: 'none',
          }}
        />

        <div style={{
          position: 'relative', zIndex: 1,
          maxWidth: '700px',
        }}>
          <div style={{
            fontFamily: 'Heebo, sans-serif', fontWeight: 600,
            fontSize: '0.72rem', letterSpacing: '0.22em',
            color: `rgba(245,240,232,0.4)`, textTransform: 'uppercase',
            marginBottom: '1rem',
          }}>הצטרפו לתנועה</div>

          <h2 style={{
            fontFamily: 'Frank Ruhl Libre, serif', fontWeight: 700,
            fontSize: 'clamp(2.2rem, 5.5vw, 5.5rem)',
            letterSpacing: '-0.03em', lineHeight: 1.05,
            color: STONE, margin: '0 0 2rem',
          }}>
            להיות חלק<br />
            <span style={{ color: TERRA }}>ממשהו גדול</span>
          </h2>

          <p style={{
            fontFamily: 'Heebo, sans-serif', fontWeight: 400,
            fontSize: 'clamp(0.95rem, 1.5vw, 1.1rem)',
            lineHeight: 1.8, color: `rgba(245,240,232,0.55)`,
            margin: '0 0 2.5rem', maxWidth: '480px',
          }}>
            תנועת חמש אצבעות פועלת מאז 2014 עם ~3,000 חניכים/ות ברחבי ישראל. בואו לצמוח, להשתייך ולהשפיע.
          </p>

          <a
            href="#contact"
            style={{
              display: 'inline-block',
              background: TERRA, color: STONE,
              padding: '0.95rem 2.8rem',
              borderRadius: '0.5rem',
              fontFamily: 'Heebo, sans-serif', fontWeight: 700,
              fontSize: '0.9rem', textDecoration: 'none',
            }}
          >צרו קשר ←</a>
        </div>
      </section>
    </article>
  )
}
