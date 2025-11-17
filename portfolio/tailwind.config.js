/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      animation: {
        'float': 'float linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { 
            transform: 'translateY(0px) rotate(0deg)',
            opacity: '0.7'
          },
          '33%': { 
            transform: 'translateY(-20px) rotate(120deg)',
            opacity: '1'
          },
          '66%': { 
            transform: 'translateY(10px) rotate(240deg)',
            opacity: '0.8'
          },
        }
      }
    },
  },
  plugins: [],
};