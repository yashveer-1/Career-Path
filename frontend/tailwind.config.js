/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#17172c",
        amber: "#f4a227",
        coral: "#e8522a",
        cream: "#fdf6ec"
      },
      fontFamily: {
        sans: ["DM Sans", "sans-serif"],
        display: ["Syne", "sans-serif"]
      },
      boxShadow: {
        glow: "0 18px 60px rgba(37, 99, 235, 0.18)"
      },
      keyframes: {
        "progress-in": {
          from: { strokeDashoffset: "var(--circumference)" },
          to: { strokeDashoffset: "var(--progress-offset)" }
        },
        "fade-up": {
          from: { opacity: "0", transform: "translateY(12px)" },
          to: { opacity: "1", transform: "translateY(0)" }
        }
      },
      animation: {
        "progress-in": "progress-in 1.2s ease-out forwards",
        "fade-up": "fade-up 0.5s ease-out both"
      }
    }
  },
  plugins: []
};
