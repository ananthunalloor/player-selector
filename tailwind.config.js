/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontSize: {
        "20xl": "14rem",
      },
      backgroundImage: {
        "hero-pattern": "url('/src/assets/img/background.jpg')",
      },
    },
  },
  plugins: [],
};
