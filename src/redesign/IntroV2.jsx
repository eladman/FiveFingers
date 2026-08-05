import { useLayoutEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * First breath after the dark hero: who we are, in plain language.
 * The lead statement rises word by word out of masked lines; the photo
 * trio drifts at three different speeds; the movement's film closes
 * the section.
 */

const STATEMENT = [
  { t: 'חמש', hl: false },
  { t: 'אצבעות', hl: false },
  { t: 'היא', hl: false },
  { t: 'תנועת', hl: true },
  { t: 'נוער', hl: true },
  { t: 'חינוכית־חברתית', hl: true },
  { t: 'הפועלת', hl: false },
  { t: 'בכל', hl: false },
  { t: 'רחבי', hl: false },
  { t: 'הארץ', hl: false },
  { t: 'לפיתוח', hl: false },
  { t: 'הדור', hl: false },
  { t: 'הבא.', hl: false },
]

const PHOTOS = [
  { src: '/liba_pics/214A9628.jpg', speed: -14, alt: 'חניכים וחניכות באימון שטח' },
  { src: '/liba_pics/214A0052.jpg', speed: 8, alt: 'קבוצה בתרגול משותף' },
  { src: '/liba_pics/214A9700.jpg', speed: -6, alt: 'רגע של גיבוש קבוצתי' },
]

const FILM_ID = 'jOdf0gJrZug'

export default function IntroV2() {
  const ref = useRef(null)
  // The film's iframe stays unmounted until the user clicks play. A live
  // cross-origin YouTube iframe swallows wheel events whenever the cursor is
  // over it, which starves Lenis (smoothWheel drives the page from window
  // wheel events) and makes scrolling past this section feel stuck. The
  // poster below is part of the parent document, so wheel events reach Lenis
  // normally — scroll stays fluid until someone deliberately watches.
  const [playing, setPlaying] = useState(false)

  useLayoutEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const ctx = gsap.context(() => {
      if (reduced) return

      gsap.fromTo('.in2-word > span',
        { yPercent: 115 },
        {
          yPercent: 0,
          stagger: 0.05,
          duration: 0.9,
          ease: 'power4.out',
          scrollTrigger: { trigger: '.in2-statement', start: 'top 78%', once: true },
        }
      )

      gsap.fromTo('.in2-support',
        { y: 36, opacity: 0 },
        {
          y: 0, opacity: 1, stagger: 0.14, duration: 1,
          ease: 'power3.out',
          scrollTrigger: { trigger: '.in2-supportwrap', start: 'top 80%', once: true },
        }
      )

      // photo trio — three independent drift speeds
      gsap.utils.toArray('.in2-photo', ref.current).forEach((el) => {
        gsap.fromTo(el,
          { y: () => Number(el.dataset.speed) * 6 },
          {
            y: () => Number(el.dataset.speed) * -6,
            ease: 'none',
            scrollTrigger: { trigger: '.in2-photos', start: 'top bottom', end: 'bottom top', scrub: 1 },
          }
        )
      })

      gsap.fromTo('.in2-film',
        { y: 60, opacity: 0, scale: 0.97 },
        {
          y: 0, opacity: 1, scale: 1, duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: { trigger: '.in2-film', start: 'top 82%', once: true },
        }
      )
    }, ref)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="who-we-are"
      ref={ref}
      dir="rtl"
      className="relative z-10 w-full overflow-hidden bg-surface text-navy"
    >
      {/* warm glows */}
      <div className="pointer-events-none absolute top-[-12%] right-[10%] w-[55vw] h-[45vh] rounded-full bg-orange/10 blur-[160px]" />
      <div className="pointer-events-none absolute bottom-[-10%] left-[-8%] w-[45vw] h-[50vh] rounded-full bg-orange/8 blur-[140px]" />

      <div className="relative z-10 max-w-screen-xl mx-auto px-6 sm:px-10 md:px-16 pt-24 md:pt-36 pb-20 md:pb-28">

        {/* lead statement — masked word reveal */}
        <h2
          className="in2-statement font-ragmarom leading-[1.06] text-navy max-w-5xl"
          style={{ fontSize: 'clamp(2.2rem, 5vw, 4.6rem)', textWrap: 'balance' }}
        >
          {STATEMENT.map((w, i) => (
            <span key={i} className="in2-word inline-block overflow-hidden align-bottom" style={{ marginInlineEnd: '0.26em' }}>
              <span className={`inline-block will-change-transform ${w.hl ? 'text-orange-ink' : ''}`}>{w.t}</span>
            </span>
          ))}
        </h2>

        {/* support copy */}
        <div className="in2-supportwrap grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-6 mt-12 md:mt-16 max-w-4xl">
          <p className="in2-support font-heebo text-navy/70 leading-[1.85]" style={{ fontSize: 'clamp(1rem, 1.15vw, 1.2rem)' }}>
            מאז 2014 אנחנו מלווים אלפי צעירים וצעירות בגילאי 12 ומעלה, ומפתחים אותם דרך אימונים גופניים וחינוך ערכי, קבוצה מלוכדת וחוויות מאתגרות שמעצבות אופי.
          </p>
          <p className="in2-support font-heebo text-navy/70 leading-[1.85]" style={{ fontSize: 'clamp(1rem, 1.15vw, 1.2rem)' }}>
            המטרה שלנו היא לאפשר לכל צעיר וצעירה במדינת ישראל לממש את הפוטנציאל שלהם, ולהפוך לאנשים שפועלים מתוך יוזמה ואחריות כדי לשפר את המציאות.
          </p>
        </div>

        {/* photo trio — independent parallax speeds */}
        <div className="in2-photos grid grid-cols-3 gap-4 md:gap-6 mt-16 md:mt-24 items-start">
          {PHOTOS.map((p, i) => (
            <figure
              key={p.src}
              className="in2-photo will-change-transform"
              data-speed={p.speed}
              style={{ marginTop: i === 1 ? 'clamp(1.5rem, 4vw, 4rem)' : 0 }}
            >
              <div className="overflow-hidden rounded-[1.4rem] md:rounded-[2rem]">
                <img
                  src={p.src}
                  alt={p.alt}
                  loading="lazy"
                  decoding="async"
                  className="w-full aspect-[3/4] md:aspect-[4/5] object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
            </figure>
          ))}
        </div>

        {/* the movement's film */}
        <div className="in2-film mt-16 md:mt-28">
          <div className="flex items-baseline justify-between gap-6 mb-6">
            <h3 className="font-ragmarom text-navy leading-none" style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)' }}>
              שתי דקות, <span className="text-orange-ink">כל הסיפור</span>
            </h3>
          </div>
          <div
            className="relative w-full rounded-[1.6rem] md:rounded-[2rem] overflow-hidden shadow-[0_40px_100px_rgba(0,0,30,0.18)] ring-1 ring-black/8"
            style={{ paddingBottom: '56.25%' }}
          >
            {playing ? (
              <iframe
                className="absolute inset-0 w-full h-full"
                src={`https://www.youtube.com/embed/${FILM_ID}?rel=0&modestbranding=1&autoplay=1`}
                title="מי אנחנו — חמש אצבעות"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <button
                type="button"
                onClick={() => setPlaying(true)}
                aria-label="נגן את הסרט — מי אנחנו, חמש אצבעות"
                className="group absolute inset-0 w-full h-full cursor-pointer"
              >
                <img
                  src={`https://img.youtube.com/vi/${FILM_ID}/maxresdefault.jpg`}
                  alt="מי אנחנו — חמש אצבעות"
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <span className="absolute inset-0 bg-navy-deep/25 transition-colors duration-300 group-hover:bg-navy-deep/15" />
                <span className="absolute inset-0 flex items-center justify-center">
                  <span className="flex items-center justify-center w-[4.5rem] h-[4.5rem] md:w-24 md:h-24 rounded-full bg-orange shadow-[0_10px_40px_rgba(255,135,20,0.5)] transition-transform duration-300 group-hover:scale-110">
                    <svg viewBox="0 0 24 24" fill="white" className="w-7 h-7 md:w-9 md:h-9 translate-x-[2px]" aria-hidden="true">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </span>
                </span>
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
