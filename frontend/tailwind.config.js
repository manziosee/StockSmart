/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eef5ff',
          100: '#d9e7ff',
          200: '#bbd4ff',
          300: '#8eb8ff',
          400: '#5e93fc',
          500: '#3b72f9',
          600: '#0F52BA', // Primary color
          700: '#0A3880', // Darker shade
          800: '#072a64',
          900: '#051c47',
        },
        accent: {
          50: '#f1ffe6',
          100: '#dfffcc',
          200: '#beff99',
          300: '#92ff5c',
          400: '#64f029',
          500: '#38B000', // Accent color
          600: '#2a8000', // Darker shade
          700: '#1f6500',
          800: '#184d00',
          900: '#0f3900',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        heading: ['Poppins', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 1px 2px 0 rgba(0, 0, 0, 0.05), 0 1px 3px 0 rgba(0, 0, 0, 0.1)',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
    },
  },
  plugins: [],
}