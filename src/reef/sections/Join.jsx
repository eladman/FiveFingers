import { ArrowLeft, HeartHandshake } from 'lucide-react'
import Button from '../../components/ui/Button'
import useReveal from '../../hooks/useReveal'
import { come, donate, LINKS, partner } from '../content'
import { Head, Para, WhatsAppIcon, WRAP } from '../shared'

/**
 * Three ways in, in rising order of commitment: bring a group (13), become a
 * partner (14 — the one dark, emotional moment on the page), give (15 — kept
 * modest so the page never reads as a fundraising site).
 */
export default function Join() {
  return (
    <>
      <Come />
      <Partner />
      <Donate />
    </>
  )
}

/* 13 — רוצים להגיע? */
function Come() {
  const ref = useReveal({ selector: '.rv', y: 40, stagger: 0.09 })
  return (
    <section ref={ref} id="come" dir="rtl" className="relative w-full overflow-hidden bg-white scroll-mt-16">
      <div className={`${WRAP} py-20 md:py-32 text-center`}>
        <Head kicker={come.kicker} title={come.title} center long />
        <div className="mt-8 mx-auto max-w-2xl space-y-2">
          {come.paragraphs.map((p, i) => (
            <Para key={i} lead={i === 0}>{p}</Para>
          ))}
        </div>
        <div className="rv mt-10">
          <Button href={LINKS.group} target="_blank" rel="noopener noreferrer" size="lg" icon={WhatsAppIcon}>
            {come.cta}
          </Button>
        </div>
      </div>
    </section>
  )
}

/* 14 — רוצים להיות שותפים? */
function Partner() {
  const ref = useReveal({ selector: '.rv', y: 44, stagger: 0.09 })
  return (
    <section ref={ref} id="partner" dir="rtl" className="relative w-full overflow-hidden bg-navy-deep text-white scroll-mt-16">
      <img
        src={partner.image}
        alt={partner.imageAlt}
        loading="lazy"
        className="absolute inset-0 w-full h-full object-cover"
        style={{ objectPosition: '50% 52%' }}
      />
      {/* navy grade: the plans stay readable on the far side, the text side is grounded */}
      <div aria-hidden="true" className="absolute inset-0 bg-navy-deep/60" />
      <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-navy-deep via-navy-deep/70 to-transparent lg:via-navy-deep/25" />
      <div aria-hidden="true" className="absolute inset-0 hidden lg:block bg-gradient-to-l from-navy-deep via-navy-deep/75 to-transparent" />

      <div className={`${WRAP} relative z-10 pt-56 md:pt-64 lg:pt-36 pb-20 md:pb-28 lg:pb-36`}>
        <div className="max-w-2xl">
          <Head kicker={partner.kicker} title={partner.title} dark long />
          <p
            className="rv mt-9 font-heebo font-medium text-white leading-snug"
            style={{ fontSize: 'clamp(1.2rem, 1.7vw, 1.6rem)', textShadow: '0 2px 20px rgba(0,0,0,0.6)' }}
          >
            {partner.lead}
          </p>
          <ul className="mt-5 space-y-1.5">
            {partner.lines.map((line) => (
              <li
                key={line}
                className="rv font-heebo text-white/85 leading-relaxed"
                style={{ fontSize: 'clamp(1.05rem, 1.3vw, 1.3rem)', textShadow: '0 2px 20px rgba(0,0,0,0.6)' }}
              >
                {line}
              </li>
            ))}
          </ul>
          <p
            className="rv mt-6 max-w-2xl font-heebo text-white/85 leading-relaxed"
            style={{ fontSize: 'clamp(1.05rem, 1.3vw, 1.3rem)', textShadow: '0 2px 20px rgba(0,0,0,0.6)' }}
          >
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
      </div>
    </section>
  )
}

/* 15 — תרומה */
function Donate() {
  const ref = useReveal({ selector: '.rv', y: 36, stagger: 0.09 })
  return (
    <section ref={ref} id="donate" dir="rtl" className="relative w-full overflow-hidden bg-white scroll-mt-16">
      <div className={`${WRAP} py-20 md:py-28`}>
        <div className="rv rounded-[2rem] border border-line bg-surface px-6 py-10 sm:px-10 md:px-14 md:py-16 grid grid-cols-1 lg:grid-cols-[1.25fr_1fr] gap-8 lg:gap-16 items-center">
          <div>
            <Head kicker={donate.kicker} title={donate.title} long cls="" />
          </div>
          <div>
            <div className="space-y-3">
              {donate.paragraphs.map((p, i) => (
                <p
                  key={i}
                  className={`font-heebo leading-relaxed ${i === 0 ? 'font-medium text-navy' : 'text-navy/70'}`}
                  style={{ fontSize: i === 0 ? 'clamp(1.15rem, 1.5vw, 1.4rem)' : 'clamp(1rem, 1.15vw, 1.15rem)' }}
                >
                  {p}
                </p>
              ))}
            </div>
            <div className="mt-8">
              <Button href={LINKS.donate} target="_blank" rel="noopener noreferrer" icon={HeartHandshake}>
                {donate.cta}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
