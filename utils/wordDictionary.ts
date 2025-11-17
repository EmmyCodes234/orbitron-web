// Shared utility for loading and processing the word dictionary
let wordSet: Set<string> | null = null;
let anagramLookupMap: Map<string, string[]> | null = null;
let prefixMap: Map<string, string[]> | null = null;
let suffixMap: Map<string, string[]> | null = null;
let wordLengthMap: Map<number, Set<string>> | null = null;

// Function to load and process the dictionary
export async function loadDictionary(): Promise<void> {
  if (wordSet) return; // Already loaded

  try {
    // Fetch the dictionary file directly
    const response = await fetch('/CSW24.txt');
    const text = await response.text();
    const words = text.split('\n').map(word => word.trim().toUpperCase()).filter(word => word.length > 0);
    
    // Create word set for O(1) lookup
    wordSet = new Set(words);
    
    // Precompute data structures for instant search
    wordLengthMap = new Map();
    anagramLookupMap = new Map();
    prefixMap = new Map();
    suffixMap = new Map();
    
    // Precompute extensively for instant search
    for (const word of words) {
      const length = word.length;
      const sorted = word.split('').sort().join('');
      
      // Word length map
      if (!wordLengthMap.has(length)) {
        wordLengthMap.set(length, new Set());
      }
      wordLengthMap.get(length)!.add(word);
      
      // Anagram lookup map
      if (!anagramLookupMap.has(sorted)) {
        anagramLookupMap.set(sorted, []);
      }
      anagramLookupMap.get(sorted)!.push(word);
      
      // Prefix map (precompute common prefixes up to 4 characters)
      for (let i = 1; i <= Math.min(4, word.length); i++) {
        const prefix = word.substring(0, i);
        if (!prefixMap.has(prefix)) {
          prefixMap.set(prefix, []);
        }
        prefixMap.get(prefix)!.push(word);
      }
      
      // Suffix map (precompute common suffixes up to 4 characters)
      for (let i = 1; i <= Math.min(4, word.length); i++) {
        const suffix = word.substring(word.length - i);
        if (!suffixMap.has(suffix)) {
          suffixMap.set(suffix, []);
        }
        suffixMap.get(suffix)!.push(word);
      }
    }
  } catch (error) {
    console.error('Failed to load dictionary:', error);
    throw new Error('Failed to load word dictionary');
  }
}

// Function to check if a word is valid
export function isWordValid(word: string): boolean {
  if (!wordSet) return false;
  return wordSet.has(word.toUpperCase());
}

// Function to solve anagrams with blank tile support
export function solveAnagram(letters: string): Record<number, string[]> {
  if (!anagramLookupMap || !wordLengthMap) return {};
  
  const upperLetters = letters.toUpperCase();
  
  // Count regular letters and blank tiles
  const letterCount: Record<string, number> = {};
  let blankCount = 0;
  
  for (const letter of upperLetters) {
    if (letter === '?') {
      blankCount++;
    } else {
      letterCount[letter] = (letterCount[letter] || 0) + 1;
    }
  }
  
  const results: Record<number, string[]> = {};
  
  // For exact anagram search, we only want words with the exact same length as input
  // This is true regardless of whether there are blank tiles or not
  const targetLength = upperLetters.length;
  
  const wordsOfLength = wordLengthMap.get(targetLength);
  if (wordsOfLength) {
    const validWords: string[] = [];
    
    for (const word of wordsOfLength) {
      if (canFormWordWithBlanks(word, letterCount, blankCount)) {
        validWords.push(word);
      }
    }
    
    if (validWords.length > 0) {
      results[targetLength] = validWords.sort();
    }
  }
  
  return results;
}

// Helper function to check if a word can be formed with given letters and blank tiles
function canFormWordWithBlanks(word: string, letterCount: Record<string, number>, blankCount: number): boolean {
  const wordLetterCount: Record<string, number> = {};
  
  // Count letters in word
  for (const letter of word) {
    wordLetterCount[letter] = (wordLetterCount[letter] || 0) + 1;
  }
  
  // Check if we have enough of each letter
  let blanksNeeded = 0;
  for (const [letter, count] of Object.entries(wordLetterCount)) {
    const available = letterCount[letter] || 0;
    if (available < count) {
      // We need to use blanks to cover the deficit
      blanksNeeded += count - available;
      // If we need more blanks than we have, this word is not possible
      if (blanksNeeded > blankCount) {
        return false;
      }
    }
  }
  
  return true;
}

