import Link from "next/link";
import { site } from "@/lib/site";

export function Footer() {
  const { agent } = site;
  return (
    <footer className="mt-auto bg-brand-blue text-white">
      <div className="container-site py-8 text-[13px]">
        <div className="flex flex-wrap items-start justify-between gap-6">
          <address className="not-italic leading-relaxed">
            {agent.name}, {agent.title}
            <br />
            {agent.brokerage}
            <br />
            <a href={agent.phoneHref} className="hover:underline">{agent.phone}</a>
            <br />
            {agent.address}
          </address>
          <p>
            <Link href="/privacy-policy" className="underline">Privacy Policy</Link>
            {"  |  "}
            <Link href="/terms-of-service" className="underline">Terms of Service</Link>
          </p>
        </div>

        <p className="mt-8 font-nav text-xl font-medium tracking-wide">{agent.brokerage}</p>

        <div className="mt-6 space-y-4 text-center text-[11.5px] leading-relaxed">
          <p className="font-semibold">
            {site.name} is an independent resource and is not affiliated with the official
            developers of {site.community}. We&rsquo;re here to help you explore, buy, or build
            in {site.community} with confidence.
          </p>
          <p>
            ADA Accommodation: In accordance with the National Association of Realtors
            guidelines, we are committed to providing an accessible website. If you have
            difficulty accessing any of our content, or are experiencing difficulty viewing a
            file on the website, please contact us at {agent.adaPhone} to identify the
            accessibility issue and any assistive technology you use. We are committed to
            providing the content you need in the format you require.
          </p>
          <p>© {new Date().getFullYear()} by {site.name}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
