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

/** Centered section heading: title + orange subtitle + accent rule. */
export function SectionHeading({ title, subtitle, animateClass = '' }) {
  return (
    <div className="text-center pt-24 pb-16">
      <h2
        className={`${animateClass} font-heebo font-extrabold text-[#000032] leading-none tracking-tight`}
        style={{ fontSize: 'clamp(2.4rem, 4.5vw, 5rem)' }}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={`${animateClass} font-heebo text-[#ff8714] mt-3 leading-snug`}
          style={{ fontSize: 'clamp(1.2rem, 2vw, 2.2rem)' }}
        >
          {subtitle}
        </p>
      )}
      <div className={`${animateClass} mt-5 mx-auto w-14 h-1 rounded-full bg-[#ff8714]`} />
    </div>
  )
}
