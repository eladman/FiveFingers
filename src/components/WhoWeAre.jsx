import useReveal from '../hooks/useReveal'

export default function WhoWeAre() {
  const ref = useReveal({ selector: '.wwa-el', y: 60, stagger: 0.12, duration: 1.4, start: 'top 70%' })

  return (
    <section
      id="who-we-are"
      ref={ref}
      dir="rtl"
      className="relative w-full min-h-[100dvh] overflow-hidden flex items-center bg-surface"
    >
      {/* ── Atmospheric glows ── */}
      <div className="pointer-events-none absolute bottom-[-10%] left-[20%] w-[70vw] h-[50vh] rounded-full bg-orange/14 blur-[160px]" />
      <div className="pointer-events-none absolute top-[-10%] right-[-5%] w-[40vw] h-[60vh] rounded-full bg-orange/8 blur-[140px]" />

      {/* ── Halftone dot grid ── */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: 'radial-gradient(circle, #000032 1.2px, transparent 1.2px)',
          backgroundSize: '22px 22px',
          opacity: 0.04,
        }}
      />

      {/* ── Layout ──
          Mobile  : single column, ordered heading → video → values
          Desktop : two columns, values stacked under heading on the right,
                    video spanning the full height on the left              */}
      <div className="relative z-10 w-full grid grid-cols-1 md:grid-cols-[1fr_2.2fr] md:grid-rows-[auto_1fr]">

        {/* ── Heading ── */}
        <div className="order-1 md:order-none md:col-start-1 md:row-start-1 md:border-l border-navy/8 px-6 sm:px-10 md:px-14 lg:px-20 pt-24 md:pt-16 lg:pt-24 pb-2 md:pb-6">
          <div className="wwa-el">
            <h2 className="ds-section-title text-navy">
              מי אנחנו
            </h2>
            <div className="flex items-center gap-3 mt-3">
              <span className="h-px w-9 bg-orange shrink-0" />
              <p className="ds-section-subtitle text-[#ff8714]">
                הכירו את התנועה
              </p>
            </div>
          </div>
        </div>

        {/* ── Video ── */}
        <div className="wwa-el order-2 md:order-none md:col-start-2 md:row-start-1 md:row-span-2 md:self-center px-6 sm:px-10 pt-6 pb-2 md:p-12 lg:p-16">
          <div
            className="relative w-full rounded-[1.6rem] md:rounded-[2rem] overflow-hidden shadow-[0_24px_60px_rgba(0,0,30,0.16)] md:shadow-[0_40px_100px_rgba(0,0,30,0.18)] ring-1 ring-black/8"
            style={{ paddingBottom: '56.25%' }}
          >
            <iframe
              className="absolute inset-0 w-full h-full"
              src="https://www.youtube.com/embed/jOdf0gJrZug?rel=0&modestbranding=1"
              title="מי אנחנו — חמש אצבעות"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>

        {/* ── Vision + Mission ── one connected editorial panel */}
        <div className="order-3 md:order-none md:col-start-1 md:row-start-2 md:border-l border-navy/8 px-6 sm:px-10 md:px-14 lg:px-20 pt-8 md:pt-2 pb-20 md:pb-16 lg:pb-24">
          <div className="wwa-el relative pr-5">
            {/* continuous orange accent rail on the leading (right) edge */}
            <span className="absolute right-0 top-1.5 bottom-1.5 w-[3px] rounded-full bg-gradient-to-b from-[#ff8714] via-[#ff8714] to-orange/25" />

            <div className="flex flex-col gap-8">
              {/* Vision */}
              <div className="flex flex-col gap-2">
                <span className="ds-eyebrow text-orange-ink">
                  חזון
                </span>
                <h3 className="ds-card-title text-navy">
                  חברה מבוססת אמון
                </h3>
                <p
                  className="font-heebo text-navy/65 leading-relaxed"
                  style={{ fontSize: 'clamp(0.98rem, 1.1vw, 1.15rem)' }}
                >
                  אמון של האדם בעצמו/ה, בקהילה שאליה הוא/היא משתייך/ת ולבסוף בין כלל הגורמים בחברה הישראלית.
                </p>
              </div>

              {/* hairline between the two ideas */}
              <span className="h-px w-full bg-navy/8" />

              {/* Mission */}
              <div className="flex flex-col gap-2">
                <span className="ds-eyebrow text-orange-ink">
                  המשימה שלנו
                </span>
                <h3 className="ds-card-title text-navy">
                  מימוש פוטנציאל
                </h3>
                <p
                  className="font-heebo text-navy/65 leading-relaxed"
                  style={{ fontSize: 'clamp(0.98rem, 1.1vw, 1.15rem)' }}
                >
                  לבנות אנשים חזקים ואכפתיים שישפיעו על החברה הישראלית.
                </p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}
