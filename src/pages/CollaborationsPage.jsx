import CollabsHeroV2 from '../redesign/collabs/CollabsHeroV2'
import CollabsEssenceV2 from '../redesign/collabs/CollabsEssenceV2'
import CollabsTrustV2 from '../redesign/collabs/CollabsTrustV2'
import CollabsCatalogV2 from '../redesign/collabs/CollabsCatalogV2'
import CollabsProcessV2 from '../redesign/collabs/CollabsProcessV2'
import CollabsQuoteV2 from '../redesign/collabs/CollabsQuoteV2'
import CollabsFinaleV2 from '../redesign/collabs/CollabsFinaleV2'

/**
 * The שיתופי פעולה (Collaborations) page — "Into the Arena" language
 * (see DESIGN.MD §11), tuned for a B2B voice: dark poster hero with the
 * movement's numbers, one belief statement, a partner trust marquee,
 * the product catalog as the dark signature, a quick four-step process,
 * the מנכ״לית quote monument, and one door.
 *
 * `onContactOpen` opens the shared ContactModal; CTAs tag it 'שיתופי פעולה'.
 */
export default function CollaborationsPage({ onContactOpen }) {
  const onRegister = () => onContactOpen?.('שיתופי פעולה')

  return (
    <main>
      <CollabsHeroV2 onRegister={onRegister} />
      <CollabsEssenceV2 />
      <CollabsTrustV2 />
      <CollabsCatalogV2 onRegister={onRegister} />
      <CollabsProcessV2 />
      <CollabsQuoteV2 />
      <CollabsFinaleV2 onRegister={onRegister} />
    </main>
  )
}
