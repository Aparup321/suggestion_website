/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#ffffff",
        slate: "#94a3b8",
        mist: "#0f172a",
        ocean: "#38bdf8",
        sand: "#1e293b",
        coral: "#f43f5e",
        lime: "#4ade80",
        plum: "#c084fc",
      },
      fontFamily: {
        display: ["'Space Grotesk'", "sans-serif"],
        body: ["'Inter'", "sans-serif"],
      },
      boxShadow: {
        glow: "0 0 20px rgba(56, 189, 248, 0.4)",
        glass: "0 8px 32px 0 rgba(0, 0, 0, 0.37)",
      },
      backgroundImage: {
        "hero-sheen": "linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0))",
        "neon-gradient": "linear-gradient(to right, #38bdf8, #c084fc)",
      },
    },
  },
  plugins: [],
}
