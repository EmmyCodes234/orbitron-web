# PayPal Environment Setup

## Required Environment Variables

To use the PayPal integration, you need to set the following environment variables in your `.env` file:

```env
VITE_PAYPAL_CLIENT_ID=your_paypal_client_id_here
VITE_PAYPAL_SECRET=your_paypal_secret_here
```

## How to Obtain PayPal Credentials

1. Go to the [PayPal Developer Dashboard](https://developer.paypal.com/)
2. Log in with your PayPal business account
3. Navigate to "My Apps & Credentials"
4. Click "Create App"
5. Enter an app name (e.g., "PANASA Website")
6. Select "Merchant" as the app type
7. Click "Create App"
8. On the app details page, you'll find:
   - **Client ID**: Copy this value to `VITE_PAYPAL_CLIENT_ID`
   - **Secret**: Click "Show" to reveal and copy this value to `VITE_PAYPAL_SECRET`

## Supabase Environment Variables

You also need to configure Supabase:

```env
VITE_SUPABASE_URL=your_supabase_project_url_here
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key_here
```

## Environment Setup Steps

1. Create a `.env` file in the root of your project
2. Add the required environment variables:
   ```env
   VITE_PAYPAL_CLIENT_ID=ATVeDvB8w2Xaf2OtP5O8un3oZQy1r_ahR3-rlzhJJPP6rJ5TPkyKki6KsdtRA44JeokoRNNMYHk6BXD_
   VITE_PAYPAL_SECRET=ENQ3JaH_ty9B_bqZGUsUrscogL-YSIdMxzjsa0cZYg49-aeZlJnWh0WjwrzZE8UTNn4yhvE9XSQnxiu1
   VITE_SUPABASE_URL=https://your-project-id.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-key-here
   ```
3. Restart your development server to load the new environment variables

## Security Notes

- Never commit your `.env` file to version control
- The `.env` file is already included in `.gitignore` to prevent accidental commits
- In production, set these environment variables in your deployment platform's configuration

## Testing the Integration

1. Start your development server: `npm run dev`
2. Navigate to the Payments page
3. Fill out the rating application form
4. Click "Proceed to Payment"
5. Complete the PayPal checkout process using test accounts

For sandbox testing, you can use PayPal's sandbox environment by changing the API endpoints in the [paypalService.ts](file:///c:/LitoCodes/panasaweb/src/services/paypalService.ts) file.