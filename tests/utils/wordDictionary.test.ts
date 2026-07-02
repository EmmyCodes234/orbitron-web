
import { describe, it, expect, vi, beforeAll, beforeEach, afterEach } from 'vitest';
import { loadDictionary, solveWordBuilder, solveAnagram } from '../../utils/wordDictionary';

// Mock fetch globally
const mockFetch = vi.fn();
global.fetch = mockFetch;

describe('wordDictionary', () => {
    beforeAll(() => {
        // Setup console error mock to suppress expected errors if any
        vi.spyOn(console, 'error').mockImplementation(() => { });
    });

    beforeEach(async () => {
        mockFetch.mockReset();
        // Setup a small dictionary
        const dictionaryContent = [
            'ART',
            'RAT',
            'TAR',
            'AT',
            'BAT',
            'TAB',
            'CAT',
            'ACT',
            'A' // usually skipped by internal logic if we verify 1-letter words
        ].join('\n');

        mockFetch.mockResolvedValue({
            text: () => Promise.resolve(dictionaryContent),
        });

        // We need to reload dictionary. 
        // Problem: wordDictionary module holds state (wordSet) and checks "if (wordSet) return".
        // Use vi.resetModules() might help but might be tricky with ESM.
        // Or we assume it's loaded once.
        // If we want to test correct loading, we should ideally have a way to reset it.
        // For now, we call it. If it was already loaded (e.g. by other tests?), it returns.
        // But in this test file, it's new environment (if run via vitest).
        // Let's rely on it being the first time load.
        await loadDictionary();
    });

    describe('solveWordBuilder', () => {
        it('should find sub-words (words shorter than input)', () => {
            // Input: 'ART'
            // Expected: 'ART', 'RAT', 'TAR' (len 3), 'AT' (len 2)
            // 'BAT', 'TAB', 'CAT', 'ACT' are not permissible.

            const results = solveWordBuilder('ART');

            expect(results[3]).toEqual(expect.arrayContaining(['ART', 'RAT', 'TAR']));
            expect(results[2]).toEqual(expect.arrayContaining(['AT']));
            expect(results[2]).not.toContain('TB'); // just sanity check

            // Should NOT contain words not formable
            if (results[3]) {
                expect(results[3]).not.toContain('BAT');
            }
        });

        it('should handle blanks in Word Builder', () => {
            // Input: 'A?T' (? can be R, C, B...)
            // Dictionary has: ART, RAT, TAR, BAT, TAB, CAT, ACT, AT
            // A?T -> A[R]T (ART), [R]AT (RAT), T[R]A (TAR - wait, T[R]A vs T A R?)
            // Letters: A, T, ?
            // Words formable:
            // ART (A, T, ?=R) - Yes
            // RAT (A, T, ?=R) - Yes
            // TAR (A, T, ?=R) - Yes
            // BAT (A, T, ?=B) - Yes
            // TAB (A, T, ?=B) - Yes
            // CAT (A, T, ?=C) - Yes
            // ACT (A, T, ?=C) - Yes
            // AT (A, T) - Yes

            const results = solveWordBuilder('A?T');
            expect(results[3]).toEqual(expect.arrayContaining(['ART', 'RAT', 'TAR', 'BAT', 'TAB', 'CAT', 'ACT']));
            expect(results[2]).toEqual(expect.arrayContaining(['AT']));
        });
    });

    describe('solveAnagram', () => {
        it('should only return words of exact length', () => {
            // Input: 'ART'
            // Should return ONLY length 3 words
            const results = solveAnagram('ART');

            expect(Object.keys(results).length).toBe(1);
            expect(results[3]).toEqual(expect.arrayContaining(['ART', 'RAT', 'TAR']));
            expect(results[2]).toBeUndefined();
        });
    });
});
