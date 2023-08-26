/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',

    // Or if using `src` directory:
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'neutral-white': '#fcfcfc',
        'neutral-grey': '#efefef',
        'primary-1': '#2a85ff',
        'primary-2': '735ffa',
        'secondary-1': '#ff6c3e',
        'secondary-2': '#99cc66',
        'accent-1': '#ff88aa',
        'accent-2': '#be87ff',
      },
    },
  },
  plugins: [],
};
