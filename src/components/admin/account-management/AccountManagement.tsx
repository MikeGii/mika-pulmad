// src/components/admin/account-management/AccountManagement.tsx
import React, { useState, useEffect } from 'react';
import { collection, getDocs, doc, updateDoc } from 'firebase/firestore';
import { db } from '../../../firebase';
import Header from '../../common/Header';
import { User, UserPermissions } from '../../../types';
import '../../../styles/admin/AccountManagement.css';

const AccountManagement: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const usersSnapshot = await getDocs(collection(db, 'users'));
            const usersData = usersSnapshot.docs.map(doc => {
                const data = doc.data();
                return {
                    id: doc.id,
                    email: data.email,
                    profile: data.profile || {
                        firstName: 'Unknown',
                        lastName: 'User',
                        displayName: data.email,
                        role: 'planner'
                    },
                    permissions: {
                        accountManagement: data.permissions?.accountManagement || false,
                        taskManagement: data.permissions?.taskManagement || true,
                        ...data.permissions
                    },
                    dashboardAccess: {
                        accountManagement: data.dashboardAccess?.accountManagement || false,
                        taskManagement: data.dashboardAccess?.taskManagement || true,
                        ...data.dashboardAccess
                    },
                    isActive: data.isActive ?? true,
                    createdAt: data.createdAt?.toDate() || new Date(),
                    updatedAt: data.updatedAt?.toDate() || new Date(),
                    lastLoginAt: data.lastLoginAt?.toDate()
                } as User;
            });
            setUsers(usersData);
        } catch (error) {
            console.error('Error fetching users:', error);
        } finally {
            setLoading(false);
        }
    };

    const updateUserPermission = async (userId: string, permissionType: keyof UserPermissions, value: boolean) => {
        try {
            const user = users.find(u => u.id === userId);
            if (!user) return;

            const updatedPermissions = {
                ...user.permissions,
                [permissionType]: value
            };

            await updateDoc(doc(db, 'users', userId), {
                permissions: updatedPermissions,
                dashboardAccess: updatedPermissions,
                updatedAt: new Date(),
            });

            setUsers(users.map(u =>
                u.id === userId
                    ? {
                        ...u,
                        permissions: updatedPermissions,
                        dashboardAccess: updatedPermissions
                    }
                    : u
            ));
        } catch (error) {
            console.error('Error updating user permission:', error);
        }
    };

    if (loading) {
        return (
            <div className="dashboard-container">
                <Header />
                <div className="loading-container">
                    <p>Loading users...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="dashboard-container">
            <Header />

            <main className="account-management-content">
                <div className="page-header">
                    <h2>Account Management</h2>
                    <p>Manage user account access and permissions</p>
                </div>

                <div className="users-container">
                    {users.map(user => (
                        <div key={user.id} className="user-card">
                            <div className="user-info">
                                <h3>{user.email}</h3>
                                {user.profile && (
                                    <p>{user.profile.firstName} {user.profile.lastName}</p>
                                )}
                                <span className="user-role">
                                    {user.profile?.role || 'planner'}
                                </span>
                            </div>

                            <div className="permissions-section">
                                <label className="permission-item">
                                    <input
                                        type="checkbox"
                                        checked={user.permissions?.taskManagement || false}
                                        onChange={(e) => updateUserPermission(user.id, 'taskManagement', e.target.checked)}
                                    />
                                    <span>Task Management Access</span>
                                </label>

                                <label className="permission-item">
                                    <input
                                        type="checkbox"
                                        checked={user.permissions?.accountManagement || false}
                                        onChange={(e) => updateUserPermission(user.id, 'accountManagement', e.target.checked)}
                                    />
                                    <span>Account Management Access</span>
                                </label>
                            </div>
                        </div>
                    ))}

                    {users.length === 0 && (
                        <div className="no-users">
                            <p>No users found. Create users through the User Management system.</p>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};

export default AccountManagement;