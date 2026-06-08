import { stats } from '../../data/liabahData'
import useCountUp from '../../hooks/useCountUp'
import useReveal from '../../hooks/useReveal'

export default function LiabahStats() {
  const ref = useReveal({ selector: '.stat-item', y: 36, stagger: 0.1, duration: 1, start: 'top 85%' })

  return (
    <section
      id="liabah-stats"
      ref={ref}
      dir="rtl"
      className="relative w-full overflow-hidden bg-navy text-white"
    >
      {/* Subtle glow accent */}
      <div className="pointer-events-none absolute top-[-30%] right-[10%] w-[40vw] h-[60vh] rounded-full bg-orange/10 blur-[160px]" />

      <div className="relative z-10 max-w-screen-xl mx-auto px-6 md:px-12 lg:px-20 py-20 md:py-24">
        <div className="text-center mb-12 md:mb-16">
          <p
            className="stat-item font-heebo font-semibold text-orange mb-3"
            style={{ fontSize: 'clamp(0.7rem, 0.9vw, 0.85rem)', letterSpacing: '0.22em' }}
          >
            במספרים
          </p>
          <h2
            className="stat-item font-ragmarom text-white leading-[0.95] tracking-tight"
            style={{ fontSize: 'clamp(2.2rem, 4vw, 4rem)' }}
          >
            ליבה בתנועה
          </h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-y-12 gap-x-6">
          {stats.map((s) => (
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
      className="stat-item relative text-center lg:border-s lg:border-white/10 lg:first:border-s-0 lg:px-2"
    >
      <div
        className="font-heebo font-extrabold text-orange leading-none tracking-tight"
        style={{ fontSize: 'clamp(2.8rem, 5.2vw, 4.8rem)' }}
      >
        {n.toLocaleString('he-IL')}{suffix}
      </div>
      <div className="font-heebo text-white/70 mt-3 text-sm md:text-base leading-snug">
        {label}
      </div>
    </div>
  )
}
