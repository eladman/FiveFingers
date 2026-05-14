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
  },
  {
    id: 'academy',
    title: 'המכינה הקדם צבאית',
    badge: 'קדם צבא',
    description:
      'מטרתה של המכינה לחנך ולעצב דור שבוחר להיכנס לזירה ולהשפיע על מציאות חיינו. דור המבוסס על מאפייני הזהות של תנועת חמש אצבעות ועל מיומנויות רלוונטיות שרכש בתהליך החינוכי.',
    // imageSrc: '/programs/academy.jpg'
  },
  {
    id: 'alumni',
    title: 'קהילת הבוגרים',
    badge: 'גילאי 18+',
    description:
      'תכנית ההמשך, מטרתה יצירת המשכיות לתהליך החינוכי. התכנית מותאמת לשינויים בחייהם של צעירים ומכווינה להשפעה חינוכית וחברתית על ידי תפיסת עמדות מפתח בחברה הישראלית.',
    imageSrc: '/our_product_pics/yoav.jpg',
  },
  {
    id: 'collab',
    title: 'שיתופי פעולה',
    badge: 'ארגונים וצוותים',
    description:
      'סיוע לארגונים, צוותים, יחידות וספורטאים להגיע להישגים יחד, דרך התאמת שיטת ״חמש אצבעות״ לצרכים והמטרות המשתנות בכל גוף ומייצרת תהליך של מימוש פוטנציאל ספציפי וארגוני.',
    imageSrc: '/our_product_pics/collab_pic.jpg',
  },
]

// Clip paths for the parallelogram frame effect
// Even rows: lean right. Odd rows: lean left (mirrors in RTL).
const CLIP_EVEN = 'polygon(6% 0%, 100% 0%, 94% 100%, 0% 100%)'
const CLIP_ODD  = 'polygon(0% 0%, 94% 0%, 100% 100%, 6% 100%)'

export default function Programs() {
  const ref = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
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
      className="relative w-full overflow-hidden bg-[#fafaf8]"
    >
      {/* ── Atmospheric glows ── */}
      <div className="pointer-events-none absolute top-[-5%] right-[-5%] w-[40vw] h-[50vh] rounded-full bg-[#ff8714]/8 blur-[140px]" />
      <div className="pointer-events-none absolute bottom-[20%] left-[10%] w-[50vw] h-[40vh] rounded-full bg-[#ff8714]/10 blur-[160px]" />

      <div className="relative z-10 max-w-screen-xl mx-auto px-6 md:px-12 lg:px-20">

        {/* ── Section heading ── */}
        <div className="text-center pt-24 pb-16">
          <h2
            className="prog-section-heading font-inter font-extrabold text-[#000032] leading-none tracking-tight"
            style={{ fontSize: 'clamp(2.4rem, 4.5vw, 5rem)' }}
          >
            תחומי פעילות
          </h2>
          <p
            className="prog-section-heading font-frank italic text-[#ff8714] mt-3 leading-snug"
            style={{ fontSize: 'clamp(1.2rem, 2vw, 2.2rem)' }}
          >
            הכירו את התכניות שלנו
          </p>
          <div className="prog-section-heading mt-5 mx-auto w-14 h-1 rounded-full bg-[#ff8714]" />
        </div>

        {/* ── Program rows ── */}
        <div className="flex flex-col">
          {PROGRAMS.map((prog, i) => {
            const isEven = i % 2 === 0
            const clip = isEven ? CLIP_EVEN : CLIP_ODD
            // In RTL: order-1 = right side, order-2 = left side
            // Even: image left, text right → image order-2, text order-1
            // Odd:  image right, text left → image order-1, text order-2
            const imageOrder = isEven ? 'order-2' : 'order-1'
            const textOrder  = isEven ? 'order-1' : 'order-2'
            const textAlign  = isEven ? 'text-right' : 'text-right md:text-left'
            const isLast = i === PROGRAMS.length - 1

            return (
              <div
                key={prog.id}
                className={`prog-row grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center py-16 md:py-20 ${
                  !isLast ? 'border-b border-[#000032]/8' : 'pb-24'
                }`}
              >
                {/* ── Image column ── */}
                <div className={`prog-animate ${imageOrder}`}>
                  <div className="relative">
                    {/* Orange backing frame — offset behind */}
                    <div
                      className="absolute bg-[#ff8714]"
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
                        <div className="absolute inset-0 bg-[#000032]/[0.07] flex flex-col items-center justify-center gap-3">
                          <ImageIcon size={32} className="text-[#000032]/20" strokeWidth={1.5} />
                          <span className="font-heebo text-[#000032]/25 text-sm">תמונה בקרוב</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* ── Text column ── */}
                <div className={`prog-animate ${textOrder} flex flex-col gap-5 ${textAlign}`}>
                  {/* Title */}
                  <h3
                    className="font-inter font-extrabold text-[#000032] leading-[0.95] tracking-tight"
                    style={{ fontSize: 'clamp(2.4rem, 4vw, 5rem)' }}
                  >
                    {prog.title}
                  </h3>

                  {/* Badge */}
                  <p
                    className="font-frank italic text-[#ff8714] leading-none"
                    style={{ fontSize: 'clamp(1.1rem, 1.6vw, 1.6rem)' }}
                  >
                    {prog.badge}
                  </p>

                  {/* Description */}
                  <p
                    className="font-heebo text-[#000032]/65 leading-relaxed"
                    style={{ fontSize: 'clamp(0.95rem, 1.1vw, 1.1rem)' }}
                  >
                    {prog.description}
                  </p>

                  {/* CTA */}
                  <div>
                    <a
                      href={`#${prog.id}`}
                      className="inline-block font-inter font-bold text-white bg-[#ff8714] px-8 py-3.5 rounded-xl text-base hover:bg-[#e07610] transition-colors duration-200"
                    >
                      למידע נוסף
                    </a>
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
