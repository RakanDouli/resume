// tailwind.config.js
module.exports = {
  darkMode: "class", // Use class strategy for dark mode
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: {
          light: "var(--background-color-light)",
          dark: "var(--background-color-dark)",
        },
        text: {
          light: "var(--text-color-light)",
          dark: "var(--text-color-dark)",
        },
      },
    },
  },
  plugins: [],
};
