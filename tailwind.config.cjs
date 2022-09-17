/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "split-white-black":
          "linear-gradient(to bottom, #2A2D3C 300px , white 0%);",
        "split-white-black-small":
          "linear-gradient(to bottom, #2A2D3C 200px , white 0%);",
      },
    },
  },
  plugins: [],
  safelist: [{ pattern: /bg-.+-(100|400)/ }, { pattern: /text-.+-(100|400)/ }],
};
