import { axes } from '../../data/academyData'
import { MuseumSection, MuseumHeading } from './shared'
import useReveal from '../../hooks/useReveal'

/**
 * The five educational axes (צירים) as a calm, ruled catalog list —
 * index + title + one-line description per row, separated by hairlines.
 * Museum-collection feel; no colored icon-chip hover cards.
 */
export default function AcademyAxes() {
  const ref = useReveal({ selector: '.ax-animate', y: 28, stagger: 0.08, duration: 1, start: 'top 82%' })

  return (
    <MuseumSection id="academy-axes" bg="white">
      <div ref={ref} className="relative z-10 max-w-5xl mx-auto px-6 md:px-10 py-24 md:py-32">
        <MuseumHeading
          kicker="התפיסה החינוכית"
          title="חמשת הצירים"
          lead="חמישה צירים שעובדים יחד לבניית מנהיגות ערכית."
          align="start"
          animateClass="ax-animate"
        />

        <div className="mt-16 border-t border-navy/12">
          {axes.map((item, i) => (
            <div
              key={item.title}
              className="ax-animate group grid grid-cols-[auto_1fr] md:grid-cols-[5rem_1fr_1.4fr] gap-x-6 md:gap-x-10 gap-y-2 items-baseline py-7 md:py-9 border-b border-navy/12"
            >
              <span
                className="font-ragmarom text-navy/25 leading-none tabular-nums transition-colors duration-300 group-hover:text-orange"
                style={{ fontSize: 'clamp(1.6rem, 2.4vw, 2.4rem)' }}
              >
                {i + 1}
              </span>
              <h3
                className="font-heebo font-bold text-navy leading-tight"
                style={{ fontSize: 'clamp(1.25rem, 1.9vw, 1.7rem)' }}
              >
                {item.title}
              </h3>
              <p className="col-span-2 md:col-span-1 font-heebo text-navy/60 leading-relaxed" style={{ fontSize: '1rem' }}>
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </MuseumSection>
  )
}
