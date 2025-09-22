// src/services/guestService.ts
import {
    collection,
    addDoc,
    getDocs,
    updateDoc,
    deleteDoc,
    doc,
    query,
    orderBy,
    where
} from 'firebase/firestore';
import { db } from '../firebase';
import { Guest, CreateGuestData } from '../types';

export class GuestService {
    // Create a new guest
    static async createGuest(guestData: CreateGuestData): Promise<Guest> {
        try {
            // Filter out undefined values for Firestore
            const cleanGuestData = Object.fromEntries(
                Object.entries(guestData).filter(([_, value]) => value !== undefined)
            );

            const newGuest = {
                ...cleanGuestData,
                // Set default invitation tracking fields
                invitationStatus: 'not_sent' as const,
                invitationOpenCount: 0,
                rsvpStatus: 'pending' as const,
                rsvpResponses: {
                    requiresAccommodation: false,
                    needsTransport: false,
                    hasDietaryRestrictions: false,
                },
                createdAt: new Date(),
                updatedAt: new Date(),
            };

            const docRef = await addDoc(collection(db, 'guests'), newGuest);

            return {
                id: docRef.id,
                ...guestData,
                // Include default values in return
                invitationStatus: 'not_sent',
                invitationOpenCount: 0,
                rsvpStatus: 'pending',
                rsvpResponses: {
                    requiresAccommodation: false,
                    needsTransport: false,
                    hasDietaryRestrictions: false,
                },
                createdAt: newGuest.createdAt,
                updatedAt: newGuest.updatedAt,
            } as Guest;
        } catch (error) {
            console.error('Error creating guest:', error);
            throw error;
        }
    }

    // Get all guests
    static async getAllGuests(): Promise<Guest[]> {
        try {
            const guestsSnapshot = await getDocs(
                query(collection(db, 'guests'), orderBy('firstName', 'asc'))
            );

            return guestsSnapshot.docs.map(doc => {
                const data = doc.data();
                return {
                    id: doc.id,
                    ...data,
                    // Ensure default values for invitation fields if missing
                    isInvitationGetter: data.isInvitationGetter ?? false,
                    invitationLanguage: data.invitationLanguage ?? 'et',
                    invitationStatus: data.invitationStatus ?? 'not_sent',
                    invitationOpenCount: data.invitationOpenCount ?? 0,
                    rsvpStatus: data.rsvpStatus ?? 'pending',
                    rsvpResponses: {
                        requiresAccommodation: false,
                        needsTransport: false,
                        hasDietaryRestrictions: false,
                        ...data.rsvpResponses
                    },
                    createdAt: data.createdAt?.toDate() || new Date(),
                    updatedAt: data.updatedAt?.toDate() || new Date(),
                    invitationSentAt: data.invitationSentAt?.toDate() || undefined,
                    invitationOpenedAt: data.invitationOpenedAt?.toDate() || undefined,
                    lastOpenedAt: data.lastOpenedAt?.toDate() || undefined,
                    rsvpSubmittedAt: data.rsvpSubmittedAt?.toDate() || undefined,
                } as Guest;
            });
        } catch (error) {
            console.error('Error fetching guests:', error);
            return [];
        }
    }

    // Get guests by table number
    static async getGuestsByTable(tableNumber: number): Promise<Guest[]> {
        try {
            const guestsSnapshot = await getDocs(
                query(
                    collection(db, 'guests'),
                    where('tableNumber', '==', tableNumber),
                    orderBy('firstName', 'asc')
                )
            );

            return guestsSnapshot.docs.map(doc => {
                const data = doc.data();
                return {
                    id: doc.id,
                    ...data,
                    // Ensure default values for invitation fields if missing
                    isInvitationGetter: data.isInvitationGetter ?? false,
                    invitationLanguage: data.invitationLanguage ?? 'et',
                    invitationStatus: data.invitationStatus ?? 'not_sent',
                    invitationOpenCount: data.invitationOpenCount ?? 0,
                    rsvpStatus: data.rsvpStatus ?? 'pending',
                    rsvpResponses: {
                        requiresAccommodation: false,
                        needsTransport: false,
                        hasDietaryRestrictions: false,
                        ...data.rsvpResponses
                    },
                    createdAt: data.createdAt?.toDate() || new Date(),
                    updatedAt: data.updatedAt?.toDate() || new Date(),
                    invitationSentAt: data.invitationSentAt?.toDate() || undefined,
                    invitationOpenedAt: data.invitationOpenedAt?.toDate() || undefined,
                    lastOpenedAt: data.lastOpenedAt?.toDate() || undefined,
                    rsvpSubmittedAt: data.rsvpSubmittedAt?.toDate() || undefined,
                } as Guest;
            });
        } catch (error) {
            console.error('Error fetching guests by table:', error);
            return [];
        }
    }

