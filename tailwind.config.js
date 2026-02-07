/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "SFMono-Regular", "Menlo", "monospace"]
      },
      colors: {
        ink: {
          50: "#e8f6fb",
          100: "#d7eef8",
          200: "#bde8f5",
          300: "#9fd6ee",
          400: "#4988c4",
          500: "#1c4d8d",
          600: "#163c71",
          700: "#12335f",
          800: "#0f2854",
          900: "#0c2147",
          950: "#081733"
        }
      },
      boxShadow: {
        glow: "0 20px 80px -40px rgba(59, 130, 246, 0.8)",
        soft: "0 20px 60px -40px rgba(15, 23, 42, 0.7)"
      },
      backgroundImage: {
        "grid-fade": "linear-gradient(rgba(148, 163, 184, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(148, 163, 184, 0.1) 1px, transparent 1px)"
      }
    }
  },
  plugins: []
};
