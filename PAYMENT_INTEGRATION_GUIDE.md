# PANASA Payment Processing Integration Guide

## Overview
This document provides guidance on integrating actual payment processing into the PANASA website. The current implementation includes all UI components and form handling, but uses simulated processing. When you're ready to integrate with a payment processor, follow these instructions.

## Current Implementation
The payment system is already set up with:
- Tournament registration payments
- Rating application submissions
- Form validation
- Success/error handling
- Responsive UI matching the existing design
- Currency handling (USD as base currency)

## Recommended Payment Processors
1. **Stripe** - Most popular, excellent documentation, supports global payments
2. **PayPal** - Widely recognized, good for international transactions
3. **Flutterwave** - Strong presence in African markets
4. **Paystack** - Popular in West Africa

## Integration Steps

### 1. Choose a Payment Processor
Select a payment processor based on:
- Geographic coverage for your member countries
- Supported currencies
- Transaction fees
- Ease of integration
- Support for one-time payments

### 2. Create Merchant Account
- Register for a merchant account with your chosen processor
- Complete verification process
- Obtain API keys (publishable and secret keys)

### 3. Install Required Dependencies
Depending on your chosen processor, install the appropriate SDK:

For Stripe:
```bash
npm install @stripe/stripe-js
```

For PayPal:
```bash
npm install @paypal/react-paypal-js
```

### 4. Update Environment Variables
Add your payment processor credentials to your environment configuration:
```env
# Stripe example
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...

# Or PayPal example
VITE_PAYPAL_CLIENT_ID=...
```

### 5. Modify Payment Processing Function
Update the `processPayment` function in `src/pages/PaymentsPage.tsx`:

#### For Stripe Integration:
```typescript
import { loadStripe } from '@stripe/stripe-js';

// Add at the top of your component
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const processPayment = async (e: React.FormEvent) => {
  e.preventDefault();
  setIsProcessing(true);
  setError(null);
  
  try {
    // Validate payment data
    if (paymentData.amount <= 0) {
      throw new Error('Please enter a valid amount');
    }
    
    // Create a checkout session on your backend
    const response = await fetch('/api/create-checkout-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount: paymentData.amount,
        currency: 'usd',
        tournamentName: paymentData.tournamentName,
        playerName: paymentData.playerName
      }),
    });
    
    const session = await response.json();
    
    // Redirect to Stripe Checkout
    const stripe = await stripePromise;
    const { error } = await stripe!.redirectToCheckout({
      sessionId: session.id
    });
    
    if (error) {
      throw new Error(error.message);
    }
  } catch (err) {
    setError(err instanceof Error ? err.message : 'An error occurred processing your payment');
  } finally {
    setIsProcessing(false);
  }
};
```

#### For PayPal Integration:
```typescript
// You would use the PayPal React components
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

// In your payment form, replace the submit button with PayPal buttons:
<PayPalButtons
  createOrder={(data, actions) => {
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            value: paymentData.amount.toString(),
          },
        },
      ],
    });
  }}
  onApprove={(data, actions) => {
    return actions.order.capture().then((details) => {
      setPaymentSuccess(true);
      // Handle successful payment
    });
  }}
/>
```

### 6. Backend Integration (if needed)
Some processors require backend endpoints:

