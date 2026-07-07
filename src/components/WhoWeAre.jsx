import useReveal from '../hooks/useReveal'
import useCountUp from '../hooks/useCountUp'

// Movement-wide numbers (mirrors the collaborations "מי אנחנו" catalog figures).
const STATS = [
  { value: 12, suffix: '', label: 'שנות פעילות' },
  { value: 5000, suffix: '+', label: 'בוגרים וחניכים' },
  { value: 100, suffix: '+', label: 'שיתופי פעולה' },
]

export default function WhoWeAre() {
  const ref = useReveal({ selector: '.wwa-el', y: 60, stagger: 0.12, duration: 1.4, start: 'top 75%' })

  return (
    <section
      id="who-we-are"
      ref={ref}
      dir="rtl"
      className="relative z-10 w-full overflow-hidden bg-surface text-navy"
    >
      {/* ── Atmospheric glows ── */}
      <div className="pointer-events-none absolute top-[-10%] right-[15%] w-[60vw] h-[50vh] rounded-full bg-orange/12 blur-[160px]" />
      <div className="pointer-events-none absolute bottom-[-15%] left-[-5%] w-[45vw] h-[55vh] rounded-full bg-orange/8 blur-[140px]" />

      {/* ── Halftone dot grid ── */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: 'radial-gradient(circle, #0d1b4b 1.2px, transparent 1.2px)',
          backgroundSize: '22px 22px',
          opacity: 0.04,
        }}
      />

      <div className="relative z-10 w-full max-w-[1200px] mx-auto px-6 sm:px-10 md:px-14 lg:px-20 pt-24 md:pt-28 lg:pt-32 pb-20 md:pb-24">

        {/* ── Header ── */}
        <div className="wwa-el mb-10 md:mb-14">
          <h2 className="ds-section-title text-navy">
            מי אנחנו
          </h2>
          <div className="flex items-center gap-3 mt-3">
            <span className="h-px w-9 bg-orange shrink-0" />
            <p className="ds-section-subtitle text-[#ff8714]">
              הכירו את התנועה
            </p>
          </div>
        </div>

        {/* ── Body — bold lead statement + supporting copy ── */}
        <div className="grid grid-cols-1 md:grid-cols-[1.15fr_1fr] gap-x-12 lg:gap-x-20 gap-y-8 items-start">

          {/* Lead statement (leading column in RTL = right) */}
          <div className="wwa-el relative pr-5">
            <span className="absolute right-0 top-1.5 bottom-1.5 w-[3px] rounded-full bg-gradient-to-b from-[#ff8714] via-[#ff8714] to-orange/25" />
            <p
              className="font-ragmarom text-navy leading-[1.08]"
              style={{ fontSize: 'clamp(1.9rem, 3.4vw, 3.2rem)' }}
            >
              חמש אצבעות היא <span className="text-[#ff8714]">תנועת נוער חינוכית-חברתית</span> הפועלת בכל רחבי הארץ לפיתוח הדור הבא.
            </p>
          </div>

          {/* Supporting copy (left column) */}
          <div className="wwa-el flex flex-col gap-5">
            <p
              className="font-heebo text-navy/70 leading-relaxed"
              style={{ fontSize: 'clamp(1rem, 1.15vw, 1.2rem)' }}
            >
              מאז 2014 אנחנו מלווים אלפי צעירים וצעירות בגילאי 12 ומעלה, ומפתחים אותם דרך חינוך ערכי, קבוצה מלוכדת וחוויות מאתגרות שמעצבות אופי.
            </p>
            <p
              className="font-heebo text-navy/70 leading-relaxed"
              style={{ fontSize: 'clamp(1rem, 1.15vw, 1.2rem)' }}
            >
              המטרה שלנו היא לאפשר לכל צעיר וצעירה במדינת ישראל לממש את הפוטנציאל שלהם — ולהפוך לאנשים שפועלים מתוך יוזמה ואחריות כדי לשפר את המציאות, על בסיס מצוינות ערכית.
            </p>
          </div>
        </div>

        {/* ── Stats strip ── */}
        <div className="wwa-el mt-14 md:mt-20 pt-10 border-t border-navy/10 grid grid-cols-3 gap-x-6">
          {STATS.map((s) => (
            <StatItem key={s.label} value={s.value} suffix={s.suffix} label={s.label} />
          ))}
        </div>

      </div>
    </section>
  )
}

function StatItem({ value, suffix, label }) {
  const [n, ref] = useCountUp(value)
  return (
    <div
      ref={ref}
      className="relative text-center md:border-s md:border-navy/10 md:first:border-s-0 md:px-3"
    >
      <div
        className="font-heebo font-extrabold text-orange leading-none tracking-tight whitespace-nowrap"
        style={{ fontSize: 'clamp(2rem, 3.6vw, 3.4rem)' }}
      >
        {n.toLocaleString('he-IL')}{suffix}
      </div>
      <div className="font-heebo text-navy/60 mt-3 text-sm md:text-base leading-snug">
        {label}
      </div>
    </div>
  )
}
