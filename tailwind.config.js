const defaultTheme = require("tailwindcss/defaultTheme");
module.exports = {
  corePlugins: {
    fontSmoothing: false,
  },
  purge: [
    "./body.html",
    "./content/*.html",
    "./header/*.html",
    "./inclure/**/*.html",
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    container: {
      center: true,
      screens: {
        xl: "1344px", // 1312px + (16px*2)
      },
    },
    extend: {
      fontFamily: {
        serif: ['"newsreader"', ...defaultTheme.fontFamily.serif],
        sans: ['"HNC"', ...defaultTheme.fontFamily.sans],
        display: ['"newsreader-display"', ...defaultTheme.fontFamily.serif],
      },
      fontSize: {
        "2xs": ".625rem",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
