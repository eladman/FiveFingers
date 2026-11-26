# Five Fingers — Design System

> The living reference for all UI decisions on the Five Fingers website.  
> Every new section, component, or pattern must follow this document.

---

## 1. Brand Tokens

### Colors

| Token | Value | Tailwind alias | Usage |
|---|---|---|---|
| `orange` | `#ff8714` | `text-orange`, `bg-orange` | Primary accent — CTAs, italic headings, label tags, divider bars, glows |
| `orange-ink` | `#b35600` | `text-orange-ink` | AA-safe orange for text on light backgrounds (labels, eyebrows in light sections) |
| `navy` | `#000032` | `text-navy`, `bg-navy` | Primary text, dark backgrounds, border tints |
| `surface` | `#fafaf8` | `bg-surface` | Light section backgrounds (slightly warm, never pure white) |
| `surface-2` | `#f7f5f2` | `bg-surface-2` | Slightly deeper warm surface (cards, inputs, alternating rows) |
| `black` | `#000000` | — | Scrim overlays, deep shadows |

### Opacity scales (Tailwind shorthand)

| Use | Value |
|---|---|
| Body text on light bg | `text-navy/65` – `/70` |
| Divider lines / borders | `bg-navy/8` – `/10` |
| Orange glow (light sections) | `bg-orange/8` – `/14` |
| Orange glow (dark sections) | `bg-orange/10` – `/20` |
| Dark scrim over photos | `bg-black/45` – `/60` |

### Dark section gradient palette

Used only for dark section backgrounds (Features, Protocol). Not for text.

| Value | Section |
|---|---|
| `#182f6e` → `#0d1b4b` → `#081028` | Features background |
| `#1e3578` → `#0d1b4b` → `#081028` | Protocol card 1 |
| `#213d82` → `#0f2057` → `#09163e` | Protocol card 2 |
| `#172e68` → `#0a1640` → `#06102e` | Protocol card 3 |
| `#112060` | Features — Impact card bg |
| `#111111` → `#0a0a0a` → `#060606` | Footer bg gradient |

### Status / Utility colors (sparse use)

| Value | Usage |
|---|---|
| `green-400` / `green-500` | Operational status dot (Footer only) |
| `#f8f9fa`, `#f4f5f7`, `#e8eaee` | Form input backgrounds / borders (ContactModal only) |

---

## 2. Typography

### Font families

| Role | Family | Class |
|---|---|---|
| Display / brand headings | RagMarom | `font-ragmarom` |
| Labels / sans UI | Inter | `font-inter` |
| Italic drama / subtitles | Frank Ruhl Libre | `font-frank` (legacy; rarely used in new sections) |
| Body / UI text | Heebo | `font-heebo` (default body font) |
| Data / labels / mono | JetBrains Mono | `font-mono` |

RagMarom is loaded from `/fonts/rag-marom-2.1.otf` via `@font-face` in `index.css`.  
Inter, Frank Ruhl Libre, Heebo, and JetBrains Mono are loaded via Google Fonts in `index.html`.  
Tailwind aliases are defined in `tailwind.config.js`.

### Type scale — section headings (canonical classes)

Section titles, subtitles, eyebrows, and block headings are standardized as
**utility classes in `index.css`** — the single source of truth. Apply the
class and set color alongside; **never** hardcode `fontSize` on these roles.
The class owns family + size + line-height + tracking; you own the color.

| Role | Class | Value (baked into the class) |
|---|---|---|
| Eyebrow — kicker above a title | `.ds-eyebrow` | `clamp(0.72rem, 0.9vw, 0.85rem)`, Heebo 600, `0.22em`, uppercase |
| Section title — every section h2 | `.ds-section-title` | `clamp(2.8rem, 5vw, 5.5rem)`, RagMarom, lh `0.95`, tracking `-0.02em` |
| Section subtitle — lead under title | `.ds-section-subtitle` | `clamp(1.2rem, 1.9vw, 1.9rem)`, Heebo 500, lh `1.35` |
| Card / block title — h3 in content | `.ds-card-title` | `clamp(1.45rem, 1.8vw, 1.9rem)`, Heebo 700, lh `1.2` |

```jsx
{/* Light section */}
<p className="ds-eyebrow text-orange-ink">תווית</p>
<h2 className="ds-section-title text-navy">כותרת הסקשן</h2>
<p className="ds-section-subtitle text-[#ff8714]">כותרת משנה</p>

{/* Dark section — add the text-shadow inline (see Text shadows) */}
<h2 className="ds-section-title text-white" style={{ textShadow: '...' }}>כותרת</h2>
```

