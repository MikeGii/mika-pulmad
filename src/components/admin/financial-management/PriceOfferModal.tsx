// src/components/admin/financial-management/PriceOfferModal.tsx
import React, { useState } from 'react';
import { useLanguage } from '../../../contexts/LanguageContext';
import { Task, PriceOffer, TaskContent } from '../../../types';

interface PriceOfferModalProps {
    task: Task;
    onSave: (offer: PriceOffer) => void;
    onCancel: () => void;
    getLocalizedContent: (content: TaskContent | string) => string;
}

const PriceOfferModal: React.FC<PriceOfferModalProps> = ({
                                                             task,
                                                             onSave,
                                                             onCancel,
                                                             getLocalizedContent
                                                         }) => {
    const { t } = useLanguage();
    const [formData, setFormData] = useState<PriceOffer>({
        company: '',
        amount: 0,
        notes: ''
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (formData.company && formData.amount > 0) {
            onSave(formData);
        }
    };

    const handleInputChange = (field: keyof PriceOffer, value: string | number) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    return (
        <div className="mika-price-offer-modal-overlay">
            <div className="mika-price-offer-modal-container">
                <form onSubmit={handleSubmit} className="mika-price-offer-modal">
                    <div className="mika-price-offer-header">
                        <h3>{t('financialManagement.addPriceOffer')}</h3>
                        <p className="mika-financial-task-name">{getLocalizedContent(task.name)}</p>
                    </div>

                    <div className="mika-price-offer-body">
                        <div className="mika-financial-form-group">
                            <label className="mika-financial-form-label">
                                {t('financialManagement.companyName')} *
                            </label>
                            <input
                                type="text"
                                className="mika-financial-form-input"
                                placeholder={t('financialManagement.companyPlaceholder')}
                                value={formData.company}
                                onChange={(e) => handleInputChange('company', e.target.value)}
                                required
                            />
                        </div>

                        <div className="mika-financial-form-group">
                            <label className="mika-financial-form-label">
                                {t('financialManagement.offerAmount')} *
                            </label>
                            <input
                                type="number"
                                step="0.01"
                                min="0"
                                className="mika-financial-form-input"
                                placeholder="0.00"
                                value={formData.amount}
                                onChange={(e) => handleInputChange('amount', Number(e.target.value))}
                                required
                            />
                        </div>

                        <div className="mika-financial-form-group">
                            <label className="mika-financial-form-label">
                                {t('financialManagement.notes')}
                            </label>
                            <textarea
                                className="mika-financial-form-textarea"
                                placeholder={t('financialManagement.notesPlaceholder')}
                                value={formData.notes}
                                onChange={(e) => handleInputChange('notes', e.target.value)}
                                rows={3}
                            />
                        </div>
                    </div>

                    <div className="mika-price-offer-footer">
                        <button
                            type="button"
                            className="mika-financial-form-button mika-financial-form-button-cancel"
                            onClick={onCancel}
                        >
                            {t('financialManagement.cancel')}
                        </button>
                        <button
                            type="submit"
                            className="mika-financial-form-button mika-financial-form-button-save"
                        >
                            {t('financialManagement.saveOffer')}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default PriceOfferModal;