/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#FFFDF5",
        foreground: "#1E293B",
        accent: "#8B5CF6",
        secondary: "#F472B6",
        tertiary: "#FBBF24",
        quaternary: "#34D399",
        border: "#E2E8F0",
        card: "#FFFFFF",
        muted: {
          DEFAULT: "#F1F5F9",
          foreground: "#64748B",
        }
      },
      fontFamily: {
        outfit: ["Outfit", "sans-serif"],
        plus: ["Plus Jakarta Sans", "sans-serif"],
      },
      borderRadius: {
        sm: "8px",
        md: "16px",
        lg: "24px",
      },
      boxShadow: {
        'hard': '4px 4px 0px 0px #1E293B',
        'hard-lg': '8px 8px 0px 0px #1E293B',
        'hard-accent': '8px 8px 0px 0px #8B5CF6',
        'hard-secondary': '8px 8px 0px 0px #F472B6',
        'hard-tertiary': '8px 8px 0px 0px #FBBF24',
      }
    },
  },
  plugins: [],
};
