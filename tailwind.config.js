/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      backgroundImage: {
        "hero-image": "url('/src/assets/images/heroBg.jpg')",
      },
      colors: {
        accentColor: "#F84D4D"
      },
    },
    screens: {
      md: "768px",
    }
  },
  plugins: [],
}

