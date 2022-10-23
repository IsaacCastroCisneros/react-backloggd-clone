/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:
      {
        secondary: '#30394c',
        focus:'#839df9',
        errorBg:'#f8d7da',
        errorText:'#721c24'
      }
    },
  },
  plugins: [],
}
