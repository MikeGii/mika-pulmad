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
            hasDietaryRestrictions: attending ? prev.hasDietaryRestrictions : false,
            dietaryNote: attending ? prev.dietaryNote : '',
        }));
    };

    const handleCheckboxChange = (field: 'requiresAccommodation' | 'needsTransport' | 'hasDietaryRestrictions') => {
        setFormData(prev => ({
            ...prev,
            [field]: !prev[field],
            // Clear dietary note if unchecking dietary restrictions
            dietaryNote: field === 'hasDietaryRestrictions' && prev[field] ? '' : prev.dietaryNote,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (formData.attending === null) {
            alert(t('rsvp.pleaseSelectAttending'));
            return;
        }

        setIsSubmitting(true);

        try {
            await InvitationService.submitRSVP(invitationGetter.id, {
                attending: formData.attending,
                requiresAccommodation: formData.requiresAccommodation,
                needsTransport: formData.needsTransport,
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
                        : `${t('rsvp.forYourGroup')} (${allInvitedGuests.length})`
                    }
                </p>
                <div className="mika-rsvp-guest-list">
                    {allInvitedGuests.map((guest, index) => (
                        <span key={guest.id} className="mika-rsvp-guest-name">
                            {guest.firstName} {guest.lastName}
                            {guest.isChild && <span className="mika-rsvp-child-indicator">({t('invitation.child')})</span>}
                        </span>
                    ))}
                </div>
            </div>

            <form onSubmit={handleSubmit} className="mika-rsvp-form">
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
                                <span className="mika-rsvp-option-icon">🎉</span>
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
                                <span className="mika-rsvp-option-icon">😔</span>
                                {t('rsvp.answers.no')}
                            </span>
                        </label>
                    </div>
                </div>

                {/* Additional Questions - Only show if attending */}
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

                            {/* Dietary Note - Only show if dietary restrictions checked */}
                            {formData.hasDietaryRestrictions && (
                                <div className="mika-rsvp-dietary-note">
                                    <textarea
                                        className="mika-rsvp-textarea"
                                        placeholder={t('rsvp.questions.dietaryNote')}
                                        value={formData.dietaryNote}
                                        onChange={(e) => setFormData(prev => ({ ...prev, dietaryNote: e.target.value }))}
                                        rows={3}
                                        maxLength={200}
                                    />
                                    <div className="mika-rsvp-char-count">
                                        {formData.dietaryNote.length}/200
                                    </div>
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
                <div className="mika-rsvp-submit-section">
                    <button
                        type="submit"
                        className="mika-rsvp-submit-button"
                        disabled={formData.attending === null || isSubmitting}
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
            </form>
        </div>
    );
};

export default RSVPForm;