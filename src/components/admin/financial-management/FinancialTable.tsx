// src/components/admin/financial-management/FinancialTable.tsx
import React, { useState } from 'react';
import { useLanguage } from '../../../contexts/LanguageContext';
import { Task, TaskContent, PriceOffer } from '../../../types';
import PriceOfferModal from './PriceOfferModal';
import '../../../styles/admin/FinancialTable.css';

interface FinancialTableProps {
    tasks: Task[];
    onToggleActive: (taskId: string, isActive: boolean) => void;
    onUpdateAllocated: (taskId: string, amount: number) => void;
    onAddPriceOffer: (task: Task) => void;
    onRemovePriceOffer: (taskId: string, offerIndex: number) => void;
    getLocalizedContent: (content: TaskContent | string) => string;
}

const FinancialTable: React.FC<FinancialTableProps> = ({
                                                           tasks,
                                                           onToggleActive,
                                                           onUpdateAllocated,
                                                           onAddPriceOffer,
                                                           onRemovePriceOffer,
                                                           getLocalizedContent
                                                       }) => {
    const { t } = useLanguage();
    const [editingAllocated, setEditingAllocated] = useState<string | null>(null);
    const [allocatedValues, setAllocatedValues] = useState<{[key: string]: string}>({});

    const handleAllocatedEdit = (taskId: string, currentValue: number) => {
        setEditingAllocated(taskId);
        setAllocatedValues(prev => ({
            ...prev,
            [taskId]: currentValue.toString()
        }));
    };

    const handleAllocatedSave = (taskId: string) => {
        const value = parseFloat(allocatedValues[taskId] || '0');
        onUpdateAllocated(taskId, value);
        setEditingAllocated(null);
        setAllocatedValues(prev => {
            const newValues = { ...prev };
            delete newValues[taskId];
            return newValues;
        });
    };

    const handleAllocatedCancel = () => {
        setEditingAllocated(null);
        setAllocatedValues({});
    };

    const getBestOffer = (priceOffers: PriceOffer[]): number | null => {
        if (!priceOffers || priceOffers.length === 0) return null;
        return Math.min(...priceOffers.map(offer => offer.amount));
    };

    const getProgressPercentage = (allocated: number, required: number): number => {
        if (required === 0) return 0;
        return Math.min((allocated / required) * 100, 100);
    };

    if (tasks.length === 0) {
        return (
            <div className="mika-financial-table-container">
                <div className="mika-financial-table-empty">
                    <div className="mika-financial-table-empty-icon">💰</div>
                    <h3>{t('financialManagement.empty.title')}</h3>
                    <p>{t('financialManagement.empty.description')}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="mika-financial-table-container">
            <div className="mika-financial-table-wrapper">
                <table className="mika-financial-table">
                    <thead className="mika-financial-table-head">
                    <tr>
                        <th>{t('financialManagement.taskName')}</th>
                        <th>{t('financialManagement.status')}</th>
                        <th>{t('financialManagement.required')}</th>
                        <th>{t('financialManagement.allocated')}</th>
                        <th>{t('financialManagement.remaining')}</th>
                        <th>{t('financialManagement.bestOffer')}</th>
                        <th>{t('financialManagement.priceOffers')}</th>
                        <th>{t('financialManagement.actions')}</th>
                    </tr>
                    </thead>
                    <tbody className="mika-financial-table-body">
                    {tasks.map((task) => {
                        const required = task.monetaryRequirement || 0;
                        const allocated = task.allocatedAmount || 0;
                        const remaining = Math.max(required - allocated, 0);
                        const bestOffer = getBestOffer(task.priceOffers || []);
                        const progressPercentage = getProgressPercentage(allocated, required);
                        const potentialSaving = bestOffer ? Math.max(required - bestOffer, 0) : 0;
                        const isEditing = editingAllocated === task.id;

                        return (
                            <tr key={task.id} className={`mika-financial-table-row ${task.isFinanciallyActive ? 'mika-financial-active' : 'mika-financial-inactive'}`}>
                                {/* Task Name */}
                                <td className="mika-financial-task-name">
                                    <div className="mika-financial-task-name-content">
                                            <span className="mika-financial-task-title">
                                                {getLocalizedContent(task.name)}
                                            </span>
                                        {task.description && (
                                            <span className="mika-financial-task-description">
                                                    {getLocalizedContent(task.description)}
                                                </span>
                                        )}
                                    </div>
                                </td>

                                {/* Status Toggle */}
                                <td className="mika-financial-status-cell">
                                    <div className="mika-financial-toggle-container">
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
                                </td>

                                {/* Required Amount */}
                                <td className="mika-financial-required">
                                        <span className="mika-financial-amount-value mika-financial-required">
                                            €{required.toFixed(2)}
                                        </span>
                                </td>

                                {/* Allocated Amount */}
                                <td className="mika-financial-allocated">
                                    {isEditing ? (
                                        <div className="mika-financial-edit-container">
                                            <input
                                                type="number"
                                                min="0"
                                                step="0.01"
                                                value={allocatedValues[task.id] || ''}
                                                onChange={(e) => setAllocatedValues(prev => ({
                                                    ...prev,
                                                    [task.id]: e.target.value
                                                }))}
                                                className="mika-financial-edit-input"
                                                onKeyDown={(e) => {
                                                    if (e.key === 'Enter') handleAllocatedSave(task.id);
                                                    if (e.key === 'Escape') handleAllocatedCancel();
                                                }}
                                                autoFocus
                                            />
                                            <div className="mika-financial-edit-actions">
                                                <button
                                                    onClick={() => handleAllocatedSave(task.id)}
                                                    className="mika-financial-edit-save"
                                                    title={t('financialManagement.save')}
                                                >
                                                    ✓
                                                </button>
                                                <button
                                                    onClick={handleAllocatedCancel}
                                                    className="mika-financial-edit-cancel"
                                                    title={t('financialManagement.cancel')}
                                                >
                                                    ✕
                                                </button>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="mika-financial-allocated-container">
                                                <span
                                                    className="mika-financial-amount-value mika-financial-allocated-value"
                                                    onClick={() => handleAllocatedEdit(task.id, allocated)}
                                                    title={t('financialManagement.clickToEdit')}
                                                >
                                                    €{allocated.toFixed(2)}
                                                </span>
                                            <div className="mika-financial-progress-mini">
                                                <div
                                                    className="mika-financial-progress-bar-mini"
                                                    style={{ width: `${progressPercentage}%` }}
                                                ></div>
                                            </div>
                                        </div>
                                    )}
                                </td>

                                {/* Remaining Amount */}
                                <td className="mika-financial-remaining">
                                        <span className={`mika-financial-amount-value ${remaining > 0 ? 'mika-financial-remaining' : 'mika-financial-complete'}`}>
                                            €{remaining.toFixed(2)}
                                        </span>
                                </td>

                                {/* Best Offer */}
                                <td className="mika-financial-best-offer-cell">
                                    {bestOffer ? (
                                        <div className="mika-financial-best-offer-container">
                                                <span className="mika-financial-best-offer-value">
                                                    €{bestOffer.toFixed(2)}
                                                </span>
                                            {potentialSaving > 0 && (
                                                <span className="mika-financial-potential-saving">
                                                        ({t('financialManagement.save')} €{potentialSaving.toFixed(2)})
                                                    </span>
                                            )}
                                        </div>
                                    ) : (
                                        <span className="mika-financial-no-offers">-</span>
                                    )}
                                </td>

                                {/* Price Offers Count */}
                                <td className="mika-financial-offers-count">
                                        <span className="mika-financial-offers-badge">
                                            {task.priceOffers?.length || 0}
                                        </span>
                                </td>

                                {/* Actions */}
                                <td className="mika-financial-actions">
                                    <button
                                        className="mika-financial-action-button mika-financial-action-add-offer"
                                        onClick={() => onAddPriceOffer(task)}
                                        title={t('financialManagement.addOffer')}
                                    >
                                        💰
                                    </button>
                                </td>
                            </tr>
                        );
                    })}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default FinancialTable;