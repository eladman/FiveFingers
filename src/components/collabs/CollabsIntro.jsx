import { MapPin, Dumbbell, Rocket } from 'lucide-react'
import { SectionBg, SectionHeading } from '../liabah/shared'
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

/** "מי אנחנו" — three value-prop pillars on the warm surface. */
export default function CollabsIntro() {
  const ref = useReveal({ selector: '.reveal', start: 'top 80%' })

  return (
    <section id="collabs-intro" ref={ref} dir="rtl" className="relative w-full overflow-hidden bg-surface">
      <SectionBg />
      <div className="relative z-10 max-w-screen-xl mx-auto px-6 md:px-12 lg:px-20">
        <SectionHeading
          eyebrow="מי אנחנו"
          title="לשנות את חוקי המשחק"
          subtitle="דור צעיר שממקסם את הפוטנציאל שבו ומשפיע לטובה על המציאות"
          animateClass="reveal"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-24">
          {PILLARS.map((p) => {
            const Icon = p.icon
            return (
              <div
                key={p.title}
                className="reveal group flex flex-col gap-4 rounded-2xl bg-white p-8 shadow-sm border border-navy/8 hover:shadow-xl hover:shadow-navy/10 hover:border-orange/30 hover:-translate-y-1.5 transition-all duration-300 text-right"
              >
                <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-orange/10 text-[#ff8714]">
                  <Icon size={26} strokeWidth={1.75} />
                </span>
                <h3
                  className="font-heebo font-extrabold text-navy"
                  style={{ fontSize: 'clamp(1.3rem, 1.8vw, 1.6rem)' }}
                >
                  {p.title}
                </h3>
                <div className="w-8 h-[3px] rounded-full bg-orange" />
                <p className="font-heebo text-navy/65 leading-relaxed">{p.text}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
