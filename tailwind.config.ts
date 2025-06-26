import type { Config } from "tailwindcss"
import tailwindcssAnimate from "tailwindcss-animate";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "*.{js,ts,jsx,tsx,mdx}",
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
        // Your custom real estate palette
        brand: {
          primary: "#008654",
          "primary-dark": "#006b44",
          dark: "#0F3D3E",
          cta: "#E6941F",
          "cta-hover": "#CC8A1B",
          alert: "#C5670A",
          "alert-light": "#FEF3E2",
        },
        // shadcn color overrides
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          50: "#f0fdf4",
          100: "#dcfce7",
          500: "hsl(var(--primary))",
          600: "#006b44",
          700: "#005a39",
          900: "#004d2e",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          50: "#fefce8",
          100: "#fed7aa",
          500: "hsl(var(--accent))",
          600: "#CC8A1B",
          700: "#b45309",
          900: "#78350f",
          foreground: "hsl(var(--accent-foreground))",
        },
        highlight: {
          DEFAULT: "hsl(var(--accent))",
          50: "#fefce8",
          100: "#fed7aa",
          500: "hsl(var(--accent))",
          600: "#CC8A1B",
          700: "#b45309",
          900: "#78350f",
          foreground: "hsl(var(--accent-foreground))",
        },
        alert: {
          DEFAULT: "#C5670A",
          50: "#fef7ed",
          100: "#fed7aa",
          500: "#C5670A",
          600: "#ea580c",
          700: "#c2410c",
          900: "#7c2d12",
          foreground: "#ffffff",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
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
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      fontSize: {
        // Real estate specific font scales
        "property-title": ["2rem", { lineHeight: "2.5rem", fontWeight: "600" }],
        "property-price": ["1.5rem", { lineHeight: "2rem", fontWeight: "700" }],
        "agent-name": ["1.125rem", { lineHeight: "1.75rem", fontWeight: "500" }],
        "listing-detail": ["0.875rem", { lineHeight: "1.25rem", fontWeight: "400" }],
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
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "slide-in": {
          "0%": { opacity: "0", transform: "translateX(-10px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.5s ease-out",
        "slide-in": "slide-in 0.5s ease-out",
      },
    },
  },
  plugins: [tailwindcssAnimate],
}

export default config