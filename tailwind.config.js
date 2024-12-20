/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        color1: "#282A36",
        color2: "#6272A4",
        color3: "#BE609A",
        color4: "#F1FA8C",
        color5: "#F8F8F2",
      },
    },
  },
  plugins: [],
};
