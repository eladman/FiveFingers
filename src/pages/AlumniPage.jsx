import AlumniHeroV2 from '../redesign/alumni/AlumniHeroV2'
import AlumniEssenceV2 from '../redesign/alumni/AlumniEssenceV2'
import AlumniYoavV2 from '../redesign/alumni/AlumniYoavV2'
import AlumniFinaleV2 from '../redesign/alumni/AlumniFinaleV2'

/**
 * בוגרים — the alumni page, "Into the Arena" language (see DESIGN.MD §11).
 * The page funnels to תוכנית יואב (the flagship alumni program) at
 * https://www.yoavprogram.com/: dark hero → light essence (community + the
 * movement numbers, merged) → dark Yoav main event → photo finale.
 *
 * Sections butt directly against each other (dark ↔ light rhythm), no
 * SoftDividers. `onContactOpen` opens the shared ContactModal tagged 'בוגרים'.
 */
export default function AlumniPage({ onContactOpen }) {
  const onBook = () => onContactOpen?.('בוגרים')

  return (
    <main>
      <AlumniHeroV2 onBook={onBook} />
      <AlumniEssenceV2 />
      <AlumniYoavV2 />
      <AlumniFinaleV2 onBook={onBook} />
    </main>
  )
}
