/**
 * "Skip to main content" — the first Tab stop on every page (ת"י 5568 / WCAG
 * 2.4.1). Hidden until focused.
 *
 * It moves focus in JS instead of being a plain #anchor because the pages don't
 * share one <main id>, the memorial keeps two <main>s and toggles .is-active
 * between them, and smoothScroll.js intercepts hash links.
 */
export default function SkipLink() {
  const skip = (e) => {
    e.preventDefault()
    const main = document.querySelector('main.is-active') || document.querySelector('main')
    if (!main) return
    if (!main.hasAttribute('tabindex')) main.setAttribute('tabindex', '-1')
    main.focus({ preventScroll: true })
    main.scrollIntoView()
  }
  return (
    <a href="#main" onClick={skip} className="skip-link">
      דלגו לתוכן הראשי
    </a>
  )
}
