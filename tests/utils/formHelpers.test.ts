
import { describe, it, expect } from 'vitest';
import { adjustEndDate, isValidPhoneNumber, validateRatingApplication } from '../../utils/formHelpers';

describe('formHelpers', () => {
    describe('adjustEndDate', () => {
        it('should return new start date if current end date is empty', () => {
            expect(adjustEndDate('2025-01-01', '')).toBe('2025-01-01');
        });

        it('should return new start date if current end date is before new start date', () => {
            expect(adjustEndDate('2025-01-05', '2025-01-01')).toBe('2025-01-05');
        });

        it('should return current end date if it is after new start date', () => {
            expect(adjustEndDate('2025-01-01', '2025-01-10')).toBe('2025-01-10');
        });

        it('should return current end date if it is same as new start date', () => {
            expect(adjustEndDate('2025-01-01', '2025-01-01')).toBe('2025-01-01');
        });
    });

    describe('isValidPhoneNumber', () => {
        it('should return true for valid phone numbers', () => {
            expect(isValidPhoneNumber('12345')).toBe(true);
            expect(isValidPhoneNumber('+1234567890')).toBe(true);
        });

        it('should return false for empty or short phone numbers', () => {
            expect(isValidPhoneNumber('')).toBe(false);
            expect(isValidPhoneNumber('123')).toBe(false);
            expect(isValidPhoneNumber('   ')).toBe(false);
        });
    });

    describe('validateRatingApplication', () => {
        const validData = {
            organizerName: 'John Doe',
            email: 'john@example.com',
            phoneNumber: '1234567890',
            eventName: 'My Event',
            startDate: '2025-01-01',
            endDate: '2025-01-02',
            agreedToTerms: true
        };

        it('should return valid for correct data', () => {
            expect(validateRatingApplication(validData)).toEqual({ isValid: true });
        });

        it('should fail if organizer name is empty', () => {
            expect(validateRatingApplication({ ...validData, organizerName: '' })).toEqual({ isValid: false, error: 'Please enter organizer name' });
        });

        it('should fail if email is empty', () => {
            expect(validateRatingApplication({ ...validData, email: '' })).toEqual({ isValid: false, error: 'Please enter email address' });
        });

        it('should fail if phone number is empty', () => {
            expect(validateRatingApplication({ ...validData, phoneNumber: '' })).toEqual({ isValid: false, error: 'Please enter phone number' });
        });

        it('should fail if event name is empty', () => {
            expect(validateRatingApplication({ ...validData, eventName: '' })).toEqual({ isValid: false, error: 'Please enter event name' });
        });

        it('should fail if startDate is empty', () => {
            expect(validateRatingApplication({ ...validData, startDate: '' })).toEqual({ isValid: false, error: 'Please enter start and end dates' });
        });

        it('should fail if endDate is empty', () => {
            expect(validateRatingApplication({ ...validData, endDate: '' })).toEqual({ isValid: false, error: 'Please enter start and end dates' });
        });

        it('should fail if endDate is before startDate', () => {
            expect(validateRatingApplication({ ...validData, startDate: '2025-01-02', endDate: '2025-01-01' })).toEqual({ isValid: false, error: 'End date cannot be before start date' });
        });

        it('should fail if terms not agreed', () => {
            expect(validateRatingApplication({ ...validData, agreedToTerms: false })).toEqual({ isValid: false, error: 'You must agree to the terms and conditions' });
        });
    });
});
