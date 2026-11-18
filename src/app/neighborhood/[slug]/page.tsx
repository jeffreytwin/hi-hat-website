import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FloorPlanBrowser, ListingBrowser } from "@/components/Browsers";
import { AmenityCardIcon, AmenityIcon, HomeIcon, PinIcon, PlanIcon, SchoolIcon, StarIcon, TagIcon } from "@/components/Icons";
import { Scene } from "@/components/Scene";
import { SectionHeading } from "@/components/Sections";
import { getFloorPlans, getListings, getNameMaps, getNeighborhood, getNeighborhoodLookups, getNeighborhoods } from "@/lib/data";
import { num, priceRangeLabel } from "@/lib/format";
import { site } from "@/lib/site";
import { AMENITIES } from "@/lib/types";

export async function generateStaticParams() {
  return (await getNeighborhoods()).map((n) => ({ slug: n.slug }));
}

export async function generateMetadata({ params }: PageProps<"/neighborhood/[slug]">): Promise<Metadata> {
  const n = await getNeighborhood((await params).slug);
  return n ? { title: `${n.name} in ${site.community}`, description: n.summary } : {};
}

export default async function Page({ params }: PageProps<"/neighborhood/[slug]">) {
  const n = await getNeighborhood((await params).slug);
  if (!n) notFound();
  const [allPlans, allListings, names, lookups] = await Promise.all([
    getFloorPlans(), getListings(), getNameMaps(), getNeighborhoodLookups(),
  ]);
  const plans = allPlans.filter((p) => p.neighborhood === n.slug);
  const listings = allListings.filter((l) => l.neighborhood === n.slug);

  const facts = [
    [<HomeIcon key="i" />, n.homeTypes.join(" & ")],
    [<PlanIcon key="i" />, `${num(n.sqftMin)} - ${num(n.sqftMax)} square feet`],
    [<TagIcon key="i" />, priceRangeLabel(n.priceMin, n.priceMax)],
    [<StarIcon key="i" />, n.highlight],
  ] as const;

  return (
    <>
      <div className="h-[220px] sm:h-[380px]"><Scene seed={n.scene} kind="aerial" /></div>
      <section className="container-site py-10 text-center">
        <p className="mx-auto mb-3 w-fit bg-brand-green px-3 py-0.5 font-heading text-[15px] font-bold text-white">{n.status}</p>
        <h1 className="display text-[26px] text-brand-blue sm:text-[34px]">{n.name}</h1>
        <p className="mx-auto mt-4 max-w-[900px] font-nav text-[17px]">{n.tagline}</p>
        <ul className="mx-auto mt-9 grid max-w-[760px] grid-cols-2 gap-6 sm:grid-cols-4">
          {facts.map(([icon, label]) => (
            <li key={label} className="font-nav text-[17px] leading-tight text-brand-blue">
              <div className="mx-auto mb-2 h-[88px] w-[88px] text-brand-green">{icon}</div>
              {label}
            </li>
          ))}
        </ul>
      </section>

      <section className="bg-brand-cream">
        <div className="grid sm:grid-cols-2">
          <div className="px-6 py-10 sm:pl-[8%] sm:pr-12">
            <h2 className="heading flex items-center gap-3 text-[25px]"><PinIcon className="h-14 w-14" />About {n.name}</h2>
            <div className="mt-4 space-y-4 text-[15px]">{n.about.map((p) => <p key={p}>{p}</p>)}</div>
            <h2 className="heading mt-8 flex items-center gap-3 text-[25px]"><SchoolIcon className="h-14 w-14" />Schools</h2>
            <dl className="mt-3 space-y-1 text-[15px]">
              {([["Grade School", n.schools.elementary], ["Middle School", n.schools.middle], ["High School", n.schools.high]] as const).map(([k, v]) => (
                <div key={k}><dt className="inline font-bold">{k}: </dt><dd className="inline">{v}</dd></div>
              ))}
            </dl>
          </div>
          <div className="min-h-[300px]"><Scene seed={n.scene + 3} kind="home" /></div>
        </div>
        <nav aria-label="On this page" className="container-site grid gap-3 py-9 sm:grid-cols-3">
          <Link href="/community-map" className="btn btn-tan">Neighborhood Map</Link>
          <a href="#amenities" className="btn btn-tan">Amenities</a>
          <a href="#new-builds" className="btn btn-tan">New Builds</a>
        </nav>
      </section>

      <section className="container-site py-12">
        <SectionHeading id="new-builds" icon={<PlanIcon />} title={`New Builds Available in ${n.name}`} />
        <FloorPlanBrowser plans={plans} names={names} filters={["homeType", "price", "beds"]} />
        <p className="mt-8 text-center text-[13.5px] text-brand-blue">
          If {n.name} isn&rsquo;t meeting your home needs, check out our other new construction choices in {site.community}.
        </p>
        <p className="mt-3 text-center"><Link href="/build-your-home" className="btn !min-w-[270px]">View All New Home Builds</Link></p>
      </section>

      <section className="bg-brand-cream py-12">
        <div className="container-site">
          <SectionHeading icon={<PinIcon />} title={`Homes for Sale in ${n.name}`} />
          <ListingBrowser listings={listings} names={names} neighborhoodAmenityLabels={lookups.amenityLabels} filters={["homeType", "price", "beds"]} />
          <p className="mt-8 text-center text-[13.5px] text-brand-blue">
            Not spotting the perfect home in {n.name}? Explore more real estate options in {site.community}.
          </p>
          <p className="mt-3 text-center"><Link href="/homes-for-sale" className="btn !min-w-[300px]">All Homes for Sale in {site.community}</Link></p>
        </div>
      </section>

      <section className="py-12">
        <SectionHeading id="amenities" icon={<AmenityCardIcon />} title={`Amenities in ${n.name}`} />
        <div className="mt-8 grid items-start gap-8 sm:grid-cols-2">
          <div className="aspect-[4/3]"><Scene seed={n.scene + 6} kind="land" /></div>
          <ul className="mx-auto w-full max-w-[480px] px-5 font-nav text-[15px]">
            {AMENITIES.map(([key, label]) => {
              const has = n.amenities.includes(key);
              return (
                <li key={key} className={`flex items-center gap-4 border-b border-neutral-300 py-2.5 ${has ? "text-brand-green" : "text-neutral-400"}`}>
                  <AmenityIcon name={key} className="h-7 w-7" />
                  <span className="flex-1">{label}</span>
                  <span>{has ? "Yes" : "No"}</span>
                </li>
              );
            })}
          </ul>
        </div>
      </section>
    </>
  );
}
