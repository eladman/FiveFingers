import { useEffect, useRef, useState } from 'react'
import { FALLEN, ROSTER } from '../data/fallen'
import logo from '../assets/logo.png'
import './memorial.css'

/* =============================================================================
   היכל הזיכרון · חמש אצבעות — in-app route (ported from the standalone
   public/memorial static page). React owns the page chrome (nav, footer,
   routing, lifecycle); the heavy hall/person markup is built imperatively by
   the original design's proven string-builders and injected via refs.

   Internal routing rides the app's hash router:
     #memorial            → the hall (opening + register), scrolled to top
     #memorial-hall       → the hall, scrolled to the register
     #memorial-n<index>   → a single person's page
   App.resolveView() maps every #memorial* hash to this view, so moving between
   people never remounts the page — it just re-renders here. No full reload.
   ========================================================================== */

const IMG = '/memorial/img/'
const reduceMotion =
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

/* ---------- tiny helpers (verbatim from memorial.js) --------------------- */
function esc(s) {
  return String(s == null ? '' : s)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}
function ltr(s) { return '<span class="ltr num">' + esc(s) + '</span>' }
function pad(n) { return n < 10 ? '0' + n : '' + n }

/* ---------- memorial candle (SVG, unique gradient ids) ------------------- */
let uidCounter = 0
function flameDefs(u) {
  return '<defs>' +
    '<radialGradient id="h' + u + '" cx="50%" cy="50%" r="50%">' +
      '<stop offset="0%" stop-color="#ffa03c" stop-opacity=".5"/>' +
      '<stop offset="45%" stop-color="#ff8714" stop-opacity=".16"/>' +
      '<stop offset="100%" stop-color="#ff8714" stop-opacity="0"/>' +
    '</radialGradient>' +
    '<linearGradient id="f' + u + '" x1="0" y1="1" x2="0" y2="0">' +
      '<stop offset="0%" stop-color="#ff7a00"/>' +
      '<stop offset="55%" stop-color="#ffb73f"/>' +
      '<stop offset="100%" stop-color="#ffe9b8"/>' +
    '</linearGradient>' +
    '<linearGradient id="c' + u + '" x1="0" y1="1" x2="0" y2="0">' +
      '<stop offset="0%" stop-color="#ffd070"/>' +
      '<stop offset="100%" stop-color="#fffdf5"/>' +
    '</linearGradient>' +
    '<linearGradient id="w' + u + '" x1="0" y1="0" x2="0" y2="1">' +
      '<stop offset="0%" stop-color="#efe3c9"/>' +
      '<stop offset="100%" stop-color="#d4c3a0"/>' +
    '</linearGradient>' +
    '</defs>'
}
function candle(cls) {
  const u = 'u' + (++uidCounter)
  return '<span class="candle ' + (cls || '') + '" aria-hidden="true">' +
    '<svg viewBox="0 0 56 96" role="presentation" focusable="false">' +
      flameDefs(u) +
      '<circle class="halo" cx="28" cy="24" r="24" fill="url(#h' + u + ')"/>' +
      '<g class="fl">' +
        '<path d="M28 5 C 24.4 12.4, 21.4 16.8, 21.4 23.4 C 21.4 30, 24.2 34, 28 34 C 31.8 34, 34.6 30, 34.6 23.4 C 34.6 16.8, 31.6 12.4, 28 5 Z" fill="url(#f' + u + ')"/>' +
        '<path d="M28 16 C 26.3 19.8, 25.1 22.4, 25.1 26.2 C 25.1 29.9, 26.4 32, 28 32 C 29.6 32, 30.9 29.9, 30.9 26.2 C 30.9 22.4, 29.7 19.8, 28 16 Z" fill="url(#c' + u + ')"/>' +
      '</g>' +
      '<rect x="27.3" y="33.6" width="1.4" height="6.6" rx=".7" fill="#4a3520"/>' +
      '<ellipse cx="28" cy="41" rx="9.4" ry="2.7" fill="#f8f1e2"/>' +
      '<rect x="18.6" y="41" width="18.8" height="50" rx="3" fill="url(#w' + u + ')"/>' +
      '<rect x="18.6" y="44.6" width="3.2" height="10" rx="1.6" fill="#f8f1e2" opacity=".85"/>' +
    '</svg></span>'
}

