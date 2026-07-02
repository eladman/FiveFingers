import AlumniHero from '../components/alumni/AlumniHero'
import AlumniStats from '../components/alumni/AlumniStats'
import AlumniIntro from '../components/alumni/AlumniIntro'
import YoavProgram from '../components/alumni/YoavProgram'
import AlumniCTA from '../components/alumni/AlumniCTA'
import SoftDivider from '../components/SoftDivider'

/**
 * בוגרים — the alumni page. Shows a few movement-wide graduate numbers plus short
 * context, then funnels to תוכנית יואב (the flagship alumni program), linking out
 * to https://www.yoavprogram.com/.
 *
 * Same design system + section rhythm as the other program pages:
 * dark hero → navy stats → light intro → navy Yoav (the main event) → dark CTA.
 *
 * `onContactOpen` opens the shared ContactModal (secondary CTAs).
 */
export default function AlumniPage({ onContactOpen }) {
  return (
    <main className="bg-surface">
      <AlumniHero onContactOpen={onContactOpen} />
      <SoftDivider fromColor="#081028" toColor="#0d1b4b" blend={false} />
      <AlumniStats />
      <SoftDivider fromColor="#0d1b4b" toColor="#ffffff" blend={false} />
      <AlumniIntro />
      <SoftDivider fromColor="#ffffff" toColor="#1a2f6b" blend={false} />
      <YoavProgram />
      <SoftDivider fromColor="#081028" toColor="#0d1b4b" blend={false} />
      <AlumniCTA onContactOpen={onContactOpen} />
    </main>
  )
}
