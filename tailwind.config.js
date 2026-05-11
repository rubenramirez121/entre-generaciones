/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          orange:      '#E87545',
          orangeLight: '#F4A07A',
          orangePale:  '#FEF1E8',
          cream:       '#FAF7F2',
          dark:        '#1C1712',
          muted:       '#6B5C4E',
          border:      '#E8DDD4',
        },
      },
      fontFamily: {
        sans: ['Nunito', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
    },
  },
  plugins: [],
}
