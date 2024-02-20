/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bgBackground: "#353e6c",
        bgPrimary: "#119DA9",
        bgSoft: "#2ABB93",
        bgYellow: '#E5D351',
        bgRed: '#BA2D40',
        bgLavender: '#E6E6FA',
        bgCoral: '#FF7F50',
        bgGold: '#FFD700',
        bgWhiteSoft: '#F3F8FF',
        bgDark: '#030637',
        bgSky: '#836FFF',
        bgSkyLite: '#98E4FF',
        bgDarkNeon: '#071952'
      },
      fontFamily: {
        "poppins": ["Poppins", "sans-serif"],
        "robotos": ["Roboto Condensed", "sans-serif"],
      },
      
    },
    // screens: {
    //   'xs': {'max': '450px'},
    //   'xs-min': {'min': '450px'}, // You can adjust the value as needed
    // }
  },
  plugins: [],
}