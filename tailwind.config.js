/** @type {import('tailwindcss').Config} */

export default {
  content: [
    './src/**/*.{ts,tsx,html,js,jsx}',
    './node_modules/tw-elements-react/dist/js/**/*.js',
    '/node_modules/@material-tailwind/react/components/**/*.{js,ts,jsx,tsx}',
    '/node_modules/@material-tailwind/react/theme/components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        darkblue: {
          DEFAULT: '#0E2A56',
          hover: '#133873',
        },
        goldenyellow: {
          DEFAULT: '#E7C213',
          hover: '#EECC2E',
        },
      },
    },
  },
  darkMode: 'class',
  plugins: [require('tw-elements-react/dist/plugin.cjs')],
}
