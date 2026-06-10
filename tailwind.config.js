/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./resources/**/*.blade.php",
    "./resources/**/*.js",
    "./resources/**/*.vue",
  ],
  theme: {
    extend: {
      colors: {
        'hotel': {
          50: '#fdf8f2',
          100: '#f9ece0',
          200: '#f2d8c1',
          300: '#e8be9a',
          400: '#dd9f6e',
          500: '#c97e4a',
          600: '#b5633a',
          700: '#974a2e',
          800: '#7a3b26',
          900: '#623122',
        }
      },
      fontFamily: {
        'playfair': ['Playfair Display', 'serif'],
        'inter': ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}