# Contact Form System

## Overview

The contact form system allows visitors to submit inquiries through the website. The system stores submissions in a database and provides admin access to view all submissions.

## Components

### 1. Frontend Form (ContactPage.tsx)
- Collects user input (name, email, message)
- Validates input on the client side
- Submits data to the Supabase database
- Provides user feedback

### 2. Database (contact_submissions table)
- Stores all contact form submissions
- Fields: id, name, email, message, created_at
- Allows anonymous inserts but requires authentication for viewing

### 3. Admin Panel
- Displays all contact submissions in a table format
- Allows admins to view and manage submissions

## How It Works

1. **User Submission**:
   - User fills out the contact form
   - Form validates input (required fields, email format)
   - Data is inserted into the `contact_submissions` table

2. **Data Storage**:
   - Submissions are stored in the Supabase database
   - Each submission includes a timestamp

3. **Admin Access**:
   - Admins can view submissions through the admin panel
   - Submissions are displayed in chronological order (newest first)

## Setup Instructions

### Database Migration
Run the following migrations:
1. `005_create_contact_submissions_table.sql` - Creates the contact submissions table
2. `006_create_contact_notification_function.sql` - Creates a notification function (currently logs to console)

### Environment Variables
No special environment variables are required for the basic functionality.

## Future Enhancements

### Email Notifications
To implement real email notifications:

1. **Option 1: Supabase Email Service**
   - Configure Supabase Email service
   - Update the notification function to send emails

2. **Option 2: Third-party Email Service**
   - Integrate with SendGrid, Mailgun, or similar services
   - Store API keys in Supabase secrets
   - Update the notification function to use the email service

3. **Option 3: Server-side Function**
   - Create a Supabase Edge Function to handle email sending
   - Deploy the function
   - Configure the function to trigger on new submissions

### Example Email Integration (Supabase Function)
```javascript
// In supabase/functions/contact-notification/index.ts
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3';

serve(async (req) => {
  const supabase = createClient(
    Deno.env.get('SUPABASE_URL') ?? '',
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
  );
  
  // Get the new submission from the webhook
  const { record } = await req.json();
  
  // Send email notification
  // Implementation depends on chosen email service
  
  return new Response(
    JSON.stringify({ message: 'Notification sent' }),
    { headers: { 'Content-Type': 'application/json' } }
  );
});
```

## Troubleshooting

### Common Issues

1. **Form Not Submitting**:
   - Check browser console for JavaScript errors
   - Verify Supabase client is properly configured
   - Ensure database permissions are correct

2. **Submissions Not Appearing in Admin**:
   - Check database connection
   - Verify user has admin privileges
   - Confirm the contact_submissions table exists

3. **Validation Errors**:
   - Ensure all required fields are filled
   - Check email format is valid
   - Verify no network errors occurred during submission

## Security Considerations

- The contact form allows anonymous submissions to prevent barriers to communication
- Admin access is restricted to authenticated users
- Input validation prevents basic injection attacks
- Rate limiting should be implemented to prevent spam (not currently implemented)