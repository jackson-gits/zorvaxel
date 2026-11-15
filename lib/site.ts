const configuredOrigin = process.env.NEXT_PUBLIC_SITE_URL?.trim();

function resolvePublicOrigin(value: string | undefined): string | null {
  if (!value) return null;
  try {
    const url = new URL(value);
    if (
      url.protocol !== "https:" ||
      url.username ||
      url.password ||
      url.pathname !== "/" ||
      url.search ||
      url.hash
    ) {
      return null;
    }
    return url.origin;
  } catch {
    return null;
  }
}

const publicOrigin = resolvePublicOrigin(configuredOrigin);

export const SITE = {
  name: "Zorvaxel",
  shortDescription: "Ready-formula serum branding, filling and packaging in Chennai.",
  tagline: "Your serum, in your name, at any batch size.",
  description:
    "We supply ready serum formulas, then fill, label and pack them under your brand. Start with the quantity you actually need.",
  origin: publicOrigin,
  locale: "en_IN",
  seo: {
    home: {
      title: "Private label serum manufacturer in Chennai",
      description: "Ready-formula serums filled, labelled and packed under your brand. No MOQ on most services. For founders, doctors and growing brands.",
    },
    services: {
      title: "Serum branding and filling services — no MOQ",
      description: "Ready formulas, contract filling, custom packaging, label design and stamping for serums. Start without a minimum order on most services.",
    },
    about: {
      title: "About Zorvaxel — Chennai serum lab",
      description: "A small-batch serum filling and packaging partner in Chennai, working with brands, doctors and clinics at any batch size.",
    },
    blog: {
      title: "Serum packaging and brand notes",
      description: "Plain-English notes on launching a serum brand: private label, contract filling, packaging and labels.",
    },
    contact: {
      title: "Contact — serum manufacturing enquiry",
      description: "Send a brief about your formula, quantity and packaging needs. We reply within one working day.",
    },
    notFound: {
      title: "Page not found",
      description: "This page could not be found. Return to the serum manufacturing home page.",
    },
    socialImageAlt: "A calm editorial illustration for a small-batch serum manufacturer in Chennai.",
  },
  navigation: [
    { label: "Home", href: "/" },
    { label: "Services", href: "/services" },
    { label: "About", href: "/about" },
    { label: "Blog", href: "/blog" },
  ],
  ui: {
    enquire: "Enquire",
    enquireHref: "/contact",
    menuLabelOpen: "Menu",
    menuLabelClose: "Close",
    menuOpen: "Open navigation menu",
    menuClose: "Close navigation menu",
    skipToContent: "Skip to content",
    backToHome: "Return to home",
    whatsappLabel: "WhatsApp",
    whatsappMessage:
      "Hello, I’d like to ask about serum manufacturing and packaging.",
    menuTitle: "Where would you like to go?",
    mainNavigationLabel: "Main navigation",
    mobileNavigationLabel: "Mobile navigation",
  },
  contact: {
    locationHeading: "Find us in Chennai",
    detailLabels: {
      phone: "Phone",
      email: "Email",
      whatsapp: "WhatsApp",
      address: "Chennai address",
      workingHours: "Working hours",
    },
    phone: {
      label: "[Phone number to be added]",
      href: null as string | null,
    },
    email: {
      label: "[Business email to be added]",
      href: null as string | null,
    },
    whatsapp: {
      label: "[WhatsApp number to be added]",
      number: "",
    },
    address: "[Chennai address to be added]",
    workingHours: "[Working hours to be confirmed]",
  },
  footer: {
    description:
      "Small-batch serum filling and packaging for founders, doctors and growing brands. Based in Chennai.",
    exploreLabel: "Explore",
    links: [
      { label: "Services", href: "/services" },
      { label: "About", href: "/about" },
      { label: "Notes", href: "/blog" },
      { label: "Batch Enquiry", href: "/contact" },
    ],
    copyright: "Small batches. Clear answers. Careful work.",
  },
  home: {
    hero: {
      label: "PRIVATE LABEL SERUM MANUFACTURER · CHENNAI",
      title: "Your first serum batch, without the minimum\u2011order trap.",
      supporting:
        "We supply ready-to-brand serum formulas, then fill, label and pack them for you. Start with the quantity you actually need — not the one a factory forces on you.",
      primaryAction: "Start your first batch",
      secondaryAction: "See how it works",
      spec: "30 ML · AMBER GLASS · DROPPER",
      panelNote: "01 / FIRST BATCH",
    },
    marquee: [
      "NO MOQ",
      "READY FORMULAS",
      "FILLING",
      "LABELS",
      "CARTONS",
    ],
    servicesHeading: "From ready formula to finished bottle — or just the part you need.",
    servicesLink: "All services",
    processHeading: "From first note to finished bottle.",
    processDescription: "A few clear decisions, then a finished batch you can take to market.",
    process: [
      {
        number: "01",
        title: "Brief",
        description: "Tell us what you want, your expected quantity, and whether you'll use one of our formulas or bring your own.",
      },
      {
        number: "02",
        title: "Choose or send",
        description: "Pick a ready formula from our range, or send us your own serum to fill.",
      },
      {
        number: "03",
        title: "Fill & pack",
        description: "We fill, cap, seal and pack your serum with care.",
      },
      {
        number: "04",
        title: "Deliver",
        description: "Your finished batch is labelled, packed and ready to take to market.",
      },
    ],
    noMoq: {
      label: "SMALL BATCHES WELCOME",
      title:
        "Many manufacturers set minimums in the thousands. We start at whatever you can afford to test.",
      action: "Talk to us about quantity",
    },
    journalHeading: "Notes for the first run.",
    journalLink: "All notes",
    closing: {
      title: "Have a formula already? Want to use one of ours?",
      action: "Start your first batch",
    },
  },
  services: {
    eyebrow: "WHAT WE CAN HELP WITH",
    title: "Services",
    introduction:
      "You don't need to develop a formula from scratch or commit to a factory minimum. Pick the stage you need — or use all five together.",
    detailLabels: {
      whoFor: "Who it's for",
      included: "What's included",
    },
    items: [
      {
        number: "01",
        title: "Ready formulas, your brand",
        shortDescription:
          "Choose from our ready serum formulas and we fill them into packaging we already stock. No minimum order.",
        description:
          "You don't need to develop a formula from scratch. Pick a serum from our range — brightening, hydration, barrier repair, anti-ageing — and we fill it into stocked bottles under your brand. Because the formula is ready and the packaging is in stock, there's no minimum order. Launch with a batch you can afford to test.",
        whoFor: "First-time founders who want to launch quickly. Brands validating a concept before committing to custom packaging.",
        included: [
          "Choice of ready serum formulas",
          "Filling into stocked dropper bottles",
          "Standard glass and cap options",
        ],
        moq: "No MOQ",
        illustration: "dropper",
      },
      {
        number: "02",
        title: "Custom packaging",
        shortDescription:
          "The same ready formulas, filled into packaging made to your brand. A small minimum run applies.",
        description:
          "Same ready formulas as Service 01, with packaging made for your brand: bottle colour, cap and dropper style, printing and finish. Because custom packaging has a minimum run set by the packaging supplier, a small MOQ applies — far lower than a standard contract manufacturer would ask for.",
        whoFor: "Brands ready to make their packaging their own. Clinics and doctors building a named product line.",
        included: [
          "Choice of ready serum formulas",
          "Bottle colour and finish selection",
          "Cap, dropper style and printing options",
        ],
        moq: "Low MOQ",
        illustration: "carton",
      },
      {
        number: "03",
        title: "Contract filling and packaging",
        shortDescription:
          "Bring your own ready serum. We fill it, cap it, seal it and pack it — then return the finished batch.",
        description:
          "You supply the finished serum. We take it from there: filling into dropper bottles or airless pumps, capping, sealing and packing. We don't formulate here — this is for clients who already have a formula but no filling setup. Priced per unit or per batch, so small quantities work.",
        whoFor: "Brands, doctors, dermatologists and labs with an existing formula but no filling equipment or staff.",
        included: [
          "Filling into bottles or airless pumps",
          "Capping and sealing",
          "Packing the finished batch",
        ],
        moq: "No MOQ",
        illustration: "filling-nozzle",
      },
      {
        number: "04",
        title: "Label and outer carton design",
        shortDescription:
          "Print-ready layouts for your bottle label and carton — ingredients, usage text and barcode included. Charged per design.",
        description:
          "A clean, print-ready design for your bottle label and outer carton. We handle the layout, typeset the ingredients and usage copy you supply, and place the barcode correctly for your printer. Charged as a flat fee per design — the same whether you're printing 50 or 5,000 units.",
        whoFor: "New brands without a designer. Any founder who wants one less supplier to manage.",
        included: [
          "Bottle label layout",
          "Outer carton layout",
          "Ingredients, usage and barcode placement",
        ],
        moq: "No MOQ",
        illustration: "label-sheet",
      },
      {
        number: "05",
        title: "Label stamping and application",
        shortDescription:
          "Your printed labels applied to bottles and cartons, neatly, in any quantity. Gold and silver foil stamping available.",
        description:
          "You've had labels printed. We apply them to bottles and cartons carefully, in batches of any size — no bubbles, no skew. Hot-foil stamping in gold or silver is available on request for a premium finish.",
        whoFor: "Brands that have labels ready but no equipment or staff to apply them. Any client wanting a foil finish.",
        included: [
          "Label application on bottles",
          "Label application on cartons",
          "Hot-foil stamping on request (gold or silver)",
        ],
        moq: "No MOQ",
        illustration: "label-sheet",
      },
    ],
    decisionGuide: {
      eyebrow: "NOT SURE WHERE TO START?",
      title: "Which service do you need?",
      needLabel: "Your situation",
      answerLabel: "Start here",
      rows: [
        {
          need: "I want a ready-made formula",
          answer: "Ready formulas · Services 01 & 02",
          href: "/services#service-01",
        },
        {
          need: "I already have a serum",
          answer: "Contract filling · Service 03",
          href: "/services#service-03",
        },
        {
          need: "I need label and carton design",
          answer: "Design & application · Services 04 & 05",
          href: "/services#service-04",
        },
      ],
      action: "Start your first batch",
    },
    faqHeading: "Practical questions about small-batch serum production",
    faq: [
      {
        question: "Can I really start without a minimum order quantity (MOQ)?",
        answer: "Yes. Services 01, 03, 04 and 05 have no minimum order quantity — you can launch with a test run of 50 or 100 units. Service 02 (custom packaging) carries a low MOQ because external bottle manufacturers require minimum runs for custom glass colors, but it is far lower than standard contract factories.",
      },
      {
        question: "How is pricing structured for small batches?",
        answer: "Pricing is transparent and itemized with no hidden setup fees. For ready formulas (Service 01), you pay per filled bottle. For contract filling (Service 03), you pay per unit or per filling batch. Label and carton artwork (Service 04) is a one-time fixed design fee. We provide an exact per-bottle landed quote before you commit.",
      },
      {
        question: "What are your typical turnaround and lead times?",
        answer: "For ready formulas filled into our stocked bottles (Service 01), lead time is 7 to 10 working days once your labels are approved. Contract filling of your existing serum (Service 03) takes 5 to 7 working days. Custom packaging runs (Service 02) take 3 to 4 weeks depending on the packaging supplier.",
      },
      {
        question: "What if I already have my own serum formulation?",
        answer: "Service 03 — contract filling and packaging — is built specifically for brands, dermatologists, and clinics that already have a tested formulation. You ship the bulk serum to our Chennai facility; we fill, seal, cap, lot-code, label, and pack it under cleanroom conditions.",
      },
      {
        question: "Who owns the formulation, brand rights, and IP?",
        answer: "You retain 100% ownership of your brand name, trademarks, packaging design, and customer data. If you supply your own formula (Service 03), your IP is strictly protected under non-disclosure. If you use our ready formulas (Services 01 & 02), you hold unencumbered rights to sell under your private label without royalties.",
      },
      {
        question: "Do you help with Indian cosmetic regulatory compliance and CDSCO labelling?",
        answer: "Yes. We guide you through mandatory Indian cosmetic labelling standards: ingredient declarations following international INCI nomenclature, batch numbering, manufacturing license disclosures, MRP printing, net content declarations, and safety directions.",
      },
      {
        question: "What do you need from me to provide a quote?",
        answer: "Three simple details: which type of formula you want (or whether you're supplying your own), your packaging vision (dropper bottle, airless pump, carton), and your initial batch quantity (e.g. 50, 200, 500 units).",
      },
      {
        question: "Where are you based and how do you ship finished orders?",
        answer: "Our formulation and packing facility is in Chennai. We ship nationwide across India using insured freight and express courier partners in heavy-duty protective cartons. Local brand founders are also welcome to arrange pickup directly from our facility.",
      },
    ],
  },
  about: {
    eyebrow: "A SMALL, PRACTICAL PARTNER",
    title: "We handle the production. You focus on the brand.",
    storyHeading: "Why we started",
    story:
      "[Add the owner's story here: why the lab began, who it serves, and what the team wants small skincare brands to know. Replace this note with the owner's own words.]",
    principlesHeading: "The things we won't compromise on.",
    principles: [
      {
        number: "01",
        title: "Start with what makes sense",
        description: "Most of our services have no minimum order. You shouldn't have to over-order just to get started.",
      },
      {
        number: "02",
        title: "One point of contact",
        description: "Formula, filling, labels and cartons — all co-ordinated through us. One conversation instead of four suppliers.",
      },
      {
        number: "03",
        title: "Pay only for what you need",
        description: "Come in at any stage: ready formulas, filling, design or finishing. We don't bundle what you don't need.",
      },
      {
        number: "04",
        title: "Small-batch discipline",
        description: "Small-batch work requires more attention per unit, not less. We've built our process around that.",
      },
    ],
    processHeading: "A clear route through the work.",
    processDescription: "The same four clear steps, from your first brief to a finished batch.",
    facilityHeading: "The facility",
    facilityCaption: "Facility photos coming soon",
    facilityAlt: "Facility photograph",
    facilityDetailAlt: "Facility detail photograph",
    valuesHeading: "Careful work, without the runaround.",
    valuesEyebrow: "HOW WE THINK ABOUT THE WORK",
    valuesCopy:
      "We keep the process understandable. We tell you what is ready, what needs a decision, and what can wait until your next batch.",
    closing: "Have a question about your first batch?",
    closingAction: "Start your first batch",
  },
  blog: {
    eyebrow: "PLAIN NOTES FOR FIRST-TIME FOUNDERS",
    title: "Notes",
    introduction: "No jargon. Practical answers about packaging, labels and getting your first serum batch ready to sell.",
    categories: ["Launching a brand", "Formulation", "Packaging", "Labels"],
    allCategory: "All notes",
    categoryFilterLabel: "Filter notes by topic",
    tableOfContents: "In this note",
    relatedHeading: "Keep reading",
    readingTimeSuffix: "min read",
    emptyCategory: "No notes in this category yet.",
    backToIndex: "All notes",
    closing: "Have a question about your first batch?",
  },
  contactPage: {
    eyebrow: "START WITH A CONVERSATION",
    title: "Tell us about your serum.",
    introduction:
      "Share what you're planning, what you already have, and roughly how many units you're thinking. We'll come back within one working day with a clear next step — no jargon, no sales script.",
    formHeading: "Tell us what you're planning",
    detailsHeading: "Direct lab contact & location",
    responseTime: "We reply within one working day.",
    successTitle: "Your enquiry is with us.",
    successCopy:
      "We'll review the details and come back within one working day with a clear next step.",
    labels: {
      name: "Your name",
      phone: "Phone number",
      email: "Email address",
      service: "Service needed",
      quantity: "Expected quantity",
      message: "Tell us about your serum",
      honeypot: "Leave this field empty",
    },
    placeholders: {
      name: "How should we address you?",
      phone: "Include your country code if outside India",
      email: "Where should we reply?",
      service: "Choose the help you need",
      quantity: "Select a range",
      message: "Share your formula or tell us which of our serums interests you, plus any timing or packaging questions.",
    },
    validation: {
      nameRequired: "Please enter your name.",
      nameTooLong: "Please keep your name under 100 characters.",
      phoneRequired: "Please enter a phone number we can reply to.",
      phoneInvalid: "Enter a valid phone number, including its country code if needed.",
      emailRequired: "Please enter your email address.",
      emailInvalid: "Check the email address and try again.",
      serviceRequired: "Choose the service you are asking about.",
      quantityRequired: "Choose an expected quantity range.",
      messageRequired: "Tell us a little about your serum or project.",
      messageTooShort: "Please add a little more detail (at least 10 characters).",
      messageTooLong: "Please keep your message under 2,000 characters.",
    },
    formError: "We couldn't send your enquiry just now. Please try again in a moment.",
    rateLimitError: "You've sent several enquiries in a short time. Please wait a little and try again.",
    serviceUnavailable: "Enquiries are temporarily unavailable. Please try again later.",
    noScriptError: "Please check the fields marked above and try again.",
    serviceLabel: "Service needed",
    quantityLabel: "Expected quantity",
    quantityOptions: ["Under 100", "100–500", "500–2000", "2000+"],
    submitLabel: "Send enquiry",
    submittingLabel: "Sending enquiry…",
  },
  imagePaths: {
    facility: null as string | null,
    facilityDetail: null as string | null,
  },
  notFound: {
    eyebrow: "404 · PAGE NOT FOUND",
    title: "This page isn't here.",
    description: "The address may have changed, or the page may no longer be available. You can return to the home page and find another way forward.",
    action: "Back to home",
  },
} as const;

export type SiteNavigationItem = (typeof SITE.navigation)[number];
export type SiteService = (typeof SITE.services.items)[number];

export function getWhatsAppHref(): string {
  const digits = SITE.contact.whatsapp.number.replace(/\D/g, "");
  const message = encodeURIComponent(SITE.ui.whatsappMessage);
  return digits
    ? `https://wa.me/${digits}?text=${message}`
    : `https://wa.me/?text=${message}`;
}
