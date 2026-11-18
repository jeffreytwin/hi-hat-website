import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { HomeDetail } from "@/components/HomeDetail";
import { MemberGate } from "@/components/MemberGate";
import { getMember } from "@/lib/auth";
import { getFloorPlan, getNameMaps } from "@/lib/data";
import { site } from "@/lib/site";

export const metadata: Metadata = { title: `New Construction Floor Plan in ${site.community}`, robots: { index: false } };

export default async function Page({ params }: PageProps<"/floor-plan/[slug]">) {
  const { slug } = await params;
  const plan = await getFloorPlan(slug);
  if (!plan) notFound();
  const [member, names] = await Promise.all([getMember(), getNameMaps()]);
  const hood = names.neighborhoods[plan.neighborhood];
  const builder = names.builders[plan.builder];
  const badges = ["New Construction", ...(plan.quickMoveIn ? ["Quick Move-In"] : [])];

  if (!member) {
    return (
      <MemberGate locked next={`/floor-plan/${slug}`} what="This Property">
        <HomeDetail
          kind="floor-plan"
          title={`Floor plan in ${hood}`}
          pricePrefix="From"
          price={plan.price}
          beds={plan.beds}
          baths={plan.baths}
          sqft={plan.sqft}
          garage={plan.garage}
          facts={[["Neighborhood", hood], ["Home Type", plan.homeType], ["Details", "Members only"]]}
          description="Sign in to see the full description, floor plan and details for this home."
          features={["Members only", "Members only", "Members only", "Members only"]}
          badges={badges}
          scene={plan.scene}
          showForm={false}
        />
      </MemberGate>
    );
  }

  return (
    <HomeDetail
      kind="floor-plan"
      title={plan.name}
      subtitle={plan.address ? `Quick move-in home at ${plan.address}` : `by ${builder}`}
      pricePrefix={plan.quickMoveIn ? undefined : "From"}
      price={plan.price}
      beds={plan.beds}
      baths={plan.baths}
      sqft={plan.sqft}
      garage={plan.garage}
      facts={[
        ["Builder", <Link key="b" className="underline" href={`/builders/${plan.builder}`}>{builder}</Link>],
        ["Neighborhood", <Link key="n" className="underline" href={`/neighborhood/${plan.neighborhood}`}>{hood}</Link>],
        ["Home Type", plan.homeType],
        ["Stories", plan.stories],
        ...(plan.virtualTourUrl ? [["Virtual Tour", "Available on request"] as [string, string]] : []),
      ]}
      description={plan.description}
      features={plan.features}
      badges={badges}
      scene={plan.scene}
    />
  );
}
