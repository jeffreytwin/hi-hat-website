-- Life in Hi Hat Ranch: lead capture.
-- Members themselves live in Supabase Auth (auth.users); nothing to create.

create table if not exists public.leads (
  id          bigint generated always as identity primary key,
  created_at  timestamptz not null default now(),
  source      text not null,          -- contact | realtor | builder | interest | member-signup ...
  first_name  text,
  last_name   text,
  email       text not null,
  phone       text,
  timeline    text,
  message     text,
  page        text
);

alter table public.leads enable row level security;

-- Website visitors (signed in or not) may submit a lead, but nobody can read
-- the table through the public API. Read leads from the Supabase dashboard
-- or with the service role key.
create policy "anyone can submit a lead"
  on public.leads for insert
  to anon, authenticated
  with check (
    char_length(email) between 3 and 320
    and char_length(coalesce(message, '')) <= 5000
  );
