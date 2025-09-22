// src/components/admin/account-management/UserTable.tsx
import React from 'react';
import { useLanguage } from '../../../contexts/LanguageContext';
import { User, UserPermissions } from '../../../types/User';
import '../../../styles/admin/UserTable.css';

interface UserTableProps {
    users: User[];
    onUpdatePermissions: (uid: string, permissions: UserPermissions) => void;
    onDeactivateUser: (uid: string) => void;
    currentUserUid: string;
}

const UserTable: React.FC<UserTableProps> = ({
                                                 users,
                                                 onUpdatePermissions,
                                                 onDeactivateUser,
                                                 currentUserUid
                                             }) => {
    const { t } = useLanguage();

    const formatDate = (date: Date | undefined) => {
        if (!date) return '-';
        return date.toLocaleDateString();
    };

    const getStatusBadge = (isActive: boolean) => {
        return (
            <span className={`mika-user-status ${isActive ? 'active' : 'inactive'}`}>
                {isActive ? t('userStatus.active') : t('userStatus.inactive')}
            </span>
        );
    };

    const handlePermissionChange = (user: User, permissionKey: keyof UserPermissions, value: boolean) => {
        const updatedPermissions = {
            ...user.permissions,
            [permissionKey]: value
        };
        onUpdatePermissions(user.id, updatedPermissions);
    };

    if (users.length === 0) {
        return (
            <div className="mika-user-table-container">
                <div className="mika-user-table-empty">
                    <div className="mika-user-table-empty-icon">👥</div>
                    <h3>{t('userTable.noUsers')}</h3>
                    <p>{t('userTable.noUsersDescription')}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="mika-user-table-container">
            <div className="mika-user-table-wrapper">
                <table className="mika-user-table">
                    <thead className="mika-user-table-head">
                    <tr>
                        <th>{t('userTable.user')}</th>
                        <th>{t('userTable.role')}</th>
                        <th>{t('userTable.status')}</th>
                        <th>{t('userTable.permissions')}</th>
                        <th>{t('userTable.lastLogin')}</th>
                        <th>{t('userTable.actions')}</th>
                    </tr>
                    </thead>
                    <tbody className="mika-user-table-body">
                    {users.map((user) => (
                        <tr key={user.id} className="mika-user-table-row">
                            <td className="mika-user-info">
                                <div className="mika-user-info-content">
                                        <span className="mika-user-name">
                                            {user.profile.firstName} {user.profile.lastName}
                                        </span>
                                    <span className="mika-user-email">
                                            {user.email}
                                        </span>
                                </div>
                            </td>
                            <td className="mika-user-role">
                                    <span className={`mika-role-badge role-${user.profile.role}`}>
                                        {t(`userRole.${user.profile.role}`)}
                                    </span>
                            </td>
                            <td>
                                {getStatusBadge(user.isActive)}
                            </td>
                            <td className="mika-user-permissions">
                                <div className="mika-permissions-list">
                                    <label className="mika-permission-checkbox">
                                        <input
                                            type="checkbox"
                                            checked={user.permissions.taskManagement}
                                            onChange={(e) => handlePermissionChange(user, 'taskManagement', e.target.checked)}
                                            disabled={user.id === currentUserUid}
                                        />
                                        <span>{t('permission.taskManagement')}</span>
                                    </label>
                                    <label className="mika-permission-checkbox">
                                        <input
                                            type="checkbox"
                                            checked={user.permissions.financialManagement}
                                            onChange={(e) => handlePermissionChange(user, 'financialManagement', e.target.checked)}
                                            disabled={user.id === currentUserUid}
                                        />
                                        <span>{t('permission.financialManagement')}</span>
                                    </label>
                                    <label className="mika-permission-checkbox">
                                        <input
                                            type="checkbox"
                                            checked={user.permissions.guestManagement}
                                            onChange={(e) => handlePermissionChange(user, 'guestManagement', e.target.checked)}
                                            disabled={user.id === currentUserUid}
                                        />
                                        <span>{t('permission.guestManagement')}</span>
                                    </label>
                                    <label className="mika-permission-checkbox">
                                        <input
                                            type="checkbox"
                                            checked={user.permissions.accountManagement}
                                            onChange={(e) => handlePermissionChange(user, 'accountManagement', e.target.checked)}
                                            disabled={user.id === currentUserUid}
                                        />
                                        <span>{t('permission.accountManagement')}</span>
                                    </label>
                                </div>
                            </td>
                            <td className="mika-user-last-login">
                                {formatDate(user.lastLoginAt)}
                            </td>
                            <td className="mika-user-actions">
                                {user.id !== currentUserUid && user.isActive && (
                                    <button
                                        className="mika-action-button mika-action-deactivate"
                                        onClick={() => onDeactivateUser(user.id)}
                                        title={t('userTable.deactivate')}
                                    >
                                        🚫
                                    </button>
                                )}
                                {user.id === currentUserUid && (
                                    <span className="mika-current-user-badge">
                                            {t('userTable.currentUser')}
                                        </span>
                                )}
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default UserTable;