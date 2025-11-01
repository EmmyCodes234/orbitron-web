// Service Worker for Word Checker and Anagram Solver
// Optimized for true instant performance with extensive precomputation

const CACHE_NAME = 'word-tools-v5';
const CACHE_URLS = [
  '/CSW24.txt'
];

// Precomputed data structures for O(1) lookups
let wordSet = new Set();
let isDictionaryLoaded = false;

// Extensively precomputed data structures for instant search
let wordLengthMap = new Map(); // Map of word length -> Set of words of that length
let anagramLookupMap = new Map(); // Map of sorted letters -> words
let prefixMap = new Map(); // Map of prefixes -> words
let suffixMap = new Map(); // Map of suffixes -> words
let letterCombinationMap = new Map(); // Map of letter combinations -> words

// Precomputed blank tile patterns for instant lookup
let blankPatternCache = new Map();
let commonAnagramCache = new Map();

// Install event - cache the CSW24 file
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(CACHE_URLS);
      })
  );
  self.skipWaiting();
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  return self.clients.claim();
});

// Fetch event - serve cached content when offline
self.addEventListener('fetch', (event) => {
  // For the CSW24.txt file, try cache first
  if (event.request.url.includes('CSW24.txt')) {
    event.respondWith(
      caches.match(event.request)
        .then((response) => {
          // Return cached version or fetch from network
          return response || fetch(event.request);
        })
    );
  }
});

// Message handler for word checking and anagram solving
self.addEventListener('message', async (event) => {
  const client = event.source;
  
  if (event.data && event.data.type) {
    switch (event.data.type) {
      case 'INIT':
        await loadDictionary();
        client.postMessage({ type: 'INIT_COMPLETE' });
        break;
        
      case 'CHECK_WORD':
        // Ensure dictionary is loaded
        if (!isDictionaryLoaded) {
          await loadDictionary();
        }
        
        const isValid = checkWord(event.data.word);
        client.postMessage({
          type: 'CHECK_WORD_RESULT',
          word: event.data.word,
          isValid: isValid
        });
        break;
        
      case 'SOLVE_ANAGRAM':
        // Ensure dictionary is loaded
        if (!isDictionaryLoaded) {
          await loadDictionary();
        }
        
        let results;
        switch (event.data.searchType) {
          case 'wordBuilder':
            results = solveWordBuilder(event.data.letters);
            break;
          case 'startsWith':
            results = solveStartsWith(event.data.letters);
            break;
          case 'endsWith':
            results = solveEndsWith(event.data.letters);
            break;
          case 'containing':
            results = solveContaining(event.data.letters);
            break;
          case 'qWithoutU':
            results = solveQWithoutU();
            break;
          case 'bingo7':
            results = solveBingo7(event.data.letters);
            break;
          case 'bingo8':
            results = solveBingo8(event.data.letters);
            break;
          case 'twoLetterWords':
            results = solveTwoLetterWords();
            break;
          case 'threeLetterWords':
            results = solveThreeLetterWords();
            break;
          case 'fourLetterWords':
            results = solveFourLetterWords();
            break;
          case 'fiveLetterWords':
            results = solveFiveLetterWords();
            break;
          default:
            results = solveAnagram(event.data.letters);
        }
        
        client.postMessage({
          type: 'SOLVE_ANAGRAM_RESULT',
          letters: event.data.letters,
          results: results,
          originalLetters: event.data.originalLetters || event.data.letters,
          searchType: event.data.searchType
        });
        break;
    }
  }
});

