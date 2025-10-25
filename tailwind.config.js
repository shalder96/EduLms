import { transform } from 'framer-motion';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        groove:
          'box-shadow: rgb(204, 219, 232) 3px 3px 6px 0px inset, rgba(255, 255, 255, 0.5) -3px -3px 6px 1px inset',
      },
    },
    keyframes: {
      fadeInUp: {
        '0%': { opacity: 0, transform: 'translateY(20px)'},
        '100%': { opacity: 1, transform: 'translateY(0)'},
      },
      fadeInleft: {
        '0%': { opacity: 0, transform: 'translateX(20px)'},
        '100%': { opacity: 1, transform: 'translateX(0)'},
        
      },
      fadeInRight: {
        '0%': { opacity: 0, transform: 'translateX(20px)'},
        '100%': { opacity: 1, transform: 'translateX(0)'},
        
      },
    },
    animation: {
      fadeInUp: 'fadeInUp 0.6s ease-in-out forwards',
    },
  },
  plugins: [],
}