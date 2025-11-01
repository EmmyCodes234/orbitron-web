// Frontend Logic for Word Checker and Anagram Solver

let serviceWorkerReady = false;

// Register Service Worker
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js')
            .then(function(registration) {
                console.log('Service Worker registered with scope:', registration.scope);
                
                // Listen for messages from service worker
                navigator.serviceWorker.addEventListener('message', function(event) {
                    if (event.data && event.data.type) {
                        handleServiceWorkerMessage(event.data);
                    }
                });
                
                // Initialize the service worker
                registration.active?.postMessage({ type: 'INIT' });
            })
            .catch(function(error) {
                console.error('Service Worker registration failed:', error);
                showErrorMessage('Failed to register Service Worker. Word tools may not work properly.');
            });
    });
} else {
    showErrorMessage('Service Workers are not supported in your browser. Word tools may not work properly.');
}

// Handle messages from Service Worker
function handleServiceWorkerMessage(data) {
    switch (data.type) {
        case 'INIT_COMPLETE':
            serviceWorkerReady = true;
            console.log('Service Worker initialization complete');
            break;
            
        case 'CHECK_WORD_RESULT':
            displayWordCheckResult(data.word, data.isValid);
            break;
            
        case 'SOLVE_ANAGRAM_RESULT':
            displayAnagramResults(data.letters, data.results);
            break;
    }
}

// Word Checker Function
function checkWord(word) {
    if (!serviceWorkerReady) {
        showErrorMessage('Service Worker is not ready yet. Please wait a moment and try again.');
        return;
    }
    
    // Clear previous result
    document.getElementById('wordCheckerResult').innerHTML = '';
    
    // Send message to service worker
    navigator.serviceWorker.controller?.postMessage({
        type: 'CHECK_WORD',
        word: word.trim().toUpperCase()
    });
}

// Display Word Check Result
function displayWordCheckResult(word, isValid) {
    const resultDiv = document.getElementById('wordCheckerResult');
    
    if (isValid) {
        resultDiv.innerHTML = `
            <div class="result valid">
                VALID: "${word}" is a valid word in the CSW24 dictionary
            </div>
        `;
    } else {
        resultDiv.innerHTML = `
            <div class="result invalid">
                INVALID: "${word}" is not a valid word in the CSW24 dictionary
            </div>
        `;
    }
}

// Anagram Solver Function
function solveAnagram(letters) {
    if (!serviceWorkerReady) {
        showErrorMessage('Service Worker is not ready yet. Please wait a moment and try again.');
        return;
    }
    
    // Clear previous result
    document.getElementById('anagramSolverResult').innerHTML = '<p>Searching...</p>';
    
    // Send message to service worker
    navigator.serviceWorker.controller?.postMessage({
        type: 'SOLVE_ANAGRAM',
        letters: letters.trim().toUpperCase()
    });
}

// Display Anagram Results
function displayAnagramResults(letters, results) {
    const resultDiv = document.getElementById('anagramSolverResult');
    
    if (Object.keys(results).length === 0) {
        resultDiv.innerHTML = '<p>No valid words found</p>';
        return;
    }
    
    let html = '';
    
    // Sort by length (descending)
    const sortedLengths = Object.keys(results).sort((a, b) => parseInt(b) - parseInt(a));
    
    for (const length of sortedLengths) {
        const words = results[length];
        html += `
            <div class="word-length-group">
                <div class="word-length-title">${length} letter${parseInt(length) !== 1 ? 's' : ''} (${words.length} words)</div>
                <div class="words-container">
        `;
        
        for (const word of words) {
            html += `<span class="word-chip">${word}</span>`;
        }
        
        html += `
                </div>
            </div>
        `;
    }
    
    resultDiv.innerHTML = html;
}

// Show Error Message
function showErrorMessage(message) {
    // For word checker
    let resultDiv = document.getElementById('wordCheckerResult');
    if (resultDiv) {
        resultDiv.innerHTML = `<div class="result invalid">${message}</div>`;
    }
    
    // For anagram solver
    resultDiv = document.getElementById('anagramSolverResult');
    if (resultDiv) {
        resultDiv.innerHTML = `<div class="result invalid">${message}</div>`;
    }
}

// Event Listeners
document.addEventListener('DOMContentLoaded', function() {
    // Word Checker
    const wordInput = document.getElementById('wordCheckerInput');
    const checkBtn = document.getElementById('checkWordBtn');
    
    if (wordInput && checkBtn) {
        checkBtn.addEventListener('click', function() {
            const word = wordInput.value;
            if (word.trim()) {
                checkWord(word);
            }
        });
        
        wordInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                const word = wordInput.value;
                if (word.trim()) {
                    checkWord(word);
                }
            }
        });
    }
    
    // Anagram Solver
    const anagramInput = document.getElementById('anagramSolverInput');
    const solveBtn = document.getElementById('solveAnagramBtn');
    
    if (anagramInput && solveBtn) {
        solveBtn.addEventListener('click', function() {
            const letters = anagramInput.value;
            if (letters.trim()) {
                solveAnagram(letters);
            }
        });
        
        anagramInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                const letters = anagramInput.value;
                if (letters.trim()) {
                    solveAnagram(letters);
                }
            }
        });
    }
});