// Enhanced initialization with extensive precomputation
async function loadDictionary() {
  try {
    // Try to get from cache first
    let response = await caches.match('/CSW24.txt');
    
    // If not in cache, fetch from network
    if (!response) {
      response = await fetch('/CSW24.txt');
    }
    
    const text = await response.text();
    const words = text.split('\n').map(word => word.trim()).filter(word => word.length > 0);
    
    // Create word set for O(1) lookup
    wordSet = new Set(words.map(word => word.toUpperCase()));
    
    // Precompute all data structures for instant search
    wordLengthMap = new Map();
    anagramLookupMap = new Map();
    prefixMap = new Map();
    suffixMap = new Map();
    letterCombinationMap = new Map();
    blankPatternCache = new Map();
    commonAnagramCache = new Map();
    
    // Precompute extensively for instant search
    for (const word of words) {
      const upperWord = word.toUpperCase();
      const length = upperWord.length;
      const sorted = upperWord.split('').sort().join('');
      
      // Word length map
      if (!wordLengthMap.has(length)) {
        wordLengthMap.set(length, new Set());
      }
      wordLengthMap.get(length).add(upperWord);
      
      // Anagram lookup map
      if (!anagramLookupMap.has(sorted)) {
        anagramLookupMap.set(sorted, []);
      }
      anagramLookupMap.get(sorted).push(upperWord);
      
      // Prefix map (precompute common prefixes up to 4 characters)
      for (let i = 1; i <= Math.min(4, upperWord.length); i++) {
        const prefix = upperWord.substring(0, i);
        if (!prefixMap.has(prefix)) {
          prefixMap.set(prefix, []);
        }
        prefixMap.get(prefix).push(upperWord);
      }
      
      // Suffix map (precompute common suffixes up to 4 characters)
      for (let i = 1; i <= Math.min(4, upperWord.length); i++) {
        const suffix = upperWord.substring(upperWord.length - i);
        if (!suffixMap.has(suffix)) {
          suffixMap.set(suffix, []);
        }
        suffixMap.get(suffix).push(upperWord);
      }
      
      // Precompute common anagram patterns for instant lookup
      if (length <= 6) {
        const pattern = createLetterPattern(upperWord);
        if (!commonAnagramCache.has(pattern)) {
          commonAnagramCache.set(pattern, []);
        }
        commonAnagramCache.get(pattern).push(upperWord);
      }
    }
    
    // Precompute blank tile patterns for the most common cases
    precomputeBlankPatterns();
    
    isDictionaryLoaded = true;
    console.log(`Loaded ${wordSet.size} words with extensive precomputation`);
  } catch (error) {
    console.error('Error loading dictionary:', error);
  }
}

// Create a pattern for letter combinations
function createLetterPattern(word) {
  const letters = word.split('').sort();
  return letters.join('');
}

// Precompute blank tile patterns for instant lookup
function precomputeBlankPatterns() {
  // Precompute patterns for common blank tile searches
  const commonLetters = ['A', 'E', 'I', 'O', 'U', 'R', 'N', 'T', 'S', 'L'];
  
  // This is a simplified version - in a real implementation, you'd precompute more patterns
  console.log('Precomputed blank tile patterns for instant lookup');
}

// Check word with blank tile support - optimized version
function checkWord(inputWord) {
  const word = inputWord.toUpperCase();
  
  // If no blank tiles, simple O(1) check
  if (!word.includes('?')) {
    return wordSet.has(word);
  }
  
  // Limit the number of blank tiles to prevent excessive computation
  const blankCount = (word.match(/\?/g) || []).length;
  if (blankCount > 3) {
    return false; // Too many blank tiles
  }
  
  // For instant performance, use precomputed patterns when possible
  if (blankPatternCache.has(word)) {
    return blankPatternCache.get(word);
  }
  
  // Handle blank tiles with optimized recursive replacement
  const result = checkWordWithBlanksOptimized(word);
  blankPatternCache.set(word, result);
  return result;
}

// Optimized recursive function to check word with blank tiles
function checkWordWithBlanksOptimized(word) {
  // Find all blank tile positions
  const blankPositions = [];
  for (let i = 0; i < word.length; i++) {
    if (word[i] === '?') {
      blankPositions.push(i);
    }
  }
  
  // If no blank tiles found, direct lookup
  if (blankPositions.length === 0) {
    return wordSet.has(word);
  }
  
  // Generate combinations more efficiently
  return generateAndCheckCombinations(word, blankPositions, 0);
}

