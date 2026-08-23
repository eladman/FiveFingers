import { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowLeft } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

/**
 * The arenas — the movement's programs as large cinematic rows.
 * Each image unclips as it enters, drifts on an inner parallax, and the
 * title deliberately overlaps the frame's edge. Rows alternate sides.
 */

const PROGRAMS = [
  {
    id: 'youth',
    title: 'קבוצות הנוער',
    badge: 'גילאי 12–18',
    description:
      'תכנית הבסיס של התנועה, מכיתה ז׳ עד י״ב: יסודות השיטה הפיזית־מנטלית. חוסן, הרגלים, עבודת צוות וכלים למנהיגות.',
    imageSrc: '/our_product_pics/core_pic.jpg',
    ctaHref: '#liabah',
    ctaLabel: 'לדף קבוצות הנוער',
  },
  {
    id: 'boost',
    title: 'Boost',
    badge: 'כחלק מתוכנית הזנק של צה״ל',
    description:
      'תוכנית קדם-צבאית מרוכזת: מסיימי/ות י״א — שלושה שבועות בקיץ, ומסיימי/ות י״ב — שישה שבועות אחרי התיכון. הכנה פיזית-מנטלית, מנהיגות, ניווט וחוויית שטח — בליווי מדריכים ומומחים מהשורה הראשונה.',
    imageSrc: '/coachs/heznek2.JPG',
    ctaContact: true,
  },
  {
    id: 'academy',
    title: 'המכינה הקדם־צבאית',
    badge: 'קדם צבא',
    description:
      'שנה שמעצבת דור שבוחר להיכנס לזירה ולהשפיע על מציאות חיינו, על בסיס הזהות של חמש אצבעות והמיומנויות שנרכשו בדרך.',
    imageSrc: '/our_product_pics/mehina_pic.png',
    ctaContact: true,
  },
  {
    id: 'alumni',
    title: 'קהילת הבוגרים',
    badge: 'גילאי 18+',
    description:
      'ההמשך של התהליך החינוכי: ליווי בוגרים ובוגרות אל עמדות מפתח בחברה הישראלית, מתוך השפעה חינוכית וחברתית.',
    imageSrc: '/our_product_pics/yoav_pic.jpg',
    ctaContact: true,
  },
  {
    id: 'collab',
    title: 'שיתופי פעולה',
    badge: 'ארגונים וצוותים',
    description:
      'התאמת שיטת חמש אצבעות לארגונים, צוותים, יחידות וספורטאים: תהליך מדויק של מימוש פוטנציאל אישי וארגוני.',
    imageSrc: '/our_product_pics/collab_pic.jpg',
    ctaContact: true,
  },
]