/* ---------- LAYER 1 — opening mosaic (wall of faces) --------------------- */
function fallenPhotos() {
  const photos = []
  ROSTER.forEach((entry) => {
    const data = entry.id && FALLEN[entry.id] ? FALLEN[entry.id] : null
    if (data && data.photo) photos.push(IMG + data.photo)
  })
  return photos
}
function mosaicHTML() {
  const photos = fallenPhotos()
  if (!photos.length) return ''
  const TILES = 48
  const stride = 7 // coprime with 19 → spreads duplicates, no adjacent repeats
  let html = ''
  for (let i = 0; i < TILES; i++) {
    html += '<img src="' + esc(photos[(i * stride) % photos.length]) +
            '" alt="" loading="lazy" decoding="async">'
  }
  return html
}

/* ---------- LAYER 2 — the hall register (wall of niches) ----------------- */
function wallHTML() {
  let html = ''
  ROSTER.forEach((entry, i) => {
    const data = entry.id && FALLEN[entry.id] ? FALLEN[entry.id] : null
    const delay = Math.min(i * 45, 360)
    if (data) {
      html +=
        '<a class="niche niche--featured reveal" role="listitem" href="#memorial-n' + i + '" ' +
          'style="--reveal-delay:' + delay + 'ms" ' +
          'aria-label="' + esc(data.name) + ', ' + esc(data.rank) + '. למסע חייו">' +
          '<span class="niche__photo-wrap">' +
            '<img class="niche__photo" src="' + IMG + esc(data.photo) + '" alt="' + esc(data.name) + '" loading="lazy" decoding="async">' +
          '</span>' +
          '<span class="niche__meta">' +
            '<span class="niche__name">' + esc(data.name) + '</span>' +
            '<span class="niche__dates">בן ' + ltr(data.age) + ' · נפל ב־' + ltr(data.date) + '</span>' +
            '<span class="niche__cta">למסע חייו ←</span>' +
          '</span>' +
        '</a>'
    } else {
      html +=
        '<a class="niche niche--plaque reveal" role="listitem" href="#memorial-n' + i + '" ' +
          'style="--reveal-delay:' + delay + 'ms" ' +
          'aria-label="לעמוד הזיכרון של ' + esc(entry.n) + '">' +
          '<span class="niche__plaque-inner">' +
            '<span class="niche__name">' + esc(entry.n) + '</span>' +
            '<span class="niche__tick"></span>' +
            '<span class="niche__held">לזכרם</span>' +
          '</span>' +
        '</a>'
    }
  })
  return html
}

