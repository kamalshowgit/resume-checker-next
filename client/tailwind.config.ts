import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      // Mobile-first breakpoints
      screens: {
        'xs': '475px',
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px',
      },
      // Mobile-optimized spacing
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      // Mobile-optimized font sizes
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1rem' }],
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],
        'base': ['1rem', { lineHeight: '1.5rem' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        '5xl': ['3rem', { lineHeight: '1' }],
        '6xl': ['3.75rem', { lineHeight: '1' }],
        '7xl': ['4.5rem', { lineHeight: '1' }],
        '8xl': ['6rem', { lineHeight: '1' }],
        '9xl': ['8rem', { lineHeight: '1' }],
      },
      // Mobile-optimized animations
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'slide-down': 'slideDown 0.3s ease-out',
        'scale-in': 'scaleIn 0.2s ease-out',
        'bounce-gentle': 'bounceGentle 2s infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        bounceGentle: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5px)' },
        },
      },
      // Mobile-optimized shadows
      boxShadow: {
        'mobile': '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
        'mobile-md': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'mobile-lg': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        'mobile-xl': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
      },
      // Mobile-optimized transitions
      transitionDuration: {
        '200': '200ms',
        '300': '300ms',
        '400': '400ms',
        '500': '500ms',
      },
      transitionTimingFunction: {
        'bounce-in': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
        'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
      // Mobile-optimized z-index
      zIndex: {
        'mobile': '10',
        'mobile-high': '20',
        'mobile-higher': '30',
        'mobile-highest': '40',
        'mobile-overlay': '50',
      },
    },
  },
  plugins: [
    // Custom plugin for mobile-first utilities
    function({ addUtilities, theme }: any) {
      const newUtilities = {
        '.mobile-container': {
          paddingLeft: theme('spacing.4'),
          paddingRight: theme('spacing.4'),
          '@screen sm': {
            paddingLeft: theme('spacing.6'),
            paddingRight: theme('spacing.6'),
          },
          '@screen lg': {
            paddingLeft: theme('spacing.8'),
            paddingRight: theme('spacing.8'),
          },
        },
        '.mobile-text-responsive': {
          fontSize: theme('fontSize.base'),
          lineHeight: theme('fontSize.base.lineHeight'),
          '@screen sm': {
            fontSize: theme('fontSize.lg'),
            lineHeight: theme('fontSize.lg.lineHeight'),
          },
          '@screen lg': {
            fontSize: theme('fontSize.xl'),
            lineHeight: theme('fontSize.xl.lineHeight'),
          },
        },
        '.mobile-padding-responsive': {
          padding: theme('spacing.4'),
          '@screen sm': {
            padding: theme('spacing.6'),
          },
          '@screen lg': {
            padding: theme('spacing.8'),
          },
        },
        '.mobile-margin-responsive': {
          margin: theme('spacing.4'),
          '@screen sm': {
            margin: theme('spacing.6'),
          },
          '@screen lg': {
            margin: theme('spacing.8'),
          },
        },
        '.mobile-grid-responsive': {
          display: 'grid',
          gap: theme('spacing.4'),
          '@screen sm': {
            gap: theme('spacing.6'),
          },
          '@screen lg': {
            gap: theme('spacing.8'),
          },
        },
        '.mobile-flex-responsive': {
          display: 'flex',
          flexDirection: 'column',
          '@screen sm': {
            flexDirection: 'row',
          },
        },
        '.mobile-space-responsive': {
          '& > * + *': {
            marginTop: theme('spacing.4'),
          },
          '@screen sm': {
            '& > * + *': {
              marginTop: theme('spacing.6'),
            },
          },
          '@screen lg': {
            '& > * + *': {
              marginTop: theme('spacing.8'),
            },
          },
        },
        '.mobile-touch-target': {
          minHeight: '44px',
          minWidth: '44px',
        },
        '.mobile-focus-ring': {
          outline: 'none',
          '&:focus-visible': {
            boxShadow: `0 0 0 2px ${theme('colors.blue.500')}, 0 0 0 4px ${theme('colors.white')}`,
          },
        },
        '.mobile-scrollbar': {
          '&::-webkit-scrollbar': {
            width: '6px',
            height: '6px',
          },
          '&::-webkit-scrollbar-track': {
            backgroundColor: theme('colors.gray.100'),
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: theme('colors.gray.300'),
            borderRadius: '9999px',
          },
          '&::-webkit-scrollbar-thumb:hover': {
            backgroundColor: theme('colors.gray.400'),
          },
        },
      }
      addUtilities(newUtilities)
    }
  ],
}

export default config
