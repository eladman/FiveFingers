import { Clock } from 'lucide-react'
import { MuseumSection, MuseumHeading, PrimaryButton } from '../academy/shared'
import useReveal from '../../hooks/useReveal'

// The catalog's "מדייקים את הפתרון" — three delivery formats.
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
    text: 'חוויה מעשית שמשלבת למידה, תרגול והתנסות בזמן אמת — ומטמיעה את הכלים בליווי מקצועי.',
    location: 'מרכזי חמש אצבעות / בהרצליה',
    audience: 'פיתוח צוותים, הכשרת מנהלים, קבוצות ספורט, יחידות צבאיות',
  },
  {
    n: '03',
    title: 'מחנה / סמינר',
    duration: '24–48 ש׳',
    text: 'תהליך עומק מרוכז שמשלב אתגר פיזי ומנטלי לצמיחה אישית וקבוצתית — חוויה מגבשת ובלתי נשכחת.',
    location: 'מרכז חמש אצבעות / עם לינה',
    audience: 'בתי ספר, תנועות וקבוצות נוער, יחידות מיוחדות, מועדוני ספורט',
  },
]

/**
 * "מדייקים את הפתרון" — three delivery formats as a ruled spec-sheet list
 * (museum layout): index + title + duration, description, and a term/value
 * spec grid for location & audience.
 */
export default function CollabsFormats({ onRegister }) {
  const ref = useReveal({ selector: '.fmt-animate', y: 28, stagger: 0.08, duration: 1, start: 'top 82%' })

  return (
    <MuseumSection id="collabs-formats" bg="surface-2">
      <div ref={ref} className="relative z-10 max-w-5xl mx-auto px-6 md:px-10 py-24 md:py-32">
        <MuseumHeading
          kicker="הפורמטים"
          title="מדייקים את הפתרון"
          lead="מתאימים את סוג הפתרון בהתאם למטרות, לקהל היעד וללו״ז שלכם"
          align="start"
          animateClass="fmt-animate"
        />

        <div className="mt-16 border-t border-navy/12">
          {FORMATS.map((f) => (
            <div
              key={f.n}
              className="fmt-animate group grid grid-cols-1 md:grid-cols-[5rem_1fr] gap-x-10 gap-y-5 py-10 md:py-12 border-b border-navy/12"
            >
              <span
                className="hidden md:block font-ragmarom text-navy/25 leading-none tabular-nums transition-colors duration-300 group-hover:text-orange"
                style={{ fontSize: 'clamp(2rem, 2.8vw, 2.8rem)' }}
              >
                {f.n}
              </span>

              <div className="text-right">
                <div className="flex flex-wrap items-baseline gap-x-4 gap-y-2">
                  <h3
                    className="font-ragmarom text-navy leading-tight"
                    style={{ fontSize: 'clamp(1.7rem, 2.6vw, 2.4rem)' }}
                  >
                    {f.title}
                  </h3>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-orange/10 text-orange-ink font-heebo font-semibold px-3.5 py-1 text-sm">
                    <Clock size={14} strokeWidth={2.25} />
                    {f.duration}
                  </span>
                </div>

                <p
                  className="font-heebo text-navy/65 leading-relaxed mt-4 max-w-2xl"
                  style={{ fontSize: 'clamp(1rem, 1.15vw, 1.12rem)' }}
                >
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

        <div className="fmt-animate flex justify-center pt-14">
          <PrimaryButton onClick={() => onRegister?.()}>
            לא בטוחים מה מתאים לכם? דברו איתנו
          </PrimaryButton>
        </div>
      </div>
    </MuseumSection>
  )
}
