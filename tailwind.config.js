/** @type {import('tailwindcss').Config} */
const config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        'blue-primary': 'hsl(226, 100%, 50%)',
        amber: {
          500: '#f59e0b',
        },
        red: {
          500: '#ef4444',
        },
        green: {
          500: '#22c55e',
        },
        blue: {
          50: '#eff6ff',
          100: '#dbeafe',
          500: '#3b82f6',
          600: '#2563eb',
        },
        gray: {
          50: '#f9fafb',
          100: '#f3f4f6',
          500: '#6b7280',
          600: '#4b5563',
          900: '#111827',
        },
        neutral: {
          200: '#e5e5e5',
        },
        zinc: {
          800: '#27272a',
        },
      },
    },
  },
  plugins: [],
};

export default config;
