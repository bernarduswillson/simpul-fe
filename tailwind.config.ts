import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
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
  },
  plugins: [],
};
export default config;
