/* ===========================================================================
   Accessibility widget — ported 1:1 from the Five Fingers site
   (src/hooks/useAccessibility.js + src/components/Accessibility/*)
   Adapted only to run without a bundler: imports → window globals,
   GSAP pause skipped (no GSAP here; stop-animations is handled by CSS).
   =========================================================================== */
const { useState, useEffect, useRef, useCallback } = React;
const { createPortal } = ReactDOM;

/* ── useAccessibility hook ───────────────────────────────────── */
const A11Y_STORAGE_KEY = 'a11y-settings';

const A11Y_DEFAULT_SETTINGS = {
  fontSize: 0,
  lineHeight: false,
  letterSpacing: false,
  readableFont: false,
  highContrast: false,
  invertColors: false,
  grayscale: false,
  lightBackground: false,
  highlightLinks: false,
  focusHighlight: false,
  stopAnimations: false,
  highlightHeadings: false,
  bigCursor: false,
};

const A11Y_FONT_SIZE_VALUES = ['', '125%', '150%', '175%'];

const A11Y_CLASS_MAP = {
  lineHeight: 'a11y-line-height',
  letterSpacing: 'a11y-letter-spacing',
  readableFont: 'a11y-readable-font',
  highContrast: 'a11y-high-contrast',
  invertColors: 'a11y-invert',
  grayscale: 'a11y-grayscale',
  lightBackground: 'a11y-light-bg',
  highlightLinks: 'a11y-highlight-links',
  focusHighlight: 'a11y-focus-highlight',
  stopAnimations: 'a11y-stop-animations',
  highlightHeadings: 'a11y-highlight-headings',
  bigCursor: 'a11y-big-cursor',
};

function a11yApplySettings(settings) {
  const html = document.documentElement;
  const body = document.body;

  html.style.fontSize = A11Y_FONT_SIZE_VALUES[settings.fontSize] || '';

  const htmlClasses = ['highContrast', 'invertColors', 'grayscale', 'lightBackground', 'bigCursor', 'stopAnimations'];
  const bodyClasses = ['lineHeight', 'letterSpacing', 'readableFont', 'highlightLinks', 'focusHighlight', 'highlightHeadings'];

  htmlClasses.forEach(key => {
    html.classList.toggle(A11Y_CLASS_MAP[key], !!settings[key]);
  });

  bodyClasses.forEach(key => {
    body.classList.toggle(A11Y_CLASS_MAP[key], !!settings[key]);
  });
}

function a11yLoadSettings() {
  try {
    const stored = localStorage.getItem(A11Y_STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      return { ...A11Y_DEFAULT_SETTINGS, ...parsed };
    }
  } catch {
    // ignore corrupt data
  }
  return { ...A11Y_DEFAULT_SETTINGS };
}

function useAccessibility() {
  const [settings, setSettings] = useState(a11yLoadSettings);

  useEffect(() => {
    a11yApplySettings(settings);
    localStorage.setItem(A11Y_STORAGE_KEY, JSON.stringify(settings));
  }, [settings]);

  const updateSetting = useCallback((key, value) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  }, []);

  const resetSettings = useCallback(() => {
    setSettings({ ...A11Y_DEFAULT_SETTINGS });
    localStorage.removeItem(A11Y_STORAGE_KEY);
    document.documentElement.style.fontSize = '';
  }, []);

  return { settings, updateSetting, resetSettings };
}

/* ── Inline SVG icons ─────────────────────────────────────────── */
const AccessibilityIcon = ({ size = 28, color = 'white' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color} xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="4.5" r="2" />
    <path d="M12 7.5c-1.5 0-4.5.5-5.5 1l.5 2c1-.4 3-.7 4-.7v3l-2.5 5.5 1.8.8L12 14.5l1.7 4.6 1.8-.8L13 12.8v-3c1 0 3 .3 4 .7l.5-2c-1-.5-4-1-5.5-1z" />
  </svg>
);

/* ── Feature definitions ──────────────────────────────────────── */
const FONT_SIZE_LABELS = ['רגיל', 'גדול', 'גדול מאוד', 'ענק'];

