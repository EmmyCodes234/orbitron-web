-- Create a function to send email notifications when a contact form is submitted
-- Note: This is a simplified version that logs the notification
-- In a production environment, you would integrate with an email service

create or replace function handle_new_contact_submission()
returns trigger as $$
begin
  -- Log the new contact submission (in a real implementation, you would send an email here)
  raise notice 'New contact form submission from % (%) at %: %', 
    new.name, new.email, new.created_at, substring(new.message, 1, 100);
  
  -- In a production environment, you would uncomment and configure the following:
  -- perform http_post(
  --   'https://api.emailservice.com/send',
  --   json_build_object(
  --     'to', 'info@panafricanscrabble.com',
  --     'from', 'noreply@panafricanscrabble.com',
  --     'subject', 'New Contact Form Submission from ' || new.name,
  --     'text', 'Name: ' || new.name || E'\nEmail: ' || new.email || E'\nMessage: ' || new.message
  --   )
  -- );
  
  return new;
end;
$$ language plpgsql;

-- Create a trigger to call the function when a new contact submission is inserted
create trigger on_contact_submission
  after insert on contact_submissions
  for each row execute function handle_new_contact_submission();