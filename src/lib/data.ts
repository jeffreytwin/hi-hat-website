// Data access layer. Every page reads through these functions, so swapping
// the bundled files in src/data for a database or an MLS/IDX feed later is a
// change to this one file.

import { neighborhoods } from "@/data/neighborhoods";
import { builders } from "@/data/builders";
import { floorPlans } from "@/data/floorPlans";
import { listings } from "@/data/listings";
import { posts } from "@/data/posts";
import { AMENITIES } from "@/lib/types";

export async function getNeighborhoods() {
  return [...neighborhoods].sort((a, b) => a.name.localeCompare(b.name));
}
export async function getNeighborhood(slug: string) {
  return neighborhoods.find((n) => n.slug === slug);
}

export async function getBuilders() {
  return [...builders].sort((a, b) => a.name.localeCompare(b.name));
}
export async function getBuilder(slug: string) {
  return builders.find((b) => b.slug === slug);
}

export async function getFloorPlans() {
  return floorPlans;
}
export async function getFloorPlan(slug: string) {
  return floorPlans.find((p) => p.slug === slug);
}

export async function getListings() {
  return listings;
}
export async function getListing(slug: string) {
  return listings.find((l) => l.slug === slug);
}

export async function getPosts() {
  return [...posts].sort((a, b) => b.date.localeCompare(a.date));
}
export async function getPost(slug: string) {
  return posts.find((p) => p.slug === slug);
}

/** slug -> display name maps used by cards and filters. */
export async function getNameMaps() {
  return {
    neighborhoods: Object.fromEntries(neighborhoods.map((n) => [n.slug, n.name])),
    builders: Object.fromEntries(builders.map((b) => [b.slug, b.name])),
  };
}
export type NameMaps = Awaited<ReturnType<typeof getNameMaps>>;

/** Per-neighborhood lookups the filter UIs need. */
export async function getNeighborhoodLookups() {
  const label = Object.fromEntries(AMENITIES) as Record<string, string>;
  const amenities = Object.fromEntries(neighborhoods.map((n) => [n.slug, n.amenities]));
  const amenityLabels = Object.fromEntries(
    neighborhoods.map((n) => [n.slug, n.amenities.map((a) => label[a])]),
  );
  const facets = Object.fromEntries(
    neighborhoods.map((n) => {
      const homes = [
        ...floorPlans.filter((p) => p.neighborhood === n.slug),
        ...listings.filter((l) => l.neighborhood === n.slug),
      ];
      return [
        n.slug,
        {
          beds: [...new Set(homes.map((h) => h.beds))],
          baths: [...new Set(homes.map((h) => Math.floor(h.baths)))],
          garages: [...new Set(homes.map((h) => h.garage))],
        },
      ];
    }),
  );
  return { amenities, amenityLabels, facets };
}
