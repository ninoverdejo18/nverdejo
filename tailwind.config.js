/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#060606",
        surface: "#151515",
        primaryText: "#F8F8FA",
        mutedText: "#A4A4B2",
        primaryAccent: "#8B5CF6",
        secondaryAccent: "#C084FC",
      },
    },
  },
  plugins: [],
}
