import type { Neighborhood } from "@/lib/types";

// PLACEHOLDER DATA. Hi Hat Ranch neighborhoods have not been announced yet.
// These entries exist so the site can be designed and tested end to end;
// replace them with real neighborhoods as they are released.

const schools = {
  elementary: "To be announced",
  middle: "To be announced",
  high: "To be announced",
};

export const neighborhoods: Neighborhood[] = [
  {
    slug: "longleaf",
    name: "Longleaf",
    tagline:
      "Step into Longleaf - a gated enclave of single-family homes set among pine flatwoods and preserved pasture.",
    summary:
      "Longleaf is a gated neighborhood of single-family homes with a clubhouse, resort-style pool, pickleball and miles of trails winding through preserved pine flatwoods.",
    about: [
      "Longleaf is planned as one of the first gated neighborhoods in Hi Hat Ranch, offering single-family homes on 50- and 60-foot homesites. Many homesites back to lakes or preserve, and every home is within a short walk of the neighborhood trail loop.",
      "Residents will enjoy a private amenity center with a resort-style pool, fitness center and pickleball courts, plus a full-time lifestyle director who keeps the calendar full year-round.",
    ],
    homeTypes: ["Single Family"],
    sqftMin: 1800,
    sqftMax: 3400,
    priceMin: 520000,
    priceMax: 940000,
    highlight: "Lake & Preserve Homesites",
    schools,
    amenities: ["clubhouse", "pool", "fitness", "lifestyle", "trails", "dogPark", "pickleball", "gated"],
    builders: ["gulf-prairie-homes", "ranchline-homes"],
    status: "Coming 2027",
    scene: 1,
  },
  {
    slug: "saddle-creek",
    name: "Saddle Creek",
    tagline:
      "Saddle Creek brings low-maintenance villas and townhomes to the heart of Hi Hat Ranch.",
    summary:
      "Saddle Creek offers low-maintenance paired villas and townhomes close to the future village center, with a community pool, playground and dog park.",
    about: [
      "Saddle Creek is designed for buyers who want a newer home without the upkeep. Paired villas and two-story townhomes sit along tree-lined streets, with lawn care handled by the association.",
      "A community pool, playground and dog park anchor the neighborhood, and the future village center is planned just down the road.",
    ],
    homeTypes: ["Attached Villa", "Townhome"],
    sqftMin: 1400,
    sqftMax: 2100,
    priceMin: 340000,
    priceMax: 480000,
    highlight: "Maintenance-Included Living",
    schools,
    amenities: ["pool", "trails", "dogPark", "playground", "maintenance"],
    builders: ["palmetto-and-pine-builders"],
    status: "Coming 2027",
    scene: 2,
  },
  {
    slug: "the-pastures",
    name: "The Pastures",
    tagline:
      "The Pastures is a family-friendly neighborhood with room to grow and amenities for every age.",
    summary:
      "The Pastures is a family-friendly neighborhood of one- and two-story homes with a splash pad, playgrounds, sports courts and a large amenity lawn.",
    about: [
      "The Pastures is planned with growing families in mind. One- and two-story single-family homes offer flexible floor plans with lofts, home offices and three-car garage options.",
      "The amenity campus includes a clubhouse, resort pool with splash pad, playground, tennis and pickleball courts, and an event lawn for neighborhood gatherings.",
    ],
    homeTypes: ["Single Family"],
    sqftMin: 1900,
    sqftMax: 3900,
    priceMin: 460000,
    priceMax: 820000,
    highlight: "Family-Friendly Amenities",
    schools,
    amenities: ["clubhouse", "pool", "fitness", "lifestyle", "trails", "dogPark", "playground", "tennis", "pickleball"],
    builders: ["gulf-prairie-homes", "palmetto-and-pine-builders", "ranchline-homes"],
    status: "Coming 2027",
    scene: 3,
  },
  {
    slug: "heron-slough",
    name: "Heron Slough",
    tagline:
      "Heron Slough is an exclusive gated enclave of custom and semi-custom estate homes.",
    summary:
      "Heron Slough is a high-end gated enclave featuring custom and semi-custom estate homes on oversized homesites overlooking wetlands and open water.",
    about: [
      "Heron Slough is planned as the luxury address in Hi Hat Ranch. Custom and semi-custom homes sit on oversized homesites, many with long water and preserve views.",
      "A private clubhouse, resort pool, fitness studio, spa services and pickleball courts are reserved for residents, and the neighborhood connects directly to the ranch-wide trail network.",
    ],
    homeTypes: ["Single Family"],
    sqftMin: 2800,
    sqftMax: 5600,
    priceMin: 950000,
    priceMax: 2400000,
    highlight: "Larger Lots & Custom Builds",
    schools,
    amenities: ["clubhouse", "pool", "fitness", "spa", "lifestyle", "trails", "pickleball", "bocce", "gated"],
    builders: ["sandhill-custom-homes", "gulf-prairie-homes"],
    status: "Coming 2027",
    scene: 4,
  },
  {
    slug: "windmill-park",
    name: "Windmill Park",
    tagline:
      "Windmill Park pairs attainable new homes with a walkable park at its center.",
    summary:
      "Windmill Park is built around a central green with attainable single-family homes and townhomes, a pool, playground and walking paths.",
    about: [
      "Windmill Park is organized around a central park, so green space is never more than a block away. Single-family homes and townhomes are offered at some of the most approachable prices in Hi Hat Ranch.",
      "Light amenities keep fees low: a community pool with cabana, playground, and paths that link to the greater trail system.",
    ],
    homeTypes: ["Single Family", "Townhome"],
    sqftMin: 1500,
    sqftMax: 2700,
    priceMin: 380000,
    priceMax: 610000,
    highlight: "Central Neighborhood Park",
    schools,
    amenities: ["pool", "trails", "playground", "dogPark"],
    builders: ["ranchline-homes", "palmetto-and-pine-builders"],
    status: "Coming 2027",
    scene: 5,
  },
  {
    slug: "oak-hammock",
    name: "Oak Hammock",
    tagline:
      "Oak Hammock is a 55+ gated community with resort-style amenities and a full social calendar.",
    summary:
      "Oak Hammock is a gated 55+ community of villas and single-family homes with a clubhouse, pool, fitness center, pickleball, bocce and a full-time lifestyle director.",
    about: [
      "Oak Hammock is planned as the active-adult neighborhood in Hi Hat Ranch. Single-story villas and single-family homes are designed for easy living, with exterior maintenance included.",
      "The clubhouse is the social hub, with a resort pool, fitness center, pickleball and bocce courts, and a lifestyle director planning events throughout the year.",
    ],
    homeTypes: ["Attached Villa", "Single Family"],
    sqftMin: 1500,
    sqftMax: 2800,
    priceMin: 410000,
    priceMax: 760000,
    highlight: "55+ Resort-Style Living",
    schools,
    amenities: ["clubhouse", "pool", "fitness", "spa", "lifestyle", "trails", "dogPark", "tennis", "pickleball", "bocce", "maintenance", "gated", "fiftyFive"],
    builders: ["palmetto-and-pine-builders", "gulf-prairie-homes"],
    status: "Coming 2027",
    scene: 6,
  },
];
