/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{ts,tsx,html,js,jsx}'],
  theme: {
    extend: {
      colors: {
        darkblue: {
          DEFAULT: '#0E2A56',
          hover: '#133873'
        },
        goldenyellow: {
          DEFAULT: '#E7C213',
          hover: '#EECC2E'
        },
      },
    },
  },
  plugins: [],
}

