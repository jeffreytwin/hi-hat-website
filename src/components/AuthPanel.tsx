"use client";

import { useActionState, useState } from "react";
import { signInWithProvider, signUpOrLogin, type AuthState } from "@/app/auth/actions";
import { site } from "@/lib/site";

function GoogleMark() {
  return (
    <svg viewBox="0 0 48 48" className="h-6 w-6" aria-hidden="true">
      <path fill="#EA4335" d="M24 9.500c3.500 0 6.600 1.200 9.100 3.500l6.800-6.800C35.800 2.400 30.300 0 24 0 14.600 0 6.500 5.400 2.600 13.200l7.900 6.100C12.400 13.600 17.700 9.500 24 9.500z" />
      <path fill="#4285F4" d="M46.500 24.500c0-1.600-.1-3.100-.4-4.500H24v9h12.700c-.6 3-2.200 5.500-4.700 7.200l7.300 5.700c4.300-4 6.800-9.800 6.800-17.400z" />
      <path fill="#FBBC05" d="M10.500 28.700c-.5-1.500-.8-3-.8-4.700s.3-3.200.8-4.700l-7.900-6.100C1 16.500 0 20.100 0 24s1 7.500 2.600 10.800l7.900-6.100z" />
      <path fill="#34A853" d="M24 48c6.500 0 11.900-2.100 15.900-5.800l-7.300-5.700c-2.100 1.400-4.900 2.300-8.600 2.300-6.300 0-11.600-4.100-13.500-9.800l-7.900 6.100C6.500 42.600 14.600 48 24 48z" />
    </svg>
  );
}

function FacebookMark() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="#fff" aria-hidden="true">
      <path d="M24 12a12 12 0 1 0-13.900 11.900v-8.400H7.100V12h3V9.400c0-3 1.800-4.700 4.500-4.700 1.300 0 2.700.2 2.700.2v3h-1.500c-1.500 0-2 .9-2 1.900V12h3.400l-.5 3.500h-2.900v8.400A12 12 0 0 0 24 12z" />
    </svg>
  );
}

/**
 * The member sign-up / log-in panel. Mirrors the gate on our other sites:
 * social buttons first, with a combined email + password "Sign Up / Login".
 */
export function AuthPanel({ next, what = "This Property", socialError = false }: {
  next: string;
  what?: string;
  socialError?: boolean;
}) {
  const [mode, setMode] = useState<"social" | "email">(socialError ? "email" : "social");
  const [state, action, pending] = useActionState<AuthState, FormData>(signUpOrLogin, {});

  if (mode === "email") {
    return (
      <div className="mx-auto max-w-[300px] text-center">
        <h2 className="heading text-[27px] leading-tight">Sign Up or Log In Below To View {what}</h2>
        {socialError && (
          <p role="alert" className="mt-3 text-[13.5px] text-red-700">
            Social sign-in isn&rsquo;t available right now. Please use your email instead.
          </p>
        )}
        <form action={action} className="mt-4 space-y-4">
          <input type="hidden" name="next" value={next} />
          <input className="field !h-[42px] placeholder:text-brand-blue" name="email" type="email" placeholder="Email" aria-label="Email" autoComplete="email" required />
          <input className="field !h-[42px] placeholder:text-brand-blue" name="password" type="password" placeholder="Password" aria-label="Password" autoComplete="current-password" minLength={8} required />
          {state.error && <p role="alert" className="text-[13.5px] text-red-700">{state.error}</p>}
          {state.notice && <p role="status" className="text-[13.5px] text-brand-green-dark">{state.notice}</p>}
          <button className="btn w-full !py-3 !text-[15px]" disabled={pending}>
            {pending ? "One moment..." : "Sign Up / Login"}
          </button>
        </form>
        <p className="mt-4 font-nav text-[13.5px]">
          Have a Google or Facebook account?{" "}
          <button className="cursor-pointer font-medium underline" onClick={() => setMode("social")}>Log In</button>
        </p>
      </div>
    );
  }

  return (
    <div className="text-center">
      <h2 className="heading text-[27px] leading-tight">Log In Below To View {what}</h2>
      <p className="mx-auto mt-4 max-w-[360px] text-[15px] font-bold leading-snug text-brand-green">
        Get exclusive insider info from {site.community}&rsquo;s #1 resource for real estate and
        new build properties
      </p>
      <ul className="mx-auto mt-3 w-fit list-disc pl-5 text-left text-[12.5px] leading-relaxed">
        <li>Exclusive neighborhood information you won&rsquo;t find anywhere else</li>
        <li>Insider knowledge on {site.community}</li>
        <li>Unique new build information</li>
        <li>Access to realtors that specialize in {site.community}</li>
      </ul>
      <form action={signInWithProvider} className="mx-auto mt-6 max-w-[300px] space-y-4">
        <input type="hidden" name="next" value={next} />
        <button name="provider" value="google" className="flex h-12 w-full cursor-pointer items-center gap-3 border border-neutral-300 bg-white px-4 text-[17px] text-black hover:bg-neutral-50">
          <GoogleMark /><span className="flex-1">Log in with Google</span>
        </button>
        <button name="provider" value="facebook" className="flex h-12 w-full cursor-pointer items-center gap-3 bg-[#1877f2] px-4 text-[17px] text-white hover:bg-[#1568d8]">
          <FacebookMark /><span className="flex-1">Log in with Facebook</span>
        </button>
      </form>
      <p className="mt-4 font-nav text-[13.5px] text-black">
        No Google or Facebook account?
        <br />
        <button className="cursor-pointer underline" onClick={() => setMode("email")}>Sign up here</button>
      </p>
    </div>
  );
}