    // Get single guest by ID
    static async getGuest(guestId: string): Promise<Guest | null> {
        try {
            const guestDoc = await getDocs(
                query(collection(db, 'guests'), where('__name__', '==', guestId))
            );

            if (guestDoc.empty) return null;

            const data = guestDoc.docs[0].data();
            return {
                id: guestDoc.docs[0].id,
                ...data,
                // Ensure default values for invitation fields if missing
                isInvitationGetter: data.isInvitationGetter ?? false,
                invitationLanguage: data.invitationLanguage ?? 'et',
                invitationStatus: data.invitationStatus ?? 'not_sent',
                invitationOpenCount: data.invitationOpenCount ?? 0,
                rsvpStatus: data.rsvpStatus ?? 'pending',
                rsvpResponses: {
                    requiresAccommodation: false,
                    needsTransport: false,
                    hasDietaryRestrictions: false,
                    ...data.rsvpResponses
                },
                createdAt: data.createdAt?.toDate() || new Date(),
                updatedAt: data.updatedAt?.toDate() || new Date(),
                invitationSentAt: data.invitationSentAt?.toDate() || undefined,
                invitationOpenedAt: data.invitationOpenedAt?.toDate() || undefined,
                lastOpenedAt: data.lastOpenedAt?.toDate() || undefined,
                rsvpSubmittedAt: data.rsvpSubmittedAt?.toDate() || undefined,
            } as Guest;
        } catch (error) {
            console.error('Error fetching guest:', error);
            return null;
        }
    }

    // Update guest
    static async updateGuest(guestId: string, guestData: Partial<CreateGuestData> | Partial<Guest>): Promise<void> {
        try {
            // Filter out undefined values for Firestore
            const cleanGuestData = Object.fromEntries(
                Object.entries(guestData).filter(([_, value]) => value !== undefined)
            );

            await updateDoc(doc(db, 'guests', guestId), {
                ...cleanGuestData,
                updatedAt: new Date(),
            });
        } catch (error) {
            console.error('Error updating guest:', error);
            throw error;
        }
    }

    // Delete guest
    static async deleteGuest(guestId: string): Promise<void> {
        try {
            await deleteDoc(doc(db, 'guests', guestId));
        } catch (error) {
            console.error('Error deleting guest:', error);
            throw error;
        }
    }

    // Get invitation getters only
    static async getInvitationGetters(): Promise<Guest[]> {
        try {
            const guestsSnapshot = await getDocs(
                query(
                    collection(db, 'guests'),
                    where('isInvitationGetter', '==', true),
                    orderBy('firstName', 'asc')
                )
            );

            return guestsSnapshot.docs.map(doc => {
                const data = doc.data();
                return {
                    id: doc.id,
                    ...data,
                    createdAt: data.createdAt?.toDate() || new Date(),
                    updatedAt: data.updatedAt?.toDate() || new Date(),
                    invitationSentAt: data.invitationSentAt?.toDate() || undefined,
                    invitationOpenedAt: data.invitationOpenedAt?.toDate() || undefined,
                    lastOpenedAt: data.lastOpenedAt?.toDate() || undefined,
                    rsvpSubmittedAt: data.rsvpSubmittedAt?.toDate() || undefined,
                } as Guest;
            });
        } catch (error) {
            console.error('Error fetching invitation getters:', error);
            return [];
        }
    }

    // Get linked guests for a specific invitation getter
    static async getLinkedGuests(invitationGetterId: string): Promise<Guest[]> {
        try {
            const guestsSnapshot = await getDocs(
                query(
                    collection(db, 'guests'),
                    where('linkedInvitationGetterId', '==', invitationGetterId),
                    orderBy('firstName', 'asc')
                )
            );

            return guestsSnapshot.docs.map(doc => {
                const data = doc.data();
                return {
                    id: doc.id,
                    ...data,
                    createdAt: data.createdAt?.toDate() || new Date(),
                    updatedAt: data.updatedAt?.toDate() || new Date(),
                } as Guest;
            });
        } catch (error) {
            console.error('Error fetching linked guests:', error);
            return [];
        }
    }

    // Get guest statistics
    static async getGuestStatistics(): Promise<{
        totalGuests: number;
        totalAdults: number;
        totalChildren: number;
        guestsByTable: { [tableNumber: number]: number };
    }> {
        try {
            const guests = await this.getAllGuests();

            const totalGuests = guests.length;
            const totalChildren = guests.filter(guest => guest.isChild).length;
            const totalAdults = totalGuests - totalChildren;

            const guestsByTable: { [tableNumber: number]: number } = {};
            guests.forEach(guest => {
                guestsByTable[guest.tableNumber] = (guestsByTable[guest.tableNumber] || 0) + 1;
            });

            return {
                totalGuests,
                totalAdults,
                totalChildren,
                guestsByTable
            };
        } catch (error) {
            console.error('Error getting guest statistics:', error);
            return {
                totalGuests: 0,
                totalAdults: 0,
                totalChildren: 0,
                guestsByTable: {}
            };
        }
    }
}