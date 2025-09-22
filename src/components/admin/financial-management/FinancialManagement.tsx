// src/components/admin/financial-management/FinancialManagement.tsx
import React, { useState, useEffect } from 'react';
import { collection, getDocs, updateDoc, doc } from 'firebase/firestore';
import { db } from '../../../firebase';
import Header from '../../common/Header';
import { useLanguage } from '../../../contexts/LanguageContext';
import { useAuth } from '../../../contexts/AuthContext';
import { Task, TaskContent, PriceOffer } from '../../../types';
import FinancialTaskCard from './FinancialTaskCard';
import PriceOfferModal from './PriceOfferModal';
import '../../../styles/admin/FinancialManagement.css';

const FinancialManagement: React.FC = () => {
    const { t, language } = useLanguage();
    const { currentUserProfile } = useAuth();
    const [tasks, setTasks] = useState<Task[]>([]);
    const [loading, setLoading] = useState(true);
    const [showPriceOfferModal, setShowPriceOfferModal] = useState(false);
    const [selectedTask, setSelectedTask] = useState<Task | null>(null);

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        try {
            const tasksSnapshot = await getDocs(collection(db, 'tasks'));
            const tasksData = tasksSnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
                createdAt: doc.data().createdAt?.toDate() || new Date(),
                updatedAt: doc.data().updatedAt?.toDate() || new Date(),
            })) as Task[];

            // Filter tasks that have monetary requirements
            const financialTasks = tasksData.filter(task =>
                task.monetaryRequirement && task.monetaryRequirement > 0
            );

            setTasks(financialTasks);
        } catch (error) {
            console.error('Error fetching tasks:', error);
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

    // Update task financial status
    const updateTaskFinancialStatus = async (taskId: string, isActive: boolean) => {
        try {
            await updateDoc(doc(db, 'tasks', taskId), {
                isFinanciallyActive: isActive,
                financialStatus: isActive ? 'active' : 'available',
                updatedAt: new Date(),
            });

            // Update local state
            setTasks(tasks.map(task =>
                task.id === taskId
                    ? { ...task, isFinanciallyActive: isActive, financialStatus: isActive ? 'active' : 'available' }
                    : task
            ));
        } catch (error) {
            console.error('Error updating task financial status:', error);
        }
    };

    // Update allocated amount
    const updateAllocatedAmount = async (taskId: string, amount: number) => {
        try {
            await updateDoc(doc(db, 'tasks', taskId), {
                allocatedAmount: amount,
                updatedAt: new Date(),
            });

            // Update local state
            setTasks(tasks.map(task =>
                task.id === taskId
                    ? { ...task, allocatedAmount: amount }
                    : task
            ));
        } catch (error) {
            console.error('Error updating allocated amount:', error);
        }
    };

    // Add price offer
    const addPriceOffer = async (taskId: string, offer: PriceOffer) => {
        try {
            const task = tasks.find(t => t.id === taskId);
            if (!task) return;

            const updatedOffers = [...(task.priceOffers || []), { ...offer, createdAt: new Date() }];

            await updateDoc(doc(db, 'tasks', taskId), {
                priceOffers: updatedOffers,
                updatedAt: new Date(),
            });

            // Update local state
            setTasks(tasks.map(t =>
                t.id === taskId
                    ? { ...t, priceOffers: updatedOffers }
                    : t
            ));
        } catch (error) {
            console.error('Error adding price offer:', error);
        }
    };

    // Remove price offer
    const removePriceOffer = async (taskId: string, offerIndex: number) => {
        try {
            const task = tasks.find(t => t.id === taskId);
            if (!task || !task.priceOffers) return;

            const updatedOffers = task.priceOffers.filter((_, index) => index !== offerIndex);

            await updateDoc(doc(db, 'tasks', taskId), {
                priceOffers: updatedOffers,
                updatedAt: new Date(),
            });

            // Update local state
            setTasks(tasks.map(t =>
                t.id === taskId
                    ? { ...t, priceOffers: updatedOffers }
                    : t
            ));
        } catch (error) {
            console.error('Error removing price offer:', error);
        }
    };

    const handleAddPriceOffer = (task: Task) => {
        setSelectedTask(task);
        setShowPriceOfferModal(true);
    };

    const handleSavePriceOffer = (offer: PriceOffer) => {
        if (selectedTask) {
            addPriceOffer(selectedTask.id, offer);
        }
        setShowPriceOfferModal(false);
        setSelectedTask(null);
    };

    // Check permissions
    if (!currentUserProfile?.permissions.financialManagement) {
        return (
            <div className="mika-financial-management-container">
                <Header />
                <div className="mika-financial-access-denied">
                    <h2>Access Denied</h2>
                    <p>You don't have permission to manage financial data.</p>
                </div>
            </div>
        );
    }

    // Calculate statistics
    const activeTasks = tasks.filter(task => task.isFinanciallyActive);
    const totalRequired = tasks.reduce((sum, task) => sum + (task.monetaryRequirement || 0), 0);
    const totalAllocated = tasks.reduce((sum, task) => sum + (task.allocatedAmount || 0), 0);
    const totalRemaining = totalRequired - totalAllocated;

    if (loading) {
        return (
            <div className="mika-financial-management-container">
                <Header />
                <div className="mika-financial-loading">
                    <p>Loading financial data...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="mika-financial-management-container">
            <Header />

            <main className="mika-financial-management-content">
                <div className="mika-financial-page-header">
                    <h2 className="mika-financial-page-title">{t('financialManagement.title')}</h2>
                    <p className="mika-financial-page-subtitle">{t('financialManagement.subtitle')}</p>

                    {/* Financial Overview */}
                    <div className="mika-financial-stats">
                        <div className="mika-financial-stat">
                            <span className="mika-financial-stat-number">{tasks.length}</span>
                            <span className="mika-financial-stat-label">{t('financialManagement.totalTasks')}</span>
                        </div>
                        <div className="mika-financial-stat">
                            <span className="mika-financial-stat-number">{activeTasks.length}</span>
                            <span className="mika-financial-stat-label">{t('financialManagement.activeTasks')}</span>
                        </div>
                        <div className="mika-financial-stat">
                            <span className="mika-financial-stat-number">€{totalRequired.toFixed(2)}</span>
                            <span className="mika-financial-stat-label">{t('financialManagement.totalRequired')}</span>
                        </div>
                        <div className="mika-financial-stat">
                            <span className="mika-financial-stat-number">€{totalAllocated.toFixed(2)}</span>
                            <span className="mika-financial-stat-label">{t('financialManagement.totalAllocated')}</span>
                        </div>
                        <div className="mika-financial-stat">
                        <span className={`mika-financial-stat-number ${totalRemaining > 0 ? 'mika-financial-remaining' : 'mika-financial-complete'}`}>
                            €{totalRemaining.toFixed(2)}
                        </span>
                            <span className="mika-financial-stat-label">{t('financialManagement.remaining')}</span>
                        </div>
                    </div>
                </div>

                {tasks.length === 0 ? (
                    <div className="mika-financial-empty">
                        <div className="mika-financial-empty-icon">💰</div>
                        <h3>{t('financialManagement.empty.title')}</h3>
                        <p>{t('financialManagement.empty.description')}</p>
                    </div>
                ) : (
                    <div className="mika-financial-tasks-grid">
                        {tasks.map(task => (
                            <FinancialTaskCard
                                key={task.id}
                                task={task}
                                onToggleActive={updateTaskFinancialStatus}
                                onUpdateAllocated={updateAllocatedAmount}
                                onAddPriceOffer={handleAddPriceOffer}
                                onRemovePriceOffer={removePriceOffer}
                                getLocalizedContent={getLocalizedContent}
                            />
                        ))}
                    </div>
                )}

                {showPriceOfferModal && selectedTask && (
                    <PriceOfferModal
                        task={selectedTask}
                        onSave={handleSavePriceOffer}
                        onCancel={() => {
                            setShowPriceOfferModal(false);
                            setSelectedTask(null);
                        }}
                        getLocalizedContent={getLocalizedContent}
                    />
                )}
            </main>
        </div>
    );
};

export default FinancialManagement;