All four home-page sections (WhoWeAre, ManInArena, Programs, FiveContent) use
this exact scale — `2.8→5.5rem` titles, Heebo orange subtitles. Don't
reintroduce one-off section-title sizes.

### Type scale — other headings

Use `clamp()` for these too. Never hardcode a single px/rem.

| Level | `clamp()` value | Style |
|---|---|---|
| H1 — hero (main site) | `clamp(3rem, 9vw, 9.5rem)` | `font-ragmarom text-white tracking-tight leading-none` |
| H1 — cinematic intro | `clamp(4.5rem, 14vw, 13rem)` | `font-ragmarom text-white leading-none` |
| H1 — Liabah hero | `clamp(4rem, 13vw, 13rem)` | `font-ragmarom text-white leading-none` |
| H3 — program title (program name) | `clamp(2.4rem, 4vw, 5rem)` | `font-heebo font-extrabold text-navy leading-[0.95]` |
| H3 — carousel stage | `clamp(2.6rem, 4.5vw, 3.6rem)` | `font-ragmarom font-black text-navy leading-[0.9]` |
| H3 — media card title | `clamp(1rem, 1.3vw, 1.25rem)` | `font-heebo font-bold text-navy leading-tight` |
| Lead paragraph | `clamp(1.2rem, 1.7vw, 1.55rem)` | `font-heebo text-navy/70 leading-relaxed font-medium` |
| Body | `clamp(0.95rem, 1.1vw, 1.15rem)` | `font-heebo text-navy/65 leading-relaxed` |

### Text shadows (dark backgrounds only)

```
/* Hero / H1 on photo */
textShadow: '0 4px 32px rgba(0,0,0,0.95), 0 0 60px rgba(0,0,0,0.8)'

/* Subtitle / body on dark */
textShadow: '0 2px 20px rgba(0,0,0,0.9)'
```

Apply to headings placed over photo or dark-gradient backgrounds. Do not use on light sections.

---

## 3. Backgrounds

Two primary section background modes. Dark sections use one of two sub-modes.

### Mode A — Dark / photo-cinematic (Hero, CinematicIntro, LiabahHero)

- Base: full-bleed photo slideshow (`object-cover`, `absolute inset-0`)
- Photo interval: `5000ms`, crossfade `1.2s ease-in-out`
- Ken Burns effect: active slide animates `scale(1.0)` → `scale(1.12)` over `7s ease-out`
- Overlay stack (order matters):
  1. `bg-orange/10 mix-blend-multiply` — warm color grade, unifies photos
  2. `bg-black/45`–`/50` — legibility scrim
  3. `bg-gradient-to-t from-black/80 via-black/20 to-transparent` — depth gradient
  4. `h-1/5 bg-gradient-to-t from-black/65 to-transparent` — bottom fade
  5. `h-48 bg-gradient-to-t from-orange/8 to-transparent` — subtle orange warmth at base

### Mode B — Dark / gradient (Features, Protocol, Philosophy)

- Base: CSS `linear-gradient` from the dark navy palette (see section 1)
- Features: `linear-gradient(155deg, #182f6e 0%, #0d1b4b 45%, #081028 100%)`
- Top orange radial accent: `radial-gradient(ellipse 90% 45% at 50% 0%, rgba(255,135,20,0.07) 0%, transparent 65%)`
- Protocol: per-card linear gradients (see Section 1 dark palette table)
- No photo backgrounds in these sections

### Mode C — Light / editorial (WhoWeAre, Programs, ManInArena, FiveContent, LiabahSections)

- Base: `bg-surface` (`#fafaf8`)
- Atmospheric glows (positioned absolutely, `pointer-events-none`):
  - Large bottom-center: `w-[70vw] h-[50vh] bg-orange/14 blur-[160px] rounded-full`
  - Corner accent: `w-[40vw] h-[60vh] bg-orange/8 blur-[140px] rounded-full`
- **Halftone dot texture** (all light sections — subtle depth):
  ```
  backgroundImage: 'radial-gradient(circle, #000032 1.2px, transparent 1.2px)'
  backgroundSize: '22px 22px'
  opacity: 0.04
  ```
- **Hand watermark** (Programs, FiveContent, shared liabah bg):
  - Logo image, `transform: rotate(-12deg) scaleX(-1)`, `opacity: 0.05`, `filter: grayscale(1)`
  - Positioned `left -3%`, `top 50%`, `translateY(-50%)`

### Global noise overlay

