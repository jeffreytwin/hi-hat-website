"use server";

import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import { PREVIEW_COOKIE, safeNext } from "@/lib/auth";
import { saveLead } from "@/lib/leads";
import { createClient, supabaseConfigured } from "@/lib/supabase/server";

export type AuthState = { error?: string; notice?: string };

async function callbackUrl(next: string) {
  const h = await headers();
  const origin = `${h.get("x-forwarded-proto") ?? "http"}://${h.get("host")}`;
  return `${origin}/auth/callback?next=${encodeURIComponent(next)}`;
}

/**
 * One form for both cases, like the "Sign Up / Login" button on our other
 * sites: log in if the account exists, otherwise create it.
 */
export async function signUpOrLogin(_: AuthState, form: FormData): Promise<AuthState> {
  const email = String(form.get("email") ?? "").trim().toLowerCase();
  const password = String(form.get("password") ?? "");
  const next = safeNext(form.get("next"));

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return { error: "Please enter a valid email address." };
  if (password.length < 8) return { error: "Your password needs at least 8 characters." };

  if (!supabaseConfigured) {
    (await cookies()).set(PREVIEW_COOKIE, email, { httpOnly: true, sameSite: "lax", path: "/", maxAge: 60 * 60 * 24 * 30 });
    redirect(next);
  }

  const supabase = await createClient();

  const login = await supabase.auth.signInWithPassword({ email, password });
  if (!login.error) redirect(next);

  const signup = await supabase.auth.signUp({
    email,
    password,
    options: { emailRedirectTo: await callbackUrl(next) },
  });
  if (signup.error) {
    return {
      error: /registered|exists/i.test(signup.error.message)
        ? "That password doesn't match this email. Please try again."
        : signup.error.message,
    };
  }
  // Supabase returns a user with no identities when the email already exists.
  if (signup.data.user && signup.data.user.identities?.length === 0) {
    return { error: "That password doesn't match this email. Please try again." };
  }

  await saveLead({ source: "member-signup", email, page: next }).catch(() => {});

  if (!signup.data.session) {
    return { notice: "Almost there! Check your email for a link to confirm your account." };
  }
  redirect(next);
}

export async function signInWithProvider(form: FormData) {
  const provider = form.get("provider") === "facebook" ? "facebook" : "google";
  const next = safeNext(form.get("next"));

  if (!supabaseConfigured) {
    redirect(`/login?next=${encodeURIComponent(next)}&error=social`);
  }

  const supabase = await createClient();
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider,
    options: { redirectTo: await callbackUrl(next) },
  });
  if (error || !data.url) redirect(`/login?next=${encodeURIComponent(next)}&error=social`);
  redirect(data.url);
}

export async function signOut() {
  if (supabaseConfigured) {
    const supabase = await createClient();
    await supabase.auth.signOut();
  } else {
    (await cookies()).delete(PREVIEW_COOKIE);
  }
  redirect("/");
}
