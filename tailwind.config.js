/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './dashboard.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        orange: '#ff8714',
        'orange-ink': '#ff8714', // brand orange for accent text
        navy: '#0d1b4b',         // brand dark — text on light + primary dark surfaces
        'navy-deep': '#081028',  // deepest — gradient anchors, vignettes, footer
        'navy-light': '#1e3578', // lifted — gradient tops, elevated dark panels
        surface: '#fafaf8',      // warm off-white section background
        'surface-2': '#f7f5f2',
        line: 'rgba(13,27,75,0.08)', // standard hairline / border
      },
      fontFamily: {
        sans: ['Heebo', 'Inter', 'sans-serif'],
        serif: ['"Frank Ruhl Libre"', 'serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
        inter: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        focus: '0 0 0 3px rgba(255,135,20,0.35)',
      },
      transitionTimingFunction: {
        brand: 'cubic-bezier(0.25,0.46,0.45,0.94)',
      },
    },
  },
  plugins: [],
}
