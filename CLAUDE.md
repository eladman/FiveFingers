# Five Fingers (חמש אצבעות) — Website Project

## Brand Identity

**Organization:** Five Fingers Movement (תנועת חמש אצבעות)
**Founders:** Amir Menachem & Yoram Menachem
**Founded:** 2014
**Scale:** ~3,000 participants across Israel

### Brand Colors
| Role | Hex |
|---|---|
| Theme (primary) | `#ff8714` (orange) |
| Secondary (optional) | `#000032` (deep navy) |
| Background / Text | `#ffffff` (white) |

### Logo
- File: `אתר חמש/Five-Finger-LOGO.png`
- Orange stylized hand with five vertical pillars/fingers — clean, modern

---

## What is Five Fingers?

An **Israeli educational-social movement** that develops youth (ages 12–21+) through value-based education and challenging experiences. The mission: enable every young person in Israel to realize their potential and become **"the person in the arena"** — someone who acts proactively to improve reality based on **ethical excellence (מצוינות ערכית)**.

**Vision:** A society built on trust, led by a generation educated in ethical excellence.

---

## The Five Core Values (DNA)

1. **Professional Excellence** — systematic, detail-oriented, always improving (Be Better)
2. **Adaptability** — mental resilience, comfort with difficulty (Comfortably Hard)
3. **Grit** — hunger, passion, persistence through challenges (Grit)
4. **Proactive Responsibility** — initiative over reaction, personal agency (Proactive)
5. **Belonging & Meaning** — trust, loyalty, collective power (Together)

---

## Educational Methodology

Three interlocking pillars:
- **Experience (חוויה)** — demanding, transformative challenges
- **Group (קבוצה)** — cohesive community with shared goals
- **Mentor/Coach (מאמן)** — a values-embodying role model

Three growth cycles: **Competence → Belonging → Impact**

---

## Programs (the "Fleet")

| Program | Ages | Description |
|---|---|---|
| **Liabah (הליבה)** | 12–18 | Core non-formal educational framework; ~8 sessions/month |
| **Academy (אקדמיה)** | 18–20 | Year-long pre-military leadership & physical/mental development |
| **Alumni / Yoav (בוגרים)** | 21+ | Post-military leadership development; placing graduates in key societal roles |
| **Collaborations** | All ages | Civil society engagement and community impact |

---

## Website Purpose

The website serves as:
1. **Brand & identity showcase** — communicate the movement's philosophy and values
2. **Program information hub** — explain each program for prospective participants & parents
3. **Recruitment platform** — attract young Israelis and guide them to the right program
4. **Thought leadership** — position Five Fingers as an innovator in Israeli youth education

---

## Development Notes

- **Language:** Hebrew (RTL layout), potentially bilingual Hebrew/English
- **Audience:** Israeli youth (12–21), parents, donors, civil society
- **Tone:** Inspiring, bold, values-driven — not corporate or generic
- **Source documents:** Full organizational/cultural documentation is in `אתר חמש/`
- **Legal agreements:** `אתר חמש/חמש אצבעות הסכם חדש (1).pdf` + `אתר חמש/המשך הסכם .pdf`

---

## Hebrew Language — Gender-Neutral Policy

All Hebrew copy must address **both male and female** participants equally. The movement serves young people of all genders, so the language must reflect that.

### Rules

| Pattern | Avoid | Use instead |
|---|---|---|
| Imperatives | `הצטרף`, `בוא` (m. singular) | `הצטרפו`, `בואו` (plural, inclusive) |
| 2nd-person pronoun | `אתה` (you-m) | `אתם/ן` (plural) or `את/ה` (m/f slash) |
| 3rd-person pronoun | `הוא משתייך` | `הוא/היא משתייך/ת` or restructure with plural |
| Readiness/state | `מוכן` (m.) | `מוכנים` (plural) |
| Membership copy | `צעיר שרוצה` | `צעירים/ות שרוצים/ות` (plural slash form) |

