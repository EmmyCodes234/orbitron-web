// Import necessary modules
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3';

// Initialize Supabase client
const supabase = createClient(
  Deno.env.get('SUPABASE_URL') ?? '',
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
);

// Email configuration
const EMAIL_TO = 'info@panafricanscrabble.com';
const EMAIL_FROM = 'noreply@panafricanscrabble.com';

// Main function to handle contact form submissions
serve(async (req) => {
  try {
    // Parse the request body
    const { name, email, message } = await req.json();
    
    // Validate required fields
    if (!name || !email || !message) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields: name, email, message' }),
        { headers: { 'Content-Type': 'application/json' }, status: 400 }
      );
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return new Response(
        JSON.stringify({ error: 'Invalid email format' }),
        { headers: { 'Content-Type': 'application/json' }, status: 400 }
      );
    }
    
    // Store the contact form submission in the database
    const { data, error } = await supabase
      .from('contact_submissions')
      .insert([
        {
          name: name,
          email: email,
          message: message,
          created_at: new Date().toISOString()
        }
      ]);
    
    if (error) {
      console.error('Database error:', error);
      return new Response(
        JSON.stringify({ error: 'Failed to store contact submission' }),
        { headers: { 'Content-Type': 'application/json' }, status: 500 }
      );
    }
    
    // Send email notification (using Supabase email functionality)
    // Note: This is a simplified version. In production, you might want to use
    // a dedicated email service like SendGrid, Mailgun, or AWS SES.
    const emailData = {
      to: EMAIL_TO,
      from: EMAIL_FROM,
      subject: `New Contact Form Submission from ${name}`,
      text: `
        New contact form submission:
        
        Name: ${name}
        Email: ${email}
        Message: ${message}
        
        Sent at: ${new Date().toISOString()}
      `
    };
    
    // Log the email data (in a real implementation, you would send the email here)
    console.log('Email would be sent:', emailData);
    
    // Return success response
    return new Response(
      JSON.stringify({ message: 'Contact form submitted successfully' }),
      { headers: { 'Content-Type': 'application/json' }, status: 200 }
    );
  } catch (error) {
    console.error('Error processing contact form:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { headers: { 'Content-Type': 'application/json' }, status: 500 }
    );
  }
});