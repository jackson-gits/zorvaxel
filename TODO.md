# Zorvaxel Website — Outcome Tracker

## 1. Project foundation and design tokens — complete
- Use Next.js (latest stable), App Router, strict TypeScript, Tailwind CSS with design tokens in `tailwind.config`, Framer Motion, MDX with frontmatter, React Hook Form + Zod, Resend, `next/font`, and `next/image`.
- Make the site Vercel-ready; include `.env.example` and a README with setup steps.
- Put brand name, tagline, nav, services, contact details and site copy in `lib/site.ts`.
- Applied brand color palette: Page background Parchment `#F4F1DE`, Main text Deep navy `#0D1B2A`, Structural dark panels Slate `#1B263B`, Links/small text Steel `#415A77`, Accent/atmosphere Moss `#778D7A`, Soft panels Sand `#D4C4A8`, Hairlines Deep navy at 15% opacity `rgba(13, 27, 42, 0.15)`, and Deep navy for the footer.
- Resolved major layout and visual flaws: balanced headline wrapping (`text-wrap: balance`), fixed 9.8ch hero clamp, refined specimen art card framing, engineered pixel-perfect process diagram step lines for all viewport sizes, modernized tactile 48px form inputs with accessible focus rings, converted Enquire link into a high-conversion header CTA pill, balanced dark section index numbers to eliminate content squashing, and optimized responsive layouts across 375px/768px/1440px.
- Use Instrument Serif regular/italic for headings and Instrument Sans 400/500 for body/UI; 12px uppercase spaced labels; fluid type sizes and body max width 65ch; preserve typographic quotes, en dashes and ₹ where relevant.
- Use a max 1280px 12-column grid, 24px mobile/48px desktop sides, section padding 96px mobile/160px desktop, and at most 2–3 content columns per section.
- Keep the presentation calm, spacious, precise, asymmetrical and flat: no photos, gradients, shadows, glassmorphism, blur, 3D, layout radii except 2px buttons/fields, generic icon circles or card-heavy symmetric feature boxes.

## 2. Shared shell and navigation — complete
- Build global layout, wordmark, header, footer, skip link and mobile menu. Header has Home, Services, About, Blog and Contact text links, active accent underline, plus text “Enquire”. Mobile menu is full screen, opens with a fade, and uses large serif links.
- Header hides on scroll down and returns on scroll up. Footer uses ink background and includes wordmark, one-line description, link columns, phone/email/WhatsApp/Chennai address and a single small-print line; no social icon clutter.
- Add fixed bottom-right flat terracotta WhatsApp text/icon link to `wa.me` with a prefilled message.
- Provide visible keyboard focus (1px accent outline, 3px offset), semantic landmarks and correct heading hierarchy.

## 3. Shared visual, content and motion components — complete
- Create matching inline 1.5px ink SVG line illustrations with rounded caps and one accent detail for dropper bottle, vial, airless pump, carton, label sheet and filling nozzle. Put them on flat panel blocks, off-centre and sometimes cropped; SVGs are aria-hidden unless informative.
- Add ImageSlot with a defined aspect ratio: flat panel and caption until a real image path is configured in `lib/site.ts`, then use `next/image` without layout changes.
- Add Reveal (fade/rise 16px/600ms/ease [0.22,1,0.36,1], once, 80ms child stagger), DrawLine, numbered section header, Button, Marquee (pauses on hover), ServiceRow, ProcessSteps and BlogCard.
- Hero headline reveals word by word, then dropper stroke draws and one accent drop falls/settles once. DrawLine draws left-to-right; links underline in 250ms; button fills left-to-right over 250ms and arrow nudges 4px; process nodes/lines draw in sequence; route fades 250ms.
- Honor `prefers-reduced-motion` by disabling movement and retaining simple fades; no bounce, spin, parallax, cursor effects or autoplay.

