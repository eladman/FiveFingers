# Accessibility Widget — Agent Prompt
## חמש אצבעות Website | תקנה 35 | WCAG 2.0 AA

---

## Mission

Build a fully self-contained accessibility widget component for a React/Next.js website.
The widget must comply with Israeli accessibility law (תקנות שוויון זכויות לאנשים עם מוגבלות, תקנה 35, תשע"ג-2013) and meet WCAG 2.0 AA standard (Israeli standard ת"י 5568).
No external paid services. No third-party plugins. Built from scratch.

---

## Tech Stack

- React / Next.js
- CSS Modules or Tailwind — match whatever is already used in the project
- TypeScript if the project uses it
- No additional npm packages beyond what's already installed

---

## File Structure

Create the following files:

```
components/Accessibility/AccessibilityWidget.tsx      ← main widget component
components/Accessibility/AccessibilityWidget.module.css ← styles (if using CSS Modules)
hooks/useAccessibility.ts                             ← state + localStorage hook
components/Accessibility/AccessibilityStatement.tsx   ← legal statement modal/page
```

Also update `_app.tsx` (Pages Router) or `layout.tsx` (App Router) to include the widget globally on every page.

---

## Trigger Button

| Property | Value |
|---|---|
| Position | Fixed, bottom-left: `left: 24px; bottom: 24px` |
| z-index | 9999 |
| Size | 52×52px, circular (`border-radius: 50%`) |
| Background | `#1565C0` (blue) |
| Icon | White wheelchair/accessibility SVG icon |
| Hover | `#0D47A1`, `transform: scale(1.05)` |
| `aria-label` | `"פתח תפריט נגישות"` |
| Keyboard | Focusable via Tab, visible focus ring |
| Important | The button itself must NOT be affected by the widget's own font-size changes |

---

## Panel

- Slides up from bottom-left, anchored above the trigger button
- Width: `320px`, max-height: `80vh`, internally scrollable
- Background: white, `border-radius: 12px`, prominent `box-shadow`
- Header: `"אפשרויות נגישות"` (RTL), with an ✕ close button on the left
- Direction: `dir="rtl"` throughout the entire panel
- Sections separated by visible dividers

---

## Features

Implement ALL 13 features below. Each feature must:

- Have a clear Hebrew label
- Have a toggle or step control (button, +/- counter, or select)
- Show active state visually (highlighted row / checked)
- Persist to `localStorage` under key `"a11y-settings"`
- Apply changes to the full page via CSS classes on `<html>` or `<body>`, or via `document.documentElement.style`

### Section 1 — תצוגה

| # | Feature | Hebrew Label | Implementation |
|---|---|---|---|
| 1 | Font size | הגדלת טקסט | 4 levels: רגיל / גדול (+25%) / גדול מאוד (+50%) / ענק (+75%) via `document.documentElement.style.fontSize` |
| 2 | Line height | ריווח בין שורות | Toggle → class `a11y-line-height` on `<body>` |
| 3 | Letter spacing | ריווח בין אותיות | Toggle → class `a11y-letter-spacing` on `<body>` |
| 4 | Readable font | גופן קריא | Toggle → switches all fonts to Arial/sans-serif via class `a11y-readable-font` on `<body>` |

### Section 2 — צבע וניגודיות

| # | Feature | Hebrew Label | Implementation |
|---|---|---|---|
| 5 | High contrast | ניגודיות גבוהה | Toggle → class `a11y-high-contrast` on `<html>`: black bg, white/yellow text |
| 6 | Invert colors | היפוך צבעים | Toggle → `filter: invert(1) hue-rotate(180deg)` on `<html>`, cancel on `img`/`video` |
| 7 | Grayscale | גווני אפור | Toggle → `filter: grayscale(1)` on `<html>` |
| 8 | Light background | רקע בהיר | Toggle → class `a11y-light-bg` on `<html>`: forces white bg + dark text |
| 9 | Highlight links | הדגשת קישורים | Toggle → class `a11y-highlight-links` on `<body>`: underline + bold on all `<a>` |

### Section 3 — ניווט ושימושיות

| # | Feature | Hebrew Label | Implementation |
|---|---|---|---|
| 10 | Focus highlight | הדגשת פוקוס | Toggle → class `a11y-focus-highlight` on `<body>`: `*:focus { outline: 3px solid #FFD600 !important }` |
| 11 | Stop animations | עצור אנימציות | Toggle → class `a11y-stop-animations` on `<html>`: `animation: none !important; transition: none !important` on all elements |
| 12 | Highlight headings | הדגשת כותרות | Toggle → class `a11y-highlight-headings` on `<body>`: left blue border on h1–h4 |
| 13 | Big cursor | סמן גדול | Toggle → class `a11y-big-cursor` on `<html>`: enlarged cursor |

---

## State Management — `useAccessibility.ts`