#### Example Express.js Endpoint for Stripe:
```javascript
// backend/routes/payments.js
const express = require('express');
const router = express.Router();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

router.post('/create-checkout-session', async (req, res) => {
  try {
    const { amount, currency, tournamentName, playerName } = req.body;
    
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: currency || 'usd',
            product_data: {
              name: `Tournament Registration: ${tournamentName}`,
              description: `Registration for ${playerName}`,
            },
            unit_amount: Math.round(amount * 100), // Convert to cents
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${req.headers.origin}/payments?success=true`,
      cancel_url: `${req.headers.origin}/payments?canceled=true`,
    });
    
    res.json({ id: session.id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
```

## Currency Conversion
The system is already set up to handle currency conversion. When implementing, add:

1. Real-time exchange rate API integration
2. Display of converted amounts
3. Storage of original and converted values

Example currency conversion function:
```typescript
const convertToUSD = async (amount: number, fromCurrency: string): Promise<number> => {
  if (fromCurrency === 'USD') return amount;
  
  try {
    // Use a currency conversion API
    const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`);
    const data = await response.json();
    const rate = data.rates.USD;
    return amount * rate;
  } catch (error) {
    console.error('Currency conversion error:', error);
    // Fallback to manual conversion or show error
    return amount;
  }
};
```

## Security Considerations
1. Never expose secret API keys in client-side code
2. Always validate payments on your server
3. Use HTTPS for all payment-related pages
4. Implement proper error handling
5. Log transactions for auditing
6. Comply with PCI DSS standards

## Testing
1. Use processor-provided test cards/accounts
2. Test various scenarios:
   - Successful payments
   - Failed payments
   - Insufficient funds
   - Network errors
3. Verify email confirmations
4. Check database records

## Going Live
1. Update API keys to production values
2. Remove test data
3. Test with small transactions
4. Monitor transactions closely
5. Set up alerts for failed transactions

## Support
For implementation help, contact:
- Your payment processor's support team
- PANASA technical team
- Check processor documentation for specific integration guides

## Next Steps
1. Choose your payment processor
2. Obtain API credentials
3. Implement the integration
4. Test thoroughly
5. Go live

# Payment Integration Guide

## Overview

This guide explains how the payment system is implemented in the PANASA website. The system currently supports rating application payments with a fixed fee of $20 USD through PayPal.

## Architecture

### Frontend
- **Framework**: React with TypeScript
- **Payment Processing**: [@paypal/react-paypal-js](https://www.npmjs.com/package/@paypal/react-paypal-js)
- **UI Components**: Custom styled components with Tailwind CSS

### Backend
- **Database**: Supabase (PostgreSQL)
- **Payment Verification**: Custom PayPal service with real API integration
- **Data Storage**: Rating applications stored in `rating_applications` table

### Payment Flow

1. User fills out rating application form
2. User clicks "Proceed to Payment"
3. PayPal checkout is initiated with fixed $20 amount
4. User completes payment on PayPal
5. Payment details are sent to backend for verification
6. Backend verifies payment with PayPal API
7. Rating application is stored in database
8. Success message is displayed to user

## Implementation Details

### PayPal Integration

The PayPal integration uses the [@paypal/react-paypal-js](https://www.npmjs.com/package/@paypal/react-paypal-js) library with the following configuration:

```typescript
<PayPalScriptProvider options={{ 
  "clientId": "ATVeDvB8w2Xaf2OtP5O8un3oZQy1r_ahR3-rlzhJJPP6rJ5TPkyKki6KsdtRA44JeokoRNNMYHk6BXD_",
  currency: "USD",
  intent: "capture"
}}>
```

### Backend Services

The backend service is implemented in [src/services/paypalService.ts](file:///c:/LitoCodes/panasaweb/src/services/paypalService.ts) and includes:

1. **Payment Verification**: Real API calls to PayPal to verify payment status and amount
2. **Data Storage**: Functions to store rating applications in Supabase
3. **Status Management**: Functions to update payment status in the database

### Database Schema

The `rating_applications` table is defined in [supabase/migrations/004_create_rating_applications_table.sql](file:///c:/LitoCodes/panasaweb/supabase/migrations/004_create_rating_applications_table.sql):

```sql
CREATE TABLE IF NOT EXISTS rating_applications (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  organizer_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  event_name VARCHAR(255) NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  location TEXT,
  expected_participants INTEGER DEFAULT 0,
  additional_info TEXT,
  amount DECIMAL(10, 2) NOT NULL,
  payment_id VARCHAR(255) UNIQUE NOT NULL,
  payment_status VARCHAR(50) NOT NULL DEFAULT 'PENDING',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

## Security Features

1. **Payment Verification**: All payments are verified with PayPal's API before storing applications
2. **Amount Validation**: Payments are checked to ensure they are exactly $20 USD
3. **Database Security**: Row Level Security (RLS) policies protect data access
4. **Environment Variables**: Sensitive credentials are stored in environment variables

## Error Handling

The system includes comprehensive error handling for:

1. **Payment Verification Failures**: Invalid or incomplete payments are rejected
2. **Database Errors**: Failed data storage operations are logged and reported
3. **Network Issues**: Connection problems with PayPal API are handled gracefully
4. **User Input Validation**: Form data is validated before processing

## Testing

### Manual Testing

1. Navigate to the Payments page
2. Fill out the rating application form with valid data
3. Click "Proceed to Payment"
4. Complete the PayPal checkout process
5. Verify that the success message is displayed
6. Check the Supabase dashboard to confirm the application was stored

### Automated Testing

Unit tests for the PayPal service can be found in [src/services/paypalService.test.ts](file:///c:/LitoCodes/panasaweb/src/services/paypalService.test.ts).

## Configuration

### Environment Variables

See [PAYPAL_ENV_SETUP.md](file:///c:/LitoCodes/panasaweb/PAYPAL_ENV_SETUP.md) for detailed instructions on setting up environment variables.

### Production Deployment

1. Ensure all environment variables are set in your production environment
2. Verify PayPal account is in live mode (not sandbox)
3. Test the payment flow with a small amount before going live

## Troubleshooting

### Common Issues

1. **Payment Verification Failures**: Check PayPal credentials in environment variables
2. **Database Connection Errors**: Verify Supabase URL and anon key
3. **TypeScript Errors**: Ensure all dependencies are installed with `npm install`

### Support

For issues with the payment integration:
- PayPal Merchant Support: https://www.paypal.com/mysaccount/sell/support
- Supabase Support: https://supabase.com/support

## Future Enhancements

Potential improvements to the payment system:
1. **Webhook Integration**: Implement PayPal webhooks for real-time payment notifications
2. **Email Notifications**: Send automatic confirmation emails upon successful payments
3. **Admin Dashboard**: Create an admin interface for viewing and managing applications
4. **Refund Processing**: Add functionality for processing refunds through the PayPal API
