import SectionDivider from '../components/SectionDivider'
import LiabahHero from '../components/liabah/LiabahHero'
import LiabahEssence from '../components/liabah/LiabahEssence'
import LiabahStats from '../components/liabah/LiabahStats'
import LiabahPrograms from '../components/liabah/LiabahPrograms'
import LiabahYear from '../components/liabah/LiabahYear'
import LiabahTraining from '../components/liabah/LiabahTraining'
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
      <SectionDivider fromColor="#0a0a0f" toColor="#fafaf8" />
      <LiabahEssence />
      <SectionDivider fromColor="#fafaf8" toColor="#000032" reverse />
      <LiabahStats />
      <SectionDivider fromColor="#000032" toColor="#ffffff" />
      <LiabahPrograms onRegister={onRegister} />
      <SectionDivider fromColor="#ffffff" toColor="#fafaf8" reverse />
      <LiabahYear />
      <SectionDivider fromColor="#fafaf8" toColor="#ffffff" />
      <LiabahTraining />
      <SectionDivider fromColor="#ffffff" toColor="#fafaf8" reverse />
      <LiabahCoaches />
      <SectionDivider fromColor="#fafaf8" toColor="#ffffff" />
      <LiabahMap />
      <SectionDivider fromColor="#ffffff" toColor="#fafaf8" reverse />
      <LiabahGallery />
      <SectionDivider fromColor="#fafaf8" toColor="#ffffff" />
      <LiabahFAQ />
      <SectionDivider fromColor="#ffffff" toColor="#000032" reverse />
      <LiabahCTA onRegister={onRegister} />
    </main>
  )
}
