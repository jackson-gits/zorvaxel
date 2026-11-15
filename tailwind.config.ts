import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // Token values live in app/globals.css so there is a single source of truth.
      // RGB channels allow Tailwind opacity modifiers (e.g. bg-moss/40).
      colors: {
        paper: "rgb(var(--parchment-rgb) / <alpha-value>)", // Parchment
        parchment: "rgb(var(--parchment-rgb) / <alpha-value>)",
        ink: "rgb(var(--navy-rgb) / <alpha-value>)", // Deep navy (main text)
        navy: "rgb(var(--navy-rgb) / <alpha-value>)",
        "ink-soft": "rgb(var(--slate-rgb) / <alpha-value>)", // Slate (dark panels)
        slate: "rgb(var(--slate-rgb) / <alpha-value>)",
        accent: "rgb(var(--moss-rgb) / <alpha-value>)", // Moss (rules, bands, detail)
        moss: "rgb(var(--moss-rgb) / <alpha-value>)",
        "accent-ink": "rgb(var(--steel-rgb) / <alpha-value>)", // Steel (links, small text)
        steel: "rgb(var(--steel-rgb) / <alpha-value>)",
        sand: "rgb(var(--sand-rgb) / <alpha-value>)",
        sage: "rgb(var(--moss-rgb) / <alpha-value>)",
        panel: "rgb(var(--sand-rgb) / 0.55)", // Warm sand panels
        "panel-tint": "rgb(var(--moss-rgb) / 0.14)",
        "panel-solid": "var(--panel-solid)",
        line: "rgb(var(--navy-rgb) / 0.15)", // Hairlines: navy at 15%
        muted: "var(--muted)", // Steel shade (7.4:1 on Parchment)
        footer: "var(--footer-bg)",
      },
      fontFamily: {
        display: ["var(--font-instrument-serif)", "Georgia", "serif"],
        sans: ["var(--font-instrument-sans)", "Arial", "sans-serif"],
      },
      fontSize: {
        display: ["clamp(3.5rem, 8vw, 8rem)", { lineHeight: "1.02", letterSpacing: "-0.02em" }],
        heading: ["clamp(2.25rem, 5vw, 4.5rem)", { lineHeight: "1.08", letterSpacing: "-0.015em" }],
        subheading: ["clamp(1.5rem, 2.3vw, 2rem)", { lineHeight: "1.15", letterSpacing: "-0.01em" }],
      },
      maxWidth: {
        reading: "65ch",
        page: "1280px",
      },
      transitionTimingFunction: {
        editorial: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
