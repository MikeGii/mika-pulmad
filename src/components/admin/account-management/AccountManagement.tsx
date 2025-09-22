// src/components/admin/account-management/AccountManagement.tsx
import React, { useState, useEffect } from 'react';
import { collection, getDocs, doc, updateDoc } from 'firebase/firestore';
import { db } from '../../../firebase';
import Header from '../../common/Header';
import { User, UserPermissions, CreateUserData } from '../../../types';
import { UserService } from '../../../services/userService';
import { useLanguage } from '../../../contexts/LanguageContext';
import { useAuth } from '../../../contexts/AuthContext';
import UserForm from './UserForm';
import '../../../styles/admin/AccountManagement.css';

const AccountManagement: React.FC = () => {
    const { t } = useLanguage();
    const { currentUserProfile } = useAuth();
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);

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
                        financialManagement: data.permissions?.financialManagement || false,
                        guestManagement: data.permissions?.guestManagement || false,
                        ...data.permissions
                    },
                    dashboardAccess: {
                        accountManagement: data.dashboardAccess?.accountManagement || false,
                        taskManagement: data.dashboardAccess?.taskManagement || true,
                        financialManagement: data.dashboardAccess?.financialManagement || false,
                        guestManagement: data.dashboardAccess?.guestManagement || false,
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

    const handleCreateUser = async (userData: CreateUserData) => {
        try {
            await UserService.createUser(userData);
            setShowForm(false);
            fetchUsers();
        } catch (error) {
            console.error('Error creating user:', error);
        }
    };

    if (!currentUserProfile?.permissions.accountManagement) {
        return (
            <div className="dashboard-container">
                <Header />
                <div className="loading-container">
                    <p>Access denied. You don't have permission to manage accounts.</p>
                </div>
            </div>
        );
    }

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
                    <h2>{t('userManagement.title')}</h2>
                    <p>{t('userManagement.subtitle')}</p>
                    <button
                        className="mika-account-add-button"
                        onClick={() => setShowForm(true)}
                        style={{
                            background: 'linear-gradient(45deg, #a8c09a, #7fa070)',
                            color: 'white',
                            border: 'none',
                            borderRadius: '12px',
                            padding: '15px 30px',
                            fontSize: '16px',
                            fontWeight: '600',
                            cursor: 'pointer',
                            transition: 'all 0.3s ease',
                            textTransform: 'uppercase',
                            letterSpacing: '1px',
                            marginTop: '20px'
                        }}
                    >
                        {t('userManagement.addUser')}
                    </button>
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
                                        disabled={user.id === currentUserProfile?.id}
                                    />
                                    <span>{t('permission.taskManagement')}</span>
                                </label>

                                <label className="permission-item">
                                    <input
                                        type="checkbox"
                                        checked={user.permissions?.financialManagement || false}
                                        onChange={(e) => updateUserPermission(user.id, 'financialManagement', e.target.checked)}
                                        disabled={user.id === currentUserProfile?.id}
                                    />
                                    <span>{t('permission.financialManagement')}</span>
                                </label>

                                <label className="permission-item">
                                    <input
                                        type="checkbox"
                                        checked={user.permissions?.guestManagement || false}
                                        onChange={(e) => updateUserPermission(user.id, 'guestManagement', e.target.checked)}
                                        disabled={user.id === currentUserProfile?.id}
                                    />
                                    <span>{t('permission.guestManagement')}</span>
                                </label>

                                <label className="permission-item">
                                    <input
                                        type="checkbox"
                                        checked={user.permissions?.accountManagement || false}
                                        onChange={(e) => updateUserPermission(user.id, 'accountManagement', e.target.checked)}
                                        disabled={user.id === currentUserProfile?.id}
                                    />
                                    <span>{t('permission.accountManagement')}</span>
                                </label>
                            </div>
                        </div>
                    ))}

                    {users.length === 0 && (
                        <div className="no-users">
                            <p>{t('userTable.noUsers')}</p>
                        </div>
                    )}
                </div>

                {showForm && (
                    <UserForm
                        onSave={handleCreateUser}
                        onCancel={() => setShowForm(false)}
                    />
                )}
            </main>
        </div>
    );
};

export default AccountManagement;