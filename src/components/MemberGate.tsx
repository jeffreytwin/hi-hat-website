import type { ReactNode } from "react";
import { AuthPanel } from "./AuthPanel";

/**
 * Wraps a members-only page. Signed-out visitors see the page blurred behind
 * the sign-up panel. Pass only teaser content as `children` when locked — the
 * blur is cosmetic, so anything rendered here is still in the page source.
 */
export function MemberGate({ locked, next, what, children }: {
  locked: boolean;
  next: string;
  what?: string;
  children: ReactNode;
}) {
  if (!locked) return <>{children}</>;
  return (
    <div className="relative min-h-[720px] overflow-hidden">
      <div className="pointer-events-none max-h-[900px] select-none overflow-hidden opacity-60 blur-[7px]" aria-hidden="true" inert>
        {children}
      </div>
      <div className="absolute inset-0 flex items-start justify-center bg-white/40 px-4 pt-16">
        <section aria-label="Member sign in" className="w-full max-w-[456px] bg-white px-8 py-10 shadow-[0_4px_30px_rgb(0_0_0/0.18)]">
          <AuthPanel next={next} what={what} />
        </section>
      </div>
    </div>
  );
}
