import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50:  "#f0f4ff",
          100: "#dce8ff",
          200: "#b9d2ff",
          300: "#84acff",
          400: "#527dff",
          500: "#2d54ff",
          600: "#1935f5",
          700: "#1525e0",
          800: "#1720b5",
          900: "#19218e",
        },
      },
    },
  },
  plugins: [],
};

export default config;
