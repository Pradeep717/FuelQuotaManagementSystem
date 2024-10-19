/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./App/**/*.{js,jsx,ts,tsx}', './components/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#161622',
        pink: '#f687b3',
      },
    },
  },
  plugins: [],
};