/* ---------- LAYER 3 — a person's page ------------------------------------ */
function navButtons(i) {
  const prev = ROSTER[i - 1], next = ROSTER[i + 1]
  function link(entry, idx, dirLabel, mod) {
    if (!entry) {
      return '<span class="pnav__link pnav__spacer ' + mod + '" aria-hidden="true"></span>'
    }
    const data = entry.id && FALLEN[entry.id] ? FALLEN[entry.id] : null
    const thumb = data && data.photo
      ? '<span class="pnav__thumb"><img src="' + IMG + esc(data.photo) + '" alt="" loading="lazy" decoding="async"></span>'
      : ''
    return '<a class="pnav__link ' + mod + '" href="#memorial-n' + idx + '">' +
      thumb +
      '<span class="pnav__txt">' +
        '<span class="pnav__dir">' + dirLabel + '</span>' +
        '<span class="pnav__name">' + esc(entry.n) + '</span>' +
      '</span></a>'
  }
  /* RTL: previous sits on the right, next on the left */
  return '<nav class="pnav" aria-label="ניווט בין הנופלים">' +
    link(prev, i - 1, 'הקודם →', 'pnav__link--prev') +
    '<a class="pnav__all" href="#memorial-hall"><span class="dot" aria-hidden="true"></span>כל הנופלים</a>' +
    link(next, i + 1, '← הבא', 'pnav__link--next') +
    '</nav>'
}
function topBar(i, total) {
  /* the site nav is a persistent React component now — only the pbar is
     rendered per-person here */
  return '<div class="pbar">' +
    '<a class="pbar__back" href="#memorial-hall"><span class="arr" aria-hidden="true">→</span> חזרה להיכל</a>' +
    '<span class="pbar__idx mono"><span class="ltr">' + pad(i + 1) + ' / ' + total + '</span></span>' +
    '</div>'
}
function metaItem(k, vHtml) {
  return '<div class="meta-strip__item"><span class="meta-strip__k">' + esc(k) + '</span>' +
    '<span class="meta-strip__v">' + vHtml + '</span></div>'
}
function secHead(label, title) {
  return '<div class="sec-head reveal">' +
    '<span class="sec-head__label">' + esc(label) + '</span>' +
    '<h2 class="sec-head__title">' + esc(title) + '</h2>' +
    '<div class="accent-bar sec-head__bar"></div>' +
    '</div>'
}
function secHeadCentered(label, title) {
  return '<div class="sec-head reveal" style="text-align:center">' +
    '<span class="sec-head__label">' + esc(label) + '</span>' +
    '<h2 class="sec-head__title">' + title + '</h2>' +
    '<div class="accent-bar sec-head__bar" style="margin-inline:auto"></div>' +
    '</div>'
}
function chapter(num, title, paras) {
  if (!paras || !paras.length) return ''
  return '<div class="chapter reveal">' +
    '<div class="chapter__head">' +
      '<span class="chapter__num">' + ltr(num) + '</span>' +
      '<h3 class="chapter__title">' + esc(title) + '</h3>' +
      '<span class="chapter__line"></span>' +
    '</div>' +
    '<div class="prose">' + paras.map((p) => '<p>' + esc(p) + '</p>').join('') + '</div>' +
    '</div>'
}
function renderFull(id, i) {
  const d = FALLEN[id]
  const total = ROSTER.length
  let html = ''

  html += topBar(i, total)

  /* hero */
  html +=
    '<header class="phero">' +
      '<div class="phero__grid">' +
        '<div class="phero__text">' +
          '<div class="phero__eyebrow"><span class="ln"></span>' + ltr(d.idx) + (d.feminine ? ' · בוגרת התנועה</div>' : ' · בוגר התנועה</div>') +
          '<h1 class="phero__name">' + esc(d.name) + '</h1>' +
          '<p class="phero__rank">' + esc(d.rank) + '</p>' +
          '<div class="meta-strip">' +
            metaItem('גיל בנופלו', 'בן ' + ltr(d.age)) +
            metaItem('יום הנפילה', ltr(d.date)) +
            metaItem('בתאריך העברי', esc(d.dateHe)) +
          '</div>' +
          '<figure class="phero__quote">' +
            '<figcaption class="phero__quote-label">במילותיו</figcaption>' +
            '<blockquote class="phero__quote-text">״' + esc(d.quote) + '״</blockquote>' +
          '</figure>' +
        '</div>' +
        '<div class="phero__media">' +
          '<figure class="phero__frame" id="heroFrame">' +
            '<img class="phero__portrait" src="' + IMG + esc(d.photo) + '" alt="' + esc(d.name) + '" decoding="async">' +
          '</figure>' +
        '</div>' +
      '</div>' +
    '</header>'

  /* story chapters */
  html +=
    '<section class="psec psec--dots">' +
      '<div class="psec__inner">' +
        secHead('הסיפור', 'מסע של חיים') +
        chapter('01', 'שורשים', d.roots) +
        chapter('02', 'השירות', d.service) +
        chapter('03', 'הנפילה', d.fall) +
      '</div>' +
    '</section>'

  /* legacy pull-quote */
  if (d.legacy) {
    html +=
      '<section class="psec legacy reveal">' +
        '<span class="legacy__label">המורשת שהשאיר אחריו</span>' +
        '<p class="legacy__text">' + esc(d.legacy) + '</p>' +
      '</section>'
  }

  /* traits — מי שהיה */
  if (d.traits && d.traits.length) {
    html +=
      '<section class="psec psec--tint">' +
        '<div class="psec__inner psec__inner--wide">' +
          secHead('מי שהיה', 'התכונות שנשארו איתנו') +
          '<div class="traits">' +
            d.traits.map((t) =>
              '<article class="trait reveal">' +
                '<div class="trait__img"><img src="' + IMG + esc(t.p) + '" alt="' + esc(t.t) + '" loading="lazy" decoding="async"></div>' +
                '<div class="trait__body">' +
                  '<h3 class="trait__t">' + esc(t.t) + '</h3>' +
                  '<p class="trait__x">' + esc(t.x) + '</p>' +
                '</div></article>'
            ).join('') +
          '</div>' +
        '</div>' +
      '</section>'
  }

  /* extra block */
  if (d.extra) {
    html +=
      '<section class="psec">' +
        '<div class="psec__inner">' +
          '<div class="extra reveal">' +
            '<div class="extra__eyebrow">' + esc(d.extra.eyebrow) + '</div>' +
            '<h3 class="extra__title">' + esc(d.extra.title) + '</h3>' +
            '<div class="prose">' + d.extra.paras.map((p) => '<p>' + esc(p) + '</p>').join('') + '</div>' +
          '</div>' +
        '</div>' +
      '</section>'
  }

  /* gallery */
  if (d.gallery && d.gallery.length) {
    html +=
      '<section class="psec psec--tint psec--dots">' +
        '<div class="psec__inner psec__inner--wide">' +
          secHead('אלבום', 'רגעים') +
          '<div class="gallery">' +
            d.gallery.map((g) =>
              '<figure class="gallery__item reveal"><img src="' + IMG + esc(g) + '" alt="תמונה של ' + esc(d.name) + '" loading="lazy" decoding="async"></figure>'
            ).join('') +
          '</div>' +
        '</div>' +
      '</section>'
  }

  /* song + links */
  html +=
    '<section class="psec song reveal">' +
      '<div class="psec__inner">' +
        secHeadCentered('השיר שלו', esc(d.song.t) + ' · ' + esc(d.song.a)) +
        '<div class="song__frame">' +
          '<iframe src="' + esc(d.song.embed) + '" width="100%" height="152" frameborder="0" ' +
            'allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy" ' +
            'title="' + esc(d.song.t) + '"></iframe>' +
        '</div>' +
        (d.links && d.links.length
          ? '<div class="plinks">' + d.links.map((lk) =>
              '<a class="plink" href="' + esc(lk.h) + '" target="_blank" rel="noopener noreferrer">' +
                esc(lk.l) + ' <span class="ext" aria-hidden="true">↗</span></a>'
            ).join('') + '</div>'
          : '') +
      '</div>' +
    '</section>'

  /* closing + nav */
  html +=
    '<section class="closing">' +
      candle('closing__candle') +
      '<div class="closing__orn" aria-hidden="true"><span></span><span class="d"></span><span></span></div>' +
      '<p class="closing__bless">' + (d.feminine ? 'יהי זכרה ברוך' : 'יהי זכרו ברוך') + '</p>' +
      navButtons(i) +
    '</section>'

  return html
}
function renderPlaceholder(entry, i) {
  const total = ROSTER.length
  return topBar(i, total) +
    '<header class="phero">' +
      '<div class="placeholder">' +
        '<div class="placeholder__inner">' +
          candle('placeholder__candle') +
          '<div class="phero__eyebrow" style="justify-content:center">' + ltr(pad(i + 1)) + ' · בוגר/ת התנועה</div>' +
          '<h1 class="placeholder__name">' + esc(entry.n) + '</h1>' +
          '<p class="placeholder__role">נר נשמה דולק לזכרו/ה</p>' +
          '<p class="placeholder__msg">מקום שמור בכבוד. מסע חייו/ה (שורשים, שירות ומורשת) ייכתב כאן בקרוב, כדי שזכרו/ה ימשיך/תמשיך להאיר.</p>' +
        '</div>' +
      '</div>' +
    '</header>' +
    '<section class="closing">' +
      '<p class="closing__bless">יהי זכרם ברוך</p>' +
      navButtons(i) +
    '</section>'
}

