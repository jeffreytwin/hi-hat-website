import { NextResponse, type NextRequest } from "next/server";
import { safeNext } from "@/lib/auth";
import { saveLead } from "@/lib/leads";
import { createClient, supabaseConfigured } from "@/lib/supabase/server";

// Google / Facebook (and email-confirmation links) return here.
export async function GET(request: NextRequest) {
  const { searchParams, origin } = request.nextUrl;
  const next = safeNext(searchParams.get("next"));
  const code = searchParams.get("code");

  if (supabaseConfigured && code) {
    const supabase = await createClient();
    const { data, error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      const user = data.user;
      // First social sign-in: record the new member as a lead.
      if (user?.email && Date.now() - new Date(user.created_at).getTime() < 60_000) {
        const [first_name, ...rest] = String(user.user_metadata?.full_name ?? "").split(" ");
        await saveLead({
          source: "member-signup",
          email: user.email,
          first_name: first_name || undefined,
          last_name: rest.join(" ") || undefined,
          page: next,
        }).catch(() => {});
      }
      return NextResponse.redirect(`${origin}${next}`);
    }
  }
  return NextResponse.redirect(`${origin}/login?next=${encodeURIComponent(next)}&error=social`);
}
