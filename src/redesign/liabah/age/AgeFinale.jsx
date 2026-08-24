import { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Button from '../../../components/ui/Button'
import useMagnetic from '../../useMagnetic'
import { WHATSAPP_HREF } from '../../../data/contact'

gsap.registerPlugin(ScrollTrigger)

/**
 * The last beat — pictures, then one question and one door (the
 * LiabahFinaleV2 language). A three-photo band from the field leads into
 * a full-bleed photo CTA with a magnetic primary button and the contact
 * channels as one quiet line.
 */
export default function AgeFinale({ page, onRegister }) {
  const ref = useRef(null)
  const magnetRef = useMagnetic(0.3)
  const { finale, gallery } = page

  // render the accent word(s) in orange
  const [before, after] = finale.title.split(finale.titleAccent)

  useLayoutEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const ctx = gsap.context(() => {
      if (reduced) return

      gsap.fromTo('.agf-pic',
        { y: 48, opacity: 0 },
        {
          y: 0, opacity: 1, stagger: 0.12, duration: 1.0, ease: 'power3.out',
          scrollTrigger: { trigger: '.agf-strip', start: 'top 82%', once: true },
        }
      )
      gsap.fromTo('.agf-photo',
        { scale: 1.14 },
        {
          scale: 1,
          ease: 'none',
          scrollTrigger: { trigger: '.agf-cta', start: 'top bottom', end: 'bottom top', scrub: 1 },
        }
      )
      gsap.fromTo('.agf-el',
        { y: 44, opacity: 0 },
        {
          y: 0, opacity: 1, stagger: 0.12, duration: 1.1, ease: 'power3.out',
          scrollTrigger: { trigger: '.agf-cta', start: 'top 68%', once: true },
        }
      )
    }, ref)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={ref} dir="rtl">
      {/* ── moments from the field ── */}
      <section className="agf-strip relative w-full overflow-hidden bg-surface-2">
        <div className="relative z-10 max-w-screen-xl mx-auto px-6 sm:px-10 md:px-16 pb-16 md:pb-24">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            {gallery.map((pic, i) => (
              <div
                key={pic.src}
                className={`agf-pic relative overflow-hidden rounded-[1.4rem] shadow-[0_16px_44px_rgba(0,0,30,0.14)] ${
                  i === 1 ? 'md:-translate-y-6' : ''
                } ${i === 2 ? 'col-span-2 md:col-span-1' : ''}`}
              >
                <div className={`overflow-hidden ${i === 2 ? 'aspect-[16/8] md:aspect-[4/5]' : 'aspect-[4/5]'}`}>
                  <img
                    src={pic.src}
                    alt={pic.alt}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover hover:scale-[1.05] transition-transform duration-700"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── one question, one door ── */}
      <section
        id={`liabah/${page.id}-cta`}
        className="agf-cta relative w-full min-h-[92dvh] overflow-hidden flex items-center justify-center bg-navy-deep"
      >
        <div className="absolute inset-0 overflow-hidden">
          <img
            src={finale.imageSrc}
            alt=""
            aria-hidden="true"
            loading="lazy"
            decoding="async"
            className="agf-photo absolute inset-0 w-full h-full object-cover will-change-transform"
          />
          <div className="absolute inset-0 bg-orange/10 mix-blend-multiply" />
          <div className="absolute inset-0 bg-black/60" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/60" />
        </div>

        <div className="relative z-10 w-full max-w-4xl mx-auto px-6 sm:px-10 text-center py-28">
          <h2
            className="agf-el font-ragmarom text-white leading-[1.0]"
            style={{ fontSize: 'clamp(2.8rem, 7vw, 7rem)', textShadow: '0 4px 32px rgba(0,0,0,0.9)', textWrap: 'balance' }}
          >
            {before}
            <span className="text-orange">{finale.titleAccent}</span>
            {after}
          </h2>
          <p
            className="agf-el font-heebo text-white/80 mt-6 max-w-xl mx-auto leading-relaxed"
            style={{ fontSize: 'clamp(1.05rem, 1.4vw, 1.3rem)', textShadow: '0 2px 16px rgba(0,0,0,0.8)' }}
          >
            {finale.subtitle}
          </p>

          <div className="agf-el mt-11 flex flex-wrap items-center justify-center gap-5">
            <span ref={magnetRef} className="inline-block">
              <Button variant="primary" size="lg" glow onClick={onRegister}>
                הרשמה לקבוצה
              </Button>
            </span>
            <Button
              variant="ghost"
              size="lg"
              href={WHATSAPP_HREF}
              target="_blank"
              rel="noopener noreferrer"
            >
              דברו איתנו בוואטסאפ
            </Button>
          </div>

          {/* contact channels — one quiet line */}
          <div
            className="agf-el mt-14 pt-6 border-t border-white/15 flex flex-wrap items-center justify-center gap-x-8 gap-y-2 font-heebo text-sm md:text-base"
            style={{ textShadow: '0 1px 10px rgba(0,0,0,0.7)' }}
          >
            <a href="tel:0556855850" dir="ltr" className="tap-safe text-white/60 hover:text-white transition-colors">
              055-685-5850
            </a>
            <span className="w-1 h-1 rounded-full bg-orange inline-block" aria-hidden="true" />
            <a href="mailto:service@5fingers.org.il" dir="ltr" className="tap-safe text-white/60 hover:text-white transition-colors">
              service@5fingers.org.il
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
