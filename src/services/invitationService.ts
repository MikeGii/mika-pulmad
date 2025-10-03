// src/services/invitationService.ts
import { GuestService } from './guestService';
import { Guest } from '../types';

export class InvitationService {
    /**
     * Generate unique invitation URL for a guest
     */
    static generateInvitationUrl(guest: Guest): string {
        const encodedName = `${guest.firstName}&${guest.lastName}`;
        return `/invitation/${encodedName}`;
    }

    /**
     * Get full invitation URL with domain
     */
    static getFullInvitationUrl(guest: Guest): string {
        const path = this.generateInvitationUrl(guest);
        return `${window.location.origin}${path}`;
    }

    /**
     * Track when invitation is opened by a guest
     */
    static async trackInvitationOpen(guestName: string): Promise<void> {
        try {
            if (!guestName) return;

            // Parse guest name from URL
            const [firstName, lastName] = guestName.split('&');
            if (!firstName || !lastName) return;

            // Find the invitation getter
            const allGuests = await GuestService.getAllGuests();
            const invitationGetter = allGuests.find(guest =>
                guest.firstName.toLowerCase() === firstName.toLowerCase() &&
                guest.lastName.toLowerCase() === lastName.toLowerCase() &&
                guest.isInvitationGetter
            );

            if (!invitationGetter) return;

            // Update invitation tracking
            const updateData = {
                invitationStatus: 'opened' as const,
                invitationOpenedAt: invitationGetter.invitationOpenedAt || new Date(),
                invitationOpenCount: invitationGetter.invitationOpenCount + 1,
                lastOpenedAt: new Date(),
            };

            await GuestService.updateGuest(invitationGetter.id, updateData);

            console.log(`Invitation opened by ${firstName} ${lastName}`);
        } catch (error) {
            console.error('Error tracking invitation open:', error);
        }
    }

    /**
     * Submit RSVP responses for a guest
     */
    static async submitRSVP(guestId: string, rsvpData: {
        attendingGuestIds: string[];
        attending: boolean;
        requiresAccommodation: boolean;
        needsTransport: boolean;
        transportDetails?: string;
        hasDietaryRestrictions: boolean;
        dietaryNote?: string;
    }): Promise<void> {
        try {
            // Build rsvpResponses object - only include defined values
            const rsvpResponses: any = {
                attendingGuestIds: rsvpData.attendingGuestIds,
                requiresAccommodation: rsvpData.requiresAccommodation,
                needsTransport: rsvpData.needsTransport,
                hasDietaryRestrictions: rsvpData.hasDietaryRestrictions,
            };

            // Only add transportDetails if it exists and is not empty
            if (rsvpData.transportDetails && rsvpData.transportDetails.trim()) {
                rsvpResponses.transportDetails = rsvpData.transportDetails.trim();
            }

            // Only add dietaryNote if it exists and is not empty
            if (rsvpData.dietaryNote && rsvpData.dietaryNote.trim()) {
                rsvpResponses.dietaryNote = rsvpData.dietaryNote.trim();
            }

            const updateData = {
                rsvpStatus: rsvpData.attending ? 'attending' as const : 'not_attending' as const,
                rsvpSubmittedAt: new Date(),
                rsvpResponses: rsvpResponses,
                invitationStatus: 'responded' as const,
            };

            await GuestService.updateGuest(guestId, updateData);

            console.log(`RSVP submitted for guest ${guestId}`, rsvpData);
        } catch (error) {
            console.error('Error submitting RSVP:', error);
            throw error;
        }
    }

    /**
     * Mark invitation as sent and generate URL
     */
    static async markInvitationSent(guestId: string): Promise<string> {
        try {
            const allGuests = await GuestService.getAllGuests();
            const guest = allGuests.find(g => g.id === guestId);

            if (!guest) {
                throw new Error('Guest not found');
            }

            const invitationUrl = this.generateInvitationUrl(guest);

            const updateData = {
                invitationStatus: 'sent' as const,
                invitationUrl: invitationUrl,
                invitationSentAt: new Date(),
            };

            await GuestService.updateGuest(guestId, updateData);

            return this.getFullInvitationUrl(guest);
        } catch (error) {
            console.error('Error marking invitation as sent:', error);
            throw error;
        }
    }

