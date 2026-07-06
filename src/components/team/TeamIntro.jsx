import { ChevronLeft } from 'lucide-react'
import { MuseumSection, MuseumHeading } from '../academy/shared'
import useReveal from '../../hooks/useReveal'
import { intro } from '../../data/teamData'

/**
 * Light intro sheet that rises over the hero (no seam divider above it, like the
 * homepage / ליבה essence). Frames the movement's "built by its people" idea and
 * teases the three tracks as anchor cards.
 */
export default function TeamIntro() {
  const ref = useReveal({ selector: '.ti-animate', y: 28, stagger: 0.1, duration: 1.1, start: 'top 85%' })

  return (
    <MuseumSection id="team-intro" bg="surface" watermark>
      <div ref={ref} className="relative z-10 max-w-5xl mx-auto px-6 md:px-10 py-24 md:py-32">
        <MuseumHeading
          kicker={intro.eyebrow}
          title={intro.title}
          lead={intro.lead}
          align="center"
          animateClass="ti-animate"
        />

        <p className="ti-animate font-heebo text-navy/70 text-lg md:text-xl leading-relaxed max-w-3xl mx-auto text-center mt-8">
          {intro.body}
        </p>

        {/* Track teasers — anchor into each role section */}
        <div className="ti-animate grid grid-cols-1 md:grid-cols-3 gap-5 mt-14">
          {intro.tracks.map((track) => (
            <a
              key={track.id}
              href={track.target}
              className="group flex flex-col rounded-2xl border border-navy/12 bg-white/60 p-7 text-right transition-all duration-300 hover:-translate-y-1 hover:border-orange/40 hover:shadow-lg hover:shadow-navy/5"
            >
              <span className="ds-card-title text-navy group-hover:text-orange-ink transition-colors">
                {track.label}
              </span>
              <span className="font-heebo text-navy/60 text-base leading-relaxed mt-2 flex-1">
                {track.blurb}
              </span>
              <span className="inline-flex items-center gap-1 text-orange-ink font-heebo font-semibold text-sm mt-5">
                גלו עוד
                <ChevronLeft size={16} className="transition-transform duration-300 group-hover:-translate-x-1" />
              </span>
            </a>
          ))}
        </div>
      </div>
    </MuseumSection>
  )
}
