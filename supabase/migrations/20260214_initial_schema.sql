-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- 1. USERS Table (Public table for offline-first auth)
create table public.users (
    id uuid primary key default uuid_generate_v4(),
    full_name text not null,
    mobile text unique not null,
    pin_hash text not null,
    created_at timestamptz default now(),
    updated_at timestamptz default now()
);

-- 2. PROFILES Table (Children/Guest profiles)
create table public.profiles (
    id uuid primary key default uuid_generate_v4(),
    user_id uuid references public.users(id) on delete cascade not null,
    name text not null,
    role text not null check (role in ('parent', 'child', 'guest')),
    avatar text,
    age integer,
    settings jsonb default '{}'::jsonb,
    created_at timestamptz default now(),
    updated_at timestamptz default now()
);

-- 3. SESSIONS Table (School Mode Logs)
create table public.sessions (
    id uuid primary key default uuid_generate_v4(),
    profile_id uuid references public.profiles(id) on delete cascade not null,
    mode text check (mode in ('school', 'play')) default 'school',
    start_time timestamptz not null,
    duration_minutes integer not null,
    actual_duration_seconds integer,
    interruptions_count integer default 0,
    completed boolean default false,
    created_at timestamptz default now(),
    updated_at timestamptz default now()
);

-- 4. SPENDING_LIMITS Table
create table public.spending_limits (
    user_id uuid references public.users(id) on delete cascade primary key,
    weekly_limit numeric default 500,
    pin_threshold numeric default 100,
    require_pin boolean default true,
    created_at timestamptz default now(),
    updated_at timestamptz default now()
);

-- 5. AUDIT_LOGS Table (Financial/Safety events)
create table public.audit_logs (
    id uuid primary key default uuid_generate_v4(),
    user_id uuid references public.users(id) on delete cascade,
    profile_id uuid references public.profiles(id) on delete set null,
    action text not null,
    amount numeric,
    details jsonb,
    created_at timestamptz default now()
);

-- Enable Row Level Security (RLS)
-- For this prototype/mvp with custom offline auth, we enable public access 
-- to specific tables to allow the client to sync without complex custom claims.
-- IN PRODUCTION: You would restrict this with a PostgreSQL Function (RPC) for login.

alter table public.users enable row level security;
alter table public.profiles enable row level security;
alter table public.sessions enable row level security;
alter table public.spending_limits enable row level security;
alter table public.audit_logs enable row level security;

-- Policies (Permissive for MVP/PWA prototype)
-- Allow anyone to insert (Signup/Sync)
create policy "Allow public insert users" on public.users for insert with check (true);
create policy "Allow public select users" on public.users for select using (true);
create policy "Allow public update users" on public.users for update using (true);

-- Profiles: Allow public access (linked to users)
create policy "Allow public all profiles" on public.profiles for all using (true);

-- Sessions: Allow public access
create policy "Allow public all sessions" on public.sessions for all using (true);

-- Spending Limits: Allow public access
create policy "Allow public all spending_limits" on public.spending_limits for all using (true);

-- Audit Logs: Allow public access
create policy "Allow public all audit_logs" on public.audit_logs for all using (true);

-- Function to auto-update updated_at
create or replace function update_updated_at_column()
returns trigger as $$
begin
    new.updated_at = now();
    return new;
end;
$$ language plpgsql;

-- Triggers
create trigger update_users_updated_at before update on public.users
    for each row execute function update_updated_at_column();

create trigger update_profiles_updated_at before update on public.profiles
    for each row execute function update_updated_at_column();

create trigger update_sessions_updated_at before update on public.sessions
    for each row execute function update_updated_at_column();

create trigger update_spending_limits_updated_at before update on public.spending_limits
    for each row execute function update_updated_at_column();
