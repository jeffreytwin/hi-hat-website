import type { Metadata } from "next";
import { ListingBrowser } from "@/components/Browsers";
import { PinIcon } from "@/components/Icons";
import { Scene } from "@/components/Scene";
import { getListings, getNameMaps, getNeighborhoodLookups } from "@/lib/data";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: `Homes for Sale in ${site.community}`,
  description: `Browse the newest homes for sale in ${site.community}, ${site.region}. Filter by price, bedrooms, home type and neighborhood.`,
};

export default async function Page() {
  const [listings, names, lookups] = await Promise.all([getListings(), getNameMaps(), getNeighborhoodLookups()]);
  return (
    <>
      <section className="grid sm:grid-cols-2">
        <div className="flex flex-col justify-center px-8 py-14 text-center">
          <h1 className="display text-[26px] text-brand-blue sm:text-[34px]">Homes for Sale In {site.community}</h1>
          <p className="mx-auto mt-4 max-w-[380px] font-nav text-[17px]">
            Discover the newest homes in one of Southwest Florida&rsquo;s most anticipated
            master-planned communities.
          </p>
        </div>
        <div className="h-[240px] sm:h-[340px]"><Scene seed={8} kind="home" /></div>
      </section>

      <ListingBrowser
        light
        listings={listings}
        names={names}
        neighborhoodAmenityLabels={lookups.amenityLabels}
        filters={["homeType", "price", "beds", "baths", "garage", "neighborhood"]}
        pageSize={9}
        bandBackground={<Scene seed={2} kind="aerial" />}
        bandHeading={
          <>
            <div className="mx-auto mb-2 h-20 w-20 text-white"><PinIcon /></div>
            <h2 className="heading text-center text-[27px] !text-white">Find Homes for Sale in {site.community} Florida</h2>
            <p className="text-center font-nav text-[17px] text-white">Use the filters below to narrow down your search:</p>
          </>
        }
      />
    </>
  );
}
