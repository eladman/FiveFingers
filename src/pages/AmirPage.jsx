import AmirHeroV2 from '../redesign/amir/AmirHeroV2'
import AmirEssenceV2 from '../redesign/amir/AmirEssenceV2'
import AmirZonesV2 from '../redesign/amir/AmirZonesV2'
import AmirContentV2 from '../redesign/amir/AmirContentV2'
import AmirFinaleV2 from '../redesign/amir/AmirFinaleV2'

/**
 * עמיר מנחם — the founder's personal-brand page, "Into the Arena" language
 * (see DESIGN.MD §11). He is both the founder & chairman of חמש אצבעות and a
 * standalone brand (lectures, the 0→1 workshop, personal mentoring, and the
 * "האדם בזירה" podcast) — the hero leans into that sub-brand.
 *
 * Sections butt directly against each other (dark ↔ light rhythm), no
 * SoftDividers. `onContactOpen` opens the shared ContactModal; section CTAs
 * tag it per zone ('קשר עם עמיר' matches the interest chip so it preselects).
 */
export default function AmirPage({ onContactOpen }) {
  const onBook = (label = 'קשר עם עמיר') => onContactOpen?.(label)

  return (
    <main>
      <AmirHeroV2 onBook={() => onBook()} />
      <AmirEssenceV2 />
      <AmirZonesV2 onBook={onBook} />
      <AmirContentV2 />
      <AmirFinaleV2 onBook={() => onBook()} />
    </main>
  )
}
