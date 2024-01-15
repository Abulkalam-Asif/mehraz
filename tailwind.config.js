/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/containers/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      xl: { max: "1280px" },
      lg: { max: "1024px" },
      md: { max: "768px" },
      sm: { max: "640px" },
      xs: { max: "360px" },
    },
    extend: {
      colors: {
        "accent-1-base": "#D9D9D9",
        "accent-1-dark": "#666666",
      },
      maxWidth: {
        "8xl": "90rem",
        "6.5xl": "75rem",
      },
      fontSize: {
        "1.5xl": "1.375rem",
        "3.5xl": "2rem",
        "4.5xl": "2.5rem",
      },
      transitionProperty: {
        "grid-rows": "grid-template-rows",
        padding: "padding",
      },
    },
  },
  plugins: [],
};
