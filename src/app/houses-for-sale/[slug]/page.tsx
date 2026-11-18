import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { HomeDetail } from "@/components/HomeDetail";
import { MemberGate } from "@/components/MemberGate";
import { getMember } from "@/lib/auth";
import { getListing, getNameMaps } from "@/lib/data";
import { site } from "@/lib/site";

// Members-only: don't index, and never cache between visitors.
export const metadata: Metadata = { title: `Home for Sale in ${site.community}`, robots: { index: false } };

export default async function Page({ params }: PageProps<"/houses-for-sale/[slug]">) {
  const { slug } = await params;
  const listing = await getListing(slug);
  if (!listing) notFound();
  const [member, names] = await Promise.all([getMember(), getNameMaps()]);
  const hood = names.neighborhoods[listing.neighborhood];

  // Signed-out visitors get a blurred teaser containing no real details.
  if (!member) {
    return (
      <MemberGate locked next={`/houses-for-sale/${slug}`} what="This Property">
        <HomeDetail
          kind="listing"
          title={`Home in ${hood}`}
          price={listing.price}
          beds={listing.beds}
          baths={listing.baths}
          sqft={listing.sqft}
          garage={listing.garage}
          facts={[["Neighborhood", hood], ["Home Type", listing.homeType], ["Details", "Members only"]]}
          description="Sign in to see the full description, photos and details for this home."
          features={["Members only", "Members only", "Members only", "Members only"]}
          scene={listing.scene}
          showForm={false}
        />
      </MemberGate>
    );
  }

  return (
    <HomeDetail
      kind="listing"
      title={listing.address}
      subtitle={`${listing.city}, ${listing.state} ${listing.zip}`}
      price={listing.price}
      beds={listing.beds}
      baths={listing.baths}
      sqft={listing.sqft}
      garage={listing.garage}
      facts={[
        ["Neighborhood", <Link key="n" className="underline" href={`/neighborhood/${listing.neighborhood}`}>{hood}</Link>],
        ["Home Type", listing.homeType],
        ["Year Built", listing.yearBuilt],
        ["Homesite", listing.lot],
        ["MLS #", listing.mlsId],
      ]}
      description={listing.description}
      features={listing.features}
      scene={listing.scene}
    />
  );
}
