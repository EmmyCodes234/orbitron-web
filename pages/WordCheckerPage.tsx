import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useLocalization } from '../contexts/LocalizationContext';
import { loadDictionary, isWordValid } from '../utils/wordDictionary';

const WordCheckerPage: React.FC = () => {
  const { t } = useLocalization();
  const [step, setStep] = useState<'wordCount' | 'wordInput' | 'result'>('wordCount');
  const [wordCount, setWordCount] = useState<number | ''>('');
  const [wordInput, setWordInput] = useState('');
  const [moveResult, setMoveResult] = useState<{ isValid: boolean | null }>({ isValid: null });
  const [validatedWords, setValidatedWords] = useState<string[]>([]);
  const [dictionaryReady, setDictionaryReady] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [wordCountMessage, setWordCountMessage] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Load dictionary directly
    loadDictionary()
      .then(() => {
        setDictionaryReady(true);
      })
      .catch((err) => {
        console.error('Failed to load dictionary:', err);
        setError('Failed to load word dictionary. Word tools may not work properly.');
      });
  }, []);

  useEffect(() => {
    if (inputRef.current && step === 'wordInput') {
      inputRef.current.focus();
    }
  }, [step]);

  const handleWordCountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Allow only numeric input
    if (value === '' || /^\d+$/.test(value)) {
      const num = value === '' ? '' : parseInt(value, 10);
      setWordCount(num);
      // Automatically advance to next step when a valid number is entered
      if (num !== '' && num >= 1 && num <= 15) {
        setTimeout(() => {
          setStep('wordInput');
        }, 300); // Small delay for better UX
      }
    }
  };

  const handleWordInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toUpperCase();
    setWordInput(value);

    // Clear result when input changes
    if (moveResult.isValid !== null) {
      setMoveResult({ isValid: null });
    }

    // Clear word count message when input changes
    if (wordCountMessage) {
      setWordCountMessage(null);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      handleCheckMove();
    }
    // Also allow Enter key for mobile users
    if (e.key === 'Enter') {
      handleCheckMove();
    }
  };

  const handleCheckMove = () => {
    if (!wordInput.trim()) return;

    if (!dictionaryReady) {
      setError('Dictionary is not ready yet. Please wait a moment and try again.');
      return;
    }

    // Split input by spaces or commas and filter out empty strings
    const words = wordInput.trim()
      .split(/[\s,]+/)
      .map(word => word.trim())
      .filter(word => word.length > 0);

    // Check if we have the correct number of words
    if (wordCount && words.length !== wordCount) {
      setWordCountMessage(`Please enter exactly ${wordCount} word${wordCount > 1 ? 's' : ''}. You entered ${words.length}.`);
      return;
    }

    // Clear previous result immediately
    setMoveResult({ isValid: null });
    setWordCountMessage(null);
    setValidatedWords(words);
    setIsProcessing(true);

    try {
      // Check if all words are valid
      const allWordsValid = words.length > 0 && words.every(word => isWordValid(word));

      setMoveResult({
        isValid: allWordsValid
      });

      setIsProcessing(false);
      setStep('result');
    } catch (err) {
      console.error('Error checking move:', err);
      setError('An error occurred while checking the move. Please try again.');
      setIsProcessing(false);
    }
  };

  const handleReset = () => {
    setWordInput('');
    setMoveResult({ isValid: null });
    setValidatedWords([]);
    setStep('wordCount');
    setWordCount('');
    setWordCountMessage(null);
  };

  return (
    <div className="tool-container">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <h1 className="tool-header text-2xl sm:text-3xl">
            {t('tools.wordChecker.title')}
          </h1>
          <Link to="/tools" className="tool-button tool-button-enabled tool-button-green w-full sm:w-auto text-center text-base sm:text-lg">
            Back to Tools
          </Link>
        </div>

        {error && (
          <div className="bg-red-900/50 border border-red-700/50 rounded-xl p-3 sm:p-4 mb-6 text-center animate-fadeIn">
            <p className="text-red-300 font-medium text-sm sm:text-base">{error}</p>
          </div>
        )}

        <div className="tool-card">
          {step === 'wordCount' && (
            <div className="flex flex-col items-center justify-center min-h-[60vh] py-4">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-3 text-white">
                Word Checker
              </h1>
              <p className="text-sm sm:text-base md:text-lg text-center mb-5 text-gray-300">
                How many words do you want to challenge?
              </p>
              <div className="relative mb-5">
                <input
                  type="text"
                  value={wordCount}
                  onChange={handleWordCountChange}
                  placeholder="1-15"
                  className="text-4xl sm:text-5xl md:text-6xl w-20 sm:w-24 md:w-32 text-center bg-transparent border-b-4 border-green-500 text-white placeholder-gray-600 focus:outline-none focus:border-green-400 pb-2 appearance-none [-moz-appearance:none] [-webkit-appearance:none]"
                  autoFocus
                />
              </div>
              <p className="text-xs sm:text-sm text-gray-400 mt-3 text-center px-4">
                Enter a number between 1-15 to continue
              </p>
            </div>
          )}

          {step === 'wordInput' && (
            <div className="flex flex-col items-center justify-center min-h-[60vh] py-4">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-2 text-white">
                Word Checker
              </h1>
              <p className="text-sm sm:text-base md:text-lg text-center mb-1 text-gray-300">
                Enter {wordCount} word{wordCount && wordCount > 1 ? 's' : ''}
              </p>
              <p className="text-xs sm:text-sm text-center mb-3 text-gray-400">
                (Press TAB or ENTER to validate)
              </p>

              {wordCountMessage && (
                <div className="mb-3 p-2 sm:p-3 bg-yellow-900/50 border border-yellow-700/50 rounded-lg">
                  <p className="text-yellow-400 text-center text-xs sm:text-sm">{wordCountMessage}</p>
                </div>
              )}

              <input
                ref={inputRef}
                type="text"
                value={wordInput}
                onChange={handleWordInputChange}
                onKeyDown={handleKeyDown}
                placeholder={wordInput ? '' : `Type your word${wordCount && wordCount > 1 ? 's' : ''} here...`}
                className="w-full h-24 sm:h-32 text-xl sm:text-2xl md:text-3xl font-bold text-center text-white bg-transparent border-none focus:outline-none focus:ring-0 placeholder-gray-600 caret-green-500"
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="characters"
                spellCheck="false"
                autoFocus
              />

              <div className="flex flex-col gap-2 mt-3 w-full max-w-xs">
                <button
                  onClick={handleReset}
                  className="px-3 py-2 text-sm rounded-lg font-bold bg-gray-700 hover:bg-gray-600 text-white transition-all"
                >
                  Back
                </button>
                <button
                  onClick={handleCheckMove}
                  disabled={!dictionaryReady || !wordInput.trim() || isProcessing}
                  className={`px-3 py-2 text-sm rounded-lg font-bold transition-all ${!dictionaryReady || !wordInput.trim() || isProcessing
                    ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                    : 'bg-green-600 hover:bg-green-500 text-white transform hover:scale-105'
                    }`}
                >
                  {isProcessing ? 'Checking...' : 'Validate Move'}
                </button>
              </div>
            </div>
          )}

          {step === 'result' && (
            <div className="flex flex-col items-center justify-center min-h-[60vh] py-4">
              <div className={`p-4 sm:p-5 rounded-xl border-4 text-center w-full max-w-xs sm:max-w-md ${moveResult.isValid
                ? 'bg-green-900/30 border-green-500 text-green-400'
                : 'bg-red-900/30 border-red-500 text-red-400'
                }`}>
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4">
                  {validatedWords.join(', ')}
                </h2>
                <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl">
                  {moveResult.isValid
                    ? 'Yes, the move is valid in CSW24'
                    : 'No, the move is invalid in CSW24'}
                </p>
              </div>

              <div className="flex flex-col gap-2 mt-4 w-full max-w-xs">
                <button
                  onClick={handleReset}
                  className="px-3 py-2 text-sm rounded-lg font-bold bg-gray-700 hover:bg-gray-600 text-white transition-all"
                >
                  New Challenge
                </button>
              </div>
            </div>
          )}
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