# Zorvaxel — Private Label Serum Manufacturer

Public enquiry and marketing website for **Zorvaxel**, a small-batch serum formulation, contract filling, and packaging partner in Chennai.

## Design System & Color Palette

Designed following restrained editorial laboratory aesthetics with verified WCAG AA / AAA accessibility contrast:

| Role | Colour | Hex / Value | Purpose | Contrast Ratio |
| :--- | :--- | :--- | :--- | :--- |
| **Page background** | Cannoli Cream | `#F2EDE1` | Primary canvas & light surfaces | — |
| **Main text & dark sections** | Pine Grove | `#1F3B34` | Headings, body text, dark feature bands | 10.37:1 on Cannoli Cream |
| **Primary accent** | Terracotta Clay | `#C86A4A` | Interactive buttons, key UI details | 3.2:1 (Large text / UI components) |
| **Accent for links & small text** | Darker terracotta | `#A64A2B` | Text links, active indicators, small accents | 4.94:1 on Cannoli Cream (WCAG AA) |
| **Soft panels & illustrations** | Sage Whisper | `#A3B18A` (`rgba(163, 177, 138, 0.32)`) | Illustration backdrops, specimen cards, guide panels | 8.08:1 (Pine Grove text on tint) |
| **Hairlines** | Pine Grove 15% | `rgba(31, 59, 52, 0.15)` | Subtle borders, table dividers, registration marks | Calibrated subtle depth |
| **Footer** | Blue Granite | `#2F3E51` | Grounding foundation section | 9.32:1 (Cannoli text on Blue Granite) |

## Tech Stack

- **Framework:** Next.js 16 (App Router with Turbopack)
- **Language:** TypeScript 5.9 (Strict mode)
- **Styling:** Tailwind CSS 3.4 & Custom CSS tokens
- **Typography:** Instrument Serif (Display/Headings) & Instrument Sans (Body/UI)
- **Animation:** Framer Motion 14 with `prefers-reduced-motion` safety
- **Forms & Validation:** React Hook Form & Zod
- **Content:** MDX with Frontmatter (`gray-matter`, `next-mdx-remote`)
- **Email:** Resend API integration with honeypot spam protection

## Getting Started

```bash
# Install dependencies
pnpm install

# Start local development server
pnpm dev

# Type check
pnpm typecheck

# Production build
pnpm build
```
