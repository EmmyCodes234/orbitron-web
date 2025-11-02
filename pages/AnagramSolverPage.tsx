import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLocalization } from '../contexts/LocalizationContext';
import jsPDF from 'jspdf';

// Define the type for our enhanced anagram results
interface AnagramResult {
  word: string;
  blankSubstitutions: string[];
}

// Define search types
type SearchType = 
  | 'anagram' 
  | 'wordBuilder' 
  | 'startsWith' 
  | 'endsWith' 
  | 'containing' 
  | 'qWithoutU' 
  | 'bingo7' 
  | 'bingo8' 
  | 'twoLetterWords' 
  | 'threeLetterWords' 
  | 'fourLetterWords' 
  | 'fiveLetterWords';

const AnagramSolverPage: React.FC = () => {
  const { t } = useLocalization();
  const [anagramInput, setAnagramInput] = useState('');
  const [searchType, setSearchType] = useState<SearchType>('anagram');
  // Update the type to handle consistent object arrays
  const [anagramResults, setAnagramResults] = useState<Record<number, AnagramResult[]> | null>(null);
  const [serviceWorkerReady, setServiceWorkerReady] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [exportFormat, setExportFormat] = useState<'txt' | 'pdf'>('txt');
  const [showExportPreview, setShowExportPreview] = useState(false);
  const [exportContent, setExportContent] = useState('');

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
                case 'SOLVE_ANAGRAM_RESULT':
                  // Transform the grouped results into the format expected by the UI
                  const transformedResults: Record<number, AnagramResult[]> = {};
                  Object.keys(event.data.results).forEach(length => {
                    transformedResults[length] = event.data.results[length].map((item: AnagramResult) => {
                      // Ensure all items have the blankSubstitutions property
                      return {
                        word: item.word,
                        blankSubstitutions: item.blankSubstitutions || []
                      };
                    });
                  });
                  setAnagramResults(transformedResults);
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

  const handleSolveAnagram = () => {
    // For specific word lists, we don't need input
    const noInputRequired = [
      'qWithoutU', 
      'twoLetterWords', 
      'threeLetterWords', 
      'fourLetterWords', 
      'fiveLetterWords'
    ];
    
    if (!noInputRequired.includes(searchType) && !anagramInput.trim()) return;
    
    if (!serviceWorkerReady) {
      setError('Service Worker is not ready yet. Please wait a moment and try again.');
      return;
    }
    
    // Check for too many blank tiles (only for anagram searches)
    if (searchType === 'anagram' || searchType === 'wordBuilder' || searchType === 'bingo7' || searchType === 'bingo8') {
      const blankCount = (anagramInput.trim().match(/\?/g) || []).length;
      if (blankCount > 3) {
        setError('Too many blank tiles. Maximum 3 blank tiles allowed for performance reasons.');
        return;
      }
    }
    
    // Clear previous results immediately
    setAnagramResults(null);
    // Don't set isProcessing to true to eliminate loading spinner
    // setIsProcessing(true);
    
    // Send message to service worker
    navigator.serviceWorker.controller?.postMessage({
      type: 'SOLVE_ANAGRAM',
      letters: anagramInput.trim(),
      originalLetters: anagramInput.trim(),
      searchType: searchType
    });
  };

  const handleAnagramInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Ensure input is always uppercase
    const upperCaseValue = e.target.value.toUpperCase();
    setAnagramInput(upperCaseValue);
    
    // Clear result when input changes
    if (anagramResults) {
      setAnagramResults(null);
    }
    
    // Clear processing state when input changes
    if (isProcessing) {
      setIsProcessing(false);
    }
    
    // Clear error when input changes
    if (error) {
      setError(null);
    }
  };

  // Handle key down event for more responsive uppercase conversion on iOS
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Handle space key to ensure next word starts uppercase
    if (e.key === ' ') {
      // Force a re-render with uppercase to ensure consistency
      setTimeout(() => {
        const input = e.target as HTMLInputElement;
        if (input.value !== input.value.toUpperCase()) {
          setAnagramInput(input.value.toUpperCase());
        }
      }, 0);
    }
    
    // Handle Enter key for submission
    if (e.key === 'Enter') {
      handleSolveAnagram();
    }
  };

  // Handle paste event to ensure uppercase
  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedText = e.clipboardData.getData('text').toUpperCase();
    setAnagramInput(pastedText);
  };

  // Handle composition events for better iOS support
  const handleCompositionStart = () => {
    // Prevent uppercase conversion during composition (e.g., when typing accented characters)
  };

  const handleCompositionEnd = (e: React.CompositionEvent<HTMLInputElement>) => {
    // Ensure text is uppercase after composition ends
    const upperCaseValue = e.currentTarget.value.toUpperCase();
    if (upperCaseValue !== anagramInput) {
      setAnagramInput(upperCaseValue);
    }
  };

  // Function to highlight blank tiles in words
  const highlightBlankTiles = (word: string, blankSubstitutions: string[] | undefined) => {
    if (!blankSubstitutions || blankSubstitutions.length === 0) {
      return word;
    }
    
    // Create a copy of blankSubstitutions to track which ones we've used
    const remainingSubstitutions = [...blankSubstitutions];
    const highlightedChars: React.ReactNode[] = [];
    
    // Go through each character in the word
    for (let i = 0; i < word.length; i++) {
      const char = word[i];
      
      // Check if this character was formed from a blank tile
      const substitutionIndex = remainingSubstitutions.indexOf(char);
      if (substitutionIndex !== -1) {
        // This character was formed from a blank tile, highlight it
        highlightedChars.push(
          <span key={i} className="text-yellow-400 font-bold">{char}</span>
        );
        // Remove this substitution from our tracking array
        remainingSubstitutions.splice(substitutionIndex, 1);
      } else {
        // This character was from the original letters, display normally
        highlightedChars.push(<span key={i}>{char}</span>);
      }
    }
    
    return <>{highlightedChars}</>;
  };

  // Get description for current search type
  const getSearchDescription = () => {
    switch (searchType) {
      case 'anagram':
        return t('tools.anagramSolver.description');
      case 'wordBuilder':
        return 'Find all possible words that can be built from the given letters';
      case 'startsWith':
        return 'Find all words that start with the given letters';
      case 'endsWith':
        return 'Find all words that end with the given letters';
      case 'containing':
        return 'Find all words that contain all the given letters';
      case 'qWithoutU':
        return 'Find all words that start with Q but not QU';
      case 'bingo7':
        return 'Find all 7-letter words by adding one blank tile to your 6 letters';
      case 'bingo8':
        return 'Find all 8-letter words by adding two blank tiles to your 6 letters';
      case 'twoLetterWords':
        return 'List all 2-letter words';
      case 'threeLetterWords':
        return 'List all 3-letter words';
      case 'fourLetterWords':
        return 'List all 4-letter words';
      case 'fiveLetterWords':
        return 'List all 5-letter words';
      default:
        return t('tools.anagramSolver.description');
    }
  };

  // Get placeholder for current search type
  const getPlaceholder = () => {
    switch (searchType) {
      case 'anagram':
      case 'wordBuilder':
      case 'containing':
        return 'Enter letters (use ? for blank tiles)';
      case 'startsWith':
      case 'endsWith':
        return 'Enter prefix or suffix';
      case 'bingo7':
      case 'bingo8':
        return 'Enter your letters (6 for Bingo-7, 6 for Bingo-8)';
      case 'qWithoutU':
      case 'twoLetterWords':
      case 'threeLetterWords':
      case 'fourLetterWords':
      case 'fiveLetterWords':
        return 'No input required for this search';
      default:
        return t('tools.anagramSolver.placeholder');
    }
  };

  // Check if input is required for current search type
  const isInputRequired = () => {
    const noInputRequired = [
      'qWithoutU', 
      'twoLetterWords', 
      'threeLetterWords', 
      'fourLetterWords', 
      'fiveLetterWords'
    ];
    return !noInputRequired.includes(searchType);
  };

  // Generate TXT content for export
  const generateTxtContent = () => {
    if (!anagramResults) return '';
    
    let content = `PANASA Anagram Solver Results\n`;
    content += `=========================\n\n`;
    content += `Search Type: ${searchType}\n`;
    if (anagramInput) {
      content += `Input Letters: ${anagramInput}\n`;
    }
    content += `Generated on: ${new Date().toLocaleString()}\n\n`;
    
    const sortedResults = Object.entries(anagramResults)
      .sort(([a], [b]) => parseInt(b) - parseInt(a));
    
    sortedResults.forEach(([length, words]) => {
      content += `${length}-Letter Words (${words.length} ${words.length === 1 ? 'word' : 'words'}):\n`;
      const wordList = words.map(item => item.word).join(', ');
      content += `${wordList}\n\n`;
    });
    
    return content;
  };

  // Generate PDF content for export
  const generatePdfContent = () => {
    if (!anagramResults) return;
    
    const doc = new jsPDF();
    
    // Add PANASA logo (text placeholder since we can't easily embed images in jsPDF without additional setup)
    doc.setFontSize(20);
    doc.setTextColor(0, 100, 0); // Dark green color
    doc.text('PANASA', 20, 20);
    
    // Add title
    doc.setFontSize(16);
    doc.setTextColor(0, 0, 0); // Black color
    doc.text(`Anagram Results for ${anagramInput || searchType}`, 20, 35);
    
    // Add search details
    doc.setFontSize(12);
    doc.text(`Search Type: ${searchType}`, 20, 45);
    if (anagramInput) {
      doc.text(`Input Letters: ${anagramInput}`, 20, 52);
    }
    doc.text(`Generated on: ${new Date().toLocaleString()}`, 20, 59);
    
    // Add results
    let yPosition = 70;
    const pageHeight = doc.internal.pageSize.height;
    
    const sortedResults = Object.entries(anagramResults)
      .sort(([a], [b]) => parseInt(b) - parseInt(a));
    
    sortedResults.forEach(([length, words]) => {
      // Check if we need a new page
      if (yPosition > pageHeight - 30) {
        doc.addPage();
        yPosition = 20;
      }
      
      // Add section header
      doc.setFont(undefined, 'bold');
      doc.text(`${length}-Letter Words (${words.length} ${words.length === 1 ? 'word' : 'words'}` + ')', 20, yPosition);
      yPosition += 10;
      
      // Add words
      doc.setFont(undefined, 'normal');
      const wordList = words.map(item => item.word).join(', ');
      
      // Split long lines
      const splitText = doc.splitTextToSize(wordList, 170);
      splitText.forEach((line: string) => {
        // Check if we need a new page
        if (yPosition > pageHeight - 20) {
          doc.addPage();
          yPosition = 20;
        }
        doc.text(line, 20, yPosition);
        yPosition += 7;
      });
      
      yPosition += 5; // Space between sections
    });
    
    return doc;
  };

  // Handle export
  const handleExport = () => {
    if (!anagramResults) return;
    
    let content = '';
    if (exportFormat === 'txt') {
      content = generateTxtContent();
      setExportContent(content);
      setShowExportPreview(true);
    } else {
      const doc = generatePdfContent();
      if (doc) {
        doc.save(`panasa-anagram-results-${new Date().getTime()}.pdf`);
      }
    }
  };

  // Confirm export and download
  const confirmExport = () => {
    if (exportFormat === 'txt' && exportContent) {
      const blob = new Blob([exportContent], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `panasa-anagram-results-${new Date().getTime()}.txt`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
    setShowExportPreview(false);
    setExportContent('');
  };

  // Cancel export
  const cancelExport = () => {
    setShowExportPreview(false);
    setExportContent('');
  };

  return (
    <div className="tool-container">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <h1 className="tool-header">
            {t('tools.anagramSolver.title')}
          </h1>
          <Link to="/tools" className="tool-button tool-button-enabled tool-button-purple w-full sm:w-auto text-center">
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
            {t('tools.anagramSolver.heading')}
          </h2>
          
          <div className="space-y-4 sm:space-y-5 md:space-y-6">
            <p className="tool-description">
              {getSearchDescription()}
            </p>
            
            {/* Search Type Selector */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Search Type
              </label>
              <select
                value={searchType}
                onChange={(e) => setSearchType(e.target.value as SearchType)}
                className="w-full p-2 rounded-lg bg-gray-800 border border-gray-700 text-white focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
              >
                <option value="anagram">Anagram (Exact anagrams)</option>
                <option value="wordBuilder">Word Builder (All possible words)</option>
                <option value="startsWith">Starts with</option>
                <option value="endsWith">Ends with</option>
                <option value="containing">Containing (all letters)</option>
                <option value="qWithoutU">Q without U</option>
                <option value="bingo7">Bingo-7 (6 letters + 1 blank)</option>
                <option value="bingo8">Bingo-8 (6 letters + 2 blanks)</option>
                <option value="twoLetterWords">2 Letter Words</option>
                <option value="threeLetterWords">3 Letter Words</option>
                <option value="fourLetterWords">4 Letter Words</option>
                <option value="fiveLetterWords">5 Letter Words</option>
              </select>
            </div>
            
            <div className="tool-input-container flex flex-col sm:flex-row gap-3">
              <div className="tool-input-wrapper flex-grow">
                <input
                  type="text"
                  id="anagramSolverInput"
                  value={anagramInput}
                  onChange={handleAnagramInputChange}
                  onPaste={handlePaste}
                  onKeyDown={handleKeyDown}
                  onCompositionStart={handleCompositionStart}
                  onCompositionEnd={handleCompositionEnd}
                  placeholder={getPlaceholder()}
                  className="tool-input tool-input-cyan w-full"
                  // iOS-specific attributes to improve uppercase handling
                  autoCapitalize="characters"
                  spellCheck="false"
                  disabled={!isInputRequired()}
                />
                {anagramInput && isInputRequired() && (
                  <button
                    onClick={() => setAnagramInput('')}
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
                onClick={handleSolveAnagram}
                disabled={!serviceWorkerReady || (isInputRequired() && !anagramInput.trim())}
                className={`tool-button w-full sm:w-auto ${
                  !serviceWorkerReady || (isInputRequired() && !anagramInput.trim())
                    ? ''
                    : 'tool-button-enabled tool-button-purple'
                }`}
              >
                {t('tools.anagramSolver.solve')}
              </button>
            </div>
            
            {anagramResults && (
              <div className="tool-result-container">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4">
                  <h3 className="tool-result-header tool-result-header-cyan">
                    {t('tools.anagramSolver.results')}:
                  </h3>
                  <div className="flex flex-col xs:flex-row items-start xs:items-center gap-2 w-full sm:w-auto">
                    <select 
                      value={exportFormat}
                      onChange={(e) => setExportFormat(e.target.value as 'txt' | 'pdf')}
                      className="bg-gray-800 text-white text-sm rounded-lg p-2 border border-gray-700 focus:ring-2 focus:ring-cyan-500 focus:border-transparent w-full xs:w-auto"
                    >
                      <option value="txt">TXT</option>
                      <option value="pdf">PDF</option>
                    </select>
                    <button
                      onClick={handleExport}
                      className="tool-button tool-button-enabled tool-button-purple text-sm py-2 px-3 w-full xs:w-auto"
                    >
                      Export
                    </button>
                  </div>
                </div>
                
                <div className="tool-scrollbar bg-gray-800/30 rounded-lg border border-gray-700/50 p-2 sm:p-3 md:p-4">
                  {Object.keys(anagramResults).length > 0 ? (
                    Object.entries(anagramResults)
                      .sort(([a], [b]) => parseInt(b) - parseInt(a)) // Sort by length descending
                      .map(([length, words]) => (
                        <div key={length} className="tool-word-group">
                          <h4 className="tool-word-group-title tool-word-group-green">
                            {t('tools.anagramSolver.letterCount', { count: parseInt(length) })} {words.length === 1 ? t('tools.anagramSolver.oneWord', { count: words.length }) : t('tools.anagramSolver.wordCount', { count: words.length })}
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {words.map((item, index) => (
                              <span 
                                key={index}
                                className="tool-word-chip tool-word-chip-cyan text-sm sm:text-base"
                              >
                                {highlightBlankTiles(item.word, item.blankSubstitutions)}
                              </span>
                            ))}
                          </div>
                        </div>
                      ))
                  ) : (
                    <div className="tool-no-results">
                      <p className="tool-no-results-text">{t('tools.anagramSolver.noWordsFound')}</p>
                    </div>
                  )}
                </div>
              </div>
            )}
            
            <div className="tool-footer">
              <p>{t('tools.anagramSolver.poweredBy')}</p>
              <p className="tool-footer-italic">Instant lookups powered by Service Worker caching</p>
              <p className="tool-footer-warning">Note: Blank tiles are highlighted in yellow</p>
            </div>

            {/* Export Preview Modal */}
            {showExportPreview && (
              <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
                <div className="bg-gray-900 rounded-xl border border-gray-700 max-w-4xl w-full max-h-[90vh] flex flex-col">
                  <div className="p-6 border-b border-gray-700">
                    <h3 className="text-xl font-bold text-white">Export Preview</h3>
                    <p className="text-gray-400 mt-1">Review the content before downloading</p>
                  </div>
                  
                  <div className="p-6 flex-grow overflow-auto bg-gray-950 rounded-b-xl">
                    <pre className="text-gray-300 whitespace-pre-wrap font-sans text-sm">
                      {exportContent}
                    </pre>
                  </div>
                  
                  <div className="p-6 border-t border-gray-700 flex justify-end space-x-3">
                    <button
                      onClick={cancelExport}
                      className="px-4 py-2 rounded-lg bg-gray-700 text-white hover:bg-gray-600 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={confirmExport}
                      className="px-4 py-2 rounded-lg bg-cyan-600 text-white hover:bg-cyan-500 transition-colors"
                    >
                      Download
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnagramSolverPage;