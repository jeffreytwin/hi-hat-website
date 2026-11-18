import Link from "next/link";
import { NeighborhoodCard } from "@/components/Cards";
import { Scene } from "@/components/Scene";
import { getNeighborhoods } from "@/lib/data";
import { site } from "@/lib/site";

function Tile({ href, label, seed, kind }: { href: string; label: string; seed: number; kind: "home" | "land" | "aerial" }) {
  return (
    <Link href={href} className="group block text-center">
      <div className="aspect-square overflow-hidden rounded-[18px] border-[5px] border-brand-green transition group-hover:border-brand-blue">
        <Scene seed={seed} kind={kind} />
      </div>
      <span className="mt-4 block font-nav text-[19px] font-medium uppercase text-brand-blue group-hover:text-brand-green">{label}</span>
    </Link>
  );
}

export default async function Home() {
  const neighborhoods = await getNeighborhoods();
  return (
    <>
      <section className="relative">
        <div className="absolute inset-0"><Scene seed={3} kind="aerial" /></div>
        <div className="brand-wash relative px-5 py-20 text-center sm:py-24">
          <h1 className="display mx-auto max-w-[1000px] text-[27px] text-white drop-shadow-[0_3px_6px_rgb(0_0_0/0.35)] sm:text-[58px]">
            Your Ultimate Independent Guide to {site.community}
          </h1>
          <div className="mt-10 flex justify-center gap-2">
            <Link href="/homes-for-sale" className="btn">Buy</Link>
            <Link href="/build-your-home" className="btn">Build</Link>
          </div>
        </div>
      </section>

      <section className="container-site py-9 text-center">
        <h2 className="heading text-[27px]">Help from Experts to Buy or Build in {site.community}, Florida</h2>
        <p className="mx-auto mt-5 max-w-[900px] font-nav text-[17px]">
          Compare neighborhoods, find your amenities and discover your dream home in {site.community} with
          our independent guide. {site.community} is one of Southwest Florida&rsquo;s most anticipated
          master-planned communities, with its first neighborhoods opening in 2027.
        </p>
        <div className="mx-auto mt-10 grid max-w-[960px] gap-x-16 gap-y-8 sm:grid-cols-3">
          <Tile href="/neighborhoods" label={`${site.community} Neighborhoods`} seed={4} kind="land" />
          <Tile href="/homes-for-sale" label="Homes for Sale" seed={7} kind="home" />
          <Tile href="/build-your-home" label="Build Your Home" seed={10} kind="home" />
        </div>
      </section>

      <section className="relative mt-6">
        <div className="absolute inset-0"><Scene seed={6} kind="land" /></div>
        <div className="brand-wash relative px-5 py-20 text-center text-white">
          <h2 className="display mx-auto max-w-[760px] text-[27px] sm:text-[46px]">Discover Life in {site.community}.</h2>
          <p className="heading mt-6 text-[25px] !text-white">A new chapter for a storied Florida ranch.</p>
          <div className="mx-auto mt-4 max-w-[900px] space-y-4 font-nav text-[17px]">
            <p>
              {site.community} is planned around preserved open space, miles of trails and a series of
              villages, each with its own parks and gathering places &mdash; all a short drive from
              Lakewood Ranch, downtown Sarasota and the Gulf beaches.
            </p>
            <p>
              From low-maintenance villas to custom estate homes, there will be a neighborhood for
              every budget, lifestyle and stage of life. We&rsquo;ll help you compare them all.
            </p>
          </div>
          <Link href="/neighborhoods" className="btn btn-teal mt-7">Explore Neighborhoods</Link>
          <div className="mx-auto mt-12 grid max-w-[960px] gap-x-16 gap-y-8 sm:grid-cols-3">
            {([
              ["/community-map", "Community Map", 12, "aerial"],
              ["/amenities", "Amenities", 9, "land"],
              ["/contact-us", "Contact Us", 15, "home"],
            ] as const).map(([href, label, seed, kind]) => (
              <Link key={href} href={href} className="group block">
                <div className="aspect-square overflow-hidden rounded-[18px] border-[5px] border-brand-green">
                  <Scene seed={seed} kind={kind} />
                </div>
                <span className="mt-4 block font-nav text-[19px] font-medium uppercase group-hover:underline">{label}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="container-site py-14 text-center">
        <h2 className="display mx-auto max-w-[880px] text-[26px] text-brand-blue sm:text-[34px]">
          Browse {site.community} Homes for Sale by Neighborhood.
        </h2>
        <Link href="/neighborhoods" className="btn mt-6 !min-w-[260px]">Compare Neighborhoods</Link>
        <div className="mt-10 grid gap-x-4 gap-y-7 sm:grid-cols-2 lg:grid-cols-3">
          {neighborhoods.map((n) => <NeighborhoodCard key={n.slug} n={n} />)}
        </div>
      </section>
    </>
  );
}