```css
body::after {
  background-image: url("data:image/svg+xml,...");  /* SVG fractal noise */
  opacity: 0.018;
  pointer-events: none;
}
```

Defined in `index.css`. Applies universally across all sections.

### Footer

```
background: linear-gradient(180deg, #111111 0%, #0a0a0a 50%, #060606 100%)
```

Rounded top edge: `rounded-t-[4rem]`

---

## 4. Layout

### Section structure

Every section is:
```jsx
<section className="relative w-full min-h-[100dvh] overflow-hidden flex items-center" dir="rtl">
```

- `relative` — anchor for absolute overlays
- `min-h-[100dvh]` — always fills the viewport
- `overflow-hidden` — keeps glows and bleeds contained
- `dir="rtl"` — every section element

### Column grid (two-column sections)

Use CSS grid, not flexbox, for two-column layouts. The asymmetric ratio intentionally makes the content column dominant:

```
grid-cols-1 md:grid-cols-[1fr_2.2fr]
```

- Right column (1fr): text, labels, headings — `justify-start`, `pt-24`, separated by `border-l border-navy/8`
- Left column (2.2fr): media (video, image) — `flex items-center justify-center p-8 md:p-12 lg:p-16`

On mobile: columns stack vertically, `border-l` becomes `border-b`.

### Max-width & padding

| Pattern | Usage |
|---|---|
| `max-w-6xl mx-auto px-8 md:px-16` | Hero, single-column centered |
| `max-w-screen-xl mx-auto px-6 md:px-12 lg:px-20` | Programs, broad layout |
| `max-w-7xl mx-auto` | Features, wide sections |
| `max-w-4xl mx-auto` | ContactCTA, narrow content |
| No max-width on grid container; padding inside each column (`px-10 md:px-14 lg:px-20`) | Full-bleed grids |

### Section padding

Typical vertical rhythm: `py-16 md:py-28 lg:py-40`

### Aspect ratios

| Context | Value |
|---|---|
| Video / iframe | `padding-bottom: 56.25%` (16:9) |
| Program image cards | `aspect-[4/3]` |
| YouTube embed covers | `aspect-[16/9]` |
| Carousel height | `h-[320px] md:h-[400px]` (fixed) |

---

## 5. Components

### Section heading block

Use the canonical type classes (`.ds-eyebrow` / `.ds-section-title` /
`.ds-section-subtitle`) — never inline `fontSize` here.

```jsx
<div>
  <p className="ds-eyebrow text-orange-ink mb-3">תווית</p>
  <h2 className="ds-section-title text-navy">כותרת</h2>
  <p className="ds-section-subtitle text-[#ff8714] mt-4">כותרת משנה</p>
  <div className="mt-5 w-14 h-1 rounded-full bg-orange ml-auto" />
</div>
```

A shared `<SectionHeading>` component wraps this pattern in Liabah sections (`liabah/shared.jsx`).

### Label / eyebrow tag

```jsx
{/* Light section */}
<span className="ds-eyebrow text-orange-ink">תווית</span>

{/* Dark section */}
<span className="ds-eyebrow text-orange">תווית</span>
```

### Horizontal divider

```jsx
<div className="w-full h-px bg-navy/10" />
```

### Orange accent bar (under a heading)

```jsx
<div className="mt-5 w-14 h-1 rounded-full bg-orange ml-auto" />
```

`ml-auto` anchors to the right in RTL.

### SoftDivider (between sections)

```jsx
<SoftDivider fromColor="#fafaf8" toColor="#ffffff" height={120} blend={true} />
```

Gradient or crisp 50/50 split between sections. Centered orange tick accent. See `SoftDivider.jsx`.

### Content block (label + title + body)

```jsx
<div className="flex flex-col gap-3">
  <span className="ds-eyebrow text-orange-ink">תווית</span>
  <h3 className="ds-card-title text-navy">כותרת בלוק</h3>
  <p className="font-heebo text-navy/65 leading-relaxed"
     style={{ fontSize: 'clamp(0.95rem, 1.1vw, 1.15rem)' }}>
    גוף טקסט.
  </p>
</div>
```

### Button (unified component — `ui/Button.jsx`)

Three variants:

```jsx
{/* Primary (default) */}
<Button variant="primary" size="md">כפתור</Button>
{/* → bg-orange text-white */}

{/* Secondary */}
<Button variant="secondary" size="md">כפתור</Button>
{/* → bg-white/10 text-white border border-white/20 */}

{/* Ghost */}
<Button variant="ghost" size="md">כפתור</Button>
{/* → bg-transparent text-white/70 border border-white/20 */}
```

