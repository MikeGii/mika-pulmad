// src/components/admin/AccountManagement.tsx
import React, { useState, useEffect } from 'react';
import { collection, getDocs, doc, updateDoc } from 'firebase/firestore';
import { db } from '../../../firebase';
import Header from '../../common/Header';
import { User } from '../../../types';
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
            const usersData = usersSnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            })) as User[];
            setUsers(usersData);
        } catch (error) {
            console.error('Error fetching users:', error);
        } finally {
            setLoading(false);
        }
    };

    const updateUserPermission = async (userId: string, value: boolean) => {
        try {
            await updateDoc(doc(db, 'users', userId), {
                'permissions.accountManagement': value,
                'dashboardAccess.accountManagement': value
            });

            setUsers(users.map(user =>
                user.id === userId
                    ? {
                        ...user,
                        permissions: { accountManagement: value },
                        dashboardAccess: { accountManagement: value }
                    }
                    : user
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
                    <p>Manage user account access</p>
                </div>

                <div className="users-container">
                    {users.map(user => (
                        <div key={user.id} className="user-card">
                            <div className="user-info">
                                <h3>{user.email}</h3>
                            </div>

                            <div className="permissions-section">
                                <label className="permission-item">
                                    <input
                                        type="checkbox"
                                        checked={user.permissions?.accountManagement || false}
                                        onChange={(e) => updateUserPermission(user.id, e.target.checked)}
                                    />
                                    <span>Account Management Access</span>
                                </label>
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
};

export default AccountManagement;