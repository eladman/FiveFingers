import { Quote } from 'lucide-react'
import useReveal from '../../hooks/useReveal'

/**
 * "הצוות שלנו" — dark band with a team blurb and the מנכ״לית pull-quote
 * (from the catalog's closing page).
 */
export default function CollabsTeam() {
  const ref = useReveal({ selector: '.reveal', start: 'top 82%' })

  return (
    <section id="collabs-team" ref={ref} dir="rtl" className="relative w-full overflow-hidden bg-navy text-white">
      {/* Atmospheric glow */}
      <div className="pointer-events-none absolute bottom-[-20%] left-[5%] w-[45vw] h-[55vh] rounded-full bg-orange/10 blur-[160px]" />

      <div className="relative z-10 max-w-screen-xl mx-auto px-6 md:px-12 lg:px-20 py-24 md:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image */}
          <div className="reveal order-2 lg:order-1">
            <div className="relative">
              <div
                className="absolute bg-orange"
                style={{
                  inset: 0,
                  clipPath: 'polygon(6% 0%, 100% 0%, 94% 100%, 0% 100%)',
                  transform: 'translate(-14px, 14px)',
                }}
              />
              <div
                className="relative aspect-[4/3] overflow-hidden"
                style={{ clipPath: 'polygon(6% 0%, 100% 0%, 94% 100%, 0% 100%)' }}
              >
                <img
                  src="/Hero-Pics/214A0011.jpg"
                  alt="צוות המדריכים של חמש אצבעות"
                  className="absolute inset-0 w-full h-full object-cover"
                  style={{ objectPosition: 'center 30%' }}
                  loading="lazy"
                />
              </div>
            </div>
          </div>

          {/* Text */}
          <div className="reveal order-1 lg:order-2 text-right">
            <p
              className="font-heebo font-semibold text-orange mb-3"
              style={{ fontSize: 'clamp(0.7rem, 0.9vw, 0.85rem)', letterSpacing: '0.22em' }}
            >
              הצוות שלנו
            </p>
            <h2
              className="font-ragmarom leading-[0.95] tracking-tight"
              style={{ fontSize: 'clamp(2.4rem, 4.5vw, 4.5rem)' }}
            >
              אנשים שחיים את השיטה
            </h2>
            <p className="font-heebo text-white/75 leading-relaxed mt-6" style={{ fontSize: 'clamp(1rem, 1.2vw, 1.15rem)' }}>
              צוות המדריכים של חמש אצבעות מגיע מרקע מעשי עשיר בעולמות החינוך, הצבא והספורט.
              כולם עברו את מסלול ההכשרה הייחודי של ״חמש אצבעות״ ומביאים איתם ניסיון שטח אמיתי —
              הם לא רק מעבירים תוכן, אלא אנשים שחיים את השיטה בעצמם.
            </p>

            {/* Pull quote */}
            <figure className="mt-9 rounded-2xl bg-white/[0.06] border border-white/10 p-7">
              <Quote size={26} className="text-orange mb-3" />
              <blockquote
                className="font-heebo text-white/90 leading-relaxed"
                style={{ fontSize: 'clamp(1.05rem, 1.5vw, 1.35rem)' }}
              >
                ״העבודה עם חמש אצבעות הייתה משמעותית ומדויקת. ראיתי מקרוב מקצועיות, מחויבות
                ויכולת אמיתית להניע תהליכים עבור בני נוער וצעירים.״
              </blockquote>
              <figcaption className="font-heebo text-white/55 mt-4 text-sm">
                <span className="text-orange font-semibold">שירלי רימון ברכה</span> · מנכ״לית
              </figcaption>
            </figure>
          </div>
        </div>
      </div>
    </section>
  )
}
