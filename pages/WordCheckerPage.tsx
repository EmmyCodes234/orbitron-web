import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLocalization } from '../contexts/LocalizationContext';

const WordCheckerPage: React.FC = () => {
  const { t } = useLocalization();
  const [wordInput, setWordInput] = useState('');
  const [wordResult, setWordResult] = useState<{ isValid: boolean | null; word: string; time?: number }>({ isValid: null, word: '' });
  const [serviceWorkerReady, setServiceWorkerReady] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    // Register service worker
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js')
        .then((registration) => {
          console.log('Service Worker registered with scope:', registration.scope);
          
          // Listen for messages from service worker
          const handleMessage = (event: MessageEvent) => {
            if (event.data && event.data.type) {
              switch (event.data.type) {
                case 'INIT_COMPLETE':
                  setServiceWorkerReady(true);
                  break;
                case 'CHECK_WORD_RESULT':
                  setWordResult({
                    isValid: event.data.isValid,
                    word: event.data.word
                  });
                  setIsProcessing(false);
                  break;
              }
            }
          };
          
          navigator.serviceWorker.addEventListener('message', handleMessage);
          
          // Initialize the service worker
          registration.active?.postMessage({ type: 'INIT' });
          
          // Cleanup
          return () => {
            navigator.serviceWorker.removeEventListener('message', handleMessage);
          };
        })
        .catch((error) => {
          console.error('Service Worker registration failed:', error);
          setError('Failed to register Service Worker. Word tools may not work properly.');
        });
    } else {
      setError('Service Workers are not supported in your browser. Word tools may not work properly.');
    }
  }, []);

  const handleCheckWord = () => {
    if (!wordInput.trim()) return;
    
    if (!serviceWorkerReady) {
      setError('Service Worker is not ready yet. Please wait a moment and try again.');
      return;
    }
    
    // Clear previous result immediately
    setWordResult({ isValid: null, word: '' });
    setIsProcessing(true);
    
    // Send message to service worker
    navigator.serviceWorker.controller?.postMessage({
      type: 'CHECK_WORD',
      word: wordInput.trim()
    });
  };

  const handleWordInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Ensure input is always uppercase
    const upperCaseValue = e.target.value.toUpperCase();
    setWordInput(upperCaseValue);
    
    // Clear result when input changes
    if (wordResult.isValid !== null) {
      setWordResult({ isValid: null, word: '' });
    }
    
    // Clear processing state when input changes
    if (isProcessing) {
      setIsProcessing(false);
    }
  };

  // Handle paste event to ensure uppercase
  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedText = e.clipboardData.getData('text').toUpperCase();
    setWordInput(pastedText);
  };

  return (
    <div className="tool-container">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <h1 className="tool-header">
            {t('tools.wordChecker.title')}
          </h1>
          <Link to="/tools" className="tool-button tool-button-enabled tool-button-green w-full sm:w-auto text-center">
            Back to Tools
          </Link>
        </div>
        
        {error && (
          <div className="bg-red-900/50 border border-red-700/50 rounded-xl p-4 mb-6 text-center animate-fadeIn">
            <p className="text-red-300 font-medium">{error}</p>
          </div>
        )}
        
        <div className="tool-card">
          <h2 className="tool-title">
            {t('tools.wordChecker.heading')}
          </h2>
          
          <div className="space-y-4 sm:space-y-5 md:space-y-6">
            <p className="tool-description">
              {t('tools.wordChecker.description')}
            </p>
            
            <div className="tool-input-container flex flex-col sm:flex-row gap-3">
              <div className="tool-input-wrapper flex-grow">
                <input
                  type="text"
                  id="wordCheckerInput"
                  value={wordInput}
                  onChange={handleWordInputChange}
                  onPaste={handlePaste}
                  placeholder={t('tools.wordChecker.placeholder')}
                  className="tool-input tool-input-green w-full"
                  onKeyDown={(e) => e.key === 'Enter' && handleCheckWord()}
                />
                {wordInput && (
                  <button
                    onClick={() => setWordInput('')}
                    className="tool-clear-button"
                    aria-label="Clear input"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                  </button>
                )}
              </div>
              <button
                onClick={handleCheckWord}
                disabled={!serviceWorkerReady || !wordInput.trim() || isProcessing}
                className={`tool-button w-full sm:w-auto ${
                  !serviceWorkerReady || !wordInput.trim() || isProcessing
                    ? ''
                    : 'tool-button-enabled tool-button-green'
                }`}
              >
                {isProcessing ? (
                  <>
                    <svg className="tool-processing-spinner" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    {t('tools.wordChecker.checking')}
                  </>
                ) : (
                  t('tools.wordChecker.check')
                )}
              </button>
            </div>
            
            {wordResult.isValid !== null && (
              <div className={`p-4 sm:p-5 rounded-xl border text-center transition-all duration-300 ${
                wordResult.isValid 
                  ? 'bg-green-900/30 border-green-700/50 text-green-400 animate-fadeIn' 
                  : 'bg-red-900/30 border-red-700/50 text-red-400 animate-fadeIn'
              }`}>
                <p className="font-bold text-lg xs:text-xl sm:text-2xl">
                  {wordResult.isValid ? t('tools.wordChecker.valid') : t('tools.wordChecker.invalid')}
                </p>
                <p className="mt-1 text-sm xs:text-base sm:text-lg">
                  "{wordResult.word}" {wordResult.isValid ? t('tools.wordChecker.isValidWord') : t('tools.wordChecker.isNotValidWord')}
                </p>
              </div>
            )}
            
            <div className="tool-footer">
              <p>{t('tools.wordChecker.poweredBy')}</p>
              <p className="tool-footer-italic">Instant lookups powered by Service Worker caching</p>
            </div>
          </div>
        </div>
        
        {/* Processing indicator - only shown during processing */}
        {isProcessing && (
          <div className="tool-processing-overlay">
            <div className="tool-processing-card">
              <div className="tool-processing-spinner-large tool-processing-spinner-green"></div>
              <p className="tool-processing-text">{t('tools.wordChecker.processing')}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WordCheckerPage;