export default function ProgramsV2({ onContactOpen }) {
  const ref = useRef(null)

  useLayoutEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const ctx = gsap.context(() => {
      if (reduced) return

      gsap.fromTo('.pr2-heading',
        { y: 46, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 1.1, ease: 'power3.out',
          scrollTrigger: { trigger: ref.current, start: 'top 80%', once: true },
        }
      )

      gsap.utils.toArray('.pr2-row', ref.current).forEach((row) => {
        const frame = row.querySelector('.pr2-frame')
        const img = row.querySelector('.pr2-img')

        // unclip as it enters
        gsap.fromTo(frame,
          { clipPath: 'inset(10% 6% 10% 6% round 2rem)' },
          {
            clipPath: 'inset(0% 0% 0% 0% round 2rem)',
            ease: 'none',
            scrollTrigger: { trigger: row, start: 'top 92%', end: 'top 45%', scrub: 0.6 },
          }
        )
        // inner parallax
        gsap.fromTo(img,
          { yPercent: -9 },
          {
            yPercent: 9,
            ease: 'none',
            scrollTrigger: { trigger: row, start: 'top bottom', end: 'bottom top', scrub: 1 },
          }
        )
        // text cascade
        gsap.fromTo(row.querySelectorAll('.pr2-el'),
          { y: 40, opacity: 0 },
          {
            y: 0, opacity: 1, stagger: 0.09, duration: 0.9, ease: 'power3.out',
            scrollTrigger: { trigger: row, start: 'top 68%', once: true },
          }
        )
      })
    }, ref)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="programs"
      ref={ref}
      dir="rtl"
      className="relative w-full overflow-hidden bg-surface"
    >
      <div className="pointer-events-none absolute top-[5%] left-[-10%] w-[45vw] h-[45vh] rounded-full bg-orange/8 blur-[150px]" />
      <div className="pointer-events-none absolute bottom-[10%] right-[-8%] w-[40vw] h-[40vh] rounded-full bg-orange/10 blur-[150px]" />

      <div className="relative z-10 max-w-screen-xl mx-auto px-6 sm:px-10 md:px-16 pt-24 md:pt-32 pb-16 md:pb-24">

        <div className="pr2-heading max-w-3xl">
          <h2 className="ds-section-title text-navy">הזירות שלנו</h2>
          <p className="ds-section-subtitle text-orange-ink mt-4">
            חמש דרכים להיכנס. דרך אחת לגדול.
          </p>
        </div>

        <div className="mt-16 md:mt-24 flex flex-col gap-24 md:gap-36">
          {PROGRAMS.map((prog, i) => {
            const even = i % 2 === 0
            return (
              <article
                key={prog.id}
                className="pr2-row grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-0 items-center"
              >
                {/* image — spans 8 columns, side alternates */}
                <div className={`lg:row-start-1 ${even ? 'lg:col-start-1' : 'lg:col-start-5'} lg:col-span-8`}>
                  <div className="pr2-frame relative overflow-hidden rounded-[2rem] group" style={{ clipPath: 'inset(0% 0% 0% 0% round 2rem)' }}>
                    <div className="relative aspect-[16/10] md:aspect-[16/9] overflow-hidden">
                      <img
                        src={prog.imageSrc}
                        alt={prog.title}
                        loading="lazy"
                        decoding="async"
                        className="pr2-img absolute inset-[-10%] w-[120%] h-[120%] max-w-none object-cover will-change-transform group-hover:scale-[1.04] transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-navy/35 via-transparent to-transparent opacity-70" />
                    </div>
                  </div>
                </div>

                {/* text card — overlaps the image edge on desktop */}
                <div className={`lg:row-start-1 ${even ? 'lg:col-start-8' : 'lg:col-start-1'} lg:col-span-5 relative z-10`}>
                  <div className="bg-surface/95 backdrop-blur rounded-[1.6rem] lg:rounded-[2rem] lg:shadow-[0_24px_60px_rgba(0,0,30,0.14)] p-0 lg:p-10">
                    <span className="pr2-el inline-flex items-center rounded-full bg-orange/10 text-orange-ink font-heebo font-semibold px-4 py-1.5 text-sm md:text-base">
                      {prog.badge}
                    </span>
                    <h3
                      className="pr2-el font-ragmarom text-navy leading-[0.98] mt-4"
                      style={{ fontSize: 'clamp(2.2rem, 4vw, 3.8rem)' }}
                    >
                      {prog.title}
                    </h3>
                    <p
                      className="pr2-el font-heebo text-navy/70 leading-[1.8] mt-4"
                      style={{ fontSize: 'clamp(0.98rem, 1.1vw, 1.15rem)' }}
                    >
                      {prog.description}
                    </p>
                    <div className="pr2-el mt-6">
                      {prog.ctaHref ? (
                        <a
                          href={prog.ctaHref}
                          className="tap-safe group/link inline-flex items-center gap-2.5 font-heebo font-bold text-navy text-lg"
                        >
                          <span className="relative">
                            {prog.ctaLabel}
                            <span className="absolute -bottom-1 right-0 h-[2px] w-full bg-orange origin-right scale-x-100 group-hover/link:scale-x-0 transition-transform duration-300" />
                            <span className="absolute -bottom-1 right-0 h-[2px] w-full bg-navy origin-left scale-x-0 group-hover/link:scale-x-100 transition-transform duration-300 delay-150" />
                          </span>
                          <ArrowLeft size={20} className="text-orange-ink transition-transform duration-300 group-hover/link:-translate-x-1.5" aria-hidden="true" />
                        </a>
                      ) : (
                        <button
                          type="button"
                          onClick={() => onContactOpen?.(prog.title)}
                          className="tap-safe group/link inline-flex items-center gap-2.5 font-heebo font-bold text-navy text-lg"
                        >
                          <span className="relative">
                            יצירת קשר
                            <span className="absolute -bottom-1 right-0 h-[2px] w-full bg-orange origin-right scale-x-100 group-hover/link:scale-x-0 transition-transform duration-300" />
                            <span className="absolute -bottom-1 right-0 h-[2px] w-full bg-navy origin-left scale-x-0 group-hover/link:scale-x-100 transition-transform duration-300 delay-150" />
                          </span>
                          <ArrowLeft size={20} className="text-orange-ink transition-transform duration-300 group-hover/link:-translate-x-1.5" aria-hidden="true" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
