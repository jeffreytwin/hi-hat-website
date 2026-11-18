import type { Metadata } from "next";
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
  const neighborhood = { slug: plan.neighborhood, name: names.neighborhoods[plan.neighborhood] };
  const builder = { slug: plan.builder, name: names.builders[plan.builder] };
  const shared = {
    kind: "floor-plan" as const,
    price: plan.price,
    pricePrefix: plan.quickMoveIn ? undefined : "From",
    beds: plan.beds,
    baths: plan.baths,
    sqft: plan.sqft,
    garage: plan.garage,
    status: plan.quickMoveIn ? "Quick move-in home · New construction" : "New construction · To be built",
    neighborhood,
    scene: plan.scene,
  };

  if (!member) {
    return (
      <MemberGate locked next={`/floor-plan/${slug}`} what="This Property">
        <HomeDetail
          {...shared}
          full={false}
          title={`Floor plan in ${neighborhood.name}`}
          facts={[["Neighborhood", neighborhood.name], ["Home Type", plan.homeType], ["Details", "Members only"]]}
          description="Sign in to see the full description, floor plan and details for this home."
          features={["Members only", "Members only", "Members only", "Members only"]}
        />
      </MemberGate>
    );
  }

  return (
    <HomeDetail
      {...shared}
      title={plan.name}
      subtitle={plan.address ? `Quick move-in home at ${plan.address}, by ${builder.name}` : `by ${builder.name}`}
      builder={builder}
      facts={[
        ["Builder", builder.name],
        ["Neighborhood", neighborhood.name],
        ["Home Type", plan.homeType],
        ["Stories", plan.stories],
        ...(plan.virtualTourUrl ? [["Virtual Tour", "Available on request"] as [string, string]] : []),
      ]}
      description={plan.description}
      features={plan.features}
    />
  );
}
