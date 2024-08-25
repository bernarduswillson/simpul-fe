import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/api/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}", 
    "./src/sections/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/interface/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/redux/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#333333',
        white: '#F2F2F2',
        primary: {
          blue: "#2F80ED",
          black: "#4F4F4F",
          gray: '#828282',
          white: '#E0E0E0'
        },
        indicator: {
          orange: '#F8B76B',
          purple: '#8785FF',
          red: '#EB5757',
          yellow: '#F2C94C',
        },
        chats: {
          orange: '#E5A443',
          'orange-pastel': '#FCEED3',
          purple: '#9B51E0',
          'purple-pastel': '#EEDCFF',
          green: '#43B78D',
          'green-pastel': '#D2F2EA'
        },
        stickers: {
          100: '#E9F3FF',
          200: '#FDCFA4',
          300: '#F9E9C3',
          400: '#AFEBDB',
          500: '#CBF1C2',
          600: '#CFCEF9',
          700: '#F9E0FD',
        }
      },
    },
    fontSize: {
      sm: '0.8rem',
      md: '0.9rem',
      lg: '1rem',
      xl: '1.25rem',
      '2xl': '1.563rem',
      '2.5xl': '1.653rem',
      '3xl': '1.953rem',
      '4xl': '2.441rem',
      '5xl': '3.052rem'
    },
    display: ["group-hover"],
  },
  plugins: [
    require('tailwind-scrollbar'),
  ],
};
export default config;
