/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#6366f1",
        primaryActive: "#a5b4fc",
        success: "#22c55e",
        warning: "#f59e0b",
        fail: "#ef4444",
      }
    },
  },
  plugins: [],
}

