export const AMENITIES = [
  ["clubhouse", "Clubhouse"],
  ["pool", "Pool"],
  ["fitness", "Fitness Center"],
  ["spa", "Spa Services"],
  ["lifestyle", "Lifestyle Activities"],
  ["trails", "Walking Trails"],
  ["dogPark", "Dog Park"],
  ["playground", "Playground"],
  ["golf", "Golf"],
  ["tennis", "Tennis"],
  ["pickleball", "Pickleball"],
  ["bocce", "Bocce Ball"],
  ["maintenance", "Maintenance Included"],
  ["gated", "Gated"],
  ["fiftyFive", "55+ Community"],
] as const;

export type AmenityKey = (typeof AMENITIES)[number][0];

export const amenityLabel = (key: AmenityKey) =>
  AMENITIES.find(([k]) => k === key)![1];

export type Neighborhood = {
  slug: string;
  name: string;
  tagline: string;
  summary: string;
  about: string[];
  homeTypes: string[];
  sqftMin: number;
  sqftMax: number;
  priceMin: number;
  priceMax: number;
  highlight: string;
  schools: { elementary: string; middle: string; high: string };
  amenities: AmenityKey[];
  builders: string[];
  status: "Coming 2027" | "Now Selling";
  scene: number;
};

export type Builder = {
  slug: string;
  name: string;
  summary: string;
  about: string[];
  homeTypesLabel: string;
  knownFor: string;
  scene: number;
};

export type FloorPlan = {
  slug: string;
  name: string;
  builder: string; // builder slug
  neighborhood: string; // neighborhood slug
  homeType: string;
  beds: number;
  baths: number;
  sqft: number;
  garage: number;
  stories: number;
  price: number;
  quickMoveIn: boolean;
  address?: string;
  virtualTourUrl?: string;
  description: string;
  features: string[];
  scene: number;
};

export type Listing = {
  slug: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  price: number;
  beds: number;
  baths: number;
  sqft: number;
  garage: number;
  homeType: string;
  neighborhood: string; // neighborhood slug
  yearBuilt: number;
  lot: string;
  mlsId: string;
  description: string;
  features: string[];
  scene: number;
};

export type Post = {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  body: { heading?: string; text: string }[];
  scene: number;
};
