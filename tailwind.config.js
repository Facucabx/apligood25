/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: "#3B82F6",
        danger: "#F43F5E",
        backgroundLight: "#F9FAFB",
        backgroundDark: "#111827",
      },
    },
  },
  plugins: [],
};
