import React from 'react';
import { useLocalization } from '../contexts/LocalizationContext';

const TermsAndConditionsPage: React.FC = () => {
  const { t } = useLocalization();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-gradient-to-br from-slate-900/60 to-slate-800/60 backdrop-blur-sm rounded-2xl border border-green-400/30 p-8 shadow-xl">
          <h1 className="text-4xl font-bold font-orbitron mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-green-400 via-cyan-400 to-purple-500">
            Terms and Conditions
          </h1>
          
          <div className="prose prose-invert max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-4 font-orbitron">1. Introduction</h2>
              <p className="text-gray-300 mb-4">
                Welcome to the Pan African Scrabble Association (PANASA) payment portal. These terms and conditions govern your use of our payment services for tournament applications and rating services.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-4 font-orbitron">2. Payment Terms</h2>
              <p className="text-gray-300 mb-4">
                All payments made through this portal are processed securely via PayPal. By using our payment services, you agree to:
              </p>
              <ul className="list-disc list-inside text-gray-300 mb-4 space-y-2">
                <li>Provide accurate and complete information for all payment transactions</li>
                <li>Comply with all applicable laws and regulations in your jurisdiction</li>
                <li>Not use the payment system for any fraudulent or unauthorized purposes</li>
                <li>Accept responsibility for all fees and charges associated with your transactions</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-4 font-orbitron">3. Rating Application Terms</h2>
              <p className="text-gray-300 mb-4">
                The $20 USD rating application fee is non-refundable and covers the administrative costs of processing your tournament rating application. This fee includes:
              </p>
              <ul className="list-disc list-inside text-gray-300 mb-4 space-y-2">
                <li>Review and verification of tournament documentation</li>
                <li>Processing of player ratings and results</li>
                <li>Integration of results into the official PANASA ratings system</li>
                <li>Provision of official rating certificates upon completion</li>
              </ul>
              <p className="text-gray-300 mb-4">
                Applications are typically processed within 3-5 business days. Complex applications may require additional time.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-4 font-orbitron">4. Refund Policy</h2>
              <p className="text-gray-300 mb-4">
                All payments made for rating applications are final and non-refundable. In exceptional circumstances, refunds may be considered at the discretion of PANASA administration.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-4 font-orbitron">5. Limitation of Liability</h2>
              <p className="text-gray-300 mb-4">
                PANASA shall not be liable for any direct, indirect, incidental, special, or consequential damages arising out of or in connection with your use of our payment services, including but not limited to:
              </p>
              <ul className="list-disc list-inside text-gray-300 mb-4 space-y-2">
                <li>Delays or failures in payment processing</li>
                <li>Technical issues with the payment portal</li>
                <li>Loss of data or information during the application process</li>
                <li>Any unauthorized access to your payment information</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-4 font-orbitron">6. Privacy and Data Protection</h2>
              <p className="text-gray-300 mb-4">
                Your personal and payment information will be handled in accordance with our Privacy Policy. We collect and process only the minimum information necessary to process your applications and payments.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-4 font-orbitron">7. Changes to Terms</h2>
              <p className="text-gray-300 mb-4">
                PANASA reserves the right to modify these terms and conditions at any time. Changes will be effective immediately upon posting to our website. Your continued use of our payment services constitutes acceptance of any modified terms.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-4 font-orbitron">8. Governing Law</h2>
              <p className="text-gray-300 mb-4">
                These terms and conditions shall be governed by and construed in accordance with the laws of the jurisdiction where PANASA is registered, without regard to its conflict of law provisions.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-4 font-orbitron">9. Contact Information</h2>
              <p className="text-gray-300 mb-4">
                If you have any questions about these terms and conditions, please contact us at:
              </p>
              <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700/30">
                <p className="text-gray-300">
                  <span className="font-semibold text-white">Email:</span> info@panafricanscrabble.org
                </p>
                <p className="text-gray-300 mt-2">
                  <span className="font-semibold text-white">Address:</span> Pan African Scrabble Association Secretariat
                </p>
              </div>
            </section>

            <section className="pt-6 border-t border-slate-700/30">
              <p className="text-gray-400 text-sm">
                Last updated: October 12, 2025
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditionsPage;