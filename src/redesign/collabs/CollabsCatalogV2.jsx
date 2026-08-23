import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Clock, ChevronRight, ChevronLeft, X } from 'lucide-react'
import Button from '../../components/ui/Button'
import { getLenis } from '../../lib/smoothScroll'

gsap.registerPlugin(ScrollTrigger)

/**
 * הקטלוג — the collaborations offering as a browsable Netflix-style catalog:
 * a right-to-left row of landscape boxart cards, and one shared detail panel
 * that expands underneath the row with the selected product's description,
 * מיקום and קהל יעד. Replaces the old three-format spec list, which didn't
 * scale past three items.
 *
 * Only the הרצאה card is real today; the rest are clearly-marked drafts so the
 * layout can be reviewed and filled in later.
 */

const PRODUCTS = [
  {
    id: 'lecture-resilience',
    title: 'הרצאה: חוסן ומנהיגות במציאות משתנה',
    subtitle: 'הרצאת השראה עם כלים ליישום מיידי',
    duration: '45–90 דק׳',
    text: 'הרצאה מעוררת השראה שמציגה גישות חדשות ומעניקה כלים פרקטיים ליישום מיידי.',
    location: 'אולם או חלל פתוח · עד 500 משתתפים',
    audience: 'כנסים, אירועי חברה, פתיחת/סגירת שנה, ימי עיון',
    image: { src: '/Hero-Pics/amir_talking_2.jpg', w: 2673, h: 1782, alt: 'עמיר מנחם מרצה מול קהל' },
    speaker: {
      href: '#amir',
      eyebrow: 'המרצה',
      name: 'עמיר מנחם',
      role: 'מייסד ויו״ר התנועה · מגיש ״האדם בזירה״',
      teaser: 'מעל 1,000 הרצאות על חוסן, מנהיגות וצמיחה מתוך אתגר — הסיפור והשיטה שמאחורי חמש אצבעות.',
      cta: 'עוד על עמיר',
      photo: { src: '/Amir_pics/amir-portrait.jpg', w: 1600, h: 1067, alt: 'עמיר מנחם, מייסד תנועת חמש אצבעות' },
    },
  },

  // `subtitle` is the one-line hook on the card face. Those were drafted to
  // fit the poster; the `text` beneath each is the movement's own copy.
  // duration / location / audience are all optional — a product renders only
  // the rows it actually has.
  {
    id: 'workshop-resilience',
    title: 'סדנת חוסן מנטלי',
    subtitle: 'אימון וכלים יישומיים לחוסן',
    duration: 'שעה וחצי עד 3 שעות',
    text: 'חוויה דרך אימון וכלים יישומיים לפיתוח חוסן.',
    location: 'מרכז חמש אצבעות / אצלכם',
    audience: 'קבוצות ספורט / יחידות צבאיות / בתי ספר',
    image: { src: '/liba_pics/214A1343.jpg', w: 2400, h: 1600, alt: 'משתתפים באימון קבוצתי' },
  },
  {
    id: 'seminar-camp',
    title: 'סמינר / מחנה',
    subtitle: 'חוויית עומק מגבשת',
    duration: 'חד יומי או דו יומי',
    text: 'חווית עומק במרכז חמש אצבעות המתמקדת בבניית הרגלים, מסוגלות וגיבוש קבוצתי דרך שיטת חמש אצבעות.',
    location: 'מרכז חמש אצבעות',
    audience: 'קבוצות ספורט / יחידות צבאיות / בתי ספר',
    image: { src: '/mehina_pics/mehina-shirts-night.jpg', w: 1600, h: 1200, alt: 'קבוצה במחנה בשעות הערב' },
  },
  {
    id: 'masa-five',
    title: 'מסע חמש',
    subtitle: 'הטיול השנתי, אחרת',
    duration: '3–5 ימים',
    text: 'מחליפים את הטיול השנתי בחוויה מעצבת המשלבת חוסן, מצוינות וציונות דרך השטח.',
    location: 'מתווה צפוני או דרומי',
    audience: 'קבוצות ספורט / יחידות צבאיות / בתי ספר / מכינות קדם צבאיות',
    image: { src: '/mehina_pics/mehina-desert-group.jpg', w: 1600, h: 1200, alt: 'קבוצה במסע בשטח המדברי' },
  },
  {
    id: 'captains-course',
    title: 'קורס קפטנים',
    subtitle: 'מנהיגות כאדריכלות תרבות',
    duration: '5 מפגשים × 4 שעות',
    text: 'תפיסת מנהיגות מעודכנת למציאות החדשה, המנהל כאדריכל תרבות.',
    audience: 'פיתוח צוותים / הכשרת מנהלים / מפקדים',
    image: { src: '/liba_pics/214A0223.jpg', w: 2400, h: 1600, alt: 'מפגש קבוצתי בהובלת מאמן' },
  },
  {
    id: 'long-term',
    title: 'שיתוף פעולה ארוך טווח',
    subtitle: 'תהליך שמייצר שינוי תרבותי',
    text: 'עבור ארגונים, רשויות וגופים ממשלתיים המחפשים לייצר שינוי תרבותי.',
    image: { src: '/Hero-Pics/erev_moreshet.jpg', w: 2673, h: 1782, alt: 'אירוע קהילתי מרכזי של התנועה' },
  },
]

