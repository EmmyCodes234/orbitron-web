import { supabase } from '../supabaseClient';

// Define the payment verification interface
export interface PaymentVerificationData {
  paymentId: string;
  payerId: string;
  paymentToken?: string;
  amount: number;
  currency: string;
  description: string;
  status: string;
  createTime: string;
  updateTime: string;
}

// Define the rating application interface
export interface RatingApplication {
  id?: string;
  organizerName: string;
  email: string;
  eventName: string;
  startDate: string;
  endDate: string;
  location: string;
  expectedParticipants: number;
  additionalInfo: string;
  amount: number;
  paymentId: string;
  paymentStatus: string;
  createdAt?: string;
  updatedAt?: string;
}

/**
 * Get PayPal access token
 * @returns Access token or null if failed
 */
const getPayPalAccessToken = async (): Promise<string | null> => {
  try {
    const clientId = import.meta.env.VITE_PAYPAL_CLIENT_ID;
    const secret = import.meta.env.VITE_PAYPAL_SECRET;
    
    if (!clientId || !secret) {
      console.error('PayPal credentials not configured');
      return null;
    }
    
    const response = await fetch('https://api.paypal.com/v1/oauth2/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic ' + btoa(`${clientId}:${secret}`)
      },
      body: 'grant_type=client_credentials'
    });
    
    if (!response.ok) {
      console.error('Failed to get PayPal access token:', response.status, response.statusText);
      return null;
    }
    
    const data = await response.json();
    return data.access_token;
  } catch (error) {
    console.error('Error getting PayPal access token:', error);
    return null;
  }
};

/**
 * Verify PayPal payment using the PayPal REST API
 * @param paymentId - The PayPal payment ID
 * @returns Payment verification data or null if verification fails
 */
