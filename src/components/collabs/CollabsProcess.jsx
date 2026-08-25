import { MuseumSection, MuseumHeading } from '../academy/shared'
import useReveal from '../../hooks/useReveal'

// The catalog's "איך זה עובד?" — a four-step engagement flow.
const STEPS = [
  {
    n: '1',
    title: 'מכירים',
    text: 'נדבר, נבין את הצרכים והרצונות של הארגון שלכם - ונתקדם יחד לשלב הבא.',
  },
  {
    n: '2',
    title: 'בוחרים נושא',
    text: 'בוחרים את הנושא הרלוונטי עבורכם מתוך שלושה עולמות תוכן: חוסן, מנהיגות ומצוינות.',
  },
  {
    n: '3',
    title: 'מדייקים את הפתרון',
    text: 'מתאימים את סוג הפתרון לקהל היעד, ללו״ז ולתקציב שלכם - הרצאה, סדנה או מחנה.',
  },
  {
    n: '4',
    title: 'יוצאים לדרך',
    text: 'סוגרים את כל הפרטים הטכניים, קובעים תאריך - ואנחנו כבר ניקח את זה משם.',
  },
]

/** "איך זה עובד?" — numbered steps as a ruled editorial flow (museum layout). */
export default function CollabsProcess() {
  const ref = useReveal({ selector: '.pr-animate', y: 28, stagger: 0.08, duration: 1, start: 'top 82%' })

  return (
    <MuseumSection id="collabs-process" bg="surface">
      <div ref={ref} className="relative z-10 max-w-5xl mx-auto px-6 md:px-10 py-24 md:py-32">
        <MuseumHeading kicker="התהליך" title="איך זה עובד?" align="start" animateClass="pr-animate" />

        <div className="mt-16 border-t border-navy/12">
          {STEPS.map((s) => (
            <div
              key={s.n}
              className="pr-animate group grid grid-cols-[auto_1fr] md:grid-cols-[5rem_1fr_1.6fr] gap-x-6 md:gap-x-10 gap-y-2 items-baseline py-7 md:py-9 border-b border-navy/12"
            >
              <span
                className="font-ragmarom text-navy/25 leading-none tabular-nums transition-colors duration-300 group-hover:text-orange"
                style={{ fontSize: 'clamp(1.8rem, 2.6vw, 2.6rem)' }}
              >
                {s.n}
              </span>
              <h3
                className="font-heebo font-bold text-navy leading-tight"
                style={{ fontSize: 'clamp(1.25rem, 1.9vw, 1.7rem)' }}
              >
                {s.title}
              </h3>
              <p className="col-span-2 md:col-span-1 font-heebo text-navy/60 leading-relaxed">
                {s.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </MuseumSection>
  )
}
