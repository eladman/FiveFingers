import { ChevronLeft } from 'lucide-react'
import useReveal from '../../hooks/useReveal'
import Button from '../ui/Button'
import { AXES, YOAV_FACTS, YOAV_URL } from '../../data/alumniData'

/**
 * תוכנית יואב — the main event. Dark navy-gradient band (same anchor as AmirZones)
 * presenting the flagship alumni program: the three axes (פיתוח / חשיפה / השפעה),
 * the tribute to Yoav Shachar z"l, quick facts, and the primary funnel CTA out to
 * the dedicated yoavprogram.com site.
 */
export default function YoavProgram() {
  const ref = useReveal({ selector: '.yoav-animate', y: 40, stagger: 0.1, duration: 1.1, start: 'top 78%' })

  return (
    <section
      id="alumni-yoav"
      dir="rtl"
      className="relative w-full overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #1a2f6b 0%, #0d1b4b 45%, #081028 100%)' }}
    >
      {/* Orange radial warmth */}
      <div className="pointer-events-none absolute top-[-10%] right-[-5%] w-[45vw] h-[55vh] rounded-full bg-orange/10 blur-[170px]" />

      <div ref={ref} className="relative z-10 max-w-6xl mx-auto px-6 md:px-10 py-24 md:py-32">
        {/* Heading */}
        <div className="text-center">
          <p className="yoav-animate ds-eyebrow text-orange mb-4">תוכנית הדגל של הבוגרים</p>
          <h2 className="yoav-animate font-ragmarom text-white" style={{ fontSize: 'clamp(2.6rem, 5.5vw, 5rem)', lineHeight: 0.98 }}>
            תוכנית יואב
          </h2>
          <div className="yoav-animate mt-6 mx-auto h-1 w-16 rounded-full bg-orange" />
          <p className="yoav-animate font-heebo text-white/80 mt-6 mx-auto max-w-2xl leading-relaxed" style={{ fontSize: 'clamp(1.1rem, 1.7vw, 1.35rem)' }}>
            למקסם את הפוטנציאל שלך · להשפיע על המציאות שלנו.
          </p>
          <p className="yoav-animate font-heebo text-white/65 mt-4 mx-auto max-w-2xl leading-relaxed" style={{ fontSize: 'clamp(0.98rem, 1.3vw, 1.1rem)' }}>
            תוכנית ייחודית לצעירות וצעירים בגילאי 22–29, שמלווה תהליך של התפתחות
            אישית, חשיפה לעומק החברה הישראלית ויצירת השפעה בשטח.
          </p>
        </div>

        {/* Three axes */}
        <div className="mt-16 md:mt-20 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {AXES.map((a) => {
            const Icon = a.icon
            return (
              <div
                key={a.title}
                className="yoav-animate group relative flex flex-col rounded-[2rem] bg-white/[0.04] ring-1 ring-white/[0.08] border-t border-white/[0.12] p-8 md:p-9 transition-colors duration-300 hover:bg-white/[0.08]"
              >
                <span className="inline-flex text-orange">
                  <Icon size={34} strokeWidth={1.75} />
                </span>
                <h3 className="font-heebo font-bold text-white mt-6" style={{ fontSize: 'clamp(1.5rem, 2vw, 1.9rem)' }}>
                  {a.title}
                </h3>
                <p className="font-heebo font-semibold text-orange mt-2" style={{ fontSize: '0.98rem' }}>
                  {a.subtitle}
                </p>
                <p className="font-heebo text-white/70 leading-relaxed mt-5 flex-1">
                  {a.text}
                </p>
              </div>
            )
          })}
        </div>

        {/* Quick-fact chips */}
        <div className="yoav-animate mt-12 flex flex-wrap justify-center gap-3">
          {YOAV_FACTS.map((f) => (
            <span
              key={f}
              className="font-heebo text-white/85 text-sm md:text-base rounded-full border border-white/15 bg-white/[0.04] px-5 py-2"
            >
              {f}
            </span>
          ))}
        </div>

        {/* Tribute line */}
        <p className="yoav-animate mt-12 mx-auto max-w-2xl text-center font-heebo text-white/55 leading-relaxed" style={{ fontSize: 'clamp(0.9rem, 1.2vw, 1rem)' }}>
          התוכנית נקראת על שמו של יואב שחר ז״ל ושואבת השראה מדרכו - איש של חזון
          ומעשים, מנהיג, לוחם ומעל הכל בן אדם.
        </p>

        {/* Primary funnel CTA */}
        <div className="yoav-animate mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button
            variant="primary"
            size="lg"
            glow
            icon={ChevronLeft}
            href={YOAV_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            להגשת מועמדות לתוכנית יואב
          </Button>
          <Button
            variant="secondary"
            size="lg"
            href={YOAV_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            לאתר התוכנית
          </Button>
        </div>
      </div>
    </section>
  )
}
