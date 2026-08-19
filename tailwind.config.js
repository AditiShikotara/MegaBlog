/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        paper: "#F6F2E7",
        "paper-dark": "#ECE3CC",
        ink: "#1E1B16",
        "ink-soft": "#6B6155",
        forest: "#1F5C46",
        "forest-dark": "#163F30",
        amber: "#D98E29",
        "amber-soft": "#F3DDA9",
        brick: "#A6402C",
        line: "#E1D6B8",
      },
      fontFamily: {
        display: ["'Fraunces'", "serif"],
        sans: ["'Inter'", "system-ui", "sans-serif"],
        mono: ["'IBM Plex Mono'", "monospace"],
      },
      boxShadow: {
        card: "0 1px 2px rgba(30, 27, 22, 0.06), 0 8px 24px -12px rgba(30, 27, 22, 0.18)",
      },
    },
  },
  plugins: [],
}
