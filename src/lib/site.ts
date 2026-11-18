// Central site configuration. Everything brand- or contact-related lives here
// so it can be changed in one place.

export const site = {
  name: "Life in Hi Hat Ranch",
  community: "Hi Hat Ranch",
  tagline: "Your ultimate independent guide to Hi Hat Ranch",
  region: "Sarasota, Florida",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",

  // While true, a ribbon is shown site-wide explaining that neighborhoods,
  // floor plans and listings are placeholders. Set
  // NEXT_PUBLIC_PREVIEW_DATA=false once real data replaces src/data/*.
  previewData: process.env.NEXT_PUBLIC_PREVIEW_DATA !== "false",

  agent: {
    name: "Lynn Brown",
    title: "REALTOR® (licensed in the state of Florida)",
    brokerage: "Coldwell Banker Realty",
    phone: "(941) 219-5661",
    phoneHref: "tel:+19412195661",
    address: "8334 Market Street, Lakewood Ranch, FL 34202",
    adaPhone: "920-410-8778",
  },

  hours: [
    ["Monday - Friday", "8:00am - 8:00pm"],
    ["Saturday", "8:00am - 8:00pm"],
    ["Sunday", "8:00am - 8:00pm"],
  ],

  team: [
    { name: "Lynn Brown", phone: "(920) 410-8778" },
    { name: "Ricardo Ortiz", phone: "(941) 315-5799" },
    { name: "Dina Shogren", phone: "(720) 697-9081" },
  ],

  nav: [
    { label: "Buy", href: "/homes-for-sale" },
    { label: "Build", href: "/build-your-home" },
    { label: "Neighborhoods", href: "/neighborhoods" },
    { label: "Amenities", href: "/amenities" },
    { label: "Contact Us", href: "/contact-us" },
  ],
} as const;
