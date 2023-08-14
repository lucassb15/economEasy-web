/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{ts,tsx,html,js,jsx}'],
  theme: {
    extend: {
      colors: {
        neongreen: {
          DEFAULT: '#DDFF21',
          hover: '#CCEE1A'
        },
      },
    },
  },
  plugins: [],
}

