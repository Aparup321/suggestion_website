/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#10131a",
        slate: "#1a2233",
        mist: "#e9edf5",
        ocean: "#2a7cc7",
        sand: "#f5e7c8",
        coral: "#f08a5d",
        lime: "#9ad66f",
        plum: "#5c466b",
      },
      fontFamily: {
        display: ["'Bebas Neue'", "sans-serif"],
        body: ["'Space Grotesk'", "sans-serif"],
      },
      boxShadow: {
        lift: "0 12px 30px rgba(16, 19, 26, 0.12)",
      },
      backgroundImage: {
        "hero-sheen": "radial-gradient(circle at top right, rgba(240, 138, 93, 0.3), transparent 55%)",
      },
    },
  },
  plugins: [],
}
