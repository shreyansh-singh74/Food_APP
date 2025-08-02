/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'pizza-green': '#1a4d2e',
        'pizza-orange': '#ff6b35',
        'pizza-red': '#dc2626',
        'pizza-yellow': '#fbbf24',
      },
      fontFamily: {
        'poppins': ['Poppins', 'sans-serif'],
        'lobster': ['Lobster', 'cursive'],
        'montserrat': ['Montserrat', 'sans-serif'],
      },
    },
  },
  plugins: [],
} 