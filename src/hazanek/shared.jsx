// Small helpers shared by the /hazanek sections.

/** Scroll to the registration form. Native smooth scroll (index.css sets it),
 *  instant under reduced motion. Focuses the first field for keyboard users. */
export function goToRegister(e) {
  e?.preventDefault?.()
  const el = document.getElementById('register')
  if (!el) return
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  el.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' })
  if (e && e.detail === 0) {
    // Keyboard activation (Enter/Space) — move focus into the form.
    setTimeout(() => document.getElementById('ff-name')?.focus({ preventScroll: true }), reduced ? 0 : 600)
  }
}

/** Dates and ratios read left-to-right inside RTL text. */
export function Ltr({ children, className = '' }) {
  return <span dir="ltr" className={`inline-block ${className}`}>{children}</span>
}

/** Section heading: eyebrow, RagMarom title, orange accent rule (DESIGN.MD §5). */
export function Heading({ kicker, title, dark = false, center = false, cls = 'rv' }) {
  return (
    <div className={center ? 'text-center' : 'text-right'}>
      <p className={`${cls} ds-eyebrow mb-4 ${dark ? 'text-orange' : 'text-orange-ink'}`}>{kicker}</p>
      <h2
        className={`${cls} ds-section-title ${dark ? 'text-white' : 'text-navy'}`}
        style={dark ? { textShadow: '0 2px 20px rgba(0,0,0,0.35)' } : undefined}
      >
        {title}
      </h2>
      <div className={`${cls} mt-6 w-14 h-1 rounded-full bg-orange ${center ? 'mx-auto' : 'ml-auto'}`} />
    </div>
  )
}

/** Light-section atmosphere: orange glows + halftone dots (DESIGN.MD §3, Mode C). */
export function LightAtmosphere() {
  return (
    <>
      <div aria-hidden="true" className="pointer-events-none absolute -top-[10%] -right-[8%] w-[40vw] h-[50vh] rounded-full bg-orange/[0.07] blur-[150px]" />
      <div aria-hidden="true" className="pointer-events-none absolute bottom-0 left-[10%] w-[50vw] h-[40vh] rounded-full bg-orange/[0.09] blur-[160px]" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: 'radial-gradient(circle, #0d1b4b 1.2px, transparent 1.2px)',
          backgroundSize: '22px 22px',
          opacity: 0.04,
        }}
      />
    </>
  )
}
