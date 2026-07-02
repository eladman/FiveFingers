import { STATS } from '../../data/alumniData'
import useCountUp from '../../hooks/useCountUp'
import useReveal from '../../hooks/useReveal'

/**
 * "בוגרים במספרים" — dark navy band with animated counters (mirrors LiabahStats).
 * Movement-wide graduate figures plus a couple of תוכנית יואב facts.
 */
export default function AlumniStats() {
  const ref = useReveal({ selector: '.stat-item', y: 36, stagger: 0.1, duration: 1, start: 'top 85%' })

  return (
    <section
      id="alumni-stats"
      ref={ref}
      dir="rtl"
      className="relative w-full overflow-hidden bg-navy text-white"
    >
      {/* Subtle glow accents — orange warmth top-right, navy-light lift bottom-left for depth */}
      <div className="pointer-events-none absolute top-[-30%] right-[10%] w-[40vw] h-[60vh] rounded-full bg-orange/10 blur-[160px]" />
      <div className="pointer-events-none absolute bottom-[-20%] left-[6%] w-[42vw] h-[50vh] rounded-full bg-navy-light/30 blur-[150px]" />

      <div className="relative z-10 max-w-screen-xl mx-auto px-6 md:px-12 lg:px-20 py-20 md:py-24">
        <div className="text-center mb-12 md:mb-16">
          <p
            className="stat-item font-heebo font-semibold text-orange mb-3 uppercase"
            style={{ fontSize: 'clamp(0.7rem, 0.9vw, 0.85rem)', letterSpacing: '0.22em' }}
          >
            במספרים
          </p>
          <h2
            className="stat-item font-ragmarom text-white leading-[0.95] tracking-tight"
            style={{ fontSize: 'clamp(2.2rem, 4vw, 4rem)' }}
          >
            בוגרים בתנועה
          </h2>
          <div className="stat-item mt-5 mx-auto h-1 rounded-full bg-orange" style={{ width: 'clamp(3.5rem, 7vw, 6rem)' }} />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-y-12 gap-x-6">
          {STATS.map((s) => (
            <StatItem key={s.label} value={s.value} suffix={s.suffix} label={s.label} plain={s.plain} />
          ))}
        </div>
      </div>
    </section>
  )
}

function StatItem({ value, suffix, label, plain }) {
  const [n, ref] = useCountUp(value)
  return (
    <div
      ref={ref}
      className="stat-item relative text-center md:border-s md:border-white/10 md:first:border-s-0 md:px-3"
    >
      <div
        className="font-heebo font-extrabold text-orange leading-none tracking-tight whitespace-nowrap"
        style={{ fontSize: 'clamp(2.4rem, 4vw, 3.6rem)' }}
      >
        {plain ? n : n.toLocaleString('he-IL')}{suffix}
      </div>
      <div className="font-heebo text-white/70 mt-3 leading-snug" style={{ fontSize: 'clamp(0.875rem, 1.1vw, 1rem)' }}>
        {label}
      </div>
    </div>
  )
}
