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
  shortDescription: "Private label serum manufacturing and contract filling in Chennai.",
  tagline: "Your serum, in your name, at any batch size.",
  description:
    "We formulate, fill, label and pack serums for startups and small brands. Launch with as few as 50 bottles.",
  origin: publicOrigin,
  locale: "en_IN",
  seo: {
    home: {
      title: "Private label serum manufacturer in Chennai",
      description: "Small-batch serum formulation, filling, labels and packaging for startups and growing skincare brands in Chennai.",
    },
    services: {
      title: "Low-MOQ serum manufacturing services",
      description: "Private label formulation, custom packaging, contract filling, labels and small-batch serum finishing in Chennai.",
    },
    about: {
      title: "About the Chennai serum lab",
      description: "Meet a small-batch serum manufacturing and contract filling partner in Chennai, and learn how the team works with emerging skincare brands.",
    },
    blog: {
      title: "Serum formulation and packaging notes",
      description: "Plain-English notes on launching a serum brand, private label, contract filling, formulation and packaging.",
    },
    contact: {
      title: "Contact a serum manufacturer in Chennai",
      description: "Tell the Chennai serum manufacturing team about your formula, service needs and expected batch size.",
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
    { label: "Contact", href: "/contact" },
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
      "A small-batch serum manufacturing and contract filling partner for emerging skincare brands.",
    exploreLabel: "Explore",
    links: [
      { label: "Services", href: "/services" },
      { label: "About", href: "/about" },
      { label: "Notes", href: "/blog" },
      { label: "Contact", href: "/contact" },
    ],
    copyright: "Small batches. Clear answers. Careful work.",
  },
  home: {
    hero: {
      label: "PRIVATE LABEL SERUM MANUFACTURER · CHENNAI",
      title: "Your serum, in your name, at any batch size.",
      supporting:
        "We formulate, fill, label and pack. You launch with as few as 50 bottles.",
      primaryAction: "Start your serum",
      secondaryAction: "See our services",
      spec: "30 ML · AMBER GLASS · DROPPER",
      panelNote: "01 / FIRST BATCH",
    },
    marquee: [
      "NO MOQ",
      "FORMULATION",
      "FILLING",
      "LABELS",
      "CARTONS",
    ],
    servicesHeading: "A small run, done properly.",
    servicesLink: "All services",
    processHeading: "From first note to finished bottle.",
    processDescription: "A few clear decisions, then a finished batch you can take to market.",
    process: [
      {
        number: "01",
        title: "Brief",
        description: "Tell us what you have in mind and the quantity you need.",
      },
      {
        number: "02",
        title: "Formulate",
        description: "Choose a ready formula or work through a new one with us.",
      },
      {
        number: "03",
        title: "Fill & pack",
        description: "We fill, label and pack your serum with care.",
      },
      {
        number: "04",
        title: "Deliver",
        description: "Your finished batch is ready to take to market.",
      },
    ],
    noMoq: {
      label: "SMALL BATCHES WELCOME",
      title:
        "Most factories ask for 5,000 units. We start at one batch you can afford.",
      action: "Talk to us about quantity",
    },
    journalHeading: "Notes for the first run.",
    journalLink: "All notes",
    closing: {
      title: "Have a formula, or need one?",
      action: "Enquire with us",
    },
  },
  services: {
    eyebrow: "WHAT WE CAN HELP WITH",
    title: "Services",
    introduction:
      "Choose the help you need, from a ready-to-fill first batch to finishing and packaging a formula you already have.",
    detailLabels: {
      whoFor: "Who it's for",
      included: "What's included",
    },
    items: [
      {
        number: "01",
        title: "Formulation with ready packaging",
        shortDescription:
          "A serum formula filled into packaging we already stock, such as a 30 ml dropper bottle.",
        description:
          "We create the serum formula and fill it into packaging we already stock, such as 30 ml dropper bottles. Nothing custom needs to be produced, so you can order small.",
        whoFor: "Startups testing a first product.",
        included: [
          "Serum formulation",
          "Filling into stocked packaging",
          "Standard bottle and dropper options",
        ],
        moq: "No MOQ",
        illustration: "dropper",
      },
      {
        number: "02",
        title: "Custom packaging",
        shortDescription:
          "A formula and package selected around your brand, with a small minimum run.",
        description:
          "The same formulation service, with packaging made for your brand: bottle colour, cap and dropper style, printing and finish. Custom packaging needs a small minimum run.",
        whoFor: "Brands ready to make their packaging their own.",
        included: [
          "Serum formulation",
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
          "Bring a ready serum; we fill, cap, seal, pack and return it finished.",
        description:
          "You bring your own ready serum. We fill it into bottles or airless pumps, cap, seal and pack it, then return it finished.",
        whoFor: "Brands, doctors and labs with a formula but no filling setup.",
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
          "Clear layouts for your bottle label and carton, charged per design.",
        description:
          "We lay out your branding, ingredients and usage text, and barcode placement for the bottle label and outer carton. This is charged per design, not per quantity.",
        whoFor: "Founders preparing product information and packaging artwork.",
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
        title: "Label stamping",
        shortDescription:
          "Finished labels applied to bottles and cartons in small quantities.",
        description:
          "We apply finished labels to bottles and cartons in small quantities. Hot-foil stamping is available on request.",
        whoFor: "Brands that need careful finishing for a small batch.",
        included: [
          "Label application on bottles",
          "Label application on cartons",
          "Hot-foil stamping on request",
        ],
        moq: "No MOQ",
        illustration: "label-sheet",
      },
    ],
    decisionGuide: {
      eyebrow: "A SIMPLE START",
      title: "Which service do I need?",
      needLabel: "What you need",
      answerLabel: "Start here",
      rows: [
        { need: "I need a formula", answer: "01 or 02" },
        { need: "I have a formula", answer: "03" },
        { need: "I need branding", answer: "04 and 05" },
      ],
      action: "Tell us what you need",
    },
    faqHeading: "A few practical questions",
    faq: [
      {
        question: "Can I start with a small batch?",
        answer: "Services marked No MOQ are available without a minimum order quantity for that service. Custom packaging is marked Low MOQ because the packaging choice needs a small minimum. Share your planned quantity so we can discuss the right option.",
      },
      {
        question: "What if I already have a serum formula?",
        answer: "Contract filling and packaging is for brands, doctors and labs with a ready serum but no filling setup. We can fill it into bottles or airless pumps, cap, seal and pack it, then return the finished batch.",
      },
      {
        question: "What if I need a formula?",
        answer: "Choose formulation with ready packaging when stocked packaging suits your first run, or ask about custom packaging if you need bottle colour, a particular cap or printing for your brand.",
      },
    ],
  },
  about: {
    eyebrow: "A SMALL, PRACTICAL PARTNER",
    title: "A small lab with a simple idea.",
    storyHeading: "Why we started",
    story:
      "[Add the owner's story here: why the lab began, who it serves, and what the team wants small skincare brands to know. Replace this note with the owner's own words.]",
    principlesHeading: "How we work",
    principles: [
      {
        number: "01",
        title: "Small batches welcome",
        description: "A first run can be small while you learn what customers want.",
      },
      {
        number: "02",
        title: "Honest pricing",
        description: "We explain what affects the quote before work begins.",
      },
      {
        number: "03",
        title: "Clear communication",
        description: "You know what we need from you and what happens next.",
      },
      {
        number: "04",
        title: "Careful quality checks",
        description: "We check the details through filling, finishing and packing.",
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
  },
  blog: {
    eyebrow: "PLAIN NOTES FOR THE FIRST RUN",
    title: "Notes",
    introduction: "Practical answers on formulation, packaging and getting a first serum batch ready.",
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
      "Share what you are planning, what you already have, and the quantity you are considering. We will help you find the right next step.",
    formHeading: "A few details to get started",
    detailsHeading: "Talk to the lab",
    responseTime: "We reply within one working day.",
    successTitle: "Thank you for getting in touch.",
    successCopy:
      "Your enquiry is with us. We will review the details and reply within one working day with a clear next step.",
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
      message: "Share your formula, idea, and any timing or packaging questions.",
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
