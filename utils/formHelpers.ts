
/**
 * Updates the end date based on the start date change.
 * If the current end date is empty or before the new start date, 
 * it returns the new start date (to ensure End Date >= Start Date).
 * Otherwise, it returns the current end date.
 */
export const adjustEndDate = (newStartDate: string, currentEndDate: string): string => {
    if (!currentEndDate || currentEndDate < newStartDate) {
        return newStartDate;
    }
    return currentEndDate;
};

/**
 * Validates a phone number.
 * Currently checks if it's not empty and has a reasonable length.
 * Can be enhanced with regex.
 */
export const isValidPhoneNumber = (phone: string): boolean => {
    // Basic validation: not empty and at least 5 characters (e.g. extension)
    return phone.trim().length >= 5;
};

/**
 * Validates the Rating Application form data.
 */
export const validateRatingApplication = (data: {
    organizerName: string;
    email: string;
    phoneNumber: string;
    eventName: string;
    startDate: string;
    endDate: string;
    agreedToTerms: boolean;
}): { isValid: boolean; error?: string } => {
    if (!data.organizerName.trim()) return { isValid: false, error: 'Please enter organizer name' };
    if (!data.email.trim()) return { isValid: false, error: 'Please enter email address' };
    if (!data.phoneNumber.trim()) return { isValid: false, error: 'Please enter phone number' };
    if (!data.eventName.trim()) return { isValid: false, error: 'Please enter event name' };
    if (!data.startDate || !data.endDate) return { isValid: false, error: 'Please enter start and end dates' };

    if (data.endDate < data.startDate) {
        return { isValid: false, error: 'End date cannot be before start date' };
    }

    if (!data.agreedToTerms) return { isValid: false, error: 'You must agree to the terms and conditions' };

    return { isValid: true };
};
