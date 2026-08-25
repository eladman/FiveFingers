import { useState } from 'react'
import ConceptEditorialSplit from './components/hero-concepts/ConceptEditorialSplit'
import ConceptOversizedType from './components/hero-concepts/ConceptOversizedType'
import ConceptBentoMosaic from './components/hero-concepts/ConceptBentoMosaic'
import ConceptSpotlightArena from './components/hero-concepts/ConceptSpotlightArena'
import ConceptFramedPlate from './components/hero-concepts/ConceptFramedPlate'

/**
 * #hero-concepts — a standalone preview of distinct, interchangeable hero
 * templates for the inner pages. The homepage hero stays as the reference.
 * Mirrors the HeroShowcase pattern: a floating tab switcher swaps full-bleed
 * concepts, each remounted via `key` so its intro animation replays.
 */
const CONCEPTS = [
  { id: 1, he: 'פיצול עורכי', en: 'Editorial Split', suits: 'הליבה · שיתופי פעולה',
    note: 'תמונה לצד פאנל נייבי עם הכותרת - כמו שער מגזין.', Component: ConceptEditorialSplit },
  { id: 2, he: 'טיפוגרפיה ענקית', en: 'Oversized Type', suits: 'עמוד הצהרה · בוגרים',
    note: 'מילה ענקית שהתמונה מבצבצת מתוך האותיות.', Component: ConceptOversizedType },
  { id: 3, he: 'בנטו', en: 'Bento Mosaic', suits: 'שיתופי פעולה · עמודי תוכניות',
    note: 'רשת אריחים - טקסט, תמונות ונתון, הכל במבט אחד.', Component: ConceptBentoMosaic },
  { id: 4, he: 'זרקור', en: 'Spotlight Arena', suits: 'הליבה · מכינה',
    note: 'במה כהה, תמונה אחת מוארת בזרקור - האדם בזירה.', Component: ConceptSpotlightArena },
  { id: 5, he: 'לוח ממוסגר', en: 'Framed Plate', suits: 'מכינה · בוגרים',
    note: 'לוח תמונה ממוסגר מעל טקסט מרכזי - שקט ויוקרתי.', Component: ConceptFramedPlate },
]

export default function HeroConcepts() {
  const [active, setActive] = useState(0)
  const concept = CONCEPTS[active]
  const { Component } = concept

  return (
    <div style={{ background: '#000', minHeight: '100dvh', position: 'relative' }}>
      {/* ── Floating concept switcher ── */}
      <div
        role="tablist"
        aria-label="Hero concept templates"
        style={{
          position: 'fixed', top: '1rem', left: '50%', transform: 'translateX(-50%)',
          zIndex: 99999, display: 'flex', gap: '0.3rem', flexWrap: 'wrap', justifyContent: 'center',
          maxWidth: 'calc(100vw - 1.5rem)',
          background: 'rgba(0,0,0,0.82)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
          padding: '0.3rem', borderRadius: '999px', border: '1px solid rgba(255,255,255,0.1)',
          direction: 'ltr', boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
        }}
      >
        {CONCEPTS.map((c, i) => (
          <button
            key={c.id}
            role="tab"
            aria-selected={active === i}
            onClick={() => setActive(i)}
            style={{
              padding: '0.32rem 0.9rem', borderRadius: '999px', border: 'none', cursor: 'pointer',
              fontFamily: 'JetBrains Mono, monospace', fontSize: '0.68rem', fontWeight: 500,
              transition: 'background 0.22s ease, color 0.22s ease',
              background: active === i ? '#ff8714' : 'transparent',
              color: active === i ? '#000' : 'rgba(255,255,255,0.5)',
              letterSpacing: '0.02em', whiteSpace: 'nowrap',
            }}
          >
            {c.id} · {c.he}
          </button>
        ))}
      </div>

      {/* ── Active concept — key forces full remount (replays intro) ── */}
      <Component key={active} />

      {/* ── Info chip — explains the active concept + suggested pages ── */}
      <div
        dir="rtl"
        style={{
          position: 'fixed', bottom: '1rem', left: '1rem', zIndex: 99999, maxWidth: '20rem',
          background: 'rgba(0,0,0,0.82)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
          padding: '0.85rem 1rem', borderRadius: '14px', border: '1px solid rgba(255,255,255,0.12)',
          boxShadow: '0 8px 32px rgba(0,0,0,0.5)', pointerEvents: 'none',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem' }}>
          <span style={{ color: '#ff8714', fontFamily: 'JetBrains Mono, monospace', fontSize: '0.7rem', fontWeight: 700 }}>
            {String(concept.id).padStart(2, '0')}
          </span>
          <span style={{ color: '#fff', fontFamily: 'Heebo, sans-serif', fontWeight: 700, fontSize: '0.95rem' }}>
            {concept.he}
          </span>
          <span style={{ color: 'rgba(255,255,255,0.4)', fontFamily: 'JetBrains Mono, monospace', fontSize: '0.62rem' }}>
            {concept.en}
          </span>
        </div>
        <p style={{ margin: '0.4rem 0 0.55rem', color: 'rgba(255,255,255,0.75)', fontFamily: 'Heebo, sans-serif', fontSize: '0.8rem', lineHeight: 1.45 }}>
          {concept.note}
        </p>
        <div style={{ color: 'rgba(255,255,255,0.5)', fontFamily: 'Heebo, sans-serif', fontSize: '0.72rem' }}>
          <span style={{ color: 'rgba(255,135,20,0.85)' }}>מתאים ל־</span> {concept.suits}
        </div>
      </div>
    </div>
  )
}
