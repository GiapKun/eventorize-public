import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/**/*.{js,ts,jsx,tsx,mdx}"
    ],
    darkMode: ["class"],
    theme: {
        extend: {
            // backgroundImage: {
            //     "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
            //     "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))"
            // },
            colors: {
                primary: {
                    "DEFAULT": "#2176ae",
                    "50": "#f2f8fd",
                    "100": "#e5f0f9",
                    "200": "#c4e0f3",
                    "300": "#90c7e9",
                    "400": "#55aadb",
                    "500": "#2f8fc8",
                    "600": "#2176ae",
                    "700": "#1b5c89",
                    "800": "#1a4e72",
                    "900": "#1b425f",
                    "950": "#122a3f"
                },
                secondary: {
                    "DEFAULT": "#e3881d",
                    "50": "#fdf9ed",
                    "100": "#faedcb",
                    "200": "#f4d993",
                    "300": "#f0c466",
                    "400": "#eba934",
                    "500": "#e3881d",
                    "600": "#c96716",
                    "700": "#a74916",
                    "800": "#883918",
                    "900": "#702f17",
                    "950": "#401708"
                },
                surface: {
                    "50": "#faf8fa",
                    "100": "#f3f3f4",
                    "200": "#ebe8ec",
                    "300": "#e1dee3",
                    "400": "#c4bec7",
                    "500": "#aba2b0",
                    "600": "#978c9b",
                    "700": "#857988",
                    "800": "#6f6572",
                    "900": "#5c545e",
                    "950": "#3c373e",
                    "DEFAULT": "#f5f5f5"
                },
                text_primary: {
                    "DEFAULT": "#212121",
                    "50": "#f6f6f6",
                    "100": "#e7e7e7",
                    "200": "#d1d1d1",
                    "300": "#b0b0b0",
                    "400": "#888888",
                    "500": "#6d6d6d",
                    "600": "#5d5d5d",
                    "700": "#4f4f4f",
                    "800": "#454545",
                    "900": "#3d3d3d",
                    "950": "#212121"
                },
                text_secondary: {
                    "DEFAULT": "#545454",
                    "50": "#f6f6f6",
                    "100": "#e7e7e7",
                    "200": "#d1d1d1",
                    "300": "#b0b0b0",
                    "400": "#888888",
                    "500": "#6d6d6d",
                    "600": "#5d5d5d",
                    "700": "#545454",
                    "800": "#454545",
                    "900": "#3d3d3d",
                    "950": "#262626"
                },
                medium: {
                    "DEFAULT": "#232b38",
                    "50": "#f5f7fa",
                    "100": "#ebeef3",
                    "200": "#d2dbe5",
                    "300": "#aabbcf",
                    "400": "#7c97b4",
                    "500": "#5c799b",
                    "600": "#486281",
                    "700": "#3b4f69",
                    "800": "#344358",
                    "900": "#2f3b4b",
                    "950": "#232b38"
                },
                dark: {
                    "DEFAULT": "#010213",
                    "50": "#eff0ff",
                    "100": "#dee0ff",
                    "200": "#b6bfff",
                    "300": "#758bff",
                    "400": "#2c4eff",
                    "500": "#0125f6",
                    "600": "#0015d3",
                    "700": "#000fab",
                    "800": "#000e8d",
                    "900": "#061074",
                    "950": "#010213"
                },
                darker: {
                    "DEFAULT": "#212b36",
                    "50": "#f5f7fa",
                    "100": "#eaeff4",
                    "200": "#d1dce6",
                    "300": "#a9bed0",
                    "400": "#7b9cb5",
                    "500": "#5b809c",
                    "600": "#476782",
                    "700": "#3a536a",
                    "800": "#334759",
                    "900": "#2e3d4c",
                    "950": "#212b36"
                },
                background: "#FFFFFF",
                foreground: "#000000",
                card: {
                    DEFAULT: "#FFFFFF"
                },
                popover: {
                    DEFAULT: "hsl(var(--popover))"
                },
                muted: {
                    "DEFAULT": "#5e6b6b",
                    "50": "#f7f8f8",
                    "100": "#eef0f0",
                    "200": "#d9dede",
                    "300": "#bec6c6",
                    "400": "#919f9e",
                    "500": "#748383",
                    "600": "#5e6b6b",
                    "700": "#4d5757",
                    "800": "#424a4a",
                    "900": "#3a4040",
                    "950": "#262b2b"
                },
                accent: {
                    "DEFAULT": "#0fb8cb",
                    "50": "#edfefe",
                    "100": "#d1fafc",
                    "200": "#a9f4f8",
                    "300": "#51e5f0",
                    "400": "#2bd5e5",
                    "500": "#0fb8cb",
                    "600": "#1093aa",
                    "700": "#14778a",
                    "800": "#196071",
                    "900": "#194f60",
                    "950": "#0b3541"
                },
                destructive: {
                    "DEFAULT": "f05151",
                    "50": "#fef2f2",
                    "100": "#fee2e2",
                    "200": "#fecaca",
                    "300": "#fca5a5",
                    "400": "#f87171",
                    "500": "#f05151",
                    "600": "#dc2626",
                    "700": "#b91c1c",
                    "800": "#991b1b",
                    "900": "#7f1d1d",
                    "950": "#450a0a"
                },
                chart: {
                    "DEFAULT": "#f5f5f5",
                    "50": "#ffffff",
                    "100": "#ffffff",
                    "200": "#ffffff",
                    "300": "#ffffff",
                    "400": "#ffffff",
                    "500": "#f5f5f5",
                    "600": "#e8e8e8",
                    "700": "#d1d1d1",
                    "800": "#b0b0b0",
                    "900": "#6d6d6d",
                    "950": "#3c3c3c"
                }
            },
            fontFamily: {
                jua: ["Jua", "sans-serif"]
            }
        },
        screens: {
            "sm": "640px",
            "md": "768px",
            "lg": "1024px",
            "xl": "1280px",
            "2xl": "1536px"
        },
        container: {
            center: true,
            padding: "2rem",
            screens: {
                sm: "100%",
                md: "768px",
                lg: "1024px",
                xl: "1280px"
            }
        }
    },
    plugins: [require("tailwind-scrollbar-hide"), require("tailwindcss-animate")]
};

export default config;
