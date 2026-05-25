import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        forest: {
          50: '#f2f5f3',
          100: '#e1e7e3',
          200: '#c3cec7',
          300: '#9eb0a4',
          400: '#779080',
          500: '#546e5d',
          600: '#3c5144',
          700: '#2b3c32',
          800: '#1c2a22',
          900: '#121c16',
        },
        gold: {
          50: '#faf7f2',
          100: '#f5ede0',
          200: '#e8d8c1',
          300: '#d6be98',
          400: '#c5a575',
          500: '#b28c56',
          600: '#977443',
          700: '#7a5b31',
          800: '#5c4422',
          900: '#463318',
        },
        ivory: {
          50: '#faf9f6',
          100: '#faf7f0',
          200: '#f5efe6',
          300: '#ebe3d5',
          400: '#dfd3c3',
          500: '#cfbca4',
        },
        stone: {
          50: '#faf9f8',
          100: '#f3f2f0',
          200: '#e5e3df',
          300: '#d2cfc9',
          400: '#9c9890',
          500: '#6e6a63',
          600: '#4d4943',
          700: '#33312c',
          800: '#22211e',
          900: '#1a1917',
        },
      },
      fontFamily: {
        serif: ['var(--font-cormorant)', 'Georgia', 'serif'],
        sans: ['var(--font-plus-jakarta)', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

export default config;
