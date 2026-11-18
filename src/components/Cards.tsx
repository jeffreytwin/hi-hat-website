import Link from "next/link";
import { num, priceRangeLabel, usd } from "@/lib/format";
import type { NameMaps } from "@/lib/data";
import { AMENITIES, amenityLabel, type FloorPlan, type Listing, type Neighborhood } from "@/lib/types";
import { AmenityIcon, HomeIcon, StarIcon, TourIcon } from "./Icons";
import { Scene } from "./Scene";

const PILL_COLORS = ["bg-[#f5b93a]", "bg-brand-blue", "bg-brand-green"];

function Pill({ className, children }: { className: string; children: React.ReactNode }) {
  return (
    <span className={`inline-flex items-center gap-1 rounded-full py-0.5 pl-1 pr-2.5 font-heading text-[12.5px] font-bold text-white ${className}`}>
      {children}
    </span>
  );
}

function Specs({ beds, baths, sqft }: { beds: number; baths: number; sqft: number }) {
  return (
    <p className="mt-1 flex gap-4 text-[13.5px]">
      <span>{beds} Beds</span>
      <span>{baths} Baths</span>
      <span>{num(sqft)} Sq. Ft.</span>
    </p>
  );
}

export function FloorPlanCard({ plan, names }: { plan: FloorPlan; names: NameMaps }) {
  return (
    <article className="card relative flex flex-col">
      <div className="relative aspect-[4/3]">
        <Scene seed={plan.scene} />
        <div className="absolute right-2 top-2 flex gap-1">
          {plan.quickMoveIn && (
            <Pill className="bg-brand-blue"><StarIcon className="h-4 w-4" />Quick Move-In</Pill>
          )}
          <Pill className="bg-[#7fbf3f]"><HomeIcon className="h-4 w-4" />New Construction</Pill>
        </div>
        {plan.virtualTourUrl && (
          <span className="absolute bottom-2 right-2 inline-flex items-center gap-1.5 rounded bg-brand-green/90 px-2.5 py-1 font-nav text-[12.5px] text-white">
            <TourIcon className="h-5 w-5" />Virtual Tour
          </span>
        )}
      </div>
      <div className="flex-1 px-4 pb-4 pt-3">
        <h3 className="heading text-[21px] leading-tight">
          <Link href={`/floor-plan/${plan.slug}`} className="card-link after:absolute after:inset-0">
            {plan.name}
          </Link>
        </h3>
        <p className="font-heading text-[19px] font-bold text-brand-green">{usd(plan.price)}</p>
        <Specs {...plan} />
        <p className="relative z-10 mt-1.5 text-[13.5px]">
          Builder:{" "}
          <Link href={`/builders/${plan.builder}`} className="ml-1 underline">{names.builders[plan.builder]}</Link>
        </p>
        <p className="relative z-10 mt-1 text-[13.5px]">
          Neighborhood:{" "}
          <Link href={`/neighborhood/${plan.neighborhood}`} className="ml-1 underline">{names.neighborhoods[plan.neighborhood]}</Link>
        </p>
      </div>
    </article>
  );
}

export function ListingCard({ listing, names, amenities }: { listing: Listing; names: NameMaps; amenities: string[] }) {
  return (
    <article className="card relative flex flex-col">
      <div className="relative aspect-[4/3]">
        <Scene seed={listing.scene} />
        <div className="absolute bottom-2 left-3 flex gap-1">
          {amenities.slice(0, 3).map((a, i) => (
            <Pill key={a} className={PILL_COLORS[i]}>
              <span className="h-4 w-4 rounded-full border border-white/80" />{a}
            </Pill>
          ))}
        </div>
      </div>
      <div className="flex-1 px-4 pb-4 pt-3">
        <p className="heading text-[25px] leading-tight">{usd(listing.price)}</p>
        <Specs {...listing} />
        <p className="relative z-10 mt-1.5 text-[13.5px]">
          Neighborhood:{" "}
          <Link href={`/neighborhood/${listing.neighborhood}`} className="ml-1 underline">{names.neighborhoods[listing.neighborhood]}</Link>
        </p>
        <h3 className="mt-2 text-[12.5px]">
          <Link href={`/houses-for-sale/${listing.slug}`} className="card-link after:absolute after:inset-0">
            {listing.address}, {listing.city}, {listing.state} {listing.zip}
          </Link>
        </h3>
      </div>
    </article>
  );
}

/** Photo-on-top card used on the home page grid. */
export function NeighborhoodCard({ n }: { n: Neighborhood }) {
  return (
    <Link href={`/neighborhood/${n.slug}`} className="card block text-center">
      <div className="aspect-[3/2]"><Scene seed={n.scene} kind={n.scene % 2 ? "aerial" : "land"} /></div>
      <div className="px-5 pb-6 pt-3">
        <h3 className="heading text-[21px]">{n.name}</h3>
        <p className="mt-2 text-[12.5px] leading-relaxed">{n.summary}</p>
      </div>
    </Link>
  );
}

/** Comparison card with the amenity icon strip, used on Neighborhoods and Amenities. */
export function NeighborhoodCompareCard({ n }: { n: Neighborhood }) {
  return (
    <article className="relative flex flex-col bg-white shadow-[0_2px_10px_rgb(0_0_0/0.18)] transition hover:-translate-y-0.5 hover:shadow-[0_6px_18px_rgb(0_0_0/0.22)]">
      <div className="relative aspect-[3/2]">
        <Scene seed={n.scene} kind={n.scene % 2 ? "aerial" : "land"} />
        <span className="absolute left-0 top-3 bg-brand-green px-3 py-0.5 font-heading text-[13.5px] font-bold text-white">{n.status}</span>
      </div>
      <div className="flex flex-1 flex-col px-4 pb-4 pt-2">
        <h3 className="font-nav text-[19px] font-medium text-brand-blue">{n.name}</h3>
        <p className="mt-1 text-[12.5px] leading-relaxed">{n.summary}</p>
        <ul className="mt-3 grid grid-cols-8 gap-1" aria-label="Amenities">
          {AMENITIES.map(([key]) => {
            const has = n.amenities.includes(key);
            return (
              <li key={key} title={`${amenityLabel(key)}: ${has ? "Yes" : "No"}`}>
                <AmenityIcon name={key} className={`h-6 w-6 ${has ? "text-brand-green" : "text-neutral-300"}`} />
                <span className="sr-only">{amenityLabel(key)}: {has ? "Yes" : "No"}</span>
              </li>
            );
          })}
        </ul>
        <div className="mt-auto flex items-end justify-between gap-2 pt-4">
          <p className="font-nav text-[15px] leading-tight">
            Homes from:
            <span className="block font-heading text-[19px] font-bold text-brand-blue">{priceRangeLabel(n.priceMin, n.priceMax)}</span>
          </p>
          <Link href={`/neighborhood/${n.slug}`} className="btn btn-teal !min-w-[110px] !py-1.5 after:absolute after:inset-0">
            Explore<span className="sr-only"> {n.name}</span>
          </Link>
        </div>
      </div>
    </article>
  );
}
