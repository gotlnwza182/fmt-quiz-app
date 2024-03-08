import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",

        "light-pattern-desktop":
          "url('/images/pattern-background-desktop-light.svg')",
        "dark-pattern-desktop":
          "url('/images/pattern-background-desktop-dark.svg')",
        "light-pattern-mobile":
          "url('/images/pattern-background-mobile-light.svg')",
        "dark-pattern-mobile":
          "url('/images/pattern-background-mobile-dark.svg')",
        "light-pattern-tablet":
          "url('/images/pattern-background-tablet-light.svg')",
        "dark-pattern-tablet":
          "url('/images/pattern-background-tablet-dark.svg')",
      },
      colors: {
        "p-Purple": "#A729F5",
        "Dark-Navy": "#313E51",
        "Gray-Navy": "#626C7F",
        "Light-Gray": "#F4F6FA",
        "p-Navy": "#3B4D66",
        "Light-Bluish": "#ABC1E1",
        "green-design": "#26D782",
        "p-Red": "#EE5454",
      },
    },
  },
  darkMode: "selector",
  plugins: [],
};
export default config;
