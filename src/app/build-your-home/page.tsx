import type { Metadata } from "next";
import Link from "next/link";
import { FloorPlanBrowser } from "@/components/Browsers";
import { PlanIcon } from "@/components/Icons";
import { PageHero, SectionHeading } from "@/components/Sections";
import { getBuilders, getFloorPlans, getNameMaps, getNeighborhoodLookups } from "@/lib/data";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: `Build Your Home in ${site.community}`,
  description: `Compare new construction floor plans and builders in ${site.community}. Filter by builder, price, bedrooms and neighborhood amenities.`,
};

export default async function Page() {
  const [plans, names, lookups, builders] = await Promise.all([
    getFloorPlans(), getNameMaps(), getNeighborhoodLookups(), getBuilders(),
  ]);
  return (
    <>
      <PageHero
        seed={10}
        kind="home"
        title={`Build Your Home in ${site.community}`}
        intro={
          <p>
            We make the process of building in {site.community} simple and straightforward. As buyer
            representatives, we&rsquo;ll help you through the process from floor plan and builder
            selection all the way to the closing table.
          </p>
        }
      />
      <section className="container-site pb-14">
        <SectionHeading
          icon={<PlanIcon />}
          title="Find Your Floor Plan"
          sub="With plenty of floor plans and builders to choose from, there's an option that's perfect for you. Use the filters below to find your floor plan."
        />
        <FloorPlanBrowser
          plans={plans}
          names={names}
          neighborhoodAmenities={lookups.amenities}
          filters={["homeType", "beds", "builder", "garage", "price", "amenity", "neighborhood"]}
          pageSize={9}
        />
      </section>
      <section className="bg-brand-cream py-12">
        <div className="container-site">
          <SectionHeading title={`Builders in ${site.community}`} />
          <ul className="mt-6 grid gap-4 sm:grid-cols-2">
            {builders.map((b) => (
              <li key={b.slug}>
                <Link href={`/builders/${b.slug}`} className="card block h-full p-5">
                  <h3 className="heading text-[21px]">{b.name}</h3>
                  <p className="mt-1 text-[13.5px]">{b.summary}</p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
