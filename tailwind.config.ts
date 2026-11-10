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
          navy: "#0B2A4A",
          darkNavy: "#071B30",
          orange: "#F26B1D",
          orangeHover: "#DC5912",
          blue: "#1E6FD9",
          blueHover: "#1659B1",
          green: "#16A34A",
          whatsapp: "#25D366",
          amber: "#F59E0B",
          cream: "#F7F2EB",
          lightGray: "#F1F5F9",
        },
      },
      fontFamily: {
        bengali: ["var(--font-hind-siliguri)", "Hind Siliguri", "sans-serif"],
        sans: ["var(--font-inter)", "Inter", "sans-serif"],
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        marquee: "marquee 35s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;

