/**
 * Variant B — "פרמיום" · Premium Dark
 * Vibe: luxury / editorial magazine / high-end
 * Palette: near-black · gold/amber · cream
 * Type: Heebo bold · refined tracking
 */

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'

const PROGRAMS = [
  { id: '01', he: 'הליבה', en: 'Core', age: '12–18', desc: 'מסגרת חינוכית לא-פורמלית, ~8 מפגשים בחודש לבניית זהות ומנהיגות.' },
  { id: '02', he: 'אקדמיה', en: 'Academy', age: '18–20', desc: 'שנת הכנה טרום-צבאית — פיתוח גוף, מנטליות ומנהיגות אמיתית.' },
  { id: '03', he: 'בוגרים', en: 'Alumni', age: '21+', desc: 'מנהיגים לאחר שירות שמניעים שינוי חברתי בתפקידים מרכזיים.' },
]

const GOLD = '#c9a84c'
const CREAM = '#f0e8d5'
const BG = '#080808'

export default function VariantB() {
  const ref = useRef(null)
  const [hovered, setHovered] = useState(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.vb-eyebrow', { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out', delay: 0.2 })
      gsap.fromTo('.vb-title', { opacity: 0, y: 50 }, { opacity: 1, y: 0, stagger: 0.12, duration: 1.2, ease: 'expo.out', delay: 0.4 })
      gsap.fromTo('.vb-divider', { scaleX: 0, opacity: 0 }, { scaleX: 1, opacity: 1, duration: 1.1, ease: 'expo.out', delay: 0.9 })
      gsap.fromTo('.vb-sub', { opacity: 0, y: 16 }, { opacity: 1, y: 0, stagger: 0.1, duration: 0.9, ease: 'power3.out', delay: 1.05 })
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <article dir="rtl" ref={ref} style={{ background: BG, color: CREAM, paddingTop: '80px' }}>

      {/* HERO */}
      <section style={{
        position: 'relative',
        minHeight: 'calc(100dvh - 80px)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        overflow: 'hidden',
      }}>
        <img src="/Hero-Pics/214A0088.jpg" alt="" style={{
          position: 'absolute', inset: 0,
          width: '100%', height: '100%',
          objectFit: 'cover', objectPosition: 'center 25%',
          filter: 'brightness(0.18) contrast(1.1) saturate(0.6)',
        }} />
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(135deg, rgba(201,168,76,0.07) 0%, transparent 60%)',
          pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute',
          top: '15%', bottom: '15%', right: 0,
          width: '1px',
          background: `linear-gradient(to bottom, transparent, ${GOLD}, transparent)`,
          zIndex: 5,
        }} />

        <div style={{ position: 'relative', zIndex: 10, padding: 'clamp(2rem, 6vw, 6rem)', maxWidth: '900px' }}>
          <div className="vb-eyebrow" style={{
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: 'clamp(0.5rem, 0.9vw, 0.62rem)',
            letterSpacing: '0.45em', color: GOLD,
            textTransform: 'uppercase', marginBottom: '2.5rem',
          }}>✦  תנועת חמש אצבעות · ישראל · 2014</div>

          <h1 style={{ margin: 0, lineHeight: 1 }}>
            <span className="vb-title" style={{
              display: 'block',
              fontFamily: 'Heebo, sans-serif', fontWeight: 300,
              fontSize: 'clamp(1rem, 2.5vw, 1.6rem)',
              letterSpacing: '0.5em', color: CREAM,
              textTransform: 'uppercase', marginBottom: '1rem',
            }}>תנועת</span>
            <span className="vb-title" style={{
              display: 'block',
              fontFamily: 'Heebo, sans-serif', fontWeight: 800,
              fontSize: 'clamp(4.5rem, 12vw, 12rem)',
              letterSpacing: '-0.03em', color: '#ffffff', lineHeight: 0.9,
            }}>חמש</span>
            <span className="vb-title" style={{
              display: 'block',
              fontFamily: 'Heebo, sans-serif', fontWeight: 800,
              fontSize: 'clamp(4.5rem, 12vw, 12rem)',
              letterSpacing: '-0.03em', color: GOLD, lineHeight: 0.9,
            }}>אצבעות</span>
          </h1>

          <div className="vb-divider" style={{
            display: 'flex', alignItems: 'center', gap: '1.5rem',
            margin: '2.5rem 0', transformOrigin: 'right',
          }}>
            <div style={{ width: '80px', height: '1px', background: GOLD }} />
            <span style={{
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: '0.55rem', letterSpacing: '0.35em',
              color: `${GOLD}99`, textTransform: 'uppercase',
            }}>חינוך למצוינות ערכית</span>
            <div style={{ width: '80px', height: '1px', background: GOLD }} />
          </div>

          <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
            <a href="#contact" className="vb-sub" style={{
              display: 'inline-block',
              border: `1px solid ${GOLD}`, color: GOLD,
              padding: '0.85rem 2.6rem',
              fontFamily: 'Heebo, sans-serif', fontWeight: 600,
              fontSize: '0.82rem', letterSpacing: '0.15em',
              textTransform: 'uppercase', textDecoration: 'none',
              transition: 'background 0.25s, color 0.25s',
            }}
              onMouseEnter={e => { e.currentTarget.style.background = GOLD; e.currentTarget.style.color = BG }}
              onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = GOLD }}
            >הצטרפו עכשיו</a>
            <span className="vb-sub" style={{
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: '0.62rem', letterSpacing: '0.25em',
              color: 'rgba(240,232,213,0.3)',
            }}>3,000+ חניכים ברחבי ישראל</span>
          </div>
        </div>

        <div style={{ position: 'absolute', bottom: '2rem', left: '2rem', zIndex: 10, borderLeft: `1px solid ${GOLD}40`, paddingLeft: '1rem' }}>
          <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.5rem', letterSpacing: '0.3em', color: `${GOLD}55`, textTransform: 'uppercase', lineHeight: 2 }}>
            <div>מסוגלות</div><div>שייכות</div><div>השפעה</div>
          </div>
        </div>
      </section>

      {/* PROGRAMS */}
      <section style={{ padding: 'clamp(5rem, 10vh, 9rem) clamp(2rem, 6vw, 6rem)', borderTop: `1px solid ${GOLD}20` }}>
        <div style={{ marginBottom: '4rem' }}>
          <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.55rem', letterSpacing: '0.45em', color: `${GOLD}70`, textTransform: 'uppercase', marginBottom: '1rem' }}>תכניות</div>
          <h2 style={{ fontFamily: 'Heebo, sans-serif', fontWeight: 700, fontSize: 'clamp(2rem, 5vw, 4.5rem)', letterSpacing: '-0.02em', margin: 0, color: CREAM }}>מסלולי הצמיחה</h2>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {PROGRAMS.map((p, i) => (
            <div key={p.id} onMouseEnter={() => setHovered(i)} onMouseLeave={() => setHovered(null)} style={{
              display: 'grid', gridTemplateColumns: '3rem 1fr auto', gap: '2rem', alignItems: 'center',
              padding: 'clamp(1.5rem, 3vh, 2.5rem) 0',
              borderTop: `1px solid ${GOLD}${hovered === i ? '60' : '18'}`,
              transition: 'border-color 0.3s', cursor: 'default',
            }}>
              <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.55rem', letterSpacing: '0.3em', color: hovered === i ? GOLD : `${GOLD}40`, transition: 'color 0.3s' }}>{p.id}</div>
              <div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '1.2rem' }}>
                  <h3 style={{ fontFamily: 'Heebo, sans-serif', fontWeight: 700, fontSize: 'clamp(1.5rem, 3.5vw, 3rem)', letterSpacing: '-0.02em', margin: 0, color: hovered === i ? '#fff' : CREAM, transition: 'color 0.3s' }}>{p.he}</h3>
                  <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.6rem', letterSpacing: '0.2em', color: `${CREAM}40`, textTransform: 'uppercase' }}>{p.en}</span>
                </div>
                <p style={{ fontFamily: 'Heebo, sans-serif', fontWeight: 300, fontSize: 'clamp(0.85rem, 1.2vw, 1rem)', color: hovered === i ? `${CREAM}80` : `${CREAM}45`, margin: '0.5rem 0 0', lineHeight: 1.7, maxWidth: '520px', transition: 'color 0.3s' }}>{p.desc}</p>
              </div>
              <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.6rem', letterSpacing: '0.2em', color: hovered === i ? GOLD : `${GOLD}35`, whiteSpace: 'nowrap', transition: 'color 0.3s' }}>גיל {p.age}</div>
            </div>
          ))}
          <div style={{ borderTop: `1px solid ${GOLD}18` }} />
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: 'clamp(6rem, 14vh, 12rem) clamp(2rem, 6vw, 6rem)', textAlign: 'center', position: 'relative', overflow: 'hidden', borderTop: `1px solid ${GOLD}15` }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at center, rgba(201,168,76,0.07) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.55rem', letterSpacing: '0.45em', color: `${GOLD}70`, textTransform: 'uppercase', marginBottom: '2rem' }}>✦  הזמן לפעול</div>
          <h2 style={{ fontFamily: 'Heebo, sans-serif', fontWeight: 700, fontSize: 'clamp(2.5rem, 8vw, 8rem)', letterSpacing: '-0.03em', lineHeight: 0.9, color: CREAM, margin: '0 0 1rem' }}>
            מוכנים<br /><span style={{ color: GOLD }}>להצטרף?</span>
          </h2>
          <p style={{ fontFamily: 'Heebo, sans-serif', fontWeight: 300, fontSize: 'clamp(0.9rem, 1.5vw, 1.1rem)', color: `${CREAM}55`, margin: '0 auto 3rem', maxWidth: '480px', lineHeight: 1.8 }}>
            תנועה שמאמינה שכל צעיר/ה יכולים/ות להיות האדם שמשנה את המציאות.
          </p>
          <a href="#contact" style={{
            display: 'inline-block', border: `1px solid ${GOLD}`, color: GOLD,
            padding: '1rem 3.5rem', fontFamily: 'Heebo, sans-serif', fontWeight: 600,
            fontSize: '0.85rem', letterSpacing: '0.15em', textTransform: 'uppercase', textDecoration: 'none',
            transition: 'background 0.25s, color 0.25s',
          }}
            onMouseEnter={e => { e.currentTarget.style.background = GOLD; e.currentTarget.style.color = BG }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = GOLD }}
          >דברו איתנו</a>
        </div>
      </section>
    </article>
  )
}
