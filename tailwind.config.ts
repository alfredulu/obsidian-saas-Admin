import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        obsidian: "#0F1117",
        neon: {
          pink: "#FF00D6",
          purple: "#9D00FF",
          green: "#00FFD1",
        },
      },
    },
  },
  plugins: [],
};

export default config;