Sizes: `sm` (`px-5 py-2 text-sm`) | `md` (`px-8 py-3.5 text-base`) | `lg` (`px-10 py-4 text-lg`)

All buttons:
- `rounded-full` — pill shape
- Hover: `scale(1.04)` at `280ms cubic-bezier(0.25, 0.46, 0.45, 0.94)`
- Hover overlay: `bg-white/20` (or `/15` for ghost/secondary) slides up from bottom (`translate-y-full → translate-y-0`, 300ms)
- Active: `active:scale-[0.97]`
- Focus: `focus-visible:ring-2 ring-orange ring-offset-2`

### Embedded media (video / iframe)

```jsx
<div className="relative w-full rounded-[2rem] overflow-hidden shadow-[0_40px_100px_rgba(0,0,30,0.18)] ring-1 ring-black/8"
     style={{ paddingBottom: '56.25%' }}>
  <iframe className="absolute inset-0 w-full h-full" src="..." allowFullScreen />
</div>
```

### Image card with hover zoom

```jsx
<div className="rounded-[2rem] overflow-hidden border border-navy/8">
  <div className="relative aspect-[4/3] overflow-hidden">
    <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
  </div>
  <div className="p-6 text-right">
    <h4>Title</h4>
    <p>Text</p>
  </div>
</div>
```

Image zooms to `scale-105` on hover over 500ms.

### Feature card stack (Competence pattern)

Three cards stacked with depth illusion:

- Absolute positioning: `top: i * 62px`
- Background opacity tiers: `0.22` (front) → `0.10` → `0.04` (back)
- Scale: `scale(1 - i * 0.04)`
- On active cycle: cards shuffle with `all 620ms cubic-bezier(0.34, 1.56, 0.64, 1)` (spring bounce)

### Typewriter text (Belonging pattern)

- Message cycles every `2s` (type + hold + delete)
- Character insert: `65ms/char`, delete: `32ms/char`
- Cursor: orange blinking `animate-pulse`

### 3D carousel (LiabahEssence stages)

- CSS perspective: `1400px` on container
- Active card: `scale(1)`, `opacity: 1`, highest z-index
- Side cards: `scale(0.86)`, `opacity: 0.6`, clickable
- Transform: `translateX(calc(-50% + offset))` at `cubic-bezier(0.4, 0, 0.2, 1) 520ms`
- Edge fade mask: `linear-gradient(90deg, transparent 0%, #000 13%, #000 87%, transparent 100%)`

### Contact modal

- Backdrop: `background: rgba(6,8,22,0.78)`, `backdropFilter: blur(6px)`
- Panel: `width: min(900px, calc(100vw - 32px))`, `rounded-[2rem]`, `shadow: 0 30px 90px -20px rgba(0,0,0,0.55)`
- Entrance: `scale(0.96) translateY(24px)` → `scale(1) translateY(0)` at `420ms cubic-bezier(0.22, 1, 0.36, 1)`

**GlowField (text input)**
- Unfocused: `bg-[#f7f8fa]`, `border-[#e8eaee]`
- Focused: `bg-white`, `border-orange`, `box-shadow: 0 0 0 4px rgba(255,135,20,0.12)`

**Chip selector (interest tags)**
- Active: `bg-orange text-white`
- Inactive: `bg-[#f4f5f7] text-navy/65`

### Protocol sticky scroll

Three stacked cards anchored with `position: sticky`. Cards animate in/out as user scrolls through the section using `ScrollTrigger` with `scrub: 1.5`. Each card has a dark navy gradient background (see Section 1).

---

## 6. Motion & Animation

### Entry animation (scroll-triggered)

Standard pattern for all section reveals. Always wrap in `gsap.context()` and return `ctx.revert()` for cleanup.

```js
gsap.fromTo(
  '.section-el',
  { y: 60, opacity: 0 },
  {
    y: 0, opacity: 1,
    stagger: 0.12,
    duration: 1.3,
    ease: 'power3.out',
    scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
  }
)
```

### On-load animation (hero only)

```js
gsap.fromTo('.hero-el',
  { y: 70, opacity: 0 },
  { y: 0, opacity: 1, stagger: 0.1, duration: 1.3, ease: 'power3.out', delay: 0.15 }
)
```

No ScrollTrigger — fires immediately on mount.

### Scrub animation (Protocol sticky section)

```js
ScrollTrigger.create({
  trigger: ...,
  scrub: 1.5,
  // 1.5s smoothing lag between scroll position and animation
})
```

