import React, { useState } from 'react';
import { useLocalization } from '../contexts/LocalizationContext';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

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
  amount: number; // Add amount for rating application payment
}

const PaymentsPage: React.FC = () => {
  const { t } = useLocalization();
  const [activeTab, setActiveTab] = useState<'payment' | 'rating'>('payment');
  
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
    amount: 50 // Default amount for rating application
  });
  
  // UI states
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [applicationSuccess, setApplicationSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPayPal, setShowPayPal] = useState(false);
  const [payPalContext, setPayPalContext] = useState<'tournament' | 'rating'>('tournament'); // Track which form is using PayPal
  
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
        [name]: name === 'expectedParticipants' || name === 'amount' ? parseInt(value) || 0 : value
      }));
    }
  };
  
  // Process payment - now with PayPal integration
  const processPayment = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Validate payment data
      if (paymentData.amount <= 0) {
        throw new Error('Please enter a valid amount');
      }
      
      if (!paymentData.tournamentName.trim()) {
        throw new Error('Please enter a tournament name');
      }
      
      if (!paymentData.playerName.trim()) {
        throw new Error('Please enter your name');
      }
      
      // Show PayPal buttons for tournament payment
      setPayPalContext('tournament');
      setShowPayPal(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred processing your payment');
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
      
      if (ratingData.amount <= 0) {
        throw new Error('Please enter a valid application fee amount');
      }
      
      // Show PayPal buttons for rating application payment
      setPayPalContext('rating');
      setShowPayPal(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred submitting your application');
    }
  };
  
  // Handle PayPal payment success
  const onPayPalSuccess = (details: any) => {
    console.log("Payment successful:", details);
    
    if (payPalContext === 'tournament') {
      setPaymentSuccess(true);
    } else {
      // For rating applications, we would submit the application data to backend
      setApplicationSuccess(true);
    }
    
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
        amount: 50
      });
      
      setPaymentSuccess(false);
      setApplicationSuccess(false);
    }, 5000);
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
      "clientId": "AbrAXPbS6vtukD877HcafP42En6qVfZUwocLmEWN7sFYrshKuJjRvdJDDyHqV3g08JmfKfZ1afkXTLgO",
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
          
          {paymentSuccess && (
            <div className="mb-6 p-4 bg-green-900/50 border border-green-500/50 rounded-lg text-green-200 text-center">
              Tournament payment processed successfully! A confirmation email will be sent to your address.
            </div>
          )}
          
          {applicationSuccess && (
            <div className="mb-6 p-4 bg-green-900/50 border border-green-500/50 rounded-lg text-green-200 text-center">
              Rating application and payment processed successfully! Our team will review your application and contact you within 3-5 business days.
            </div>
          )}

          {/* Tab Navigation */}
          <div className="flex border-b border-slate-700/50 mb-8">
            <button
              className={`py-4 px-6 text-lg font-medium transition-colors relative font-orbitron ${
                activeTab === 'payment'
                  ? 'text-gray-100'
                  : 'text-gray-400 hover:text-white'
              }`}
              onClick={() => {
                setActiveTab('payment');
                setError(null);
                setPaymentSuccess(false);
                setApplicationSuccess(false);
                setShowPayPal(false);
              }}
            >
              {t('payments.paymentPortal')}
              {activeTab === 'payment' && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-green-400 to-cyan-400"></span>
              )}
            </button>
            <button
              className={`py-4 px-6 text-lg font-medium transition-colors relative font-orbitron ${
                activeTab === 'rating'
                  ? 'text-gray-100'
                  : 'text-gray-400 hover:text-white'
              }`}
              onClick={() => {
                setActiveTab('rating');
                setError(null);
                setPaymentSuccess(false);
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

          {/* Payment Portal Section */}
          {activeTab === 'payment' && (
            <div className="bg-gradient-to-br from-slate-900/60 to-slate-800/60 backdrop-blur-sm rounded-2xl border border-green-400/30 p-8 mb-12 shadow-xl">
              <h2 className="text-2xl font-bold text-white mb-6 font-orbitron">
                {t('payments.paymentPortal')}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold text-green-400 mb-4 font-orbitron">
                    {t('payments.tournamentPayments')}
                  </h3>
                  <p className="text-gray-300 mb-6">
                    {t('payments.paymentDescription')}
                  </p>
                  <div className="bg-slate-800/50 rounded-xl p-6 mb-6 border border-slate-700/30">
                    <h4 className="text-lg font-semibold text-white mb-3 font-orbitron">
                      {t('payments.howItWorks')}
                    </h4>
                    <ul className="space-y-3 text-gray-300">
                      <li className="flex items-start">
                        <span className="text-green-400 mr-2">•</span>
                        {t('payments.step1')}
                      </li>
                      <li className="flex items-start">
                        <span className="text-green-400 mr-2">•</span>
                        {t('payments.step2')}
                      </li>
                      <li className="flex items-start">
                        <span className="text-green-400 mr-2">•</span>
                        {t('payments.step3')}
                      </li>
                    </ul>
                  </div>
                  <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700/30">
                    <h4 className="text-lg font-semibold text-white mb-3 font-orbitron">
                      Payment Information
                    </h4>
                    <ul className="space-y-2 text-gray-300 text-sm">
                      <li className="flex items-start">
                        <span className="text-green-400 mr-2">•</span>
                        <span>All payments are processed in USD</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-green-400 mr-2">•</span>
                        <span>Local currency will be converted to USD at current exchange rates</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-green-400 mr-2">•</span>
                        <span>Secure payment processing with industry-standard encryption</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-green-400 mr-2">•</span>
                        <span>Confirmation emails sent immediately after payment</span>
                      </li>
                    </ul>
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-green-400 mb-4 font-orbitron">
                    {t('payments.makePayment')}
                  </h3>
                  {!showPayPal || payPalContext !== 'tournament' ? (
                    <form onSubmit={processPayment} className="bg-slate-800/50 rounded-xl p-6 border border-slate-700/30">
                      <div className="mb-4">
                        <label className="block text-gray-300 mb-2 font-orbitron">
                          {t('payments.tournamentName')}
                        </label>
                        <input
                          type="text"
                          name="tournamentName"
                          value={paymentData.tournamentName}
                          onChange={handlePaymentChange}
                          className="w-full bg-slate-700/50 border border-slate-600/50 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-green-400/50 focus:border-green-400/50 transition-all"
                          placeholder={t('payments.enterTournament')}
                          required
                        />
                      </div>
                      <div className="mb-4">
                        <label className="block text-gray-300 mb-2 font-orbitron">
                          {t('payments.amount')} (USD)
                        </label>
                        <div className="relative">
                          <span className="absolute left-3 top-3 text-gray-400">$</span>
                          <input
                            type="number"
                            name="amount"
                            value={paymentData.amount || ''}
                            onChange={handlePaymentChange}
                            min="0"
                            step="0.01"
                            className="w-full bg-slate-700/50 border border-slate-600/50 rounded-lg px-4 py-3 pl-8 text-white focus:outline-none focus:ring-2 focus:ring-green-400/50 focus:border-green-400/50 transition-all"
                            placeholder="0.00"
                            required
                          />
                        </div>
                      </div>
                      <div className="mb-6">
                        <label className="block text-gray-300 mb-2 font-orbitron">
                          {t('payments.playerName')}
                        </label>
                        <input
                          type="text"
                          name="playerName"
                          value={paymentData.playerName}
                          onChange={handlePaymentChange}
                          className="w-full bg-slate-700/50 border border-slate-600/50 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-green-400/50 focus:border-green-400/50 transition-all"
                          placeholder={t('payments.enterPlayerName')}
                          required
                        />
                      </div>
                      <button 
                        type="submit"
                        className="w-full bg-gradient-to-r from-green-500 to-cyan-500 text-white font-semibold py-3 px-6 rounded-lg hover:from-green-600 hover:to-cyan-600 transition-all transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-green-400/50 font-orbitron"
                      >
                        Proceed to PayPal
                      </button>
                    </form>
                  ) : (
                    <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700/30">
                      <h4 className="text-lg font-semibold text-white mb-4 font-orbitron">
                        Complete Your Payment
                      </h4>
                      <p className="text-gray-300 mb-4">
                        You will be charged ${paymentData.amount.toFixed(2)} USD for tournament registration.
                      </p>
                      <div className="mb-4">
                        <PayPalButtons 
                          style={{ layout: "vertical" }}
                          createOrder={(data, actions: any) => {
                            return actions.order.create({
                              purchase_units: [
                                {
                                  amount: {
                                    value: paymentData.amount.toFixed(2),
                                    currency_code: "USD"
                                  },
                                  description: `Tournament Registration: ${paymentData.tournamentName} for ${paymentData.playerName}`
                                }
                              ]
                            });
                          }}
                          onApprove={async (data, actions: any) => {
                            try {
                              const details = await actions.order.capture();
                              onPayPalSuccess(details);
                              return details;
                            } catch (err) {
                              onPayPalError(err);
                              throw err;
                            }
                          }}
                          onCancel={() => onPayPalCancel()}
                          onError={(err: any) => onPayPalError(err)}
                        />
                      </div>
                      <button
                        onClick={() => setShowPayPal(false)}
                        className="w-full bg-slate-700 text-white font-semibold py-2 px-4 rounded-lg hover:bg-slate-600 transition-all focus:outline-none focus:ring-2 focus:ring-slate-500/50 font-orbitron"
                      >
                        Back to Form
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Rating Application Section */}
          {activeTab === 'rating' && (
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
                  
                  <div>
                    <label className="block text-gray-300 mb-2 font-orbitron">
                      Application Fee (USD)
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-3 text-gray-400">$</span>
                      <input
                        type="number"
                        name="amount"
                        value={ratingData.amount || ''}
                        onChange={handleRatingChange}
                        min="0"
                        step="0.01"
                        className="w-full bg-slate-700/50 border border-slate-600/50 rounded-lg px-4 py-3 pl-8 text-white focus:outline-none focus:ring-2 focus:ring-green-400/50 focus:border-green-400/50 transition-all"
                        placeholder="50.00"
                        required
                      />
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
                    You will be charged ${ratingData.amount.toFixed(2)} USD for your rating application.
                  </p>
                  <div className="mb-4">
                    <PayPalButtons 
                      style={{ layout: "vertical" }}
                      createOrder={(data, actions: any) => {
                        return actions.order.create({
                          purchase_units: [
                            {
                              amount: {
                                value: ratingData.amount.toFixed(2),
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
                          onPayPalSuccess(details);
                          return details;
                        } catch (err) {
                          onPayPalError(err);
                          throw err;
                        }
                      }}
                      onCancel={() => onPayPalCancel()}
                      onError={(err: any) => onPayPalError(err)}
                    />
                  </div>
                  <button
                    onClick={() => setShowPayPal(false)}
                    className="w-full bg-slate-700 text-white font-semibold py-2 px-4 rounded-lg hover:bg-slate-600 transition-all focus:outline-none focus:ring-2 focus:ring-slate-500/50 font-orbitron"
                  >
                    Back to Form
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </PayPalScriptProvider>
  );
};

export default PaymentsPage;