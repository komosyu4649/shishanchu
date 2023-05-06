/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      width: {
        layoutDefault: '126rem',
      },
      colors: {
        blackWeak: '#1E1E1E',
        black: '#000000',
        white: '#FFFFFF',
        green: '#578885',
      },
      fontSize: {
        xs: [
          '1.2rem',
          {
            lineHeight: '1.5',
            fontweight: '700',
          },
        ],
        sm: [
          '1.3rem',
          {
            lineHeight: '1.5',
            fontweight: '700',
          },
        ],
        md: [
          '1.6rem',
          {
            lineHeight: '1.5',
            fontweight: '700',
          },
        ],
        mdLhLg: [
          '1.6rem',
          {
            lineHeight: '2',
            fontweight: '700',
          },
        ],
        base: ['16px', '24px'],
        lg: ['20px', '28px'],
        xl: ['24px', '32px'],
      },
    },
  },
  plugins: [],
}
