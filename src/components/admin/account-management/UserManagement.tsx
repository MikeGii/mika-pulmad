// src/components/admin/account-management/UserManagement.tsx
import React, { useState, useEffect } from 'react';
import { useLanguage } from '../../../contexts/LanguageContext';
import { useAuth } from '../../../contexts/AuthContext';
import { UserService } from '../../../services/userService';
import { User, CreateUserData, UserPermissions } from '../../../types/User';
import Header from '../../common/Header';
import UserForm from './UserForm';
import UserTable from './UserTable';
import '../../../styles/admin/UserManagement.css';

const UserManagement: React.FC = () => {
    const { t } = useLanguage();
    const { currentUserProfile } = useAuth();
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [editingUser, setEditingUser] = useState<User | null>(null);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const allUsers = await UserService.getAllUsers();
            setUsers(allUsers);
        } catch (error) {
            console.error('Error fetching users:', error);
        } finally {
            setLoading(false);
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

    const handleUpdatePermissions = async (uid: string, permissions: UserPermissions) => {
        try {
            await UserService.updateUserPermissions(uid, permissions);
            fetchUsers();
        } catch (error) {
            console.error('Error updating permissions:', error);
        }
    };

    const handleDeactivateUser = async (uid: string) => {
        if (window.confirm(t('userManagement.confirmDeactivate'))) {
            try {
                await UserService.deactivateUser(uid);
                fetchUsers();
            } catch (error) {
                console.error('Error deactivating user:', error);
            }
        }
    };

    // Only admin can access this
    if (!currentUserProfile?.permissions.accountManagement) {
        return (
            <div className="mika-user-management-container">
                <Header />
                <div className="mika-access-denied">
                    <h2>Access Denied</h2>
                    <p>You don't have permission to access user management.</p>
                </div>
            </div>
        );
    }

    if (loading) {
        return (
            <div className="mika-user-management-container">
                <Header />
                <div className="mika-user-loading">
                    <p>Loading users...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="mika-user-management-container">
            <Header />

            <main className="mika-user-management-content">
                <div className="mika-user-page-header">
                    <h2 className="mika-user-page-title">{t('userManagement.title')}</h2>
                    <p className="mika-user-page-subtitle">{t('userManagement.subtitle')}</p>
                    <button
                        className="mika-user-add-button"
                        onClick={() => setShowForm(true)}
                    >
                        {t('userManagement.addUser')}
                    </button>
                </div>

                <UserTable
                    users={users}
                    onUpdatePermissions={handleUpdatePermissions}
                    onDeactivateUser={handleDeactivateUser}
                    currentUserUid={currentUserProfile?.id || ''}
                />

                {showForm && (
                    <UserForm
                        user={editingUser}
                        onSave={handleCreateUser}
                        onCancel={() => {
                            setShowForm(false);
                            setEditingUser(null);
                        }}
                    />
                )}
            </main>
        </div>
    );
};

export default UserManagement;