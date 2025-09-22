// src/services/userService.ts
import {
    createUserWithEmailAndPassword,
    sendPasswordResetEmail
} from 'firebase/auth';
import {
    doc,
    setDoc,
    getDoc,
    getDocs,
    collection,
    updateDoc,
    query,
    where,
    orderBy
} from 'firebase/firestore';
import { auth, db } from '../firebase';
import { User, CreateUserData, UserPermissions } from '../types/User';

export class UserService {
    // Create a new user (Auth + Firestore)
    static async createUser(userData: CreateUserData): Promise<User> {
        try {
            // 1. Create Firebase Auth user
            const userCredential = await createUserWithEmailAndPassword(
                auth,
                userData.email,
                userData.password
            );

            const firebaseUser = userCredential.user;

            // 2. Create Firestore user document
            const newUser: User = {
                id: firebaseUser.uid,
                email: userData.email,
                profile: userData.profile,
                permissions: userData.permissions,
                dashboardAccess: userData.permissions, // Initially same as permissions
                isActive: true,
                createdAt: new Date(),
                updatedAt: new Date(),
            };

            await setDoc(doc(db, 'users', firebaseUser.uid), newUser);

            // 3. Send password reset email so user can set their own password
            await sendPasswordResetEmail(auth, userData.email);

            return newUser;
        } catch (error) {
            console.error('Error creating user:', error);
            throw error;
        }
    }

    // Get user from Firestore
    static async getUser(uid: string): Promise<User | null> {
        try {
            const userDoc = await getDoc(doc(db, 'users', uid));
            if (userDoc.exists()) {
                const data = userDoc.data();
                return {
                    ...data,
                    createdAt: data.createdAt?.toDate() || new Date(),
                    updatedAt: data.updatedAt?.toDate() || new Date(),
                    lastLoginAt: data.lastLoginAt?.toDate() || undefined,
                } as User;
            }
            return null;
        } catch (error) {
            console.error('Error getting user:', error);
            return null;
        }
    }

    // Get all users
    static async getAllUsers(): Promise<User[]> {
        try {
            const usersSnapshot = await getDocs(
                query(collection(db, 'users'), orderBy('createdAt', 'desc'))
            );
            return usersSnapshot.docs.map(doc => {
                const data = doc.data();
                return {
                    ...data,
                    createdAt: data.createdAt?.toDate() || new Date(),
                    updatedAt: data.updatedAt?.toDate() || new Date(),
                    lastLoginAt: data.lastLoginAt?.toDate() || undefined,
                } as User;
            });
        } catch (error) {
            console.error('Error getting users:', error);
            return [];
        }
    }

    // Update user permissions
    static async updateUserPermissions(uid: string, permissions: UserPermissions): Promise<void> {
        try {
            await updateDoc(doc(db, 'users', uid), {
                permissions,
                dashboardAccess: permissions, // Update dashboard access too
                updatedAt: new Date(),
            });
        } catch (error) {
            console.error('Error updating user permissions:', error);
            throw error;
        }
    }

    // Update user profile
    static async updateUserProfile(uid: string, profileData: Partial<User>): Promise<void> {
        try {
            await updateDoc(doc(db, 'users', uid), {
                ...profileData,
                updatedAt: new Date(),
            });
        } catch (error) {
            console.error('Error updating user profile:', error);
            throw error;
        }
    }

    // Deactivate user (soft delete)
    static async deactivateUser(uid: string): Promise<void> {
        try {
            await updateDoc(doc(db, 'users', uid), {
                isActive: false,
                updatedAt: new Date(),
            });
        } catch (error) {
            console.error('Error deactivating user:', error);
            throw error;
        }
    }

    // Update last login time
    static async updateLastLogin(uid: string): Promise<void> {
        try {
            await updateDoc(doc(db, 'users', uid), {
                lastLoginAt: new Date(),
                updatedAt: new Date(),
            });
        } catch (error) {
            console.error('Error updating last login:', error);
            // Don't throw error for this - it's not critical
        }
    }

    // Get users by email (for task manager dropdowns)
    static async getUserEmails(): Promise<string[]> {
        try {
            const usersSnapshot = await getDocs(
                query(
                    collection(db, 'users'),
                    where('isActive', '==', true),
                    orderBy('email')
                )
            );
            return usersSnapshot.docs.map(doc => doc.data().email);
        } catch (error) {
            console.error('Error getting user emails:', error);
            return [];
        }
    }
}