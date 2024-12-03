import { Config } from 'tailwindcss/types/config';
import { plusJakartaSans } from './shared/fonts';
import typography from '@tailwindcss/typography';
import animate from 'tailwindcss-animate';
import aspectRatio from '@tailwindcss/aspect-ratio';
import forms from '@tailwindcss/forms';

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        neutral: {
          50: '#fafafa',
          100: '#f5f5f5',
          200: '#e5e5e5',
          300: '#d4d4d4',
          400: '#a3a3a3',
          500: '#737373',
          600: '#525252',
          700: '#404040',
          800: '#262626',
          900: '#171717',
        },
        blue: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          primary: 'hsl(226, 100%, 50%)',
          hover: 'hsl(226, 100%, 45%)',
        },
      },
      fontFamily: {
        sans: plusJakartaSans,
        outfit: ['Outfit', 'system-ui', 'sans-serif'],
        jakarta: plusJakartaSans,
      },
      container: {
        center: true,
        padding: {
          DEFAULT: '1rem',
          sm: '2rem',
          lg: '4rem',
          xl: '5rem',
          '2xl': '6rem',
        },
      },
    },
  },
  plugins: [typography, animate, aspectRatio, forms],
};

export default config;
