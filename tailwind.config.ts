import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";

const config: Config = {
    darkMode: "class",
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                // RGB Gaming Color System
                primary: {
                    DEFAULT: "hsl(230, 100%, 60%)", // Electric Blue
                    50: "hsl(230, 100%, 95%)",
                    100: "hsl(230, 100%, 90%)",
                    200: "hsl(230, 100%, 80%)",
                    300: "hsl(230, 100%, 70%)",
                    400: "hsl(230, 100%, 60%)",
                    500: "hsl(230, 100%, 50%)",
                    600: "hsl(230, 100%, 45%)",
                    700: "hsl(230, 100%, 40%)",
                    800: "hsl(230, 100%, 35%)",
                    900: "hsl(230, 100%, 25%)",
                },
                secondary: {
                    DEFAULT: "hsl(280, 100%, 60%)", // Cyber Purple
                    50: "hsl(280, 100%, 95%)",
                    100: "hsl(280, 100%, 90%)",
                    200: "hsl(280, 100%, 80%)",
                    300: "hsl(280, 100%, 70%)",
                    400: "hsl(280, 100%, 60%)",
                    500: "hsl(280, 100%, 50%)",
                    600: "hsl(280, 100%, 45%)",
                    700: "hsl(280, 100%, 40%)",
                    800: "hsl(280, 100%, 35%)",
                    900: "hsl(280, 100%, 25%)",
                },
                accent: {
                    DEFAULT: "hsl(330, 100%, 60%)", // Plasma Pink
                    50: "hsl(330, 100%, 95%)",
                    100: "hsl(330, 100%, 90%)",
                    200: "hsl(330, 100%, 80%)",
                    300: "hsl(330, 100%, 70%)",
                    400: "hsl(330, 100%, 60%)",
                    500: "hsl(330, 100%, 50%)",
                    600: "hsl(330, 100%, 45%)",
                    700: "hsl(330, 100%, 40%)",
                    800: "hsl(330, 100%, 35%)",
                    900: "hsl(330, 100%, 25%)",
                },
                neon: {
                    blue: "hsl(195, 100%, 50%)",
                    purple: "hsl(270, 100%, 60%)",
                    pink: "hsl(320, 100%, 60%)",
                    green: "hsl(150, 100%, 50%)",
                    yellow: "hsl(60, 100%, 60%)",
                    red: "hsl(0, 100%, 60%)",
                },
                background: "hsl(var(--background))",
                foreground: "hsl(var(--foreground))",
                card: {
                    DEFAULT: "hsl(var(--card))",
                    foreground: "hsl(var(--card-foreground))",
                },
                popover: {
                    DEFAULT: "hsl(var(--popover))",
                    foreground: "hsl(var(--popover-foreground))",
                },
                muted: {
                    DEFAULT: "hsl(var(--muted))",
                    foreground: "hsl(var(--muted-foreground))",
                },
                destructive: {
                    DEFAULT: "hsl(var(--destructive))",
                    foreground: "hsl(var(--destructive-foreground))",
                },
                border: "hsl(var(--border))",
                input: "hsl(var(--input))",
                ring: "hsl(var(--ring))",
            },
            backgroundImage: {
                "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
                "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
                "gradient-rgb": "linear-gradient(135deg, hsl(230, 100%, 60%), hsl(280, 100%, 60%), hsl(330, 100%, 60%))",
                "gradient-rgb-dark": "linear-gradient(135deg, hsl(230, 100%, 30%), hsl(280, 100%, 30%), hsl(330, 100%, 30%))",
            },
            borderRadius: {
                lg: "var(--radius)",
                md: "calc(var(--radius) - 2px)",
                sm: "calc(var(--radius) - 4px)",
            },
            animation: {
                "rgb-pulse": "rgb-pulse 3s ease-in-out infinite",
                "glow-pulse": "glow-pulse 2s ease-in-out infinite",
                "slide-in-right": "slide-in-right 0.3s ease-out",
                "slide-in-left": "slide-in-left 0.3s ease-out",
                "fade-in": "fade-in 0.5s ease-out",
                "bounce-slow": "bounce 3s infinite",
            },
            keyframes: {
                "rgb-pulse": {
                    "0%, 100%": {
                        boxShadow: "0 0 20px hsl(230, 100%, 60%), 0 0 40px hsl(230, 100%, 60%)",
                    },
                    "33%": {
                        boxShadow: "0 0 20px hsl(280, 100%, 60%), 0 0 40px hsl(280, 100%, 60%)",
                    },
                    "66%": {
                        boxShadow: "0 0 20px hsl(330, 100%, 60%), 0 0 40px hsl(330, 100%, 60%)",
                    },
                },
                "glow-pulse": {
                    "0%, 100%": {
                        opacity: "1",
                        filter: "drop-shadow(0 0 10px currentColor)",
                    },
                    "50%": {
                        opacity: "0.8",
                        filter: "drop-shadow(0 0 20px currentColor)",
                    },
                },
                "slide-in-right": {
                    "0%": {
                        transform: "translateX(100%)",
                        opacity: "0",
                    },
                    "100%": {
                        transform: "translateX(0)",
                        opacity: "1",
                    },
                },
                "slide-in-left": {
                    "0%": {
                        transform: "translateX(-100%)",
                        opacity: "0",
                    },
                    "100%": {
                        transform: "translateX(0)",
                        opacity: "1",
                    },
                },
                "fade-in": {
                    "0%": {
                        opacity: "0",
                    },
                    "100%": {
                        opacity: "1",
                    },
                },
            },
            fontFamily: {
                sans: ["var(--font-geist-sans)", "system-ui", "sans-serif"],
                mono: ["var(--font-geist-mono)", "monospace"],
            },
        },
    },
    plugins: [tailwindcssAnimate],
};

export default config;