// Function to solve word builder (all possible words)
export function solveWordBuilder(letters: string): Record<number, string[]> {
  if (!anagramLookupMap || !wordLengthMap) return {};
  
  const upperLetters = letters.toUpperCase();
  
  // Count regular letters and blank tiles
  const letterCount: Record<string, number> = {};
  let blankCount = 0;
  
  for (const letter of upperLetters) {
    if (letter === '?') {
      blankCount++;
    } else {
      letterCount[letter] = (letterCount[letter] || 0) + 1;
    }
  }
  
  const results: Record<number, string[]> = {};
  
  // For word builder with blanks, we want:
  // 1. Words that match the pattern including blanks (same length as input)
  // 2. Words that match without using all blanks (shorter length than input)
  
  // Check each word length from the minimum possible (input length - blank count) to input length
  const minLength = Math.max(1, upperLetters.length - blankCount);
  const maxLength = upperLetters.length;
  
  for (let targetLength = minLength; targetLength <= maxLength; targetLength++) {
    const wordsOfLength = wordLengthMap.get(targetLength);
    if (!wordsOfLength) continue;
    
    const validWords: string[] = [];
    
    for (const word of wordsOfLength) {
      if (canFormWordWithBlanks(word, letterCount, blankCount)) {
        validWords.push(word);
      }
    }
    
    if (validWords.length > 0) {
      results[targetLength] = validWords.sort();
    }
  }
  
  return results;
}

// Function to solve "starts with"
export function solveStartsWith(prefix: string): Record<number, string[]> {
  if (!prefixMap) return {};
  
  const upperPrefix = prefix.toUpperCase();
  const words = prefixMap.get(upperPrefix) || [];
  
  // Group by length
  const results: Record<number, string[]> = {};
  for (const word of words) {
    const length = word.length;
    if (!results[length]) {
      results[length] = [];
    }
    results[length].push(word);
  }
  
  return results;
}

// Function to solve "ends with"
export function solveEndsWith(suffix: string): Record<number, string[]> {
  if (!suffixMap) return {};
  
  const upperSuffix = suffix.toUpperCase();
  const words = suffixMap.get(upperSuffix) || [];
  
  // Group by length
  const results: Record<number, string[]> = {};
  for (const word of words) {
    const length = word.length;
    if (!results[length]) {
      results[length] = [];
    }
    results[length].push(word);
  }
  
  return results;
}

// Function to solve "containing"
export function solveContaining(substring: string): Record<number, string[]> {
  if (!wordSet) return {};
  
  const upperSubstring = substring.toUpperCase();
  const results: Record<number, string[]> = {};
  
  for (const word of wordSet) {
    if (word.includes(upperSubstring)) {
      const length = word.length;
      if (!results[length]) {
        results[length] = [];
      }
      results[length].push(word);
    }
  }
  
  // Sort each group
  for (const length in results) {
    results[length].sort();
  }
  
  return results;
}

// Function to solve Q without U
export function solveQWithoutU(): Record<number, string[]> {
  if (!wordSet) return {};
  
  const results: Record<number, string[]> = {};
  
  for (const word of wordSet) {
    if (word.includes('Q') && !word.includes('U')) {
      const length = word.length;
      if (!results[length]) {
        results[length] = [];
      }
      results[length].push(word);
    }
  }
  
  // Sort each group
  for (const length in results) {
    results[length].sort();
  }
  
  return results;
}

// Function to solve specific length words
export function solveWordsByLength(length: number): Record<number, string[]> {
  if (!wordLengthMap) return {};
  
  const words = wordLengthMap.get(length);
  if (!words) return {};
  
  return { [length]: Array.from(words).sort() };
}

// Function to solve two letter words
export function solveTwoLetterWords(): Record<number, string[]> {
  return solveWordsByLength(2);
}

// Function to solve three letter words
export function solveThreeLetterWords(): Record<number, string[]> {
  return solveWordsByLength(3);
}

// Function to solve four letter words
export function solveFourLetterWords(): Record<number, string[]> {
  return solveWordsByLength(4);
}

// Function to solve five letter words
export function solveFiveLetterWords(): Record<number, string[]> {
  return solveWordsByLength(5);
}