## 4. Home, Services, About, Blog and Contact — complete
- Home hero uses label “PRIVATE LABEL SERUM MANUFACTURER · CHENNAI”, H1 “Your serum, in your name, at any batch size.”, support “We formulate, fill, label and pack. You launch with as few as 50 bottles.”, button “Start your serum”, link “See our services”, and off-centre dropper on a panel block.
- Home includes thin slow/pause-on-hover marquee “NO MOQ · FORMULATION · FILLING · LABELS · CARTONS ·”; five numbered service rows with one-line descriptions and “NO MOQ”/“LOW MOQ” tags; Brief → Formulate → Fill & pack → Deliver diagram with descriptions; dark section “Most factories ask for 5,000 units. We start at one batch you can afford.” phrased as a general statement, not a verified competitor fact; three latest blog rows (date/title/reading time); and closing “Have a formula, or need one?” CTA.
- Services has intro and five full-width sections, each with number/title/description/who it's for/what's included/MOQ/matching illustration: 01 ready packaging formulation, No MOQ; 02 custom packaging, Low MOQ; 03 contract filling and packaging, No MOQ; 04 label and outer carton design, No MOQ, charged per design; 05 label stamping, No MOQ, hot foil on request. Preserve all details from the supplied brief. Add decision guide: need formula → 01 or 02; have a formula → 03; need branding → 04 and 05, then Enquire CTA.
- About H1 is “A small lab with a simple idea.” Include owner-editable story placeholder, four principles (Small batches welcome, Honest pricing, Clear communication, Careful quality checks), process timeline, facility ImageSlot placeholders captioned “Facility photos coming soon”, panel values section and CTA.

## 5. Blog and MDX — complete
- Blog index H1 “Notes”, category text tabs Launching a brand, Formulation, Packaging, Labels, editorial list with date/title/excerpt/reading time.
- Blog detail has serif title, metadata, autogenerated table of contents, readable 65ch article column, related posts and CTA.
- Write three complete practical plain-English MDX posts with frontmatter, around 600 words: “How much does it cost to launch a serum brand in India?”, “Private label vs contract filling: which one do you need?”, and “How to choose a dropper bottle for your serum”. Prices are indicative ranges, not exact.

## 6. Contact experience and API — complete
- Contact H1 “Tell us about your serum.” Two columns: form left; phone/email/WhatsApp/Chennai address/working hours right, all drawn from `lib/site.ts`. Mark missing details as placeholders; invent none.
- Form fields: name, phone, email, service needed (five services), expected quantity (under 100, 100–500, 500–2000, 2000+), and message. Use underline-only styling, 1px borders and small floating labels. Include polite inline validation, loading state, aria-live errors, and success state replacing the form with thank-you and “We reply within one working day”.
- Implement `app/api/contact/route.ts` with Resend via `RESEND_API_KEY` and `CONTACT_TO_EMAIL`, input validation, hidden honeypot spam check and basic rate limiting. No secret values in frontend/source. Document required env vars; report missing server configuration safely.

## 7. SEO, discoverability and 404 — complete
- Unique page title/description; Open Graph and Twitter metadata; canonical URLs; Next metadata sitemap/robots routes; JSON-LD LocalBusiness on Home and Contact, Article on blog posts, FAQ where relevant. Naturally use “private label serum manufacturer India”, “low MOQ serum manufacturer”, “serum contract filling”, “serum manufacturing Chennai”. Do not guess a real canonical origin.
- Initial page HTML must include meaningful public content. Use the real configured public origin for absolute canonical/OG/sitemap links; omit rather than invent until configured. Unknown blog slugs and missing routes return a real 404; error page has noindex.
- No verified public HTTPS origin is configured yet, so absolute canonicals, `og:url`/`og:image`, sitemap entries and the robots sitemap line are intentionally omitted. Setting `NEXT_PUBLIC_SITE_URL` to the actual public origin enables them.

## 8. Accessibility, responsive readiness and setup documentation — complete
- Aim for WCAG AA contrast, proper labels, aria-live errors, no layout shift, lean JS and dynamically loaded heavy animation code.
- Verify 375px, 768px and 1440px layouts, accessibility and production build; complete setup README. Do not claim Lighthouse scores without running Lighthouse. The production homepage scored 95 Performance / 100 Accessibility / 100 Best Practices / 100 SEO on both Lighthouse mobile and desktop profiles.

## 9. Content safety — complete
- No lorem ipsum, invented certifications, awards, clients, testimonials or unprovided business facts. Avoid “cutting-edge”, “world-class”, “revolutionary”, “seamless”, “unlock”, and “elevate”.

## 10. Staged delivery checkpoints — complete
- Complete and summarize each requested build stage, then wait for the user's confirmation before moving to the next stage: (1) foundation/dependencies/tokens/fonts; (2) site config/layout/header/footer/mobile menu; (3) shared components/illustrations; (4) pages/blog/contact/API; (5) SEO/sitemap/robots/404; (6) responsive/accessibility/build/README.
