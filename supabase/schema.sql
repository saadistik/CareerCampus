-- CareerCompass database schema
-- Run against the Supabase project's Postgres database.

create extension if not exists pgcrypto;

-- ---------- profiles ----------
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  education_level text,
  field_of_study text,
  work_experience text,
  interests text[] not null default '{}',
  skills text[] not null default '{}',
  role text not null default 'student' check (role in ('student','admin')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

create policy "profiles: read own" on public.profiles
  for select using (auth.uid() = id);

create policy "profiles: update own" on public.profiles
  for update using (auth.uid() = id);

-- auto-create a profile row whenever a new auth user signs up
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, full_name)
  values (new.id, coalesce(new.raw_user_meta_data->>'full_name', ''));
  return new;
end;
$$ language plpgsql security definer set search_path = public;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ---------- careers ----------
create table if not exists public.careers (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  category text,
  description text,
  salary_min integer,
  salary_max integer,
  status text not null default 'draft' check (status in ('draft','published')),
  created_at timestamptz not null default now()
);

alter table public.careers enable row level security;

create policy "careers: public read published" on public.careers
  for select using (status = 'published');

create policy "careers: admin read all" on public.careers
  for select using (
    exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin')
  );

create policy "careers: admin write" on public.careers
  for all using (
    exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin')
  ) with check (
    exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin')
  );

-- ---------- career_skills (required skills per career, used by the matching engine) ----------
create table if not exists public.career_skills (
  id uuid primary key default gen_random_uuid(),
  career_id uuid not null references public.careers(id) on delete cascade,
  skill_name text not null,
  weight numeric not null default 1,
  unique(career_id, skill_name)
);

alter table public.career_skills enable row level security;

create policy "career_skills: public read" on public.career_skills
  for select using (true);

create policy "career_skills: admin write" on public.career_skills
  for all using (
    exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin')
  ) with check (
    exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin')
  );

-- ---------- learning_resources (suggested resources per skill, for the skill-gap screen) ----------
create table if not exists public.learning_resources (
  id uuid primary key default gen_random_uuid(),
  skill_name text not null,
  title text not null,
  url text,
  created_at timestamptz not null default now()
);

alter table public.learning_resources enable row level security;

create policy "learning_resources: public read" on public.learning_resources
  for select using (true);

create policy "learning_resources: admin write" on public.learning_resources
  for all using (
    exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin')
  ) with check (
    exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin')
  );

-- ---------- assessment_responses ----------
create table if not exists public.assessment_responses (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  question_id text not null,
  answer text not null,
  created_at timestamptz not null default now(),
  unique(user_id, question_id)
);

alter table public.assessment_responses enable row level security;

create policy "assessment_responses: owner all" on public.assessment_responses
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- ---------- saved_careers ----------
create table if not exists public.saved_careers (
  user_id uuid not null references auth.users(id) on delete cascade,
  career_id uuid not null references public.careers(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (user_id, career_id)
);

alter table public.saved_careers enable row level security;

create policy "saved_careers: owner all" on public.saved_careers
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- ---------- resumes ----------
create table if not exists public.resumes (
  user_id uuid primary key references auth.users(id) on delete cascade,
  summary text,
  experience jsonb not null default '[]',
  education jsonb not null default '[]',
  skills text[] not null default '{}',
  template text not null default 'modern' check (template in ('modern','classic')),
  updated_at timestamptz not null default now()
);

alter table public.resumes enable row level security;

create policy "resumes: owner all" on public.resumes
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- ---------- jobs ----------
create table if not exists public.jobs (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  company text not null,
  location text,
  job_type text check (job_type in ('full-time','part-time','internship')),
  category text,
  description text,
  career_id uuid references public.careers(id) on delete set null,
  created_at timestamptz not null default now()
);

alter table public.jobs enable row level security;

create policy "jobs: public read" on public.jobs
  for select using (true);

create policy "jobs: admin write" on public.jobs
  for all using (
    exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin')
  ) with check (
    exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin')
  );