Use only for scroll-linked morphing. Not for standard reveals.

### Easing library

| Name | Value | Use case |
|---|---|---|
| `power3.out` | GSAP built-in | Default entrance easing |
| `power2.out` | GSAP built-in | Secondary reveals, CTAs |
| `power2.inOut` | GSAP built-in | Scale/morph transitions |
| `back.out(2)` | GSAP built-in | Bouncy scale entrances (timeline) |
| Brand easing | `cubic-bezier(0.25, 0.46, 0.45, 0.94)` | Button hover (280ms) |
| Spring bounce | `cubic-bezier(0.34, 1.56, 0.64, 1)` | Feature card shuffle (620ms) |
| Smooth material | `cubic-bezier(0.4, 0, 0.2, 1)` | Carousel morph (520ms) |
| Pop / modal | `cubic-bezier(0.22, 1, 0.36, 1)` | Modal entrance (420ms) |

### Defaults

| Property | Value |
|---|---|
| Entrance easing | `power3.out` |
| Morph easing | `power2.inOut` |
| Text stagger | `0.06` – `0.12` |
| Card / container stagger | `0.14` – `0.15` |
| Entrance `y` offset | `60` – `70px` |
| Duration | `1.3` – `1.4s` |
| ScrollTrigger start | `'top 75%'` (default), `'top 70%'` / `'top 80%'` (context-adjusted) |

### SVG keyframe animations (`index.css`)

| Name | Description | Duration |
|---|---|---|
| `ekg` | EKG waveform sweeps across `stroke-dashoffset` | 3.2s ease-in-out infinite |
| `scanDown` | Laser line scans downward, fades in/out | 2.6s ease-in-out infinite |
| `rotateGeo` | Geometric ring spins clockwise | 5–12s linear infinite (per ring) |
| `rotateGeoRev` | Geometric ring counter-clockwise | Mirror of above |
| `pulseRing` | Ring scales 1→1.6 and fades | 2s ease-out infinite |
| `scrollBounce` | Scroll indicator bounces down 8px | 1.8s ease-in-out infinite |
| `kenBurns` | Hero slide zooms from `scale(1.0)` to `scale(1.12)` | 7s ease-out forwards |

### Micro-interactions

- All interactive elements: `scale(1.03–1.04)` on hover, `cubic-bezier(0.25, 0.46, 0.45, 0.94)`, `280ms`
- Button active/pressed: `active:scale-[0.97]`
- Image cards: `scale-105` on hover over `500ms`
- Links: `translateY(-1px)` on hover (global in `index.css`)
- Scroll indicator: `scrollBounce` keyframe, `1.8s ease-in-out infinite`

### Reduced motion

All scroll-triggered and hero animations check `prefers-reduced-motion` before running:

```js
const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
if (!reduced) { /* run gsap */ }
```

Global CSS also resets all durations to `0.01ms` for this preference (see `index.css`).

---

## 7. Shadow System

### CSS variables (defined in `index.css`)

```css
--shadow-sm:    0 1px 2px rgba(0,0,30,0.06), 0 2px 8px rgba(0,0,30,0.06);
--shadow-md:    0 8px 24px rgba(0,0,30,0.10);
--shadow-lg:    0 24px 60px rgba(0,0,30,0.14);
--shadow-xl:    0 40px 100px rgba(0,0,30,0.18);
--shadow-focus: 0 0 0 3px rgba(255,135,20,0.35);
```

### Tailwind shadow shorthands

| Class | Inline equivalent | Usage |
|---|---|---|
| `shadow-[0_40px_100px_rgba(0,0,30,0.18)]` | `--shadow-xl` | Media embeds |
| `shadow-2xl` | system Tailwind | Navbar (scrolled) |

### Notable inline shadows

| Context | Value |
|---|---|
| Carousel active card | `0 28px 70px -14px rgba(0,0,50,0.22), 0 12px 30px -6px rgba(255,135,20,0.16)` |
| Carousel inactive card | `0 6px 24px -4px rgba(0,0,50,0.07)` |
| Button hover (orange glow) | `0 10px 26px -8px rgba(255,135,20,0.65)` |
| Contact modal | `0 30px 90px -20px rgba(0,0,0,0.55)` |

---

## 8. Border Radius System

| Context | Value |
|---|---|
| Cards, media embeds, modals | `rounded-[2rem]` (32px) |
| Smaller cards, input fields | `rounded-2xl` (16px) |
| Footer top edge | `rounded-t-[4rem]` (64px) |
| Pills (buttons, badges, accent bars) | `rounded-full` |
| Never use | Sharp corners (`rounded-none`, `rounded-sm`) |

