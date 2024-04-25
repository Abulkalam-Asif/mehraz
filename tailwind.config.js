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
      sm: { max: "576px" },
      xs: { max: "360px" },
    },
    extend: {
      fontFamily: {
        "proxima-nova": ["Proxima Nova", "sans-serif"],
      },
      colors: {
        "accent-1-extra-light": "#eeeeee",
        "accent-1-base": "#D9D9D9",
        "accent-1-dark": "#666666",
        "accent-1-extra-dark": "#444444",
        "accent-2-base": "#323232",
      },
      boxShadow: {
        dropdown: "0px 1px 8px 2px rgba(0, 0, 0, 0.3)",
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
      height: {
        // 100vh - 6rem (admin header + 1rem spacing from bottom) - 6rem (page header)
        "page-container-admin": "calc(100vh - 6rem - 6rem)",
        // 100vh - 6rem (admin header + 3rem spacing from bottom) - 5rem (page header)
        "page-container-admin-xl": "calc(100vh - 6rem - 5rem)",
        // 100vh - 6rem (admin header + 1rem spacing from bottom) - 6rem (page header) - 2rem
        "page-container-admin-inner": "calc(100vh - 6rem - 6rem - 2rem)",
      },
      minHeight: {
        "page-container-admin-inner": "600px",
      },
      maxHeight: {
        "page-container-admin-inner": "800px",
        "2/3": "66%",
        "1/3": "33%",
        "1/2": "50%",
        "1/4": "25%",
      },
      animation: {
        alert: "alert-keyframes 5s linear",
      },
      keyframes: {
        "alert-keyframes": {
          from: {
            transform: "translateX(-100%)",
          },
          to: {
            tranform: "translateX(0%)",
          },
        },
      },
    },
  },
  plugins: [],
};
