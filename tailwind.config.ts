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
          50: '#f0f5ed',
          100: '#dce8d4',
          200: '#b9d1a9',
          300: '#8fb87a',
          400: '#6a9e52',
          500: '#4d7a38',
          600: '#3d6230',
          700: '#2d5016',
          800: '#1f3a0f',
          900: '#142609',
        },
        gold: {
          50: '#fdf8ef',
          100: '#fbefd6',
          200: '#f6dcab',
          300: '#f0c476',
          400: '#e9a83e',
          500: '#e39220',
          600: '#c67818',
          700: '#a55c16',
          800: '#874a19',
          900: '#6f3d18',
        },
        ivory: {
          50: '#fefdfb',
          100: '#fdf9f3',
          200: '#faf3e7',
          300: '#f5ead6',
          400: '#eddcc0',
          500: '#e2ccab',
        },
        stone: {
          50: '#fafaf9',
          100: '#f5f5f4',
          200: '#e7e5e4',
          300: '#d6d3d1',
          400: '#a8a29e',
          500: '#78716c',
          600: '#57534e',
          700: '#44403c',
          800: '#292524',
          900: '#1c1917',
        },
      },
      fontFamily: {
        serif: ['var(--font-playfair)', 'Georgia', 'serif'],
        sans: ['var(--font-dm-sans)', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

export default config;