---

## 9. RTL Rules

- **HTML root**: `<html lang="he" dir="rtl">` (index.html)
- **Body**: `direction: rtl` (index.css)
- **Every `<section>`**: `dir="rtl"` on the element
- Text alignment defaults to right — only override explicitly when centering
- In RTL flex/grid: `order-1` = right side, `order-2` = left side
- `ml-auto` pushes elements to the right (RTL equivalent of left-align)
- Orange accent bars under headings use `ml-auto` to anchor right
- `border-l` in code renders as a right-side border visually in RTL (browser-native)
- Alternating program rows use `order-1`/`order-2` toggling — not `flex-row-reverse`
- Logical CSS shorthand: use `me-` (margin-end) and `ms-` (margin-start) instead of `mr-`/`ml-` where directionality matters

---

## 10. Do Not

- Use pure `#ffffff` as a background — use `#fafaf8` (surface) or `#f7f5f2` (surface-2)
- Use `text-orange` (`#ff8714`) for text on light backgrounds — use `text-orange-ink` (`#b35600`) instead
- Use sharp box shadows on light backgrounds — use diffuse multi-layer shadows
- Add text shadows on light backgrounds
- Use `font-family: Arial`, `Roboto`, or `system-ui`
- Mix dark and light overlay modes in the same section
- Use `max-w` on full-bleed grid containers
- Animate without `gsap.context()` cleanup
- Use `justify-center` on text columns that should be top-anchored
- Use masculine singular Hebrew as a generic default — follow the gender-neutral policy in `CLAUDE.md`
- Run GSAP animations without checking `prefers-reduced-motion` first

---

## 11. Home v2 — "Into the Arena" (redesign branch)

The homepage is a scroll-choreographed experience built from `src/redesign/`.
Sub-pages keep the original system above; these patterns are home-only.

| Component | Pattern |
|---|---|
| `Preloader.jsx` | Session-once brand veil: five orange pillars fill on navy-deep, wordmark, clip-path wipe up. Skipped under reduced motion. Hands off to the hero via `onDone`. |
| `ArenaHero.jsx` + `heroGL.js` | Custom WebGL (no three.js dep): fullscreen quad, procedural-noise displacement crossfade between Hero-Pics, pointer ripple, scroll-velocity warp + chromatic split. Poster-scale RagMarom composition anchored to the base, char-mask entrance. Fallbacks: img crossfade (no WebGL), static frame (reduced motion). |
| `IntroV2.jsx` | Light breath: masked word-reveal statement, photo trio at three parallax speeds, the movement film. |
| `Manifesto.jsx` | Pinned 230% scrub: the Roosevelt arena quote ignites word-by-word (white; key words orange), outro rises at the end. |
| `FiveDNA.jsx` | Signature section: 5 full-screen value panels travel horizontally (RTL direction) inside a pin; five-finger progress indicator + LTR counter; duotone photos (`grayscale(0.55)` + orange multiply); giant ghost Hebrew ordinals (א–ה) at 7% white. Mobile: vertical stack, plain reveals. |
| `ProgramsV2.jsx` | Cinematic rows: image unclips on scrub, inner parallax (`inset-[-10%]` + `max-w-none` — Tailwind preflight caps img at max-w 100%), text card overlaps the frame on desktop, animated two-tone underline links. |
| `PulseBand.jsx` | Orange drench: seamless RagMarom marquee (two identical halves, `xPercent -50 → 0`, repeat -1), count-up stats in navy on orange. |
| `FinaleCTA.jsx` | One question, one door: slow photo push-in scrub, magnetic primary CTA (`useMagnetic`, desktop fine-pointers only). |

Motion defaults follow section 6; every scrub/pin/loop checks
`prefers-reduced-motion` and `gsap.matchMedia` handles the desktop/mobile split.

---

## 12. /reef — דרך ריף: the valley world

A standalone sub-surface (`reef.html` → `src/reef/`). It keeps the main site's
brand primitives (navy, orange, RagMarom, Heebo, `Button`, `--ease-brand`) and
replaces the main site's surfaces with the Jezreel Valley seen from the air.
Everything below applies to `/reef` only; sections 1–11 stay the system for
the rest of the site. Where this section and section 10 disagree, this
section governs `/reef` (noted inline).

### Overview

