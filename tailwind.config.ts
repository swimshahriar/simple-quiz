import type { Config } from 'tailwindcss';
import daisyUI from 'daisyui';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      container: {
        center: true,
      },
    },
  },
  plugins: [daisyUI],
  daisyui: {
    themes: 'dark',
  },
};
export default config;
