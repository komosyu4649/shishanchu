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
        layoutMd: '118rem',
      },
      colors: {
        blackWeak: '#1E1E1E',
        black: '#000000',
        white: '#FFFFFF',
        green: '#578885',
      },
      fontSize: {
        s1: [
          '1.2rem',
          {
            lineHeight: '1.5',
            fontWeight: '700',
          },
        ],
        s2: [
          '1.3rem',
          {
            lineHeight: '1.5',
            fontWeight: '700',
          },
        ],
        s3: [
          '1.4rem',
          {
            lineHeight: '1.5',
            fontWeight: '700',
          },
        ],
        s4: [
          '1.5rem',
          {
            lineHeight: '1.5',
            fontWeight: '700',
          },
        ],
        s5: [
          '1.6rem',
          {
            lineHeight: '1.5',
            fontWeight: '700',
          },
        ],
        s5LhLg: [
          '1.6rem',
          {
            lineHeight: '2',
            fontWeight: '700',
          },
        ],
        s5LhLgLt: [
          '1.6rem',
          {
            lineHeight: '2',
            fontWeight: '500',
          },
        ],
        s6: [
          '3.2rem',
          {
            lineHeight: '1.5',
            fontWeight: '700',
          },
        ],
        proseH2: [
          '2.4rem',
          {
            lineHeight: '1.5',
            fontWeight: '700',
          },
        ],
        proseH3: [
          '2.2rem',
          {
            lineHeight: '1.5',
            fontWeight: '700',
          },
        ],
        proseH4: [
          '2rem',
          {
            lineHeight: '1.5',
            fontWeight: '700',
          },
        ],
        proseH5: [
          '1.8rem',
          {
            lineHeight: '1.5',
            fontWeight: '700',
          },
        ],
        proseH6: [
          '1.6rem',
          {
            lineHeight: '1.5',
            fontWeight: '700',
          },
        ],
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
}