/* ---------- reveal-on-scroll observer ------------------------------------ */
function makeRevealObserver() {
  if (reduceMotion || !('IntersectionObserver' in window)) return null
  return new IntersectionObserver((entries, obs) => {
    entries.forEach((e) => {
      if (e.isIntersecting) { e.target.classList.add('is-in'); obs.unobserve(e.target) }
    })
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 })
}
function observeReveals(scope, io) {
  const nodes = (scope || document).querySelectorAll('.reveal:not(.is-in)')
  if (!io) { nodes.forEach((n) => n.classList.add('is-in')); return }
  nodes.forEach((n) => io.observe(n))
}

/* =============================================================================
   Persistent chrome — React
   ========================================================================== */
const NAV_LINKS = [
  { label: 'קבוצות הנוער', href: '#liabah' },
  { label: 'מכינה', href: '#academy' },
  { label: 'שיתופי פעולה', href: '#collabs' },
  { label: 'יזכור', href: '#memorial', active: true },
  { label: 'בוגרים', href: '#alumni' },
  { label: 'צוות', href: '#team' },
  { label: 'עמיר מנחם', href: '#amir' },
]

function MemorialNav({ onContactOpen }) {
  const [dark, setDark] = useState(true)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const sync = () => setDark(window.scrollY < window.innerHeight * 0.55)
    sync()
    window.addEventListener('scroll', sync, { passive: true })
    window.addEventListener('resize', sync)
    return () => {
      window.removeEventListener('scroll', sync)
      window.removeEventListener('resize', sync)
    }
  }, [])

  const contact = (e) => { e.preventDefault(); setOpen(false); onContactOpen() }

  return (
    <>
      <nav className={`sitenav${dark ? ' sitenav--dark' : ''}${open ? ' is-open' : ''}`} aria-label="ניווט ראשי">
        <a className="sitenav__logo" href="#home" aria-label="חמש אצבעות, דף הבית">
          <img src={logo} alt="חמש אצבעות" />
        </a>
        <div className="sitenav__links">
          {NAV_LINKS.map(({ label, href, active }) => (
            <a
              key={label}
              className={`sitenav__link${active ? ' is-active' : ''}`}
              href={href}
              aria-current={active ? 'page' : undefined}
            >
              {label}
            </a>
          ))}
        </div>
        <a className="sitenav__cta" href="#contact" onClick={contact}>יצירת קשר</a>
        <button
          className="sitenav__toggle" type="button"
          aria-label="תפריט" aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="sitenav__toggle-bars" aria-hidden="true"><i /><i /><i /></span>
        </button>
      </nav>

      <div className={`sitenav__drawer${open ? ' is-open' : ''}`} aria-label="ניווט">
        {NAV_LINKS.map(({ label, href, active }) => (
          <a
            key={label}
            className={`sitenav__drawer-link${active ? ' is-active' : ''}`}
            href={href}
            aria-current={active ? 'page' : undefined}
            onClick={() => setOpen(false)}
          >
            {label}
          </a>
        ))}
        <a className="sitenav__drawer-cta" href="#contact" onClick={contact}>יצירת קשר</a>
      </div>
    </>
  )
}

