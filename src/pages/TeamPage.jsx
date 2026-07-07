import SoftDivider from '../components/SoftDivider'
import TeamHero from '../components/team/TeamHero'
import TeamRoster from '../components/team/TeamRoster'
import TeamIntro from '../components/team/TeamIntro'
import TeamCoach from '../components/team/TeamCoach'
import TeamInstructor from '../components/team/TeamInstructor'
import TeamHq from '../components/team/TeamHq'
import TeamCTA from '../components/team/TeamCTA'

/**
 * The צוות (Team / Staff) page — opens with the actual team roster (board,
 * managers, staff), then becomes a recruitment funnel for people 20+ to join
 * the movement's staff. Mirrors the ליבה page architecture: a cinematic hero,
 * warm-light sections with the shared atmosphere, and navy accent bands for
 * the מאמן centerpiece and the closing CTA. `onContactOpen` opens the shared
 * ContactModal; each section passes a per-track tag (מאמן/ת / מדריך/ה בהזנק / צוות מטה).
 */
export default function TeamPage({ onContactOpen }) {
  const onRegister = (tag) => onContactOpen?.(tag || 'מאמן/ת')

  return (
    <main>
      <TeamHero onRegister={onRegister} />
      {/* No divider — the light hero (surface) flows seamlessly into the roster + intro sheets */}
      <TeamRoster />
      <TeamIntro />
      <SoftDivider fromColor="#fafaf8" toColor="#0d1b4b" blend={false} />
      <TeamCoach onRegister={onRegister} />
      <SoftDivider fromColor="#0d1b4b" toColor="#ffffff" blend={false} />
      <TeamInstructor onRegister={onRegister} />
      <SoftDivider fromColor="#ffffff" toColor="#fafaf8" />
      <TeamHq onRegister={onRegister} />
      <SoftDivider fromColor="#fafaf8" toColor="#0d1b4b" blend={false} />
      <TeamCTA onRegister={onRegister} />
    </main>
  )
}