const PANEL_ID = 'collabs-catalog-panel'
const EDGE_TOL = 2

/**
 * The row browses big and steps back once a product is open, so the detail
 * panel becomes the focus rather than competing with the posters.
 */
const CARD_W = {
  browsing: 'clamp(280px, 30vw, 380px)',
  reading: 'clamp(200px, 21vw, 260px)',
}
const cardDomId = (i) => `collabs-catalog-card-${PRODUCTS[i].id}`

/**
 * RTL `scrollLeft` has three historical conventions (spec-negative, legacy
 * WebKit positive-from-right, legacy Edge reversed). Probe once and memoise:
 * multiply a "visually forward" delta by this to get a scrollLeft delta.
 */
let rtlEndSign = 0
function endSign(row) {
  if (getComputedStyle(row).direction !== 'rtl') return 1
  if (rtlEndSign) return rtlEndSign
  const p = document.createElement('div')
  p.setAttribute('dir', 'rtl')
  p.style.cssText =
    'position:absolute;top:-9999px;left:-9999px;width:60px;height:1px;' +
    'overflow:scroll;visibility:hidden;pointer-events:none'
  p.innerHTML = '<div style="width:200px;height:1px"></div>'
  document.body.appendChild(p)
  if (p.scrollLeft > 0) {
    rtlEndSign = -1
  } else {
    p.scrollLeft = -1
    rtlEndSign = p.scrollLeft < 0 ? -1 : 1
  }
  p.remove()
  return rtlEndSign
}

/**
 * Edge state from element rects rather than the sign of `scrollLeft`, so it is
 * correct under every RTL convention. In RTL the visual start is the right edge.
 */
function readEdges(row) {
  if (!row) return { atStart: true, atEnd: true, overflow: false }
  const cards = row.querySelectorAll('[data-cat-card]')
  if (!cards.length) return { atStart: true, atEnd: true, overflow: false }
  if (row.scrollWidth - row.clientWidth <= EDGE_TOL) {
    return { atStart: true, atEnd: true, overflow: false }
  }

  const cs = getComputedStyle(row)
  const rtl = cs.direction === 'rtl'
  const box = row.getBoundingClientRect()
  const padS = parseFloat(rtl ? cs.paddingRight : cs.paddingLeft) || 0
  const padE = parseFloat(rtl ? cs.paddingLeft : cs.paddingRight) || 0
  const startEdge = rtl ? box.right - padS : box.left + padS
  const endEdge = rtl ? box.left + padE : box.right - padE

  const f = cards[0].getBoundingClientRect()
  const l = cards[cards.length - 1].getBoundingClientRect()

  // At the start the first card sits flush with the start edge and slides
  // *past* it as you scroll away; at the end the last card comes back to rest
  // on the end edge, having been beyond it the whole time before that.
  return {
    overflow: true,
    atStart: rtl ? f.right <= startEdge + EDGE_TOL : f.left >= startEdge - EDGE_TOL,
    atEnd: rtl ? l.left >= endEdge - EDGE_TOL : l.right <= endEdge + EDGE_TOL,
  }
}

