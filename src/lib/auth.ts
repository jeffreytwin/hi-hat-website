import { cookies } from "next/headers";
import { createClient, supabaseConfigured } from "./supabase/server";

export type Member = { email: string; name?: string };

// Used only when Supabase is not configured, so the member gate can be
// demonstrated on a preview deployment. It is not real authentication.
export const PREVIEW_COOKIE = "hh_preview_member";

export async function getMember(): Promise<Member | null> {
  if (!supabaseConfigured) {
    const email = (await cookies()).get(PREVIEW_COOKIE)?.value;
    return email ? { email } : null;
  }
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();
  if (!data.user?.email) return null;
  return {
    email: data.user.email,
    name: data.user.user_metadata?.full_name ?? data.user.user_metadata?.name,
  };
}

/** Only allow same-site relative redirect targets. */
export function safeNext(next: unknown): string {
  return typeof next === "string" && next.startsWith("/") && !next.startsWith("//")
    ? next
    : "/";
}
