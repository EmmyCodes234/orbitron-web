# Contact Form Setup Guide

This guide explains how to set up and deploy the contact form functionality for the PANASA website.

## Overview

The contact form now uses Supabase Edge Functions to:
1. Store form submissions in a database table
2. Send email notifications to info@panafricanscrabble.com

## Prerequisites

1. Supabase CLI installed
2. Supabase project set up
3. Proper environment variables configured

## Database Setup

The contact form submissions are stored in a `contact_submissions` table. The migration file is located at:
`supabase/migrations/005_create_contact_submissions_table.sql`

To apply the migration:
```bash
supabase migration up
```

## Function Deployment

The contact form uses a Supabase Edge Function located at:
`supabase/functions/contact/index.ts`

To deploy the function:
```bash
npm run supabase:deploy
```

Or directly with Supabase CLI:
```bash
supabase functions deploy contact
```

## Configuration

The function uses the following environment variables:
- `SUPABASE_URL` - Your Supabase project URL
- `SUPABASE_SERVICE_ROLE_KEY` - Your Supabase service role key

These are automatically available in Supabase Edge Functions.

## Email Configuration

The function is configured to send emails to:
- TO: `info@panafricanscrabble.com`
- FROM: `noreply@panafricanscrabble.com`

## Testing

To test the contact form:
1. Deploy the function
2. Fill out the contact form on the website
3. Check that:
   - The submission is stored in the database
   - An email notification is sent

## Production Considerations

For production use, consider:
1. Using a dedicated email service (SendGrid, Mailgun, etc.) instead of console logging
2. Adding rate limiting to prevent spam
3. Implementing CAPTCHA or similar anti-spam measures
4. Adding more detailed error handling and logging

## Troubleshooting

If the contact form isn't working:
1. Check the browser console for JavaScript errors
2. Check the Supabase function logs:
   ```bash
   supabase functions logs contact
   ```
3. Verify the database table exists and has proper permissions
4. Ensure environment variables are correctly set