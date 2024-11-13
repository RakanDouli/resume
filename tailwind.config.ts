module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      sm: "480px",
      md: "768px",
      lg: "976px",
      xl: "1441px",
    },
    colors: {
      primary: "var(--primary)",
      secondary: "var(--secondary)",
      third: "var(--third)",
      dark: "var(--dark)",
      light: "var(--light)",
      lightgray: "var(--light-gray)",
      transparent: "var(--transparent)",
      modalBg: "var(--modal-bg)",
      successBg: "var(--success-bg)",
      successText: "var(--success-text)",
      errorBg: "var( --error-bg)",
      errorText: "var( --error-text)",
      bodyBg: "var( --body-bg)",
    },
    fontFamily: {
      sans: ["Graphik", "sans-serif"],
      serif: ["Merriweather", "serif"],
    },
    extend: {
      spacing: {
        xs: "var(--spacing-xs)",
        sm: "var(--spacing-sm)",
        md: "var(--spacing-md)",
        lg: "var(--spacing-lg)",
        xl: "var(--spacing-xl)",
        "2xl": "var(--spacing-2xl)",
        "nav-height": "var(--nav-height)",
      },
      maxWidth: {
        "90vw": "90vw",
      },
      fontSize: {
        // Updated font sizes in tailwind.config.js or similar configuration
        fontSize: {
          "clamp-xs": ["clamp(12px, 1.8vw, 14px)", "14px"], // Small/error messages
          "clamp-sm": ["clamp(14px, 2vw, 16px)", "16px"], // Standard body text
          "clamp-md": ["clamp(16px, 2.5vw, 20px)", "20px"], // Subheadings/secondary text
          "clamp-lg": ["clamp(20px, 3vw, 32px)", "32px"], // Main headers, larger text
          "clamp-xl": ["clamp(28px, 4vw, 48px)", "48px"], // Hero text, page titles
          "clamp-2xl": ["clamp(36px, 5vw, 64px)", "64px"], // Large headers, hero sections
        },
      },
      animation: {
        pulse: "pulse 1.5s ease-in-out infinite",
      },
      keyframes: {
        pulse: {
          "0%": { backgroundColor: "#e0e0e0" },
          "50%": { backgroundColor: "#f5f5f5" },
          "100%": { backgroundColor: "#e0e0e0" },
        },
      },
    },
  },
  plugins: [],
};
