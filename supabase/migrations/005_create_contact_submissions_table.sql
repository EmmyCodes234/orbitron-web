-- Create contact submissions table
create table if not exists contact_submissions (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  email text not null,
  message text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Add indexes for better query performance
create index if not exists contact_submissions_created_at_idx on contact_submissions (created_at);

-- Enable RLS (Row Level Security)
alter table contact_submissions enable row level security;

-- Create policy to allow inserts from anyone (for contact form submissions)
create policy "Allow public inserts" on contact_submissions
  for insert with check (true);

-- Grant necessary permissions
grant usage on schema public to anon, authenticated;
grant insert on table contact_submissions to anon;
grant select on table contact_submissions to authenticated;