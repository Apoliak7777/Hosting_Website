/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: '#07080a',
        lightDark: '#12131a',
        semiDark: '#1b1d28',
        accentBlue: '#00e5ff',
        accentPurple: '#b100ff',
        accentYellow: '#fce823',
        accentRed: '#ff3366',
        grayText: '#8b92a5',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Outfit', 'sans-serif'],
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin-slow': 'spin 8s linear infinite',
      }
    },
  },
  plugins: [],
}
