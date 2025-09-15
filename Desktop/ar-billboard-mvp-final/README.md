# AR Billboard MVP

## Quick Start
1. `npm install`
2. `npm run dev`
3. Visit http://localhost:3000/dashboard

## Deployment on Vercel
- Push this repo to GitHub.
- Import into Vercel.
- Add environment variables from `.env.example`.

## Supabase Schema
```
create table spots (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  lat double precision not null,
  lng double precision not null,
  ad_url text,
  created_at timestamp default now()
);

create table logs (
  id uuid primary key default gen_random_uuid(),
  spot_id uuid references spots(id) on delete cascade,
  event text not null,
  device text,
  created_at timestamp default now()
);

alter table spots enable row level security;
alter table logs enable row level security;

create policy "Allow insert logs" on logs for insert using (true);
create policy "Allow read spots" on spots for select using (true);
```
