import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
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
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
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
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "legend-slide-in": {
          from: { bottom: "-72px", opacity: "0" },
          to: { bottom: "0", opacity: "1" },
        },
        heartBeat: {
          "0%": { transform: "scale(1);" },
          "14%": { transform: "scale(1.03);" },
          "28%": { transform: "scale(1);" },
          "42%": { transform: "scale(1.02);" },
          "70%": { transform: "scale(1);" },
        },
        rubberBand: {
          from: {
            transform: "scale3d(1, 1, 1)",
          },

          "30%": {
            transform: "scale3d(1.125, 0.875, 1)",
          },

          "40%": {
            transform: "scale3d(0.875, 1.125, 1)",
          },

          "50%": {
            transform: "scale3d(1.15, 0.85, 1)",
          },

          "65%": {
            transform: "scale3d(0.95, 1.05, 1)",
          },

          "75%": {
            transform: "scale3d(1.05, 0.95, 1)",
          },
          to: {
            transform: "scale3d(1, 1, 1)",
          },
        },
        rubberBandIntro: {
          from: {
            transform: "scale3d(1, 1, 1)",
          },

          "80%": {
            transform: "scale3d(1, 1, 1)",
          },

          "86%": {
            // 6% 86%
            transform: "scale3d(1.125, 0.875, 1)",
          },

          "88%": {
            // 8% 88%
            transform: "scale3d(0.875, 1.125, 1)",
          },

          "90%": {
            // 10% 90%
            transform: "scale3d(1.15, 0.85, 1)",
          },

          "93%": {
            // 93%
            transform: "scale3d(0.95, 1.05, 1)",
          },

          "95%": {
            // 15% 95%
            transform: "scale3d(1.05, 0.95, 1)",
          },
          to: {
            transform: "scale3d(1, 1, 1)",
          },
        },
        rubberBandJump: {
          from: {
            transform: "translateY(0px) scale3d(1, 1, 1)",
          },

          "30%": {
            transform: "translateY(1px) scale3d(1.125, 0.8075, 1)",
          },

          "40%": {
            transform: "translateY(-6px) scale3d(0.875, 1.25, 1)",
            "animation-timing-function": "ease-in-out",
          },

          "50%": {
            transform: "translateY(.5px) scale3d(1.15, 0.85, 1)",
          },

          "65%": {
            transform: "translateY(0px) scale3d(0.95, 1.05, 1)",
          },

          "75%": {
            transform: "translateY(0px) scale3d(1.05, 0.95, 1)",
          },
          to: {
            transform: "translateY(0px) scale3d(1, 1, 1)",
          },
        },
        rubberBandJumpShadow: {
          from: {
            opacity: "1",
            transform: "scale3d(1, 1, 1)",
          },

          "30%": {
            opacity: ".95",
            transform: "scale3d(2.1, 1, 1)",
            // transform: "scale3d(1.1, 1, 1)",
          },

          "40%": {
            opacity: ".70",
            transform: "scale3d(.86, .92, 1)",
            "animation-timing-function": "ease-in-out",
          },

          "50%": {
            opacity: ".95",
            transform: "scale3d(1.03, 1, 1)",
          },

          "65%": {
            opacity: "1",
            transform: "scale3d(.99, 1, 1)",
          },

          "75%": {
            opacity: "1",
            transform: "scale3d(1.02, 1, 1)",
          },
          to: {
            opacity: "1",
            transform: "scale3d(1, 1, 1)",
          },
        },
        flipHorizontal: {
          "50%": { transform: "rotateY(180deg)" },
        },
        flipVertical: {
          "50%": { transform: "rotateX(180deg)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        heartBeat: "heartBeat 1s 1",
        rubberBand: "rubberBand 1s 1",
        rubberBandQuick: "rubberBand .4s 1",
        rubberBandIntro: "rubberBandIntro 5s 1",

        rubberBandJumpNoDelay: "rubberBandJump 1.4s 3 0s",

        rubberBandJump: "rubberBandJump 1.4s 3 0s",
        rubberBandJumpShadow: "rubberBandJumpShadow 1.4s 3 0s",

        hflip: "flipHorizontal 2s 1",
        vflip: "flipVertical 2s 1",
        fadeIn: "fadeIn .5s ease-in",
        legendSlideIn: "legend-slide-in 0.6s ease-out 1s forwards",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
