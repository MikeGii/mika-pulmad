// src/types/Guest.ts
export interface Guest {
    id: string;
    firstName: string;
    lastName: string;
    phoneNumber?: string;
    email?: string;
    location?: string; // maakond ja riik
    tableNumber: number;
    isChild: boolean; // To track if this guest is a child (4+ years old)
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
}

export interface CreateGuestData {
    firstName: string;
    lastName: string;
    phoneNumber?: string;
    email?: string;
    location?: string;
    tableNumber: number;
    isChild: boolean;
}