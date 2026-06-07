import { stats } from '../../data/liabahData'
import useCountUp from '../../hooks/useCountUp'

export default function LiabahStats() {
  return (
    <section
      id="liabah-stats"
      dir="rtl"
      className="relative w-full overflow-hidden bg-[#000032] text-white"
    >
      {/* Glow accents */}
      <div className="pointer-events-none absolute top-[-30%] right-[10%] w-[40vw] h-[60vh] rounded-full bg-[#ff8714]/15 blur-[150px]" />

      <div className="relative z-10 max-w-screen-xl mx-auto px-6 md:px-12 lg:px-20 py-20 md:py-24">
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
    <div ref={ref} className="text-center">
      <div
        className="font-heebo font-extrabold text-[#ff8714] leading-none tracking-tight"
        style={{ fontSize: 'clamp(2.6rem, 5vw, 4.5rem)' }}
      >
        {n.toLocaleString('he-IL')}{suffix}
      </div>
      <div className="font-heebo text-white/70 mt-3 text-sm md:text-base leading-snug">
        {label}
      </div>
    </div>
  )
}
