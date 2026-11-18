import type { Listing } from "@/lib/types";

// PLACEHOLDER DATA — see src/data/neighborhoods.ts. Real listings will come
// from the MLS/IDX feed once homes exist in Hi Hat Ranch.

type Row = [
  address: string,
  neighborhood: string,
  homeType: string,
  price: number,
  beds: number,
  baths: number,
  sqft: number,
  garage: number,
];

const rows: Row[] = [
  ["4208 Longleaf Trail", "longleaf", "Single Family Residence", 612000, 3, 2, 2040, 2],
  ["4391 Wiregrass Court", "longleaf", "Single Family Residence", 845000, 4, 3, 2890, 3],
  ["836 Saddle Creek Lane", "saddle-creek", "Villa", 372500, 2, 2, 1480, 2],
  ["901 Bridle Path Way", "saddle-creek", "Townhouse", 419900, 3, 3, 1790, 1],
  ["2314 Pasture Gate Drive", "the-pastures", "Single Family Residence", 539000, 4, 3, 2410, 2],
  ["2477 Split Rail Road", "the-pastures", "Single Family Residence", 749000, 5, 4, 3620, 3],
  ["5521 Slough Overlook Court", "heron-slough", "Single Family Residence", 1395000, 4, 5, 3890, 3],
  ["5610 Rookery Point", "heron-slough", "Single Family Residence", 2250000, 5, 6, 5180, 4],
  ["1722 Windmill Green", "windmill-park", "Single Family Residence", 428000, 3, 2, 1620, 2],
  ["1759 Millwright Row", "windmill-park", "Townhouse", 389000, 3, 3, 1710, 1],
  ["3340 Hammock View Way", "oak-hammock", "Villa", 439900, 2, 2, 1560, 2],
  ["3402 Resurrection Fern Drive", "oak-hammock", "Single Family Residence", 698000, 3, 3, 2710, 3],
];

const slugify = (s: string) =>
  s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

export const listings: Listing[] = rows.map(
  ([address, neighborhood, homeType, price, beds, baths, sqft, garage], i) => ({
    slug: slugify(`${address} sarasota fl 34240`),
    address,
    city: "Sarasota",
    state: "FL",
    zip: "34240",
    price,
    beds,
    baths,
    sqft,
    garage,
    homeType,
    neighborhood,
    yearBuilt: 2027,
    lot: i % 2 ? "Preserve view" : "Lake view",
    mlsId: `SAMPLE-${1000 + i}`,
    description: `Welcome to ${address}, a ${beds}-bedroom, ${baths}-bath ${homeType.toLowerCase()} offering ${sqft.toLocaleString("en-US")} square feet of living space. The open floor plan centers on a bright great room and island kitchen that flow out to a screened lanai. Enjoy everything the neighborhood has to offer, just minutes from shopping, dining and Gulf Coast beaches.`,
    features: [
      "Island kitchen with quartz counters",
      "Screened lanai",
      "Impact-rated windows and doors",
      `${garage}-car garage`,
      "Smart-home package",
    ],
    scene: 50 + i,
  }),
);
