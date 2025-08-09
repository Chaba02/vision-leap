
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				// Apple-inspired color palette
				apple: {
					white: 'hsl(0 0% 100%)',
					black: 'hsl(0 0% 7%)',
					'gray-50': 'hsl(0 0% 98%)',
					'gray-100': 'hsl(0 0% 96%)',
					'gray-200': 'hsl(0 0% 90%)',
					'gray-300': 'hsl(0 0% 82%)',
					'gray-400': 'hsl(0 0% 64%)',
					'gray-500': 'hsl(0 0% 45%)',
					'gray-600': 'hsl(0 0% 32%)',
					'gray-700': 'hsl(0 0% 25%)',
					'gray-800': 'hsl(0 0% 15%)',
					'gray-900': 'hsl(0 0% 9%)',
					'night-blue': 'hsl(220 30% 18%)',
					'silver': 'hsl(220 9% 46%)',
					'accent-blue': 'hsl(212 100% 50%)'
				}
			},
			fontFamily: {
				sans: ['"SF Pro Display"', 'Inter', '"Helvetica Neue"', 'system-ui', 'sans-serif'],
				display: ['"SF Pro Display"', 'Inter', '"Helvetica Neue"', 'system-ui', 'sans-serif']
			},
			fontSize: {
				// Apple-style typography scale
				'hero': ['4.5rem', { lineHeight: '1.05', letterSpacing: '-0.025em', fontWeight: '600' }],
				'hero-sm': ['3rem', { lineHeight: '1.1', letterSpacing: '-0.02em', fontWeight: '600' }],
				'display-xl': ['3.5rem', { lineHeight: '1.1', letterSpacing: '-0.02em', fontWeight: '600' }],
				'display-lg': ['2.75rem', { lineHeight: '1.15', letterSpacing: '-0.015em', fontWeight: '600' }],
				'display-md': ['2.25rem', { lineHeight: '1.2', letterSpacing: '-0.01em', fontWeight: '600' }],
				'display-sm': ['1.875rem', { lineHeight: '1.25', fontWeight: '600' }],
				'heading-xl': ['1.5rem', { lineHeight: '1.3', fontWeight: '600' }],
				'heading-lg': ['1.25rem', { lineHeight: '1.4', fontWeight: '600' }],
				'heading-md': ['1.125rem', { lineHeight: '1.4', fontWeight: '600' }],
				'body-xl': ['1.125rem', { lineHeight: '1.6', fontWeight: '400' }],
				'body-lg': ['1rem', { lineHeight: '1.6', fontWeight: '400' }],
				'body-md': ['0.875rem', { lineHeight: '1.5', fontWeight: '400' }],
				'body-sm': ['0.8125rem', { lineHeight: '1.5', fontWeight: '400' }],
				'caption': ['0.75rem', { lineHeight: '1.4', fontWeight: '500' }]
			},
			spacing: {
				'18': '4.5rem',
				'120': '30rem',
				'144': '36rem',
				'160': '40rem'
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)',
				'2xl': '1.25rem',
				'3xl': '1.75rem',
				'4xl': '2rem'
			},
			boxShadow: {
				'apple': '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
				'apple-md': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
				'apple-lg': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
				'apple-xl': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
				'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
				'glow': '0 0 20px rgba(212, 100, 50, 0.3)'
			},
			backgroundImage: {
				'gradient-subtle': 'linear-gradient(135deg, hsl(0 0% 100%) 0%, hsl(0 0% 98%) 100%)',
				'gradient-glass': 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)',
				'gradient-hero': 'linear-gradient(135deg, hsl(0 0% 100%) 0%, hsl(220 9% 98%) 100%)'
			},
			backdropBlur: {
				'xs': '2px'
			},
			keyframes: {
				'fade-in-up': {
					'0%': {
						opacity: '0',
						transform: 'translateY(20px)'
					},
					'100%': {
						opacity: '1',
						transform: 'translateY(0)'
					}
				},
				'fade-in': {
					'0%': { opacity: '0' },
					'100%': { opacity: '1' }
				},
				'scale-in': {
					'0%': {
						transform: 'scale(0.95)',
						opacity: '0'
					},
					'100%': {
						transform: 'scale(1)',
						opacity: '1'
					}
				},
				'float': {
					'0%, 100%': { transform: 'translateY(0px)' },
					'50%': { transform: 'translateY(-10px)' }
				},
				'glow': {
					'0%, 100%': { opacity: '1' },
					'50%': { opacity: '0.8' }
				}
			},
			animation: {
				'fade-in-up': 'fade-in-up 0.6s ease-out',
				'fade-in': 'fade-in 0.4s ease-out',
				'scale-in': 'scale-in 0.3s ease-out',
				'float': 'float 6s ease-in-out infinite',
				'glow': 'glow 2s ease-in-out infinite'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
