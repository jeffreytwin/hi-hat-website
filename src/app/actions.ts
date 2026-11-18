"use server";

import { saveLead } from "@/lib/leads";

export type LeadState = { ok?: boolean; error?: string };

const text = (form: FormData, key: string, max = 200) =>
  String(form.get(key) ?? "").trim().slice(0, max) || undefined;

export async function submitLead(_: LeadState, form: FormData): Promise<LeadState> {
  // Honeypot: real visitors never fill this hidden field.
  if (form.get("company")) return { ok: true };

  const email = text(form, "email", 320);
  const first_name = text(form, "first_name");
  if (!first_name) return { error: "Please enter your first name." };
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { error: "Please enter a valid email address." };
  }

  try {
    await saveLead({
      source: text(form, "source") ?? "contact",
      first_name,
      last_name: text(form, "last_name"),
      email,
      phone: text(form, "phone", 40),
      timeline: text(form, "timeline"),
      message: text(form, "message", 5000),
      page: text(form, "page", 300),
    });
  } catch {
    return { error: "Sorry, something went wrong sending your message. Please call us instead." };
  }
  return { ok: true };
}
