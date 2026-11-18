import type { Metadata } from "next";
import { NeighborhoodBrowser } from "@/components/Browsers";
import { AmenityCardIcon, AmenityIcon, PinIcon } from "@/components/Icons";
import { Scene } from "@/components/Scene";
import { PageHero, SectionHeading } from "@/components/Sections";
import { getNeighborhoods } from "@/lib/data";
import { site } from "@/lib/site";
import { AMENITIES } from "@/lib/types";

export const metadata: Metadata = {
  title: `${site.community} Amenities`,
  description: `Pools, clubhouses, trails, pickleball and more. Compare amenities across every ${site.community} neighborhood.`,
};

export default async function Page() {
  const neighborhoods = await getNeighborhoods();
  return (
    <>
      <PageHero
        seed={9}
        kind="land"
        title="Amenities"
        intro={
          <>
            <p>
              {site.community}&rsquo;s planned amenities make it an exciting place to call home. From
              resort-style pools and fitness centers to scenic walking trails, there will be
              something for everyone to enjoy.
            </p>
            <p>
              Neighborhood clubhouses, playgrounds and dog parks bring neighbors together and
              create a friendly community. Explore each neighborhood to find the best fit for
              your lifestyle and budget.
            </p>
          </>
        }
      />
      <section className="container-site pb-14">
        <SectionHeading icon={<AmenityCardIcon />} title="Available Amenities" />
        <div className="mx-auto mt-8 grid max-w-[860px] items-center gap-10 sm:grid-cols-[300px_1fr]">
          <div className="mx-auto aspect-[4/5] w-[260px] -rotate-3 border-[6px] border-white shadow-[0_4px_18px_rgb(0_0_0/0.3)] sm:w-full">
            <Scene seed={17} kind="land" />
          </div>
          <ul className="grid grid-cols-3 gap-x-4 gap-y-7 sm:grid-cols-5">
            {AMENITIES.map(([key, label]) => (
              <li key={key} className="text-center font-nav text-[13px] leading-tight text-brand-blue">
                <AmenityIcon name={key} className="mx-auto mb-1 h-12 w-12 text-brand-green" />
                {label}
              </li>
            ))}
          </ul>
        </div>
      </section>
      <section className="container-site pb-16">
        <SectionHeading icon={<PinIcon />} title="Compare Amenities By Neighborhood" />
        <NeighborhoodBrowser neighborhoods={neighborhoods} />
      </section>
    </>
  );
}
