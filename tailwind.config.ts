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
        paper: "#F2EDE1", // Cannoli Cream
        "cannoli-cream": "#F2EDE1",
        ink: "#1F3B34", // Pine Grove (Main text, dark sections)
        "pine-grove": "#1F3B34",
        accent: "#C86A4A", // Terracotta Clay (Primary accent: buttons, key details)
        "terracotta-clay": "#C86A4A",
        "accent-ink": "#A64A2B", // Darker terracotta (Accent for links and small text)
        "dark-terracotta": "#A64A2B",
        sage: "#A3B18A", // Sage Whisper
        panel: "rgba(163, 177, 138, 0.32)", // Soft panels, illustration backgrounds (lighter tint ~32%)
        "panel-tint": "rgba(163, 177, 138, 0.20)",
        "panel-solid": "#dce2d4",
        line: "rgba(31, 59, 52, 0.15)", // Hairlines: Pine Grove at 15% opacity
        muted: "#435E57", // Harmonious Pine Grove tint (6.2:1 contrast against Cannoli Cream)
        "blue-granite": "#2F3E51", // Optional for footer
        footer: "#2F3E51",
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
