# CareerCompass

Career advisor web app for UNIMY students — React + Vite + Tailwind, Supabase (Postgres, Auth, RLS).

## Run locally

```
npm install
npm run dev
```

Requires `.env.local` (already present) with `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`.

## Database

Schema and starter content live in `supabase/schema.sql` and `supabase/seed.sql`. Both have already
been applied to the live Supabase project. To re-apply after a reset, run them in the Supabase SQL editor
in that order.

## Roles

New sign-ups get `role = 'student'` by default. To make an account an admin:

```sql
update profiles set role = 'admin' where id = (select id from auth.users where email = '<email>');
```

Admins see an extra "Admin panel" nav item and can publish/unpublish/delete careers at `/admin`.
Everyone else is redirected away from `/admin` (enforced both in the UI and by RLS policies).

## Matching engine

`src/lib/matching.ts` — a career's match % is the share of its weighted required skills
(`career_skills` table) that appear in the user's `profiles.skills` array. The assessment
(`src/lib/assessment.ts`) adds skill/interest tags to that array based on which answers the
user picks, so completing it sharpens future matches.