const A11Y_SECTIONS = [
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
];

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
  );
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
  );
}

/* ── Accessibility Statement Modal ────────────────────────────── */
function AccessibilityStatement({ isOpen, onClose }) {
  const overlayRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return createPortal(
    <div
      ref={overlayRef}
      onClick={(e) => { if (e.target === overlayRef.current) onClose(); }}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 10001,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,0.6)',
        padding: '24px',
      }}
    >
      <div
        dir="rtl"
        style={{
          background: '#fff',
          color: '#1a1a1a',
          borderRadius: '16px',
          maxWidth: '640px',
          width: '100%',
          maxHeight: '80vh',
          overflowY: 'auto',
          padding: '32px',
          position: 'relative',
          fontFamily: "'Heebo', Arial, sans-serif",
          fontSize: '16px',
          lineHeight: '1.7',
          boxShadow: '0 24px 48px rgba(0,0,0,0.2)',
        }}
      >
        <button
          onClick={onClose}
          aria-label="סגור"
          style={{
            position: 'absolute',
            top: '16px',
            left: '16px',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '4px',
            color: '#666',
            fontSize: '24px',
            lineHeight: 1,
          }}
        >
          ✕
        </button>

        <h2 style={{ fontSize: '24px', fontWeight: 700, marginTop: 0, marginBottom: '16px', color: '#1a1a1a' }}>
          הצהרת נגישות
        </h2>

        <p style={{ marginBottom: '12px' }}>
          <strong>שם הארגון:</strong> תנועת חמש אצבעות
        </p>

        <p style={{ marginBottom: '12px' }}>
          תנועת חמש אצבעות מחויבת להנגשת האתר לאנשים עם מוגבלויות, ופועלת ליישום
          הנחיות תקן הנגישות הישראלי (ת&quot;י 5568) ברמת AA, בהתאם להנחיות WCAG 2.0
          של ארגון W3C.
        </p>

        <h3 style={{ fontSize: '18px', fontWeight: 600, marginTop: '24px', marginBottom: '8px', color: '#1a1a1a' }}>
          בסיס חוקי
        </h3>
        <p style={{ marginBottom: '12px' }}>
          הנגשת האתר נעשית בהתאם לחוק שוויון זכויות לאנשים עם מוגבלות, התשנ&quot;ח-1998,
          ותקנות שוויון זכויות לאנשים עם מוגבלות (התאמות נגישות לשירות), התשע&quot;ג-2013
          (תקנה 35).
        </p>

        <h3 style={{ fontSize: '18px', fontWeight: 600, marginTop: '24px', marginBottom: '8px', color: '#1a1a1a' }}>
          רמת הנגישות
        </h3>
        <p style={{ marginBottom: '12px' }}>
          אתר זה עומד בדרישות תקן WCAG 2.0 ברמה AA ובתקן הישראלי ת&quot;י 5568.
          האתר כולל תפריט נגישות המאפשר התאמות תצוגה, ניגודיות, גודל טקסט, ניווט
          מקלדת ועוד.
        </p>

        <h3 style={{ fontSize: '18px', fontWeight: 600, marginTop: '24px', marginBottom: '8px', color: '#1a1a1a' }}>
          פעולות שבוצעו להנגשת האתר
        </h3>
        <ul style={{ paddingRight: '20px', marginBottom: '12px' }}>
          <li>התאמה לניווט באמצעות מקלדת</li>
          <li>הוספת תיאורי תמונות (alt text)</li>
          <li>שימוש בניגודיות צבעים מתאימה</li>
          <li>אפשרות להגדלת טקסט ושינוי גופנים</li>
          <li>סימון כותרות בהיררכיה נכונה</li>
          <li>תפריט נגישות ייעודי עם 13 אפשרויות התאמה</li>
        </ul>

        <h3 style={{ fontSize: '18px', fontWeight: 600, marginTop: '24px', marginBottom: '8px', color: '#1a1a1a' }}>
          יצירת קשר בנושא נגישות
        </h3>
        <p style={{ marginBottom: '12px' }}>
          אם נתקלתם בבעיית נגישות באתר, אנא פנו אלינו ונשמח לסייע:
        </p>
        <ul style={{ paddingRight: '20px', marginBottom: '12px', listStyle: 'none' }}>
          <li>📧 דוא&quot;ל: <a href="mailto:accessibility@hamesh-etzbaot.org.il" style={{ color: '#1565C0' }}>accessibility@hamesh-etzbaot.org.il</a></li>
        </ul>

        <p style={{ marginTop: '24px', fontSize: '14px', color: '#888' }}>
          תאריך עדכון אחרון: מאי 2025
        </p>
      </div>
    </div>,
    document.body
  );
}

