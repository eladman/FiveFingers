import { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * The five values — the movement's DNA, one finger at a time.
 *
 * Desktop: the section pins and the five full-screen panels travel
 * horizontally (right to left, native RTL reading direction) while a
 * five-finger progress indicator fills. Mobile / reduced motion: the
 * panels stack vertically with plain reveals.
 */

const VALUES = [
  {
    id: 'excellence',
    num: 'א',
    title: 'מצוינות',
    tag: 'BE BETTER',
    body: 'שיטתיות, ירידה לפרטים ושאיפה מתמדת להשתפר. הטוב של אתמול הוא נקודת הפתיחה של היום.',
    img: '/liba_pics/214A0005.jpg',
    bg: 'linear-gradient(160deg, #0d1b4b 0%, #081028 100%)',
  },
  {
    id: 'adaptability',
    num: 'ב',
    title: 'מסוגלות',
    tag: 'COMFORTABLY HARD',
    body: 'חוסן מנטלי ונוחות בתוך אי־נוחות. לומדים להרגיש בבית דווקא כשקשה.',
    img: '/liba_pics/214A0223.jpg',
    bg: 'linear-gradient(160deg, #12255e 0%, #09163e 100%)',
  },
  {
    id: 'grit',
    num: 'ג',
    title: 'גריט',
    tag: 'GRIT',
    body: 'רעב, תשוקה והתמדה לאורך זמן. ממשיכים לדחוף גם כשהמוטיבציה נגמרת.',
    img: '/liba_pics/214A0362.jpg',
    bg: 'linear-gradient(160deg, #0d1b4b 0%, #06102e 100%)',
  },
  {
    id: 'proactive',
    num: 'ד',
    title: 'לקיחת אחריות',
    tag: 'PROACTIVE',
    body: 'יוזמה במקום תגובה. לוקחים אחריות על המציאות במקום לחכות שמישהו אחר יתקן אותה.',
    img: '/liba_pics/214A1343.jpg',
    bg: 'linear-gradient(160deg, #172e68 0%, #081028 100%)',
  },
  {
    id: 'together',
    num: 'ה',
    title: 'שייכות ומשמעות',
    tag: 'TOGETHER',
    body: 'אמון, נאמנות וכוח קבוצתי. קבוצה עם מטרה משותפת מגיעה רחוק יותר מכל יחיד.',
    img: '/liba_pics/214A1552.jpg',
    bg: 'linear-gradient(160deg, #0f2057 0%, #060d24 100%)',
  },
]

export default function FiveDNA() {
  const ref = useRef(null)
  const trackRef = useRef(null)
  const fingersRef = useRef([])
  const counterRef = useRef(null)

  useLayoutEffect(() => {
    const mm = gsap.matchMedia()

    mm.add(
      '(min-width: 1024px) and (prefers-reduced-motion: no-preference)',
      () => {
        const track = trackRef.current
        const dist = () => track.scrollWidth - window.innerWidth

        const tween = gsap.to(track, {
          x: () => dist(), // RTL: overflow extends left, so the track travels right
          ease: 'none',
          scrollTrigger: {
            trigger: ref.current,
            start: 'top top',
            end: () => '+=' + dist(),
            pin: true,
            scrub: 0.8,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              const idx = Math.min(4, Math.floor(self.progress * 5))
              fingersRef.current.forEach((f, i) => {
                if (!f) return
                f.style.opacity = i <= idx ? '1' : '0.22'
                f.style.transform = i <= idx ? 'scaleY(1)' : 'scaleY(0.55)'
              })
              if (counterRef.current) {
                counterRef.current.textContent = `${idx + 1} / 5`
              }
            },
          },
        })

        // Inner image parallax: each panel's photo drifts as the train passes.
        const imgs = gsap.utils.toArray('.dna-img', ref.current)
        imgs.forEach((img, i) => {
          gsap.fromTo(img,
            { xPercent: -7 },
            {
              xPercent: 7,
              ease: 'none',
              scrollTrigger: {
                trigger: ref.current,
                start: 'top top',
                end: () => '+=' + dist(),
                scrub: 0.8,
              },
              delay: i * 0.0001, // distinct tweens per image
            }
          )
        })

        return () => tween.scrollTrigger?.kill()
      }
    )

    // Mobile + reduced motion: simple stagger reveal per panel.
    mm.add('(max-width: 1023px)', () => {
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      const panels = gsap.utils.toArray('.dna-panel', ref.current)
      if (reduced) return
      panels.forEach((panel) => {
        gsap.fromTo(panel.querySelectorAll('.dna-el'),
          { y: 44, opacity: 0 },
          {
            y: 0, opacity: 1, stagger: 0.1, duration: 1,
            ease: 'power3.out',
            scrollTrigger: { trigger: panel, start: 'top 74%', once: true },
          }
        )
      })
    })

    return () => mm.revert()
  }, [])

  return (
    <section
      id="dna"
      ref={ref}
      dir="rtl"
      className="relative w-full overflow-hidden bg-navy-deep"
    >
      {/* ── header (stays through the pin) ── */}
      <div className="absolute top-0 inset-x-0 z-20 pointer-events-none">
        <div className="max-w-screen-2xl mx-auto px-6 sm:px-10 md:px-16 lg:px-24 pt-16 lg:pt-32 flex items-end justify-between gap-6">
          <h2 className="font-ragmarom text-white leading-[0.95]" style={{ fontSize: 'clamp(2.2rem, 4vw, 4.2rem)' }}>
            חמישה ערכים. <span className="text-orange">יד אחת.</span>
          </h2>
          <span ref={counterRef} dir="ltr" className="hidden lg:block font-heebo font-bold text-white/50 text-lg tabular-nums shrink-0">
            1 / 5
          </span>
        </div>
      </div>

      {/* ── five-finger progress (desktop) ── */}
      <div className="hidden lg:flex absolute bottom-10 left-1/2 -translate-x-1/2 z-20 items-end gap-2 pointer-events-none" aria-hidden="true">
        {[26, 36, 44, 40, 22].map((h, i) => (
          <span
            key={i}
            ref={(el) => (fingersRef.current[i] = el)}
            className="w-[7px] rounded-full bg-orange"
            style={{
              height: h,
              opacity: i === 0 ? 1 : 0.22,
              transform: i === 0 ? 'scaleY(1)' : 'scaleY(0.55)',
              transformOrigin: 'bottom',
              transition: 'opacity 380ms cubic-bezier(0.25,0.46,0.45,0.94), transform 380ms cubic-bezier(0.25,0.46,0.45,0.94)',
            }}
          />
        ))}
      </div>

      {/* ── the train ── */}
      <div
        ref={trackRef}
        className="dna-track flex flex-col lg:flex-row lg:flex-nowrap lg:h-[100dvh] will-change-transform"
      >
        {VALUES.map((v, i) => (
          <article
            key={v.id}
            className="dna-panel relative shrink-0 w-full lg:w-screen lg:h-full overflow-hidden flex flex-col lg:flex-row"
            style={{ background: v.bg }}
          >
            {/* photo side */}
            <div className="relative h-[42svh] lg:h-full lg:w-[46%] overflow-hidden order-1 lg:order-2">
              <img
                src={v.img}
                alt={v.title}
                loading="lazy"
                decoding="async"
                className="dna-img absolute inset-[-8%] w-[116%] h-[116%] max-w-none object-cover"
                style={{ filter: 'grayscale(0.55) contrast(1.05)' }}
              />
              <div className="absolute inset-0 bg-orange/15 mix-blend-multiply" />
              <div className="absolute inset-0" style={{ background: 'linear-gradient(90deg, rgba(8,16,40,0.85) 0%, rgba(8,16,40,0.05) 45%, rgba(8,16,40,0.2) 100%)' }} />
            </div>

            {/* text side */}
            <div className="relative flex-1 lg:w-[54%] order-2 lg:order-1 flex items-center">
              <div className="w-full px-6 sm:px-10 md:px-16 lg:px-24 py-14 lg:py-0 lg:pt-24">
                <p className="dna-el font-heebo font-bold text-orange tracking-[0.3em] text-xs md:text-sm mb-5">
                  {v.tag}
                </p>
                <h3
                  className="dna-el font-ragmarom text-white leading-[0.95]"
                  style={{ fontSize: 'clamp(2.8rem, 6vw, 6rem)' }}
                >
                  {v.title}
                </h3>
                <p
                  className="dna-el font-heebo text-white/75 leading-[1.8] mt-6 max-w-md"
                  style={{ fontSize: 'clamp(1rem, 1.25vw, 1.25rem)' }}
                >
                  {v.body}
                </p>
                <div className="dna-el mt-8 h-1 w-14 rounded-full bg-orange" />
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
