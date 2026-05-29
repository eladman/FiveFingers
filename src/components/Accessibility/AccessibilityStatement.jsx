import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'

export default function AccessibilityStatement({ isOpen, onClose }) {
  const overlayRef = useRef(null)

  useEffect(() => {
    if (!isOpen) return
    const onKey = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [isOpen, onClose])

  if (!isOpen) return null

  return createPortal(
    <div
      ref={overlayRef}
      onClick={(e) => { if (e.target === overlayRef.current) onClose() }}
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
        {/* Close button */}
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
  )
}
