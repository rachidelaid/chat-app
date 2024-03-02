/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        bg: {
          DEFAULT: "#252329",
          100: "#0B090C",
          200: "#252329",
          300: "#3C393F",
        },
        text: {
          DEFAULT: "#E0E0E0",
          100: "#828282",
        },
      },
    },
  },
  plugins: [],
};
