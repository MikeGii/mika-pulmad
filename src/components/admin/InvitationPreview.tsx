// src/components/admin/InvitationPreview.tsx
import React, { useState } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import Header from '../common/Header';
import InvitationPreviewWrapper, { createMockData } from './InvitationPreviewWrapper';
import '../../styles/admin/InvitationPreview.css';

type PreviewMode = 'single' | 'couple' | 'family' | 'group';

const InvitationPreview: React.FC = () => {
    const { t } = useLanguage();
    const [previewMode, setPreviewMode] = useState<PreviewMode>('single');
    const [invitationLanguage, setInvitationLanguage] = useState<'et' | 'ua'>('et');
    const [resetKey, setResetKey] = useState(0);

    const handleReset = () => {
        setResetKey(prev => prev + 1);
    };

    const handleModeChange = (mode: PreviewMode) => {
        setPreviewMode(mode);
        setResetKey(prev => prev + 1); // Reset when mode changes
    };

    const handleLanguageChange = (language: 'et' | 'ua') => {
        setInvitationLanguage(language);
        setResetKey(prev => prev + 1); // Reset when language changes
    };

    const currentMockData = createMockData(previewMode, invitationLanguage);

    return (
        <div className="mika-invitation-preview-container">
            <Header />

            <div className="mika-invitation-preview-content">
                {/* Page Header */}
                <div className="mika-invitation-preview-page-header">
                    <h2 className="mika-invitation-preview-page-title">
                        {t('invitationPreview.title')}
                    </h2>
                    <p className="mika-invitation-preview-page-subtitle">
                        {t('invitationPreview.subtitle')}
                    </p>

                    {/* Controls */}
                    <div className="mika-invitation-preview-controls">
                        <div className="mika-preview-control-group">
                            <label className="mika-preview-control-label">
                                {t('invitationPreview.previewMode')}:
                            </label>
                            <select
                                value={previewMode}
                                onChange={(e) => handleModeChange(e.target.value as PreviewMode)}
                                className="mika-preview-select"
                            >
                                <option value="single">{t('invitationPreview.single')}</option>
                                <option value="couple">{t('invitationPreview.couple')}</option>
                                <option value="family">{t('invitationPreview.family')}</option>
                                <option value="group">{t('invitationPreview.group')}</option>
                            </select>
                        </div>

                        <div className="mika-preview-control-group">
                            <label className="mika-preview-control-label">
                                {t('invitationPreview.invitationLanguage')}:
                            </label>
                            <select
                                value={invitationLanguage}
                                onChange={(e) => handleLanguageChange(e.target.value as 'et' | 'ua')}
                                className="mika-preview-select"
                            >
                                <option value="et">Eesti</option>
                                <option value="ua">Українська</option>
                            </select>
                        </div>

                        <div className="mika-preview-control-group">
                            <button
                                onClick={handleReset}
                                className="mika-preview-reset-button"
                            >
                                {t('invitationPreview.resetInvitation')}
                            </button>
                        </div>
                    </div>

                    <div className="mika-preview-notice">
                        {t('invitationPreview.mockDataNotice')}
                    </div>
                </div>

                {/* Invitation Preview */}
                <div className="mika-invitation-preview-wrapper">
                    <InvitationPreviewWrapper
                        mockData={currentMockData}
                        resetKey={resetKey}
                    />
                </div>
            </div>
        </div>
    );
};

export default InvitationPreview;