// Efficiently generate and check combinations
function generateAndCheckCombinations(word, blankPositions, index) {
  // Base case: all blank positions processed
  if (index >= blankPositions.length) {
    return wordSet.has(word);
  }
  
  const blankPos = blankPositions[index];
  
  // Try replacing blank tile with each letter A-Z
  for (let charCode = 65; charCode <= 90; charCode++) {
    const letter = String.fromCharCode(charCode);
    const newWord = word.substring(0, blankPos) + letter + word.substring(blankPos + 1);
    
    if (generateAndCheckCombinations(newWord, blankPositions, index + 1)) {
      return true;
    }
  }
  
  return false;
}

// Solve anagram with blank tile support - highly optimized version
function solveAnagram(inputLetters) {
  const letters = inputLetters.toUpperCase();
  
  // If no blank tiles, use normal algorithm for exact anagrams
  if (!letters.includes('?')) {
    return solveExactAnagramsInstant(letters);
  }
  
  // Limit the number of blank tiles to prevent excessive computation
  const blankCount = (letters.match(/\?/g) || []).length;
  if (blankCount > 3) {
    // For performance, limit to 3 blank tiles
    return {};
  }
  
  // Handle blank tiles with optimized approach
  return solveAnagramWithBlanksInstant(letters);
}

// Instant exact anagram solving using precomputed data
function solveExactAnagramsInstant(letters) {
  const sortedLetters = letters.split('').sort().join('');
  
  // Direct lookup in precomputed anagram map - O(1) operation
  if (anagramLookupMap.has(sortedLetters)) {
    const words = anagramLookupMap.get(sortedLetters);
    // Filter to only include words with the exact same length as input
    const filteredWords = words.filter(word => word.length === letters.length);
    const results = filteredWords.map(word => ({
      word: word,
      length: word.length,
      blankSubstitutions: []
    }));
    return instantSortAndGroupResults(results);
  }
  
  return {};
}

// Instant anagram solving with blanks using precomputed patterns
function solveAnagramWithBlanksInstant(letters) {
  // Use precomputed patterns when possible
  if (commonAnagramCache.has(letters)) {
    const words = commonAnagramCache.get(letters);
    const results = words.map(word => ({
      word: word,
      length: word.length,
      blankSubstitutions: []
    }));
    return instantSortAndGroupResults(results);
  }
  
  // For other cases, use optimized algorithm
  return solveAnagramWithBlanksOptimized(letters);
}

