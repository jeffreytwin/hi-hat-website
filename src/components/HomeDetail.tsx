import Link from "next/link";
import type { ReactNode } from "react";
import { num, usd } from "@/lib/format";
import { site } from "@/lib/site";
import { LeadForm } from "./LeadForm";
import { Scene } from "./Scene";

export type HomeDetailProps = {
  kind: "listing" | "floor-plan";
  title: string;
  subtitle?: ReactNode;
  price: number;
  pricePrefix?: string;
  beds: number;
  baths: number;
  sqft: number;
  garage: number;
  facts: [label: string, value: ReactNode][];
  description: string;
  features: string[];
  badges?: string[];
  scene: number;
  /** Lead form is omitted from the blurred teaser shown to signed-out visitors. */
  showForm?: boolean;
};

/** Shared layout for a single listing or floor plan (members-only pages). */
export function HomeDetail(p: HomeDetailProps) {
  const question = p.kind === "listing" ? `I'd like more information about ${p.title}.` : `I'd like more information about the ${p.title} floor plan.`;
  return (
    <div className="container-site py-8">
      <div className="grid gap-8 lg:grid-cols-[1.15fr_1fr]">
        <div>
          <div className="aspect-[4/3] overflow-hidden"><Scene seed={p.scene} kind="home" /></div>
          <div className="mt-2 grid grid-cols-3 gap-2">
            <div className="aspect-[4/3]"><Scene seed={p.scene + 1} kind="home" /></div>
            <div className="aspect-[4/3]"><Scene seed={p.scene + 2} kind="land" /></div>
            <div className="aspect-[4/3]"><Scene seed={p.scene + 3} kind="aerial" /></div>
          </div>
        </div>

        <div>
          {p.badges && p.badges.length > 0 && (
            <p className="mb-2 flex flex-wrap gap-1">
              {p.badges.map((b) => (
                <span key={b} className="rounded-full bg-brand-green px-3 py-0.5 font-heading text-[13px] font-bold text-white">{b}</span>
              ))}
            </p>
          )}
          <h1 className="heading text-[30px] leading-tight">{p.title}</h1>
          {p.subtitle && <p className="mt-1 text-[14px]">{p.subtitle}</p>}
          <p className="mt-3 font-heading text-[30px] font-bold text-brand-green">
            {p.pricePrefix && <span className="mr-2 font-nav text-[14px] font-normal text-ink">{p.pricePrefix}</span>}
            {usd(p.price)}
          </p>
          <dl className="mt-3 grid grid-cols-4 border-y border-neutral-300 py-3 text-center font-nav">
            {([["Beds", p.beds], ["Baths", p.baths], ["Sq. Ft.", num(p.sqft)], ["Garage", p.garage]] as const).map(([k, v]) => (
              <div key={k}>
                <dd className="text-[21px] text-brand-blue">{v}</dd>
                <dt className="text-[12.5px]">{k}</dt>
              </div>
            ))}
          </dl>
          <a href="#ask" className="btn mt-5 w-full !py-3">
            {p.kind === "listing" ? "Schedule a Showing" : "Ask About This Floor Plan"}
          </a>
          <div className="mt-5 bg-[#e3f2fa] px-5 py-4 text-[13.5px]">
            <p className="font-bold text-brand-blue-dark">Talk to a {site.community} expert</p>
            <p className="mt-1">
              {site.agent.name}, {site.agent.brokerage} &middot;{" "}
              <a className="underline" href={site.agent.phoneHref}>{site.agent.phone}</a>
            </p>
            {p.kind === "floor-plan" && (
              <p className="mt-1">Buying new construction? Our representation costs you nothing &mdash; the builder pays our fee.</p>
            )}
          </div>
          <dl className="mt-5 text-[13.5px]">
            {p.facts.map(([k, v]) => (
              <div key={k} className="flex justify-between gap-4 border-b border-neutral-200 py-1.5">
                <dt className="font-semibold">{k}</dt>
                <dd className="text-right">{v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      <div className="mt-10 grid gap-10 lg:grid-cols-[1.15fr_1fr]">
        <div>
          <h2 className="heading text-[24px]">{p.kind === "listing" ? "About This Home" : "About This Floor Plan"}</h2>
          <p className="mt-2 text-[14.5px]">{p.description}</p>
          <h2 className="heading mt-6 text-[24px]">Features</h2>
          <ul className="mt-2 grid list-disc gap-x-8 gap-y-1 pl-5 text-[14px] sm:grid-cols-2">
            {p.features.map((f) => <li key={f}>{f}</li>)}
          </ul>
          <p className="mt-6 text-[12px] text-ink-light">
            {p.kind === "listing"
              ? "Listing information is deemed reliable but not guaranteed and should be independently verified."
              : "Prices, plans and availability are set by the builder and may change without notice. Images are representative."}
          </p>
        </div>
        {p.showForm !== false && (
          <div id="ask" className="scroll-mt-6 bg-brand-cream p-6">
            <h2 className="heading text-center text-[24px]">Have Questions?</h2>
            <p className="mb-4 text-center text-[13.5px]">Get quick answers. Reach out below:</p>
            <LeadForm source={p.kind} submitLabel="Reach Out" messagePlaceholder={question} />
          </div>
        )}
      </div>

      <p className="mt-10 text-center">
        <Link href={p.kind === "listing" ? "/homes-for-sale" : "/build-your-home"} className="btn btn-outline">
          {p.kind === "listing" ? "Back to All Homes for Sale" : "Back to All Floor Plans"}
        </Link>
      </p>
    </div>
  );
}
