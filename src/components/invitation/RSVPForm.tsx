// src/components/invitation/RSVPForm.tsx
import React, { useState } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { InvitationService } from '../../services/invitationService';
import { Guest } from '../../types/Guest';
import '../../styles/invitation/RSVPForm.css';

interface RSVPFormProps {
    invitationGetter: Guest;
    linkedGuests: Guest[];
    onSubmitted: () => void;
}

const RSVPForm: React.FC<RSVPFormProps> = ({ invitationGetter, linkedGuests, onSubmitted }) => {
    const { t } = useLanguage();
    const [formData, setFormData] = useState({
        attending: null as boolean | null,
        requiresAccommodation: false,
        needsTransport: false,
        transportType: '' as 'estonia' | 'ukraine' | '',
        transportLocation: '',
        hasDietaryRestrictions: false,
        dietaryNote: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showThankYou, setShowThankYou] = useState(false);

    const handleAttendingChange = (attending: boolean) => {
        setFormData(prev => ({
            ...prev,
            attending,
            // Reset other fields if not attending
            requiresAccommodation: attending ? prev.requiresAccommodation : false,
            needsTransport: attending ? prev.needsTransport : false,
            transportType: attending ? prev.transportType : '',
            transportLocation: attending ? prev.transportLocation : '',
            hasDietaryRestrictions: attending ? prev.hasDietaryRestrictions : false,
            dietaryNote: attending ? prev.dietaryNote : '',
        }));
    };

    const handleCheckboxChange = (field: 'requiresAccommodation' | 'needsTransport' | 'hasDietaryRestrictions') => {
        setFormData(prev => ({
            ...prev,
            [field]: !prev[field],
            // Clear transport details if unchecking transport
            transportType: field === 'needsTransport' && prev[field] ? '' : prev.transportType,
            transportLocation: field === 'needsTransport' && prev[field] ? '' : prev.transportLocation,
            // Clear dietary note if unchecking dietary restrictions
            dietaryNote: field === 'hasDietaryRestrictions' && prev[field] ? '' : prev.dietaryNote,
        }));
    };

    const handleTransportTypeChange = (type: 'estonia' | 'ukraine') => {
        setFormData(prev => ({
            ...prev,
            transportType: type,
            transportLocation: '', // Clear location when changing type
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (formData.attending === null) {
            alert(t('rsvp.pleaseSelectAttending'));
            return;
        }

        // Validate transport selection if needed
        if (formData.needsTransport && !formData.transportType) {
            alert(t('rsvp.pleaseSelectTransportType'));
            return;
        }

        setIsSubmitting(true);

        try {
            // Prepare transport details string
            let transportDetails = '';
            if (formData.needsTransport && formData.transportType) {
                transportDetails = formData.transportType === 'estonia' ?
                    `Estonia: ${formData.transportLocation || 'Not specified'}` :
                    `Ukraine: ${formData.transportLocation || 'Not specified'}`;
            }

            await InvitationService.submitRSVP(invitationGetter.id, {
                attending: formData.attending,
                requiresAccommodation: formData.requiresAccommodation,
                needsTransport: formData.needsTransport,
                transportDetails: transportDetails,
                hasDietaryRestrictions: formData.hasDietaryRestrictions,
                ...(formData.dietaryNote.trim() && { dietaryNote: formData.dietaryNote.trim() })
            });

            setShowThankYou(true);
            setTimeout(() => {
                onSubmitted();
            }, 3000);
        } catch (error) {
            console.error('Error submitting RSVP:', error);
            alert(t('rsvp.submissionError'));
        } finally {
            setIsSubmitting(false);
        }
    };

    const allInvitedGuests = [invitationGetter, ...linkedGuests];

    if (showThankYou) {
        return (
            <div className="mika-rsvp-thank-you">
                <div className="mika-rsvp-thank-you-content">
                    <div className="mika-rsvp-thank-you-icon">✓</div>
                    <h3>{t('rsvp.thankYou.title')}</h3>
                    <p>{t('rsvp.thankYou.message')}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="mika-rsvp-form-container">
            <div className="mika-rsvp-form-header">
                <h3>{t('rsvp.title')}</h3>
                <p className="mika-rsvp-form-subtitle">
                    {allInvitedGuests.length === 1
                        ? t('rsvp.forYou')
                        : t('rsvp.forYourGroup')}
                </p>
                <div className="mika-rsvp-guest-list">
                    {allInvitedGuests.map((guest) => (
                        <span key={guest.id} className="mika-rsvp-guest-name">
                            {guest.firstName} {guest.lastName}
                            {guest.isChild && (
                                <span className="mika-rsvp-child-indicator">
                                    {t('invitation.child')}
                                </span>
                            )}
                        </span>
                    ))}
                </div>
            </div>

            <form onSubmit={handleSubmit}>
                {/* Attending Question */}
                <div className="mika-rsvp-section">
                    <h4 className="mika-rsvp-question">{t('rsvp.questions.attending')}</h4>
                    <div className="mika-rsvp-options">
                        <label className={`mika-rsvp-option ${formData.attending === true ? 'selected' : ''}`}>
                            <input
                                type="radio"
                                name="attending"
                                checked={formData.attending === true}
                                onChange={() => handleAttendingChange(true)}
                            />
                            <span className="mika-rsvp-option-text">
                                <span className="mika-rsvp-option-icon">✅</span>
                                {t('rsvp.answers.yes')}
                            </span>
                        </label>
                        <label className={`mika-rsvp-option ${formData.attending === false ? 'selected' : ''}`}>
                            <input
                                type="radio"
                                name="attending"
                                checked={formData.attending === false}
                                onChange={() => handleAttendingChange(false)}
                            />
                            <span className="mika-rsvp-option-text">
                                <span className="mika-rsvp-option-icon">❌</span>
                                {t('rsvp.answers.no')}
                            </span>
                        </label>
                    </div>
                </div>

                {/* Additional Questions if Attending */}
                {formData.attending === true && (
                    <div className="mika-rsvp-additional-questions">
                        {/* Accommodation Question */}
                        <div className="mika-rsvp-section">
                            <h4 className="mika-rsvp-question">{t('rsvp.questions.accommodation')}</h4>
                            <label className="mika-rsvp-checkbox">
                                <input
                                    type="checkbox"
                                    checked={formData.requiresAccommodation}
                                    onChange={() => handleCheckboxChange('requiresAccommodation')}
                                />
                                <span className="mika-rsvp-checkbox-text">
                                    <span className="mika-rsvp-checkbox-icon">🏨</span>
                                    {t('rsvp.answers.needAccommodation')}
                                </span>
                            </label>
                        </div>

                        {/* Transport Question */}
                        <div className="mika-rsvp-section">
                            <h4 className="mika-rsvp-question">{t('rsvp.questions.transport')}</h4>
                            <label className="mika-rsvp-checkbox">
                                <input
                                    type="checkbox"
                                    checked={formData.needsTransport}
                                    onChange={() => handleCheckboxChange('needsTransport')}
                                />
                                <span className="mika-rsvp-checkbox-text">
                                    <span className="mika-rsvp-checkbox-icon">🚗</span>
                                    {t('rsvp.answers.needTransport')}
                                </span>
                            </label>

                            {/* Transport Type Options */}
                            {formData.needsTransport && (
                                <div className="mika-rsvp-transport-options">
                                    <div className="mika-rsvp-transport-type">
                                        <label className={`mika-rsvp-transport-option ${formData.transportType === 'estonia' ? 'selected' : ''}`}>
                                            <input
                                                type="radio"
                                                name="transportType"
                                                checked={formData.transportType === 'estonia'}
                                                onChange={() => handleTransportTypeChange('estonia')}
                                            />
                                            <span className="mika-rsvp-transport-option-text">
                                                <span className="mika-rsvp-flag">🇪🇪</span>
                                                {t('rsvp.transport.inEstonia')}
                                            </span>
                                        </label>
                                        <label className={`mika-rsvp-transport-option ${formData.transportType === 'ukraine' ? 'selected' : ''}`}>
                                            <input
                                                type="radio"
                                                name="transportType"
                                                checked={formData.transportType === 'ukraine'}
                                                onChange={() => handleTransportTypeChange('ukraine')}
                                            />
                                            <span className="mika-rsvp-transport-option-text">
                                                <span className="mika-rsvp-flag">🇺🇦</span>
                                                {t('rsvp.transport.fromUkraine')}
                                            </span>
                                        </label>
                                    </div>

                                    {/* Transport Location Field */}
                                    {formData.transportType && (
                                        <div className="mika-rsvp-transport-location">
                                            <input
                                                type="text"
                                                className="mika-rsvp-location-input"
                                                placeholder={formData.transportType === 'estonia' ?
                                                    t('rsvp.transport.estoniaPlaceholder') :
                                                    t('rsvp.transport.ukrainePlaceholder')}
                                                value={formData.transportLocation}
                                                onChange={(e) => setFormData(prev => ({
                                                    ...prev,
                                                    transportLocation: e.target.value
                                                }))}
                                                maxLength={100}
                                            />
                                            <span className="mika-rsvp-location-hint">
                                                {t('rsvp.transport.locationHint')}
                                            </span>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>

                        {/* Dietary Restrictions Question */}
                        <div className="mika-rsvp-section">
                            <h4 className="mika-rsvp-question">{t('rsvp.questions.dietary')}</h4>
                            <label className="mika-rsvp-checkbox">
                                <input
                                    type="checkbox"
                                    checked={formData.hasDietaryRestrictions}
                                    onChange={() => handleCheckboxChange('hasDietaryRestrictions')}
                                />
                                <span className="mika-rsvp-checkbox-text">
                                    <span className="mika-rsvp-checkbox-icon">🍽️</span>
                                    {t('rsvp.answers.hasDietary')}
                                </span>
                            </label>

                            {formData.hasDietaryRestrictions && (
                                <div className="mika-rsvp-dietary-note">
                                    <textarea
                                        className="mika-rsvp-textarea"
                                        placeholder={t('rsvp.questions.dietaryNote')}
                                        value={formData.dietaryNote}
                                        onChange={(e) => setFormData(prev => ({
                                            ...prev,
                                            dietaryNote: e.target.value
                                        }))}
                                        maxLength={200}
                                    />
                                    <span className="mika-rsvp-char-count">
                                        {formData.dietaryNote.length}/200
                                    </span>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* Declining Message */}
                {formData.attending === false && (
                    <div className="mika-rsvp-declining-message">
                        <p>{t('rsvp.decliningMessage')}</p>
                    </div>
                )}

                {/* Submit Button */}
                {formData.attending !== null && (
                    <div className="mika-rsvp-submit-section">
                        <button
                            type="submit"
                            className="mika-rsvp-submit-button"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? (
                                <>
                                    <span className="mika-rsvp-spinner"></span>
                                    {t('rsvp.submitting')}
                                </>
                            ) : (
                                t('rsvp.submit')
                            )}
                        </button>
                    </div>
                )}
            </form>
        </div>
    );
};

export default RSVPForm;