import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ImageIcon } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const PROGRAMS = [
  {
    id: 'youth',
    title: 'קבוצות הנוער',
    badge: 'גילאי 12–18',
    description:
      'מיועדת לבני נוער מכיתה ז׳ עד י״ב. תכנית הבסיס של התנועה המהווה את יסודות השיטה הפיזית מנטלית. התכנית בונה ומעצבת היבטי חוסן, הרגלים, יכולות עבודה בצוות וכלים למנהיגות רבים בקרב בני ובנות נוער.',
    imageSrc: '/our_product_pics/core_pic.jpg',
    ctaHref: '#liabah',
    ctaLabel: 'לדף הליבה',
  },
  {
    id: 'academy',
    title: 'המכינה הקדם צבאית',
    badge: 'קדם צבא',
    description:
      'מטרתה של המכינה לחנך ולעצב דור שבוחר להיכנס לזירה ולהשפיע על מציאות חיינו. דור המבוסס על מאפייני הזהות של תנועת חמש אצבעות ועל מיומנויות רלוונטיות שרכש בתהליך החינוכי.',
    imageSrc: '/our_product_pics/mehina_pic.png',
    ctaContact: true,
  },
  {
    id: 'alumni',
    title: 'קהילת הבוגרים',
    badge: 'גילאי 18+',
    description:
      'תכנית ההמשך, מטרתה יצירת המשכיות לתהליך החינוכי. התכנית מותאמת לשינויים בחייהם של צעירים ומכווינה להשפעה חינוכית וחברתית על ידי תפיסת עמדות מפתח בחברה הישראלית.',
    imageSrc: '/our_product_pics/yoav_pic.jpg',
    ctaContact: true,
  },
  {
    id: 'collab',
    title: 'שיתופי פעולה',
    badge: 'ארגונים וצוותים',
    description:
      'סיוע לארגונים, צוותים, יחידות וספורטאים להגיע להישגים יחד, דרך התאמת שיטת ״חמש אצבעות״ לצרכים והמטרות המשתנות בכל גוף ומייצרת תהליך של מימוש פוטנציאל ספציפי וארגוני.',
    imageSrc: '/our_product_pics/collab_pic.jpg',
    ctaContact: true,
  },
]

// Clip paths for the parallelogram frame effect
// Even rows: lean right. Odd rows: lean left (mirrors in RTL).
const CLIP_EVEN = 'polygon(6% 0%, 100% 0%, 94% 100%, 0% 100%)'
const CLIP_ODD  = 'polygon(0% 0%, 94% 0%, 100% 100%, 6% 100%)'

