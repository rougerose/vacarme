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
    screens: {
      "sm": "636px",
      "md": "768px",
      "lg": "1020px",
      "xl": "1272px",
      "2xl": "1344px",
    },
    container: {
      center: true,
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