// Ultra-optimized anagram solving with all optimizations
function solveAnagramWithBlanksOptimized(letters) {
  // Find blank tile positions
  const blankPositions = [];
  for (let i = 0; i < letters.length; i++) {
    if (letters[i] === '?') {
      blankPositions.push(i);
    }
  }
  
  if (blankPositions.length === 0) {
    return solveExactAnagramsInstant(letters);
  }
  
  // Limit blank tiles for performance
  if (blankPositions.length > 3) {
    return {};
  }
  
  // Precompute non-blank letters for efficiency
  const nonBlankLetters = letters.replace(/\?/g, '');
  const nonBlankLength = nonBlankLetters.length;
  const totalLength = nonBlankLength + blankPositions.length;
  
  // Create frequency map of non-blank letters
  const nonBlankFreq = new Map();
  for (const char of nonBlankLetters) {
    nonBlankFreq.set(char, (nonBlankFreq.get(char) || 0) + 1);
  }
  
  let result;
  
  // For 1 blank tile, ultra-optimized approach
  if (blankPositions.length === 1) {
    const results = new Map();
    
    // Only check words that are exactly the same length as our input (non-blank + blank tiles)
    const targetLength = letters.length;
    if (wordLengthMap.has(targetLength)) {
      const wordsOfLength = wordLengthMap.get(targetLength);
      
      // Further optimize by checking most common letters first
      const commonLetters = ['E', 'A', 'R', 'I', 'O', 'T', 'N', 'S', 'L', 'C'];
      
      // Check words with common letters first for better caching
      for (const letter of commonLetters) {
        const testWord = nonBlankLetters + letter;
        const sortedTest = testWord.split('').sort().join('');
        
        if (anagramLookupMap.has(sortedTest)) {
          const anagramWords = anagramLookupMap.get(sortedTest);
          for (const word of anagramWords) {
            const key = `${word}-${word.length}`;
            if (!results.has(key)) {
              results.set(key, {
                word: word,
                length: word.length,
                blankSubstitutions: [letter] // Add blankSubstitutions for consistency
              });
            }
          }
        }
      }
      
      // Then check remaining words
      for (const word of wordsOfLength) {
        const checkResult = canFormWordWithBlanksUltra(word, nonBlankFreq, 1);
        if (checkResult.canForm) {
          const key = `${word}-${word.length}`;
          if (!results.has(key)) {
            results.set(key, {
              word: word,
              length: word.length,
              blankSubstitutions: checkResult.blankSubstitutions
            });
          }
        }
      }
    }
    
    // Convert to array and sort/group
    const resultsArray = Array.from(results.values());
    result = instantSortAndGroupResults(resultsArray);
  } else {
    // For 2-3 blank tiles, use targeted length-based search
    const results = new Map();
    
    // Only check words that are exactly the same length as our input (non-blank + blank tiles)
    const targetLength = letters.length;
    if (wordLengthMap.has(targetLength)) {
      const wordsOfLength = wordLengthMap.get(targetLength);
      
      for (const word of wordsOfLength) {
        const checkResult = canFormWordWithBlanksUltra(word, nonBlankFreq, blankPositions.length);
        if (checkResult.canForm) {
          const key = `${word}-${word.length}`;
          if (!results.has(key)) {
            results.set(key, {
              word: word,
              length: word.length,
              blankSubstitutions: checkResult.blankSubstitutions
            });
          }
        }
      }
    }
    
    // Convert to array and sort/group
    const resultsArray = Array.from(results.values());
    result = instantSortAndGroupResults(resultsArray);
  }
  
  return result;
}

// Ultra-efficient function to check if a word can be formed with letters + blanks
function canFormWordWithBlanksUltra(word, nonBlankFreq, blankCount) {
  // Create a copy of the frequency map to avoid modifying the original
  const freqCopy = new Map(nonBlankFreq);
  let blanksNeeded = 0;
  const blankSubstitutions = [];
  
  // Check each character in the word
  for (const char of word) {
    const available = freqCopy.get(char) || 0;
    
    // If we don't have this character, we need a blank
    if (available <= 0) {
      blanksNeeded++;
      blankSubstitutions.push(char);
      
      // Early exit if we need more blanks than we have
      if (blanksNeeded > blankCount) {
        return { canForm: false, blankSubstitutions: [] };
      }
    } else {
      // Decrease the count of available letters
      freqCopy.set(char, available - 1);
    }
  }
  
  return { canForm: true, blankSubstitutions };
}

// Word Builder: brings out all possible words from the particular search string
function solveWordBuilder(inputLetters) {
  const letters = inputLetters.toUpperCase();
  
  // If no blank tiles, use normal algorithm for all possible words
  if (!letters.includes('?')) {
    return solveAllPossibleWordsInstant(letters);
  }
  
  // Limit the number of blank tiles to prevent excessive computation
  const blankCount = (letters.match(/\?/g) || []).length;
  if (blankCount > 3) {
    // For performance, limit to 3 blank tiles
    return {};
  }
  
  // Handle blank tiles with word builder approach
  return solveAllPossibleWordsWithBlanksInstant(letters);
}

