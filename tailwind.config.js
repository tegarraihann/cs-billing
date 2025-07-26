import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.vue',
        './resources/js/**/*.js',
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ['Inter', 'Figtree', ...defaultTheme.fontFamily.sans],
                display: ['Inter', 'system-ui', 'sans-serif'],
            },
            colors: {
                // Custom Sage Color Palette
                sage: {
                    50: '#F4F6F3',   // Very light sage - backgrounds
                    100: '#E8ECE5',  // Light sage - subtle backgrounds
                    200: '#D4DDD0',  // Light sage - borders, dividers
                    300: '#BFD0B8',  // Medium light sage - muted text
                    400: '#A5C49A',  // Medium sage - icons, accents
                    500: '#8DB580',  // Base sage - primary color
                    600: '#8DB580',  // Primary sage - buttons, links
                    700: '#7BA169',  // Dark sage - hover states
                    800: '#6B8F5E',  // Darker sage - text
                    900: '#5A7D52',  // Darkest sage - headings
                },
                // Enhanced gray palette to complement sage
                gray: {
                    50: '#FAFAF9',
                    100: '#F5F5F4',
                    200: '#E7E5E4',
                    300: '#D6D3D1',
                    400: '#A8A29E',
                    500: '#78716C',
                    600: '#57534E',
                    700: '#44403C',
                    800: '#292524',
                    900: '#1C1917',
                    950: '#0C0A09',
                }
            },
            spacing: {
                '18': '4.5rem',
                '88': '22rem',
                '128': '32rem',
            },
            borderRadius: {
                '4xl': '2rem',
                '5xl': '2.5rem',
            },
            fontSize: {
                '2xs': ['0.625rem', { lineHeight: '0.75rem' }],
                '6xl': ['3.75rem', { lineHeight: '1' }],
                '7xl': ['4.5rem', { lineHeight: '1' }],
                '8xl': ['6rem', { lineHeight: '1' }],
                '9xl': ['8rem', { lineHeight: '1' }],
            },
            animation: {
                'fade-in': 'fadeIn 0.8s ease-out forwards',
                'slide-up': 'slideUp 1s ease-out forwards',
                'fade-in-up': 'fadeInUp 0.8s ease-out forwards',
                'bounce-slow': 'bounce 2s infinite',
                'pulse-slow': 'pulse 3s infinite',
                'spin-slow': 'spin 3s linear infinite',
            },
            keyframes: {
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                slideUp: {
                    '0%': {
                        opacity: '0',
                        transform: 'translateY(30px)',
                    },
                    '100%': {
                        opacity: '1',
                        transform: 'translateY(0)',
                    },
                },
                fadeInUp: {
                    '0%': {
                        opacity: '0',
                        transform: 'translate3d(0, 40px, 0)',
                    },
                    '100%': {
                        opacity: '1',
                        transform: 'translate3d(0, 0, 0)',
                    },
                },
            },
            backdropBlur: {
                xs: '2px',
            },
            boxShadow: {
                'soft': '0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)',
                'medium': '0 4px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
                'hard': '0 10px 40px -10px rgba(0, 0, 0, 0.15), 0 20px 25px -5px rgba(0, 0, 0, 0.1)',
                'sage': '0 4px 14px 0 rgba(141, 181, 128, 0.3)',
                'sage-lg': '0 8px 25px 0 rgba(141, 181, 128, 0.4)',
            },
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
                'sage-gradient': 'linear-gradient(135deg, var(--tw-gradient-stops))',
            },
            screens: {
                'xs': '475px',
                '3xl': '1920px',
            },
            zIndex: {
                '60': '60',
                '70': '70',
                '80': '80',
                '90': '90',
                '100': '100',
            },
            transitionTimingFunction: {
                'bounce-in': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
                'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
            },
            scale: {
                '102': '1.02',
                '103': '1.03',
            },
        },
    },

    plugins: [
        forms,
        // Add custom utilities
        function({ addUtilities, theme }) {
            const newUtilities = {
                // Glass morphism utilities
                '.glass': {
                    background: 'rgba(255, 255, 255, 0.1)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                },
                '.glass-dark': {
                    background: 'rgba(0, 0, 0, 0.1)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                },
                // Gradient text utilities
                '.gradient-text': {
                    background: `linear-gradient(135deg, ${theme('colors.sage.600')}, ${theme('colors.sage.700')})`,
                    '-webkit-background-clip': 'text',
                    '-webkit-text-fill-color': 'transparent',
                    'background-clip': 'text',
                },
                '.gradient-text-gray': {
                    background: `linear-gradient(135deg, ${theme('colors.gray.700')}, ${theme('colors.gray.900')})`,
                    '-webkit-background-clip': 'text',
                    '-webkit-text-fill-color': 'transparent',
                    'background-clip': 'text',
                },
                // Enhanced hover effects
                '.hover-lift': {
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    '&:hover': {
                        transform: 'translateY(-4px)',
                        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
                    },
                },
                '.hover-scale': {
                    transition: 'transform 0.3s ease',
                    '&:hover': {
                        transform: 'scale(1.05)',
                    },
                },
                // Custom button styles
                '.btn-sage': {
                    background: `linear-gradient(135deg, ${theme('colors.sage.600')}, ${theme('colors.sage.700')})`,
                    border: 'none',
                    color: 'white',
                    fontWeight: '600',
                    padding: '1rem 2rem',
                    borderRadius: '9999px',
                    transition: 'all 0.3s ease',
                    boxShadow: `0 4px 14px 0 rgba(141, 181, 128, 0.3)`,
                    '&:hover': {
                        background: `linear-gradient(135deg, ${theme('colors.sage.700')}, ${theme('colors.sage.800')})`,
                        transform: 'translateY(-2px)',
                        boxShadow: `0 8px 25px 0 rgba(141, 181, 128, 0.4)`,
                    },
                },
                '.btn-sage-outline': {
                    background: 'transparent',
                    border: `2px solid ${theme('colors.sage.600')}`,
                    color: theme('colors.sage.700'),
                    fontWeight: '600',
                    padding: '1rem 2rem',
                    borderRadius: '9999px',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                        background: theme('colors.sage.600'),
                        color: 'white',
                        transform: 'translateY(-2px)',
                    },
                },
                // Scroll behavior
                '.scroll-smooth': {
                    scrollBehavior: 'smooth',
                },
                // Focus styles
                '.focus-sage': {
                    '&:focus': {
                        outline: `2px solid ${theme('colors.sage.600')}`,
                        outlineOffset: '2px',
                    },
                },
            }
            addUtilities(newUtilities)
        },
        // Add component classes
        function({ addComponents, theme }) {
            const components = {
                // Card components
                '.card': {
                    backgroundColor: theme('colors.white'),
                    borderRadius: theme('borderRadius.2xl'),
                    padding: theme('spacing.6'),
                    boxShadow: theme('boxShadow.soft'),
                    border: `1px solid ${theme('colors.gray.100')}`,
                },
                '.card-sage': {
                    backgroundColor: theme('colors.sage.50'),
                    borderRadius: theme('borderRadius.2xl'),
                    padding: theme('spacing.6'),
                    boxShadow: theme('boxShadow.soft'),
                    border: `1px solid ${theme('colors.sage.200')}`,
                },
                // Section components
                '.section': {
                    paddingTop: theme('spacing.24'),
                    paddingBottom: theme('spacing.24'),
                },
                '.section-sm': {
                    paddingTop: theme('spacing.16'),
                    paddingBottom: theme('spacing.16'),
                },
                '.section-lg': {
                    paddingTop: theme('spacing.32'),
                    paddingBottom: theme('spacing.32'),
                },
                // Container components
                '.container-custom': {
                    maxWidth: theme('screens.7xl'),
                    marginLeft: 'auto',
                    marginRight: 'auto',
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
            }
            addComponents(components)
        }
    ],

    // Safelist important classes that might be used dynamically
    safelist: [
        'bg-sage-50',
        'bg-sage-100',
        'bg-sage-200',
        'bg-sage-300',
        'bg-sage-400',
        'bg-sage-500',
        'bg-sage-600',
        'bg-sage-700',
        'bg-sage-800',
        'bg-sage-900',
        'text-sage-50',
        'text-sage-100',
        'text-sage-200',
        'text-sage-300',
        'text-sage-400',
        'text-sage-500',
        'text-sage-600',
        'text-sage-700',
        'text-sage-800',
        'text-sage-900',
        'border-sage-200',
        'border-sage-300',
        'border-sage-400',
        'border-sage-500',
        'border-sage-600',
        'hover:bg-sage-100',
        'hover:bg-sage-200',
        'hover:bg-sage-600',
        'hover:bg-sage-700',
        'hover:text-sage-600',
        'hover:text-sage-700',
        'focus:ring-sage-500',
        'focus:ring-sage-600',
        'from-sage-50',
        'from-sage-100',
        'from-sage-500',
        'from-sage-600',
        'to-sage-100',
        'to-sage-200',
        'to-sage-600',
        'to-sage-700',
        'via-sage-700',
    ],
};
