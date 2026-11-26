import { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ArrowLeft, HeartHandshake } from 'lucide-react'
import Button from '../../components/ui/Button'
import { LINKS, donate, partner } from '../content'
import { Title, WRAP, reducedMotion, useSectionMotion } from '../shared'

/**
 * Two ways in after the group conversation (which lives with the formats):
 * become a partner — the one dark, emotional moment on the page — and give,
 * kept modest so the page never reads as a fundraising site.
 */
export default function Join() {
  return (
    <>
      <Partner />
      <Donate />
    </>
  )
}

/* 14 — רוצים להיות שותפים? The plans, marked up by hand, rise off the table. */
function Partner() {
  const ref = useRef(null)
  useSectionMotion(ref)

  useLayoutEffect(() => {
    const el = ref.current
    if (!el || reducedMotion()) return
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.pt-paper',
        { rotationX: 58, rotationZ: -6, y: 80, scale: 0.9 },
        {
          rotationX: 0,
          rotationZ: -2,
          y: 0,
          scale: 1,
          ease: 'none',
          scrollTrigger: { trigger: '.pt-stage', start: 'top 95%', end: 'center 50%', scrub: 0.8 },
        }
      )
      gsap.fromTo(
        '.pt-shadow',
        { opacity: 0.15, scaleY: 0.4 },
        { opacity: 0.55, scaleY: 1, ease: 'none', scrollTrigger: { trigger: '.pt-stage', start: 'top 95%', end: 'center 50%', scrub: 0.8 } }
      )
    }, el)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={ref} id="partner" dir="rtl" aria-labelledby="partner-title" className="relative w-full overflow-hidden bg-navy-deep text-white scroll-mt-16">
      <div aria-hidden="true" className="rf-furrows pointer-events-none absolute inset-0 opacity-[0.05]" />
      <div className={`${WRAP} relative py-24 md:py-36 grid grid-cols-1 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] gap-16 lg:gap-20 items-center`}>
        <div>
          <Title id="partner-title" title={partner.title} tone="white" size="md" />
          <p className="rv mt-9 font-heebo font-semibold text-white leading-snug" style={{ fontSize: 'clamp(1.2rem, 1.7vw, 1.6rem)' }}>
            {partner.lead}
          </p>
          <ul className="mt-5 space-y-2">
            {partner.lines.map((line) => (
              <li key={line} className="rv flex items-baseline gap-3 font-heebo text-white/85 leading-relaxed" style={{ fontSize: 'clamp(1.05rem, 1.3vw, 1.3rem)' }}>
                <span aria-hidden="true" className="mt-[0.55em] h-[3px] w-4 shrink-0 rounded-full bg-orange" />
                {line}
              </li>
            ))}
          </ul>
          <p className="rv mt-7 max-w-xl font-heebo text-white/80 leading-relaxed" style={{ fontSize: 'clamp(1.05rem, 1.25vw, 1.25rem)' }}>
            {partner.closing}
          </p>
          <div className="rv mt-10 flex flex-wrap items-center gap-3.5">
            <Button href={LINKS.partner} target="_blank" rel="noopener noreferrer" size="lg" icon={ArrowLeft}>
              {partner.primary}
            </Button>
            <Button href="#donate" variant="secondary" size="lg">
              {partner.secondary}
            </Button>
          </div>
        </div>

        <div className="pt-stage relative mx-auto w-full max-w-[520px]" style={{ perspective: '1400px' }}>
          <div aria-hidden="true" className="pt-shadow absolute inset-x-[8%] bottom-[-6%] h-[18%] rounded-[50%] bg-black blur-2xl" />
          <div className="pt-paper relative overflow-hidden rounded-xl bg-white shadow-[0_40px_90px_-20px_rgba(0,0,0,0.6)]" style={{ transformOrigin: '50% 100%', transform: 'rotate(-2deg)' }}>
            <img src={partner.image} alt={partner.imageAlt} loading="lazy" className="block aspect-[3/4] w-full object-cover" />
          </div>
        </div>
      </div>
    </section>
  )
}

/* 15 — תרומה */
function Donate() {
  const ref = useRef(null)
  useSectionMotion(ref)
  return (
    <section ref={ref} id="donate" dir="rtl" aria-labelledby="donate-title" className="relative w-full overflow-hidden bg-wheat scroll-mt-16">
      <div className={`${WRAP} py-20 md:py-28 grid grid-cols-1 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] gap-8 lg:gap-20 items-center`}>
        <Title id="donate-title" title={donate.title} size="md" />
        <div>
          <div className="space-y-3">
            {donate.paragraphs.map((p, i) => (
              <p
                key={i}
                className={`rv font-heebo leading-relaxed ${i === 0 ? 'font-semibold text-navy' : 'text-navy/80'}`}
                style={{ fontSize: i === 0 ? 'clamp(1.15rem, 1.5vw, 1.4rem)' : 'clamp(1rem, 1.15vw, 1.15rem)' }}
              >
                {p}
              </p>
            ))}
          </div>
          <div className="rv mt-8">
            <Button href={LINKS.donate} target="_blank" rel="noopener noreferrer" icon={HeartHandshake}>
              {donate.cta}
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