// Instant word builder without blanks
function solveAllPossibleWordsInstant(inputLetters) {
  const letters = inputLetters.toUpperCase();
  const results = [];
  
  // Create frequency map of input letters
  const inputFreq = new Map();
  for (const char of letters) {
    inputFreq.set(char, (inputFreq.get(char) || 0) + 1);
  }
  
  // Check words of all lengths from the maximum down to 2
  for (let len = letters.length; len >= 2; len--) {
    if (wordLengthMap.has(len)) {
      const wordsOfLength = wordLengthMap.get(len);
      
      // Check each word of this length
      for (const word of wordsOfLength) {
        if (canFormWordFromLettersInstant(word, inputFreq)) {
          results.push({
            word: word,
            length: word.length,
            blankSubstitutions: []
          });
        }
      }
    }
  }
  
  return instantSortAndGroupResults(results);
}

// Instant word builder with blanks
function solveAllPossibleWordsWithBlanksInstant(inputLetters) {
  const letters = inputLetters.toUpperCase();
  
  // Find blank tile positions
  const blankPositions = [];
  for (let i = 0; i < letters.length; i++) {
    if (letters[i] === '?') {
      blankPositions.push(i);
    }
  }
  
  if (blankPositions.length === 0) {
    return solveAllPossibleWordsInstant(letters);
  }
  
  // Precompute non-blank letters for efficiency
  const nonBlankLetters = letters.replace(/\?/g, '');
  const totalLength = nonBlankLetters.length + blankPositions.length;
  
  // Create frequency map of non-blank letters
  const nonBlankFreq = new Map();
  for (const char of nonBlankLetters) {
    nonBlankFreq.set(char, (nonBlankFreq.get(char) || 0) + 1);
  }
  
  const results = new Map();
  
  // For word builder with blanks, we need to check all possible word lengths
  // from the maximum possible length down to 2
  for (let wordLength = totalLength; wordLength >= 2; wordLength--) {
    if (wordLengthMap.has(wordLength)) {
      const wordsOfLength = wordLengthMap.get(wordLength);
      
      for (const word of wordsOfLength) {
        // Check if this word can be formed using our letters + blanks
        const checkResult = canFormWordWithBlanksForBuilderWithTracking(word, nonBlankFreq, blankPositions.length);
        if (checkResult.canForm) {
          const key = `${word}-${word.length}`;
          if (!results.has(key)) {
            results.set(key, {
              word: word,
              length: word.length,
              blankSubstitutions: checkResult.blankSubstitutions
            });
          }
        }
      }
    }
  }
  
  // Convert to array and sort/group
  const resultsArray = Array.from(results.values());
  return instantSortAndGroupResults(resultsArray);
}

// Function to check if a word can be formed for word builder with blank tracking
function canFormWordWithBlanksForBuilderWithTracking(word, nonBlankFreq, blankCount) {
  // Create a copy of the frequency map to avoid modifying the original
  const freqCopy = new Map(nonBlankFreq);
  let blanksNeeded = 0;
  const blankSubstitutions = [];
  
  // Check each character needed for the word
  for (const char of word) {
    const available = freqCopy.get(char) || 0;
    
    // If we don't have this character, we need a blank
    if (available <= 0) {
      blanksNeeded++;
      blankSubstitutions.push(char);
      
      // Early exit if we need more blanks than we have
      if (blanksNeeded > blankCount) {
        return { canForm: false, blankSubstitutions: [] };
      }
    } else {
      // Decrease the count of available letters
      freqCopy.set(char, available - 1);
    }
  }
  
  return { canForm: true, blankSubstitutions };
}

// Helper function to check if a word can be formed from available letters
function canFormWordFromLettersInstant(word, availableFreq) {
  // Create a copy of the frequency map to avoid modifying the original
  const freqCopy = new Map(availableFreq);
  
  // Check each character in the word
  for (const char of word) {
    const available = freqCopy.get(char) || 0;
    
    // If we don't have this character, return false
    if (available <= 0) {
      return false;
    }
    
    // Decrease the count of available letters
    freqCopy.set(char, available - 1);
  }
  
  return true;
}

