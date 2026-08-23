import AcademyHero from '../components/academy/AcademyHero'
import AcademyManifesto from '../components/academy/AcademyManifesto'
import AcademyAxes from '../components/academy/AcademyAxes'
import AcademyPrograms from '../components/academy/AcademyPrograms'
import AcademyJourney from '../components/academy/AcademyJourney'
import AcademyAdmissions from '../components/academy/AcademyAdmissions'
import AcademyGallery from '../components/academy/AcademyGallery'
import AcademyFAQ from '../components/academy/AcademyFAQ'
import AcademyCTA from '../components/academy/AcademyCTA'
import SoftDivider from '../components/SoftDivider'

/**
 * The אקדמיה (מכינה) page — converged with the site's cinematic design system:
 * a full-bleed hero, ds-* typography, and SoftDivider seams between gently banded
 * sections (surface / surface-2 / white), so it reads as the same movement as the
 * home + ליבה pages.
 *
 * `onContactOpen` opens the shared ContactModal. Section CTAs pass a per-program
 * tag (מכינה / Boost / כרמל); the page-level default is 'מכינה'.
 */
export default function AcademyPage({ onContactOpen }) {
  const onRegister = (tag) => onContactOpen?.(tag || 'מכינה')

  return (
    <main className="bg-surface">
      <AcademyHero onRegister={onRegister} />
      {/* No seam divider here — like the homepage, AcademyManifesto floats up over the hero's dark base as a sheet */}
      <AcademyManifesto />
      <SoftDivider fromColor="#fafaf8" toColor="#ffffff" />
      <AcademyAxes />
      <SoftDivider fromColor="#ffffff" toColor="#f7f5f2" />
      <AcademyPrograms onRegister={onRegister} />
      <AcademyJourney />
      <SoftDivider fromColor="#f7f5f2" toColor="#ffffff" />
      <AcademyAdmissions onRegister={onRegister} />
      <SoftDivider fromColor="#ffffff" toColor="#f7f5f2" />
      <AcademyGallery />
      <SoftDivider fromColor="#f7f5f2" toColor="#fafaf8" />
      <AcademyFAQ />
      <SoftDivider fromColor="#fafaf8" toColor="#ffffff" />
      <AcademyCTA onRegister={onRegister} />
    </main>
  )
}
