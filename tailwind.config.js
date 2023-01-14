/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#56CC6A",
        secondary: "#A5A5A5",
        white: "#FFFFFF",
        "dark-grey": "#272727",
        "secondary-text": "#A5A5A5",
      },
      backgroundImage: {},
      fontFamily: {
        "Serif-Display": "'DMSerifDisplay', serif",
        Lexand: "'LexendDeca', sans-serif",
      },
      screens: {
        sm: { max: "500px" },
        md: { max: "1024px" },
        navMobile: { raw: "(max-width : 500px)" },
      },
      animation: {
        bounce200: "bounce 1s infinite 200ms",
        bounce400: "bounce 1s infinite 400ms",
      },
    },
  },
  plugins: [],
};
