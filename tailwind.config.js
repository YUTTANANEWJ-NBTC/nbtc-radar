/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        nbtc: {
          blue: '#1e3a8a',
          red: '#dc2626',
          purple: '#6d28d9',
        }
      }
    },
  },
  plugins: [],
}
