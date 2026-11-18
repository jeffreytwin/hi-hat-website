import type { Metadata } from "next";
import { NeighborhoodBrowser } from "@/components/Browsers";
import { PinIcon } from "@/components/Icons";
import { PageHero, SectionHeading } from "@/components/Sections";
import { getNeighborhoodLookups, getNeighborhoods } from "@/lib/data";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: `Compare ${site.community} Neighborhoods`,
  description: `Compare every neighborhood in ${site.community} by price, home type and amenities.`,
};

export default async function Page() {
  const [neighborhoods, lookups] = await Promise.all([getNeighborhoods(), getNeighborhoodLookups()]);
  return (
    <>
      <PageHero
        seed={5}
        title={`Compare ${site.community} Neighborhoods`}
        intro={
          <>
            <p>
              {site.community} is planned as a collection of unique neighborhoods &mdash; each designed
              with you and your family in mind. Every neighborhood has its own special charm,
              offering a mix of amenities, home styles and beautiful scenery.
            </p>
            <p>Use the filters below to discover the perfect {site.community} home for you.</p>
          </>
        }
      />
      <section className="container-site pb-16">
        <SectionHeading icon={<PinIcon />} title="Find Your Ideal Neighborhood" />
        <NeighborhoodBrowser neighborhoods={neighborhoods} facets={lookups.facets} full />
      </section>
    </>
  );
}
