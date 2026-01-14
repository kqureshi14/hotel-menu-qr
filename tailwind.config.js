/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}"
  ],
  theme: {
    extend: {
      colors: {
        hotel: "#0f172a",   // luxury dark
        accent: "#c9a24d"   // gold accent
      }
    }
  },
  plugins: []
};
