/** @type {import('tailwindcss').Config} */
// tailwind.config.js
module.exports = {
  darkMode: 'class', // Enables class-based dark mode
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./plasmo/**/*.{js,ts,jsx,tsx}", // If you have custom folders
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
