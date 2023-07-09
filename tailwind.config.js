/** @type {import('tailwindcss').Config} */

const plugin = require('tailwindcss/plugin')

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
        layoutSm: '92rem',
      },
      colors: {
        blackWeak: '#1E1E1E',
        black: '#000000',
        white: '#FFFFFF',
        green: '#578885',
      },
      fontSize: {
        s0: [
          '1rem',
          {
            lineHeight: '1.5',
            fontWeight: '700',
          },
        ],
        s0Lt: [
          '1rem',
          {
            lineHeight: '1.5',
            fontWeight: '500',
          },
        ],
        s1: [
          '1.2rem',
          {
            lineHeight: '1.5',
            fontWeight: '700',
          },
        ],
        s1Lt: [
          '1.2rem',
          {
            lineHeight: '1.5',
            fontWeight: '500',
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
        s3Lt: [
          '1.4rem',
          {
            lineHeight: '1.5',
            fontWeight: '500',
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
          '1.8rem',
          {
            lineHeight: '1.5',
            fontWeight: '700',
          },
        ],
        s7: [
          '2rem',
          {
            lineHeight: '1.5',
            fontWeight: '700',
          },
        ],
        s8: [
          '2.2rem',
          {
            lineHeight: '1.5',
            fontWeight: '700',
          },
        ],
        s9: [
          '2.8rem',
          {
            lineHeight: '1.5',
            fontWeight: '700',
          },
        ],
        s10: [
          '3.2rem',
          {
            lineHeight: '1.5',
            fontWeight: '700',
          },
        ],
        s11: [
          '4.2rem',
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
      fontFamily: {
        chivo: ['var(--font-chivo)'],
      },
    },
    borderRadius: {
      none: '0',
      sm: '.5rem',
      md: '1rem',
      lg: '1.5rem',
      full: '50%',
    },
    screens: {
      sm: '640px',
      // => @media (min-width: 640px) { ... }

      md: '768px',
      // => @media (min-width: 768px) { ... }

      lg: '1024px',
      // => @media (min-width: 1024px) { ... }

      xl: '1280px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1536px',
      // => @media (min-width: 1536px) { ... }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/line-clamp'),
    plugin(function ({ addVariant }) {
      addVariant('optional', '&:optional')
      addVariant('hocus', ['&:hover', '&:focus'])
      addVariant('inverted-colors', '@media (inverted-colors: inverted)')
    }),
  ],
}
