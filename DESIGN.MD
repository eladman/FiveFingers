# Five Fingers — Design System

> The living reference for all UI decisions on the Five Fingers website.  
> Every new section, component, or pattern must follow this document.

---

## 1. Brand Tokens

### Colors
| Token | Value | Usage |
|---|---|---|
| `orange` | `#ff8714` | Primary accent — CTAs, italic headings, label tags, divider bars, glows |
| `navy` | `#000032` | Primary text, dark backgrounds, border tints |
| `off-white` | `#fafaf8` | Light section backgrounds (slightly warm, never pure white) |
| `black` | `#000000` | Scrim overlays, deep shadows |

### Opacity scales (Tailwind shorthand)
| Use | Value |
|---|---|
| Body text on light bg | `text-[#000032]/65` – `/70` |
| Divider lines | `bg-[#000032]/8` – `/10` |
| Orange glow (light sections) | `bg-[#ff8714]/8` – `/14` |
| Orange glow (dark sections) | `bg-[#ff8714]/10` – `/20` |
| Dark scrim over photos | `bg-black/45` – `/60` |

---

## 2. Typography

### Font families
| Role | Family | Class |
|---|---|---|
| Display / sans headings | Inter | `font-inter` |
| Italic drama / subtitles | Frank Ruhl Libre | `font-frank` |
| Body / UI text | Heebo | `font-heebo` (default body font) |
| Data / labels | JetBrains Mono | `font-mono` |

Fonts are loaded via Google Fonts in `index.html`.  
Tailwind aliases are defined in `tailwind.config.js`.

### Type scale — headings

Use `clamp()` for all headings so they scale fluidly with the viewport. Never hardcode a single px/rem size for h1/h2.

| Level | `clamp()` value | Style |
|---|---|---|
| H1 — hero | `clamp(3.5rem, 9vw, 9rem)` | `font-inter font-extrabold text-white tracking-tight leading-none` |
| H1 — italic drama (hero) | `clamp(2rem, 5vw, 5rem)` | `font-frank italic text-[#ff8714] leading-snug` |
| H2 — section title | `clamp(2.4rem, 4.2vw, 4.8rem)` | `font-inter font-extrabold text-[#000032] tracking-tight leading-[0.92]` |
| H2 — italic subtitle | `clamp(1.4rem, 2.2vw, 2.4rem)` | `font-frank italic text-[#ff8714] leading-snug` |
| H3 — card/block title | `clamp(1.3rem, 1.8vw, 1.9rem)` | `font-inter font-bold text-[#000032] leading-tight` |
| Body | `clamp(0.95rem, 1.1vw, 1.15rem)` | `font-heebo text-[#000032]/65 leading-relaxed` |
| Label / eyebrow | `0.75rem` fixed | `font-inter font-bold text-[#ff8714] tracking-[0.22em] uppercase` |

### Text shadows (dark backgrounds only)
```
textShadow: '0 2px 16px rgba(0,0,0,0.9), 0 0 40px rgba(0,0,0,0.7)'
```
Apply to all headings placed over photo backgrounds. Do not use on light sections.

---

## 3. Backgrounds

Two section background modes. Never invent a third without a strong reason.

### Mode A — Dark / cinematic (hero, future dark sections)
- Base: full-bleed photo slideshow (`object-cover`, `absolute inset-0`)
- Photo interval: `5000ms`, crossfade `1.2s ease-in-out`
- Overlay stack (order matters):
  1. `bg-[#ff8714]/10 mix-blend-multiply` — warm color grade, unifies photos
  2. `bg-black/45` — legibility scrim
  3. `bg-gradient-to-t from-black/80 via-black/25 to-transparent` — depth gradient
  4. `h-1/5 bg-gradient-to-t from-black/65 to-transparent` — bottom fade
  5. `h-48 bg-gradient-to-t from-[#ff8714]/8 to-transparent` — subtle orange warmth at base
- Noise: global `body::after` SVG noise at `0.03` opacity (defined in `index.css`)

### Mode B — Light / editorial (WhoWeAre and future light sections)
- Base: `bg-[#fafaf8]`
- Atmospheric glows (positioned absolutely, `pointer-events-none`):
  - Large bottom-center: `w-[70vw] h-[50vh] bg-[#ff8714]/14 blur-[160px] rounded-full`
  - Corner accent: `w-[40vw] h-[60vh] bg-[#ff8714]/8 blur-[140px] rounded-full`
- No photo backgrounds. The glow radials provide depth and warmth.

---

## 4. Layout

### Section structure
Every section is:
```jsx
<section className="relative w-full min-h-[100dvh] overflow-hidden flex items-center">
```
- `relative` — anchor for absolute overlays
- `min-h-[100dvh]` — always fills the viewport
- `overflow-hidden` — keeps glows and bleeds contained
- Direction: always `dir="rtl"` on the section element

### Column grid (two-column sections)
Use CSS grid, not flexbox, for two-column layouts. The asymmetric ratio intentionally makes the content column dominant:
```
grid-cols-1 md:grid-cols-[1fr_2.2fr]
```
- Right column (1fr): text, labels, headings — `justify-start`, `pt-24`, separated by `border-l border-[#000032]/8`
- Left column (2.2fr): media (video, image) — `flex items-center justify-center p-8 md:p-12 lg:p-16`

On mobile: columns stack vertically, border becomes `border-b`.

