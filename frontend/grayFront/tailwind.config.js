/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js, ts}"],
  theme: {
    extend: {
      colors: {
        blue: "#98bfe0",
        rllyWhite: "#fafafa",
        white: "#f4f4f5",
        ligthGrey: "#e4e4e7",
        midGrey: "#d4d4d8",
        darkGrey: "#a1a1aa",
        ligthBlack: "#27272a",
        black: "#09090b",
      },
    },
  },
  plugins: [],
};
