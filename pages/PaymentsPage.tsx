import React, { useState } from 'react';
import { useLocalization } from '../contexts/LocalizationContext';

const PaymentsPage: React.FC = () => {
  const { t } = useLocalization();
  const [activeTab, setActiveTab] = useState<'payment' | 'rating'>('payment');
  
  return (
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

        {/* Tab Navigation */}
        <div className="flex border-b border-slate-700/50 mb-8">
          <button
            className={`py-4 px-6 text-lg font-medium transition-colors relative font-orbitron ${
              activeTab === 'payment'
                ? 'text-gray-100'
                : 'text-gray-400 hover:text-white'
            }`}
            onClick={() => setActiveTab('payment')}
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
            onClick={() => setActiveTab('rating')}
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
              </div>
              <div>
                <h3 className="text-xl font-semibold text-green-400 mb-4 font-orbitron">
                  {t('payments.makePayment')}
                </h3>
                <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700/30">
                  <div className="mb-4">
                    <label className="block text-gray-300 mb-2 font-orbitron">
                      {t('payments.tournamentName')}
                    </label>
                    <input
                      type="text"
                      className="w-full bg-slate-700/50 border border-slate-600/50 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-green-400/50 focus:border-green-400/50 transition-all"
                      placeholder={t('payments.enterTournament')}
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-300 mb-2 font-orbitron">
                      {t('payments.amount')}
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-3 text-gray-400">$</span>
                      <input
                        type="number"
                        className="w-full bg-slate-700/50 border border-slate-600/50 rounded-lg px-4 py-3 pl-8 text-white focus:outline-none focus:ring-2 focus:ring-green-400/50 focus:border-green-400/50 transition-all"
                        placeholder="0.00"
                      />
                    </div>
                  </div>
                  <div className="mb-6">
                    <label className="block text-gray-300 mb-2 font-orbitron">
                      {t('payments.playerName')}
                    </label>
                    <input
                      type="text"
                      className="w-full bg-slate-700/50 border border-slate-600/50 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-green-400/50 focus:border-green-400/50 transition-all"
                      placeholder={t('payments.enterPlayerName')}
                    />
                  </div>
                  <button className="w-full bg-gradient-to-r from-green-500 to-cyan-500 text-white font-semibold py-3 px-6 rounded-lg hover:from-green-600 hover:to-cyan-600 transition-all transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-green-400/50 font-orbitron">
                    {t('payments.processPayment')}
                  </button>
                </div>
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
            
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-300 mb-2 font-orbitron">
                    {t('payments.organizerName')}
                  </label>
                  <input
                    type="text"
                    className="w-full bg-slate-700/50 border border-slate-600/50 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-green-400/50 focus:border-green-400/50 transition-all"
                    placeholder={t('payments.enterOrganizer')}
                  />
                </div>
                <div>
                  <label className="block text-gray-300 mb-2 font-orbitron">
                    {t('payments.email')}
                  </label>
                  <input
                    type="email"
                    className="w-full bg-slate-700/50 border border-slate-600/50 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-green-400/50 focus:border-green-400/50 transition-all"
                    placeholder={t('payments.enterEmail')}
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-gray-300 mb-2 font-orbitron">
                  {t('payments.eventName')}
                </label>
                <input
                  type="text"
                  className="w-full bg-slate-700/50 border border-slate-600/50 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-green-400/50 focus:border-green-400/50 transition-all"
                  placeholder={t('payments.enterEvent')}
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-300 mb-2 font-orbitron">
                    {t('payments.startDate')}
                  </label>
                  <input
                    type="date"
                    className="w-full bg-slate-700/50 border border-slate-600/50 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-green-400/50 focus:border-green-400/50 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-gray-300 mb-2 font-orbitron">
                    {t('payments.endDate')}
                  </label>
                  <input
                    type="date"
                    className="w-full bg-slate-700/50 border border-slate-600/50 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-green-400/50 focus:border-green-400/50 transition-all"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-gray-300 mb-2 font-orbitron">
                  {t('payments.location')}
                </label>
                <input
                  type="text"
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
                  className="w-full bg-slate-700/50 border border-slate-600/50 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-green-400/50 focus:border-green-400/50 transition-all"
                  placeholder={t('payments.enterParticipants')}
                />
              </div>
              
              <div>
                <label className="block text-gray-300 mb-2 font-orbitron">
                  {t('payments.additionalInfo')}
                </label>
                <textarea
                  rows={4}
                  className="w-full bg-slate-700/50 border border-slate-600/50 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-green-400/50 focus:border-green-400/50 transition-all"
                  placeholder={t('payments.enterAdditionalInfo')}
                ></textarea>
              </div>
              
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="terms"
                  className="w-4 h-4 text-green-500 bg-slate-700/50 border-slate-600/50 rounded focus:ring-green-500/50 focus:ring-2 focus:ring-offset-0 focus:ring-offset-slate-900"
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
                  {t('payments.submitApplication')}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentsPage;