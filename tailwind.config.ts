import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",

  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],

  theme: {
    extend: {
      colors: {
        background: "#0f0f11",
        foreground: "#f3f4f6",

        primary: {
          DEFAULT: "#e50914",
          hover: "#b20710",
        },

        card: "#1a1a1f",
        muted: "#9ca3af",
      },

      fontFamily: {
        sans: ["var(--font-inter)"],
      },

      backgroundImage: {
        "gradient-radial":
          "radial-gradient(var(--tw-gradient-stops))",

        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",

        "hero-gradient":
          "linear-gradient(to top, #0f0f11 0%, transparent 100%)",
      },
    },
  },

  plugins: [],
};

export default config;