```typescript
interface A11ySettings {
  fontSize: 0 | 1 | 2 | 3;      // 0=normal, 1=+25%, 2=+50%, 3=+75%
  lineHeight: boolean;
  letterSpacing: boolean;
  readableFont: boolean;
  highContrast: boolean;
  invertColors: boolean;
  grayscale: boolean;
  lightBackground: boolean;
  highlightLinks: boolean;
  focusHighlight: boolean;
  stopAnimations: boolean;
  highlightHeadings: boolean;
  bigCursor: boolean;
}
```

- Load from `localStorage` on mount
- Save to `localStorage` on every change
- Single `applySettings(settings)` function that runs on mount AND on every update
- `resetAll()` function: clears all classes, resets font size, clears `localStorage`

---

## Panel Footer

**Reset button** — full width, outlined style (not filled):
- Label: `"איפוס הגדרות"`
- Calls `resetAll()`

**Accessibility statement link** — text link below reset:
- Label: `"הצהרת נגישות"`
- Opens `AccessibilityStatement` as a modal (or navigates to `/accessibility-statement`)

---

## Accessibility Statement Content

Generate a proper Hebrew legal statement including:

- **שם הארגון:** חמש אצבעות
- **תאריך עדכון:** [today's date]
- **רמת נגישות:** AA לפי תקן WCAG 2.0 / ת"י 5568
- **יצירת קשר לדיווח על בעיות:** `accessibility@hamesh-etzbaot.org.il` (placeholder)
- **בסיס חוקי:** חוק שוויון זכויות לאנשים עם מוגבלות, תשנ"ח-1998, תקנה 35
- Format: clean readable page, not a wall of text

---

## Global CSS — Inject Once

Add to `globals.css` or inject a `<style>` tag once on mount:

```css
/* Accessibility Widget — Global Overrides */

.a11y-line-height * { line-height: 1.8 !important; }
.a11y-letter-spacing * { letter-spacing: 0.12em !important; }
.a11y-readable-font * { font-family: Arial, Helvetica, sans-serif !important; }

.a11y-highlight-links a {
  text-decoration: underline !important;
  font-weight: bold !important;
  border-bottom: 2px solid currentColor !important;
}

.a11y-focus-highlight *:focus {
  outline: 3px solid #FFD600 !important;
  outline-offset: 3px !important;
}

.a11y-stop-animations *,
.a11y-stop-animations *::before,
.a11y-stop-animations *::after {
  animation: none !important;
  transition: none !important;
}

.a11y-highlight-headings h1,
.a11y-highlight-headings h2,
.a11y-highlight-headings h3,
.a11y-highlight-headings h4 {
  border-right: 4px solid #1565C0 !important;
  padding-right: 8px !important;
}

html.a11y-high-contrast { background: #000 !important; }
html.a11y-high-contrast * { background-color: #000 !important; color: #fff !important; border-color: #fff !important; }
html.a11y-high-contrast img { filter: contrast(1.2); }

html.a11y-light-bg { background: #fff !important; }
html.a11y-light-bg * { background-color: #fff !important; color: #111 !important; }

html.a11y-invert { filter: invert(1) hue-rotate(180deg); }
html.a11y-invert img,
html.a11y-invert video { filter: invert(1) hue-rotate(180deg); }

html.a11y-grayscale { filter: grayscale(1); }
```

---

## Implementation Rules

1. **React Portal** — render the entire widget via `ReactDOM.createPortal` into `document.body` to avoid `overflow: hidden` issues on page containers
2. **Click outside** — clicking outside the open panel closes it
3. **Escape key** — pressing Escape closes the panel
4. **Focus trap** — when panel is open, Tab key cycles only within panel elements
5. **Cleanup** — all classes added to `<html>` / `<body>` must be properly removed when toggled off
6. **No z-index conflicts** — keep widget at `z-index: 9999`
7. **Global CSS scope** — the overrides CSS must be in a global stylesheet (not a CSS Module) because it targets the full page

---

## Design Requirements

- Smooth open/close animation: `transform + opacity`, 200ms ease
- Each feature row: icon (SVG or emoji) on the right + Hebrew label, control on the left
- Active row: blue-tinted background (`#E3F2FD`)
- Panel header: accessibility icon + title side by side
- Mobile: on screens `< 480px`, panel width = `calc(100vw - 48px)`

---

## Final Checklist

Before finishing, verify every item:

- [ ] Widget renders via `ReactDOM.createPortal` into `document.body`
- [ ] All 13 features work correctly
- [ ] Settings persist across page refreshes (localStorage)
- [ ] `resetAll()` clears everything
- [ ] Keyboard navigation: Tab, Enter, Escape, focus trap all work
- [ ] RTL layout throughout the panel
- [ ] Accessibility statement is reachable
- [ ] Widget is included globally in `_app.tsx` / `layout.tsx`
- [ ] No TypeScript errors
- [ ] No console errors