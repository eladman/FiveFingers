import LiabahHeroV2 from '../redesign/liabah/LiabahHeroV2'
import LiabahEssenceV2 from '../redesign/liabah/LiabahEssenceV2'
import LiabahJourneyV2 from '../redesign/liabah/LiabahJourneyV2'
import LiabahTracksV2 from '../redesign/liabah/LiabahTracksV2'
import LiabahMap from '../components/liabah/LiabahMap'
import LiabahGallery from '../components/liabah/LiabahGallery'
import LiabahFAQV2 from '../redesign/liabah/LiabahFAQV2'
import LiabahFinaleV2 from '../redesign/liabah/LiabahFinaleV2'

/**
 * The ליבה (Core) page — "Into the Arena" language (see DESIGN.MD §11).
 * Sections butt directly against each other (dark ↔ light rhythm), no
 * SoftDividers. `onContactOpen` opens the shared ContactModal, pre-set
 * to the ליבה (קבוצות הנוער) registration.
 */
export default function LiabahPage({ onContactOpen }) {
  const onRegister = () => onContactOpen?.('קבוצות הנוער')

  return (
    <main>
      <LiabahHeroV2 onRegister={onRegister} />
      <LiabahEssenceV2 />
      <LiabahJourneyV2 />
      <LiabahTracksV2 onRegister={onRegister} />
      <LiabahMap />
      <LiabahGallery />
      <LiabahFAQV2 />
      <LiabahFinaleV2 onRegister={onRegister} />
    </main>
  )
}
