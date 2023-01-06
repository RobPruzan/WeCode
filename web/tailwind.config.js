/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    screens: {
      md: '850px',
      ...defaultTheme.screens,
    },
    extend: {},
  },
  plugins: [],
};
