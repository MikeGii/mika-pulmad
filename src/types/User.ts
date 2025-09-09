// src/types/User.ts
export interface UserPermissions {
    accountManagement: boolean;
}

export interface UserDashboardAccess {
    accountManagement: boolean;
}

export interface User {
    id: string;
    email: string;
    permissions: UserPermissions;
    dashboardAccess: UserDashboardAccess;
}