function MemorialFooter({ onContactOpen }) {
  const contact = (e) => { e.preventDefault(); onContactOpen() }
  return (
    <footer className="sitefoot">
      <div className="sitefoot__inner">
        <div className="sitefoot__grid">
          <div className="sitefoot__brand">
            <img src={logo} alt="חמש אצבעות" />
            <p className="sitefoot__desc">מפתחים את הדור הבא של מנהיגי ישראל דרך מצוינות ערכית, חוויות אתגריות וקהילה תומכת, מאז 2014.</p>
            <div className="sitefoot__status">
              <span className="sitefoot__dot" aria-hidden="true" />
              <span className="t">המערכת פועלת תקין</span>
            </div>
          </div>
          <div className="sitefoot__col">
            <h4>תנועה</h4>
            <ul>
              <li><a href="#liabah">ליבה</a></li>
              <li><a href="#academy">אקדמיה</a></li>
              <li><a href="#collabs">שת&quot;פ</a></li>
              <li><a href="#alumni">בוגרים</a></li>
            </ul>
          </div>
          <div className="sitefoot__col">
            <h4>אודות</h4>
            <ul>
              <li><a href="#amir">עמיר מנחם</a></li>
              <li><a href="#home">ערכים</a></li>
              <li><a href="#home">חזון</a></li>
              <li><a href="#home">מה אנחנו</a></li>
            </ul>
          </div>
          <div className="sitefoot__col">
            <h4>הצטרפו</h4>
            <ul>
              <li><a href="#contact" onClick={contact}>הרשמה</a></li>
              <li><a href="#contact" onClick={contact}>מתנדבים</a></li>
              <li><a href="#contact" onClick={contact}>תרומות</a></li>
              <li><a href="#contact" onClick={contact}>יצירת קשר</a></li>
            </ul>
          </div>
        </div>
        <div className="sitefoot__bottom">
          <p>© 2026 תנועת חמש אצבעות · אמיר מנחם ויורם מנחם. כל הזכויות שמורות.</p>
        </div>
      </div>
    </footer>
  )
}

