import { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * The vision beat — placed right after the film, this is the one section
 * whose only job is to break the assumption that Five Fingers is a group
 * that works out.
 *
 * "Ripples": the trust metaphor drawn rather than described. One person
 * drops in and the circle widens — אדם → קבוצה → קהילה → חברה — until it
 * is the whole society. Word chips straddle each arc and cut the line the
 * way a blueprint callout does; the photos sit ON the arcs instead of in a
 * separate grid, so they read as evidence rather than as a product shelf.
 * Deliberately product-free — the programs get their own section below.
 *
 * Warm paper (surface-2), same stock as the Manifesto it flows into, so the
 * page doesn't strobe light→dark→light between the film and the arena speech.
 */

// Inner → outer. `size` is the ring diameter as a % of the square field;
// `labelTop` is where the word chip straddles that ring's top edge
// (= (100 - size) / 2, precomputed so the markup stays declarative).
const SCOPES = [
  {
    n: '1',
    word: 'אדם',
    size: 23,
    labelTop: 38.5,
    line: 'צעיר או צעירה שמגלים שהם מסוגלים להרבה יותר ממה שהאמינו.',
  },
  {
    n: '2',
    word: 'קבוצה',
    size: 48,
    labelTop: 26,
    line: 'המקום שבו לומדים לסמוך, לתת יד, ולקחת אחריות על מישהו/י מלבד עצמך.',
  },
  {
    n: '3',
    word: 'קהילה',
    size: 73,
    labelTop: 13.5,
    line: 'מעגל שממשיך הרבה אחרי — בשיחות, במפגשים ובליווי לאורך שנים.',
  },
  {
    n: '4',
    word: 'חברה',
    size: 100,
    labelTop: 0,
    line: 'מדינה שבנויה על אמון בין אנשים. לשם הכול מכוון.',
    climax: true,
  },
]

// Pinned to the arcs they belong to. Captions stay generic — this section
// proves breadth, it does not sell a program.
const CHIPS = [
  {
    src: '/liba_pics/214A0223.jpg',
    caption: 'בשטח',
    alt: 'חניכים וחניכות באימון ערב משותף',
    pos: { width: '15%', right: '30%', bottom: '26%' },
  },
  {
    src: '/Hero-Pics/amir_talking_2.jpg',
    caption: 'בשיחה',
    alt: 'מפגש שיחה של קבוצה בחורש',
    pos: { width: '18%', left: '20%', bottom: '16%' },
  },
  {
    src: '/our_product_pics/yoav_pic.jpg',
    caption: 'בקהילה',
    alt: 'מפגש קהילה של בוגרי התנועה',
    pos: { width: '21%', left: '4%', top: '22%' },
  },
]

const RING_LABEL_SIZE = {
  '1': 'clamp(0.8rem, 1.1vw, 1.1rem)',
  '2': 'clamp(0.9rem, 1.35vw, 1.35rem)',
  '3': 'clamp(1.05rem, 1.65vw, 1.65rem)',
  '4': 'clamp(1.3rem, 2.1vw, 2.1rem)',
}

export default function VisionV2() {
  const ref = useRef(null)

  useLayoutEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const ctx = gsap.context(() => {
      if (reduced) return

      gsap.fromTo('.vs-lead',
        { y: 30, opacity: 0 },
        {
          y: 0, opacity: 1, stagger: 0.11, duration: 0.95, ease: 'power3.out',
          scrollTrigger: { trigger: '.vs-head', start: 'top 76%', once: true },
        }
      )

      // The one big moment: the rings actually ripple outward. Inner first,
      // each one chasing the last, with its word chip landing just behind it.
      const tl = gsap.timeline({
        scrollTrigger: { trigger: '.vs-plot', start: 'top 74%', once: true },
      })

      tl.fromTo('.vs-ring',
        { scale: 0.15, opacity: 0 },
        { scale: 1, opacity: 1, stagger: 0.16, duration: 1.15, ease: 'power3.out' }
      )
        .fromTo('.vs-ringlabel',
          { opacity: 0, y: 8 },
          { opacity: 1, y: 0, stagger: 0.16, duration: 0.6, ease: 'power2.out' },
          '<0.35'
        )
        .fromTo('.vs-chip',
          { scale: 0.72, opacity: 0 },
          { scale: 1, opacity: 1, stagger: 0.11, duration: 0.75, ease: 'back.out(1.5)' },
          '<0.2'
        )
        .fromTo('.vs-keyrow',
          { x: 26, opacity: 0 },
          { x: 0, opacity: 1, stagger: 0.09, duration: 0.7, ease: 'power3.out' },
          '<0.1'
        )
    }, ref)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="vision"
      ref={ref}
      dir="rtl"
      className="relative w-full overflow-hidden bg-surface-2 text-navy"
    >
      {/* warm ember low-left, so the paper never reads flat */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: 'radial-gradient(ellipse 55% 60% at 22% 58%, rgba(255,135,20,0.10) 0%, transparent 62%)' }}
      />

      <div className="relative z-10 max-w-screen-xl mx-auto px-6 sm:px-10 md:px-16 pt-24 md:pt-32 pb-20 md:pb-28">

        {/* ── the signal ─────────────────────────────────────────── */}
        <div className="vs-head">
          <p className="vs-lead ds-eyebrow text-orange-ink flex items-center gap-3">
            <span className="inline-block w-8 h-0.5 bg-orange shrink-0" />
            <span>החזון שלנו</span>
          </p>

          <h2
            className="vs-lead font-ragmarom leading-[0.96] mt-6 md:mt-8"
            style={{ fontSize: 'clamp(2.4rem, 5.2vw, 5.2rem)', textWrap: 'balance' }}
          >
            זה מתחיל באימון. <span className="text-orange">זה לא נגמר שם.</span>
          </h2>

          <div className="vs-lead mt-10 md:mt-12 pt-8 border-t border-navy/12 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            <p
              className="lg:col-span-4 font-ragmarom leading-[1.3] pr-5 border-r-[3px] border-orange"
              style={{ fontSize: 'clamp(1.2rem, 1.9vw, 1.85rem)' }}
            >
              אנחנו בונים <span className="text-orange">חברה מבוססת אמון</span>.
            </p>
            <p
              className="lg:col-span-8 font-heebo text-navy/62 leading-[1.92] max-w-2xl"
              style={{ fontSize: 'clamp(1rem, 1.1vw, 1.15rem)' }}
            >
              חמש אצבעות היא לא מועדון כושר ולא חוג. זו תנועה חינוכית־חברתית שפועלת בכל רחבי הארץ,
              ומודדת את עצמה לא במספר האימונים אלא באנשים שיוצאים מהם — ובמה שהם עושים עם זה הלאה.
            </p>
          </div>
        </div>

        {/* ── the ripple ─────────────────────────────────────────── */}
        <div className="vs-plot grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center mt-16 md:mt-20">

          {/* the field. Rings + word chips are decorative: the key beside it
              carries the same words for screen readers, so we don't announce
              each scope twice. */}
          <div className="relative w-full max-w-[540px] mx-auto aspect-square">
            {/* largest first so the smaller arcs sit above them */}
            {[...SCOPES].reverse().map((s) => (
              <div
                key={s.n}
                aria-hidden="true"
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 aspect-square"
                style={{ width: `${s.size}%` }}
              >
                <div
                  className="vs-ring w-full h-full rounded-full transition-colors duration-300 hover:!border-orange"
                  style={
                    s.climax
                      ? { border: '1.5px dashed rgba(255,135,20,0.55)' }
                      : s.n === '1'
                        ? {
                            border: '1.5px solid var(--orange)',
                            background: 'radial-gradient(circle, rgba(255,135,20,0.30), rgba(255,135,20,0.06))',
                          }
                        : { border: '1.5px solid rgba(13,27,75,0.22)' }
                  }
                />
              </div>
            ))}

            {/* word chips straddle each arc and cut the line */}
            {SCOPES.map((s) => (
              <div
                key={s.n}
                aria-hidden="true"
                className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 z-20"
                style={{ top: `${s.labelTop}%` }}
              >
                <span
                  className={`vs-ringlabel block font-ragmarom leading-none bg-surface-2 px-3 py-[3px] whitespace-nowrap ${
                    s.climax ? 'text-orange' : 'text-navy'
                  }`}
                  style={{ fontSize: RING_LABEL_SIZE[s.n] }}
                >
                  {s.word}
                </span>
              </div>
            ))}

            {/* the photos ride the arcs */}
            {CHIPS.map((c) => (
              <figure
                key={c.src}
                className="vs-chip absolute z-10 aspect-square rounded-full overflow-hidden border-[3px] border-surface-2 shadow-[0_10px_30px_rgba(0,0,30,0.18)] transition-transform duration-500 hover:scale-[1.07]"
                style={c.pos}
              >
                <img
                  src={c.src}
                  alt={c.alt}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover"
                />
                <figcaption
                  className="absolute inset-x-0 bottom-0 text-center font-heebo font-bold text-white pt-3 pb-1"
                  style={{
                    fontSize: 'clamp(0.5rem, 0.72vw, 0.66rem)',
                    letterSpacing: '0.12em',
                    background: 'linear-gradient(to top, rgba(8,16,40,0.85), transparent)',
                  }}
                >
                  {c.caption}
                </figcaption>
              </figure>
            ))}
          </div>

          {/* the key */}
          <ul className="flex flex-col">
            {SCOPES.map((s) => (
              <li
                key={s.n}
                className="vs-keyrow grid grid-cols-[auto_1fr] gap-4 items-baseline py-4 border-b border-navy/10 last:border-b-0"
              >
                <span className="font-heebo font-extrabold text-navy/35 text-[0.68rem] tracking-[0.18em]">
                  {s.n}
                </span>
                <div>
                  <b
                    className={`block font-ragmarom font-normal leading-none mb-1.5 ${
                      s.climax ? 'text-orange' : 'text-navy'
                    }`}
                    style={{ fontSize: s.climax ? 'clamp(1.6rem, 2.3vw, 2rem)' : 'clamp(1.25rem, 1.7vw, 1.5rem)' }}
                  >
                    {s.word}
                  </b>
                  <p
                    className={`font-heebo leading-[1.75] ${s.climax ? 'text-navy/78' : 'text-navy/58'}`}
                    style={{ fontSize: 'clamp(0.9rem, 1vw, 0.95rem)' }}
                  >
                    {s.line}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