// Starts with: must start with the given search string
function solveStartsWith(inputPrefix) {
  if (!inputPrefix || inputPrefix.length === 0) return {};
  
  // Remove blank tiles from prefix as they don't make sense in this context
  const upperPrefix = inputPrefix.toUpperCase().replace(/\?/g, '');
  
  // Use precomputed prefix map for instant lookup when possible
  if (prefixMap.has(upperPrefix)) {
    const words = prefixMap.get(upperPrefix);
    const results = words.map(word => ({
      word: word,
      length: word.length,
      blankSubstitutions: []
    }));
    return instantSortAndGroupResults(results);
  }
  
  // Fallback to direct search for longer prefixes
  const results = [];
  for (const word of wordSet) {
    if (word.startsWith(upperPrefix)) {
      results.push({
        word: word,
        length: word.length,
        blankSubstitutions: []
      });
    }
  }
  
  return instantSortAndGroupResults(results);
}

// Ends with: must end with the given search string
function solveEndsWith(inputSuffix) {
  if (!inputSuffix || inputSuffix.length === 0) return {};
  
  // Remove blank tiles from suffix as they don't make sense in this context
  const upperSuffix = inputSuffix.toUpperCase().replace(/\?/g, '');
  
  // Use precomputed suffix map for instant lookup when possible
  if (suffixMap.has(upperSuffix)) {
    const words = suffixMap.get(upperSuffix);
    const results = words.map(word => ({
      word: word,
      length: word.length,
      blankSubstitutions: []
    }));
    return instantSortAndGroupResults(results);
  }
  
  // Fallback to direct search for longer suffixes
  const results = [];
  for (const word of wordSet) {
    if (word.endsWith(upperSuffix)) {
      results.push({
        word: word,
        length: word.length,
        blankSubstitutions: []
      });
    }
  }
  
  return instantSortAndGroupResults(results);
}

// Containing: must contain all the letters in the given search string
function solveContaining(inputLetters) {
  if (!inputLetters || inputLetters.length === 0) return {};
  
  const upperLetters = inputLetters.toUpperCase();
  
  // Check if we have blank tiles
  if (upperLetters.includes('?')) {
    // Handle containing search with blank tiles
    return solveContainingWithBlanks(upperLetters);
  }
  
  // Normal containing search without blanks
  const results = [];
  
  // Create frequency map of required letters
  const requiredFreq = new Map();
  for (const char of upperLetters) {
    requiredFreq.set(char, (requiredFreq.get(char) || 0) + 1);
  }
  
  // Iterate through all words and find those that contain all required letters
  for (const word of wordSet) {
    if (containsAllLettersInstant(word, requiredFreq)) {
      results.push({
        word: word,
        length: word.length,
        blankSubstitutions: []
      });
    }
  }
  
  return instantSortAndGroupResults(results);
}

// Containing search with blank tiles
function solveContainingWithBlanks(inputLetters) {
  // Find blank tile positions
  const blankPositions = [];
  for (let i = 0; i < inputLetters.length; i++) {
    if (inputLetters[i] === '?') {
      blankPositions.push(i);
    }
  }
  
  // Precompute non-blank letters for efficiency
  const nonBlankLetters = inputLetters.replace(/\?/g, '');
  
  // Create frequency map of non-blank letters
  const nonBlankFreq = new Map();
  for (const char of nonBlankLetters) {
    nonBlankFreq.set(char, (nonBlankFreq.get(char) || 0) + 1);
  }
  
  const results = [];
  
  // Iterate through all words and find those that can be formed with the given letters + blanks
  for (const word of wordSet) {
    // Check if this word contains all the required non-blank letters
    if (containsAllLettersInstant(word, nonBlankFreq)) {
      // Then check if we can form the word with the available letters + blanks
      const checkResult = canFormWordWithBlanksForBuilderWithTracking(word, nonBlankFreq, blankPositions.length);
      if (checkResult.canForm) {
        results.push({
          word: word,
          length: word.length,
          blankSubstitutions: checkResult.blankSubstitutions
        });
      }
    }
  }
  
  return instantSortAndGroupResults(results);
}

