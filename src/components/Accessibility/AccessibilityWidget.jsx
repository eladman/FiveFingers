import { useState, useEffect, useRef, useCallback } from 'react'
import { createPortal } from 'react-dom'
import useAccessibility from '../../hooks/useAccessibility'
import AccessibilityStatement from './AccessibilityStatement'

/* ── Inline SVG icons ─────────────────────────────────────────── */
const AccessibilityIcon = ({ size = 28, color = 'white' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color} xmlns="http://www.w3.org/2000/svg">
    {/* Universal accessibility: person with outstretched arms in a circle */}
    <circle cx="12" cy="4.5" r="2" />
    <path d="M12 7.5c-1.5 0-4.5.5-5.5 1l.5 2c1-.4 3-.7 4-.7v3l-2.5 5.5 1.8.8L12 14.5l1.7 4.6 1.8-.8L13 12.8v-3c1 0 3 .3 4 .7l.5-2c-1-.5-4-1-5.5-1z" />
  </svg>
)

/* ── Feature definitions ──────────────────────────────────────── */
const FONT_SIZE_LABELS = ['רגיל', 'גדול', 'גדול מאוד', 'ענק']

const SECTIONS = [
  {
    title: 'תצוגה',
    features: [
      { key: 'lineHeight', label: 'ריווח בין שורות', icon: '↕' },
      { key: 'letterSpacing', label: 'ריווח בין אותיות', icon: '↔' },
      { key: 'readableFont', label: 'גופן קריא', icon: 'Aa' },
    ],
  },
  {
    title: 'צבע וניגודיות',
    features: [
      { key: 'highContrast', label: 'ניגודיות גבוהה', icon: '◑' },
      { key: 'invertColors', label: 'היפוך צבעים', icon: '🔄' },
      { key: 'grayscale', label: 'גווני אפור', icon: '◐' },
      { key: 'lightBackground', label: 'רקע בהיר', icon: '☀' },
      { key: 'highlightLinks', label: 'הדגשת קישורים', icon: '🔗' },
    ],
  },
  {
    title: 'ניווט ושימושיות',
    features: [
      { key: 'focusHighlight', label: 'הדגשת פוקוס', icon: '◻' },
      { key: 'stopAnimations', label: 'עצור אנימציות', icon: '⏸' },
      { key: 'highlightHeadings', label: 'הדגשת כותרות', icon: 'H' },
      { key: 'bigCursor', label: 'סמן גדול', icon: '↗' },
    ],
  },
]

/* ── Toggle button for a single feature ───────────────────────── */
function FeatureToggle({ icon, label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        width: '100%',
        padding: '10px 12px',
        border: 'none',
        borderRadius: '8px',
        cursor: 'pointer',
        textAlign: 'right',
        fontSize: '14px',
        fontFamily: "'Heebo', Arial, sans-serif",
        lineHeight: '1.4',
        backgroundColor: active ? '#E3F2FD' : '#f5f5f5',
        color: active ? '#1565C0' : '#333',
        fontWeight: active ? 600 : 400,
        transition: 'background-color 0.15s ease, color 0.15s ease',
      }}
    >
      <span style={{ fontSize: '18px', width: '24px', textAlign: 'center', flexShrink: 0 }}>{icon}</span>
      <span style={{ flex: 1 }}>{label}</span>
      <span style={{
        width: '36px',
        height: '20px',
        borderRadius: '10px',
        backgroundColor: active ? '#1565C0' : '#ccc',
        position: 'relative',
        flexShrink: 0,
        transition: 'background-color 0.15s ease',
      }}>
        <span style={{
          position: 'absolute',
          top: '2px',
          right: active ? '2px' : '16px',
          width: '16px',
          height: '16px',
          borderRadius: '50%',
          backgroundColor: '#fff',
          transition: 'right 0.15s ease',
          boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
        }} />
      </span>
    </button>
  )
}

