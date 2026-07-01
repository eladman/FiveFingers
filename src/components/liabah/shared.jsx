// Shared presentational helpers for the ליבה page sections.
// Mirrors the section shell + heading patterns used across the homepage
// (see Programs.jsx) so the new page matches the existing look.

import Button from '../ui/Button'

/** Atmospheric glows + halftone dot grid + faint hand watermark. */
export function SectionBg({ watermark = true, flip = false }) {
  return (
    <>
      {/* Atmospheric glows */}
      <div className="pointer-events-none absolute top-[-5%] right-[-5%] w-[40vw] h-[50vh] rounded-full bg-orange/8 blur-[140px]" />
      <div className="pointer-events-none absolute bottom-[20%] left-[10%] w-[50vw] h-[40vh] rounded-full bg-orange/10 blur-[160px]" />

      {/* Halftone dot grid */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: 'radial-gradient(circle, #0d1b4b 1.2px, transparent 1.2px)',
          backgroundSize: '22px 22px',
          opacity: 0.04,
        }}
      />

      {/* Hand watermark */}
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
 * Centered section heading: brand display title (RagMarom) + orange subtitle
 * + a drawn-in accent rule. The accent animates from the center outward when
 * `animateClass` is supplied (the parent's reveal handles opacity/translate).
 */
export function SectionHeading({ eyebrow, title, subtitle, animateClass = '' }) {
  return (
    <div className="text-center pt-20 md:pt-28 pb-12 md:pb-16">
      {eyebrow && (
        <p className={`${animateClass} ds-eyebrow text-orange mb-3`}>
          {eyebrow}
        </p>
      )}
      <h2 className={`${animateClass} ds-section-title text-navy`}>
        {title}
      </h2>
      <div
        className={`${animateClass} mt-5 mx-auto h-1 rounded-full bg-orange`}
        style={{ width: 'clamp(3.5rem, 7vw, 6rem)' }}
      />
      {subtitle && (
        <p className={`${animateClass} ds-section-subtitle text-orange mt-5 mx-auto max-w-2xl`}>
          {subtitle}
        </p>
      )}
    </div>
  )
}

/**
 * The page-wide primary CTA: orange pill, lift on hover, sliding white sheen.
 * Renders a <button> by default, or an <a> when `href` is provided.
 */
/** Thin alias kept for existing call sites; delegates to the unified Button. */
export function PrimaryButton(props) {
  return <Button variant="primary" {...props} />
}
