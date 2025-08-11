/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', // ডার্ক মোডের জন্য
  content: [
    './src/**/*.{js,ts,jsx,tsx,html}', // তোমার সোর্স ফাইল লোকেশন অনুযায়ী এডজাস্ট করো
  ],
  theme: {
    extend: {
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
      },
      animation: {
        marquee: 'marquee 15s linear infinite',
      },
    },
  },
  plugins: [],
};
