/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        heading: ["Domine", "serif"],
        body: ["Manrope", "sans-serif"],
      },
    },
  },
  plugins: [],
};
