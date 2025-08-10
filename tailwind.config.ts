
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
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
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
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
        // Apple Design System Colors
        'apple': {
          'white': '#ffffff',
          'black': '#1d1d1f',
          'gray': {
            '50': '#f9f9f9',
            '100': '#f2f2f2',
            '200': '#d2d2d7',
            '300': '#a1a1a6',
            '400': '#86868b',
            '500': '#6e6e73',
            '600': '#515154',
            '700': '#424245',
            '800': '#1d1d1f',
          },
          'title': '#1d1d1f',
          'body': '#86868b',
          'silver': '#e8e8ed',
          'night-blue': '#1e3a8a',
          'accent-blue': '#0066cc',
        },
      },
      fontSize: {
        // Apple Typography Scale
        'body-xs': ['0.75rem', { lineHeight: '1rem' }],
        'body-sm': ['0.875rem', { lineHeight: '1.25rem' }],
        'body-md': ['1rem', { lineHeight: '1.5rem' }],
        'body-lg': ['1.125rem', { lineHeight: '1.75rem' }],
        'body-xl': ['1.25rem', { lineHeight: '1.875rem' }],
        'heading-xs': ['1.25rem', { lineHeight: '1.5rem' }],
        'heading-sm': ['1.5rem', { lineHeight: '2rem' }],
        'heading-md': ['1.875rem', { lineHeight: '2.25rem' }],
        'heading-lg': ['2.25rem', { lineHeight: '2.5rem' }],
        'heading-xl': ['3rem', { lineHeight: '3rem' }],
        'display-sm': ['3.75rem', { lineHeight: '3.75rem' }],
        'display-md': ['4.5rem', { lineHeight: '4.5rem' }],
        'display-lg': ['6rem', { lineHeight: '6rem' }],
        'hero': ['8rem', { lineHeight: '8rem' }],
      },
      backgroundImage: {
        // Apple-style Gradients
        'gradient-hero': 'linear-gradient(135deg, #f9f9f9 0%, #e8e8ed 100%)',
        'gradient-subtle': 'linear-gradient(135deg, #ffffff 0%, #f9f9f9 100%)',
      },
      boxShadow: {
        // Apple Shadow System
        'apple': '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
        'apple-md': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'apple-lg': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        'apple-xl': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        'apple-2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "fade-in": {
          "0%": {
            opacity: "0",
            transform: "translateY(10px)"
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)"
          }
        },
        "fade-in-up": {
          "0%": {
            opacity: "0",
            transform: "translateY(20px)"
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)"
          }
        },
        "scale-in": {
          "0%": {
            transform: "scale(0.95)",
            opacity: "0"
          },
          "100%": {
            transform: "scale(1)",
            opacity: "1"
          }
        },
        "float": {
          "0%, 100%": { 
            transform: "translateY(0px) rotate(0deg)" 
          },
          "50%": { 
            transform: "translateY(-10px) rotate(5deg)" 
          }
        },
        "glow": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.5" }
        }
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.6s ease-out",
        "fade-in-up": "fade-in-up 0.8s ease-out",
        "scale-in": "scale-in 0.4s ease-out",
        "float": "float 6s ease-in-out infinite",
        "glow": "glow 2s ease-in-out infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
