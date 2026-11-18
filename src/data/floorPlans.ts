import type { FloorPlan } from "@/lib/types";

// PLACEHOLDER DATA — see src/data/neighborhoods.ts.

type Row = [
  name: string,
  builder: string,
  neighborhood: string,
  homeType: string,
  beds: number,
  baths: number,
  sqft: number,
  garage: number,
  stories: number,
  price: number,
  quickMoveIn?: string, // street address when the home is a quick move-in
];

const rows: Row[] = [
  ["Bluestem", "gulf-prairie-homes", "longleaf", "Single Family Home", 3, 2, 1860, 2, 1, 529990],
  ["Wiregrass", "gulf-prairie-homes", "longleaf", "Single Family Home", 4, 3, 2540, 3, 1, 684990, "4127 Longleaf Trail"],
  ["Sawgrass II", "ranchline-homes", "longleaf", "Single Family Home", 4, 3.5, 3310, 3, 2, 899990],
  ["Lantana", "palmetto-and-pine-builders", "saddle-creek", "Attached Villa", 2, 2, 1480, 2, 1, 349990],
  ["Coreopsis", "palmetto-and-pine-builders", "saddle-creek", "Townhome", 3, 2.5, 1790, 1, 2, 389990, "812 Saddle Creek Lane"],
  ["Firebush", "palmetto-and-pine-builders", "saddle-creek", "Townhome", 3, 2.5, 2050, 2, 2, 444990],
  ["Mustang", "ranchline-homes", "the-pastures", "Single Family Home", 3, 2, 1940, 2, 1, 469990],
  ["Palomino", "ranchline-homes", "the-pastures", "Single Family Home", 4, 3, 2680, 2, 2, 579990, "2260 Pasture Gate Drive"],
  ["Brahman Grande", "ranchline-homes", "the-pastures", "Single Family Home", 5, 4, 3820, 3, 2, 789990],
  ["Meadowlark", "gulf-prairie-homes", "the-pastures", "Single Family Home", 4, 3, 2410, 3, 1, 624990],
  ["Great Egret", "sandhill-custom-homes", "heron-slough", "Single Family Home", 4, 4.5, 3890, 3, 1, 1485000],
  ["Roseate", "sandhill-custom-homes", "heron-slough", "Single Family Home", 5, 5.5, 5240, 4, 2, 2195000],
  ["Night Heron", "gulf-prairie-homes", "heron-slough", "Single Family Home", 3, 3.5, 2960, 3, 1, 989990, "5503 Slough Overlook Court"],
  ["Aermotor", "ranchline-homes", "windmill-park", "Single Family Home", 3, 2, 1620, 2, 1, 394990],
  ["Weathervane", "ranchline-homes", "windmill-park", "Single Family Home", 4, 2.5, 2390, 2, 2, 489990],
  ["Millwright", "palmetto-and-pine-builders", "windmill-park", "Townhome", 3, 2.5, 1710, 1, 2, 381990],
  ["Live Oak", "palmetto-and-pine-builders", "oak-hammock", "Attached Villa", 2, 2, 1560, 2, 1, 414990, "3318 Hammock View Way"],
  ["Laurel Oak", "gulf-prairie-homes", "oak-hammock", "Single Family Home", 2, 2.5, 2090, 2, 1, 564990],
  ["Sand Live Oak", "gulf-prairie-homes", "oak-hammock", "Single Family Home", 3, 3, 2710, 3, 1, 729990],
];

const slugify = (s: string) =>
  s.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

export const floorPlans: FloorPlan[] = rows.map(
  ([name, builder, neighborhood, homeType, beds, baths, sqft, garage, stories, price, qmi], i) => ({
    slug: `${slugify(name)}-${neighborhood}-${builder}`,
    name,
    builder,
    neighborhood,
    homeType,
    beds,
    baths,
    sqft,
    garage,
    stories,
    price,
    quickMoveIn: Boolean(qmi),
    address: qmi,
    virtualTourUrl: i % 3 === 0 ? "#virtual-tour" : undefined,
    description: `The ${name} is a ${stories === 1 ? "single-story" : "two-story"} ${homeType.toLowerCase()} with ${beds} bedrooms, ${baths} baths and ${sqft.toLocaleString("en-US")} square feet of living space. An open great room connects the kitchen, dining area and covered lanai, and the owner's suite is tucked away for privacy.`,
    features: [
      "Open-concept great room and island kitchen",
      "Covered lanai with optional outdoor kitchen",
      `${garage}-car garage`,
      stories === 2 ? "Upstairs loft / bonus room" : "Flexible den or home office",
      "Owner's suite with walk-in closet",
      "Structural options to personalize the plan",
    ],
    scene: 20 + i,
  }),
);