export default function CollabsCatalogV2({ onRegister }) {
  const ref = useRef(null)
  const rowRef = useRef(null)
  const panelRef = useRef(null)
  const panelBodyRef = useRef(null)
  const panelWrapRef = useRef(null)
  const cardRefs = useRef([])
  const restoreFocus = useRef(false)
  const pendingScroll = useRef(false)

  const [active, setActive] = useState(0)
  // Starts closed so the row is first seen at its full browsing size.
  const [open, setOpen] = useState(false)
  const [edges, setEdges] = useState({ atStart: true, atEnd: true, overflow: false })
  const [caret, setCaret] = useState(null)

  const product = PRODUCTS[active]
  const reduced = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const behavior = () => (reduced() ? 'auto' : 'smooth')

  /* ── section reveal ─────────────────────────────────────────── */
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      if (reduced()) return
      gsap.fromTo('.cc2-el',
        { y: 36, opacity: 0 },
        {
          y: 0, opacity: 1, stagger: 0.09, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: ref.current, start: 'top 78%', once: true },
        }
      )
    }, ref)
    return () => ctx.revert()
  }, [])

  /* ── row edge state + caret position ────────────────────────── */
  const measure = useCallback(() => {
    const row = rowRef.current
    if (!row) return
    setEdges(readEdges(row))

    const card = cardRefs.current[active]
    const wrap = panelWrapRef.current
    if (!card || !wrap) return setCaret(null)
    const c = card.getBoundingClientRect()
    const w = wrap.getBoundingClientRect()
    const r = row.getBoundingClientRect()
    const centre = c.left + c.width / 2
    // Hide the caret once the active card scrolls out of view.
    if (centre < r.left || centre > r.right) return setCaret(null)
    setCaret(centre - w.left)
  }, [active, open])

  useEffect(() => {
    const row = rowRef.current
    if (!row) return
    let raf = 0
    const sync = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(measure)
    }
    sync()
    row.addEventListener('scroll', sync, { passive: true })
    // Cards resize when the panel opens/closes. A ResizeObserver on the row
    // won't catch that (the row's own box is unchanged), so listen for the
    // card width transition finishing and re-measure off its settled size.
    const onCardResized = (e) => { if (e.propertyName === 'width') sync() }
    row.addEventListener('transitionend', onCardResized)
    // One ResizeObserver covers viewport resize and late-decoding posters.
    const ro = new ResizeObserver(sync)
    ro.observe(row)
    return () => {
      cancelAnimationFrame(raf)
      row.removeEventListener('scroll', sync)
      row.removeEventListener('transitionend', onCardResized)
      ro.disconnect()
    }
  }, [measure])

  /* ── Lenis: let horizontal trackpad swipes reach this row ───── */
  useEffect(() => {
    const row = rowRef.current
    if (!row) return
    // Lenis binds `wheel` on window in the bubble phase (lib/smoothScroll.js)
    // and preventDefaults any wheel with deltaY !== 0 — which cancels the whole
    // native scroll, horizontal component included. A near-horizontal trackpad
    // swipe with a few px of vertical jitter would scroll the page instead of
    // this row. Swallow horizontally-dominant wheels before Lenis sees them;
    // never preventDefault, so the browser's own horizontal scroll still runs.
    const onWheel = (e) => {
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) e.stopPropagation()
    }
    row.addEventListener('wheel', onWheel, { passive: true })
    return () => row.removeEventListener('wheel', onWheel)
  }, [])

  /* ── keep ScrollTrigger honest as the panel changes height ──── */
  // Only reads refs, so the ResizeObserver below can safely close over the
  // first render's copy.
  const flushPendingScroll = () => {
    if (!pendingScroll.current) return
    pendingScroll.current = false
    const el = panelBodyRef.current
    if (!el) return
    const r = el.getBoundingClientRect()
    if (r.top >= 0 && r.bottom <= window.innerHeight) return
    // Go through Lenis: a native scrollTop write makes its onNativeScroll
    // hard-reset the target mid-glide. getLenis() is null under reduced motion.
    const lenis = getLenis()
    if (lenis) lenis.scrollTo(el, { offset: -120 })
    else el.scrollIntoView({ block: 'nearest', behavior: 'auto' })
  }

  useEffect(() => {
    const el = ref.current
    if (!el) return
    let t = 0
    // Expanding the panel shifts everything below it, invalidating cached
    // start/end values — notably CollabsFinaleV2's scrub parallax. A trailing
    // debounce emits one refresh when the transition settles rather than one
    // per frame (refresh() forces a full-page reflow). A ResizeObserver also
    // catches the content swap between cards, which a transitionend on
    // grid-template-rows would miss (the track stays at 1fr).
    const ro = new ResizeObserver(() => {
      clearTimeout(t)
      t = setTimeout(() => {
        ScrollTrigger.refresh()
        flushPendingScroll()
      }, 140)
    })
    ro.observe(el)
    return () => { clearTimeout(t); ro.disconnect() }
  }, [])

  /* ── interaction ────────────────────────────────────────────── */
  const page = (dir) => {
    const row = rowRef.current
    if (!row) return
    const { atStart, atEnd } = readEdges(row)
    if ((dir < 0 && atStart) || (dir > 0 && atEnd)) return

    const cards = row.querySelectorAll('[data-cat-card]')
    if (!cards.length) return
    // getBoundingClientRect().width, not offsetWidth: offsetWidth rounds to an
    // integer and clamp() widths are fractional, so the error accumulates
    // across pages and drifts off the snap points.
    const gap = parseFloat(getComputedStyle(row).columnGap) || 0
    const step = cards[0].getBoundingClientRect().width + gap
    const perPage = Math.max(1, Math.floor(row.clientWidth / step))
    row.scrollBy({ left: step * perPage * dir * endSign(row), behavior: behavior() })
  }

  const select = (i) => {
    restoreFocus.current = !!panelBodyRef.current?.contains(document.activeElement)
    if (i === active) {
      setOpen((o) => !o)
      return
    }
    setActive(i)
    setOpen(true)
    pendingScroll.current = true
    cardRefs.current[i]?.scrollIntoView({ block: 'nearest', inline: 'center', behavior: behavior() })
  }

  // Re-keying the panel body on swap unmounts whatever had focus inside it.
  useLayoutEffect(() => {
    if (!restoreFocus.current) return
    restoreFocus.current = false
    cardRefs.current[active]?.focus({ preventScroll: true })
  }, [active, open])

  const onCardKeyDown = (i) => (e) => {
    const last = PRODUCTS.length - 1
    let n
    // dir="rtl": visually-left is forward. Same convention as LiabahCoaches.
    if (e.key === 'ArrowLeft') n = Math.min(last, i + 1)
    else if (e.key === 'ArrowRight') n = Math.max(0, i - 1)
    else if (e.key === 'Home') n = 0
    else if (e.key === 'End') n = last
    else return
    e.preventDefault()
    const el = cardRefs.current[n]
    // preventScroll + an explicit 'nearest' keeps the movement inside the row;
    // focus()'s own scroll-into-view can move the page and fight Lenis.
    el?.focus({ preventScroll: true })
    el?.scrollIntoView({ block: 'nearest', inline: 'nearest', behavior: behavior() })
  }

  const close = () => {
    setOpen(false)
    cardRefs.current[active]?.focus({ preventScroll: true })
  }

  return (
    <section
      id="collabs-catalog"
      ref={ref}
      dir="rtl"
      className="relative w-full overflow-hidden"
      /* Near-black rather than the navy gradient: the posters carry the colour
         here, and a blue ground competed with them. Kept a whisper of navy in
         the mix so it still reads as brand dark, not clinical black. */
      style={{ background: 'linear-gradient(180deg, #13141b 0%, #0b0c11 58%, #07080a 100%)' }}
      onKeyDown={(e) => {
        if (e.key !== 'Escape' || !open) return
        // ContactModal keeps its own Escape listener on window.
        e.stopPropagation()
        close()
      }}
    >
      {/* top orange radial accent */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: 'radial-gradient(ellipse 90% 45% at 50% 0%, rgba(255,135,20,0.07) 0%, transparent 65%)' }}
      />

      <div className="relative z-10 max-w-screen-xl mx-auto px-6 sm:px-10 md:px-16 py-24 md:py-32">
        {/* header */}
        <div className="cc2-el flex items-end justify-between gap-6">
          <div className="max-w-3xl">
            <p className="ds-eyebrow text-orange mb-3">הקטלוג</p>
            <h2 className="ds-section-title text-white">בחרו את מה שמתאים לכם</h2>
            <p className="ds-section-subtitle text-white/70 mt-4">
              מתאימים את הפתרון למטרות, לקהל וללו״ז שלכם.
            </p>
          </div>

          {edges.overflow && (
            <div className="hidden md:flex items-center gap-2 shrink-0 pb-1">
              {/* aria-disabled, not disabled: a disabled button leaves the tab
                  order, stranding focus after paging to an edge. */}
              <ArrowButton label="הקודם" onClick={() => page(-1)} off={edges.atStart}>
                <ChevronRight size={22} strokeWidth={2.25} />
              </ArrowButton>
              <ArrowButton label="הבא" onClick={() => page(1)} off={edges.atEnd}>
                <ChevronLeft size={22} strokeWidth={2.25} />
              </ArrowButton>
            </div>
          )}
        </div>

        {/* card row — scroll-ps-* must match the horizontal padding, else
            snap-start cards land tucked under the gutter. */}
        <ul
          ref={rowRef}
          role="list"
          aria-label="קטלוג המוצרים"
          className="cc2-el mt-12 md:mt-16 flex gap-4 md:gap-5 overflow-x-auto overflow-y-hidden snap-x snap-mandatory
            -mx-6 px-6 scroll-ps-6 sm:-mx-10 sm:px-10 sm:scroll-ps-10 md:-mx-16 md:px-16 md:scroll-ps-16 pb-4"
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            // Without this a horizontal over-drag triggers browser back-nav.
            overscrollBehaviorX: 'contain',
            WebkitOverflowScrolling: 'touch',
          }}
        >
          {PRODUCTS.map((p, i) => {
            const isOpen = i === active && open
            return (
              <li
                key={p.id}
                data-cat-card
                className="flex-none snap-start transition-[width] duration-500 ease-brand"
                style={{ width: open ? CARD_W.reading : CARD_W.browsing }}
              >
                <button
                  id={cardDomId(i)}
                  ref={(el) => (cardRefs.current[i] = el)}
                  type="button"
                  onClick={() => select(i)}
                  onKeyDown={onCardKeyDown(i)}
                  aria-expanded={isOpen}
                  aria-controls={PANEL_ID}
                  className={`group relative block w-full text-right rounded-2xl overflow-hidden bg-white/[0.04]
                    ring-1 transition-all duration-300 ease-brand
                    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange focus-visible:ring-offset-2 focus-visible:ring-offset-[#0b0c11]
                    ${isOpen
                      ? 'ring-orange shadow-[0_18px_50px_rgba(0,0,10,0.5)] -translate-y-1'
                      : 'ring-white/10 hover:ring-white/30'}`}
                >
                  <div className="relative aspect-[16/9] overflow-hidden">
                    <img
                      src={p.image.src}
                      width={p.image.w}
                      height={p.image.h}
                      alt=""
                      loading="lazy"
                      decoding="async"
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-brand group-hover:scale-[1.06]"
                    />
                    <div
                      className="absolute inset-0 pointer-events-none"
                      style={{ background: 'linear-gradient(0deg, rgba(6,7,10,0.96) 0%, rgba(6,7,10,0.4) 45%, transparent 75%)' }}
                    />
                    {p.duration && (
                      <span className="absolute top-3 left-3 inline-flex items-center gap-1.5 rounded-full bg-black/70 backdrop-blur-sm text-white/90 font-heebo font-semibold px-3 py-1 text-xs">
                        <Clock size={13} strokeWidth={2.25} />
                        {p.duration}
                      </span>
                    )}
                  </div>

                  <div className="absolute inset-x-0 bottom-0 p-4 md:p-5">
                    <h3 className="font-ragmarom text-white leading-tight line-clamp-2" style={{ fontSize: 'clamp(1.1rem, 1.5vw, 1.35rem)' }}>
                      {p.title}
                    </h3>
                    <p className="font-heebo text-white/65 text-sm mt-1.5 line-clamp-1">
                      {p.subtitle}
                    </p>
                  </div>
                </button>
              </li>
            )
          })}
          {/* Some engines drop a flex container's trailing padding from
              scrollWidth; this keeps the end gutter visible. */}
          <li aria-hidden="true" className="flex-none w-px" />
        </ul>

        {/* detail panel */}
        <div ref={panelWrapRef} className="relative">
          {open && caret !== null && (
            <span
              aria-hidden="true"
              className="absolute -top-1 w-4 h-4 bg-white/[0.06] border-t border-l border-white/12 transition-[left] duration-300 ease-brand"
              style={{ left: caret, transform: 'translateX(-50%) rotate(45deg)' }}
            />
          )}

          {/* Netflix row-expand. The grid TRACK carries the height transition:
              0fr -> 1fr animates with no JS measurement, and the global
              reduced-motion rule in index.css neutralises it for free. */}
          <div
            ref={panelRef}
            className="grid transition-[grid-template-rows] duration-[520ms] ease-brand"
            style={{ gridTemplateRows: open ? '1fr' : '0fr' }}
          >
            {/* min-h-0 is REQUIRED: grid items default to min-height:auto, which
                floors the track at content height and the collapse silently
                does nothing. `inert` keeps the CTA and speaker link out of the
                tab order while clipped. */}
            <div className="min-h-0 overflow-hidden" inert={!open || undefined}>
              <div
                key={active}
                id={PANEL_ID}
                ref={panelBodyRef}
                role="region"
                tabIndex={-1}
                aria-labelledby={cardDomId(active)}
                className="cat-panel-body mt-4 rounded-[1.6rem] bg-white/[0.06] ring-1 ring-white/12 backdrop-blur-sm p-6 md:p-9"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex flex-wrap items-baseline gap-x-4 gap-y-2">
                    <h3 className="font-ragmarom text-white leading-tight" style={{ fontSize: 'clamp(1.6rem, 2.6vw, 2.4rem)' }}>
                      {product.title}
                    </h3>
                    {product.duration && (
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-orange/15 text-orange font-heebo font-semibold px-3.5 py-1 text-sm">
                        <Clock size={14} strokeWidth={2.25} />
                        {product.duration}
                      </span>
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={close}
                    aria-label="סגירת פרטי המוצר"
                    className="shrink-0 flex items-center justify-center w-11 h-11 -mt-1 rounded-full text-white/50 hover:text-white hover:bg-white/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange"
                  >
                    <X size={20} strokeWidth={2.25} />
                  </button>
                </div>

                {/* items-center, not items-start: products carry different
                    numbers of spec rows, and a short text column would
                    otherwise leave a large gap beside the image. */}
                <div className="mt-7 grid grid-cols-1 lg:grid-cols-[1.05fr_1fr] gap-8 lg:gap-12 lg:items-center">
                  <div className="relative overflow-hidden rounded-[1.2rem] ring-1 ring-white/10">
                    <img
                      src={product.image.src}
                      width={product.image.w}
                      height={product.image.h}
                      alt={product.image.alt}
                      /* index 0's panel is open at mount, so its image is not lazy. */
                      loading={active === 0 ? 'eager' : 'lazy'}
                      decoding="async"
                      className="w-full aspect-[16/9] object-cover"
                    />
                  </div>

                  <div>
                    <p className="font-heebo text-white/75 leading-[1.8]" style={{ fontSize: 'clamp(1rem, 1.15vw, 1.12rem)' }}>
                      {product.text}
                    </p>

                    {(product.location || product.audience) && (
                      <dl className="mt-6 grid grid-cols-1 sm:grid-cols-[7rem_1fr] gap-x-6 gap-y-3">
                        {product.location && (
                          <>
                            <dt className="font-heebo font-semibold text-white/45 text-sm" style={{ letterSpacing: '0.06em' }}>
                              מיקום
                            </dt>
                            <dd className="font-heebo text-white leading-snug">{product.location}</dd>
                          </>
                        )}
                        {product.audience && (
                          <>
                            <dt className="font-heebo font-semibold text-white/45 text-sm" style={{ letterSpacing: '0.06em' }}>
                              קהל יעד
                            </dt>
                            <dd className="font-heebo text-white leading-snug">{product.audience}</dd>
                          </>
                        )}
                      </dl>
                    )}

                    <div className="mt-8">
                      <Button variant="primary" onClick={() => onRegister?.()}>
                        לתיאום ובירור פרטים
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Speaker card — the in-context door to עמיר's page, on the
                    lecture he delivers. Mirrors the אודות card. */}
                {product.speaker && (
                  <a
                    href={product.speaker.href}
                    className="group/spk relative mt-9 flex flex-col sm:flex-row items-stretch overflow-hidden rounded-[1.4rem] bg-white/[0.06] ring-1 ring-white/12 transition-all duration-300 hover:ring-orange/50 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange"
                  >
                    <div className="relative shrink-0 sm:w-40 md:w-48">
                      <img
                        src={product.speaker.photo.src}
                        width={product.speaker.photo.w}
                        height={product.speaker.photo.h}
                        alt={product.speaker.photo.alt}
                        loading="lazy"
                        decoding="async"
                        className="h-48 w-full sm:h-full object-cover"
                        style={{ objectPosition: 'center 22%' }}
                      />
                    </div>

                    <div className="flex flex-1 flex-col justify-center p-6 md:p-7">
                      <span className="ds-eyebrow text-orange">{product.speaker.eyebrow}</span>
                      <h4 className="font-ragmarom text-white leading-tight mt-2" style={{ fontSize: 'clamp(1.4rem, 2.2vw, 1.9rem)' }}>
                        {product.speaker.name}
                      </h4>
                      <p className="font-heebo text-white/55 text-sm leading-relaxed mt-1.5">
                        {product.speaker.role}
                      </p>
                      <p className="font-heebo text-white/75 leading-relaxed mt-3" style={{ fontSize: 'clamp(0.98rem, 1.1vw, 1.06rem)' }}>
                        {product.speaker.teaser}
                      </p>
                      <span className="inline-flex items-center gap-1.5 mt-4 font-heebo font-semibold text-orange transition-colors">
                        {product.speaker.cta}
                        <span aria-hidden="true" className="transition-transform duration-200 group-hover/spk:-translate-x-1">←</span>
                      </span>
                    </div>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="cc2-el flex justify-center pt-14">
          <Button variant="secondary" onClick={() => onRegister?.()}>
            לא בטוחים מה מתאים לכם? דברו איתנו
          </Button>
        </div>
      </div>
    </section>
  )
}

/** A round row-scroll control. Dimmed but still focusable at the row's edge. */
function ArrowButton({ label, onClick, off, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      aria-disabled={off}
      className={`flex items-center justify-center w-11 h-11 rounded-full text-white ring-1 ring-white/20 bg-white/5
        transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange
        ${off ? 'opacity-30 cursor-default' : 'hover:bg-white/15 hover:ring-white/40'}`}
    >
      {children}
    </button>
  )
}
