// Shared presentational helpers for the ליבה page sections.
// Mirrors the section shell + heading patterns used across the homepage
// (see Programs.jsx) so the new page matches the existing look.

/** Atmospheric glows + halftone dot grid + faint hand watermark. */
export function SectionBg({ watermark = true, flip = false }) {
  return (
    <>
      {/* Atmospheric glows */}
      <div className="pointer-events-none absolute top-[-5%] right-[-5%] w-[40vw] h-[50vh] rounded-full bg-[#ff8714]/8 blur-[140px]" />
      <div className="pointer-events-none absolute bottom-[20%] left-[10%] w-[50vw] h-[40vh] rounded-full bg-[#ff8714]/10 blur-[160px]" />

      {/* Halftone dot grid */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: 'radial-gradient(circle, #000032 1.2px, transparent 1.2px)',
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
        <p
          className={`${animateClass} font-heebo font-semibold text-[#b35600] mb-3`}
          style={{ fontSize: 'clamp(0.7rem, 0.9vw, 0.85rem)', letterSpacing: '0.22em' }}
        >
          {eyebrow}
        </p>
      )}
      <h2
        className={`${animateClass} font-ragmarom text-[#000032] leading-[0.95] tracking-tight`}
        style={{ fontSize: 'clamp(2.8rem, 5vw, 5.5rem)' }}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={`${animateClass} font-heebo text-[#b35600] mt-4 leading-snug mx-auto max-w-2xl`}
          style={{ fontSize: 'clamp(1.1rem, 1.8vw, 1.7rem)' }}
        >
          {subtitle}
        </p>
      )}
      <div
        className={`${animateClass} mt-6 mx-auto h-1 rounded-full bg-[#ff8714]`}
        style={{ width: 'clamp(3.5rem, 7vw, 6rem)' }}
      />
    </div>
  )
}

/**
 * The page-wide primary CTA: orange pill, lift on hover, sliding white sheen.
 * Renders a <button> by default, or an <a> when `href` is provided.
 */
export function PrimaryButton({ children, onClick, href, icon: Icon, className = '', size = 'md' }) {
  const sizes = {
    md: 'px-8 py-3.5 text-base',
    lg: 'px-10 py-4 text-lg',
  }
  const base =
    `group relative overflow-hidden inline-flex items-center justify-center gap-2.5 ` +
    `bg-[#ff8714] text-white font-bold rounded-full focus-visible:outline-none ` +
    `focus-visible:ring-2 focus-visible:ring-[#ff8714] focus-visible:ring-offset-2 ` +
    `${sizes[size] || sizes.md} ${className}`

  const inner = (
    <>
      <span className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 rounded-full" />
      <span className="relative">{children}</span>
      {Icon && <Icon size={18} className="relative shrink-0" />}
    </>
  )

  const hover = {
    onMouseEnter: (e) => { e.currentTarget.style.transform = 'scale(1.04)' },
    onMouseLeave: (e) => { e.currentTarget.style.transform = 'scale(1)' },
    style: { transition: 'transform 280ms cubic-bezier(0.25, 0.46, 0.45, 0.94)' },
  }

  if (href) {
    return (
      <a href={href} className={base} {...hover}>
        {inner}
      </a>
    )
  }
  return (
    <button onClick={onClick} className={base} {...hover}>
      {inner}
    </button>
  )
}
