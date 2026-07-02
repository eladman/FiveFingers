import useCountUp from '../../hooks/useCountUp'
import useReveal from '../../hooks/useReveal'
import { SectionBg } from '../liabah/shared'

// Movement-wide numbers, from the catalog's "מי אנחנו" page.
const STATS = [
  { value: 50000, suffix: '+', label: 'שעות אימון והדרכה' },
  { value: 10000, suffix: '+', label: 'בוגרים וחניכים' },
  { value: 100, suffix: '+', label: 'ארגונים שותפים' },
  { value: 12, suffix: '', label: 'שנות פעילות' },
]

/**
 * Stats band with animated counters. Sits directly under the hero as the first
 * light content sheet (bg-surface, navy text, orange numbers) so the hero flows
 * into light content with no blue seam — matching the homepage's hero → מי אנחנו
 * handoff.
 */
export default function CollabsStats() {
  const ref = useReveal({ selector: '.stat-item', y: 36, stagger: 0.1, duration: 1, start: 'top 85%' })

  return (
    <section
      id="collabs-stats"
      ref={ref}
      dir="rtl"
      className="relative z-10 w-full overflow-hidden bg-surface text-navy"
    >
      <SectionBg watermark={false} />

      <div className="relative z-10 max-w-screen-xl mx-auto px-6 md:px-12 lg:px-20 py-20 md:py-24">
        <div className="text-center mb-12 md:mb-16">
          <p
            className="stat-item font-heebo font-semibold text-orange mb-3"
            style={{ fontSize: 'clamp(0.7rem, 0.9vw, 0.85rem)', letterSpacing: '0.22em' }}
          >
            במספרים
          </p>
          <h2
            className="stat-item font-ragmarom text-navy leading-[0.95] tracking-tight"
            style={{ fontSize: 'clamp(2.2rem, 4vw, 4rem)' }}
          >
            חמש אצבעות בתנועה
          </h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-y-12 gap-x-6">
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
      className="stat-item relative text-center md:border-s md:border-navy/10 md:first:border-s-0 md:px-3"
    >
      <div
        className="font-heebo font-extrabold text-orange leading-none tracking-tight whitespace-nowrap"
        style={{ fontSize: 'clamp(2.4rem, 4vw, 3.6rem)' }}
      >
        {n.toLocaleString('he-IL')}{suffix}
      </div>
      <div className="font-heebo text-navy/60 mt-3 text-sm md:text-base leading-snug">
        {label}
      </div>
    </div>
  )
}
