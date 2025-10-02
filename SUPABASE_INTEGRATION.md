# Supabase Integration Documentation

This document explains how Supabase has been integrated into the PANASA website to replace static data with dynamic database storage.

## Overview

The PANASA website has been updated to use Supabase as its backend database for storing and retrieving dynamic content including:
- Player ratings
- Events
- News articles
- Federation information

## Database Schema

The following tables have been created in Supabase:

### Players Table
```sql
create table players (
  id uuid default gen_random_uuid() primary key,
  nick varchar(10) not null,
  country varchar(3) not null,
  name varchar(100) not null,
  games integer not null default 0,
  rating integer not null,
  last_played date,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);
```

### Events Table
```sql
create table events (
  id uuid default gen_random_uuid() primary key,
  title varchar(255) not null,
  date varchar(100) not null,
  location varchar(255) not null,
  description text not null,
  registration_link varchar(255),
  image varchar(255),
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);
```

### News Table
```sql
create table news (
  id uuid default gen_random_uuid() primary key,
  title varchar(255) not null,
  author varchar(100) not null,
  date varchar(100) not null,
  summary text not null,
  content text not null,
  image varchar(255),
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);
```

### Federations Table
```sql
create table federations (
  id uuid default gen_random_uuid() primary key,
  country varchar(100) not null,
  name varchar(255) not null,
  president varchar(100) not null,
  secretary varchar(100),
  email varchar(255) not null,
  phone varchar(50) not null,
  address text not null,
  website varchar(255) not null,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);
```

## Implementation Details

### 1. Supabase Client Setup

A Supabase client has been configured in `src/supabaseClient.ts`:

```typescript
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
```

### 2. Service Layer

A service layer has been created in `src/services/supabaseService.ts` to handle all database operations:

- `getPlayers()` - Fetches all players ordered by rating
- `getEvents()` - Fetches all events
- `getEventById(id)` - Fetches a specific event by ID
- `getNews()` - Fetches all news articles
- `getNewsById(id)` - Fetches a specific news article by ID
- `getFederations()` - Fetches all federations

### 3. Page Modifications

All relevant pages have been updated to fetch data from Supabase instead of using static data:

#### RatingsPage
- Fetches player data dynamically from the `players` table
- Maintains all existing filtering and sorting functionality
- Shows loading and error states

#### EventsPage
- Fetches events data from the `events` table
- Supports both listing all events and viewing individual event details
- Shows loading and error states

#### NewsPage
- Fetches news articles from the `news` table
- Supports both listing all articles and viewing individual article details
- Shows loading and error states

#### FederationsPage
- Fetches federation data from the `federations` table
- Maintains search functionality
- Shows loading and error states

## Environment Variables

The following environment variables need to be set in a `.env` file:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Row Level Security (RLS)

For public read access to the tables, the following policies should be created:

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

## Data Migration

Initial data has been provided in SQL seed files:
- `supabase/seed/001_initial_data.sql` - Contains initial data for all tables

## Benefits of Supabase Integration

1. **Dynamic Content Management**: Content can now be updated without code changes
2. **Real-time Updates**: Future enhancements can leverage Supabase's real-time capabilities
3. **Scalability**: Database can handle growing amounts of data
4. **Maintainability**: Centralized data management
5. **Performance**: Database indexing for faster queries

## Future Enhancements

1. **Admin Panel**: Create an admin interface for managing content
2. **Real-time Updates**: Implement real-time updates for live standings
3. **User Authentication**: Add user accounts for player profiles
4. **Content Management**: Expand to other sections of the website