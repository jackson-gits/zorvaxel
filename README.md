# Zorvaxel — Private Label Serum Manufacturer

Public enquiry and marketing website for **Zorvaxel**, a small-batch serum formulation, contract filling, and packaging partner in Chennai.

## Design System & Color Palette

Designed following restrained editorial laboratory aesthetics with verified WCAG AA / AAA accessibility contrast:

| Role | Colour | Hex / Value | Purpose | Contrast Ratio |
| :--- | :--- | :--- | :--- | :--- |
| **Page background** | Parchment | `#F4F1DE` | Primary canvas & inverted text | — |
| **Main text** | Deep navy | `#0D1B2A` | Headings, body text, footer ground | 15.31:1 on Parchment (AAA) |
| **Structural dark panels** | Slate | `#1B263B` | Dark feature bands and guide panels | 13.33:1 (Parchment text on Slate) |
| **Links & small text** | Steel | `#415A77` | Text links, meta, button hover, focus | 6.26:1 on Parchment (AA) |
| **Accent & atmosphere** | Moss | `#778D7A` | Rules, marquee band, MOQ pills, numerals | 3.15:1 graphics on Parchment; 4.87:1 navy on Moss |
| **Soft panels & illustrations** | Sand | `#D4C4A8` | Warm panels, cards, CTA bands | 10.16:1 navy on Sand; 4.15:1 steel (large text only) |
| **Hairlines** | Deep navy 15% | `rgba(13, 27, 42, 0.15)` | Subtle borders, table dividers, registration marks | Calibrated subtle depth |
| **Footer** | Deep navy | `#0D1B2A` | Deepest grounding section | 15.31:1 (Parchment text on navy) |

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