### Approach by context

- **CTAs & headings** → prefer **plural** forms (`בואו`, `הצטרפו`, `מוכנים`) — clean, natural, inclusive
- **Descriptive body copy** → use **slash form** (`הוא/היא`, `את/ה`, `צעיר/ה`) when singular must be preserved
- **Do not** use masculine singular as a generic default

---

## Tech Stack & Local Development

**Stack:** React 19 + Vite 6 + Tailwind CSS 3.4 + GSAP 3.12 (animation) + Lenis (smooth scroll) + lucide-react (icons).

```bash
npm install        # first time / after dependency changes
npm run dev        # local dev server → http://localhost:5173
npm run build      # production build → dist/
npm run preview    # preview the production build locally
```

- Fonts: RagMarom (local `@font-face`), Heebo / Inter / Frank Ruhl Libre / JetBrains Mono (Google Fonts, loaded in `index.html`).
- HTML root is `<html lang="he" dir="rtl">` — the entire site is RTL Hebrew.

---

## Project Structure

```
src/
  main.jsx          # entry — hash-based view switch (see Standalone Page Workflow)
  App.jsx           # homepage composition + #liabah route + global UI (Navbar, ContactModal, WhatsApp, Accessibility)
  index.css         # global CSS: fonts, shadow vars, keyframes, reduced-motion
  components/        # site sections (Hero, WhoWeAre, ManInArena, Programs, FiveContent, Footer…)
    ui/Button.jsx    # shared Button component (see DESIGN.MD)
    liabah/          # Liabah page sections
    showcase/        # standalone hero/design showcases
    Accessibility/   # accessibility widget + statement
  pages/LiabahPage.jsx
  hooks/             # useReveal, useCountUp, useAccessibility, usePrefersReducedMotion
  data/              # contact, liabahData, israelOutline
  variants/          # design-exploration variants
```

---

## Standalone Page Workflow

New sections/pages are built **standalone first, then connected** — so the live homepage never breaks while iterating.

- Routing is **hash-based** in `src/main.jsx` and `src/App.jsx`:
  - `#showcase` → `HeroShowcase`, `#variants` → `DesignShowcase` (standalone)
  - `#liabah` → Liabah page · default → homepage (`App`)
- **Build standalone:** create your component, then preview it alone by adding a temporary hash branch in `main.jsx` (mirror the `#showcase` pattern), e.g. `http://localhost:5173/#mysection`.
- **Connect:** once it works, import it into `App.jsx` and place it in the `<main>` flow between `<SoftDivider>`s (homepage), or give it its own hash route like `#liabah`.
- Always follow `DESIGN.MD` for tokens, typography, motion, and RTL rules.

---

## Git & GitHub Workflow

Full step-by-step version (Hebrew): see **`instructions.md`**. Summary:

- **Branches:** `main` (production → Vercel; never push directly) · `RAN` (personal working branch).
- **Start of session:** `git checkout RAN` → `git pull origin main` (sync latest into your branch).
- **Save:** `git add .` → `git commit -m "..."` (small, frequent commits).
- **Push:** `git push origin RAN`.
- **Publish:** open a Pull Request `base: main ← compare: RAN`; senior reviews & merges; Vercel auto-deploys on merge.
- On a merge conflict: stop, don't force (`--force`), ask the senior.

---

## Project Documents

| File | Purpose |
|---|---|
| `CLAUDE.md` | This file — project context, brand, conventions, workflow |
| `DESIGN.MD` | Design system — tokens, typography, components, motion, RTL (source of truth for all UI) |
| `PRODUCT.md` | Product brief — users, purpose, brand personality, design principles |
| `Accessibility.MD` | Accessibility guidelines & statement |
| `instructions.md` | Git & GitHub workflow (Hebrew, step-by-step) |
| `ליבה.md` | Liabah program content (Hebrew) |
| `אתר חמש/` | Source organizational & cultural documents, logo, legal agreements |
