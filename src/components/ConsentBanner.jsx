import { useEffect, useRef, useState } from 'react'
import { getConsent, setConsent, CONSENT_OPEN_EVENT } from '../lib/consent'

/**
 * Cookie / tracking consent. Shown until the visitor decides, and again whenever
 * the footer's "הגדרות עוגיות" link asks for it. Google Tag Manager (and the Meta
 * Pixel inside it) loads only on "מאשרים" — see src/lib/consent.js.
 *
 * Both buttons get equal visual weight on purpose: declining should be as easy
 * as agreeing. Not a modal — the site stays usable behind it, and it doesn't
 * trap focus.
 */
export default function ConsentBanner() {
  const [open, setOpen] = useState(() => getConsent() === null)
  const panelRef = useRef(null)
  const reopenedRef = useRef(false)

  useEffect(() => {
    const show = () => {
      reopenedRef.current = true
      setOpen(true)
    }
    window.addEventListener(CONSENT_OPEN_EVENT, show)
    return () => window.removeEventListener(CONSENT_OPEN_EVENT, show)
  }, [])

  // Reopened from the footer → move focus into the banner so keyboard and
  // screen-reader users land on the choice they just asked for.
  useEffect(() => {
    if (open && reopenedRef.current) panelRef.current?.focus()
  }, [open])

  if (!open) return null

  const decide = (value) => {
    setConsent(value)
    setOpen(false)
  }

  const current = getConsent()

  return (
    <div
      ref={panelRef}
      role="region"
      aria-label="הגדרות עוגיות"
      tabIndex={-1}
      dir="rtl"
      className="fixed z-[10001] inset-x-3 sm:inset-x-auto sm:right-6 sm:max-w-[440px] bg-white text-navy rounded-2xl border border-line p-5 sm:p-6 outline-none focus-visible:shadow-focus"
      style={{
        bottom: 'max(12px, calc(env(safe-area-inset-bottom, 0px) + 12px))',
        boxShadow: '0 18px 48px rgba(8,16,40,0.22)',
      }}
    >
      <h2 className="font-bold text-lg leading-snug mb-2">עוגיות ומדידה</h2>
      <p className="text-[15px] leading-relaxed text-navy/80 mb-4">
        נשמח להשתמש בעוגיות ובכלי מדידה של Google ושל Meta, כדי להבין אילו מהפרסומים שלנו
        באמת מביאים אלינו צעירים/ות והורים. בלי אישור שלכם, הכלים האלה לא נטענים.{' '}
        <a href="/privacy" className="font-semibold text-navy underline underline-offset-4 decoration-orange">
          מדיניות הפרטיות
        </a>
      </p>
      {current && (
        <p className="text-sm text-navy/65 mb-4">
          הבחירה הנוכחית: {current === 'granted' ? 'אישרתם' : 'סירבתם'}.
        </p>
      )}
      <div className="grid grid-cols-2 gap-3">
        <button
          type="button"
          onClick={() => decide('granted')}
          className="h-11 rounded-full bg-orange text-navy-deep font-bold text-[15px] transition-[filter] hover:brightness-105 focus-visible:outline-none focus-visible:shadow-focus"
        >
          מאשרים
        </button>
        <button
          type="button"
          onClick={() => decide('denied')}
          className="h-11 rounded-full border-2 border-navy text-navy font-bold text-[15px] transition-colors hover:bg-navy/5 focus-visible:outline-none focus-visible:shadow-focus"
        >
          לא, תודה
        </button>
      </div>
    </div>
  )
}
