import { ArrowUpLeft } from 'lucide-react'
import useReveal from '../../hooks/useReveal'
import { press } from '../content'
import { Ltr } from '../shared'

/** One press card: the ynet piece, with the demand number that explains why הזנק exists. */
export default function Press() {
  const ref = useReveal({ selector: '.rv', y: 40, stagger: 0.1 })

  return (
    <section ref={ref} id="press" dir="rtl" className="relative w-full overflow-hidden bg-surface">
      <div className="relative z-10 max-w-screen-xl mx-auto px-5 sm:px-8 md:px-12 py-20 md:py-28">
        <a
          href={press.href}
          target="_blank"
          rel="noopener noreferrer"
          className="rv group block rounded-[2rem] bg-white border border-navy/[0.08] overflow-hidden shadow-[0_1px_2px_rgba(0,0,30,0.05),0_24px_60px_-24px_rgba(0,0,30,0.16)] transition-shadow duration-500 hover:shadow-[0_1px_2px_rgba(0,0,30,0.05),0_32px_80px_-24px_rgba(0,0,30,0.24)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange focus-visible:ring-offset-4 focus-visible:ring-offset-surface"
        >
          <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr]">
            <div className="p-8 md:p-12 lg:p-14">
              <p className="ds-eyebrow text-orange-ink">
                {press.kicker} <span className="text-navy/40 mx-1.5" aria-hidden="true">·</span>
                <span className="normal-case tracking-normal font-extrabold text-navy">{press.source}</span>
              </p>
              <h2 className="mt-5 font-heebo font-extrabold text-navy leading-[1.15]" style={{ fontSize: 'clamp(1.6rem, 2.6vw, 2.5rem)' }}>
                {press.headline}
              </h2>
              <blockquote className="mt-7 border-r-4 border-orange pr-5 font-heebo text-navy/70 leading-relaxed" style={{ fontSize: 'clamp(1.02rem, 1.25vw, 1.2rem)' }}>
                ״{press.quote}״
              </blockquote>
              <span className="mt-8 inline-flex items-center gap-2 font-heebo font-bold text-navy underline decoration-2 underline-offset-[6px] decoration-orange/50 group-hover:decoration-orange transition-colors">
                {press.linkLabel}
                <ArrowUpLeft size={18} className="transition-transform duration-300 group-hover:-translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
                <span className="sr-only">(נפתח בלשונית חדשה)</span>
              </span>
            </div>

            <div
              className="relative flex flex-col justify-center p-8 md:p-12 lg:p-14 text-white"
              style={{ background: 'linear-gradient(155deg, #1e3578 0%, #0d1b4b 50%, #081028 100%)' }}
            >
              <div aria-hidden="true" className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 80% 60% at 20% 100%, rgba(255,135,20,0.16) 0%, transparent 70%)' }} />
              <div className="relative">
                <div className="font-ragmarom text-orange leading-none tabular-nums" style={{ fontSize: 'clamp(4rem, 8vw, 7.5rem)' }}>
                  <Ltr>{press.figure.big}</Ltr>
                </div>
                <p className="mt-3 font-heebo font-bold text-white text-lg md:text-xl leading-snug">{press.figure.small}</p>
                <p className="mt-3 font-heebo text-white/70 leading-relaxed">{press.figure.note}</p>
              </div>
            </div>
          </div>
        </a>
      </div>
    </section>
  )
}
