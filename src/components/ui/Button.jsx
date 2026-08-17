import { Loader2 } from 'lucide-react'

/**
 * Unified button — the single home for the movement's "magnetic" CTA.
 * Replaces the per-file MagneticCTA / MagneticButton / PrimaryButton copies.
 *
 * Props:
 *  - variant: 'primary' (orange) | 'secondary' (outline, for dark bg) | 'ghost'
 *  - size:    'sm' | 'md' | 'lg'
 *  - href:    renders an <a>; otherwise a <button>
 *  - icon:    a lucide-style component (e.g. ChevronLeft)
 *  - loading: shows spinner, blocks interaction
 *  - disabled
 */

const VARIANTS = {
  primary: 'btn-cta text-white focus-visible:ring-orange',
  secondary:
    'bg-white/10 text-white border border-white/20 hover:border-white/50 focus-visible:ring-white',
  ghost:
    'bg-transparent text-white/70 hover:text-white border border-white/20 hover:border-white/50 focus-visible:ring-white',
}

const OVERLAY = {
  primary: 'bg-white/20',
  secondary: 'bg-white/15',
  ghost: 'bg-white/15',
}

const SIZES = {
  sm: 'px-5 py-2 text-sm gap-2',
  md: 'px-8 py-3.5 text-base gap-2.5',
  lg: 'px-10 py-4 text-lg gap-2.5',
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  href,
  onClick,
  icon: Icon,
  loading = false,
  disabled = false,
  glow = false,
  className = '',
  type = 'button',
  target,
  rel,
  'aria-label': ariaLabel,
  ...rest
}) {
  const isDisabled = disabled || loading
  const isPrimary = variant === 'primary'

  const base =
    `group relative overflow-hidden inline-flex items-center justify-center font-bold ` +
    `btn-lift rounded-full whitespace-nowrap transition-transform duration-300 ease-brand ` +
    `active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ` +
    `${VARIANTS[variant] || VARIANTS.primary} ${SIZES[size] || SIZES.md} ` +
    `${glow && isPrimary && !isDisabled ? 'btn-glow' : ''} ` +
    `${isDisabled ? 'opacity-50 pointer-events-none' : ''} ${className}`

  // The hover lift lives in CSS (.btn-lift, gated on a real pointer) rather than
  // inline onMouseEnter/onMouseLeave. Two reasons: a touch tap fires a synthetic
  // mouseenter with no matching mouseleave, which stranded the button at
  // scale(1.04) after the finger lifted; and an inline transform outranks the
  // `active:scale-[0.97]` class, so the press-down state never rendered at all.
  const inner = (
    <>
      {isPrimary ? (
        <span aria-hidden="true" className="btn-sheen" />
      ) : (
        <span
          aria-hidden="true"
          className={`absolute inset-0 ${OVERLAY[variant] || OVERLAY.primary} translate-y-full group-hover:translate-y-0 transition-transform duration-300 rounded-full`}
        />
      )}
      {loading && <Loader2 size={18} className="relative shrink-0 animate-spin" aria-hidden="true" />}
      <span className="relative">{children}</span>
      {!loading && Icon && <Icon size={18} className="relative shrink-0" aria-hidden="true" />}
    </>
  )

  const shared = {
    className: base,
    'aria-label': ariaLabel,
    'aria-busy': loading || undefined,
  }

  if (href && !isDisabled) {
    return (
      <a href={href} target={target} rel={rel} {...shared} {...rest}>
        {inner}
      </a>
    )
  }

  return (
    <button type={type} onClick={onClick} disabled={isDisabled} {...shared} {...rest}>
      {inner}
    </button>
  )
}
