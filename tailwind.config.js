/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Manrope', 'system-ui', 'sans-serif'],
        serif: ['Newsreader', 'Georgia', 'serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'monospace'],
      },
      colors: {
        cardinal: {
          50:  '#fdf2f2',
          100: '#fce4e4',
          200: '#f9c7c7',
          300: '#f49797',
          400: '#ec5757',
          500: '#e03030',
          600: '#c41d1d',
          700: '#8C1515',
          800: '#761212',
          900: '#621010',
        },
      },
    },
  },
  plugins: [],
}
