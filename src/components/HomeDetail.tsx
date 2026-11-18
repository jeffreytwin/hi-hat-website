import Link from "next/link";
import type { ReactNode } from "react";
import { num, usd } from "@/lib/format";
import { site } from "@/lib/site";
import { HomeIcon, PinIcon, PlanIcon } from "./Icons";
import { LeadForm } from "./LeadForm";
import { Scene } from "./Scene";

export type HomeDetailProps = {
  kind: "listing" | "floor-plan";
  title: string;
  /** Second line under the price: the street address or "by Builder". */
  subtitle?: ReactNode;
  price: number;
  pricePrefix?: string;
  beds: number;
  baths: number;
  sqft: number;
  garage: number;
  status: string;
  neighborhood: { slug: string; name: string };
  builder?: { slug: string; name: string };
  facts: [label: string, value: ReactNode][];
  description: string;
  features: string[];
  /** Query for the "open in maps" link; omitted when there is no street address. */
  mapQuery?: string;
  scene: number;
  /** False for the blurred teaser shown to signed-out visitors. */
  full?: boolean;
};

const GALLERY: ("home" | "land" | "aerial")[] = ["home", "land", "home", "aerial", "home", "land"];

function IconRow({ icon, children }: { icon: ReactNode; children: ReactNode }) {
  return (
    <li className="flex items-center gap-3">
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-blue p-1.5 text-white">{icon}</span>
      <span>{children}</span>
    </li>
  );
}

/** Stylised locator map. Replace with a real map embed once homes have addresses. */
function AreaMap({ label }: { label: string }) {
  return (
    <svg viewBox="0 0 320 200" className="block w-full border border-neutral-300" role="img" aria-label={`Map showing the location of ${label}`}>
      <rect width="320" height="200" fill="#eef3e6" />
      <path d="M0 150 Q90 120 170 150 T320 130 V200 H0Z" fill="#dcebd0" />
      <ellipse cx="70" cy="60" rx="46" ry="22" fill="#b5dff0" />
      <path d="M0 96 H320 M196 0 V200 M0 30 L320 176" stroke="#fff" strokeWidth="7" />
      <path d="M40 0 V200 M0 168 H320 M250 0 L270 200" stroke="#fff" strokeWidth="3" />
      <path d="M196 104c-12-14-17-21-17-29a17 17 0 0 1 34 0c0 8-5 15-17 29Z" fill="#e5483e" stroke="#fff" strokeWidth="2" />
      <circle cx="196" cy="75" r="6" fill="#fff" />
    </svg>
  );
}

/** Schematic floor plan drawing, standing in for the builder's real plan image. */
function PlanDrawing({ beds, garage }: { beds: number; garage: number }) {
  const rooms = Array.from({ length: Math.max(beds - 1, 1) });
  return (
    <svg viewBox="0 0 560 300" className="block w-full border border-neutral-300 bg-white" role="img" aria-label="Illustrative floor plan layout">
      <g fill="none" stroke="#2b7fb0" strokeWidth="3">
        <rect x="20" y="20" width="520" height="260" />
        <path d="M200 20 V180 M200 180 H20 M380 20 V150 M380 150 H540 M380 150 V280" />
        {rooms.map((_, i) => <path key={i} d={`M${20 + (i + 1) * (180 / rooms.length)} 180 V280`} />)}
      </g>
      <g fill="#2b7fb0" fontSize="14" fontFamily="Jost, sans-serif" textAnchor="middle">
        <text x="110" y="105">Owner&apos;s Suite</text>
        <text x="290" y="120">Great Room</text>
        <text x="290" y="235">Kitchen / Dining</text>
        <text x="460" y="90">{garage}-Car Garage</text>
        <text x="460" y="225">Lanai</text>
        {rooms.map((_, i) => (
          <text key={i} x={20 + (i + 0.5) * (180 / rooms.length)} y="238" fontSize="11">Bed {i + 2}</text>
        ))}
      </g>
    </svg>
  );
}

