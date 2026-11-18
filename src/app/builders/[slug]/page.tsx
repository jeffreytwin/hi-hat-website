import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FloorPlanBrowser } from "@/components/Browsers";
import { HomeIcon, PinIcon, PlanIcon, StarIcon, TagIcon } from "@/components/Icons";
import { LeadForm } from "@/components/LeadForm";
import { PageHero, SectionHeading } from "@/components/Sections";
import { getBuilder, getBuilders, getFloorPlans, getNameMaps } from "@/lib/data";
import { priceRangeLabel } from "@/lib/format";
import { site } from "@/lib/site";

export async function generateStaticParams() {
  return (await getBuilders()).map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({ params }: PageProps<"/builders/[slug]">): Promise<Metadata> {
  const b = await getBuilder((await params).slug);
  return b ? { title: `${b.name} in ${site.community}`, description: b.summary } : {};
}

export default async function Page({ params }: PageProps<"/builders/[slug]">) {
  const b = await getBuilder((await params).slug);
  if (!b) notFound();
  const [allPlans, names] = await Promise.all([getFloorPlans(), getNameMaps()]);
  const plans = allPlans.filter((p) => p.builder === b.slug);
  const prices = plans.map((p) => p.price);
  const hoods = [...new Set(plans.map((p) => p.neighborhood))];

  const facts = [
    [<HomeIcon key="i" />, b.homeTypesLabel],
    [<StarIcon key="i" />, b.knownFor],
    [<TagIcon key="i" />, prices.length ? priceRangeLabel(Math.min(...prices), Math.max(...prices)) : "Pricing coming soon"],
    [<PinIcon key="i" />, hoods.length === 1 ? `Building in ${names.neighborhoods[hoods[0]]}` : `Building in ${hoods.length} Neighborhoods`],
  ] as const;

  return (
    <>
      <PageHero seed={b.scene} kind="home" title={`${b.name} in ${site.community}`} intro={<p>{b.summary}</p>} />
      <section className="container-site pb-12">
        <SectionHeading icon={<PlanIcon />} title={`New Homes from ${b.name}`} />
        <FloorPlanBrowser plans={plans} names={names} filters={["homeType", "price", "beds"]} />
        <p className="mt-8 text-center text-[13.5px] text-brand-blue">
          Can&rsquo;t find the right new home build? Explore more new construction in {site.community}.
        </p>
        <p className="mt-3 flex flex-wrap justify-center gap-3">
          <a href="#questions" className="btn btn-outline">Have Questions?</a>
          <Link href="/build-your-home" className="btn">View All New Home Builds</Link>
        </p>
      </section>
      <section className="bg-brand-cream py-12">
        <div className="container-site">
          <SectionHeading title={`About ${b.name}`} />
          <ul className="mx-auto mt-8 grid max-w-[760px] grid-cols-2 gap-6 text-center sm:grid-cols-4">
            {facts.map(([icon, label]) => (
              <li key={label} className="font-nav text-[16px] leading-tight text-brand-blue">
                <div className="mx-auto mb-2 h-[80px] w-[80px] text-brand-green">{icon}</div>
                {label}
              </li>
            ))}
          </ul>
          <div className="mx-auto mt-8 max-w-[820px] space-y-4 text-[14.5px]">{b.about.map((p) => <p key={p}>{p}</p>)}</div>
        </div>
      </section>
      <section id="questions" className="container-site scroll-mt-6 py-12">
        <SectionHeading title="Have questions? Or want to get started?" sub="Get quick answers to all of your questions. Reach out below:" />
        <div className="mx-auto mt-6 max-w-[640px]"><LeadForm source={`builder:${b.slug}`} /></div>
      </section>
    </>
  );
}