/* =============================================================================
   Routing — parse the hash into { view, index }
   ========================================================================== */
function parseHash() {
  const h = window.location.hash
  const m = h.match(/^#memorial-n(\d+)$/)
  if (m) return { view: 'person', index: parseInt(m[1], 10), scroll: 'top' }
  if (h === '#memorial-hall') return { view: 'hall', index: -1, scroll: 'wall' }
  return { view: 'hall', index: -1, scroll: 'top' }
}

export default function MemorialPage({ onContactOpen }) {
  const [route, setRoute] = useState(() => parseHash())
  const rootRef = useRef(null)
  const mosaicRef = useRef(null)
  const wallRef = useRef(null)
  const openingRef = useRef(null)
  const openingTitleRef = useRef(null)
  const personRef = useRef(null)
  const ioRef = useRef(null)

  /* Only react to #memorial* hashes — ignore #contact and any app hashes
     (those unmount this page via App's router instead). */
  useEffect(() => {
    const onHashChange = () => {
      if (!window.location.hash.startsWith('#memorial')) return
      setRoute(parseHash())
    }
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

  /* One-time build: reveal observer, opening mosaic + cycle, the register,
     and the char-mask entrance for the opening title. */
  useEffect(() => {
    ioRef.current = makeRevealObserver()

    if (mosaicRef.current) mosaicRef.current.innerHTML = mosaicHTML()
    if (wallRef.current) {
      wallRef.current.innerHTML = wallHTML()
      observeReveals(wallRef.current, ioRef.current)
    }

    // char-mask entrance (V2 hero pattern): each char rises through a mask
    const t = openingTitleRef.current
    if (t && !reduceMotion) {
      const text = t.textContent
      let html = '<span class="opening__mask" aria-hidden="true">'
      for (let i = 0; i < text.length; i++) {
        const ch = text[i] === ' ' ? ' ' : esc(text[i])
        html += '<span class="oc" style="animation-delay:' + (i * 55) + 'ms">' + ch + '</span>'
      }
      html += '</span>'
      t.setAttribute('aria-label', text)
      t.innerHTML = html
    }

    // living wall (mobile): crossfade individual mosaic tiles to new portraits
    let timer = null, mq = null, onMq = null
    const m = mosaicRef.current
    if (m && !reduceMotion) {
      const photos = fallenPhotos()
      const tiles = m.querySelectorAll('img')
      if (photos.length >= 2 && tiles.length) {
        const rand = (n) => (Math.random() * n) | 0
        const swap = () => {
          const img = tiles[rand(tiles.length)]
          if (img.classList.contains('is-fading')) return
          const next = photos[rand(photos.length)]
          if (img.getAttribute('src') === next) return
          img.classList.add('is-fading')
          setTimeout(() => { img.src = next; img.classList.remove('is-fading') }, 800)
        }
        mq = window.matchMedia('(max-width: 700px)')
        const start = () => { if (!timer) timer = setInterval(swap, 1300) }
        const stop = () => {
          if (timer) { clearInterval(timer); timer = null }
          tiles.forEach((tl) => tl.classList.remove('is-fading'))
        }
        onMq = () => { if (mq.matches) start(); else stop() }
        onMq()
        if (mq.addEventListener) mq.addEventListener('change', onMq)
        else if (mq.addListener) mq.addListener(onMq)
      }
    }

    return () => {
      if (ioRef.current) ioRef.current.disconnect()
      if (timer) clearInterval(timer)
      if (mq && onMq) {
        if (mq.removeEventListener) mq.removeEventListener('change', onMq)
        else if (mq.removeListener) mq.removeListener(onMq)
      }
    }
  }, [])

  /* React to route changes — render the person view (or clear it) and scroll. */
  useEffect(() => {
    const io = ioRef.current
    if (route.view === 'person') {
      const entry = ROSTER[route.index]
      if (!entry) { window.location.hash = '#memorial-hall'; return }
      const id = entry.id && FALLEN[entry.id] ? entry.id : null
      if (personRef.current) {
        personRef.current.innerHTML = id ? renderFull(id, route.index) : renderPlaceholder(entry, route.index)
        observeReveals(personRef.current, io)
      }
      document.title = entry.n + ' · היכל הזיכרון'
      window.scrollTo(0, 0)

      // portrait frame "develops" in
      const frame = personRef.current && personRef.current.querySelector('#heroFrame')
      if (frame) {
        if (reduceMotion) frame.classList.add('is-alive')
        else requestAnimationFrame(() => setTimeout(() => frame.classList.add('is-alive'), 220))
      }
    } else {
      if (personRef.current) personRef.current.innerHTML = ''
      document.title = 'היכל הזיכרון · חמש אצבעות'
      if (openingRef.current) {
        requestAnimationFrame(() => openingRef.current && openingRef.current.classList.add('is-ready'))
      }
      if (route.scroll === 'wall') {
        const w = rootRef.current && rootRef.current.querySelector('#hall')
        window.scrollTo({ top: w ? w.offsetTop : 0, behavior: reduceMotion ? 'auto' : 'smooth' })
      } else {
        window.scrollTo(0, 0)
      }
    }
  }, [route])

  const isPerson = route.view === 'person'

  return (
    <div className="memorial-page" ref={rootRef}>
      <MemorialNav onContactOpen={onContactOpen} />

      {/* LAYER 1 + 2 — the hall */}
      <main className={`view${!isPerson ? ' is-active' : ''}`} role="main">
        <section className="opening" aria-labelledby="opening-title" ref={openingRef}>
          <div className="opening__mosaic" ref={mosaicRef} aria-hidden="true" />
          <div className="opening__scrim" aria-hidden="true" />
          <div className="opening__stage">
            <p className="opening__eyebrow"><b>לזכרם</b><span className="dot" aria-hidden="true">·</span>חמש אצבעות</p>
            <h1 className="opening__title" id="opening-title" ref={openingTitleRef}>היכל הזיכרון</h1>
            <p className="opening__sub opening__dedication">
              <span className="ded-line">עמוד הנצחה זה מוקדש לזכרם של 19 בוגרי התנועה שנפלו במלחמת חרבות ברזל.</span>
            </p>
            <div className="opening__count"><b className="ltr">19</b> בוגרי התנועה שנפלו</div>
          </div>
          <a className="opening__scroll" href="#memorial-hall" aria-label="אל ההיכל">
            <span>אל ההיכל</span>
            <span className="arrow" aria-hidden="true">↓</span>
          </a>
        </section>

        <section className="hall" id="hall" aria-labelledby="hall-title">
          <div className="atmo" aria-hidden="true">
            <span className="atmo__dots" />
            <span className="atmo__glow atmo__glow--a" />
            <span className="atmo__glow atmo__glow--b" />
          </div>
          <div className="hall__rail" aria-hidden="true" />
          <div className="hall__head">
            <div className="eyebrow">לזכרם</div>
            <h2 className="hall__title" id="hall-title">יזכור</h2>
            <div className="accent-bar" aria-hidden="true" />
            <p className="hall__sub">תשעה־עשר בוגרי התנועה שנפלו במלחמת חרבות ברזל.</p>
            <p className="hall__note">
              מסודרים לפי תאריך נפילתם. לחצו על שם כדי להכיר את מי שהיו,
              ואת מה שהשאירו אחריהם.
            </p>
          </div>
          <div className="wall" id="wall" role="list" aria-label="רשימת הנופלים" ref={wallRef} />
          <div className="hall__floor" aria-hidden="true" />
        </section>
      </main>

      {/* LAYER 3 — a person's page (filled imperatively) */}
      <main className={`view person${isPerson ? ' is-active' : ''}`} role="main" ref={personRef} />

      <MemorialFooter onContactOpen={onContactOpen} />
    </div>
  )
}
