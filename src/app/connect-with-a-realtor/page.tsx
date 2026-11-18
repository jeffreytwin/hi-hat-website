import type { Metadata } from "next";
import { LeadForm } from "@/components/LeadForm";
import { Scene } from "@/components/Scene";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: `Connect with a ${site.community} Realtor`,
  description: `Get connected in minutes with a local agent who specializes in ${site.community}.`,
};

const POINTS = [
  [`${site.community} Experts`, `Our carefully selected agents are experts in ${site.community} and its neighboring communities, with in-depth knowledge of every neighborhood, builder, and local hidden gem.`],
  ["Concierge-Level Service", "Connect with a dedicated professional who follows up promptly and provides valuable insights."],
  ["Decades of Experience", "Work with a local expert who has in-depth knowledge of the area, builders, pricing trends, and more."],
  ["The Life At Lakewood Guarantee", "We promise our agents will deliver an exceptional experience—or we'll make it right."],
];

export default function Page() {
  return (
    <section className="relative">
      <div className="absolute inset-0"><Scene seed={14} kind="aerial" /></div>
      <div className="brand-wash relative px-5 py-14">
        <div className="container-site grid items-start gap-10 lg:grid-cols-2">
          <div className="text-white">
            <p className="font-nav text-[19px] uppercase tracking-wide">Start your home search right.</p>
            <h1 className="display mt-2 text-[30px] sm:text-[40px]">Connect with a {site.community} Realtor</h1>
            <dl className="mt-8 space-y-5">
              {POINTS.map(([t, d]) => (
                <div key={t}>
                  <dt className="heading text-[22px] !text-white">{t}</dt>
                  <dd className="text-[14.5px]">{d}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="bg-white p-7 shadow-[0_4px_24px_rgb(0_0_0/0.2)]">
            <h2 className="heading mb-4 text-center text-[27px]">Get connected in minutes.</h2>
            <LeadForm source="realtor" submitLabel="Reach Out" />
          </div>
        </div>
      </div>
    </section>
  );
}
