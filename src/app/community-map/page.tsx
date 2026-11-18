import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/Sections";
import { getNeighborhoods } from "@/lib/data";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: `${site.community} Community Map`,
  description: `A map of ${site.community} and its neighborhoods in ${site.region}.`,
};

// Schematic placement only, until an official site plan is published.
const SPOTS = [[150, 120], [330, 95], [520, 140], [210, 265], [410, 250], [590, 300]];

export default async function Page() {
  const neighborhoods = await getNeighborhoods();
  return (
    <>
      <PageHero
        seed={12}
        title={`${site.community} Community Map`}
        intro={
          <p>
            Below is an illustrative map of {site.community} and its planned neighborhoods. Select a
            neighborhood to learn more. A detailed, print-quality map will be posted here as soon
            as the official site plan is released.
          </p>
        }
      />
      <section className="container-site pb-10">
        <div className="overflow-hidden border border-neutral-300 shadow-[0_2px_10px_rgb(0_0_0/0.15)]">
          <svg viewBox="0 0 740 400" className="block w-full" role="img" aria-label={`Illustrative map of ${site.community} neighborhoods`}>
            <rect width="740" height="400" fill="#e6f1dc" />
            <path d="M0 330 Q200 300 380 345 T740 320 V400 H0Z" fill="#d3e7c4" />
            <path d="M60 0 Q90 180 40 400" stroke="#b9d7ee" strokeWidth="26" fill="none" />
            <ellipse cx="470" cy="190" rx="60" ry="26" fill="#a6dcf0" />
            <ellipse cx="270" cy="185" rx="34" ry="16" fill="#a6dcf0" />
            <path d="M0 200 H740 M360 0 V400" stroke="#fff" strokeWidth="9" />
            <path d="M0 200 H740 M360 0 V400" stroke="#c9ae88" strokeWidth="2" strokeDasharray="10 8" />
            {neighborhoods.map((n, i) => {
              const [x, y] = SPOTS[i % SPOTS.length];
              return (
                <a key={n.slug} href={`/neighborhood/${n.slug}`}>
                  <circle cx={x} cy={y} r="44" fill="#62cf82" opacity="0.35" />
                  <path d={`M${x} ${y + 4}c-7-8-10-12-10-17a10 10 0 0 1 20 0c0 5-3 9-10 17Z`} fill="#3b9fd3" stroke="#fff" strokeWidth="1.5" />
                  <text x={x} y={y + 24} textAnchor="middle" fontSize="15" fontWeight="700" fill="#23638a" fontFamily="Open Sans Condensed, Arial Narrow, sans-serif">{n.name}</text>
                </a>
              );
            })}
          </svg>
        </div>
        <ul className="mt-6 flex flex-wrap justify-center gap-x-6 gap-y-2 font-nav text-[15px] text-brand-blue">
          {neighborhoods.map((n) => (
            <li key={n.slug}><Link className="underline" href={`/neighborhood/${n.slug}`}>{n.name}</Link></li>
          ))}
        </ul>
        <p className="mt-8 text-center font-nav text-[17px]">
          When you&rsquo;re ready, explore the available{" "}
          <Link className="text-brand-blue underline" href="/homes-for-sale">homes for sale in {site.community}</Link>, including several{" "}
          <Link className="text-brand-blue underline" href="/build-your-home">new home builds</Link>.
        </p>
      </section>
    </>
  );
}
