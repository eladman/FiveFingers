import { useState } from 'react'
import HeroV1Monument from './components/showcase/HeroV1Monument'
import HeroV2Arena    from './components/showcase/HeroV2Arena'
import HeroV3Fingers  from './components/showcase/HeroV3Fingers'
import HeroV4Manifesto from './components/showcase/HeroV4Manifesto'

const DESIGNS = [
  { id: 1, he: 'אלכסוני',       en: 'Diagonal Split',    Component: HeroV1Monument  },
  { id: 2, he: 'תריסים',        en: 'Kinetic Blinds',    Component: HeroV2Arena     },
  { id: 3, he: 'טריפטיך',       en: 'Triptych',          Component: HeroV3Fingers   },
  { id: 4, he: 'לוח בקרה',      en: 'Mission HUD',       Component: HeroV4Manifesto },
]

export default function HeroShowcase() {
  const [active, setActive] = useState(0)
  const { Component } = DESIGNS[active]

  return (
    <div style={{ background: '#000', minHeight: '100dvh' }}>

      {/* ── Floating design switcher ── */}
      <div
        role="tablist"
        aria-label="Hero design variants"
        style={{
          position: 'fixed',
          top: '1rem',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 99999,
          display: 'flex',
          gap: '0.3rem',
          background: 'rgba(0,0,0,0.82)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          padding: '0.3rem',
          borderRadius: '999px',
          border: '1px solid rgba(255,255,255,0.1)',
          direction: 'ltr',
          boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
        }}
      >
        {DESIGNS.map((d, i) => (
          <button
            key={d.id}
            role="tab"
            aria-selected={active === i}
            onClick={() => setActive(i)}
            style={{
              padding: '0.32rem 0.9rem',
              borderRadius: '999px',
              border: 'none',
              cursor: 'pointer',
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: '0.68rem',
              fontWeight: 500,
              transition: 'background 0.22s ease, color 0.22s ease',
              background: active === i ? '#ff8714' : 'transparent',
              color: active === i ? '#000' : 'rgba(255,255,255,0.5)',
              letterSpacing: '0.02em',
              whiteSpace: 'nowrap',
            }}
          >
            {d.id} · {d.he}
          </button>
        ))}
      </div>

      {/* ── Active design — key forces full remount on switch ── */}
      <Component key={active} />
    </div>
  )
}
