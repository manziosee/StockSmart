/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eef5ff',
          100: '#d9e7ff',
          200: '#bcd4ff',
          300: '#8eb8ff',
          400: '#5890ff',
          500: '#3366ff',
          600: '#0F52BA', // Primary color
          700: '#0A3880', // Primary dark
          800: '#0c2d6b',
          900: '#0c2656',
          950: '#081631',
        },
        accent: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#38B000', // Accent color
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#14532d',
          950: '#052e16',
        },
      },
    },
  },
  plugins: [],
};