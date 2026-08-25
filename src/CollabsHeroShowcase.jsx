import { useState } from 'react'
import HeroCorporateSplit from './components/collabs/hero-versions/HeroCorporateSplit'
import HeroDataBoardroom from './components/collabs/hero-versions/HeroDataBoardroom'
import HeroEditorialLedger from './components/collabs/hero-versions/HeroEditorialLedger'
import HeroCapabilityBento from './components/collabs/hero-versions/HeroCapabilityBento'

/**
 * #collabs-hero — a standalone preview of B2B-focused hero directions for the
 * שיתופי פעולה page. Each version deliberately breaks from the homepage's
 * cinematic dark slideshow and leans into professional / enterprise cues:
 * credibility (partner proof), data (stats), restraint (editorial), and
 * offering-at-a-glance (bento). Mirrors the HeroConcepts switcher pattern.
 */
const VERSIONS = [
  {
    id: 1, he: 'פיצול תאגידי', en: 'Corporate Split',
    note: 'כותרת ערך + תמונת הוכחה עם צ׳יפ נתון, ורצועת לוגואים של שותפים מתחת. הקלאסיקה של B2B - אמינות במבט ראשון.',
    tone: 'בהיר · אמון',
    Component: HeroCorporateSplit,
  },
  {
    id: 2, he: 'חדר הישיבות', en: 'Data Boardroom',
    note: 'נייבי מלא (ללא סליידשואו), רשת נתונים ב־4 כרטיסי זכוכית ורצועת שותפים. אנטרפרייז, ממוקד־מספרים.',
    tone: 'כהה · דאטה',
    Component: HeroDataBoardroom,
  },
  {
    id: 3, he: 'עמוד השער', en: 'Editorial Ledger',
    note: 'שורת מטא-דאטה בקווי שיער, כותרת ענקית ותמונה מסוגרת אחת. שקט, יוקרתי - כמו שער של מסמך ייעוץ.',
    tone: 'בהיר · מינימלי',
    Component: HeroEditorialLedger,
  },
  {
    id: 4, he: 'רשת היכולות', en: 'Capability Bento',
    note: 'כל ההצעה במבט אחד: שלושת עולמות התוכן, תמונת הוכחה וכרטיס נתון - רשת בנטו לסורק B2B.',
    tone: 'בהיר · קטלוגי',
    Component: HeroCapabilityBento,
  },
]

export default function CollabsHeroShowcase() {
  const [active, setActive] = useState(0)
  const version = VERSIONS[active]
  const { Component } = version

  // Contact CTA is a no-op preview stub here.
  const onRegister = () => {}

  return (
    <div style={{ background: '#0d1b4b', minHeight: '100dvh', position: 'relative' }}>
      {/* ── Floating version switcher ── */}
      <div
        role="tablist"
        aria-label="B2B hero versions"
        style={{
          position: 'fixed', top: '1rem', left: '50%', transform: 'translateX(-50%)',
          zIndex: 99999, display: 'flex', gap: '0.3rem', flexWrap: 'wrap', justifyContent: 'center',
          maxWidth: 'calc(100vw - 1.5rem)',
          background: 'rgba(8,16,40,0.85)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
          padding: '0.3rem', borderRadius: '999px', border: '1px solid rgba(255,255,255,0.12)',
          direction: 'ltr', boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
        }}
      >
        {VERSIONS.map((v, i) => (
          <button
            key={v.id}
            role="tab"
            aria-selected={active === i}
            onClick={() => setActive(i)}
            style={{
              padding: '0.32rem 0.9rem', borderRadius: '999px', border: 'none', cursor: 'pointer',
              fontFamily: 'JetBrains Mono, monospace', fontSize: '0.68rem', fontWeight: 500,
              transition: 'background 0.22s ease, color 0.22s ease',
              background: active === i ? '#ff8714' : 'transparent',
              color: active === i ? '#000' : 'rgba(255,255,255,0.55)',
              letterSpacing: '0.02em', whiteSpace: 'nowrap',
            }}
          >
            {v.id} · {v.he}
          </button>
        ))}
      </div>

      {/* ── Active version — key forces full remount (replays intro) ── */}
      <Component key={active} onRegister={onRegister} />

      {/* ── Info chip ── */}
      <div
        dir="rtl"
        style={{
          position: 'fixed', bottom: '1rem', left: '1rem', zIndex: 99999, maxWidth: '20rem',
          background: 'rgba(8,16,40,0.85)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
          padding: '0.85rem 1rem', borderRadius: '14px', border: '1px solid rgba(255,255,255,0.12)',
          boxShadow: '0 8px 32px rgba(0,0,0,0.5)', pointerEvents: 'none',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem', flexWrap: 'wrap' }}>
          <span style={{ color: '#ff8714', fontFamily: 'JetBrains Mono, monospace', fontSize: '0.7rem', fontWeight: 700 }}>
            {String(version.id).padStart(2, '0')}
          </span>
          <span style={{ color: '#fff', fontFamily: 'Heebo, sans-serif', fontWeight: 700, fontSize: '0.95rem' }}>
            {version.he}
          </span>
          <span style={{ color: 'rgba(255,255,255,0.4)', fontFamily: 'JetBrains Mono, monospace', fontSize: '0.62rem' }}>
            {version.en}
          </span>
        </div>
        <p style={{ margin: '0.4rem 0 0.55rem', color: 'rgba(255,255,255,0.75)', fontFamily: 'Heebo, sans-serif', fontSize: '0.8rem', lineHeight: 1.45 }}>
          {version.note}
        </p>
        <div style={{ color: 'rgba(255,255,255,0.5)', fontFamily: 'Heebo, sans-serif', fontSize: '0.72rem' }}>
          <span style={{ color: 'rgba(255,135,20,0.85)' }}>אופי -</span> {version.tone}
        </div>
      </div>
    </div>
  )
}
