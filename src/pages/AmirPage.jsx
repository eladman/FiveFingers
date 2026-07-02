import AmirHero from '../components/amir/AmirHero'
import AmirIntro from '../components/amir/AmirIntro'
import AmirZones from '../components/amir/AmirZones'
import AmirContentWorlds from '../components/amir/AmirContentWorlds'
import AmirCTA from '../components/amir/AmirCTA'
import SoftDivider from '../components/SoftDivider'

/**
 * עמיר מנחם — the founder's personal-brand page. He is both the founder & chairman
 * of חמש אצבעות and a standalone brand (lectures, the 0→1 workshop, personal
 * mentoring, and the "האדם בזירה" podcast).
 *
 * Same design system as the program pages, but leaning into the cinematic dark
 * "האדם בזירה" styling so it reads as a distinct sub-brand within the family.
 * Section rhythm: dark hero → light intro → light zones → light content → dark CTA.
 *
 * `onContactOpen` opens the shared ContactModal; section CTAs tag it per zone.
 */
export default function AmirPage({ onContactOpen }) {
  // 'קשר עם עמיר' matches the ContactModal interest chip so it preselects.
  const onBook = (label = 'קשר עם עמיר') => onContactOpen?.(label)

  return (
    <main className="bg-surface">
      <AmirHero onBook={() => onBook()} />
      <SoftDivider fromColor="#081028" toColor="#ffffff" blend={false} />
      <AmirIntro />
      <SoftDivider fromColor="#ffffff" toColor="#fafaf8" blend={false} />
      <AmirZones onBook={onBook} />
      <SoftDivider fromColor="#fafaf8" toColor="#ffffff" blend={false} />
      <AmirContentWorlds />
      <SoftDivider fromColor="#ffffff" toColor="#0d1b4b" blend={false} />
      <AmirCTA onBook={() => onBook()} />
    </main>
  )
}
