# Supabase Setup Guide

This guide explains how to set up Supabase for the PANASA website.

## Prerequisites

1. Create a Supabase account at [https://supabase.com](https://supabase.com)
2. Create a new Supabase project

## Setting up the Database

### 1. Run the Schema Migration

Execute the SQL script in `supabase/migrations/001_initial_schema.sql` in your Supabase SQL editor:

1. Go to your Supabase project dashboard
2. Navigate to SQL Editor
3. Copy and paste the contents of `supabase/migrations/001_initial_schema.sql`
4. Run the script

### 2. Seed the Database

Execute the SQL script in `supabase/seed/001_initial_data.sql` in your Supabase SQL editor:

1. In the same SQL Editor
2. Copy and paste the contents of `supabase/seed/001_initial_data.sql`
3. Run the script

## Configure Environment Variables

Create a `.env` file in your project root with the following variables:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

You can find these values in your Supabase project settings:
1. Go to your Supabase project dashboard
2. Navigate to Settings > API
3. Copy the Project URL and anon key

## Configure Row Level Security (RLS)

For public read access to the tables, run these commands in the SQL editor:

```sql
-- Enable RLS on all tables
alter table players enable row level security;
alter table events enable row level security;
alter table news enable row level security;
alter table federations enable row level security;

-- Create policies for public read access
create policy "Public read access to players" on players for select using (true);
create policy "Public read access to events" on events for select using (true);
create policy "Public read access to news" on news for select using (true);
create policy "Public read access to federations" on federations for select using (true);
```

## Testing the Connection

After setting up, you can test the connection by running the development server:

```bash
npm run dev
```

The application should now fetch data from your Supabase database instead of using mock data.