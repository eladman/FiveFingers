import { MapPin, Dumbbell, Rocket } from 'lucide-react'
import { MuseumSection, MuseumHeading } from '../academy/shared'
import useReveal from '../../hooks/useReveal'

// The catalog's "מי אנחנו" value props, distilled to three pillars.
const PILLARS = [
  {
    icon: MapPin,
    title: 'מחוברים למציאות הישראלית',
    text: 'התוכן נבנה מתוך השטח הישראלי ומדבר בשפה שמחברת ומניעה לפעולה — לא תיאוריה מיובאת, אלא מציאות שאנחנו חיים בה.',
  },
  {
    icon: Dumbbell,
    title: 'למידה מתוך עשייה',
    text: 'לא מרצים על מצוינות — מתאמנים בה. כל מפגש הוא חוויה מעצבת שמטמיעה כלים פיזיים ומנטליים דרך התנסות אמיתית.',
  },
  {
    icon: Rocket,
    title: 'פלטפורמה למקסום פוטנציאל',
    text: 'שיטה שמוציאה את המיטב מכל אדם ומכל ארגון, ומייצרת תהליך של מימוש פוטנציאל אישי וקבוצתי — הלכה למעשה.',
  },
]

/**
 * "מי אנחנו" — three value pillars as an editorial column set divided by
 * hairlines (museum layout), replacing the old boxed-card grid.
 */
export default function CollabsIntro() {
  const ref = useReveal({ selector: '.intro-animate', y: 28, stagger: 0.08, duration: 1, start: 'top 82%' })

  return (
    <MuseumSection id="collabs-intro" bg="white">
      <div ref={ref} className="relative z-10 max-w-6xl mx-auto px-6 md:px-10 py-24 md:py-32">
        <MuseumHeading
          kicker="מי אנחנו"
          title="לשנות את חוקי המשחק"
          lead="דור צעיר שממקסם את הפוטנציאל שבו ומשפיע לטובה על המציאות"
          align="start"
          animateClass="intro-animate"
        />

        <div className="mt-16 md:mt-20 grid grid-cols-1 md:grid-cols-3 border-t border-navy/12 md:divide-x md:divide-x-reverse md:divide-navy/12">
          {PILLARS.map((p) => {
            const Icon = p.icon
            return (
              <div
                key={p.title}
                className="intro-animate text-right py-10 md:py-0 md:pt-10 border-b border-navy/12 md:border-b-0 md:px-10 md:first:ps-0 md:last:pe-0"
              >
                <span className="inline-flex text-orange">
                  <Icon size={30} strokeWidth={1.75} />
                </span>
                <h3
                  className="font-heebo font-bold text-navy mt-5"
                  style={{ fontSize: 'clamp(1.3rem, 1.9vw, 1.65rem)' }}
                >
                  {p.title}
                </h3>
                <div className="mt-4 h-1 w-10 rounded-full bg-orange" />
                <p className="font-heebo text-navy/60 leading-relaxed mt-5">{p.text}</p>
              </div>
            )
          })}
        </div>
      </div>
    </MuseumSection>
  )
}
