// src/components/admin/guest-management/GuestForm.tsx
import React, { useState, useEffect } from 'react';
import { useLanguage } from '../../../contexts/LanguageContext';
import { Guest, GuestFormData } from '../../../types/Guest';
import '../../../styles/admin/GuestForm.css';

interface GuestFormProps {
    guest?: Guest | null;
    onSave: (guestData: GuestFormData) => void;
    onCancel: () => void;
}

const GuestForm: React.FC<GuestFormProps> = ({ guest, onSave, onCancel }) => {
    const { t } = useLanguage();
    const [formData, setFormData] = useState<GuestFormData>({
        firstName: '',
        lastName: '',
        phoneNumber: '',
        email: '',
        location: '',
        tableNumber: '',
        isChild: false,
    });

    useEffect(() => {
        if (guest) {
            setFormData({
                firstName: guest.firstName,
                lastName: guest.lastName,
                phoneNumber: guest.phoneNumber || '',
                email: guest.email || '',
                location: guest.location || '',
                tableNumber: guest.tableNumber,
                isChild: guest.isChild,
            });
        }
    }, [guest]);

    const handleInputChange = (field: keyof GuestFormData, value: string | number | boolean) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Basic validation
        if (!formData.firstName.trim() || !formData.lastName.trim()) {
            alert(t('guestForm.requiredFields'));
            return;
        }

        if (formData.tableNumber === '' || formData.tableNumber < 1) {
            alert(t('guestForm.validTableNumber'));
            return;
        }

        // Email validation if provided
        if (formData.email && !isValidEmail(formData.email)) {
            alert(t('guestForm.validEmail'));
            return;
        }

        onSave(formData);
    };

    const isValidEmail = (email: string): boolean => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    return (
        <div className="mika-guest-form-overlay">
            <div className="mika-guest-form-container">
                <form onSubmit={handleSubmit} className="mika-guest-form">
                    <div className="mika-guest-form-header">
                        <h3>{guest ? t('guestManagement.editGuest') : t('guestManagement.addGuest')}</h3>
                    </div>

                    <div className="mika-guest-form-body">
                        {/* Important notice about children */}
                        <div className="mika-guest-child-notice">
                            <div className="mika-guest-child-notice-icon">⚠️</div>
                            <div className="mika-guest-child-notice-text">
                                {t('guestForm.childrenNotice')}
                            </div>
                        </div>

                        {/* First Name and Last Name */}
                        <div className="mika-form-row">
                            <div className="mika-form-group mika-form-group-half">
                                <label className="mika-form-label">
                                    {t('guestForm.firstName')} *
                                </label>
                                <input
                                    type="text"
                                    className="mika-form-input"
                                    placeholder={t('guestForm.firstNamePlaceholder')}
                                    value={formData.firstName}
                                    onChange={(e) => handleInputChange('firstName', e.target.value)}
                                    required
                                />
                            </div>
                            <div className="mika-form-group mika-form-group-half">
                                <label className="mika-form-label">
                                    {t('guestForm.lastName')} *
                                </label>
                                <input
                                    type="text"
                                    className="mika-form-input"
                                    placeholder={t('guestForm.lastNamePlaceholder')}
                                    value={formData.lastName}
                                    onChange={(e) => handleInputChange('lastName', e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        {/* Phone Number */}
                        <div className="mika-form-group">
                            <label className="mika-form-label">
                                {t('guestForm.phoneNumber')}
                            </label>
                            <input
                                type="tel"
                                className="mika-form-input"
                                placeholder={t('guestForm.phoneNumberPlaceholder')}
                                value={formData.phoneNumber}
                                onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                            />
                        </div>

                        {/* Email */}
                        <div className="mika-form-group">
                            <label className="mika-form-label">
                                {t('guestForm.email')}
                            </label>
                            <input
                                type="email"
                                className="mika-form-input"
                                placeholder={t('guestForm.emailPlaceholder')}
                                value={formData.email}
                                onChange={(e) => handleInputChange('email', e.target.value)}
                            />
                        </div>

                        {/* Location */}
                        <div className="mika-form-group">
                            <label className="mika-form-label">
                                {t('guestForm.location')}
                            </label>
                            <input
                                type="text"
                                className="mika-form-input"
                                placeholder={t('guestForm.locationPlaceholder')}
                                value={formData.location}
                                onChange={(e) => handleInputChange('location', e.target.value)}
                            />
                        </div>

                        {/* Table Number */}
                        <div className="mika-form-group">
                            <label className="mika-form-label">
                                {t('guestForm.tableNumber')} *
                            </label>
                            <input
                                type="number"
                                min="1"
                                className="mika-form-input"
                                placeholder={t('guestForm.tableNumberPlaceholder')}
                                value={formData.tableNumber}
                                onChange={(e) => handleInputChange('tableNumber', Number(e.target.value))}
                                required
                            />
                        </div>

                        {/* Child checkbox */}
                        <div className="mika-child-checkbox-group">
                            <label className="mika-child-checkbox">
                                <input
                                    type="checkbox"
                                    checked={formData.isChild}
                                    onChange={(e) => handleInputChange('isChild', e.target.checked)}
                                />
                                <span>{t('guestForm.isChild')}</span>
                            </label>
                        </div>
                    </div>

                    <div className="mika-guest-form-footer">
                        <button
                            type="button"
                            className="mika-form-button mika-form-button-cancel"
                            onClick={onCancel}
                        >
                            {t('guestForm.cancel')}
                        </button>
                        <button
                            type="submit"
                            className="mika-form-button mika-form-button-save"
                        >
                            {t('guestForm.save')}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default GuestForm;