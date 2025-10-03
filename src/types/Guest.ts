// src/types/Guest.ts
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
        attendingGuestIds: string[];
        requiresAccommodation: boolean;
        needsTransport: boolean;
        transportDetails?: string;
        hasDietaryRestrictions: boolean;
        dietaryNote?: string;
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