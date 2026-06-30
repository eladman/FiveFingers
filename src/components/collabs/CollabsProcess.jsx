import { SectionBg, SectionHeading } from '../liabah/shared'
import useReveal from '../../hooks/useReveal'

// The catalog's "איך זה עובד?" — a four-step engagement flow.
const STEPS = [
  {
    n: '01',
    title: 'מכירים',
    text: 'נדבר, נבין את הצרכים והרצונות של הארגון שלכם — ונתקדם יחד לשלב הבא.',
  },
  {
    n: '02',
    title: 'בוחרים נושא',
    text: 'בוחרים את הנושא הרלוונטי עבורכם מתוך שלושה עולמות תוכן: חוסן, מנהיגות ומצוינות.',
  },
  {
    n: '03',
    title: 'מדייקים את הפתרון',
    text: 'מתאימים את סוג הפתרון לקהל היעד, ללו״ז ולתקציב שלכם — הרצאה, סדנה או מחנה.',
  },
  {
    n: '04',
    title: 'יוצאים לדרך',
    text: 'סוגרים את כל הפרטים הטכניים, קובעים תאריך — ואנחנו כבר ניקח את זה משם.',
  },
]

/** "איך זה עובד?" — numbered step cards connected by a guide line. */
export default function CollabsProcess() {
  const ref = useReveal({ selector: '.reveal', start: 'top 80%' })

  return (
    <section id="collabs-process" ref={ref} dir="rtl" className="relative w-full overflow-hidden bg-surface">
      <SectionBg flip watermark={false} />
      <div className="relative z-10 max-w-screen-xl mx-auto px-6 md:px-12 lg:px-20">
        <SectionHeading eyebrow="התהליך" title="איך זה עובד?" animateClass="reveal" />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pb-24">
          {STEPS.map((s) => (
            <div
              key={s.n}
              className="reveal relative flex flex-col gap-3 rounded-2xl bg-white p-7 shadow-sm border border-navy/8 hover:shadow-xl hover:shadow-navy/10 hover:border-orange/30 hover:-translate-y-1.5 transition-all duration-300 text-right"
            >
              <span
                className="font-ragmarom text-orange/85 leading-none"
                style={{ fontSize: 'clamp(2.6rem, 4vw, 3.4rem)' }}
              >
                {s.n}
              </span>
              <h3
                className="font-heebo font-extrabold text-navy"
                style={{ fontSize: 'clamp(1.25rem, 1.7vw, 1.5rem)' }}
              >
                {s.title}
              </h3>
              <p className="font-heebo text-navy/65 leading-relaxed">{s.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