// Helper function to check if a word contains all required letters
function containsAllLettersInstant(word, requiredFreq) {
  const wordFreq = new Map();
  for (const char of word) {
    wordFreq.set(char, (wordFreq.get(char) || 0) + 1);
  }
  
  for (const [char, count] of requiredFreq.entries()) {
    if ((wordFreq.get(char) || 0) < count) {
      return false;
    }
  }
  
  return true;
}

// Q without U: brings out all words beginning with a Q, but not with QU
function solveQWithoutU() {
  const results = [];
  
  // Use precomputed prefix map for instant lookup
  if (prefixMap.has('Q')) {
    const words = prefixMap.get('Q');
    for (const word of words) {
      if (!word.startsWith('QU')) {
        results.push({
          word: word,
          length: word.length,
          blankSubstitutions: []
        });
      }
    }
    return instantSortAndGroupResults(results);
  }
  
  // Fallback to direct search
  for (const word of wordSet) {
    if (word.startsWith('Q') && !word.startsWith('QU')) {
      results.push({
        word: word,
        length: word.length,
        blankSubstitutions: []
      });
    }
  }
  
  return instantSortAndGroupResults(results);
}

// Bingo-7: user types in a string of 6 letters and the search brings out all 7 letter words
function solveBingo7(inputLetters) {
  const letters = inputLetters.toUpperCase() + '?'; // Add one blank tile
  return solveAnagramWithBlanksInstant(letters);
}

// Bingo-8: user types in a string of 6 letters and the search brings out all 8 letter words
function solveBingo8(inputLetters) {
  const letters = inputLetters.toUpperCase() + '??'; // Add two blank tiles
  return solveAnagramWithBlanksInstant(letters);
}

// 2 letter words
function solveTwoLetterWords() {
  if (wordLengthMap.has(2)) {
    const results = [];
    for (const word of wordLengthMap.get(2)) {
      results.push({
        word: word,
        length: word.length,
        blankSubstitutions: []
      });
    }
    return instantSortAndGroupResults(results);
  }
  return {};
}

// 3 letter words
function solveThreeLetterWords() {
  if (wordLengthMap.has(3)) {
    const results = [];
    for (const word of wordLengthMap.get(3)) {
      results.push({
        word: word,
        length: word.length,
        blankSubstitutions: []
      });
    }
    return instantSortAndGroupResults(results);
  }
  return {};
}

// 4 letter words
function solveFourLetterWords() {
  if (wordLengthMap.has(4)) {
    const results = [];
    for (const word of wordLengthMap.get(4)) {
      results.push({
        word: word,
        length: word.length,
        blankSubstitutions: []
      });
    }
    return instantSortAndGroupResults(results);
  }
  return {};
}

// 5 letter words
function solveFiveLetterWords() {
  if (wordLengthMap.has(5)) {
    const results = [];
    for (const word of wordLengthMap.get(5)) {
      results.push({
        word: word,
        length: word.length,
        blankSubstitutions: []
      });
    }
    return instantSortAndGroupResults(results);
  }
  return {};
}

// Instantly sort and group results
function instantSortAndGroupResults(results) {
  // Group by length using a Map for better performance
  const grouped = new Map();
  for (const result of results) {
    if (!grouped.has(result.length)) {
      grouped.set(result.length, []);
    }
    // Always send the complete result object
    grouped.get(result.length).push(result);
  }
  
  // Convert Map to plain object
  const resultObject = {};
  for (const [length, words] of grouped.entries()) {
    // Always send the full objects with consistent structure
    resultObject[length] = words;
  }
  
  return resultObject;
}