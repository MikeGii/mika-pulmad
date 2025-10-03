// src/components/invitation/RSVPForm.tsx
import React, { useState, useEffect } from 'react';
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
    const allInvitedGuests = [invitationGetter, ...linkedGuests];

    // Check if there's an existing RSVP
    const hasExistingRsvp = invitationGetter.rsvpStatus !== 'pending';
    const existingAttendingIds = invitationGetter.rsvpResponses?.attendingGuestIds || [];

    const [formData, setFormData] = useState({
        attendingGuestIds: hasExistingRsvp ? existingAttendingIds : allInvitedGuests.map(g => g.id),
        requiresAccommodation: invitationGetter.rsvpResponses?.requiresAccommodation || false,
        needsTransport: invitationGetter.rsvpResponses?.needsTransport || false,
        transportType: '' as 'estonia' | 'ukraine' | '',
        transportLocation: invitationGetter.rsvpResponses?.transportDetails || '',
        hasDietaryRestrictions: invitationGetter.rsvpResponses?.hasDietaryRestrictions || false,
        dietaryNote: invitationGetter.rsvpResponses?.dietaryNote || '',
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showThankYou, setShowThankYou] = useState(false);
    const [isEditing, setIsEditing] = useState(!hasExistingRsvp);

    // Parse transport details if they exist
    useEffect(() => {
        if (invitationGetter.rsvpResponses?.transportDetails) {
            const parts = invitationGetter.rsvpResponses.transportDetails.split(':');
            if (parts.length === 2) {
                setFormData(prev => ({
                    ...prev,
                    transportType: parts[0] as 'estonia' | 'ukraine',
                    transportLocation: parts[1]
                }));
            }
        }
    }, [invitationGetter.rsvpResponses?.transportDetails]);

    const handleGuestToggle = (guestId: string) => {
        setFormData(prev => ({
            ...prev,
            attendingGuestIds: prev.attendingGuestIds.includes(guestId)
                ? prev.attendingGuestIds.filter(id => id !== guestId)
                : [...prev.attendingGuestIds, guestId]
        }));
    };

    const handleCheckboxChange = (field: 'requiresAccommodation' | 'needsTransport' | 'hasDietaryRestrictions') => {
        setFormData(prev => ({
            ...prev,
            [field]: !prev[field],
            transportType: field === 'needsTransport' && prev[field] ? '' : prev.transportType,
            transportLocation: field === 'needsTransport' && prev[field] ? '' : prev.transportLocation,
            dietaryNote: field === 'hasDietaryRestrictions' && prev[field] ? '' : prev.dietaryNote,
        }));
    };

    const handleTransportTypeChange = (type: 'estonia' | 'ukraine') => {
        setFormData(prev => ({
            ...prev,
            transportType: type,
            transportLocation: '',
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (formData.attendingGuestIds.length === 0) {
            alert(t('rsvp.pleaseSelectAtLeastOneGuest'));
            return;
        }

        if (formData.needsTransport && !formData.transportType) {
            alert(t('rsvp.pleaseSelectTransportType'));
            return;
        }

        setIsSubmitting(true);

        try {
            // Build transport details string
            const transportDetails = formData.needsTransport && formData.transportType
                ? `${formData.transportType}:${formData.transportLocation}`
                : undefined;

            await InvitationService.submitRSVP(invitationGetter.id, {
                attendingGuestIds: formData.attendingGuestIds,
                attending: formData.attendingGuestIds.length > 0,
                requiresAccommodation: formData.requiresAccommodation,
                needsTransport: formData.needsTransport,
                transportDetails: transportDetails,
                hasDietaryRestrictions: formData.hasDietaryRestrictions,
                dietaryNote: formData.dietaryNote || undefined,
            });

            setShowThankYou(true);
            setIsEditing(false);
            setTimeout(() => {
                onSubmitted();
            }, 3000);
        } catch (error) {
            console.error('Error submitting RSVP:', error);
            alert(t('rsvp.errorSubmitting'));
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleEdit = () => {
        setIsEditing(true);
        setShowThankYou(false);
    };

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

    // Show summary view if already responded and not editing
    if (hasExistingRsvp && !isEditing) {
        const attendingGuests = allInvitedGuests.filter(g => existingAttendingIds.includes(g.id));
        const notAttendingGuests = allInvitedGuests.filter(g => !existingAttendingIds.includes(g.id));

        return (
            <div className="mika-rsvp-form-container">
                <div className="mika-rsvp-form-header">
                    <h3>{t('rsvp.yourResponse')}</h3>
                    <p className="mika-rsvp-form-subtitle">{t('rsvp.submittedOn')}: {invitationGetter.rsvpSubmittedAt?.toLocaleDateString()}</p>
                </div>

                <div className="mika-rsvp-summary">
                    {attendingGuests.length > 0 && (
                        <div className="mika-rsvp-summary-section">
                            <h4 className="mika-rsvp-summary-title">{t('rsvp.attending')}:</h4>
                            <div className="mika-rsvp-guest-list">
                                {attendingGuests.map(guest => (
                                    <span key={guest.id} className="mika-rsvp-guest-name mika-rsvp-guest-attending">
                                        ✓ {guest.firstName} {guest.lastName}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}

                    {notAttendingGuests.length > 0 && (
                        <div className="mika-rsvp-summary-section">
                            <h4 className="mika-rsvp-summary-title">{t('rsvp.notAttending')}:</h4>
                            <div className="mika-rsvp-guest-list">
                                {notAttendingGuests.map(guest => (
                                    <span key={guest.id} className="mika-rsvp-guest-name mika-rsvp-guest-not-attending">
                                        ✗ {guest.firstName} {guest.lastName}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}

                    {attendingGuests.length > 0 && (
                        <div className="mika-rsvp-summary-details">
                            {formData.requiresAccommodation && (
                                <div className="mika-rsvp-summary-item">
                                    <span className="mika-rsvp-summary-icon">🏨</span>
                                    {t('rsvp.answers.needAccommodation')}
                                </div>
                            )}
                            {formData.needsTransport && (
                                <div className="mika-rsvp-summary-item">
                                    <span className="mika-rsvp-summary-icon">🚗</span>
                                    {t('rsvp.answers.needTransport')}
                                </div>
                            )}
                            {formData.hasDietaryRestrictions && (
                                <div className="mika-rsvp-summary-item">
                                    <span className="mika-rsvp-summary-icon">🍽️</span>
                                    {t('rsvp.answers.hasDietary')}
                                    {formData.dietaryNote && <p className="mika-rsvp-summary-note">{formData.dietaryNote}</p>}
                                </div>
                            )}
                        </div>
                    )}
                </div>

                <div className="mika-rsvp-edit-section">
                    <button onClick={handleEdit} className="mika-rsvp-edit-button">
                        {t('rsvp.editResponse')}
                    </button>
                </div>
            </div>
        );
    }

    // Show form for editing/initial submission
    const isAnyoneAttending = formData.attendingGuestIds.length > 0;

    return (
        <div className="mika-rsvp-form-container">
            <div className="mika-rsvp-form-header">
                <h3>{hasExistingRsvp ? t('rsvp.editYourResponse') : t('rsvp.title')}</h3>
                <p className="mika-rsvp-form-subtitle">
                    {allInvitedGuests.length === 1
                        ? t('rsvp.forYou')
                        : t('rsvp.selectWhoIsAttending')}
                </p>
            </div>

            <form onSubmit={handleSubmit}>
                {/* Guest Selection Section */}
                <div className="mika-rsvp-section">
                    <h4 className="mika-rsvp-question">{t('rsvp.questions.whoIsAttending')}</h4>
                    <div className="mika-rsvp-guest-selection">
                        {allInvitedGuests.map((guest) => (
                            <label
                                key={guest.id}
                                className={`mika-rsvp-guest-checkbox ${formData.attendingGuestIds.includes(guest.id) ? 'selected' : ''}`}
                            >
                                <input
                                    type="checkbox"
                                    checked={formData.attendingGuestIds.includes(guest.id)}
                                    onChange={() => handleGuestToggle(guest.id)}
                                />
                                <span className="mika-rsvp-guest-checkbox-text">
                                    <span className="mika-rsvp-guest-checkbox-name">
                                        {guest.firstName} {guest.lastName}
                                    </span>
                                </span>
                            </label>
                        ))}
                    </div>
                </div>

                {/* Additional Questions if Anyone Attending */}
                {isAnyoneAttending && (
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

                            {formData.needsTransport && (
                                <div className="mika-rsvp-transport-details">
                                    <div className="mika-rsvp-transport-type">
                                        <label className={`mika-rsvp-option ${formData.transportType === 'estonia' ? 'selected' : ''}`}>
                                            <input
                                                type="radio"
                                                name="transportType"
                                                checked={formData.transportType === 'estonia'}
                                                onChange={() => handleTransportTypeChange('estonia')}
                                            />
                                            <span className="mika-rsvp-option-text">
                                                {t('rsvp.transport.fromEstonia')}
                                            </span>
                                        </label>
                                        <label className={`mika-rsvp-option ${formData.transportType === 'ukraine' ? 'selected' : ''}`}>
                                            <input
                                                type="radio"
                                                name="transportType"
                                                checked={formData.transportType === 'ukraine'}
                                                onChange={() => handleTransportTypeChange('ukraine')}
                                            />
                                            <span className="mika-rsvp-option-text">
                                                {t('rsvp.transport.fromUkraine')}
                                            </span>
                                        </label>
                                    </div>

                                    {formData.transportType && (
                                        <input
                                            type="text"
                                            className="mika-rsvp-input"
                                            placeholder={t('rsvp.transport.locationPlaceholder')}
                                            value={formData.transportLocation}
                                            onChange={(e) => setFormData(prev => ({
                                                ...prev,
                                                transportLocation: e.target.value
                                            }))}
                                        />
                                    )}
                                </div>
                            )}
                        </div>

                        {/* Dietary Restrictions */}
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
                {!isAnyoneAttending && (
                    <div className="mika-rsvp-declining-message">
                        <p>{t('rsvp.nobodyAttending')}</p>
                    </div>
                )}

                {/* Submit Button */}
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
                            hasExistingRsvp ? t('rsvp.updateResponse') : t('rsvp.submit')
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default RSVPForm;