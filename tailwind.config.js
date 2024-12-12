/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
      "./src/**/*.{js,jsx,ts,tsx}", // Ensure Tailwind scans your src folder
    "./public/index.html", 
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

