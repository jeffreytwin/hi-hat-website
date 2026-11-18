import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    // Keep the site out of search engines while it still shows placeholder data.
    rules: site.previewData
      ? { userAgent: "*", disallow: "/" }
      : { userAgent: "*", allow: "/", disallow: ["/login", "/auth/"] },
    sitemap: `${site.url}/sitemap.xml`,
  };
}
