/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        body: ['"ubuntu"', '"serif"']
      },
      fontSize: {
        base: '1rem',
        heading: '3rem',
        'sub-heading': '2rem'
      },
      colors: {
        'task-llama-white': '#EEEEEE',
        'task-llama-teal': '#00ADB5',
        'task-llama-gray-dark': '#222831',
        'task-llama-light-gray': '#F5F5F5',
        'task-llama-gray': '#393E46'
      }
    }
  },
  plugins: [],
  important: true
};
