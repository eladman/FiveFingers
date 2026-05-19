/**
 * Variant A — "מודרני" · Bold & Modern
 * Vibe: Nike / streetwear / editorial sport
 * Palette: near-black · electric orange · white
 * Type: Inter Black · tight tracking · high contrast
 * Components: zero border-radius · thick orange borders · sharp CTAs
 */

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'

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

export default function VariantA() {
  const containerRef = useRef(null)
  const [hoveredCard, setHoveredCard] = useState(null)
  const [hoveredCta, setHoveredCta] = useState(false)
  const [hoveredBigCta, setHoveredBigCta] = useState(false)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.va-label',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.7, ease: 'expo.out', delay: 0.15 }
      )
      gsap.fromTo('.va-h1',
        { opacity: 0, y: 60, skewY: 3 },
        { opacity: 1, y: 0, skewY: 0, stagger: 0.08, duration: 1.1, ease: 'expo.out', delay: 0.3 }
      )
      gsap.fromTo('.va-line',
        { scaleX: 0 },
        { scaleX: 1, duration: 0.9, ease: 'expo.out', delay: 0.7 }
      )
      gsap.fromTo('.va-sub',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, stagger: 0.1, duration: 0.8, ease: 'expo.out', delay: 0.85 }
      )
    }, containerRef)
    return () => ctx.revert()
  }, [])

  return (
    <article
      dir="rtl"
      ref={containerRef}
      style={{ background: '#0a0a0a', color: '#fff', paddingTop: '80px' }}
    >
      {/* ── HERO ── */}
      <section style={{
        position: 'relative',
        minHeight: 'calc(100dvh - 80px)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        overflow: 'hidden',
      }}>
        {/* Background image */}
        <img
          src="/Hero-Pics/214A0088.jpg"
          alt=""
          style={{
            position: 'absolute', inset: 0,
            width: '100%', height: '100%',
            objectFit: 'cover', objectPosition: 'center 30%',
            filter: 'brightness(0.28) contrast(1.15) saturate(0.8)',
          }}
        />

        {/* Bottom vignette */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to top, rgba(10,10,10,1) 0%, rgba(10,10,10,0.6) 30%, transparent 60%)',
          pointerEvents: 'none',
        }} />

        {/* Orange side accent */}
        <div style={{
          position: 'absolute',
          top: 0, bottom: 0, right: 0,
          width: '4px',
          background: 'linear-gradient(to bottom, transparent 0%, #ff6b00 30%, #ff6b00 70%, transparent 100%)',
          zIndex: 5,
        }} />

        {/* Text content */}
        <div style={{
          position: 'relative', zIndex: 10,
          padding: 'clamp(2rem, 5vw, 4.5rem)',
          paddingBottom: 'clamp(3rem, 7vh, 5.5rem)',
          maxWidth: '1100px',
        }}>
          <div className="va-label" style={{
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: 'clamp(0.55rem, 1vw, 0.68rem)',
            letterSpacing: '0.38em',
            color: '#ff6b00',
            textTransform: 'uppercase',
            marginBottom: '2rem',
          }}>
            תנועת חמש אצבעות · ישראל · EST. 2014
          </div>

          <h1 style={{ margin: 0, lineHeight: 0.82 }}>
            <span className="va-h1" style={{
              display: 'block',
              fontFamily: 'Inter, sans-serif', fontWeight: 900,
              fontSize: 'clamp(5rem, 14vw, 14rem)',
              letterSpacing: '-0.06em',
              color: '#ffffff',
              willChange: 'transform',
            }}>חמש</span>
            <span className="va-h1" style={{
              display: 'block',
              fontFamily: 'Inter, sans-serif', fontWeight: 900,
              fontSize: 'clamp(5rem, 14vw, 14rem)',
              letterSpacing: '-0.06em',
              color: '#ff6b00',
              willChange: 'transform',
            }}>אצבעות</span>
          </h1>

          <div
            className="va-line"
            style={{
              width: '140px', height: '4px',
              background: '#ff6b00',
              margin: '2.5rem 0',
              transformOrigin: 'right',
            }}
          />

          <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', flexWrap: 'wrap' }}>
            <p className="va-sub" style={{
              fontFamily: 'Inter, sans-serif', fontWeight: 700,
              fontSize: 'clamp(0.75rem, 1.5vw, 1rem)',
              letterSpacing: '0.22em', textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.38)',
              margin: 0,
            }}>חינוך למצוינות ערכית</p>

            <a
              href="#contact"
              className="va-sub"
              onMouseEnter={() => setHoveredCta(true)}
              onMouseLeave={() => setHoveredCta(false)}
              style={{
                display: 'inline-block',
                background: hoveredCta ? '#fff' : '#ff6b00',
                color: hoveredCta ? '#ff6b00' : '#000',
                padding: '0.9rem 2.8rem',
                fontFamily: 'Inter, sans-serif', fontWeight: 800,
                fontSize: '0.78rem', letterSpacing: '0.18em',
                textTransform: 'uppercase', textDecoration: 'none',
                transition: 'background 0.18s, color 0.18s',
                borderRadius: 0,
              }}
            >הצטרפו עכשיו ←</a>
          </div>
        </div>

        {/* Program count strip — bottom */}
        <div style={{
          position: 'absolute',
          bottom: 0, left: 0,
          background: '#ff6b00',
          padding: '0.6rem 2rem',
          zIndex: 10,
        }}>
          <span style={{
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: '0.62rem', letterSpacing: '0.25em',
            color: '#000', textTransform: 'uppercase',
          }}>3,000+ · חניכים ברחבי ישראל</span>
        </div>
      </section>

      {/* ── CARDS ── */}
      <section style={{ background: '#0a0a0a', padding: 'clamp(5rem, 10vh, 8rem) 0' }}>
        <div style={{
          padding: '0 clamp(1.5rem, 5vw, 4.5rem)',
          marginBottom: '3rem',
        }}>
          <div style={{
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: '0.6rem', letterSpacing: '0.4em',
            color: 'rgba(255,107,0,0.5)', textTransform: 'uppercase',
            marginBottom: '0.75rem',
          }}>מה אנחנו בונים</div>
          <h2 style={{
            fontFamily: 'Inter, sans-serif', fontWeight: 900,
            fontSize: 'clamp(1.8rem, 4vw, 4rem)',
            letterSpacing: '-0.04em', margin: 0,
            color: '#fff',
          }}>שלושה מעגלי צמיחה</h2>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          borderTop: '1px solid rgba(255,107,0,0.12)',
          borderBottom: '1px solid rgba(255,107,0,0.12)',
        }}>
          {CARDS.map((card, i) => (
            <div
              key={card.num}
              onMouseEnter={() => setHoveredCard(i)}
              onMouseLeave={() => setHoveredCard(null)}
              style={{
                background: hoveredCard === i ? '#ff6b00' : 'transparent',
                color: hoveredCard === i ? '#000' : '#fff',
                padding: 'clamp(2.5rem, 5vw, 4rem) clamp(2rem, 4vw, 3.5rem)',
                borderTop: '4px solid #ff6b00',
                borderLeft: i < 2 ? '1px solid rgba(255,107,0,0.12)' : 'none',
                transition: 'background 0.2s ease, color 0.2s ease',
                cursor: 'default',
              }}
            >
              <div style={{
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: '0.6rem', letterSpacing: '0.35em',
                color: hoveredCard === i ? 'rgba(0,0,0,0.4)' : 'rgba(255,107,0,0.5)',
                marginBottom: '2rem', textTransform: 'uppercase',
              }}>{card.num}</div>

              <h3 style={{
                fontFamily: 'Inter, sans-serif', fontWeight: 900,
                fontSize: 'clamp(2rem, 3.5vw, 3.5rem)',
                letterSpacing: '-0.04em', margin: '0 0 0.4rem',
                lineHeight: 0.95,
              }}>{card.he}</h3>

              <div style={{
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: '0.6rem', letterSpacing: '0.25em',
                textTransform: 'uppercase',
                color: hoveredCard === i ? 'rgba(0,0,0,0.4)' : 'rgba(255,255,255,0.25)',
                marginBottom: '2rem',
              }}>{card.en}</div>

              <p style={{
                fontFamily: 'Heebo, sans-serif',
                fontSize: 'clamp(0.85rem, 1.2vw, 1rem)',
                lineHeight: 1.75, margin: 0,
                color: hoveredCard === i ? 'rgba(0,0,0,0.65)' : 'rgba(255,255,255,0.5)',
              }}>{card.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA BAND ── */}
      <section style={{
        background: '#060606',
        padding: 'clamp(6rem, 14vh, 12rem) clamp(1.5rem, 5vw, 4.5rem)',
        textAlign: 'center',
        borderTop: '1px solid rgba(255,107,0,0.1)',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Big background text */}
        <div style={{
          position: 'absolute', inset: 0,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: 'Inter, sans-serif', fontWeight: 900,
          fontSize: 'clamp(8rem, 20vw, 22rem)',
          letterSpacing: '-0.07em',
          color: 'rgba(255,107,0,0.03)',
          pointerEvents: 'none',
          userSelect: 'none',
          whiteSpace: 'nowrap',
        }}>JOIN</div>

        <div style={{ position: 'relative', zIndex: 1 }}>
          <h2 style={{
            fontFamily: 'Inter, sans-serif', fontWeight: 900,
            fontSize: 'clamp(3rem, 9vw, 10rem)',
            letterSpacing: '-0.055em', lineHeight: 0.88,
            color: '#fff', margin: '0 0 3rem',
          }}>
            מוכנים<br />
            <span style={{ color: '#ff6b00' }}>להצטרף?</span>
          </h2>

          <a
            href="#contact"
            onMouseEnter={() => setHoveredBigCta(true)}
            onMouseLeave={() => setHoveredBigCta(false)}
            style={{
              display: 'inline-block',
              background: hoveredBigCta ? '#fff' : '#ff6b00',
              color: hoveredBigCta ? '#ff6b00' : '#000',
              padding: '1.1rem 4rem',
              fontFamily: 'Inter, sans-serif', fontWeight: 800,
              fontSize: '0.85rem', letterSpacing: '0.2em',
              textTransform: 'uppercase', textDecoration: 'none',
              transition: 'background 0.18s, color 0.18s',
              borderRadius: 0,
            }}
          >דברו איתנו ←</a>
        </div>
      </section>
    </article>
  )
}
