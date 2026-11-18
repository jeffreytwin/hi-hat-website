import { createClient, supabaseConfigured } from "./supabase/server";

export type Lead = {
  source: string; // which form or action produced the lead
  first_name?: string;
  last_name?: string;
  email: string;
  phone?: string;
  timeline?: string;
  message?: string;
  page?: string; // page the visitor was on / trying to view
};

/**
 * Stores a lead. Goes to the Supabase `leads` table when configured, and is
 * also forwarded to LEAD_WEBHOOK_URL (CRM, Zapier, form bot...) when set.
 */
export async function saveLead(lead: Lead): Promise<void> {
  let delivered = false;

  if (supabaseConfigured) {
    const supabase = await createClient();
    const { error } = await supabase.from("leads").insert(lead);
    if (error) console.error("[leads] insert failed:", error.message);
    else delivered = true;
  }

  const webhook = process.env.LEAD_WEBHOOK_URL;
  if (webhook) {
    try {
      const res = await fetch(webhook, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(lead),
      });
      if (res.ok) delivered = true;
      else console.error("[leads] webhook responded", res.status);
    } catch (e) {
      console.error("[leads] webhook failed:", e);
    }
  }

  if (!delivered) {
    if (supabaseConfigured || webhook) throw new Error("Lead could not be delivered");
    // Nothing configured yet (local/preview): log so the form can be tested.
    console.info("[leads] no destination configured; lead received from", lead.source);
  }
}
