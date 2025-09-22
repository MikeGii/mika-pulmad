// src/components/admin/financial-management/FinancialTaskCard.tsx
import React, { useState } from 'react';
import { useLanguage } from '../../../contexts/LanguageContext';
import { Task, TaskContent } from '../../../types';

interface FinancialTaskCardProps {
    task: Task;
    onToggleActive: (taskId: string, isActive: boolean) => void;
    onUpdateAllocated: (taskId: string, amount: number) => void;
    onAddPriceOffer: (task: Task) => void;
    onRemovePriceOffer: (taskId: string, offerIndex: number) => void;
    getLocalizedContent: (content: TaskContent | string) => string;
}

const FinancialTaskCard: React.FC<FinancialTaskCardProps> = ({
                                                                 task,
                                                                 onToggleActive,
                                                                 onUpdateAllocated,
                                                                 onAddPriceOffer,
                                                                 onRemovePriceOffer,
                                                                 getLocalizedContent
                                                             }) => {
    const { t } = useLanguage();
    const [allocatedAmount, setAllocatedAmount] = useState(task.allocatedAmount || 0);
    const [isEditing, setIsEditing] = useState(false);

    const handleSaveAllocated = () => {
        onUpdateAllocated(task.id, allocatedAmount);
        setIsEditing(false);
    };

    const handleCancelEdit = () => {
        setAllocatedAmount(task.allocatedAmount || 0);
        setIsEditing(false);
    };

    const remainingAmount = (task.monetaryRequirement || 0) - allocatedAmount;
    const progressPercentage = Math.min(100, (allocatedAmount / (task.monetaryRequirement || 1)) * 100);

    const bestOffer = task.priceOffers && task.priceOffers.length > 0
        ? Math.min(...task.priceOffers.map(offer => offer.amount))
        : null;

    const potentialSaving = bestOffer ? (task.monetaryRequirement || 0) - bestOffer : 0;

    return (
        <div className={`mika-financial-task-card ${task.isFinanciallyActive ? 'mika-financial-active' : 'mika-financial-inactive'}`}>
            {/* Card Header */}
            <div className="mika-financial-card-header">
                <div className="mika-financial-card-title">
                    <h3>{getLocalizedContent(task.name)}</h3>
                    <p>{getLocalizedContent(task.description)}</p>
                </div>
                <div className="mika-financial-card-toggle">
                    <label className="mika-financial-toggle-switch">
                        <input
                            type="checkbox"
                            checked={task.isFinanciallyActive || false}
                            onChange={(e) => onToggleActive(task.id, e.target.checked)}
                        />
                        <span className="mika-financial-toggle-slider"></span>
                    </label>
                    <span className="mika-financial-toggle-label">
                    {task.isFinanciallyActive ? t('financialManagement.active') : t('financialManagement.inactive')}
                </span>
                </div>
            </div>

            {/* Financial Details */}
            <div className="mika-financial-card-details">
                <div className="mika-financial-amounts">
                    <div className="mika-financial-amount">
                        <span className="mika-financial-amount-label">{t('financialManagement.required')}:</span>
                        <span className="mika-financial-amount-value mika-financial-required">€{(task.monetaryRequirement || 0).toFixed(2)}</span>
                    </div>

                    <div className="mika-financial-amount">
                        <span className="mika-financial-amount-label">{t('financialManagement.allocated')}:</span>
                        {isEditing ? (
                            <div className="mika-financial-amount-edit">
                                <input
                                    type="number"
                                    step="0.01"
                                    min="0"
                                    value={allocatedAmount}
                                    onChange={(e) => setAllocatedAmount(Number(e.target.value))}
                                    className="mika-financial-amount-input"
                                />
                                <div className="mika-financial-edit-buttons">
                                    <button onClick={handleSaveAllocated} className="mika-financial-save-btn">✓</button>
                                    <button onClick={handleCancelEdit} className="mika-financial-cancel-btn">✕</button>
                                </div>
                            </div>
                        ) : (
                            <div className="mika-financial-amount-display">
                                <span className="mika-financial-amount-value">€{allocatedAmount.toFixed(2)}</span>
                                <button onClick={() => setIsEditing(true)} className="mika-financial-edit-btn">✏️</button>
                            </div>
                        )}
                    </div>

                    <div className="mika-financial-amount">
                        <span className="mika-financial-amount-label">{t('financialManagement.remaining')}:</span>
                        <span className={`mika-financial-amount-value ${remainingAmount > 0 ? 'mika-financial-remaining' : 'mika-financial-complete'}`}>
                        €{remainingAmount.toFixed(2)}
                    </span>
                    </div>
                </div>

                {/* Progress Bar */}
                <div className="mika-financial-progress">
                    <div className="mika-financial-progress-bar">
                        <div
                            className="mika-financial-progress-fill"
                            style={{ width: `${progressPercentage}%` }}
                        ></div>
                    </div>
                    <span className="mika-financial-progress-text">{progressPercentage.toFixed(1)}% {t('financialManagement.funded')}</span>
                </div>

                {/* Best Offer Display */}
                {bestOffer && (
                    <div className="mika-financial-best-offer">
                        <span className="mika-financial-best-offer-label">{t('financialManagement.bestOffer')}:</span>
                        <span className="mika-financial-best-offer-value">€{bestOffer.toFixed(2)}</span>
                        {potentialSaving > 0 && (
                            <span className="mika-financial-potential-saving">
                            ({t('financialManagement.save')} €{potentialSaving.toFixed(2)})
                        </span>
                        )}
                    </div>
                )}
            </div>

            {/* Price Offers Section */}
            <div className="mika-financial-price-offers-section">
                <div className="mika-financial-price-offers-header">
                    <h4>{t('financialManagement.priceOffers')} ({task.priceOffers?.length || 0})</h4>
                    <button onClick={() => onAddPriceOffer(task)} className="mika-financial-add-offer-btn">
                        + {t('financialManagement.addOffer')}
                    </button>
                </div>

                {task.priceOffers && task.priceOffers.length > 0 ? (
                    <div className="mika-financial-price-offers-list">
                        {task.priceOffers.map((offer, index) => (
                            <div key={index} className="mika-financial-price-offer-item">
                                <div className="mika-financial-offer-info">
                                    <span className="mika-financial-offer-company">{offer.company}</span>
                                    <span className="mika-financial-offer-amount">€{offer.amount.toFixed(2)}</span>
                                </div>
                                {offer.notes && (
                                    <p className="mika-financial-offer-notes">{offer.notes}</p>
                                )}
                                <button
                                    onClick={() => onRemovePriceOffer(task.id, index)}
                                    className="mika-financial-remove-offer-btn"
                                    title={t('financialManagement.removeOffer')}
                                >
                                    🗑️
                                </button>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="mika-financial-no-offers">{t('financialManagement.noOffers')}</p>
                )}
            </div>
        </div>
    );
};

export default FinancialTaskCard;