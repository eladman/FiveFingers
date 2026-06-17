import AcademyHero from '../components/academy/AcademyHero'
import AcademyManifesto from '../components/academy/AcademyManifesto'
import AcademyAxes from '../components/academy/AcademyAxes'
import AcademyPrograms from '../components/academy/AcademyPrograms'
import AcademyImpact from '../components/academy/AcademyImpact'
import AcademyJourney from '../components/academy/AcademyJourney'
import AcademyAdmissions from '../components/academy/AcademyAdmissions'
import AcademyTestimonials from '../components/academy/AcademyTestimonials'
import AcademyGallery from '../components/academy/AcademyGallery'
import AcademyFAQ from '../components/academy/AcademyFAQ'
import AcademyCTA from '../components/academy/AcademyCTA'

/**
 * The אקדמיה (מכינה) page — "museum / scholarly" layout, anchored to the site's
 * shared design system (surface background, orange atmosphere, orange accent) so
 * it reads as the same movement, elevated. Sections are separated by whitespace +
 * hairline rules (no SoftDivider) and use the distinct museum interactions.
 *
 * `onContactOpen` opens the shared ContactModal. Section CTAs pass a per-program
 * tag (מכינה / Boost / כרמל); the page-level default is 'מכינה'.
 */
export default function AcademyPage({ onContactOpen }) {
  const onRegister = (tag) => onContactOpen?.(tag || 'מכינה')

  return (
    <main className="bg-surface">
      <AcademyHero onRegister={onRegister} />
      <AcademyManifesto />
      <AcademyAxes />
      <AcademyPrograms onRegister={onRegister} />
      <AcademyImpact />
      <AcademyJourney />
      <AcademyAdmissions onRegister={onRegister} />
      <AcademyTestimonials />
      <AcademyGallery />
      <AcademyFAQ />
      <AcademyCTA onRegister={onRegister} />
    </main>
  )
}
