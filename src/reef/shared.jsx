// Small pieces shared by the /reef sections.
import { useLayoutEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/** Page gutters + max width, same measure as the rest of the site. */
export const WRAP = 'max-w-screen-xl mx-auto px-5 sm:px-8 md:px-12'

export const reducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

/** Smooth-scroll to an in-page target without touching the URL hash (the
 *  visit counter logs hash changes as page views). Instant under reduced motion. */
export function scrollToId(id) {
  const el = document.getElementById(id)
  if (!el) return false
  // The hero is pinned: its id points at the top of the document, not the pin spacer.
  const behavior = reducedMotion() ? 'auto' : 'smooth'
  if (id === 'top') {
    window.scrollTo({ top: 0, behavior })
  } else {
    el.scrollIntoView({ behavior, block: 'start' })
    // On a first visit, lazy images and the pins' re-measure can shift the page
    // mid-flight and strand a long smooth scroll short of its target. Check
    // where we landed once the scroll settles, and finish the trip if needed.
    const settle = () => {
      clearTimeout(fallback)
      window.removeEventListener('scrollend', settle)
      const margin = parseFloat(getComputedStyle(el).scrollMarginTop) || 0
      if (Math.abs(el.getBoundingClientRect().top - margin) > 12) el.scrollIntoView({ behavior: 'auto', block: 'start' })
    }
    const fallback = setTimeout(settle, 2200)
    window.addEventListener('scrollend', settle, { once: true })
  }
  // Move keyboard focus with the scroll so Tab continues from the new section.
  if (!el.hasAttribute('tabindex')) el.setAttribute('tabindex', '-1')
  el.focus({ preventScroll: true })
  return true
}

/**
 * Section motion, shared grammar:
 *  .rf-line  — a title line rising out of its mask
 *  .rv       — a block easing up into place
 *  .rf-fade  — opacity only, slow (the quiet register)
 * Content is visible in the markup; motion only runs when it can.
 */
export function useSectionMotion(ref, { start = 'top 78%' } = {}) {
  useLayoutEffect(() => {
    const el = ref.current
    if (!el || reducedMotion()) return
    const ctx = gsap.context(() => {
      const trigger = { trigger: el, start, once: true }
      const lines = el.querySelectorAll('.rf-line')
      if (lines.length) {
        gsap.fromTo(lines, { yPercent: 104 }, { yPercent: 0, duration: 1.15, stagger: 0.1, ease: 'expo.out', scrollTrigger: trigger })
      }
      const blocks = el.querySelectorAll('.rv')
      if (blocks.length) {
        gsap.set(blocks, { y: 34, opacity: 0 })
        ScrollTrigger.batch(blocks, {
          start: 'top 90%',
          once: true,
          onEnter: (batch) => gsap.to(batch, { y: 0, opacity: 1, duration: 1.1, ease: 'expo.out', stagger: 0.08, overwrite: true }),
        })
      }
      const fades = el.querySelectorAll('.rf-fade')
      if (fades.length) {
        gsap.fromTo(fades, { opacity: 0 }, { opacity: 1, duration: 1.8, stagger: 0.22, ease: 'power1.out', scrollTrigger: trigger })
      }
    }, el)
    return () => ctx.revert()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
}

/**
 * A section title whose lines rise out of their own masks.
 * `title` may be a string or an array of lines; `accent` colours the last line.
 */
export function Title({ title, as: Tag = 'h2', size = 'lg', tone = 'navy', accent = false, className = '', id }) {
  const lines = Array.isArray(title) ? title : [title]
  const sizes = {
    xl: 'clamp(3rem, 7.4vw, 7rem)',
    lg: 'clamp(2.6rem, 5.2vw, 5.25rem)',
    md: 'clamp(2.2rem, 3.9vw, 3.9rem)',
  }
  const color = tone === 'white' ? 'text-white' : tone === 'deep' ? 'text-navy-deep' : 'text-navy'
  return (
    <Tag
      id={id}
      className={`font-ragmarom leading-[0.96] tracking-[-0.015em] text-balance ${color} ${className}`}
      style={{ fontSize: sizes[size] || size }}
    >
      {lines.map((line, i) => (
        <span key={i} className="block overflow-hidden pb-[0.08em] -mb-[0.08em]">
          <span
            className={`rf-line block ${accent && i === lines.length - 1 ? (tone === 'white' ? 'text-orange' : 'text-orange-ink') : ''}`}
          >
            {line}
          </span>
        </span>
      ))}
    </Tag>
  )
}

/**
 * "The way": a short winding path, this page's version of the site's orange
 * accent rule. Decorative.
 */
export function PathRule({ className = '', draw = false, width = 96 }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 96 20"
      width={width}
      height={(width * 20) / 96}
      fill="none"
      className={`block ${className}`}
    >
      <path
        pathLength="1"
        className={`rf-path ${draw ? 'rf-path-draw' : ''}`}
        d="M94 14 C 80 2, 68 2, 56 10 S 34 20, 22 10 S 8 4, 2 8"
        stroke="#ff8714"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  )
}

/** Body paragraph on a light surface. `lead` is the first, stronger one. */
export function Para({ children, lead = false, className = '', fx = 'rv' }) {
  return (
    <p
      className={`${fx} font-heebo leading-relaxed ${lead ? 'text-navy font-medium' : 'text-navy/75'} ${className}`}
      style={{ fontSize: lead ? 'clamp(1.15rem, 1.5vw, 1.4rem)' : 'clamp(1.02rem, 1.15vw, 1.15rem)' }}
    >
      {children}
    </p>
  )
}

export const focusRing =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy focus-visible:ring-offset-2'

/** Outline pill for light surfaces (the site's Button only has dark-surface secondaries). */
export function OutlineLink({ href, children, icon: Icon, external = false, className = '', ...rest }) {
  return (
    <a
      href={href}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      className={`rf-outline group inline-flex items-center justify-center gap-2.5 whitespace-nowrap rounded-full border border-navy/25 bg-white/60 px-8 py-3.5 font-heebo text-base font-bold text-navy transition-colors duration-300 ease-brand hover:border-navy hover:bg-navy hover:text-white active:scale-[0.97] ${focusRing} ${className}`}
      {...rest}
    >
      <span>{children}</span>
      {Icon && <Icon size={18} className="shrink-0 transition-transform duration-300 ease-brand group-hover:-translate-x-0.5" aria-hidden="true" />}
    </a>
  )
}

/** Brand glyphs lucide no longer ships. */
export function InstagramIcon({ size = 20, className = '' }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.4" cy="6.6" r="0.6" fill="currentColor" />
    </svg>
  )
}

export function WhatsAppIcon({ size = 20, className = '' }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" width={size} height={size} fill="currentColor" className={className}>
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38a9.9 9.9 0 0 0 4.74 1.21h.01c5.46 0 9.9-4.45 9.9-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2Zm0 1.67c2.2 0 4.27.86 5.82 2.42a8.2 8.2 0 0 1 2.41 5.83c0 4.54-3.7 8.23-8.24 8.23-1.48 0-2.93-.4-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.2 8.2 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.25-8.24ZM8.53 7.33c-.16 0-.43.06-.66.31-.22.25-.87.85-.87 2.07 0 1.22.89 2.4 1.01 2.56.12.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.46-.6 1.67-1.18.21-.58.21-1.07.14-1.18-.06-.1-.23-.16-.48-.29-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.13-.16.25-.64.81-.78.97-.15.17-.29.19-.54.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.01-.38.11-.5.11-.11.25-.29.37-.43.13-.15.17-.25.25-.42.08-.17.04-.31-.02-.43-.06-.13-.56-1.35-.77-1.84-.2-.49-.4-.42-.56-.43h-.48Z" />
    </svg>
  )
}
