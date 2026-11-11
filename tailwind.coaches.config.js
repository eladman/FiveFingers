/**
 * Tailwind config for the standalone coaches-course page (/coaches-course).
 *
 * The page was built on Tailwind v4 with its own palette (5coach-course.com),
 * so it can't share the site config — `orange`/`navy` mean different colors
 * there. src/coaches/coaches.css loads this via `@config`. Values below pin
 * the v4 defaults the page relies on wherever v3 differs, so it renders the
 * same as the original.
 */
import defaultTheme from 'tailwindcss/defaultTheme'

// v4 semantics for line-height: an explicit `leading-*` always beats the
// line-height bundled with a font size, even a responsive `md:text-lg` that
// comes later in the stylesheet. v4 does it with a --tw-leading var (declared
// non-inheriting in coaches.css); recreate that so text sets the same.
const fontSize = Object.fromEntries(
  Object.entries(defaultTheme.fontSize).map(([key, [size, { lineHeight }]]) => [
    key,
    [size, { lineHeight: `var(--tw-leading, ${lineHeight})` }],
  ]),
)

function leadingPlugin({ matchUtilities, theme }) {
  matchUtilities(
    { leading: (value) => ({ '--tw-leading': value, 'line-height': value }) },
    { values: theme('lineHeight') },
  )
}

// v4 semantics for space-y: margin goes *below* each child except the last,
// so a child's own `mt-*` still adds to it (v3 puts the margin on top and
// overrides the child's — the form's button lost its mt-4). One class of
// specificity: enough to beat preflight's `p { margin: 0 }`.
function spaceYPlugin({ matchUtilities, theme }) {
  matchUtilities(
    {
      'space-y': (value) => ({
        ':where(&) > :not(:last-child)': { 'margin-block-end': value },
      }),
    },
    { values: theme('space') },
  )
}

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./coaches-course.html', './src/coaches/**/*.{js,jsx}'],
  future: {
    // v4 behavior: hover styles only on devices that can hover.
    hoverOnlyWhenSupported: true,
  },
  corePlugins: { lineHeight: false, space: false },
  theme: {
    fontSize,
    extend: {
      colors: {
        navy: { DEFAULT: '#1B2541', light: '#243052', dark: '#111a30' },
        orange: { DEFAULT: '#E8862A', hover: '#d4781f', light: '#f5a84d' },
        cream: '#FDF8F3',
        sand: '#F5F0EB',
        charcoal: '#2D2D2D',
        // v4 default-palette values (sRGB fallbacks of its oklch colors)
        gray: { 100: '#f3f4f6' },
        red: { 400: '#ff6467', 500: '#fb2c36' },
        green: { 400: '#05df72', 500: '#00c758' },
      },
      fontFamily: {
        heebo: ['Heebo', 'sans-serif'],
        frank: ['Heebo', 'sans-serif'],
      },
      // v4 renamed the blur scale: its `sm` is v3's default (8px).
      backdropBlur: { sm: '8px' },
      blur: { sm: '8px' },
      // v4 accepts any number; these are the off-scale ones the page uses.
      spacing: { 18: '4.5rem' },
      zIndex: { 1: '1' },
      opacity: { 8: '0.08', 98: '0.98' },
    },
  },
  plugins: [leadingPlugin, spaceYPlugin],
}
