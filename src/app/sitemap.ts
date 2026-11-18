import type { MetadataRoute } from "next";
import { getBuilders, getNeighborhoods, getPosts } from "@/lib/data";
import { site } from "@/lib/site";

// Member-only listing and floor plan pages are intentionally left out.
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [neighborhoods, builders, posts] = await Promise.all([getNeighborhoods(), getBuilders(), getPosts()]);
  const paths = [
    "", "/neighborhoods", "/homes-for-sale", "/build-your-home", "/amenities", "/community-map",
    "/connect-with-a-realtor", "/contact-us", "/blog", "/privacy-policy", "/terms-of-service",
    ...neighborhoods.map((n) => `/neighborhood/${n.slug}`),
    ...builders.map((b) => `/builders/${b.slug}`),
    ...posts.map((p) => `/post/${p.slug}`),
  ];
  return paths.map((p) => ({ url: site.url + p }));
}
