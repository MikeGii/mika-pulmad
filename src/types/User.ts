// src/types/User.ts
export interface UserPermissions {
    accountManagement: boolean;
    taskManagement: boolean;
    financialManagement: boolean;
    guestManagement: boolean;
    transportationManagement: boolean;
}

export interface UserDashboardAccess {
    accountManagement: boolean;
    taskManagement: boolean;
    financialManagement: boolean;
    guestManagement: boolean;
    transportationManagement: boolean;
}

export interface UserProfile {
    firstName: string;
    lastName: string;
    displayName?: string;
    phone?: string;
    role: 'admin' | 'planner' | 'coordinator';
}

export interface User {
    id: string; // matches Firebase Auth UID
    email: string;
    profile: UserProfile;
    permissions: UserPermissions;
    dashboardAccess: UserDashboardAccess;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
    lastLoginAt?: Date;
}

export interface CreateUserData {
    email: string;
    password: string;
    profile: UserProfile;
    permissions: UserPermissions;
}