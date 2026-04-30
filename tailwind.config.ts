import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        display: ["'Fraunces'", "Georgia", "serif"],
        body: ["'Cabinet Grotesk'", "'DM Sans'", "sans-serif"],
      },
      colors: {
        cream: { 50: "#FDFAF5", 100: "#F5EFE4" },
        obsidian: { 900: "#0A0A0A", 800: "#101010", 700: "#1A1A1A" },
        gold: { DEFAULT: "#C9A84C", light: "#E2C97E", dark: "#A07830" },
        mist: "#8A8A72",
      },
      transitionTimingFunction: {
        cinematic: "cubic-bezier(0.76, 0, 0.24, 1)",
      },
    },
  },
  plugins: [],
};
export default config;
