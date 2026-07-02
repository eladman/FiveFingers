import useReveal from '../../hooks/useReveal'
import { MuseumSection, MuseumHeading } from '../academy/shared'
import { COMMUNITY } from '../../data/alumniData'

/**
 * Light editorial section — the "some info" about the alumni community: what it
 * means to be a בוגר/ת of חמש אצבעות, and the handoff into תוכנית יואב.
 */
export default function AlumniIntro() {
  const ref = useReveal({ selector: '.intro-animate', y: 32, stagger: 0.1, duration: 1, start: 'top 82%' })

  return (
    <MuseumSection id="alumni-intro" bg="white" watermark flip>
      <div ref={ref} className="relative z-10 max-w-6xl mx-auto px-6 md:px-10 py-24 md:py-32">
        <MuseumHeading
          kicker="קהילת הבוגרים"
          title="הדרך לא נגמרת — היא מתרחבת"
          align="start"
          animateClass="intro-animate"
        />

        <div className="mt-12 md:mt-16 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Copy */}
          <div className="order-2 lg:order-1">
            <p className="intro-animate font-heebo text-navy/80 leading-relaxed" style={{ fontSize: 'clamp(1.05rem, 1.4vw, 1.2rem)' }}>
              אלפי בוגרים ובוגרות עברו במסגרות של חמש אצבעות מאז 2014 — ומהמסלול הם
              יוצאים עם ערכים, כלים וקבוצת שווים שנשארת איתם לחיים. אבל אצלנו סיום
              המסלול הוא לא קו הסיום, אלא נקודת פתיחה.
            </p>
            <p className="intro-animate font-heebo text-navy/80 leading-relaxed mt-5" style={{ fontSize: 'clamp(1.05rem, 1.4vw, 1.2rem)' }}>
              קהילת הבוגרים יוצרת רשת חברתית ומקצועית של חיבורים אישיים שמאפשרים
              תמיכה והמשכיות. בליבה שלה עומדת <span className="font-semibold text-navy">תוכנית יואב</span> —
              תוכנית הדגל שמלווה צעירות וצעירים בדרך למקסום הפוטנציאל ולהשפעה על
              המציאות הישראלית.
            </p>
          </div>

          {/* Placeholder image card */}
          <div className="intro-animate order-1 lg:order-2">
            <div className="relative rounded-[2rem] overflow-hidden ring-1 ring-navy/10 shadow-[0_20px_60px_-30px_rgba(13,27,75,0.5)]">
              <img
                src={COMMUNITY.src}
                alt="קהילת הבוגרים של חמש אצבעות"
                width={COMMUNITY.w}
                height={COMMUNITY.h}
                loading="lazy"
                className="w-full h-full object-cover aspect-[4/3]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy/25 to-transparent" />
            </div>
          </div>
        </div>
      </div>
    </MuseumSection>
  )
}
