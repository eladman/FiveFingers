// Shared presentational helpers for the אקדמיה (Academy) page.
// "Museum / Scholarly" *layout* (generous whitespace, thin hairlines, ruled lists,
// signature interactions) — but anchored to the site's shared design system
// (surface background, orange atmospheric glows + halftone dots + hand watermark,
// orange accent) so it reads as the same movement, elevated.

import Button from '../ui/Button'

/**
 * The shared site atmosphere, toned down a touch for the museum feel:
 * faint orange glows + halftone dot grid + optional hand watermark.
 * Mirrors the homepage / Liabah background system for cohesion.
 */
export function Atmosphere({ watermark = false, flip = false }) {
  return (
    <>
      <div className="pointer-events-none absolute top-[-5%] right-[-5%] w-[40vw] h-[50vh] rounded-full bg-orange/6 blur-[150px]" />
      <div className="pointer-events-none absolute bottom-[15%] left-[8%] w-[46vw] h-[40vh] rounded-full bg-orange/8 blur-[160px]" />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: 'radial-gradient(circle, #000032 1.2px, transparent 1.2px)',
          backgroundSize: '22px 22px',
          opacity: 0.04,
        }}
      />
      {watermark && (
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <img
            src="/logo.png"
            alt=""
            aria-hidden="true"
            style={{
              position: 'absolute',
              [flip ? 'right' : 'left']: '-3%',
              top: '50%',
              transform: `translateY(-50%) rotate(${flip ? 12 : -12}deg)${flip ? '' : ' scaleX(-1)'}`,
              width: '44%',
              maxWidth: '440px',
              opacity: 0.05,
              filter: 'grayscale(1)',
              userSelect: 'none',
            }}
          />
        </div>
      )}
    </>
  )
}

/**
 * Section shell on the site surface, with the shared atmosphere. Optional `frame`
 * draws a faint inner hairline "mat" (museum framing).
 */
export function MuseumSection({
  id, children, bg = 'surface', atmosphere = true, watermark = false, flip = false,
  frame = false, className = '', dir = 'rtl',
}) {
  const bgClass = bg === 'white' ? 'bg-[#ffffff]' : bg === 'surface-2' ? 'bg-surface-2' : 'bg-surface'
  return (
    <section id={id} dir={dir} className={`relative w-full overflow-hidden ${bgClass} ${className}`}>
      {atmosphere && <Atmosphere watermark={watermark} flip={flip} />}
      {frame && (
        <div aria-hidden="true" className="pointer-events-none absolute inset-5 md:inset-8 rounded-[2rem] border border-navy/[0.08]" />
      )}
      {children}
    </section>
  )
}

/**
 * Restrained editorial heading: a wide-tracked orange kicker, a RagMarom title,
 * the family's orange accent rule, and an optional lead. Centered by default;
 * pass `align="start"` for an asymmetric (RTL-right) editorial composition.
 */
export function MuseumHeading({ kicker, title, lead, align = 'center', animateClass = '' }) {
  const isCenter = align === 'center'
  return (
    <div className={`${isCenter ? 'text-center mx-auto' : 'text-right'} max-w-3xl ${isCenter ? '' : 'me-auto'}`}>
      {kicker && (
        <p className={`${animateClass} ds-eyebrow text-orange-ink mb-5`}>
          {kicker}
        </p>
      )}
      <h2 className={`${animateClass} ds-section-title text-navy`}>
        {title}
      </h2>
      <div className={`${animateClass} mt-6 h-1 rounded-full bg-orange w-16 ${isCenter ? 'mx-auto' : ''}`} />
      {lead && (
        <p className={`${animateClass} ds-section-subtitle text-[#ff8714] mt-7 ${isCenter ? 'mx-auto' : ''}`}>
          {lead}
        </p>
      )}
    </div>
  )
}

/** A reusable 1px hairline rule. */
export function Rule({ className = '' }) {
  return <div aria-hidden="true" className={`h-px w-full bg-navy/12 ${className}`} />
}

/** Solid orange CTA (reuses the unified Button). Use one per major section. */
export function PrimaryButton(props) {
  return <Button variant="primary" {...props} />
}

/**
 * Quiet secondary action for light backgrounds: a navy hairline-outline pill
 * (the dark-bg Button `secondary`/`ghost` variants don't suit a light surface).
 * Renders an <a> when `href` is given, otherwise a <button>.
 */
export function QuietButton({ children, href, onClick, icon: Icon, className = '', ...rest }) {
  const base =
    'group inline-flex items-center justify-center gap-2.5 rounded-full border border-navy/25 ' +
    'px-8 py-3.5 font-heebo font-semibold text-navy text-base transition-colors duration-300 ' +
    'hover:border-navy/60 hover:bg-navy/[0.03] focus-visible:outline-none focus-visible:ring-2 ' +
    'focus-visible:ring-navy/40 focus-visible:ring-offset-2 focus-visible:ring-offset-surface ' +
    className
  const inner = (
    <>
      <span className="relative">{children}</span>
      {Icon && <Icon size={18} className="shrink-0" aria-hidden="true" />}
    </>
  )
  if (href) {
    return <a href={href} className={base} {...rest}>{inner}</a>
  }
  return <button type="button" onClick={onClick} className={base} {...rest}>{inner}</button>
}
