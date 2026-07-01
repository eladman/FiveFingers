import { manifesto } from '../../data/academyData'
import { MuseumSection, Rule } from './shared'
import useReveal from '../../hooks/useReveal'

/**
 * Editorial "wall text": a large thesis statement in a narrow measure, then a
 * calm two-column supporting block. No carousel, no hover-cards.
 */
export default function AcademyManifesto() {
  const ref = useReveal({ selector: '.mf-animate', y: 32, stagger: 0.12, duration: 1.1, start: 'top 80%' })

  return (
    <MuseumSection id="academy-manifesto" watermark>
      <div ref={ref} className="relative z-10 max-w-5xl mx-auto px-6 md:px-10 py-24 md:py-36">
        <p className="mf-animate ds-eyebrow text-orange-ink mb-8">
          {manifesto.kicker}
        </p>

        {/* Thesis — large, narrow measure */}
        <p
          className="mf-animate font-ragmarom text-navy leading-[1.18] max-w-4xl"
          style={{ fontSize: 'clamp(1.7rem, 3.6vw, 3.1rem)' }}
        >
          {manifesto.lead}
        </p>

        <Rule className="mf-animate my-14 max-w-4xl" />

        {/* Supporting copy — two calm columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 max-w-4xl">
          {manifesto.body.map((para, i) => (
            <p
              key={i}
              className="mf-animate font-heebo text-navy/65 leading-relaxed"
              style={{ fontSize: 'clamp(1rem, 1.2vw, 1.18rem)' }}
            >
              {para}
            </p>
          ))}
        </div>
      </div>
    </MuseumSection>
  )
}
