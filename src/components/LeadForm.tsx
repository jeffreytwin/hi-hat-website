"use client";

import { useActionState } from "react";
import { usePathname } from "next/navigation";
import { submitLead, type LeadState } from "@/app/actions";

const TIMELINES = [
  "Less than 30 Days", "1 - 2 Months", "3 - 5 Months", "6 - 12 Months", "12 - 24 Months", "No Goal Just Yet",
];

export function LeadForm({ source, submitLabel = "Submit", timeline = false, light = false, messagePlaceholder }: {
  source: string;
  submitLabel?: string;
  timeline?: boolean;
  light?: boolean;
  messagePlaceholder?: string;
}) {
  const [state, action, pending] = useActionState<LeadState, FormData>(submitLead, {});
  const page = usePathname();
  const label = `field-label ${light ? "text-white" : ""}`;

  if (state.ok) {
    return (
      <p role="status" className={`rounded border px-5 py-6 text-center font-nav text-[17px] ${light ? "border-white/60 text-white" : "border-brand-green text-brand-green-dark"}`}>
        Thanks! We&rsquo;ve got your message and will be in touch shortly.
      </p>
    );
  }

  return (
    <form action={action} className="grid gap-4 text-left sm:grid-cols-2">
      <input type="hidden" name="source" value={source} />
      <input type="hidden" name="page" value={page} />
      {/* honeypot */}
      <input type="text" name="company" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
      <label>
        <span className={label}>First Name</span>
        <input className="field" name="first_name" required autoComplete="given-name" />
      </label>
      <label>
        <span className={label}>Last Name</span>
        <input className="field" name="last_name" autoComplete="family-name" />
      </label>
      <label>
        <span className={label}>Email Address</span>
        <input className="field" name="email" type="email" required autoComplete="email" />
      </label>
      <label>
        <span className={label}>Phone</span>
        <input className="field" name="phone" type="tel" autoComplete="tel" />
      </label>
      {timeline && (
        <label className="sm:col-span-2">
          <span className={label}>When Do You Plan on Moving?</span>
          <select className="field" name="timeline" defaultValue="">
            <option value="" disabled>Choose one</option>
            {TIMELINES.map((t) => <option key={t}>{t}</option>)}
          </select>
        </label>
      )}
      <label className="sm:col-span-2">
        <span className={label}>Message (optional)</span>
        <textarea className="field" name="message" placeholder={messagePlaceholder} />
      </label>
      {state.error && <p role="alert" className={`sm:col-span-2 text-[14px] ${light ? "text-white" : "text-red-700"}`}>{state.error}</p>}
      <div className="sm:col-span-2 text-center">
        <button className="btn" disabled={pending}>{pending ? "Sending..." : submitLabel}</button>
      </div>
    </form>
  );
}
