// src/contexts/AuthContext.tsx
import React, { createContext, useContext, useEffect, useState } from 'react';
import { User as FirebaseUser, onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../firebase';
import { UserService } from '../services/userService';
import { User } from '../types';

interface AuthContextType {
    currentUser: FirebaseUser | null;
    currentUserProfile: User | null;
    loading: boolean;
    logout: () => Promise<void>;
    refreshUserProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within AuthProvider');
    }
    return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [currentUser, setCurrentUser] = useState<FirebaseUser | null>(null);
    const [currentUserProfile, setCurrentUserProfile] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    const logout = async () => {
        await signOut(auth);
        setCurrentUserProfile(null);
    };

    const refreshUserProfile = async () => {
        if (currentUser) {
            const userProfile = await UserService.getUser(currentUser.uid);
            setCurrentUserProfile(userProfile);
        }
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            setCurrentUser(user);

            if (user) {
                // Update last login time
                await UserService.updateLastLogin(user.uid);

                // Get user profile from Firestore
                const userProfile = await UserService.getUser(user.uid);
                setCurrentUserProfile(userProfile);
            } else {
                setCurrentUserProfile(null);
            }

            setLoading(false);
        });

        return unsubscribe;
    }, []);

    const value = {
        currentUser,
        currentUserProfile,
        loading,
        logout,
        refreshUserProfile
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};