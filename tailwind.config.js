/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontSize: {
        base: '1rem',
        heading: '2rem'
      },
      colors: {
        'task-llama-white': '#EEEEEE',
        'task-llama-teal': '#00ADB5'
      }
    }
  },
  plugins: []
};
