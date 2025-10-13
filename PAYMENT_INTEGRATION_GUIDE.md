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