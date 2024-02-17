/** @type {import('tailwindcss').Config} */
import colors from 'tailwindcss/colors';

export default {
  content: [
    "./src/**/*.{html,js,ts}",
    "./src/**/*.{jsx, tsx}",
  ],
  theme: {
    extend: {},
    colors: {
      'verde-100': '#c3ca92',
      'verde-200': '#a4b17b',
      'verde-300': '#859864',
      'verde-400': '#697e50',
      'verde-500': '#4e6530',
      'verde-600': '#354c2b',
      'verde-700': '#20331b',
      transparent: 'transparent',
      black: colors.black,
      white: colors.white,
      gray: colors.gray,
      emerald: colors.emerald,
      indigo: colors.indigo,
      yellow: colors.yellow,
      red: colors.red,
    },
    fontFamily: {
      'Poppins': ['Poppins', 'sans-serif']
    }
  },
  plugins: [],
}