export const verifyPayPalPayment = async (
  paymentId: string
): Promise<PaymentVerificationData | null> => {
  try {
    const accessToken = await getPayPalAccessToken();
    
    if (!accessToken) {
      console.error('Unable to get PayPal access token');
      return null;
    }
    
    // For PayPal Orders API (which is what we're using), we need to check the order details
    const response = await fetch(`https://api.paypal.com/v2/checkout/orders/${paymentId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      }
    });
    
    if (!response.ok) {
      console.error('Failed to verify PayPal payment:', response.status, response.statusText);
      return null;
    }
    
    const orderData = await response.json();
    
    // Extract relevant information from the order
    const purchaseUnit = orderData.purchase_units[0];
    const amount = purchaseUnit.amount.value;
    const currency = purchaseUnit.amount.currency_code;
    const description = purchaseUnit.description || 'Rating Application Fee';
    
    const verificationData: PaymentVerificationData = {
      paymentId,
      payerId: orderData.payer?.payer_id || 'N/A',
      amount: parseFloat(amount),
      currency,
      description,
      status: orderData.status,
      createTime: orderData.create_time,
      updateTime: orderData.update_time
    };
    
    return verificationData;
  } catch (error) {
    console.error('Error verifying PayPal payment:', error);
    return null;
  }
};

/**
 * Store rating application in the database
 * @param application - The rating application data
 * @returns The stored application or null if storage fails
 */
export const storeRatingApplication = async (
  application: RatingApplication
): Promise<RatingApplication | null> => {
  try {
    // Check if supabase client is available
    if (!supabase) {
      console.error('Supabase client not available');
      return null;
    }
    
    // Prepare the data for insertion
    const ratingApplicationData = {
      organizer_name: application.organizerName,
      email: application.email,
      event_name: application.eventName,
      start_date: application.startDate,
      end_date: application.endDate,
      location: application.location,
      expected_participants: application.expectedParticipants,
      additional_info: application.additionalInfo,
      amount: application.amount,
      payment_id: application.paymentId,
      payment_status: application.paymentStatus,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    
    // Insert the rating application into the database
    // Using a more generic approach to avoid TypeScript errors
    const result = await (supabase as any)
      .from('rating_applications')
      .insert([ratingApplicationData])
      .select('*');
    
    const { data, error } = result;
    
    if (error) {
      console.error('Error storing rating application:', error);
      return null;
    }
    
    // Check if data exists and has at least one element
    if (!data || data.length === 0) {
      console.error('No data returned from rating application insertion');
      return null;
    }
    
    // Map the Supabase response back to our interface
    const storedApplication: RatingApplication = {
      id: data[0].id,
      organizerName: data[0].organizer_name,
      email: data[0].email,
      eventName: data[0].event_name,
      startDate: data[0].start_date,
      endDate: data[0].end_date,
      location: data[0].location,
      expectedParticipants: data[0].expected_participants,
      additionalInfo: data[0].additional_info,
      amount: data[0].amount,
      paymentId: data[0].payment_id,
      paymentStatus: data[0].payment_status,
      createdAt: data[0].created_at,
      updatedAt: data[0].updated_at
    };
    
    return storedApplication;
  } catch (error) {
    console.error('Error storing rating application:', error);
    return null;
  }
};

/**
 * Get rating application by payment ID
 * @param paymentId - The PayPal payment ID
 * @returns The rating application or null if not found
 */
export const getRatingApplicationByPaymentId = async (
  paymentId: string
): Promise<RatingApplication | null> => {
  try {
    // Check if supabase client is available
    if (!supabase) {
      console.error('Supabase client not available');
      return null;
    }
    
    // Query the rating application by payment ID
    // Using a more generic approach to avoid TypeScript errors
    const result = await (supabase as any)
      .from('rating_applications')
      .select('*')
      .eq('payment_id', paymentId)
      .single();
    
    const { data, error } = result;
    
    if (error) {
      console.error('Error fetching rating application:', error);
      return null;
    }
    
    if (!data) {
      return null;
    }
    
    // Map the Supabase response back to our interface
    const application: RatingApplication = {
      id: data.id,
      organizerName: data.organizer_name,
      email: data.email,
      eventName: data.event_name,
      startDate: data.start_date,
      endDate: data.end_date,
      location: data.location,
      expectedParticipants: data.expected_participants,
      additionalInfo: data.additional_info,
      amount: data.amount,
      paymentId: data.payment_id,
      paymentStatus: data.payment_status,
      createdAt: data.created_at,
      updatedAt: data.updated_at
    };
    
    return application;
  } catch (error) {
    console.error('Error fetching rating application:', error);
    return null;
  }
};

/**
 * Update payment status for a rating application
 * @param paymentId - The PayPal payment ID
 * @param status - The new payment status
 * @returns Boolean indicating success or failure
 */
export const updatePaymentStatus = async (
  paymentId: string,
  status: string
): Promise<boolean> => {
  try {
    // Check if supabase client is available
    if (!supabase) {
      console.error('Supabase client not available');
      return false;
    }
    
    // Update the payment status
    // Using a more generic approach to avoid TypeScript errors
    const result = await (supabase as any)
      .from('rating_applications')
      .update({
        payment_status: status,
        updated_at: new Date().toISOString()
      })
      .eq('payment_id', paymentId);
    
    const { error } = result;
    
    if (error) {
      console.error('Error updating payment status:', error);
      return false;
    }
    
    return true;
  } catch (error) {
    console.error('Error updating payment status:', error);
    return false;
  }
};

/**
 * Process a completed PayPal payment
 * @param paymentId - The PayPal payment ID
 * @param payerId - The PayPal payer ID
 * @param applicationData - The rating application data
 * @returns Boolean indicating success or failure
 */
export const processCompletedPayment = async (
  paymentId: string,
  payerId: string,
  applicationData: Omit<RatingApplication, 'paymentId' | 'paymentStatus'>
): Promise<boolean> => {
  try {
    // First, verify the payment
    const verification = await verifyPayPalPayment(paymentId);
    if (!verification || verification.status !== 'COMPLETED') {
      console.error('Payment verification failed');
      return false;
    }
    
    // Verify the amount is correct ($20)
    if (verification.amount !== 20.00) {
      console.error('Payment amount mismatch. Expected $20.00, got $' + verification.amount);
      return false;
    }
    
    // Create the rating application with payment information
    const application: RatingApplication = {
      ...applicationData,
      paymentId,
      paymentStatus: 'COMPLETED'
    };
    
    // Store the rating application
    const storedApplication = await storeRatingApplication(application);
    
    if (!storedApplication) {
      console.error('Failed to store rating application');
      return false;
    }
    
    // In a real implementation, you would send a confirmation email here
    console.log(`Rating application processed successfully for payment ${paymentId}`);
    
    return true;
  } catch (error) {
    console.error('Error processing completed payment:', error);
    return false;
  }
};