/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
    theme: {
    extend: {
      fontFamily: {
        mastery: ['"AffiliateMastery"', "serif"],
        varela: ['"VarelaRound"', "sans-serif"],
      },
      scale: {
        '90': '0.9',
        '130': '1.3',
      },
      colors: {
        'fuchsia-975': '#09000d',
        'glass-950': '#040D12',
        'glass-900': '#183D3D',
        'glass-800': '#5C8374',
        'glass-700': '#93B1A6',
      },
    },
  },
  plugins: [],
}

