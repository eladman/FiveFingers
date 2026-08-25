import useReveal from '../hooks/useReveal'
import useCountUp from '../hooks/useCountUp'

// Movement-wide numbers (mirrors the collaborations "מי אנחנו" catalog figures).
const STATS = [
  { value: 12, suffix: '', label: 'שנות פעילות' },
  { value: 5000, suffix: '+', label: 'בוגרים וחניכים' },
  { value: 100, suffix: '+', label: 'שיתופי פעולה' },
]

export default function WhoWeAre() {
  const ref = useReveal({ selector: '.wwa-el', y: 48, stagger: 0.14, duration: 1.4, start: 'top 78%' })

  return (
    <section
      id="who-we-are"
      ref={ref}
      dir="rtl"
      className="relative z-10 w-full overflow-hidden bg-surface text-navy flex items-center min-h-[100dvh]"
    >
      {/* One soft glow — brand warmth, nothing more */}
      <div className="pointer-events-none absolute top-1/2 right-1/2 -translate-y-1/2 translate-x-1/2 w-[70vw] h-[60vh] rounded-full bg-orange/10 blur-[180px]" />

      <div className="relative z-10 w-full max-w-[1080px] mx-auto px-6 sm:px-10 md:px-14 py-24 md:py-28 text-center">

        {/* Kicker */}
        <div className="wwa-el flex items-center justify-center gap-3 mb-7 md:mb-9">
          <span className="h-px w-8 bg-orange/70" />
          <span className="ds-eyebrow text-[#ff8714]">מי אנחנו</span>
          <span className="h-px w-8 bg-orange/70" />
        </div>

        {/* The statement — the hero of the section */}
        <h2
          className="wwa-el font-ragmarom text-navy leading-[1.06] mx-auto max-w-[13ch] md:max-w-[24ch]"
          style={{ fontSize: 'clamp(2.3rem, 5.4vw, 4.6rem)' }}
        >
          חמש אצבעות היא{' '}
          <span className="text-[#ff8714]">תנועה חינוכית-חברתית</span>{' '}
          הפועלת בכל רחבי הארץ לפיתוח הדור הבא.
        </h2>

        {/* Condensed mission — one calm sentence under the statement */}
        <p
          className="wwa-el font-heebo text-navy/70 leading-relaxed mx-auto max-w-[46ch] mt-8 md:mt-10"
          style={{ fontSize: 'clamp(1.05rem, 1.35vw, 1.3rem)' }}
        >
          מאז 2014 אנחנו מלווים אלפי צעירים וצעירות מגיל 10 ומעלה - ומאפשרים לכל אחד ואחת
          לממש את הפוטנציאל שלהם ולפעול מתוך יוזמה ואחריות, על בסיס{' '}
          <span className="text-navy font-semibold">מצוינות ערכית</span>.
        </p>

        {/* Numbers as quiet proof — same section, kept tight */}
        <div className="wwa-el mt-12 md:mt-16 mx-auto max-w-[720px] grid grid-cols-3 gap-x-6">
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
