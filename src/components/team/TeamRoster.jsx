import { User, Instagram } from 'lucide-react'
import { MuseumSection, MuseumHeading } from '../academy/shared'
import useReveal from '../../hooks/useReveal'
import { roster } from '../../data/teamData'

// Member counts vary per department (4 / 3 / 6) — every group uses the same
// column count (matching בורד ומנכ״לים) so card size stays consistent; groups
// with fewer members just leave the row unfilled instead of stretching.
const GRID_COLS_CLASS = 'grid-cols-2 sm:grid-cols-4'

function MemberCard({ member }) {
  const CardTag = member.instagram ? 'a' : 'div'
  const cardProps = member.instagram
    ? {
        href: member.instagram,
        target: '_blank',
        rel: 'noopener noreferrer',
        'aria-label': `${member.name} באינסטגרם`,
      }
    : {}

  return (
    <CardTag
      {...cardProps}
      className="tr-animate group flex flex-col rounded-2xl overflow-hidden border border-navy/12 bg-white/60 transition-all duration-300 hover:-translate-y-1 hover:border-orange/40 hover:shadow-lg hover:shadow-navy/5"
    >
      {/* Photo placeholder — swap for a real portrait via member.photo */}
      <div
        className="relative w-full flex items-center justify-center"
        style={{ aspectRatio: '4 / 5', background: 'linear-gradient(160deg, #0d1b4b, #1e3578)' }}
      >
        {member.photo ? (
          <img src={member.photo} alt={member.name} className="absolute inset-0 w-full h-full object-cover" />
        ) : (
          <User size={40} className="text-white/30" strokeWidth={1.5} />
        )}
      </div>

      <div className="flex flex-col text-right p-5">
        <div className="flex items-center justify-between gap-2">
          <h4 className="font-heebo font-bold text-navy text-base leading-snug">{member.name}</h4>
          {member.instagram && (
            <Instagram size={18} strokeWidth={1.75} className="shrink-0 text-navy/40 transition-colors group-hover:text-orange" />
          )}
        </div>
        <p className="font-heebo text-orange-ink text-sm font-semibold mt-1">{member.title}</p>
        <p className="font-heebo text-navy/60 text-sm leading-relaxed mt-3">{member.bio}</p>
      </div>
    </CardTag>
  )
}

function MemberGroup({ group }) {
  return (
    <div className="tr-animate">
      <div className="flex items-center gap-3 mb-7">
        <span className="h-px w-9 bg-orange shrink-0" />
        <h3 className="font-ragmarom text-navy" style={{ fontSize: 'clamp(1.4rem, 2.2vw, 1.9rem)' }}>
          {group.title}
        </h3>
      </div>
      <div className={`grid ${GRID_COLS_CLASS} gap-5 md:gap-6`}>
        {group.members.map((member) => (
          <MemberCard key={member.id} member={member} />
        ))}
      </div>
    </div>
  )
}

/**
 * "האנשים שמניעים את חמש אצבעות" — the actual team roster (board, managers,
 * staff), as opposed to the recruitment tracks further down the page. Photos,
 * names and bios are placeholders (see teamData.roster) until real content
 * lands. This is the page's first content section, right after the hero.
 */
export default function TeamRoster() {
  const ref = useReveal({ selector: '.tr-animate', y: 26, stagger: 0.06, duration: 1, start: 'top 85%' })

  return (
    <MuseumSection id="team-roster" bg="surface" watermark>
      <div ref={ref} className="relative z-10 max-w-6xl mx-auto px-6 md:px-10 py-24 md:py-32">
        <MuseumHeading
          kicker={roster.eyebrow}
          title={roster.title}
          lead={roster.lead}
          align="center"
          animateClass="tr-animate"
        />

        <div className="mt-16 space-y-16 md:space-y-20">
          {roster.groups.map((group) => (
            <MemberGroup key={group.id} group={group} />
          ))}
        </div>
      </div>
    </MuseumSection>
  )
}
