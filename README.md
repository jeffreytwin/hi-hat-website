# Life in Hi Hat Ranch

An independent guide to Hi Hat Ranch (Sarasota, FL), modeled on the structure and look of
lifeinwellenpark.com: neighborhoods, homes for sale, new-construction floor plans, builders,
amenities, and a member login that gates listing and floor-plan details.

Built with Next.js (App Router), Tailwind CSS and Supabase Auth. Designed to deploy on Vercel.

## Run it

```bash
npm install
npm run dev
```

With no environment variables the site runs in **preview mode**: the login gate accepts any
email + password (nothing is stored) and form submissions are only logged. Copy `.env.example`
to `.env.local` to configure the real services.

## Pages

| Route | What it is |
| --- | --- |
| `/` | Home |
| `/neighborhoods` | Compare neighborhoods (price, amenities, beds, baths, home type, garage) |
| `/neighborhood/[slug]` | Neighborhood detail: about, schools, new builds, homes for sale, amenities |
| `/homes-for-sale` | Listings with filters |
| `/houses-for-sale/[slug]` | Listing detail (**members only**) |
| `/build-your-home` | Floor plans with filters, quick move-in toggle, builder list |
| `/floor-plan/[slug]` | Floor plan detail (**members only**) |
| `/builders/[slug]` | Builder page with its floor plans and a question form |
| `/amenities` | Amenity overview + compare neighborhoods by amenity |
| `/community-map` | Illustrative map linking to neighborhoods |
| `/connect-with-a-realtor`, `/contact-us` | Lead forms |
| `/blog`, `/post/[slug]` | Blog |
| `/login` | Standalone sign-up / log-in |

## Where things live

- `src/lib/site.ts` — site name, agent/brokerage contact details, navigation.
- `src/data/*` — neighborhoods, builders, floor plans, listings, blog posts.
  **Everything except the blog is placeholder data** until Hi Hat Ranch neighborhoods are
  announced. Images are illustrated placeholders (`src/components/Scene.tsx`).
- `src/lib/data.ts` — the only place pages read data from; swap in a database or MLS/IDX
  feed here.
- `src/app/auth/*`, `src/lib/auth.ts`, `src/components/AuthPanel.tsx`, `MemberGate.tsx` — login.
- `src/lib/leads.ts` — where form submissions and new-member sign-ups are sent.

## Member login

Signed-out visitors who open a listing or floor plan see the page blurred behind a panel
offering Google, Facebook, or a combined email + password "Sign Up / Login" (existing accounts
are logged in, new ones are created). The server sends no listing details until the visitor is
signed in.

To turn on real accounts:

1. Create a Supabase project and set `NEXT_PUBLIC_SUPABASE_URL` and
   `NEXT_PUBLIC_SUPABASE_ANON_KEY`.
2. Run `supabase/migrations/0001_members_and_leads.sql` (creates the `leads` table).
3. In Supabase Auth: turn **off** "Confirm email" for instant access (as on the Wix sites), add
   the site URL plus `/auth/callback` to the redirect URLs, and enable the Google and Facebook
   providers with their OAuth credentials.

## Leads

Every form and every new member sign-up calls `saveLead()`, which inserts into the Supabase
`leads` table and, if `LEAD_WEBHOOK_URL` is set, also POSTs the lead as JSON to that URL.

## Going live checklist

- Replace placeholder data and imagery; set `NEXT_PUBLIC_PREVIEW_DATA=false` (removes the
  preview ribbon and allows search indexing).
- Have the privacy policy and terms reviewed.
- Add the brokerage's required MLS/IDX disclaimers once a listing feed is connected.
