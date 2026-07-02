import SoftDivider from '../components/SoftDivider'
import LiabahHero from '../components/liabah/LiabahHero'
import LiabahEssence from '../components/liabah/LiabahEssence'
import LiabahStats from '../components/liabah/LiabahStats'
import LiabahPrograms from '../components/liabah/LiabahPrograms'
import LiabahYear from '../components/liabah/LiabahYear'
import LiabahCoaches from '../components/liabah/LiabahCoaches'
import LiabahMap from '../components/liabah/LiabahMap'
import LiabahGallery from '../components/liabah/LiabahGallery'
import LiabahFAQ from '../components/liabah/LiabahFAQ'
import LiabahCTA from '../components/liabah/LiabahCTA'

/**
 * The ליבה (Core) page. `onContactOpen` opens the shared ContactModal,
 * pre-set to the ליבה (קבוצות הנוער) registration.
 */
export default function LiabahPage({ onContactOpen }) {
  const onRegister = () => onContactOpen?.('קבוצות הנוער')

  return (
    <main>
      <LiabahHero onRegister={onRegister} />
      {/* No divider — the light essence sheet rises directly over the hero's neutral base */}
      <LiabahEssence />
      <SoftDivider fromColor="#fafaf8" toColor="#0d1b4b" blend={false} />
      <LiabahStats />
      <SoftDivider fromColor="#0d1b4b" toColor="#ffffff" blend={false} />
      <LiabahPrograms onRegister={onRegister} />
      <SoftDivider fromColor="#ffffff" toColor="#fafaf8" />
      <LiabahYear />
      <SoftDivider fromColor="#fafaf8" toColor="#fafaf8" />
      <LiabahCoaches />
      <SoftDivider fromColor="#fafaf8" toColor="#ffffff" />
      <LiabahMap />
      <SoftDivider fromColor="#ffffff" toColor="#fafaf8" />
      <LiabahGallery />
      <SoftDivider fromColor="#fafaf8" toColor="#ffffff" />
      <LiabahFAQ />
      <SoftDivider fromColor="#ffffff" toColor="#0d1b4b" blend={false} />
      <LiabahCTA onRegister={onRegister} />
    </main>
  )
}