/* ── Main widget ──────────────────────────────────────────────── */
function AccessibilityWidget() {
  const { settings, updateSetting, resetSettings } = useAccessibility();
  const [isOpen, setIsOpen] = useState(false);
  const [statementOpen, setStatementOpen] = useState(false);
  const panelRef = useRef(null);
  const triggerRef = useRef(null);

  // Click outside to close
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e) => {
      if (
        panelRef.current && !panelRef.current.contains(e.target) &&
        triggerRef.current && !triggerRef.current.contains(e.target)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [isOpen]);

  // Escape to close
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e) => { if (e.key === 'Escape') setIsOpen(false); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [isOpen]);

  // Focus trap
  useEffect(() => {
    if (!isOpen || !panelRef.current) return;
    const panel = panelRef.current;
    const focusable = panel.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
    if (focusable.length === 0) return;

    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    first.focus();

    const trap = (e) => {
      if (e.key !== 'Tab') return;
      if (e.shiftKey) {
        if (document.activeElement === first) { e.preventDefault(); last.focus(); }
      } else {
        if (document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    };
    panel.addEventListener('keydown', trap);
    return () => panel.removeEventListener('keydown', trap);
  }, [isOpen]);

  const toggle = useCallback(() => setIsOpen(prev => !prev), []);

  // Compensating filter for the widget when invert/grayscale is active
  let compensateFilter = 'none';
  if (settings.invertColors && settings.grayscale) {
    compensateFilter = 'invert(1) hue-rotate(180deg) grayscale(1)';
  } else if (settings.invertColors) {
    compensateFilter = 'invert(1) hue-rotate(180deg)';
  } else if (settings.grayscale) {
    compensateFilter = 'none';
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
          boxShadow: 'var(--shadow-md)',
          transition: 'transform 0.2s ease, box-shadow 0.2s ease, background-color 0.2s ease',
        }}
        onMouseEnter={e => {
          e.currentTarget.style.transform = 'scale(1.05)';
          e.currentTarget.style.backgroundColor = '#0D47A1';
          e.currentTarget.style.boxShadow = 'var(--shadow-lg)';
        }}
        onMouseLeave={e => {
          e.currentTarget.style.transform = 'scale(1)';
          e.currentTarget.style.backgroundColor = '#1565C0';
          e.currentTarget.style.boxShadow = 'var(--shadow-md)';
        }}
        onFocus={e => { e.currentTarget.style.outline = '3px solid #FFD600'; e.currentTarget.style.outlineOffset = '3px'; }}
        onBlur={e => { e.currentTarget.style.outline = 'none'; }}
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
          boxShadow: 'var(--shadow-lg)',
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
        {A11Y_SECTIONS.map((section, si) => (
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
            {si < A11Y_SECTIONS.length - 1 && (
              <div style={{ height: '1px', backgroundColor: '#eee', margin: '4px 20px' }} />
            )}
          </div>
        ))}

        {/* Footer */}
        <div style={{ padding: '12px 20px 16px', borderTop: '1px solid #eee', marginTop: '4px' }}>
          <button
            onClick={() => { resetSettings(); setIsOpen(false); }}
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
            onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#E3F2FD'; }}
            onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'transparent'; }}
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
  );
}

ReactDOM.createRoot(document.getElementById('a11y-root')).render(<AccessibilityWidget />);
