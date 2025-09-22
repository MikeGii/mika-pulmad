// src/types/Guest.ts - Updated simplified version
export interface Guest {
    id: string;
    firstName: string;
    lastName: string;
    phoneNumber?: string;
    email?: string;
    location?: string;
    tableNumber: number;
    isChild: boolean;

    // Invitation System
    isInvitationGetter: boolean;
    invitationLanguage: 'et' | 'ua';
    linkedInvitationGetterId?: string;

    // Invitation Tracking
    invitationStatus: 'not_sent' | 'sent' | 'opened' | 'responded' | 'declined';
    invitationUrl?: string;
    invitationSentAt?: Date;
    invitationOpenedAt?: Date;
    invitationOpenCount: number;
    lastOpenedAt?: Date;

    // Simplified RSVP Responses
    rsvpStatus: 'pending' | 'attending' | 'not_attending';
    rsvpSubmittedAt?: Date;
    rsvpResponses: {
        // Just the 3 essential questions for testing
        requiresAccommodation: boolean;
        needsTransport: boolean;
        hasDietaryRestrictions: boolean;
        dietaryNote?: string; // Optional note for dietary requirements
    };

    createdAt: Date;
    updatedAt: Date;
}

export interface GuestFormData {
    firstName: string;
    lastName: string;
    phoneNumber: string;
    email: string;
    location: string;
    tableNumber: number | '';
    isChild: boolean;

    // Invitation fields
    isInvitationGetter: boolean;
    invitationLanguage: 'et' | 'ua';
    linkedInvitationGetterId: string;
}

export interface CreateGuestData {
    firstName: string;
    lastName: string;
    phoneNumber?: string;
    email?: string;
    location?: string;
    tableNumber: number;
    isChild: boolean;

    // Invitation fields
    isInvitationGetter: boolean;
    invitationLanguage: 'et' | 'ua';
    linkedInvitationGetterId?: string;
}