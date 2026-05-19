/**
 * Variant C — "נקי" · Clean & Open
 * Vibe: Duolingo / Linear / Notion — modern educational SaaS
 * Palette: white · off-white surface · coral-orange · brand navy
 * Type: Heebo (body + headings) · pill shapes · generous spacing
 * Components: very rounded (2.5rem radius) · soft shadows · airy layout
 */

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'

const CORAL  = '#e85d3a'
const NAVY   = '#000032'
const BG     = '#ffffff'
const SURF   = '#f7f5f2'
const MUTED  = 'rgba(0,0,50,0.5)'
const LIGHT  = 'rgba(0,0,50,0.06)'

const CARDS = [
  {
    icon: '🧠',
    he: 'מסוגלות',
    en: 'Competence',
    desc: 'פיתוח מיומנויות מקצועיות, חשיבה שיטתית ושאיפה מתמדת לשיפור. מצוינות שנרכשת בעשייה יומיומית.',
  },
  {
    icon: '🤝',
    he: 'שייכות',
    en: 'Belonging',
    desc: 'קהילה עם ערכים משותפים, אמון הדדי ומחויבות לדרך. כוח שמגיע מלהיות חלק ממשהו גדול יותר.',
  },
  {
    icon: '🌱',
    he: 'השפעה',
    en: 'Impact',
    desc: 'בוגרים שפועלים. מנהיגים שמשנים מציאות. הצעד מהתנועה אל קידמת החברה הישראלית.',
  },
]

const STATS = [
  { num: '3,000+', label: 'חניכים פעילים' },
  { num: '12',     label: 'שנות פעילות' },
  { num: '3',      label: 'תוכניות' },
]

