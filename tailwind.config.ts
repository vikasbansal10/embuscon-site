// tailwind.config.ts
import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";

const config: Config = {
  darkMode: ["class"],
  content: [
    './app/**/*.{ts,tsx,js,jsx,mdx}',
    './components/**/*.{ts,tsx,js,jsx,mdx}',
    './content/**/*.{md,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          bg: "hsl(var(--bg))",
          fg: "hsl(var(--fg))",
          primary: "hsl(var(--primary))",
          muted: "hsl(var(--muted))",
          card: "hsl(var(--card))",
          border: "hsl(var(--border))"
        }
      },
      borderRadius: { "2xl": "1.25rem" },
      boxShadow: {
        soft: "0 10px 30px rgba(0,0,0,.12)", // generates `shadow-soft`
      }
    }
  },
  plugins: [typography],
};
export default config;