/** Shared layout for a single listing or floor plan (members-only pages). */
export function HomeDetail(p: HomeDetailProps) {
  const full = p.full !== false;
  const isListing = p.kind === "listing";
  const question = isListing
    ? `I'd like more information about ${p.title}.`
    : `I'd like more information about the ${p.title} floor plan.`;

  return (
    <div className="container-site py-6">
      <div className="grid items-start gap-5 lg:grid-cols-[1.55fr_1fr]">
        {/* Photo wall: one large photo, then a two-column grid. */}
        <div>
          <div className="aspect-[3/2] overflow-hidden"><Scene seed={p.scene} kind="home" /></div>
          <div className="mt-2 grid grid-cols-2 gap-2">
            {GALLERY.map((kind, i) => (
              <div key={i} className="aspect-[3/2] overflow-hidden"><Scene seed={p.scene + i + 1} kind={kind} /></div>
            ))}
          </div>
        </div>

        {/* Summary column, pinned while the photos scroll. */}
        <aside className="lg:sticky lg:top-4">
          <p className="flex items-center gap-2 font-nav text-[15px] uppercase tracking-wider text-brand-green">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-brand-blue to-brand-green p-1.5 text-white"><HomeIcon /></span>
            <Link href={`/neighborhood/${p.neighborhood.slug}`} className="hover:underline">{p.neighborhood.name}</Link>
          </p>

          {!isListing && <h1 className="heading mt-3 text-[27px] leading-tight">{p.title}</h1>}
          <p className="mt-2 flex flex-wrap items-baseline gap-x-4 gap-y-1">
            <span className="heading text-[34px] leading-none">
              {p.pricePrefix && <span className="mr-2 font-nav text-[15px] font-normal text-ink">{p.pricePrefix}</span>}
              {usd(p.price)}
            </span>
            <span className="font-nav text-[15px]">
              {p.beds} bd &middot; {p.baths} ba &middot; {num(p.sqft)} sq ft &middot; {p.garage}-car
            </span>
          </p>
          {isListing ? (
            <h1 className="mt-2 text-[15px]">{p.title}{p.subtitle && <>, {p.subtitle}</>}</h1>
          ) : (
            p.subtitle && <p className="mt-2 text-[15px]">{p.subtitle}</p>
          )}

          <p className="mt-5 flex items-center gap-2 font-nav text-[13.5px]">
            <span className="h-2.5 w-2.5 rounded-full bg-[#e5483e]" aria-hidden="true" />{p.status}
          </p>

          <div className="mt-3 grid grid-cols-2 gap-3">
            <a href="#ask" className="btn btn-outline !min-w-0 !py-2.5">Ask a Question</a>
            <a href="#ask" className="btn !min-w-0 !py-2.5">{isListing ? "Schedule a Tour" : "Get Pricing"}</a>
          </div>

          <div className="mt-5 flex gap-4 bg-[#d6ecf8] px-4 py-4 text-[13.5px]">
            <span className="h-12 w-12 shrink-0 text-[#d9a521]"><PlanIcon /></span>
            <p>
              {isListing
                ? `Thinking about ${p.neighborhood.name}? Our ${site.community} experts know every neighborhood, builder and hidden gem.`
                : "Buying new construction? Our representation costs you nothing — the builder pays our fee."}
              <Link href="/connect-with-a-realtor" className="mt-1 block font-bold text-brand-green-dark underline">
                Connect with a {site.community} Realtor
              </Link>
            </p>
          </div>

          <ul className="mt-5 space-y-3 font-nav text-[15px] text-brand-blue">
            <IconRow icon={<PinIcon />}>
              <Link href={`/neighborhood/${p.neighborhood.slug}`} className="underline">Explore the {p.neighborhood.name} neighborhood</Link>
            </IconRow>
            {p.builder ? (
              <IconRow icon={<HomeIcon />}>
                <Link href={`/builders/${p.builder.slug}`} className="underline">See all floor plans from {p.builder.name}</Link>
              </IconRow>
            ) : (
              <IconRow icon={<HomeIcon />}>
                <Link href="/homes-for-sale" className="underline">See all homes for sale in {site.community}</Link>
              </IconRow>
            )}
          </ul>

          <h2 className="heading mt-6 text-[19px]">Explore Area</h2>
          <div className="mt-2"><AreaMap label={p.title} /></div>
          {p.mapQuery && (
            <p className="mt-1 text-right text-[12.5px]">
              <a className="underline" target="_blank" rel="noopener noreferrer" href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(p.mapQuery)}`}>
                Open in Google Maps
              </a>
            </p>
          )}
        </aside>
      </div>

      <div className="mt-10 grid gap-10 lg:grid-cols-[1.55fr_1fr]">
        <div>
          <h2 className="heading text-[25px]">{isListing ? "About This Home" : "About This Floor Plan"}</h2>
          <p className="mt-2 text-[15px]">{p.description}</p>

          {!isListing && full && (
            <>
              <h2 className="heading mt-7 text-[25px]">Floor Plan</h2>
              <div className="mt-2"><PlanDrawing beds={p.beds} garage={p.garage} /></div>
              <p className="mt-1 text-[12.5px] text-ink-light">Illustrative layout. Ask us for the builder&rsquo;s current plan and options sheet.</p>
            </>
          )}

          <h2 className="heading mt-7 text-[25px]">Features</h2>
          <ul className="mt-2 grid list-disc gap-x-8 gap-y-1 pl-5 text-[15px] sm:grid-cols-2">
            {p.features.map((f, i) => <li key={i}>{f}</li>)}
          </ul>

          <h2 className="heading mt-7 text-[25px]">Details</h2>
          <dl className="mt-2 text-[13.5px]">
            {p.facts.map(([k, v]) => (
              <div key={k} className="flex justify-between gap-4 border-b border-neutral-200 py-1.5">
                <dt className="font-semibold">{k}</dt>
                <dd className="text-right">{v}</dd>
              </div>
            ))}
          </dl>

          <p className="mt-6 text-[12.5px] text-ink-light">
            {isListing
              ? "Listing information is deemed reliable but not guaranteed and should be independently verified."
              : "Prices, plans and availability are set by the builder and may change without notice. Images are representative."}
          </p>
        </div>

        {full && (
          <div id="ask" className="scroll-mt-6 self-start bg-brand-cream p-6">
            <h2 className="heading text-center text-[25px]">Have Questions?</h2>
            <p className="mb-4 text-center text-[13.5px]">Get quick answers. Reach out below:</p>
            <LeadForm source={p.kind} submitLabel="Reach Out" messagePlaceholder={question} />
          </div>
        )}
      </div>

      <p className="mt-10 text-center">
        <Link href={isListing ? "/homes-for-sale" : "/build-your-home"} className="btn btn-outline">
          {isListing ? "Back to All Homes for Sale" : "Back to All Floor Plans"}
        </Link>
      </p>
    </div>
  );
}
