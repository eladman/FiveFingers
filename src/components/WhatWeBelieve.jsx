import useReveal from '../hooks/useReveal'

export default function WhatWeBelieve() {
  const ref = useReveal({ selector: '.wwb-el', y: 48, stagger: 0.14, duration: 1.4, start: 'top 78%' })

  return (
    <section
      id="what-we-believe"
      ref={ref}
      dir="rtl"
      className="relative z-10 w-full min-h-[100dvh] overflow-hidden flex items-center bg-surface text-navy"
    >
      {/* One soft glow — brand warmth, nothing more */}
      <div className="pointer-events-none absolute top-1/2 right-1/2 -translate-y-1/2 translate-x-1/2 w-[70vw] h-[60vh] rounded-full bg-orange/10 blur-[180px]" />

      <div className="relative z-10 w-full max-w-[1080px] mx-auto px-6 sm:px-10 md:px-14 py-24 md:py-28 text-center">

        {/* Kicker */}
        <div className="wwb-el flex items-center justify-center gap-3 mb-7 md:mb-9">
          <span className="h-px w-8 bg-orange/70" />
          <span className="ds-eyebrow text-[#ff8714]">במה אנחנו מאמינים</span>
          <span className="h-px w-8 bg-orange/70" />
        </div>

        {/* The statement — the hero of the section */}
        <h2
          className="wwb-el font-ragmarom text-navy leading-[1.06] mx-auto max-w-[14ch] md:max-w-[20ch]"
          style={{ fontSize: 'clamp(2.3rem, 5.4vw, 4.6rem)' }}
        >
          בכל צעיר וצעירה טמון הכוח{' '}
          <span className="text-[#ff8714]">לשנות את המציאות</span>.
        </h2>

        {/* Hero media — the film, centered */}
        <div className="wwb-el mx-auto max-w-[860px] mt-12 md:mt-16">
          <div
            className="relative w-full rounded-[1.6rem] md:rounded-[2rem] overflow-hidden shadow-[0_24px_60px_rgba(0,0,30,0.16)] md:shadow-[0_40px_100px_rgba(0,0,30,0.18)] ring-1 ring-black/8"
            style={{ paddingBottom: '56.25%' }}
          >
            <iframe
              className="absolute inset-0 w-full h-full"
              src="https://www.youtube.com/embed/jOdf0gJrZug?rel=0&modestbranding=1"
              title="מי אנחנו - חמש אצבעות"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>

        {/* Vision + Mission — quiet supporting detail, one tight row */}
        <div className="wwb-el mt-12 md:mt-16 mx-auto max-w-[820px] grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-0">
          {/* Vision */}
          <div className="md:px-10 md:border-s md:border-navy/10 md:first:border-s-0">
            <span className="ds-eyebrow text-orange-ink">חזון</span>
            <h3 className="ds-card-title text-navy mt-2">חברה מבוססת אמון</h3>
            <p
              className="font-heebo text-navy/65 leading-relaxed mt-2 mx-auto max-w-[34ch]"
              style={{ fontSize: 'clamp(0.98rem, 1.1vw, 1.15rem)' }}
            >
              אמון של האדם בעצמו/ה, בקהילה שאליה הוא/היא משתייך/ת ולבסוף בין כלל הגורמים בחברה הישראלית.
            </p>
          </div>

          {/* Mission */}
          <div className="md:px-10 md:border-s md:border-navy/10">
            <span className="ds-eyebrow text-orange-ink">המשימה שלנו</span>
            <h3 className="ds-card-title text-navy mt-2">מימוש פוטנציאל</h3>
            <p
              className="font-heebo text-navy/65 leading-relaxed mt-2 mx-auto max-w-[34ch]"
              style={{ fontSize: 'clamp(0.98rem, 1.1vw, 1.15rem)' }}
            >
              לבנות אנשים חזקים ואכפתיים שישפיעו על החברה הישראלית.
            </p>
          </div>
        </div>

      </div>
    </section>
  )
}
