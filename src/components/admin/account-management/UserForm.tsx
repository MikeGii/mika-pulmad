// src/components/admin/account-management/UserForm.tsx
import React, { useState } from 'react';
import { useLanguage } from '../../../contexts/LanguageContext';
import { CreateUserData } from '../../../types/User';
import '../../../styles/admin/UserForm.css';

interface UserFormProps {
    user?: any;
    onSave: (userData: CreateUserData) => void;
    onCancel: () => void;
}

const UserForm: React.FC<UserFormProps> = ({ user, onSave, onCancel }) => {
    const { t } = useLanguage();
    const [formData, setFormData] = useState<CreateUserData>({
        email: '',
        password: 'TempPassword123!',
        profile: {
            firstName: '',
            lastName: '',
            displayName: '',
            phone: '',
            role: 'planner'
        },
        permissions: {
            accountManagement: false,
            taskManagement: true,
            financialManagement: false,
            guestManagement: false,
        }
    });

    const handleInputChange = (field: string, value: any) => {
        if (field.startsWith('profile.')) {
            const profileField = field.split('.')[1];
            setFormData(prev => ({
                ...prev,
                profile: {
                    ...prev.profile,
                    [profileField]: value
                }
            }));
        } else if (field.startsWith('permissions.')) {
            const permissionField = field.split('.')[1];
            setFormData(prev => ({
                ...prev,
                permissions: {
                    ...prev.permissions,
                    [permissionField]: value
                }
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                [field]: value
            }));
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(formData);
    };

    return (
        <div className="mika-user-form-overlay">
            <div className="mika-user-form-container">
                <form onSubmit={handleSubmit} className="mika-user-form">
                    <div className="mika-user-form-header">
                        <h3>{t('userManagement.addUser')}</h3>
                    </div>

                    <div className="mika-user-form-body">
                        {/* Email */}
                        <div className="mika-form-group">
                            <label className="mika-form-label">
                                {t('userForm.email')} *
                            </label>
                            <input
                                type="email"
                                className="mika-form-input"
                                placeholder={t('userForm.emailPlaceholder')}
                                value={formData.email}
                                onChange={(e) => handleInputChange('email', e.target.value)}
                                required
                            />
                        </div>

                        {/* Name Fields */}
                        <div className="mika-form-row">
                            <div className="mika-form-group mika-form-group-half">
                                <label className="mika-form-label">
                                    {t('userForm.firstName')} *
                                </label>
                                <input
                                    type="text"
                                    className="mika-form-input"
                                    placeholder={t('userForm.firstNamePlaceholder')}
                                    value={formData.profile.firstName}
                                    onChange={(e) => handleInputChange('profile.firstName', e.target.value)}
                                    required
                                />
                            </div>
                            <div className="mika-form-group mika-form-group-half">
                                <label className="mika-form-label">
                                    {t('userForm.lastName')} *
                                </label>
                                <input
                                    type="text"
                                    className="mika-form-input"
                                    placeholder={t('userForm.lastNamePlaceholder')}
                                    value={formData.profile.lastName}
                                    onChange={(e) => handleInputChange('profile.lastName', e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        {/* Role */}
                        <div className="mika-form-group">
                            <label className="mika-form-label">
                                {t('userForm.role')} *
                            </label>
                            <select
                                className="mika-form-select"
                                value={formData.profile.role}
                                onChange={(e) => handleInputChange('profile.role', e.target.value)}
                                required
                            >
                                <option value="admin">{t('userRole.admin')}</option>
                                <option value="planner">{t('userRole.planner')}</option>
                                <option value="coordinator">{t('userRole.coordinator')}</option>
                            </select>
                        </div>

                        {/* Phone */}
                        <div className="mika-form-group">
                            <label className="mika-form-label">
                                {t('userForm.phone')}
                            </label>
                            <input
                                type="tel"
                                className="mika-form-input"
                                placeholder={t('userForm.phonePlaceholder')}
                                value={formData.profile.phone}
                                onChange={(e) => handleInputChange('profile.phone', e.target.value)}
                            />
                        </div>

                        {/* Permissions */}
                        <div className="mika-form-group">
                            <label className="mika-form-label">
                                {t('userForm.permissions')}
                            </label>
                            <div className="mika-permissions-list">
                                <label className="mika-permission-item">
                                    <input
                                        type="checkbox"
                                        checked={formData.permissions.taskManagement}
                                        onChange={(e) => handleInputChange('permissions.taskManagement', e.target.checked)}
                                    />
                                    <span>{t('permission.taskManagement')}</span>
                                </label>
                                <label className="mika-permission-item">
                                    <input
                                        type="checkbox"
                                        checked={formData.permissions.financialManagement}
                                        onChange={(e) => handleInputChange('permissions.financialManagement', e.target.checked)}
                                    />
                                    <span>{t('permission.financialManagement')}</span>
                                </label>
                                <label className="mika-permission-item">
                                    <input
                                        type="checkbox"
                                        checked={formData.permissions.guestManagement}
                                        onChange={(e) => handleInputChange('permissions.guestManagement', e.target.checked)}
                                    />
                                    <span>{t('permission.guestManagement')}</span>
                                </label>
                                <label className="mika-permission-item">
                                    <input
                                        type="checkbox"
                                        checked={formData.permissions.accountManagement}
                                        onChange={(e) => handleInputChange('permissions.accountManagement', e.target.checked)}
                                    />
                                    <span>{t('permission.accountManagement')}</span>
                                </label>
                            </div>
                        </div>
                    </div>

                    <div className="mika-user-form-footer">
                        <button
                            type="button"
                            className="mika-form-button mika-form-button-cancel"
                            onClick={onCancel}
                        >
                            {t('userForm.cancel')}
                        </button>
                        <button
                            type="submit"
                            className="mika-form-button mika-form-button-save"
                        >
                            {t('userForm.save')}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UserForm;