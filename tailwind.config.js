/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        darkmode: {
            600: '#232d45',
            700: '#1b253b',
            800: '#1b253b',
            500: '#28334e',
            400: '#94a3b8',
            300: '#cbd5e1',
            444: '#e0e0e0',
            555: '#00b7ff',
            111: '#3b311b',
        },
        'success': '#0FA958',
        'danger': '#AF1E1E',
        'darkgray': '#808080',
        'emsGray': '#C4C4C4',
        'emsBlue': '#2465C7',
        'skyblue': '#5989D3',
        'lightgray': '#EFEFEF',
    },
    },
  },
  plugins: [],
};