/* ── Font size selector ───────────────────────────────────────── */
function FontSizeControl({ value, onChange }) {
  return (
    <div style={{ padding: '10px 12px' }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        marginBottom: '8px',
        fontSize: '14px',
        fontFamily: "'Heebo', Arial, sans-serif",
        color: '#333',
      }}>
        <span style={{ fontSize: '18px', width: '24px', textAlign: 'center' }}>א</span>
        <span style={{ flex: 1 }}>הגדלת טקסט</span>
      </div>
      <div style={{ display: 'flex', gap: '6px' }}>
        {FONT_SIZE_LABELS.map((label, i) => (
          <button
            key={i}
            onClick={() => onChange(i)}
            style={{
              flex: 1,
              padding: '6px 4px',
              border: '2px solid',
              borderColor: value === i ? '#1565C0' : '#ddd',
              borderRadius: '6px',
              backgroundColor: value === i ? '#E3F2FD' : '#fff',
              color: value === i ? '#1565C0' : '#555',
              fontWeight: value === i ? 600 : 400,
              fontSize: '12px',
              fontFamily: "'Heebo', Arial, sans-serif",
              cursor: 'pointer',
              transition: 'all 0.15s ease',
            }}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  )
}

/* ── Main widget ──────────────────────────────────────────────── */
export default function AccessibilityWidget() {
  const { settings, updateSetting, resetSettings } = useAccessibility()
  const [isOpen, setIsOpen] = useState(false)
  const [statementOpen, setStatementOpen] = useState(false)
  const panelRef = useRef(null)
  const triggerRef = useRef(null)

  // Click outside to close
  useEffect(() => {
    if (!isOpen) return
    const handler = (e) => {
      if (
        panelRef.current && !panelRef.current.contains(e.target) &&
        triggerRef.current && !triggerRef.current.contains(e.target)
      ) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [isOpen])

  // Escape to close
  useEffect(() => {
    if (!isOpen) return
    const handler = (e) => { if (e.key === 'Escape') setIsOpen(false) }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [isOpen])

  // Focus trap
  useEffect(() => {
    if (!isOpen || !panelRef.current) return
    const panel = panelRef.current
    const focusable = panel.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])')
    if (focusable.length === 0) return

    const first = focusable[0]
    const last = focusable[focusable.length - 1]
    first.focus()

    const trap = (e) => {
      if (e.key !== 'Tab') return
      if (e.shiftKey) {
        if (document.activeElement === first) { e.preventDefault(); last.focus() }
      } else {
        if (document.activeElement === last) { e.preventDefault(); first.focus() }
      }
    }
    panel.addEventListener('keydown', trap)
    return () => panel.removeEventListener('keydown', trap)
  }, [isOpen])

  const toggle = useCallback(() => setIsOpen(prev => !prev), [])

  // Compensating filter for the widget when invert/grayscale is active
  let compensateFilter = 'none'
  if (settings.invertColors && settings.grayscale) {
    compensateFilter = 'invert(1) hue-rotate(180deg) grayscale(1)'
  } else if (settings.invertColors) {
    compensateFilter = 'invert(1) hue-rotate(180deg)'
  } else if (settings.grayscale) {
    // Can't fully cancel parent grayscale, but widget is outside #root so unaffected
    compensateFilter = 'none'
  }

  return createPortal(
    <>
      {/* Trigger button */}
      <button
        ref={triggerRef}
        onClick={toggle}
        aria-label="פתח תפריט נגישות"
        aria-expanded={isOpen}
        style={{
          position: 'fixed',
          bottom: '24px',
          left: '24px',
          zIndex: 10000,
          width: '52px',
          height: '52px',
          borderRadius: '50%',
          backgroundColor: '#1565C0',
          border: 'none',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 16px rgba(0,0,0,0.25)',
          transition: 'transform 0.2s ease, box-shadow 0.2s ease, background-color 0.2s ease',
        }}
        onMouseEnter={e => {
          e.currentTarget.style.transform = 'scale(1.05)'
          e.currentTarget.style.backgroundColor = '#0D47A1'
          e.currentTarget.style.boxShadow = '0 6px 24px rgba(0,0,0,0.32)'
        }}
        onMouseLeave={e => {
          e.currentTarget.style.transform = 'scale(1)'
          e.currentTarget.style.backgroundColor = '#1565C0'
          e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.25)'
        }}
        onFocus={e => { e.currentTarget.style.outline = '3px solid #FFD600'; e.currentTarget.style.outlineOffset = '3px' }}
        onBlur={e => { e.currentTarget.style.outline = 'none' }}
      >
        <AccessibilityIcon />
      </button>

      {/* Panel */}
      <div
        ref={panelRef}
        dir="rtl"
        role="dialog"
        aria-label="תפריט נגישות"
        aria-modal="true"
        style={{
          position: 'fixed',
          bottom: '88px',
          left: '24px',
          zIndex: 10000,
          width: '320px',
          maxHeight: '80vh',
          overflowY: 'auto',
          backgroundColor: '#fff',
          borderRadius: '16px',
          boxShadow: '0 12px 40px rgba(0,0,0,0.2)',
          fontFamily: "'Heebo', Arial, sans-serif",
          fontSize: '16px',
          lineHeight: '1.5',
          letterSpacing: 'normal',
          color: '#1a1a1a',
          filter: compensateFilter,
          transform: isOpen ? 'translateY(0)' : 'translateY(16px)',
          opacity: isOpen ? 1 : 0,
          pointerEvents: isOpen ? 'auto' : 'none',
          transition: 'transform 0.2s ease, opacity 0.2s ease',
        }}
      >
        {/* Header */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '16px 20px',
          borderBottom: '1px solid #eee',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <AccessibilityIcon size={22} color="#1565C0" />
            <span style={{ fontSize: '17px', fontWeight: 700, color: '#1a1a1a' }}>אפשרויות נגישות</span>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            aria-label="סגור תפריט נגישות"
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '4px',
              fontSize: '20px',
              color: '#666',
              lineHeight: 1,
            }}
          >
            ✕
          </button>
        </div>

        {/* Font size control */}
        <FontSizeControl
          value={settings.fontSize}
          onChange={(v) => updateSetting('fontSize', v)}
        />

        <div style={{ height: '1px', backgroundColor: '#eee', margin: '4px 20px' }} />

        {/* Feature sections */}
        {SECTIONS.map((section, si) => (
          <div key={si}>
            <div style={{
              padding: '10px 20px 4px',
              fontSize: '13px',
              fontWeight: 600,
              color: '#888',
              fontFamily: "'Heebo', Arial, sans-serif",
            }}>
              {section.title}
            </div>
            <div style={{ padding: '0 8px 4px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
              {section.features.map((f) => (
                <FeatureToggle
                  key={f.key}
                  icon={f.icon}
                  label={f.label}
                  active={!!settings[f.key]}
                  onClick={() => updateSetting(f.key, !settings[f.key])}
                />
              ))}
            </div>
            {si < SECTIONS.length - 1 && (
              <div style={{ height: '1px', backgroundColor: '#eee', margin: '4px 20px' }} />
            )}
          </div>
        ))}

        {/* Footer */}
        <div style={{ padding: '12px 20px 16px', borderTop: '1px solid #eee', marginTop: '4px' }}>
          <button
            onClick={() => { resetSettings(); setIsOpen(false) }}
            style={{
              width: '100%',
              padding: '10px',
              border: '2px solid #1565C0',
              borderRadius: '8px',
              backgroundColor: 'transparent',
              color: '#1565C0',
              fontSize: '14px',
              fontWeight: 600,
              fontFamily: "'Heebo', Arial, sans-serif",
              cursor: 'pointer',
              marginBottom: '8px',
              transition: 'background-color 0.15s ease',
            }}
            onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#E3F2FD' }}
            onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'transparent' }}
          >
            איפוס הגדרות
          </button>
          <button
            onClick={() => setStatementOpen(true)}
            style={{
              width: '100%',
              padding: '6px',
              border: 'none',
              background: 'none',
              color: '#1565C0',
              fontSize: '13px',
              fontFamily: "'Heebo', Arial, sans-serif",
              cursor: 'pointer',
              textDecoration: 'underline',
            }}
          >
            הצהרת נגישות
          </button>
        </div>
      </div>

      {/* Accessibility Statement Modal */}
      <AccessibilityStatement
        isOpen={statementOpen}
        onClose={() => setStatementOpen(false)}
      />
    </>,
    document.body
  )
}