**The Way Rule.** The page is a journey along "the way": one orange winding
path that is drawn in the hero, underlines the turning phrase, bridges
sections, and becomes the chapter navigator. The visitor travels it; the
page never stacks label + title + paragraph blocks.

Grounds are the valley's materials: wheat, field green, a pale sky, plain
white. Navy is ink. Orange is the way, the actions, and one turning phrase.

### Colors

Grounds (section backgrounds, alternated down the page):

- **Wheat** (`wheat`, `#f6f1e6`) — warm field ground: Offer, Place, Vision, Donate; also the chapter menu, scrollbar track and the rail's unvisited stops.
- **White** (`#ffffff`) — the quiet ground: Story, Why, Day, Valley, Partners, Contact. *Divergence from section 10:* plain white is a ground here, as built.
- **Field green** (`valley`, `#2f5d46`) — the one dark green ground (Values, white text on it); also the scrollbar thumb and the chosen-audience dot. Text-safe on light grounds.
- **Navy-deep** (`#081028`) — the Partner band (white text). Navy (`#0d1b4b`) — the "build your day" panel in Offer.
- **Morning horizon** (`#f1e4cb`) — the hero ground behind the canvas/poster, matching the scene's horizon colour. Hero sky in the scene runs from a pale sky blue (`#9fbfd4`) through haze (`#93a9bd`) to that horizon.
- The Day section's ground is a static gradient from white to a morning-to-afternoon cream (`#f6ead2`), so it reads as the day warming without repainting on scroll.

Plot fills (crops; used only inside the field-plot material, never as section grounds):
ripe wheat `#d9b86b`, young green `#a9bf7c`, dry ochre (`earth-soft`, `#dcc39c`), plowed soil `#b98f63`,
sage `#c9d3a3`, pale green (`valley-soft`, `#e9f0e8`), apricot `#ffb46b`, sown-apricot `#ffd9b0`.

Ink and accent:

- **Navy** — all display and body text on light grounds (body at 75–80% opacity, lead paragraphs at full).
- **Orange** (`#ff8714`) — the way (every path stroke, rail fill, scroll cue, map marker), primary CTAs (the site `Button`), active pins/stops/dots, the crowning fifth value pillar, text selection/caret/accent-color.
- **Orange-ink** (`--orange-ink`) — orange as *text* on light grounds: only the accented last line of a `Title` and the turning phrase of the Story statement. On dark grounds the same accented line is plain orange.

**The One Turning Phrase Rule.** A statement gets at most one orange phrase, and it is the turn of the sentence. Orange never colours body copy, labels or decoration other than the way.

### Typography

- **Display — RagMarom.** Every heading, the hero name (`clamp(5rem, 14vw, 12.5rem)`, leading 0.82, tracking −0.02em), section titles via `Title` (`xl` 3–7rem, `lg` 2.6–5.25rem, `md` 2.2–3.9rem; leading 0.96, tracking −0.015em, balanced), long sentence-titles one step down (2.3–4.25rem, leading 1), fieldset legends, audience names, value names, chapter labels in the phone menu.
- **Text — Heebo.** Body (1.02–1.15rem, relaxed leading; Story at leading 1.8), lead paragraphs (1.15–1.4rem, medium, full navy), UI labels and nav links (~0.95rem), offer item names (extrabold, 1.2–1.4rem).
- **Mono — JetBrains Mono, clock times only.** The Day section's times (`tabular-nums`, `dir="ltr"`), nothing else.

**The Clock-Only Mono Rule.** Monospace appears only where a clock time is shown.

### Layout

- Gutters and measure match the main site (`max-w-screen-xl`, `px-5 / sm:px-8 / md:px-12`). Section padding is generous (`py-24 md:py-36`, Story up to `pt-44`).
- Every section is `dir="rtl"`, labelled by its title, and `scroll-mt-16` under the 64/72px top bar. In-page links scroll smoothly (instant under reduced motion), never change the URL hash, and move focus to the target section.
- **Navigation by width:** below 1024px a "chapters" button opens the phone chapter menu; 1024px+ shows top-bar links; at 1360px+ the way rail appears in the left margin (hidden on the hero).

### Elevation & Depth

Flat, by material rather than shadow. Depth comes from the 3D valley, photo scrims (`navy-deep` at ~30%), and a soft wheat radial "whisper" behind the hero type. The only shadows are the diffuse halo on Place rendering pins (`0 6px 18px` navy at ~28% plus a translucent ring).

### Shapes

