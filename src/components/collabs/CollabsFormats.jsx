import { Clock, MapPin, Users } from 'lucide-react'
import { SectionBg, SectionHeading, PrimaryButton } from '../liabah/shared'
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

/** "מדייקים את הפתרון" — three format cards (lecture / workshop / camp). */
export default function CollabsFormats({ onRegister }) {
  const ref = useReveal({ selector: '.reveal', start: 'top 80%' })

  return (
    <section id="collabs-formats" ref={ref} dir="rtl" className="relative w-full overflow-hidden bg-surface">
      <SectionBg flip watermark={false} />
      <div className="relative z-10 max-w-screen-xl mx-auto px-6 md:px-12 lg:px-20">
        <SectionHeading
          eyebrow="הפורמטים"
          title="מדייקים את הפתרון"
          subtitle="מתאימים את סוג הפתרון בהתאם למטרות, לקהל היעד וללו״ז שלכם"
          animateClass="reveal"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {FORMATS.map((f) => (
            <div
              key={f.n}
              className="reveal flex flex-col rounded-2xl bg-white p-8 shadow-sm border border-navy/8 hover:shadow-xl hover:shadow-navy/10 hover:border-orange/30 hover:-translate-y-1.5 transition-all duration-300 text-right"
            >
              <div className="flex items-baseline justify-between gap-3">
                <h3
                  className="font-heebo font-extrabold text-navy"
                  style={{ fontSize: 'clamp(1.4rem, 2vw, 1.8rem)' }}
                >
                  {f.title}
                </h3>
                <span
                  className="font-ragmarom text-orange/85 leading-none"
                  style={{ fontSize: 'clamp(1.8rem, 2.6vw, 2.4rem)' }}
                >
                  {f.n}
                </span>
              </div>

              <span className="self-start inline-flex items-center gap-1.5 rounded-full bg-orange/10 text-[#ff8714] font-heebo font-semibold px-3.5 py-1 mt-3 text-sm">
                <Clock size={14} strokeWidth={2.25} />
                {f.duration}
              </span>

              <p className="font-heebo text-navy/65 leading-relaxed mt-4">{f.text}</p>

              <div className="mt-6 pt-5 border-t border-navy/8 flex flex-col gap-3 text-sm">
                <div className="flex items-start gap-2.5 font-heebo text-navy/75">
                  <MapPin size={16} className="mt-0.5 shrink-0 text-[#ff8714]" strokeWidth={2} />
                  <span>{f.location}</span>
                </div>
                <div className="flex items-start gap-2.5 font-heebo text-navy/75">
                  <Users size={16} className="mt-0.5 shrink-0 text-[#ff8714]" strokeWidth={2} />
                  <span>{f.audience}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="reveal flex justify-center pt-12 pb-24">
          <PrimaryButton onClick={() => onRegister?.()}>
            לא בטוחים מה מתאים לכם? דברו איתנו
          </PrimaryButton>
        </div>
      </div>
    </section>
  )
}
