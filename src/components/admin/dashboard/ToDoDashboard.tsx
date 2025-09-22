// src/components/admin/dashboard/ToDoDashboard.tsx
import React, { useState, useEffect } from 'react';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '../../../firebase';
import { useLanguage } from '../../../contexts/LanguageContext';
import { Task, TaskContent } from '../../../types';
import { User } from '../../../types/User';
import '../../../styles/admin/ToDoDashboard.css';

const ToDoDashboard: React.FC = () => {
    const { t, language } = useLanguage();
    const [tasks, setTasks] = useState<Task[]>([]);
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchTasks();
        fetchUsers();
    }, []);

    const fetchTasks = async () => {
        try {
            const tasksSnapshot = await getDocs(
                query(collection(db, 'tasks'), orderBy('createdAt', 'desc'))
            );
            const tasksData = tasksSnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
                createdAt: doc.data().createdAt?.toDate() || new Date(),
                updatedAt: doc.data().updatedAt?.toDate() || new Date(),
            })) as Task[];
            setTasks(tasksData);
        } catch (error) {
            console.error('Error fetching tasks:', error);
        }
    };

    const fetchUsers = async () => {
        try {
            const usersSnapshot = await getDocs(collection(db, 'users'));
            const usersData = usersSnapshot.docs.map(doc => {
                const data = doc.data();
                return {
                    id: doc.id,
                    email: data.email,
                    profile: data.profile,
                    permissions: data.permissions,
                    dashboardAccess: data.dashboardAccess,
                    isActive: data.isActive ?? true,
                    createdAt: data.createdAt?.toDate() || new Date(),
                    updatedAt: data.updatedAt?.toDate() || new Date(),
                    lastLoginAt: data.lastLoginAt?.toDate()
                } as User;
            }).filter(user => user.isActive);
            setUsers(usersData);
        } catch (error) {
            console.error('Error fetching users:', error);
        } finally {
            setLoading(false);
        }
    };

    // Helper function to get content in current language
    const getLocalizedContent = (content: TaskContent | string): string => {
        if (typeof content === 'string') {
            return content; // Fallback for old tasks
        }
        return content[language] || content.et || content.ua || '';
    };

    // Helper function to get manager display name
    const getManagerDisplayName = (email: string): string => {
        const user = users.find(u => u.email === email);
        if (user) {
            return user.profile.displayName || `${user.profile.firstName} ${user.profile.lastName}`;
        }
        return email;
    };

    // Helper function to get status class
    const getStatusClass = (status: string) => {
        switch (status) {
            case 'tegemata': return 'mika-status-tegemata';
            case 'toos': return 'mika-status-toos';
            case 'tehtud': return 'mika-status-tehtud';
            default: return '';
        }
    };

    // Helper function to format date
    const formatDate = (date: Date): string => {
        return date.toLocaleDateString(language === 'et' ? 'et-EE' : 'uk-UA', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    // Helper function to format currency
    const formatCurrency = (amount?: number): string => {
        if (amount === undefined || amount === 0) return '-';
        return `€${amount.toFixed(2)}`;
    };

    // Group tasks by status for better overview
    const tasksByStatus = {
        tegemata: tasks.filter(task => task.status === 'tegemata'),
        toos: tasks.filter(task => task.status === 'toos'),
        tehtud: tasks.filter(task => task.status === 'tehtud')
    };

    const totalTasks = tasks.length;
    const completedTasks = tasksByStatus.tehtud.length;
    const inProgressTasks = tasksByStatus.toos.length;
    const pendingTasks = tasksByStatus.tegemata.length;

    if (loading) {
        return (
            <section className="mika-todo-dashboard">
                <div className="mika-todo-content">
                    <div className="mika-todo-header">
                        <h2 className="mika-todo-title">{t('todo.title')}</h2>
                    </div>
                    <div className="mika-todo-container">
                        <div className="mika-todo-loading">
                            <p>Loading tasks...</p>
                        </div>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className="mika-todo-dashboard">
            <div className="mika-todo-content">
                <div className="mika-todo-header">
                    <h2 className="mika-todo-title">{t('todo.title')}</h2>

                    {/* Task Statistics */}
                    {totalTasks > 0 && (
                        <div className="mika-todo-stats">
                            <div className="mika-todo-stat">
                                <span className="mika-todo-stat-number">{totalTasks}</span>
                                <span className="mika-todo-stat-label">{t('todo.stats.total')}</span>
                            </div>
                            <div className="mika-todo-stat">
                                <span className="mika-todo-stat-number">{completedTasks}</span>
                                <span className="mika-todo-stat-label">{t('todo.stats.completed')}</span>
                            </div>
                            <div className="mika-todo-stat">
                                <span className="mika-todo-stat-number">{inProgressTasks}</span>
                                <span className="mika-todo-stat-label">{t('todo.stats.inProgress')}</span>
                            </div>
                            <div className="mika-todo-stat">
                                <span className="mika-todo-stat-number">{pendingTasks}</span>
                                <span className="mika-todo-stat-label">{t('todo.stats.pending')}</span>
                            </div>
                        </div>
                    )}
                </div>

                <div className="mika-todo-container">
                    {totalTasks === 0 ? (
                        <div className="mika-todo-empty">
                            <div className="mika-todo-empty-icon">📝</div>
                            <h3>{t('todo.empty.title')}</h3>
                            <p>{t('todo.empty.description')}</p>
                        </div>
                    ) : (
                        <div className="mika-todo-items">
                            {tasks.map(task => (
                                <div key={task.id} className="mika-todo-item">
                                    <div className="mika-todo-item-header">
                                        <h4 className="mika-todo-item-name">
                                            {getLocalizedContent(task.name)}
                                        </h4>
                                        <div className="mika-todo-item-meta">
                                            <span className={`mika-todo-item-status ${getStatusClass(task.status)}`}>
                                                {t(`taskStatus.${task.status}`)}
                                            </span>
                                            {task.monetaryRequirement && task.monetaryRequirement > 0 && (
                                                <span className="mika-todo-item-cost">
                                                    {formatCurrency(task.monetaryRequirement)}
                                                </span>
                                            )}
                                        </div>
                                    </div>

                                    <div className="mika-todo-item-description">
                                        {getLocalizedContent(task.description)}
                                    </div>

                                    <div className="mika-todo-item-footer">
                                        <div className="mika-todo-organizator">
                                            <span className="mika-todo-organizator-label">{t('todo.manager')}:</span>
                                            <span className="mika-todo-organizator-name">
                                                {getManagerDisplayName(task.taskManager)}
                                            </span>
                                        </div>
                                        <div className="mika-todo-item-dates">
                                            <span className="mika-todo-created">
                                                {t('todo.created')}: {formatDate(task.createdAt)}
                                            </span>
                                            {task.extraInformation && getLocalizedContent(task.extraInformation) && (
                                                <span className="mika-todo-company">
                                                    {getLocalizedContent(task.extraInformation)}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default ToDoDashboard;