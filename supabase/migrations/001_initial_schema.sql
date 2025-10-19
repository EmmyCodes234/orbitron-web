-- Create players table
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

-- Create events table
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

-- Create news table
create table news (
  id uuid default gen_random_uuid() primary key,
  title varchar(255) not null,
  author varchar(100) not null,
  date varchar(100) not null,
  summary text not null,
  content text not null,
  image varchar(255),
  published boolean not null default true,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Create federations table
create table federations (
  country varchar(100) not null primary key,
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

-- Create indexes for better query performance
create index idx_players_rating on players(rating desc);
create index idx_players_country on players(country);
create index idx_players_name on players(name);
create index idx_players_nick on players(nick);
create index idx_events_date on events(date);
create index idx_news_date on news(date);
create index idx_federations_country on federations(country);