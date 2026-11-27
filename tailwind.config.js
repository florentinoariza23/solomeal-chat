/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    typography: require('./typography'),
    extend: {
      colors: {
        gray: {
          50: '#FAF9F4',
          100: '#F2F0E7',
          200: '#E4E2D6',
          300: '#D1CFC2',
          400: '#9C9E92',
          500: '#85877D',
          700: '#4A5142',
          800: '#343B32',
          900: '#23281F',
        },
        primary: {
          25: '#F4F7F2',
          50: '#EDF2E8',
          100: '#DCE8D6',
          200: '#C2D4B8',
          300: '#A8B89A',
          400: '#7E9678',
          500: '#64805F',
          600: '#526B50',
          700: '#3E5340',
          800: '#324434',
          900: '#28372B',
        },
        cream: {
          DEFAULT: '#F8F6EF',
          2: '#F2F0E7',
        },
        sage: '#A8B89A',
        forest: '#526B50',
        'forest-deep': '#3E5340',
        mint: '#DCE8D6',
        'mint-soft': '#EDF2E8',
        oat: '#E9B98B',
        'oat-soft': '#F7E8D7',
        tomato: '#E58B68',
        'tomato-deep': '#C96A47',
        'tomato-soft': '#F9E4DA',
        ink: '#343B32',
        stone: '#85877D',
        card: '#FFFDF8',
        berry: '#B0616A',
        'berry-soft': '#F3E0E0',
        honey: '#D9A441',
        'honey-soft': '#F6ECD8',
        blue: {
          500: '#DCE8D6',
          600: '#526B50',
        },
        green: {
          50: '#F3FAF7',
          100: '#DEF7EC',
          800: '#03543F',
        },
        yellow: {
          100: '#FDF6B2',
          800: '#723B13',
        },
        purple: {
          50: '#F6F5FF',
        },
        indigo: {
          25: '#F5F8FF',
          100: '#E0EAFF',
          600: '#444CE7',
        },
      },
      fontFamily: {
        sans: ['"Noto Sans SC Variable"', '"Noto Sans SC"', '"PingFang SC"', '"Hiragino Sans GB"', '"Microsoft YaHei"', 'system-ui', 'sans-serif'],
        display: ['"Nunito Variable"', 'Nunito', '"Noto Sans SC Variable"', '"PingFang SC"', '"Microsoft YaHei"', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 1px 2px rgba(82, 107, 80, 0.04), 0 6px 20px rgba(52, 59, 50, 0.06)',
        lift: '0 2px 4px rgba(82, 107, 80, 0.06), 0 14px 34px rgba(52, 59, 50, 0.10)',
      },
      screens: {
        mobile: '100px',
        // => @media (min-width: 100px) { ... }
        tablet: '640px', // 391
        // => @media (min-width: 600px) { ... }
        pc: '769px',
        // => @media (min-width: 769px) { ... }
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}