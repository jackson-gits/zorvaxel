# Zorvaxel Website — Implementation Plan

## Scope and approach

Build a public, enquiry-focused website for Zorvaxel, a private-label serum manufacturer and contract filling partner in Chennai. Use the user's selected stack: Next.js App Router, strict TypeScript, Tailwind CSS, Framer Motion, MDX with frontmatter, React Hook Form, Zod, Resend, next/font and next/image. Deploy readiness targets Vercel. Contact details that have not been supplied remain explicitly marked placeholders in the central site configuration; API secrets are supplied by deployment environment variables and never committed.

Public pages will be server-rendered or statically rendered for meaningful initial HTML and route-specific metadata. The blog will be sourced from MDX files, with category, reading-time, table-of-contents and related-post data. The contact form will validate client-side and submit to a Next.js route handler, which verifies inputs, rejects the honeypot, applies a lightweight in-memory rate limit, and sends through Resend when configured. Responses will not expose secret configuration.

## Project structure

- `app/`: App Router layout and Home, Services, About, Blog index/detail, Contact, contact API, sitemap, robots and not-found routes.
- `components/`: shared header/footer, navigation, buttons, editorial section and service components, form, animation helpers, diagrams and consistent inline SVG illustrations.
- `components/illustrations/`: dropper, vial, pump, carton, label sheet and filling nozzle illustrations.
- `content/blog/`: three authored MDX starter articles with frontmatter.
- `lib/site.ts`: single editable brand, navigation, service, contact, copy and optional image-path configuration.
- `lib/blog.ts` and `lib/animations.ts`: MDX loading/metadata helpers and reusable motion settings.
- `public/`: route manifest and small static assets only; no stock photography.

## Design system

### Design directions considered
- Warm lab-notebook editorial — 0.08.
- Modern botanical catalogue — 0.04.
- Industrial monochrome manual — 0.03.

**Chosen: warm lab-notebook editorial**, as specified by the user.

- **Design movement:** restrained editorial print design with the precision of a small-batch laboratory notebook.
- **Core principles:** calm whitespace; measured typography; transparent operational detail; consistent, simple line art.
- **Color philosophy:** paper and warm mineral neutrals make the experience approachable; near-black carries factual content; restrained terracotta marks key actions only. No gradients, shadows, blue/purple, neon or glass effects.
- **Layout paradigm:** broad left-aligned editorial bands with asymmetrical content placement, hanging section numbers, thin rules, and one or two purposeful columns rather than repeated boxed cards.
- **Signature elements:** large serif section numerals; tiny batch/spec labels; fine line-art packaging diagrams on flat panel fields.
- **Interaction philosophy:** clear labels and direct paths to enquiry; motion must clarify sequence or draw attention quietly, never delay access to content.
- **Animation:** restrained 600ms reveal/rise, 80ms child stagger, line drawing, one controlled hero liquid drop, short link/button states, scroll-aware header and soft route fade; honor reduced-motion preferences and avoid parallax, bounce, spin and autoplay.
- **Typography system:** Instrument Serif regular/italic for editorial headings; Instrument Sans 400/500 for body and UI; fluid scales and line lengths per the brief.
- **Brand essence:** a careful Chennai serum partner that makes small first runs possible; practical, candid, precise.
- **Brand voice:** plain-English, brief and specific. Examples: “We formulate, fill, label and pack.” “Start with a batch you can afford.”
- **Wordmark & logo:** a quiet typographic wordmark with a small measured droplet/line mark; no badge, medallion or default icon-in-circle.
- **Signature brand color:** muted terracotta `#B5532F`, used sparingly for emphasis and actions.

## Stage sequence

1. Initialize the app foundation, install dependencies, and configure Tailwind design tokens and Instrument fonts. Stop for user confirmation.
2. Build `lib/site.ts`, global layout, header, footer and mobile menu. Stop for confirmation.
3. Build shared buttons, section headers, service/process/blog components, motion helpers, image slots, marquee and line illustrations. Stop for confirmation.
4. Build Home, Services, About, Blog/MDX and Contact/API routes. Stop for confirmation.
5. Add route-specific SEO, structured data, sitemap, robots and not-found handling. Stop for confirmation.
6. Review responsive layouts at 375/768/1440px, accessibility and production build; complete README and setup notes. Stop for confirmation.

## Constraints

Respect all detailed page copy, service descriptions, fields, selectable quantity ranges, animations, accessibility, metadata, anti-AI-look and copy restrictions in the supplied brief. Do not invent business address, phone, team, certifications, awards, clients or testimonials. Use supplied pale-paper, panel, ink, muted, line and terracotta colors. Configure a real site origin only when provided; do not derive canonical/social URLs from an internal request host. API delivery depends on `RESEND_API_KEY` and `CONTACT_TO_EMAIL`, represented only as environment-variable names in documentation.