### Max-width & padding
- Centered content (hero, single-column): `max-w-6xl mx-auto px-8 md:px-16`
- Full-bleed grids: no max-width on the grid container; padding lives inside each column (`px-10 md:px-14 lg:px-20`)

---

## 5. Components

### Section heading block
```jsx
<div>
  <h2 className="font-inter font-extrabold text-[#000032] leading-[0.92] tracking-tight whitespace-nowrap"
      style={{ fontSize: 'clamp(2.4rem, 4.2vw, 4.8rem)' }}>
    כותרת
  </h2>
  <p className="font-frank italic text-[#ff8714] mt-3 leading-snug"
     style={{ fontSize: 'clamp(1.4rem, 2.2vw, 2.4rem)' }}>
    כותרת משנה
  </p>
</div>
```

### Label / eyebrow tag
```jsx
<span className="font-inter font-bold text-[#ff8714] text-xs tracking-[0.22em] uppercase">
  תווית
</span>
```

### Horizontal divider
```jsx
<div className="w-full h-px bg-[#000032]/10" />
```

### Orange accent bar (under a heading)
```jsx
<div className="mt-5 w-14 h-1 rounded-full bg-[#ff8714]" />
```

### Content block (label + title + body)
```jsx
<div className="flex flex-col gap-3">
  <span className="font-inter font-bold text-[#ff8714] text-xs tracking-[0.22em] uppercase">
    תווית
  </span>
  <h3 className="font-inter font-bold text-[#000032] leading-tight"
      style={{ fontSize: 'clamp(1.3rem, 1.8vw, 1.9rem)' }}>
    כותרת בלוק
  </h3>
  <p className="font-heebo text-[#000032]/65 leading-relaxed"
     style={{ fontSize: 'clamp(0.95rem, 1.1vw, 1.15rem)' }}>
    גוף טקסט.
  </p>
</div>
```

### CTA button (primary)
```jsx
<a href="#" className="group relative overflow-hidden flex items-center gap-2.5 px-8 py-3.5 rounded-full text-base font-bold bg-[#ff8714] text-white"
   style={{ transition: 'transform 280ms cubic-bezier(0.25, 0.46, 0.45, 0.94)' }}
   onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.04)'}
   onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}>
  <span className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 rounded-full" />
  <span className="relative">כפתור</span>
</a>
```

### CTA button (ghost)
```jsx
<a href="#" className="flex items-center gap-2 text-white/70 hover:text-white px-7 py-3.5 rounded-full text-base border border-white/20 hover:border-white/50 transition-all duration-300">
  גלו עוד
</a>
```

### Embedded media (video / iframe)
```jsx
<div className="relative w-full rounded-[2rem] overflow-hidden shadow-[0_40px_100px_rgba(0,0,30,0.18)] ring-1 ring-black/8"
     style={{ paddingBottom: '56.25%' }}>
  <iframe className="absolute inset-0 w-full h-full" src="..." allowFullScreen />
</div>
```

---

## 6. Motion & Animation

### Entry animation (scroll-triggered)
Every section uses the same GSAP pattern. Assign `wwa-el` (or a section-specific class) to all animating children.

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

Always wrap in `gsap.context()` and return `ctx.revert()` for cleanup.

### On-load animation (hero only)
```js
gsap.fromTo('.hero-el',
  { y: 70, opacity: 0 },
  { y: 0, opacity: 1, stagger: 0.1, duration: 1.3, ease: 'power3.out', delay: 0.15 }
)
```
No ScrollTrigger — fires immediately on mount.

### Defaults
| Property | Value |
|---|---|
| Entrance easing | `power3.out` |
| Morph easing | `power2.inOut` |
| Text stagger | `0.08` – `0.12` |
| Card/container stagger | `0.15` |
| Entrance `y` offset | `60` – `70px` |
| Duration | `1.3` – `1.4s` |

### Micro-interactions
- All interactive elements: `scale(1.03–1.04)` on hover, `cubic-bezier(0.25, 0.46, 0.45, 0.94)`, `280ms`
- Links: `translateY(-1px)` on hover (global in `index.css`)
- Scroll indicator: `scrollBounce` keyframe, `1.8s ease-in-out infinite`

---

## 7. Border Radius System

| Context | Value |
|---|---|
| Cards, media embeds, modals | `rounded-[2rem]` |
| Large containers, feature blocks | `rounded-[2.5rem]` – `rounded-[3rem]` |
| Footer top edge | `rounded-t-[4rem]` |
| Pills (buttons, badges) | `rounded-full` |
| Never use | Sharp corners (`rounded-none`, `rounded-sm`) |

---

## 8. RTL Rules

- Every `<section>` must have `dir="rtl"`
- Text alignment defaults to right — only override explicitly when centering
- In RTL flex/grid: `order-1` = right side, `order-2` = left side
- `ml-auto` pushes elements to the right (RTL equivalent of left-align)
- Orange accent bars under headings use `ml-auto` to anchor right

---

## 9. Do Not

- Use pure `#ffffff` as a background — use `#fafaf8`
- Use sharp box shadows on light backgrounds — use diffuse multi-layer shadows
- Add text shadows on light backgrounds
- Use `font-family: Arial`, `Roboto`, or `system-ui`
- Mix dark and light overlay modes in the same section
- Use `max-w` on full-bleed grid containers
- Animate without `gsap.context()` cleanup
- Use `justify-center` on text columns that should be top-anchored
