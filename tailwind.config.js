/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./*.html",
    "./js/**/*.js",
    "./src/**/*.{html,js,css}"
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'agency-black-1': '#1f1e1d',
        'agency-black-2': '#111111',
        'agency-black-3': '#171615',
        'agency-red': '#f84525',
        'agency-gray': '#f9f9f9',
        'sub-black-1': '#1d1c1b',
        'sub-black-2': '#2b2a2c',
        'sub-black-3': '#2f2e2d',
        'sub-black-4': '#252426',
        'sub-black-5': '#393837',
        'sub-gray-1': '#464646',
        'sub-gray-2': '#5b5b5a',
        'sub-gray-3': '#9c9c9c',
        'sub-gray-4': '#bbbbbb',
        'sub-white-1': '#f2f2f2',
        'sub-white-2': '#f6f6f6',
      },
      fontFamily: {
        montserrat: ['Montserrat', 'sans-serif'],
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      transitionTimingFunction: {
        'primary-ease': 'cubic-bezier(0.475, 0.425, 0, 0.995)',
        'custom-ease-2': 'cubic-bezier(0.835, -0.005, 0.06, 1)',
        'custom-ease-3': 'cubic-bezier(0.19, 1, 0.22, 1)',
        'custom-ease-4': 'cubic-bezier(0.63, 0.03, 0.21, 1)',
      },
      maxWidth: {
        'desktop': '1240px',
        'laptop': '1080px',
        'small-laptop': '960px',
      },
      letterSpacing: {
        'ultra-wide': '0.25em',
        'mega-wide': '0.6em',
      }
    },
  },
  plugins: [],
}
