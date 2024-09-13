/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/react-tailwindcss-datepicker/dist/index.esm.js"
  ],
  // darkMode: ["class", '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        text_dangnhap: '#111827',
        forgot_password: '#EC103F',
        shadow_color: '#ff7979',
        border_color: '#eb4d4b'
      }
    },
  },
  plugins: [require("@tailwindcss/typography"), require("daisyui"), require('flowbite/plugin')],
  daisyui: {
    // themes: ["light", "dark",],
    themes: ["light"],
  },

}
