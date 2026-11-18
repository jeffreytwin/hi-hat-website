import type { Metadata } from "next";
import { Legal } from "@/components/Legal";
import { site } from "@/lib/site";

export const metadata: Metadata = { title: "Privacy Policy" };

export default function Page() {
  return (
    <Legal title="Privacy Policy">
      <p>{site.name} (&ldquo;we&rdquo;, &ldquo;us&rdquo;) respects your privacy. This policy explains what we collect on this website and how we use it.</p>
      <h2>Information we collect</h2>
      <p>When you create an account, submit a form or contact us, we collect the information you provide, such as your name, email address, phone number, moving timeline and message. We also collect basic usage data such as pages visited.</p>
      <h2>How we use it</h2>
      <p>We use your information to give you access to member-only listing and floor plan details, respond to your questions, and connect you with a licensed real estate agent on our team. We do not sell your personal information.</p>
      <h2>Communications</h2>
      <p>By submitting your contact information you agree that we may contact you by email, phone or text about your inquiry. You can opt out at any time by replying to any message or calling {site.agent.phone}.</p>
      <h2>Contact</h2>
      <p>{site.agent.brokerage}, {site.agent.address}. Phone: {site.agent.phone}.</p>
    </Legal>
  );
}
