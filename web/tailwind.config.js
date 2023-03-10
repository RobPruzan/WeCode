/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'neon-blue': '#43bbff',
        'custom-gray': '#2D2D2F',
        'custom-dark-gray': '#141414',
      },
    },
  },
  plugins: [],
};
