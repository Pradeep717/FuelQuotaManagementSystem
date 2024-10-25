/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./App/**/*.{js,jsx,ts,tsx}', './components/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        baseColor: '#ff4b2b',
        secondColor: '#FF9001',
        primary: '#161622',
        pink: '#f687b3',
      },
    },
  },
  plugins: [],
};
