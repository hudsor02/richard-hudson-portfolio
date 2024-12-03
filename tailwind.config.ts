import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        amber: {
          500: '#f59e0b',
        },
        blue: {
          500: '#3b82f6',
          600: '#2563eb',
        },
        gray: {
          500: '#6b7280',
          600: '#4b5563',
        },
      },
    },
  },
  plugins: [],
};

export default config;
