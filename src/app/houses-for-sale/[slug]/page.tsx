import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { HomeDetail } from "@/components/HomeDetail";
import { MemberGate } from "@/components/MemberGate";
import { getMember } from "@/lib/auth";
import { getListing, getNameMaps } from "@/lib/data";
import { site } from "@/lib/site";

// Members-only: don't index.
export const metadata: Metadata = { title: `Home for Sale in ${site.community}`, robots: { index: false } };

export default async function Page({ params }: PageProps<"/houses-for-sale/[slug]">) {
  const { slug } = await params;
  const listing = await getListing(slug);
  if (!listing) notFound();
  const [member, names] = await Promise.all([getMember(), getNameMaps()]);
  const neighborhood = { slug: listing.neighborhood, name: names.neighborhoods[listing.neighborhood] };
  const shared = {
    kind: "listing" as const,
    price: listing.price,
    beds: listing.beds,
    baths: listing.baths,
    sqft: listing.sqft,
    garage: listing.garage,
    status: "Active listing",
    neighborhood,
    scene: listing.scene,
  };

  // Signed-out visitors get a blurred teaser containing no real details.
  if (!member) {
    return (
      <MemberGate locked next={`/houses-for-sale/${slug}`} what="This Property">
        <HomeDetail
          {...shared}
          full={false}
          title={`Home in ${neighborhood.name}`}
          facts={[["Neighborhood", neighborhood.name], ["Home Type", listing.homeType], ["Details", "Members only"]]}
          description="Sign in to see the full description, photos and details for this home."
          features={["Members only", "Members only", "Members only", "Members only"]}
        />
      </MemberGate>
    );
  }

  const cityLine = `${listing.city}, ${listing.state} ${listing.zip}`;
  return (
    <HomeDetail
      {...shared}
      title={listing.address}
      subtitle={cityLine}
      mapQuery={`${listing.address}, ${cityLine}`}
      facts={[
        ["Neighborhood", neighborhood.name],
        ["Home Type", listing.homeType],
        ["Year Built", listing.yearBuilt],
        ["Homesite", listing.lot],
        ["MLS #", listing.mlsId],
      ]}
      description={listing.description}
      features={listing.features}
    />
  );
}
