-- Add published column to news table
alter table news 
add column published boolean not null default true;

-- Add index for better query performance on published column
create index idx_news_published on news(published);