// src/components/admin/dashboard/FinancialStatus.tsx
import React, { useState, useEffect } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../../firebase';
import { useLanguage } from '../../../contexts/LanguageContext';
import { doc, getDoc } from 'firebase/firestore';
import { Task, TaskContent } from '../../../types';
import '../../../styles/admin/FinancialStatus.css';

const FinancialStatus: React.FC = () => {
    const { t, language } = useLanguage();
    const [financialTasks, setFinancialTasks] = useState<Task[]>([]);
    const [loading, setLoading] = useState(true);
    const [reservedMoney, setReservedMoney] = useState(0);

    useEffect(() => {
        fetchFinancialTasks();
        fetchReservedMoney();
    }, []);

    const fetchReservedMoney = async () => {
        try {
            const settingsDoc = await getDoc(doc(db, 'settings', 'financial'));
            if (settingsDoc.exists()) {
                const data = settingsDoc.data();
                setReservedMoney(data.reservedMoney || 0);
            }
        } catch (error) {
            console.error('Error fetching reserved money:', error);
        }
    };

    const fetchFinancialTasks = async () => {
        try {
            // Get all tasks with monetary requirements that are financially active
            const tasksSnapshot = await getDocs(
                query(
                    collection(db, 'tasks'),
                    where('isFinanciallyActive', '==', true)
                )
            );

            const tasksData = tasksSnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
                createdAt: doc.data().createdAt?.toDate() || new Date(),
                updatedAt: doc.data().updatedAt?.toDate() || new Date(),
            })) as Task[];

            // Filter tasks that have monetary requirements
            const financialTasksOnly = tasksData.filter(task =>
                task.monetaryRequirement && task.monetaryRequirement > 0
            );

            setFinancialTasks(financialTasksOnly);
        } catch (error) {
            console.error('Error fetching financial tasks:', error);
        } finally {
            setLoading(false);
        }
    };

    // Helper function to get content in current language
    const getLocalizedContent = (content: TaskContent | string): string => {
        if (typeof content === 'string') {
            return content;
        }
        return content[language] || content.et || content.ua || '';
    };

    // Calculate financial totals
    const totalRequired = financialTasks.reduce((sum, task) => sum + (task.monetaryRequirement || 0), 0);
    const totalAllocated = financialTasks.reduce((sum, task) => sum + (task.allocatedAmount || 0), 0);
    const effectiveRemaining = Math.max(totalRequired - totalAllocated - reservedMoney, 0);

    // Get the best price offers
    const totalBestOffers = financialTasks.reduce((sum, task) => {
        if (task.priceOffers && task.priceOffers.length > 0) {
            const bestOffer = Math.min(...task.priceOffers.map(offer => offer.amount));
            return sum + bestOffer;
        }
        return sum + (task.monetaryRequirement || 0);
    }, 0);

    const potentialSavings = totalRequired - totalBestOffers;

    if (loading) {
        return (
            <section className="mika-financial-status">
                <div className="mika-financial-content">
                    <div className="mika-financial-header">
                        <h2 className="mika-financial-title">{t('financial.title')}</h2>
                    </div>
                    <div className="mika-financial-container">
                        <div className="mika-financial-loading">
                            <p>Loading financial data...</p>
                        </div>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className="mika-financial-status">
            <div className="mika-financial-content">
                <div className="mika-financial-header">
                    <h2 className="mika-financial-title">{t('financial.title')}</h2>
                    <p className="mika-financial-subtitle">{t('financial.subtitle')}</p>

                    {/* Financial Overview */}
                    <div className="mika-financial-overview">
                        <div className="mika-financial-stat">
                            <span className="mika-financial-stat-number">€{totalRequired.toFixed(2)}</span>
                            <span className="mika-financial-stat-label">{t('financial.totalRequired')}</span>
                        </div>
                        <div className="mika-financial-stat">
                            <span className="mika-financial-stat-number">€{totalAllocated.toFixed(2)}</span>
                            <span className="mika-financial-stat-label">{t('financial.totalAllocated')}</span>
                        </div>
                        {reservedMoney > 0 && (
                            <div className="mika-financial-stat">
                                <span className="mika-financial-stat-number">€{reservedMoney.toFixed(2)}</span>
                                <span className="mika-financial-stat-label">{t('financial.reservedMoney')}</span>
                            </div>
                        )}
                        <div className="mika-financial-stat">
                            <span className="mika-financial-stat-number mika-remaining">€{effectiveRemaining.toFixed(2)}</span>
                            <span className="mika-financial-stat-label">{t('financial.remaining')}</span>
                        </div>
                        {potentialSavings > 0 && (
                            <div className="mika-financial-stat">
                                <span className="mika-financial-stat-number mika-savings">€{potentialSavings.toFixed(2)}</span>
                                <span className="mika-financial-stat-label">{t('financial.potentialSavings')}</span>
                            </div>
                        )}
                    </div>
                </div>

                <div className="mika-financial-container">
                    {financialTasks.length === 0 ? (
                        <div className="mika-financial-empty">
                            <div className="mika-financial-empty-icon">💰</div>
                            <h3>{t('financial.empty.title')}</h3>
                            <p>{t('financial.empty.description')}</p>
                        </div>
                    ) : (
                        <div className="mika-financial-items">
                            {financialTasks.map(task => {
                                const remaining = (task.monetaryRequirement || 0) - (task.allocatedAmount || 0);
                                const bestOffer = task.priceOffers && task.priceOffers.length > 0
                                    ? Math.min(...task.priceOffers.map(offer => offer.amount))
                                    : null;

                                return (
                                    <div key={task.id} className="mika-financial-item">
                                        <div className="mika-financial-item-header">
                                            <h4 className="mika-financial-item-name">
                                                {getLocalizedContent(task.name)}
                                            </h4>
                                            <div className="mika-financial-item-amounts">
                                                <span className="mika-financial-required">
                                                    €{(task.monetaryRequirement || 0).toFixed(2)}
                                                </span>
                                                {bestOffer && (
                                                    <span className="mika-financial-best-offer">
                                                        {t('financial.bestOffer')}: €{bestOffer.toFixed(2)}
                                                    </span>
                                                )}
                                            </div>
                                        </div>

                                        <div className="mika-financial-progress">
                                            <div className="mika-financial-progress-bar">
                                                <div
                                                    className="mika-financial-progress-fill"
                                                    style={{
                                                        width: `${Math.min(100, ((task.allocatedAmount || 0) / (task.monetaryRequirement || 1)) * 100)}%`
                                                    }}
                                                ></div>
                                            </div>
                                            <div className="mika-financial-progress-text">
                                                <span>{t('financial.allocated')}: €{(task.allocatedAmount || 0).toFixed(2)}</span>
                                                <span className={remaining > 0 ? 'mika-remaining' : 'mika-complete'}>
                                                    {remaining > 0
                                                        ? `${t('financial.needed')}: €${remaining.toFixed(2)}`
                                                        : t('financial.fullyFunded')
                                                    }
                                                </span>
                                            </div>
                                        </div>

                                        {task.priceOffers && task.priceOffers.length > 0 && (
                                            <div className="mika-financial-offers">
                                                <span className="mika-financial-offers-label">
                                                    {t('financial.priceOffers')} ({task.priceOffers.length}):
                                                </span>
                                                <div className="mika-financial-offers-list">
                                                    {task.priceOffers.slice(0, 3).map((offer, index) => (
                                                        <span key={index} className="mika-financial-offer">
                                                            {offer.company}: €{offer.amount.toFixed(2)}
                                                        </span>
                                                    ))}
                                                    {task.priceOffers.length > 3 && (
                                                        <span className="mika-financial-offers-more">
                                                            +{task.priceOffers.length - 3} {t('financial.more')}
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default FinancialStatus;