- **Field plots** are the texture: a plot colour overlaid with fine furrow stripes (2px navy-deep at 7% every 11px) at the plot's own angle. On dark grounds, a white furrow screen at 6% opacity.
- Large photo and panel corners are gently rounded (1.75rem); value pillars round their tops (1.6rem) and stand square-ish at the base (0.5rem). Pills for buttons, chips, stop labels and controls (44px tap targets).
- Dividers are hairlines (`navy` at 12–20%), never boxes.

**The No-Card Rule.** Content sits on grounds, in rows divided by hairlines, or inside plots. No bordered/elevated cards, no icon tiles.

### Components

- **Valley hero (three.js).** A procedurally built Jezreel Valley at morning; the orange way draws from the foreground to a marker on the horizon, labelled with the place name. Scrolling pins the hero (110% wide / 85% narrow, scrub 0.5) and flies the camera along the way while the copy lifts away and an arrival line rises. The scene caps pixel ratio (1.5 / 1.25 lite) and renders every other frame while idle. Lite mode on phones and coarse pointers; renders only while on screen. **Fallbacks:** no WebGL (or scene failure) shows a still poster of the same valley with the marker placed on it; reduced motion renders one still frame, never pins.
- **Way rail (≥1360px).** A winding path down the left margin with one stop per chapter; the orange fill tracks reading progress; stop names appear on hover/focus only, as navy pills.
- **Phone chapter menu.** A full-screen native `<dialog>` on wheat, opening with a top-down clip wipe; chapters as RagMarom labels on a vertical way with orange visited/current stops.
- **WayBridge.** The way crossing a section seam (Story → Why, Day → Offer), drawn by scroll, zero-height, never crossing text.
- **PathRule.** A short winding orange stroke — this page's replacement for the main site's straight orange accent bar.
- **Field-plot rows (What).** Each pillar is a row; on fine-pointer hover its plot sweeps in from the reading edge.
- **Value pillars (Values).** Five pillars of rising height on the green ground, one crop each, the fifth in orange — the movement's mark. They grow by clip (never scale) on scroll.
- **Place tour camera.** The architectural rendering as one camera: pins, a tour bar and a list of spaces all zoom it into a space; step back out to the whole compound. Pins are white numbered dots that turn orange when active.
- **Day sun arc.** A sun crosses an orange arc as the visitor scrolls the day's moments; the mono clock reads the current moment; the sticky photograph cross-fades to it.
- **Offer: build your day.** Formats and audience are pressable rows; choosing a row sows its plot (apricot for formats, sage for audience) sweeping in from the reading edge. The choices collect as chips on the navy furrowed panel, which composes the WhatsApp message to the contact person.
- **Buttons.** Primary is the site's orange `Button`; secondary is a navy outline pill on light grounds that fills navy on hover.

**The Way Draws Itself Rule.** Every path stroke (`pathLength="1"`, dash offset 1 → 0) is drawn by reveal or scroll; under reduced motion it is simply present.

### Motion grammar

- **Shared reveal (`useSectionMotion`):** title lines rise from their own masks (expo-out, ~1.15s, staggered); blocks ease up 34px into place; quiet fades are opacity-only (~1.8s). Content is visible in the markup; motion only runs when allowed.
- **One scrub moment per section:** hero flight; the Story underline; WayBridges; What's closing verbs lighting one after another; Day's sun and clock; the Why photograph settling; the rail fill. Values grow once on entry (not scrubbed).
- **Performance rules:** scroll progress never goes through React state (useChapter writes it to `[data-rf-progress]` elements); no backdrop-filter on fixed or sticky chrome; no filter, clip-path or background-color scrubs on large layers (transform, opacity and stroke only); the site-wide grain overlay is off on /reef; reveals are batched (`ScrollTrigger.batch`). The Why statement is deliberately gentle: no pin, no mask.
- **Story is the still point:** slow fades only — no parallax, no distortion.
- Easing is `--ease-brand` for state, expo-out for entrances; hover effects are gated to fine pointers.

### Do's and Don'ts

- **Do** take every word verbatim from `src/reef/content.js`; sections never hard-code copy.
- **Do** render a complete page under reduced motion and without WebGL — no pins, no hidden content, every path already drawn.
- **Do** keep section kickers in navigation and legends only: the rail, the phone menu, fieldset legends, the hero's map-marker label.
- **Don't** set a small label above a title (no eyebrows or kickers in content).
- **Don't** use cards, icon tiles, or hard shadows; use grounds, hairline rows and plots.
- **Don't** use orange as text on light grounds (orange-ink only), or for more than one phrase in a statement.
- **Don't** use mono outside clock times, or a third typeface.
