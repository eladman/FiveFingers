import CollabsHero from '../components/collabs/hero-versions/HeroCorporateSplit'
import CollabsStats from '../components/collabs/CollabsStats'
import CollabsIntro from '../components/collabs/CollabsIntro'
import CollabsProcess from '../components/collabs/CollabsProcess'
import CollabsContentWorlds from '../components/collabs/CollabsContentWorlds'
import CollabsFormats from '../components/collabs/CollabsFormats'
import CollabsTeam from '../components/collabs/CollabsTeam'
import CollabsPartners from '../components/collabs/CollabsPartners'
import CollabsCTA from '../components/collabs/CollabsCTA'
import SoftDivider from '../components/SoftDivider'

/**
 * The שיתופי פעולה (Collaborations) page — "קמפוס חמש אצבעות / בית תוכן והכשרות",
 * the movement's B2B offering for organizations, teams, units and athletes.
 *
 * Content is drawn from the "5 Fingers Catalog" PDF. The hero is the light
 * "פיצול תאגידי" (Corporate Split) B2B direction — a value-prop headline, a
 * framed proof image + stat chip, and a partner trust strip — over the shared
 * navy stat band, SoftDividers and GSAP reveals.
 *
 * `onContactOpen` opens the shared ContactModal; section CTAs tag it 'שיתופי פעולה'.
 */
export default function CollaborationsPage({ onContactOpen }) {
  const onRegister = () => onContactOpen?.('שיתופי פעולה')

  return (
    <main className="bg-surface">
      <CollabsHero onRegister={onRegister} />
      {/* No divider — hero and stats share the warm bg-surface, so they flow seamlessly */}
      <CollabsStats />
      <SoftDivider fromColor="#fafaf8" toColor="#ffffff" />
      <CollabsIntro />
      <SoftDivider fromColor="#ffffff" toColor="#fafaf8" />
      <CollabsProcess />
      <SoftDivider fromColor="#fafaf8" toColor="#ffffff" />
      <CollabsContentWorlds />
      <SoftDivider fromColor="#ffffff" toColor="#f7f5f2" />
      <CollabsFormats onRegister={onRegister} />
      <SoftDivider fromColor="#f7f5f2" toColor="#0d1b4b" blend={false} />
      <CollabsTeam />
      <SoftDivider fromColor="#0d1b4b" toColor="#fafaf8" blend={false} />
      <CollabsPartners />
      <SoftDivider fromColor="#fafaf8" toColor="#0d1b4b" blend={false} />
      <CollabsCTA onRegister={onRegister} />
    </main>
  )
}
