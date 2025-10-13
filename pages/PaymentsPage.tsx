import React, { useState } from 'react';
import { useLocalization } from '../contexts/LocalizationContext';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { processCompletedPayment } from '../src/services/paypalService';

// Types for our payment system
interface PaymentData {
  tournamentName: string;
  amount: number;
  playerName: string;
  currency: string;
}

interface RatingApplicationData {
  organizerName: string;
  email: string;
  eventName: string;
  startDate: string;
  endDate: string;
  location: string;
  expectedParticipants: number;
  additionalInfo: string;
  agreedToTerms: boolean;
  amount: number; // This will now be fixed at 20
}

const PaymentsPage: React.FC = () => {
  const { t } = useLocalization();
  const [activeTab, setActiveTab] = useState<'rating'>('rating');
  
  // Payment form state
  const [paymentData, setPaymentData] = useState<PaymentData>({
    tournamentName: '',
    amount: 0,
    playerName: '',
    currency: 'USD'
  });
  
  // Rating application form state
  const [ratingData, setRatingData] = useState<RatingApplicationData>({
    organizerName: '',
    email: '',
    eventName: '',
    startDate: '',
    endDate: '',
    location: '',
    expectedParticipants: 0,
    additionalInfo: '',
    agreedToTerms: false,
    amount: 20 // Fixed amount for rating application
  });
  
  // UI states
  const [isProcessing, setIsProcessing] = useState(false);
  const [applicationSuccess, setApplicationSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPayPal, setShowPayPal] = useState(false);
  const [payPalContext, setPayPalContext] = useState<'tournament' | 'rating'>('rating'); // Track which form is using PayPal
  
  // Handle payment form changes
  const handlePaymentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPaymentData(prev => ({
      ...prev,
      [name]: name === 'amount' ? parseFloat(value) || 0 : value
    }));
  };
  
  // Handle rating form changes
  const handleRatingChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    
    // Prevent changing the fixed amount
    if (name === 'amount') {
      return;
    }
    
    // Type guard for checkbox inputs
    if (type === 'checkbox') {
      const checkbox = e.target as HTMLInputElement;
      setRatingData(prev => ({
        ...prev,
        [name]: checkbox.checked
      }));
    } else {
      setRatingData(prev => ({
        ...prev,
        [name]: name === 'expectedParticipants' ? parseInt(value) || 0 : value
      }));
    }
  };
  
  // Process rating application with payment
  const processRatingApplication = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Validate required fields
      if (!ratingData.organizerName.trim()) {
        throw new Error('Please enter organizer name');
      }
      
      if (!ratingData.email.trim()) {
        throw new Error('Please enter email address');
      }
      
      if (!ratingData.eventName.trim()) {
        throw new Error('Please enter event name');
      }
      
      if (!ratingData.startDate || !ratingData.endDate) {
        throw new Error('Please enter start and end dates');
      }
      
      if (!ratingData.agreedToTerms) {
        throw new Error('You must agree to the terms and conditions');
      }
      
      // Show PayPal buttons for rating application payment
      setPayPalContext('rating');
      setShowPayPal(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred submitting your application');
    }
  };
  
  // Handle PayPal payment success
  const onPayPalSuccess = async (details: any) => {
    console.log("Payment successful:", details);
    
    try {
      setIsProcessing(true);
      
      // Process the completed payment with our backend service
      const success = await processCompletedPayment(
        details.id, // PayPal order ID
        details.payer?.payer_id || 'N/A', // Payer ID
        {
          organizerName: ratingData.organizerName,
          email: ratingData.email,
          eventName: ratingData.eventName,
          startDate: ratingData.startDate,
          endDate: ratingData.endDate,
          location: ratingData.location,
          expectedParticipants: ratingData.expectedParticipants,
          additionalInfo: ratingData.additionalInfo,
          amount: 20.00 // Fixed amount
        }
      );
      
      if (success) {
        setApplicationSuccess(true);
      } else {
        setError("Payment was processed but there was an error saving your application. Please contact support.");
      }
    } catch (err) {
      console.error("Error processing payment:", err);
      setError("An error occurred while processing your payment. Please contact support.");
    } finally {
      setIsProcessing(false);
      setShowPayPal(false);
      
      // Reset forms after success
      setTimeout(() => {
        setPaymentData({
          tournamentName: '',
          amount: 0,
          playerName: '',
          currency: 'USD'
        });
        
        setRatingData({
          organizerName: '',
          email: '',
          eventName: '',
          startDate: '',
          endDate: '',
          location: '',
          expectedParticipants: 0,
          additionalInfo: '',
          agreedToTerms: false,
          amount: 20 // Fixed amount for rating application
        });
        
        setApplicationSuccess(false);
      }, 5000);
    }
  };
  
  // Handle PayPal payment cancellation
  const onPayPalCancel = () => {
    console.log("Payment cancelled");
    setShowPayPal(false);
    setError("Payment was cancelled. Please try again if you wish to complete your payment.");
  };
  
  // Handle PayPal payment error
  const onPayPalError = (err: any) => {
    console.error("Payment error:", err);
    setShowPayPal(false);
    setError("An error occurred during payment processing. Please try again.");
  };
  
  // Currency conversion function (placeholder)
  const convertToUSD = (amount: number, fromCurrency: string): number => {
    // In a real implementation, this would use a currency conversion API
    // For now, we'll assume all inputs are already in USD
    return amount;
  };
  
  return (
    <PayPalScriptProvider options={{ 
      "clientId": "ATVeDvB8w2Xaf2OtP5O8un3oZQy1r_ahR3-rlzhJJPP6rJ5TPkyKki6KsdtRA44JeokoRNNMYHk6BXD_",
      currency: "USD",
      intent: "capture"
    }}>
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold font-orbitron mb-4 bg-clip-text text-transparent bg-gradient-to-r from-green-400 via-cyan-400 to-purple-500">
              {t('payments.title')}
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              {t('payments.subtitle')}
            </p>
          </div>

          {/* Success/Error Messages */}
          {error && (
            <div className="mb-6 p-4 bg-red-900/50 border border-red-500/50 rounded-lg text-red-200 text-center">
              {error}
            </div>
          )}
          
          {applicationSuccess && (
            <div className="mb-6 p-4 bg-green-900/50 border border-green-500/50 rounded-lg text-green-200 text-center">
              Rating application and payment processed successfully! Our team will review your application and contact you within 3-5 business days.
            </div>
          )}

          {/* Tab Navigation - Only Rating Application Tab */}
          <div className="flex border-b border-slate-700/50 mb-8">
            <button
              className={`py-4 px-6 text-lg font-medium transition-colors relative font-orbitron ${
                activeTab === 'rating'
                  ? 'text-gray-100'
                  : 'text-gray-400 hover:text-white'
              }`}
              onClick={() => {
                setActiveTab('rating');
                setError(null);
                setApplicationSuccess(false);
                setShowPayPal(false);
              }}
            >
              {t('payments.ratingApplication')}
              {activeTab === 'rating' && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-green-400 to-cyan-400"></span>
              )}
            </button>
          </div>

          {/* Rating Application Section */}
          <div className="bg-gradient-to-br from-slate-900/60 to-slate-800/60 backdrop-blur-sm rounded-2xl border border-green-400/30 p-8 shadow-xl">
            <h2 className="text-2xl font-bold text-white mb-6 font-orbitron">
              {t('payments.ratingApplication')}
            </h2>
            <p className="text-gray-300 mb-8">
              {t('payments.ratingDescription')}
            </p>
            
            {!showPayPal || payPalContext !== 'rating' ? (
              <form onSubmit={processRatingApplication} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gray-300 mb-2 font-orbitron">
                      {t('payments.organizerName')}
                    </label>
                    <input
                      type="text"
                      name="organizerName"
                      value={ratingData.organizerName}
                      onChange={handleRatingChange}
                      className="w-full bg-slate-700/50 border border-slate-600/50 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-green-400/50 focus:border-green-400/50 transition-all"
                      placeholder={t('payments.enterOrganizer')}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-300 mb-2 font-orbitron">
                      {t('payments.email')}
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={ratingData.email}
                      onChange={handleRatingChange}
                      className="w-full bg-slate-700/50 border border-slate-600/50 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-green-400/50 focus:border-green-400/50 transition-all"
                      placeholder={t('payments.enterEmail')}
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-gray-300 mb-2 font-orbitron">
                    {t('payments.eventName')}
                  </label>
                  <input
                    type="text"
                    name="eventName"
                    value={ratingData.eventName}
                    onChange={handleRatingChange}
                    className="w-full bg-slate-700/50 border border-slate-600/50 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-green-400/50 focus:border-green-400/50 transition-all"
                    placeholder={t('payments.enterEvent')}
                    required
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gray-300 mb-2 font-orbitron">
                      {t('payments.startDate')}
                    </label>
                    <input
                      type="date"
                      name="startDate"
                      value={ratingData.startDate}
                      onChange={handleRatingChange}
                      className="w-full bg-slate-700/50 border border-slate-600/50 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-green-400/50 focus:border-green-400/50 transition-all"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-300 mb-2 font-orbitron">
                      {t('payments.endDate')}
                    </label>
                    <input
                      type="date"
                      name="endDate"
                      value={ratingData.endDate}
                      onChange={handleRatingChange}
                      className="w-full bg-slate-700/50 border border-slate-600/50 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-green-400/50 focus:border-green-400/50 transition-all"
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-gray-300 mb-2 font-orbitron">
                    {t('payments.location')}
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={ratingData.location}
                    onChange={handleRatingChange}
                    className="w-full bg-slate-700/50 border border-slate-600/50 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-green-400/50 focus:border-green-400/50 transition-all"
                    placeholder={t('payments.enterLocation')}
                  />
                </div>
                
                <div>
                  <label className="block text-gray-300 mb-2 font-orbitron">
                    {t('payments.expectedParticipants')}
                  </label>
                  <input
                    type="number"
                    name="expectedParticipants"
                    value={ratingData.expectedParticipants || ''}
                    onChange={handleRatingChange}
                    min="0"
                    className="w-full bg-slate-700/50 border border-slate-600/50 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-green-400/50 focus:border-green-400/50 transition-all"
                    placeholder={t('payments.enterParticipants')}
                  />
                </div>
                
                {/* Fixed payment amount display */}
                <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700/30">
                  <h4 className="text-lg font-semibold text-white mb-3 font-orbitron">
                    Rating Application Fee
                  </h4>
                  <p className="text-gray-300 mb-4">
                    A fixed fee of $20 USD is required to process your rating application.
                  </p>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-400 mb-2">$20.00 USD</div>
                    <div className="text-gray-400">Fixed Application Fee</div>
                  </div>
                </div>
                
                <div>
                  <label className="block text-gray-300 mb-2 font-orbitron">
                    {t('payments.additionalInfo')}
                  </label>
                  <textarea
                    name="additionalInfo"
                    value={ratingData.additionalInfo}
                    onChange={handleRatingChange}
                    rows={4}
                    className="w-full bg-slate-700/50 border border-slate-600/50 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-green-400/50 focus:border-green-400/50 transition-all"
                    placeholder={t('payments.enterAdditionalInfo')}
                  ></textarea>
                </div>
                
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="terms"
                    name="agreedToTerms"
                    checked={ratingData.agreedToTerms}
                    onChange={handleRatingChange}
                    className="w-4 h-4 text-green-500 bg-slate-700/50 border-slate-600/50 rounded focus:ring-green-500/50 focus:ring-2 focus:ring-offset-0 focus:ring-offset-slate-900"
                    required
                  />
                  <label htmlFor="terms" className="ml-2 text-gray-300">
                    {t('payments.agreeToTerms')}{' '}
                    <a href="#" className="text-green-400 hover:underline">
                      {t('payments.termsAndConditions')}
                    </a>
                  </label>
                </div>
                
                <div className="pt-4">
                  <button
                    type="submit"
                    className="w-full md:w-auto bg-gradient-to-r from-green-500 to-cyan-500 text-white font-semibold py-3 px-8 rounded-lg hover:from-green-600 hover:to-cyan-600 transition-all transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-green-400/50 font-orbitron"
                  >
                    Proceed to Payment
                  </button>
                </div>
              </form>
            ) : (
              <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700/30">
                <h4 className="text-lg font-semibold text-white mb-4 font-orbitron">
                  Complete Your Rating Application Payment
                </h4>
                <p className="text-gray-300 mb-4">
                  You will be charged $20.00 USD for your rating application.
                </p>
                <div className="mb-4">
                  <PayPalButtons 
                    style={{ layout: "vertical" }}
                    createOrder={(data, actions: any) => {
                      return actions.order.create({
                        purchase_units: [
                          {
                            amount: {
                              value: "20.00",
                              currency_code: "USD"
                            },
                            description: `Rating Application: ${ratingData.eventName} by ${ratingData.organizerName}`
                          }
                        ]
                      });
                    }}
                    onApprove={async (data, actions: any) => {
                      try {
                        const details = await actions.order.capture();
                        await onPayPalSuccess(details);
                        return details;
                      } catch (err) {
                        onPayPalError(err);
                        throw err;
                      }
                    }}
                    onCancel={() => onPayPalCancel()}
                    onError={(err: any) => onPayPalError(err)}
                    disabled={isProcessing}
                  />
                </div>
                {isProcessing && (
                  <div className="text-center text-gray-300">
                    Processing your payment and application...
                  </div>
                )}
                <button
                  onClick={() => setShowPayPal(false)}
                  className="w-full bg-slate-700 text-white font-semibold py-2 px-4 rounded-lg hover:bg-slate-600 transition-all focus:outline-none focus:ring-2 focus:ring-slate-500/50 font-orbitron"
                  disabled={isProcessing}
                >
                  Back to Form
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </PayPalScriptProvider>
  );
};

export default PaymentsPage;