export default function VariantC() {
  const containerRef = useRef(null)
  const [hoveredCard, setHoveredCard] = useState(null)
  const [hoveredPrimary, setHoveredPrimary] = useState(false)
  const [hoveredSecondary, setHoveredSecondary] = useState(false)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.vc-badge',
        { opacity: 0, scale: 0.9 },
        { opacity: 1, scale: 1, duration: 0.6, ease: 'back.out(1.4)', delay: 0.2 }
      )
      gsap.fromTo('.vc-text',
        { opacity: 0, y: 35 },
        { opacity: 1, y: 0, stagger: 0.1, duration: 0.9, ease: 'expo.out', delay: 0.35 }
      )
      gsap.fromTo('.vc-img',
        { opacity: 0, y: 40, scale: 0.97 },
        { opacity: 1, y: 0, scale: 1, duration: 1.2, ease: 'expo.out', delay: 0.3 }
      )
    }, containerRef)
    return () => ctx.revert()
  }, [])

  return (
    <article
      dir="rtl"
      ref={containerRef}
      style={{ background: BG, color: NAVY, paddingTop: '80px' }}
    >
      {/* ── HERO — light 2-col layout ── */}
      <section style={{
        minHeight: 'calc(100dvh - 80px)',
        display: 'flex',
        alignItems: 'center',
        padding: 'clamp(3rem, 6vh, 5rem) clamp(1.5rem, 6vw, 6rem)',
        background: BG,
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Background glow blobs */}
        <div style={{
          position: 'absolute',
          top: '-10%', right: '-5%',
          width: '45vw', height: '45vw',
          background: `radial-gradient(circle, rgba(232,93,58,0.06) 0%, transparent 65%)`,
          pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute',
          bottom: '-10%', left: '20%',
          width: '30vw', height: '30vw',
          background: `radial-gradient(circle, rgba(0,0,50,0.04) 0%, transparent 65%)`,
          pointerEvents: 'none',
        }} />

        {/* 2-col flex — in RTL: first = right side (text), second = left side (image) */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 'clamp(3rem, 6vw, 6rem)',
          width: '100%',
          maxWidth: '1200px',
          margin: '0 auto',
          position: 'relative', zIndex: 1,
        }}>
          {/* Text column — RIGHT in RTL */}
          <div style={{ flex: '1 1 0', minWidth: 0 }}>
            {/* Badge */}
            <div className="vc-badge" style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              background: `rgba(232,93,58,0.09)`,
              color: CORAL,
              padding: '0.4rem 1rem',
              borderRadius: '999px',
              fontFamily: 'Heebo, sans-serif',
              fontSize: '0.78rem', fontWeight: 700,
              marginBottom: '1.5rem',
              border: `1px solid rgba(232,93,58,0.15)`,
            }}>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: CORAL, display: 'inline-block' }} />
              תנועת נוער ישראלית · פועלת מ-2014
            </div>

            {/* Headline */}
            <h1 className="vc-text" style={{
              fontFamily: 'Heebo, sans-serif', fontWeight: 800,
              fontSize: 'clamp(2.8rem, 6vw, 6rem)',
              letterSpacing: '-0.03em', lineHeight: 1.05,
              color: NAVY, margin: '0 0 1.5rem',
            }}>
              לגדול מתוך<br />
              <span style={{ color: CORAL }}>מצוינות ערכית</span>
            </h1>

            {/* Subtext */}
            <p className="vc-text" style={{
              fontFamily: 'Heebo, sans-serif', fontWeight: 400,
              fontSize: 'clamp(1rem, 1.6vw, 1.15rem)',
              lineHeight: 1.8, color: MUTED,
              margin: '0 0 2.5rem',
              maxWidth: '480px',
            }}>
              תנועת חמש אצבעות מלווה צעירים/ות בגילאי 12–21 לפתח מסוגלות, שייכות והשפעה — ולהפוך לדמויות שמשנות את הסביבה שלהם/ן.
            </p>

            {/* CTA row */}
            <div className="vc-text" style={{
              display: 'flex', gap: '1rem', flexWrap: 'wrap',
            }}>
              <a
                href="#contact"
                onMouseEnter={() => setHoveredPrimary(true)}
                onMouseLeave={() => setHoveredPrimary(false)}
                style={{
                  display: 'inline-block',
                  background: hoveredPrimary ? '#c9471e' : CORAL,
                  color: '#fff',
                  padding: '0.85rem 2.2rem',
                  borderRadius: '999px',
                  fontFamily: 'Heebo, sans-serif', fontWeight: 700,
                  fontSize: '0.9rem', textDecoration: 'none',
                  transition: 'background 0.2s',
                  boxShadow: `0 8px 24px rgba(232,93,58,0.25)`,
                }}
              >הצטרפו אלינו ←</a>

              <a
                href="#about"
                onMouseEnter={() => setHoveredSecondary(true)}
                onMouseLeave={() => setHoveredSecondary(false)}
                style={{
                  display: 'inline-block',
                  border: `2px solid ${NAVY}`,
                  color: NAVY,
                  background: hoveredSecondary ? NAVY : 'transparent',
                  padding: '0.85rem 2.2rem',
                  borderRadius: '999px',
                  fontFamily: 'Heebo, sans-serif', fontWeight: 700,
                  fontSize: '0.9rem', textDecoration: 'none',
                  transition: 'background 0.2s, color 0.2s',
                  ...(hoveredSecondary ? { color: '#fff' } : {}),
                }}
              >קראו עוד</a>
            </div>

            {/* Stats row */}
            <div className="vc-text" style={{
              marginTop: '3rem',
              paddingTop: '2rem',
              borderTop: `1px solid ${LIGHT}`,
              display: 'flex', gap: '2.5rem',
            }}>
              {STATS.map(s => (
                <div key={s.num}>
                  <div style={{
                    fontFamily: 'Heebo, sans-serif', fontWeight: 800,
                    fontSize: 'clamp(1.4rem, 2.5vw, 2rem)',
                    color: CORAL, lineHeight: 1,
                  }}>{s.num}</div>
                  <div style={{
                    fontFamily: 'Heebo, sans-serif', fontSize: '0.78rem',
                    color: MUTED, marginTop: '0.2rem',
                  }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Image column — LEFT in RTL */}
          <div className="vc-img" style={{
            flex: '0 0 44%',
            position: 'relative',
          }}>
            <div style={{
              borderRadius: '2rem',
              overflow: 'hidden',
              aspectRatio: '4/5',
              boxShadow: `0 40px 80px rgba(232,93,58,0.12), 0 10px 30px rgba(0,0,50,0.08)`,
            }}>
              <img
                src="/Hero-Pics/214A0027.jpg"
                alt=""
                style={{
                  width: '100%', height: '100%',
                  objectFit: 'cover', objectPosition: 'center 15%',
                }}
              />
            </div>
            {/* Floating badge on image */}
            <div style={{
              position: 'absolute',
              bottom: '1.5rem',
              right: '-1.5rem',
              background: '#fff',
              borderRadius: '1rem',
              padding: '0.9rem 1.2rem',
              boxShadow: '0 8px 32px rgba(0,0,50,0.12)',
              fontFamily: 'Heebo, sans-serif',
            }}>
              <div style={{ fontSize: '0.65rem', color: MUTED, marginBottom: '0.2rem' }}>חניכים/ות פעילים</div>
              <div style={{ fontSize: '1.3rem', fontWeight: 800, color: NAVY, lineHeight: 1 }}>3,000+</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CARDS — rounded, airy ── */}
      <section style={{
        background: SURF,
        borderRadius: '3rem 3rem 0 0',
        padding: 'clamp(5rem, 10vh, 8rem) clamp(1.5rem, 6vw, 6rem)',
        marginTop: '-2rem',
        position: 'relative', zIndex: 1,
      }}>
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <div style={{
            display: 'inline-block',
            background: `rgba(232,93,58,0.08)`,
            color: CORAL,
            padding: '0.3rem 1rem',
            borderRadius: '999px',
            fontFamily: 'Heebo, sans-serif',
            fontSize: '0.75rem', fontWeight: 600,
            marginBottom: '1rem',
          }}>מה אנחנו בונים</div>
          <h2 style={{
            fontFamily: 'Heebo, sans-serif', fontWeight: 800,
            fontSize: 'clamp(1.8rem, 4vw, 3.5rem)',
            letterSpacing: '-0.02em', color: NAVY,
            margin: 0,
          }}>שלושה מעגלי צמיחה</h2>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '1.5rem',
        }}>
          {CARDS.map((card, i) => (
            <div
              key={card.he}
              onMouseEnter={() => setHoveredCard(i)}
              onMouseLeave={() => setHoveredCard(null)}
              style={{
                background: '#fff',
                borderRadius: '2.5rem',
                padding: 'clamp(2rem, 4vw, 3rem)',
                border: `1px solid ${LIGHT}`,
                boxShadow: hoveredCard === i
                  ? `0 20px 60px rgba(0,0,50,0.1), 0 4px 16px rgba(232,93,58,0.08)`
                  : `0 4px 20px rgba(0,0,50,0.05)`,
                transition: 'box-shadow 0.3s ease, transform 0.3s ease',
                transform: hoveredCard === i ? 'translateY(-4px)' : 'none',
              }}
            >
              {/* Icon area */}
              <div style={{
                width: '52px', height: '52px',
                background: `rgba(232,93,58,0.09)`,
                borderRadius: '1rem',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '1.4rem', marginBottom: '1.5rem',
              }}>{card.icon}</div>

              <h3 style={{
                fontFamily: 'Heebo, sans-serif', fontWeight: 800,
                fontSize: 'clamp(1.4rem, 2.5vw, 1.8rem)',
                letterSpacing: '-0.02em', margin: '0 0 0.5rem',
                color: NAVY,
              }}>{card.he}</h3>

              <div style={{
                fontFamily: 'Heebo, sans-serif',
                fontSize: '0.72rem', fontWeight: 500,
                color: CORAL, marginBottom: '1rem',
                letterSpacing: '0.05em',
              }}>{card.en}</div>

              <p style={{
                fontFamily: 'Heebo, sans-serif',
                fontSize: 'clamp(0.88rem, 1.2vw, 0.96rem)',
                lineHeight: 1.8, margin: 0, color: MUTED,
              }}>{card.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA BAND — navy reversal ── */}
      <section style={{
        background: NAVY,
        borderRadius: '3rem 3rem 0 0',
        padding: 'clamp(5rem, 11vh, 9rem) clamp(1.5rem, 6vw, 6rem)',
        textAlign: 'center',
        marginTop: '-1.5rem',
        position: 'relative', zIndex: 2,
      }}>
        <div style={{
          display: 'inline-block',
          border: `1px solid rgba(255,255,255,0.12)`,
          color: `rgba(255,255,255,0.45)`,
          padding: '0.3rem 1rem',
          borderRadius: '999px',
          fontFamily: 'Heebo, sans-serif',
          fontSize: '0.75rem',
          marginBottom: '1.5rem',
        }}>מוכנים/ות לצאת לדרך?</div>

        <h2 style={{
          fontFamily: 'Heebo, sans-serif', fontWeight: 800,
          fontSize: 'clamp(2rem, 5vw, 5rem)',
          letterSpacing: '-0.03em', lineHeight: 1.1,
          color: '#fff', margin: '0 0 2.5rem',
        }}>
          הצטרפו לתנועה<br />
          <span style={{ color: CORAL }}>שמשנה את ישראל</span>
        </h2>

        <a
          href="#contact"
          style={{
            display: 'inline-block',
            background: CORAL, color: '#fff',
            padding: '1rem 3rem',
            borderRadius: '999px',
            fontFamily: 'Heebo, sans-serif', fontWeight: 700,
            fontSize: '0.95rem', textDecoration: 'none',
            boxShadow: `0 12px 32px rgba(232,93,58,0.35)`,
          }}
        >דברו איתנו ←</a>
      </section>
    </article>
  )
}
