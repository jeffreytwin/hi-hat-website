import type { Metadata } from "next";
import { Legal } from "@/components/Legal";
import { site } from "@/lib/site";

export const metadata: Metadata = { title: "Terms of Service" };

export default function Page() {
  return (
    <Legal title="Terms of Service">
      <p>By using {site.name} you agree to these terms.</p>
      <h2>Independent resource</h2>
      <p>{site.name} is an independent guide operated by licensed real estate professionals. It is not affiliated with, endorsed by, or operated by the developers of {site.community} or any builder.</p>
      <h2>Information accuracy</h2>
      <p>Listing, floor plan, pricing, amenity and school information is provided for general informational purposes, is deemed reliable but not guaranteed, and may change without notice. Verify all information independently before making a decision.</p>
      <h2>Accounts</h2>
      <p>You are responsible for keeping your account credentials secure and for the accuracy of the information you provide.</p>
      <h2>Fair housing</h2>
      <p>We are committed to the letter and spirit of the Fair Housing Act and equal housing opportunity.</p>
      <h2>Contact</h2>
      <p>{site.agent.brokerage}, {site.agent.address}. Phone: {site.agent.phone}.</p>
    </Legal>
  );
}
