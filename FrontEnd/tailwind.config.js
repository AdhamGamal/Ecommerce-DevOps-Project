/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    screens: {
      xs: "475px",
      ...defaultTheme.screens,
    },
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        sm: "2rem",
        lg: "4rem",
        xl: "5rem",
        "2xl": "6rem",
      },
    },
    extend: {
      colors: {
        "primary-color": "#1E1F22", // Dark gray for headers
        "secondary-color": "#D4AF37", // Gold for accents
        "dark-secondary-color": "#ba9a31", // Gold for accents
        "back-color": "#1a1a1a", // Light gray for backgrounds
        "text-color": "#FFFFFF", // White for text and highlights
        "light-color": "#343434",
        "btn-primary": "#", // Red for buttons
        "btn-Secondary": "#", // Bright red for secondary buttons
        "line-primary": "#", // Dark red for borders
      },

      // fontFamily: {
      //   sans: ["Cairo", "sans-serif"], // Set Cairo as the default sans-serif font
      // },
      fontFamily: {
        gloria: ['"Gloria Hallelujah"', "cursive"],
        merienda: ['"Merienda"', "cursive", "Cairo"],
        playwrite: ['"Playwrite IT Moderna"', "sans-serif"],
        roboto: ['"Roboto"', "Cairo"],
        special: ['"Special Elite"', "cursive"],
        gabriela: ["Gabriela", "Cairo"],
      },
    },
  },
  plugins: [require("flowbite/plugin")],
};
