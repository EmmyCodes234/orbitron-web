import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { submitContactForm } from '../src/services/supabaseService';
import { useLocalization } from '../contexts/LocalizationContext';

const ContactPage: React.FC = () => {
    const { t } = useLocalization();
    const [status, setStatus] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);
        setStatus(t('contact.sending'));
        
        try {
            // Get form data
            const formData = new FormData(e.target as HTMLFormElement);
            const name = formData.get('name') as string;
            const email = formData.get('email') as string;
            const message = formData.get('message') as string;
            
            // Validate required fields
            if (!name || !email || !message) {
                setStatus(t('contact.missingFields'));
                setIsSubmitting(false);
                setTimeout(() => setStatus(''), 5000);
                return;
            }
            
            // Validate email format
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                setStatus(t('contact.invalidEmail'));
                setIsSubmitting(false);
                setTimeout(() => setStatus(''), 5000);
                return;
            }
            
            // Submit the contact form using the service function
            const success = await submitContactForm({ name, email, message });
            
            if (!success) {
                setStatus(t('contact.sendError'));
                setIsSubmitting(false);
                setTimeout(() => setStatus(''), 5000);
                return;
            }
            
            // Reset form and show success message
            setStatus(t('contact.messageSent'));
            (e.target as HTMLFormElement).reset();
        } catch (error) {
            console.error('Error submitting contact form:', error);
            setStatus(t('contact.sendError'));
        } finally {
            setIsSubmitting(false);
            setTimeout(() => setStatus(''), 5000);
        }
    };

  return (
    <div className="py-8 sm:py-12 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-8 sm:mb-12 md:mb-16">
          <h1 className="font-orbitron text-2xl sm:text-3xl md:text-5xl font-extrabold mb-4 sm:mb-5 bg-clip-text text-transparent bg-gradient-to-r from-green-400 via-cyan-400 to-purple-500">
            {t('contact.title')}
          </h1>
          <p className="text-gray-400 text-base sm:text-lg md:text-xl max-w-3xl mx-auto font-medium px-2">
            {t('contact.subtitle')}
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 md:gap-12">
          {/* Contact Information */}
          <div className="bg-gradient-to-br from-slate-900/60 to-slate-800/60 backdrop-blur-sm rounded-2xl p-5 sm:p-6 md:p-8 border border-slate-700/40 shadow-xl">
            <h2 className="font-orbitron text-xl sm:text-2xl md:text-3xl font-bold mb-5 sm:mb-6 text-green-400">{t('contact.getInTouch')}</h2>
            
            <div className="space-y-4 sm:space-y-5 md:space-y-6">
              <div className="flex items-start group">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-green-400/10 flex items-center justify-center mr-3 sm:mr-4 flex-shrink-0">
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 text-green-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                  </svg>
                </div>
                <div>
                  <p className="text-gray-400 text-xs sm:text-sm font-medium mb-1">{t('contact.generalInquiries')}</p>
                  <p className="text-white font-bold text-base sm:text-lg group-hover:text-green-400 transition-colors break-words">info@panafricanscrabble.com</p>
                </div>
              </div>
              
              <div className="flex items-start group">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-cyan-400/10 flex items-center justify-center mr-3 sm:mr-4 flex-shrink-0">
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 text-cyan-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                  </svg>
                </div>
                <div>
                  <p className="text-gray-400 text-xs sm:text-sm font-medium mb-1">{t('contact.phone')}</p>
                  <p className="text-white font-bold text-base sm:text-lg group-hover:text-cyan-400 transition-colors">+234 903 373 3492</p>
                </div>
              </div>
              
              <div className="flex items-start group">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-purple-400/10 flex items-center justify-center mr-3 sm:mr-4 flex-shrink-0">
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 text-purple-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                  </svg>
                </div>
                <div>
                  <p className="text-gray-400 text-xs sm:text-sm font-medium mb-1">{t('contact.address')}</p>
                  <p className="text-white font-bold text-base sm:text-lg group-hover:text-purple-400 transition-colors">Room 4, 3rd Floor, Nelson Ibilola, House 82, Allen Avenue, Ikeja, Lagos, Nigeria</p>
                </div>
              </div>
              
              <div className="flex items-start group">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-yellow-400/10 flex items-center justify-center mr-3 sm:mr-4 flex-shrink-0">
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/>
                    <path d="M12.5 7H11v6l5.25 3.15.75-1.23-4.5-2.67z"/>
                  </svg>
                </div>
                <div>
                  <p className="text-gray-400 text-xs sm:text-sm font-medium mb-1">{t('contact.officeHours')}</p>
                  <p className="text-white font-bold text-base sm:text-lg group-hover:text-yellow-400 transition-colors">Monday-Friday, 9:00 AM - 5:00 PM WAT</p>
                </div>
              </div>
            </div>
            
            <div className="mt-6 sm:mt-8 md:mt-10 pt-5 sm:pt-6 md:pt-8 border-t border-slate-700/50">
              <h3 className="font-orbitron text-lg sm:text-xl md:text-2xl font-bold mb-3 sm:mb-4 text-cyan-400">{t('contact.memberFederations')}</h3>
              <p className="text-gray-400 text-sm sm:text-base md:text-lg mb-4 sm:mb-5">
                {t('contact.federationInquiries')}
              </p>
              <Link to="/federations" className="inline-flex items-center text-green-400 hover:text-cyan-400 font-bold text-sm sm:text-base md:text-lg transition-colors group touch-target">
                {t('contact.viewAllFederations')}
                <svg className="w-4 h-4 sm:w-5 sm:h-5 ml-1 sm:ml-2 group-hover:translate-x-1 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 7l-8 8-4-4-6 6" />
                </svg>
              </Link>
            </div>
          </div>

          {/* Contact Form */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-green-400/30 via-cyan-500/30 to-purple-600/30 rounded-2xl blur-xl opacity-50"></div>
            <div className="relative bg-gradient-to-br from-slate-900 to-slate-800 p-px rounded-2xl shadow-2xl">
              <div className="bg-slate-900 p-5 sm:p-6 md:p-8 rounded-2xl">
                <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5 md:space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-xs sm:text-sm font-medium text-gray-300 mb-1.5 sm:mb-2">{t('contact.fullName')}</label>
                    <input 
                      type="text" 
                      id="name" 
                      name="name" 
                      required 
                      className="w-full bg-slate-800/80 border border-slate-700/50 text-white rounded-xl p-2.5 sm:p-3 md:p-4 focus:ring-2 focus:ring-green-400 focus:border-transparent transition-all duration-300 backdrop-blur-sm shadow-sm hover:shadow-md text-sm sm:text-base md:text-base mobile-form-input" 
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-xs sm:text-sm font-medium text-gray-300 mb-1.5 sm:mb-2">{t('contact.emailAddress')}</label>
                    <input 
                      type="email" 
                      id="email" 
                      name="email" 
                      required 
                      className="w-full bg-slate-800/80 border border-slate-700/50 text-white rounded-xl p-2.5 sm:p-3 md:p-4 focus:ring-2 focus:ring-green-400 focus:border-transparent transition-all duration-300 backdrop-blur-sm shadow-sm hover:shadow-md text-sm sm:text-base md:text-base mobile-form-input" 
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-xs sm:text-sm font-medium text-gray-300 mb-1.5 sm:mb-2">{t('contact.message')}</label>
                    <textarea 
                      id="message" 
                      name="message" 
                      rows={4} 
                      required 
                      className="w-full bg-slate-800/80 border border-slate-700/50 text-white rounded-xl p-2.5 sm:p-3 md:p-4 focus:ring-2 focus:ring-green-400 focus:border-transparent transition-all duration-300 backdrop-blur-sm shadow-sm hover:shadow-md text-sm sm:text-base md:text-base resize-none mobile-form-input"
                    ></textarea>
                  </div>
                  
                  <div>
                    <button 
                      type="submit" 
                      disabled={isSubmitting}
                      className={`w-full relative inline-flex items-center justify-center p-0.5 overflow-hidden text-sm sm:text-base font-bold text-gray-900 rounded-xl group bg-gradient-to-br from-green-400 to-cyan-500 group-hover:from-green-400 group-hover:to-cyan-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-green-500/30 touch-target ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                    >
                      <span className="w-full relative px-4 py-2.5 sm:px-5 sm:py-3 md:px-6 md:py-3.5 transition-all ease-in duration-300 bg-slate-900 rounded-lg group-hover:bg-opacity-0 text-center">
                        {isSubmitting ? t('contact.sending') : t('contact.sendMessage')}
                      </span>
                    </button>
                  </div>
                  
                  {status && (
                    <div className={`text-center py-2.5 sm:py-3 rounded-lg ${status.includes('successfully') || status.includes('sent') ? 'bg-green-900/30 border border-green-700/50' : 'bg-red-900/30 border border-red-700/50'}`}>
                      <p className={`font-medium text-sm sm:text-base ${status.includes('successfully') || status.includes('sent') ? 'text-green-400' : 'text-red-400'}`}>{status}</p>
                    </div>
                  )}
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;