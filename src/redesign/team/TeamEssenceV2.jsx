import { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Instagram } from 'lucide-react'
import { roster } from '../../data/teamData'

gsap.registerPlugin(ScrollTrigger)

/**
 * First breath after the dark hero — the movement is its people.
 * A masked word-reveal statement + two support columns (the IntroV2
 * language), then the real leadership faces as duotone portraits.
 * Placeholder roster members are filtered out — real people appear
 * automatically as their content lands in teamData.
 */

const STATEMENT = [
  { t: 'חמש', hl: false },
  { t: 'אצבעות', hl: false },
  { t: 'נבנית', hl: false },
  { t: 'מהאנשים', hl: true },
  { t: 'שבתוכה.', hl: true },
]

// Only members with a real portrait + name make the wall.
const REAL_MEMBERS = roster.groups
  .flatMap((g) => g.members)
  .filter((m) => m.photo && m.name !== 'שם ותפקיד')

export default function TeamEssenceV2() {
  const ref = useRef(null)

  useLayoutEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const ctx = gsap.context(() => {
      if (reduced) return

      gsap.fromTo('.tes-word > span',
        { yPercent: 115 },
        {
          yPercent: 0,
          stagger: 0.05,
          duration: 0.9,
          ease: 'power4.out',
          scrollTrigger: { trigger: '.tes-statement', start: 'top 78%', once: true },
        }
      )

      gsap.fromTo('.tes-support',
        { y: 36, opacity: 0 },
        {
          y: 0, opacity: 1, stagger: 0.14, duration: 1,
          ease: 'power3.out',
          scrollTrigger: { trigger: '.tes-supportwrap', start: 'top 80%', once: true },
        }
      )

      gsap.fromTo('.tes-band',
        { y: 48, opacity: 0, scale: 0.98 },
        {
          y: 0, opacity: 1, scale: 1, duration: 1.1,
          ease: 'power3.out',
          scrollTrigger: { trigger: '.tes-band', start: 'top 84%', once: true },
        }
      )

      gsap.fromTo('.tes-face',
        { y: 44, opacity: 0 },
        {
          y: 0, opacity: 1, stagger: 0.12, duration: 1,
          ease: 'power3.out',
          scrollTrigger: { trigger: '.tes-faces', start: 'top 80%', once: true },
        }
      )
    }, ref)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="team-intro"
      ref={ref}
      dir="rtl"
      className="relative z-10 w-full overflow-hidden bg-surface text-navy"
    >
      {/* warm glows */}
      <div className="pointer-events-none absolute top-[-12%] right-[10%] w-[55vw] h-[45vh] rounded-full bg-orange/10 blur-[160px]" />
      <div className="pointer-events-none absolute bottom-[-10%] left-[-8%] w-[45vw] h-[50vh] rounded-full bg-orange/8 blur-[140px]" />

      <div className="relative z-10 max-w-screen-xl mx-auto px-6 sm:px-10 md:px-16 pt-24 md:pt-36 pb-20 md:pb-28">
        <p className="ds-eyebrow text-orange-ink mb-6">הצוות שלנו</p>

        {/* lead statement — masked word reveal */}
        <h2
          className="tes-statement font-ragmarom leading-[1.06] text-navy max-w-5xl"
          style={{ fontSize: 'clamp(2.2rem, 5vw, 4.6rem)', textWrap: 'balance' }}
        >
          {STATEMENT.map((w, i) => (
            <span key={i} className="tes-word inline-block overflow-hidden align-bottom" style={{ marginInlineEnd: '0.26em' }}>
              <span className={`inline-block will-change-transform ${w.hl ? 'text-orange-ink' : ''}`}>{w.t}</span>
            </span>
          ))}
        </h2>

        {/* support copy */}
        <div className="tes-supportwrap grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-6 mt-12 md:mt-16 max-w-4xl">
          <p className="tes-support font-heebo text-navy/70 leading-[1.85]" style={{ fontSize: 'clamp(1rem, 1.15vw, 1.2rem)' }}>
            מאחורי כל קבוצה, כל חוויה וכל חניך/ה עומדים אנשים שבחרו לקחת אחריות: באימון ישיר, בהדרכה בשטח או בתפקיד מטה שמניע את כל התנועה.
          </p>
          <p className="tes-support font-heebo text-navy/70 leading-[1.85]" style={{ fontSize: 'clamp(1rem, 1.15vw, 1.2rem)' }}>
            יש כמה דרכים להוביל אצלנו, ולכל אחת מהן אנחנו מחפשים אנשים שרוצים להשפיע ולהשאיר חותם.
          </p>
        </div>

        {/* the whole staff, together — the movement is its people */}
        <figure className="tes-band mt-16 md:mt-24 will-change-transform">
          <div className="relative overflow-hidden rounded-[1.6rem] md:rounded-[2.2rem] ring-1 ring-black/8 shadow-[0_40px_100px_rgba(0,0,30,0.18)]">
            <img
              src="/more_pics/2cf5e70f-1dfe-4811-a9fb-aa838cc707d2.JPG"
              alt="צוות תנועת חמש אצבעות יחד"
              loading="lazy"
              decoding="async"
              className="w-full aspect-[16/10] md:aspect-[16/7] object-cover object-center"
            />
            <div className="absolute inset-0 bg-orange/10 mix-blend-multiply pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/25 via-transparent to-transparent pointer-events-none" />
          </div>
          <figcaption className="mt-4 font-heebo text-navy/55 text-sm md:text-base text-right">
            המאמנים, המדריכים ואנשי המטה שמניעים את חמש אצבעות — קבוצה אחת.
          </figcaption>
        </figure>

        {/* leadership faces — duotone portraits, color on hover */}
        {/* Temporarily hidden until we have photos of the full team — do not delete */}
        {false && REAL_MEMBERS.length > 0 && (
          <div className="tes-faces mt-16 md:mt-24">
            <p className="ds-eyebrow text-orange-ink mb-8">מובילים את הדרך</p>
            <div className="flex flex-wrap gap-6 md:gap-8">
              {REAL_MEMBERS.map((m) => {
                const CardTag = m.instagram ? 'a' : 'div'
                const props = m.instagram
                  ? { href: m.instagram, target: '_blank', rel: 'noopener noreferrer', 'aria-label': `${m.name} באינסטגרם` }
                  : {}
                return (
                  <CardTag
                    key={m.id}
                    {...props}
                    className="tes-face group w-[240px] sm:w-[260px] text-right"
                  >
                    <div className="relative aspect-[4/5] overflow-hidden rounded-[1.6rem]">
                      <img
                        src={m.photo}
                        alt={m.name}
                        loading="lazy"
                        decoding="async"
                        className="absolute inset-0 w-full h-full object-cover transition-all duration-700 group-hover:scale-[1.04]"
                        style={{ filter: 'grayscale(0.55) contrast(1.05)' }}
                        onMouseEnter={(e) => (e.currentTarget.style.filter = 'grayscale(0) contrast(1)')}
                        onMouseLeave={(e) => (e.currentTarget.style.filter = 'grayscale(0.55) contrast(1.05)')}
                      />
                      <div className="absolute inset-0 bg-orange/15 mix-blend-multiply pointer-events-none group-hover:opacity-0 transition-opacity duration-700" />
                    </div>
                    <div className="mt-4 flex items-center justify-between gap-2">
                      <h3 className="font-heebo font-bold text-navy" style={{ fontSize: 'clamp(1.05rem, 1.3vw, 1.25rem)' }}>
                        {m.name}
                      </h3>
                      {m.instagram && (
                        <Instagram size={17} strokeWidth={1.75} className="shrink-0 text-navy/35 transition-colors group-hover:text-orange" />
                      )}
                    </div>
                    <p className="font-heebo text-orange-ink text-sm font-semibold mt-0.5">{m.title}</p>
                    <p className="font-heebo text-navy/60 text-sm leading-relaxed mt-2">{m.bio}</p>
                  </CardTag>
                )
              })}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
