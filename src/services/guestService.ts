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
                createdAt: new Date(),
                updatedAt: new Date(),
            };

            const docRef = await addDoc(collection(db, 'guests'), newGuest);

            return {
                id: docRef.id,
                ...guestData, // Return the original data structure
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
                    createdAt: data.createdAt?.toDate() || new Date(),
                    updatedAt: data.updatedAt?.toDate() || new Date(),
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
                    createdAt: data.createdAt?.toDate() || new Date(),
                    updatedAt: data.updatedAt?.toDate() || new Date(),
                } as Guest;
            });
        } catch (error) {
            console.error('Error fetching guests by table:', error);
            return [];
        }
    }

    // Update guest
    static async updateGuest(guestId: string, guestData: Partial<CreateGuestData>): Promise<void> {
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