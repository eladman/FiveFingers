import { Check } from 'lucide-react'
import { SectionBg, SectionHeading } from '../liabah/shared'
import useReveal from '../../hooks/useReveal'

// The catalog's "עולמות התוכן" — three content worlds to choose from.
const WORLDS = [
  {
    n: '01',
    title: 'חוסן מנטלי',
    subtitle: 'האקס פקטור מול מציאות משתנה',
    image: '/liba_pics/214A1343.jpg',
    text: 'בעולם שבו הדבר היחיד שוודאי הוא אי-הוודאות, חוסן מנטלי הוא כלי הכרחי לכל תהליך של התפתחות וגדילה. הוא מעניק ביטחון עצמי, יכולת עמידה מול אתגרים ותחושת מסוגלות.',
    tools: ['ויסות רגשי', 'התמודדות עם לחץ ואי-ודאות', 'ביטחון ומסוגלות', 'יציאה מאזור הנוחות'],
  },
  {
    n: '02',
    title: 'מנהיגות מעשית',
    subtitle: 'איך להוביל רעיונות ואנשים כדי להשפיע על המציאות',
    image: '/liba_pics/214A0362.jpg',
    text: 'מנהיגות היא לא נתון מולד אלא שריר שאפשר לאמן ולפתח. מנהיגות מעשית עוסקת ביכולת לקחת אחריות, להוביל תהליך ולהשפיע על הסביבה — מתוך עשייה ולא מתוך תיאוריה.',
    tools: ['לקיחת אחריות', 'עבודת צוות', 'קבלת החלטות', 'השפעה והובלת תהליכים'],
  },
  {
    n: '03',
    title: 'מצוינות כתרבות',
    subtitle: 'איך למקסם את הפוטנציאל שלך/ה, בלי לאבד את עצמך בדרך',
    image: '/liba_pics/214A9700.jpg',
    text: 'מצוינות אמיתית היא לא תוצאה חד-פעמית אלא הרגל ותרבות. כאן לומדים איך להציב יעדים, להתמיד ולהשתפר כל יום — מבלי להישחק בדרך.',
    tools: ['הצבת יעדים', 'התמדה ומשמעת עצמית', 'שיפור מתמיד', 'איזון ובריאות'],
  },
]

/** "עולמות התוכן" — three content-world cards with image header + tool list. */
export default function CollabsContentWorlds() {
  const ref = useReveal({ selector: '.reveal', start: 'top 80%' })

  return (
    <section id="collabs-worlds" ref={ref} dir="rtl" className="relative w-full overflow-hidden bg-surface">
      <SectionBg />
      <div className="relative z-10 max-w-screen-xl mx-auto px-6 md:px-12 lg:px-20">
        <SectionHeading
          eyebrow="התוכן"
          title="עולמות התוכן"
          subtitle="על מה תרצו לדבר? בחרו את הנושא שמדבר אליכם מתוך שלושה עולמות"
          animateClass="reveal"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-24">
          {WORLDS.map((w) => (
            <div
              key={w.n}
              className="reveal group flex flex-col rounded-2xl overflow-hidden bg-white shadow-sm border border-navy/8 hover:shadow-xl hover:shadow-navy/10 hover:border-orange/30 hover:-translate-y-1.5 transition-all duration-300"
            >
              {/* Image header with number badge */}
              <div className="relative aspect-[4/3] overflow-hidden bg-navy/[0.06]">
                <img
                  src={w.image}
                  alt={w.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/55 to-transparent" />
                <span
                  className="absolute top-4 left-4 font-ragmarom text-white/90 leading-none"
                  style={{ fontSize: 'clamp(2rem, 3vw, 2.6rem)' }}
                >
                  {w.n}
                </span>
              </div>

              {/* Body */}
              <div className="flex flex-col gap-4 p-7 text-right flex-1">
                <div>
                  <h3
                    className="font-heebo font-extrabold text-navy"
                    style={{ fontSize: 'clamp(1.4rem, 2vw, 1.7rem)' }}
                  >
                    {w.title}
                  </h3>
                  <p className="font-heebo text-[#ff8714] font-semibold mt-1 leading-snug">
                    {w.subtitle}
                  </p>
                </div>
                <div className="w-8 h-[3px] rounded-full bg-orange" />
                <p className="font-heebo text-navy/65 leading-relaxed">{w.text}</p>

                {/* Tool list */}
                <ul className="mt-auto flex flex-col gap-2.5 pt-2">
                  {w.tools.map((t) => (
                    <li key={t} className="flex items-center gap-2.5 font-heebo text-navy/80">
                      <span className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-orange/10 text-[#ff8714]">
                        <Check size={13} strokeWidth={3} />
                      </span>
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
