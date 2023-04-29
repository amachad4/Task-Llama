/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontSize: {
        base: '1rem',
        heading: '2rem'
      }
    }
  },
  plugins: []
};
