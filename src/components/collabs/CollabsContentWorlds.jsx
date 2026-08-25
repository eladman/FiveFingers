import { Check } from 'lucide-react'
import { MuseumSection, MuseumHeading } from '../academy/shared'
import useReveal from '../../hooks/useReveal'

// Signature parallelogram frame (shared with the home Programs / Academy sections).
const CLIP_EVEN = 'polygon(6% 0%, 100% 0%, 94% 100%, 0% 100%)'
const CLIP_ODD = 'polygon(0% 0%, 94% 0%, 100% 100%, 6% 100%)'

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
    text: 'מנהיגות היא לא נתון מולד אלא שריר שאפשר לאמן ולפתח. מנהיגות מעשית עוסקת ביכולת לקחת אחריות, להוביל תהליך ולהשפיע על הסביבה - מתוך עשייה ולא מתוך תיאוריה.',
    tools: ['לקיחת אחריות', 'עבודת צוות', 'קבלת החלטות', 'השפעה והובלת תהליכים'],
  },
  {
    n: '03',
    title: 'מצוינות כתרבות',
    subtitle: 'איך למקסם את הפוטנציאל שלך/ה, בלי לאבד את עצמך בדרך',
    image: '/liba_pics/214A9700.jpg',
    text: 'מצוינות אמיתית היא לא תוצאה חד-פעמית אלא הרגל ותרבות. כאן לומדים איך להציב יעדים, להתמיד ולהשתפר כל יום - מבלי להישחק בדרך.',
    tools: ['הצבת יעדים', 'התמדה ומשמעת עצמית', 'שיפור מתמיד', 'איזון ובריאות'],
  },
]

/**
 * "עולמות התוכן" — three content worlds as alternating full-bleed editorial
 * rows with the signature parallelogram photo frame (museum layout).
 */
export default function CollabsContentWorlds() {
  const ref = useReveal({ selector: '.cw-animate', y: 32, stagger: 0.08, duration: 1, start: 'top 82%' })

  return (
    <MuseumSection id="collabs-worlds" bg="white">
      <div ref={ref} className="relative z-10 max-w-6xl mx-auto px-6 md:px-10 py-24 md:py-32">
        <MuseumHeading
          kicker="התוכן"
          title="עולמות התוכן"
          lead="על מה תרצו לדבר? בחרו את הנושא שמדבר אליכם מתוך שלושה עולמות"
          align="start"
          animateClass="cw-animate"
        />

        <div className="mt-16 md:mt-24 flex flex-col gap-20 md:gap-28">
          {WORLDS.map((w, i) => {
            const even = i % 2 === 0
            const clip = even ? CLIP_EVEN : CLIP_ODD
            return (
              <div
                key={w.n}
                className="cw-animate grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center"
              >
                {/* Image with parallelogram clip + offset orange backing */}
                <div className={`relative ${even ? 'lg:order-1' : 'lg:order-2'}`}>
                  <div
                    aria-hidden="true"
                    className="absolute bg-orange"
                    style={{
                      inset: 0,
                      clipPath: clip,
                      transform: even ? 'translate(14px, 14px)' : 'translate(-14px, 14px)',
                    }}
                  />
                  <div
                    className="relative aspect-[4/3] overflow-hidden bg-surface"
                    style={{ clipPath: clip }}
                  >
                    <img
                      src={w.image}
                      alt={w.title}
                      className="absolute inset-0 w-full h-full object-cover"
                      loading="lazy"
                    />
                    <span
                      className={`absolute top-5 font-ragmarom text-white leading-none ${even ? 'right-6' : 'left-6'}`}
                      style={{ fontSize: 'clamp(2.4rem, 4vw, 3.4rem)', textShadow: '0 2px 20px rgba(8,16,40,0.5)' }}
                    >
                      {w.n}
                    </span>
                  </div>
                </div>

                {/* Text */}
                <div className={`text-right ${even ? 'lg:order-2' : 'lg:order-1'}`}>
                  <h3
                    className="font-ragmarom text-navy leading-tight"
                    style={{ fontSize: 'clamp(2rem, 3.4vw, 3rem)' }}
                  >
                    {w.title}
                  </h3>
                  <p
                    className="font-heebo text-orange-ink font-semibold mt-2"
                    style={{ fontSize: 'clamp(1.05rem, 1.4vw, 1.25rem)' }}
                  >
                    {w.subtitle}
                  </p>
                  <div className="mt-5 h-1 w-12 rounded-full bg-orange" />
                  <p
                    className="font-heebo text-navy/65 leading-relaxed mt-6"
                    style={{ fontSize: 'clamp(1rem, 1.15vw, 1.12rem)' }}
                  >
                    {w.text}
                  </p>
                  <ul className="mt-7 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3">
                    {w.tools.map((t) => (
                      <li
                        key={t}
                        className="flex items-center gap-2.5 font-heebo text-navy/75"
                        style={{ fontSize: '0.98rem' }}
                      >
                        <Check size={17} className="text-orange shrink-0" strokeWidth={2.5} />
                        {t}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </MuseumSection>
  )
}