export default function Programs({ onContactOpen }) {
  const ref = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      if (reduced) {
        gsap.set('.prog-section-heading, .prog-animate', { opacity: 1, y: 0 })
        return
      }
      gsap.fromTo(
        '.prog-section-heading',
        { y: 50, opacity: 0 },
        {
          y: 0, opacity: 1, stagger: 0.1, duration: 1.3, ease: 'power3.out',
          scrollTrigger: { trigger: ref.current, start: 'top 80%' },
        }
      )
      // Each row animates independently
      document.querySelectorAll('.prog-row').forEach((row) => {
        gsap.fromTo(
          row.querySelectorAll('.prog-animate'),
          { y: 60, opacity: 0 },
          {
            y: 0, opacity: 1, stagger: 0.1, duration: 1.3, ease: 'power3.out',
            scrollTrigger: { trigger: row, start: 'top 78%' },
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
      {/* ── Atmospheric glows ── */}
      <div className="pointer-events-none absolute top-[-5%] right-[-5%] w-[40vw] h-[50vh] rounded-full bg-orange/8 blur-[140px]" />
      <div className="pointer-events-none absolute bottom-[20%] left-[10%] w-[50vw] h-[40vh] rounded-full bg-orange/10 blur-[160px]" />

      {/* ── Halftone dot grid ── */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: 'radial-gradient(circle, #0d1b4b 1.2px, transparent 1.2px)',
          backgroundSize: '22px 22px',
          opacity: 0.04,
        }}
      />

      {/* ── Hand watermark ── */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <img
          src="/logo.png"
          alt=""
          aria-hidden="true"
          style={{
            position: 'absolute',
            left: '-3%',
            top: '50%',
            transform: 'translateY(-50%) rotate(-12deg) scaleX(-1)',
            width: '44%',
            maxWidth: '440px',
            opacity: 0.05,
            filter: 'grayscale(1)',
            userSelect: 'none',
          }}
        />
      </div>

      <div className="relative z-10 max-w-screen-xl mx-auto px-6 md:px-12 lg:px-20">

        {/* ── Section heading ── */}
        <div className="text-center pt-20 md:pt-28 pb-12 md:pb-16">
          <h2 className="prog-section-heading ds-section-title text-navy">
            תחומי פעילות
          </h2>
          <div
            className="prog-section-heading mt-6 mx-auto h-1 rounded-full bg-orange"
            style={{ width: 'clamp(3.5rem, 7vw, 6rem)' }}
          />
        </div>

        {/* ── Program rows ── */}
        <div className="flex flex-col">
          {PROGRAMS.map((prog, i) => {
            const isEven = i % 2 === 0
            const clip = isEven ? CLIP_EVEN : CLIP_ODD
            // Mobile (single column): always text first, image second — consistent across rows.
            // Desktop (md+): alternate sides. In RTL: order-1 = right side, order-2 = left side.
            //   Even: image left, text right → image md:order-2, text md:order-1
            //   Odd:  image right, text left → image md:order-1, text md:order-2
            const imageOrder = isEven ? 'order-2 md:order-2' : 'order-2 md:order-1'
            const textOrder  = isEven ? 'order-1 md:order-1' : 'order-1 md:order-2'
            const textAlign  = isEven ? 'text-right' : 'text-right md:text-left'
            const isLast = i === PROGRAMS.length - 1

            return (
              <div
                key={prog.id}
                className={`prog-row grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center py-16 md:py-20 ${
                  !isLast ? 'border-b border-navy/8' : 'pb-24'
                }`}
              >
                {/* ── Image column ── */}
                <div className={`prog-animate ${imageOrder}`}>
                  <div className="relative">
                    {/* Orange backing frame — offset behind */}
                    <div
                      className="absolute bg-orange"
                      style={{
                        inset: 0,
                        clipPath: clip,
                        transform: isEven
                          ? 'translate(14px, 14px)'
                          : 'translate(-14px, 14px)',
                      }}
                    />
                    {/* Image / placeholder */}
                    <div
                      className="relative aspect-[4/3] overflow-hidden"
                      style={{ clipPath: clip }}
                    >
                      {prog.imageSrc ? (
                        <img
                          src={prog.imageSrc}
                          alt={prog.title}
                          className="absolute inset-0 w-full h-full object-cover"
                        />
                      ) : (
                        <div className="absolute inset-0 bg-navy/[0.07] flex flex-col items-center justify-center gap-3">
                          <ImageIcon size={32} className="text-navy/20" strokeWidth={1.5} />
                          <span className="font-heebo text-navy/25 text-sm">תמונה בקרוב</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* ── Text column ── */}
                <div className={`prog-animate ${textOrder} flex flex-col gap-5 ${textAlign}`}>
                  {/* Title */}
                  <h3
                    className="font-heebo font-extrabold text-navy leading-[0.95] tracking-tight"
                    style={{ fontSize: 'clamp(2.4rem, 4vw, 5rem)' }}
                  >
                    {prog.title}
                  </h3>

                  {/* Badge */}
                  <span
                    className="self-start inline-flex items-center rounded-full bg-orange/10 text-[#ff8714] font-heebo font-semibold px-4 py-1.5"
                    style={{ fontSize: 'clamp(0.9rem, 1.2vw, 1.1rem)' }}
                  >
                    {prog.badge}
                  </span>

                  {/* Description */}
                  <p
                    className="font-heebo text-navy/65 leading-relaxed"
                    style={{ fontSize: 'clamp(0.95rem, 1.1vw, 1.1rem)' }}
                  >
                    {prog.description}
                  </p>

                  {/* CTA */}
                  <div>
                    {prog.ctaHref ? (
                      <a
                        href={prog.ctaHref}
                        className="group relative overflow-hidden inline-flex items-center justify-center gap-2.5 bg-orange text-white font-bold px-8 py-3.5 rounded-full text-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange focus-visible:ring-offset-2"
                        style={{ transition: 'transform 280ms cubic-bezier(0.25, 0.46, 0.45, 0.94)' }}
                        onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.04)' }}
                        onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)' }}
                      >
                        <span className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 rounded-full" />
                        <span className="relative">{prog.ctaLabel || 'למידע נוסף'}</span>
                      </a>
                    ) : prog.ctaContact ? (
                      <button
                        type="button"
                        onClick={() => onContactOpen?.(prog.title)}
                        className="group relative overflow-hidden inline-flex items-center justify-center gap-2.5 bg-orange text-white font-bold px-8 py-3.5 rounded-full text-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange focus-visible:ring-offset-2"
                        style={{ transition: 'transform 280ms cubic-bezier(0.25, 0.46, 0.45, 0.94)' }}
                        onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.04)' }}
                        onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)' }}
                      >
                        <span className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 rounded-full" />
                        <span className="relative">יצירת קשר</span>
                      </button>
                    ) : null}
                  </div>
                </div>

              </div>
            )
          })}
        </div>

      </div>
    </section>
  )
}
