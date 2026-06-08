/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        orange: '#ff8714',
        'orange-ink': '#b35600', // contrast-safe orange for text on light backgrounds (AA)
        navy: '#000032',
        surface: '#fafaf8',      // warm off-white section background
        'surface-2': '#f7f5f2',
        line: 'rgba(0,0,50,0.08)', // standard hairline / border
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
