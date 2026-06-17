import { stats } from '../../data/academyData'
import { MuseumSection, MuseumHeading } from './shared'
import useCountUp from '../../hooks/useCountUp'
import useReveal from '../../hooks/useReveal'

/**
 * Impact ribbon — large refined numbers separated by hairlines on parchment.
 * Donor-credible framing; restrained count-up. No navy band, no orange glow.
 */
export default function AcademyImpact() {
  const ref = useReveal({ selector: '.im-animate', y: 28, stagger: 0.1, duration: 1, start: 'top 84%' })

  return (
    <MuseumSection id="academy-impact">
      <div ref={ref} className="relative z-10 max-w-5xl mx-auto px-6 md:px-10 py-24 md:py-32">
        <MuseumHeading kicker="במספרים" title="האימפקט שלנו" animateClass="im-animate" />

        <div className="mt-16 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 border-t border-navy/12 divide-x divide-navy/12 [&>*]:border-b [&>*]:border-navy/12">
          {stats.map((s) => (
            <StatCell key={s.label} value={s.value} suffix={s.suffix} label={s.label} />
          ))}
        </div>
      </div>
    </MuseumSection>
  )
}

function StatCell({ value, suffix, label }) {
  const [n, ref] = useCountUp(value)
  return (
    <div
      ref={ref}
      className="im-animate text-center px-3 py-8"
    >
      <div
        className="font-ragmarom text-navy leading-none tracking-tight tabular-nums"
        style={{ fontSize: 'clamp(2.6rem, 4.4vw, 4rem)' }}
      >
        {n.toLocaleString('he-IL')}
        <span className="text-orange">{suffix}</span>
      </div>
      <div className="font-heebo text-navy/55 mt-3 text-sm leading-snug">{label}</div>
    </div>
  )
}
