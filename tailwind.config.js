/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        orange: '#ff8714',
        'orange-ink': '#b35600', // contrast-safe orange for text on light backgrounds (AA)
        navy: '#000032',
      },
      fontFamily: {
        sans: ['Heebo', 'Inter', 'sans-serif'],
        serif: ['"Frank Ruhl Libre"', 'serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
        inter: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
