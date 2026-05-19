import { useState } from 'react'
import VariantA from './variants/VariantA'
import VariantB from './variants/VariantB'
import VariantC from './variants/VariantC'
import VariantD from './variants/VariantD'

const VARIANTS = [
  { id: 'A', he: 'מודרני',  sub: 'Bold & Modern',    Component: VariantA },
  { id: 'B', he: 'פרמיום',  sub: 'Premium Dark',      Component: VariantB },
  { id: 'C', he: 'נקי',     sub: 'Clean & Open',      Component: VariantC },
  { id: 'D', he: 'ישראלי',  sub: 'Earthy & Human',    Component: VariantD },
]

export default function DesignShowcase() {
  const [active, setActive] = useState(0)
  const { Component } = VARIANTS[active]

  return (
    <div style={{ background: '#000', minHeight: '100dvh' }}>

      {/* ── Meta bar ── */}
      <div style={{
        position: 'fixed',
        top: 0, left: 0, right: 0,
        height: '36px',
        background: 'rgba(0,0,0,0.92)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderBottom: '1px solid rgba(255,255,255,0.07)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 1.25rem',
        zIndex: 100000,
        direction: 'rtl',
      }}>
        <span style={{
          fontFamily: 'Heebo, sans-serif',
          fontSize: '0.68rem',
          color: 'rgba(255,255,255,0.35)',
          letterSpacing: '0.02em',
        }}>בוחרים כיוון עיצובי — חמש אצבעות</span>
        <a
          href="#"
          style={{
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: '0.62rem',
            color: 'rgba(255,135,20,0.7)',
            textDecoration: 'none',
            letterSpacing: '0.04em',
            transition: 'color 0.2s',
          }}
          onMouseEnter={e => e.target.style.color = '#ff8714'}
          onMouseLeave={e => e.target.style.color = 'rgba(255,135,20,0.7)'}
        >← חזרה לאתר</a>
      </div>

      {/* ── Tab switcher pill ── */}
      <div
        role="tablist"
        aria-label="Design variants"
        style={{
          position: 'fixed',
          top: '44px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 99999,
          display: 'flex',
          gap: '0.25rem',
          background: 'rgba(0,0,0,0.85)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          padding: '0.3rem',
          borderRadius: '999px',
          border: '1px solid rgba(255,255,255,0.1)',
          direction: 'ltr',
          boxShadow: '0 8px 32px rgba(0,0,0,0.6)',
        }}
      >
        {VARIANTS.map((v, i) => (
          <button
            key={v.id}
            role="tab"
            aria-selected={active === i}
            onClick={() => setActive(i)}
            style={{
              padding: '0.35rem 1rem',
              borderRadius: '999px',
              border: 'none',
              cursor: 'pointer',
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: '0.65rem',
              fontWeight: 500,
              transition: 'background 0.22s ease, color 0.22s ease',
              background: active === i ? '#ff8714' : 'transparent',
              color: active === i ? '#000' : 'rgba(255,255,255,0.45)',
              letterSpacing: '0.04em',
              whiteSpace: 'nowrap',
            }}
          >
            {v.id} · {v.he}
          </button>
        ))}
      </div>

      {/* ── Active variant — key forces full remount on tab switch ── */}
      <Component key={active} />
    </div>
  )
}
