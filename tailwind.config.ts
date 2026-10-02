import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./data/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        canvas: {
          DEFAULT: "#090b0f",
          elevated: "#0d1016",
        },
        surface: {
          DEFAULT: "#11151c",
          hover: "#161b24",
        },
        border: {
          subtle: "#1f252f",
          DEFAULT: "#272e3a",
        },
        accent: {
          DEFAULT: "#34d399",
          muted: "#6ee7b7",
          dark: "#059669",
        },
        ink: {
          DEFAULT: "#f3f5f7",
          muted: "#9aa3b0",
          faint: "#6b7280",
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      fontFamily: {
        mono: ["var(--font-geist-mono)", "ui-monospace", "SFMono-Regular", "monospace"],
      },
    },
  },
  plugins: [],
};
export default config;
