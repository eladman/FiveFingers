import { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Clock } from 'lucide-react'
import Button from '../../components/ui/Button'

gsap.registerPlugin(ScrollTrigger)

/**
 * מדייקים את הפתרון — the three delivery formats as editorial spec rows:
 * ghost index, RagMarom title + duration chip, one line, and the
 * location / audience spec grid. Hairlines only, no card boxes.
 */

const FORMATS = [
  {
    n: '01',
    title: 'הרצאת השראה',
    duration: '45–90 דק׳',
    text: 'הרצאה מעוררת השראה שמציגה גישות חדשות ומעניקה כלים פרקטיים ליישום מיידי.',
    location: 'אולם או חלל פתוח · עד 500 משתתפים',
    audience: 'כנסים, אירועי חברה, פתיחת/סגירת שנה, ימי עיון',
  },
  {
    n: '02',
    title: 'סדנה יישומית',
    duration: '3–6 ש׳',
    text: 'חוויה מעשית שמשלבת למידה, תרגול והתנסות בזמן אמת, ומטמיעה את הכלים בליווי מקצועי.',
    location: 'מרכזי חמש אצבעות / בהרצליה',
    audience: 'פיתוח צוותים, הכשרת מנהלים, קבוצות ספורט, יחידות צבאיות',
  },
  {
    n: '03',
    title: 'מחנה / סמינר',
    duration: '24–48 ש׳',
    text: 'תהליך עומק מרוכז שמשלב אתגר פיזי ומנטלי לצמיחה אישית וקבוצתית, חוויה מגבשת ובלתי נשכחת.',
    location: 'מרכז חמש אצבעות / עם לינה',
    audience: 'בתי ספר, תנועות וקבוצות נוער, יחידות מיוחדות, מועדוני ספורט',
  },
]

export default function CollabsFormatsV2({ onRegister }) {
  const ref = useRef(null)

  useLayoutEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const ctx = gsap.context(() => {
      if (reduced) return
      gsap.fromTo('.cf2-el',
        { y: 36, opacity: 0 },
        {
          y: 0, opacity: 1, stagger: 0.1, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: ref.current, start: 'top 78%', once: true },
        }
      )
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <section
      id="collabs-formats"
      ref={ref}
      dir="rtl"
      className="relative w-full overflow-hidden bg-surface"
    >
      <div className="pointer-events-none absolute top-[10%] left-[-10%] w-[45vw] h-[45vh] rounded-full bg-orange/8 blur-[150px]" />

      <div className="relative z-10 max-w-screen-xl mx-auto px-6 sm:px-10 md:px-16 pt-24 md:pt-32 pb-16 md:pb-24">
        <div className="cf2-el max-w-3xl">
          <p className="ds-eyebrow text-orange-ink mb-3">הפורמטים</p>
          <h2 className="ds-section-title text-navy">מדייקים את הפתרון</h2>
          <p className="ds-section-subtitle text-orange-ink mt-4">
            מתאימים את סוג הפתרון למטרות, לקהל וללו״ז שלכם.
          </p>
        </div>

        <div className="mt-14 md:mt-20 border-t border-navy/10">
          {FORMATS.map((f) => (
            <div
              key={f.n}
              className="cf2-el group grid grid-cols-1 md:grid-cols-[6rem_1fr] gap-x-10 gap-y-4 py-10 md:py-14 border-b border-navy/10"
            >
              <span
                className="hidden md:block font-ragmarom text-navy/20 leading-none tabular-nums transition-colors duration-300 group-hover:text-orange"
                style={{ fontSize: 'clamp(2.2rem, 3.2vw, 3.2rem)' }}
              >
                {f.n}
              </span>

              <div className="text-right">
                <div className="flex flex-wrap items-baseline gap-x-4 gap-y-2">
                  <h3 className="font-ragmarom text-navy leading-tight" style={{ fontSize: 'clamp(1.8rem, 2.8vw, 2.6rem)' }}>
                    {f.title}
                  </h3>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-orange/10 text-orange-ink font-heebo font-semibold px-3.5 py-1 text-sm">
                    <Clock size={14} strokeWidth={2.25} />
                    {f.duration}
                  </span>
                </div>

                <p className="font-heebo text-navy/65 leading-relaxed mt-4 max-w-2xl" style={{ fontSize: 'clamp(1rem, 1.15vw, 1.12rem)' }}>
                  {f.text}
                </p>

                <dl className="mt-6 grid grid-cols-1 sm:grid-cols-[7rem_1fr] gap-x-6 gap-y-3 max-w-2xl">
                  <dt className="font-heebo font-semibold text-navy/45 text-sm" style={{ letterSpacing: '0.06em' }}>
                    מיקום
                  </dt>
                  <dd className="font-heebo text-navy leading-snug">{f.location}</dd>
                  <dt className="font-heebo font-semibold text-navy/45 text-sm" style={{ letterSpacing: '0.06em' }}>
                    קהל יעד
                  </dt>
                  <dd className="font-heebo text-navy leading-snug">{f.audience}</dd>
                </dl>
              </div>
            </div>
          ))}
        </div>

        <div className="cf2-el flex justify-center pt-14">
          <Button variant="primary" onClick={() => onRegister?.()}>
            לא בטוחים מה מתאים לכם? דברו איתנו
          </Button>
        </div>
      </div>
    </section>
  )
}
