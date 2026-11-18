import type { Metadata } from "next";
import { LeadForm } from "@/components/LeadForm";
import { PageHero } from "@/components/Sections";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact Us",
  description: `Questions about ${site.community}? Reach our team of local real estate agents.`,
};

export default function Page() {
  const { agent } = site;
  return (
    <>
      <PageHero
        seed={15}
        kind="home"
        title="Contact Us"
        intro={
          <p>
            Have questions about {site.community}? Or looking for more information? Complete the form
            below, and we&rsquo;ll get back to you right away.
          </p>
        }
      />
      <section className="container-site grid gap-10 pb-14 lg:grid-cols-[1.4fr_1fr]">
        <LeadForm source="contact" timeline />
        <div className="space-y-6 font-nav text-[15px]">
          <div>
            <h2 className="heading text-[21px]">Address</h2>
            <p>{agent.brokerage}<br />{agent.address}</p>
          </div>
          <div>
            <h2 className="heading text-[21px]">Office Phone</h2>
            <p><a className="underline" href={agent.phoneHref}>{agent.phone}</a></p>
          </div>
          <div>
            <h2 className="heading text-[21px]">Our Office Hours</h2>
            <dl>
              {site.hours.map(([d, h]) => (
                <div key={d} className="flex justify-between gap-6 border-b border-neutral-200 py-1"><dt>{d}</dt><dd>{h}</dd></div>
              ))}
            </dl>
          </div>
        </div>
      </section>
      <section className="bg-brand-cream py-12">
        <div className="container-site">
          <h2 className="heading text-center text-[27px]">Our Team</h2>
          <ul className="mt-6 grid gap-5 sm:grid-cols-3">
            {site.team.map((m) => (
              <li key={m.name} className="card p-6 text-center font-nav text-[15px]">
                <div aria-hidden="true" className="mx-auto mb-3 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-brand-blue to-brand-green font-heading text-[27px] font-bold text-white">
                  {m.name.split(" ").map((w) => w[0]).join("")}
                </div>
                <h3 className="heading text-[21px]">{m.name}</h3>
                <p>Realtor (licensed in Florida)</p>
                <p><a className="underline" href={`tel:${m.phone.replace(/\D/g, "")}`}>{m.phone}</a></p>
                <p className="mt-2 text-[13.5px]">{agent.brokerage}<br />{agent.address}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
