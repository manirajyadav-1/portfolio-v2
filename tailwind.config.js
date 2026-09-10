module.exports = {
  content: [
    "./pages/**/*.{html,js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // surfaces: near-black base, layered upward
        "dark": {
          100: "#131519",  // raised surface (cards)
          200: "#181b20",  // surface
          300: "#101215",  // section band
          400: "#0b0c0e",  // page base
          500: "#0008",    // overlay scrim
        },
        // one accent, used with discipline
        "green": {
          100: "#8dffc6",  // hover / bright text
          200: "#64f4ac",  // THE accent
          300: "#3dd98d",  // pressed / deeper
          400: "rgba(100,244,172,.14)", // tinted fill
          500: "rgba(100,244,172,.30)", // tinted border
          600: "rgba(100,244,172,.06)", // faintest wash
        },
        "line": {
          100: "#23272e",  // default border
          200: "#2e343d",  // hover border
        },
        "white": {
          100: "#e9ecf1",  // primary text
          200: "#98a1ae",  // secondary text
          300: "#646d7a",  // muted / meta
        },
        "red": { 200: "#ff5c5c" },
        "blue": { 200: "#4898f0", 400: "#503cef", 600: "#513cef", 800: "#140e32" },
      },
      fontFamily: {
        sans: ["Poppin", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["FiraCode", "ui-monospace", "SFMono-Regular", "Menlo", "monospace"],
      },
      maxWidth: { content: "1400px" },
    },
  },
  plugins: [],
}