    /**
     * Get invitation analytics for dashboard
     */
    static async getInvitationAnalytics(): Promise<{
        totalInvitations: number;
        sentInvitations: number;
        openedInvitations: number;
        respondedInvitations: number;
        responseRate: number;
        openRate: number;
        accommodationRequests: number;
        transportRequests: number;
        dietaryRestrictions: number;
        attending: number;
        notAttending: number;
        pending: number;
    }> {
        try {
            const allGuests = await GuestService.getAllGuests();
            const invitationGetters = allGuests.filter(guest => guest.isInvitationGetter);

            const totalInvitations = invitationGetters.length;
            const sentInvitations = invitationGetters.filter(g => g.invitationStatus !== 'not_sent').length;
            const openedInvitations = invitationGetters.filter(g =>
                g.invitationStatus === 'opened' || g.invitationStatus === 'responded'
            ).length;
            const respondedInvitations = invitationGetters.filter(g => g.invitationStatus === 'responded').length;

            const responseRate = sentInvitations > 0 ? (respondedInvitations / sentInvitations) * 100 : 0;
            const openRate = sentInvitations > 0 ? (openedInvitations / sentInvitations) * 100 : 0;

            // RSVP analytics
            const attending = invitationGetters.filter(g => g.rsvpStatus === 'attending').length;
            const notAttending = invitationGetters.filter(g => g.rsvpStatus === 'not_attending').length;
            const pending = invitationGetters.filter(g => g.rsvpStatus === 'pending').length;

            // Requirements analytics
            const accommodationRequests = invitationGetters.filter(g =>
                g.rsvpStatus === 'attending' && g.rsvpResponses.requiresAccommodation
            ).length;
            const transportRequests = invitationGetters.filter(g =>
                g.rsvpStatus === 'attending' && g.rsvpResponses.needsTransport
            ).length;
            const dietaryRestrictions = invitationGetters.filter(g =>
                g.rsvpStatus === 'attending' && g.rsvpResponses.hasDietaryRestrictions
            ).length;

            return {
                totalInvitations,
                sentInvitations,
                openedInvitations,
                respondedInvitations,
                responseRate: Math.round(responseRate * 10) / 10,
                openRate: Math.round(openRate * 10) / 10,
                accommodationRequests,
                transportRequests,
                dietaryRestrictions,
                attending,
                notAttending,
                pending,
            };
        } catch (error) {
            console.error('Error getting invitation analytics:', error);
            return {
                totalInvitations: 0,
                sentInvitations: 0,
                openedInvitations: 0,
                respondedInvitations: 0,
                responseRate: 0,
                openRate: 0,
                accommodationRequests: 0,
                transportRequests: 0,
                dietaryRestrictions: 0,
                attending: 0,
                notAttending: 0,
                pending: 0,
            };
        }
    }

    /**
     * Get linked guests for an invitation getter
     */
    static async getLinkedGuestsForInvitation(invitationGetterId: string): Promise<Guest[]> {
        try {
            return await GuestService.getLinkedGuests(invitationGetterId);
        } catch (error) {
            console.error('Error getting linked guests:', error);
            return [];
        }
    }

    /**
     * Find invitation getter by name (used by invitation page)
     */
    static async findInvitationGetterByName(firstName: string, lastName: string): Promise<Guest | null> {
        try {
            const allGuests = await GuestService.getAllGuests();
            const invitationGetter = allGuests.find(guest =>
                guest.firstName.toLowerCase() === firstName.toLowerCase() &&
                guest.lastName.toLowerCase() === lastName.toLowerCase() &&
                guest.isInvitationGetter
            );

            return invitationGetter || null;
        } catch (error) {
            console.error('Error finding invitation getter:', error);
            return null;
        }
    }

    /**
     * Validate if invitation URL is valid
     */
    static async validateInvitationUrl(guestName: string): Promise<boolean> {
        try {
            const [firstName, lastName] = guestName.split('&');
            if (!firstName || !lastName) return false;

            const invitationGetter = await this.findInvitationGetterByName(firstName, lastName);
            return invitationGetter !== null;
        } catch (error) {
            console.error('Error validating invitation URL:', error);
            return false;
        }
    }


}