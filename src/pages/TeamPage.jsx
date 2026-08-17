import TeamHeroV2 from '../redesign/team/TeamHeroV2'
import TeamEssenceV2 from '../redesign/team/TeamEssenceV2'
import TeamTracksV2 from '../redesign/team/TeamTracksV2'
import TeamPathV2 from '../redesign/team/TeamPathV2'
import TeamFinaleV2 from '../redesign/team/TeamFinaleV2'

/**
 * The צוות (Team / Staff) page — "Into the Arena" language (see DESIGN.MD
 * §11): dark poster hero, "the movement is its people" statement with the
 * real leadership faces (placeholder roster members are filtered out and
 * return automatically as real content lands in teamData), the three
 * recruitment tracks as cinematic rows, the coach entry path as the pinned
 * signature, and one door. `onContactOpen` opens the shared ContactModal;
 * each track passes its tag (מאמן/ת / הדרכה בהזנק / צוות מטה).
 */
export default function TeamPage({ onContactOpen }) {
  const onRegister = (tag) => onContactOpen?.(tag || 'מאמן/ת')

  return (
    <main>
      <TeamHeroV2 onRegister={onRegister} />
      <TeamEssenceV2 />
      <TeamTracksV2 onRegister={onRegister} />
      <TeamPathV2 onRegister={onRegister} />
      <TeamFinaleV2 onRegister={onRegister} />
    </main>
  )
}
