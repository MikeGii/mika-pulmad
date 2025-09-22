// src/components/admin/task-management/TaskTable.tsx
import React from 'react';
import { useLanguage } from '../../../contexts/LanguageContext';
import { Task, TaskContent } from '../../../types';
import { User } from '../../../types';
import '../../../styles/admin/TaskTable.css';

interface TaskTableProps {
    tasks: Task[];
    users: User[];
    onEdit: (task: Task) => void;
    onDelete: (task: Task) => void;
}

const TaskTable: React.FC<TaskTableProps> = ({ tasks, users, onEdit, onDelete }) => {
    const { t, language } = useLanguage();

    // Helper function to get content in current language
    const getLocalizedContent = (content: TaskContent | string): string => {
        if (typeof content === 'string') {
            return content; // Fallback for old tasks
        }
        return content[language] || content.et || content.ua || '';
    };

    const getStatusClass = (status: string) => {
        switch (status) {
            case 'tegemata': return 'mika-status-tegemata';
            case 'toos': return 'mika-status-toos';
            case 'tehtud': return 'mika-status-tehtud';
            default: return '';
        }
    };

    const formatCurrency = (amount?: number) => {
        if (amount === undefined || amount === 0) return '-';
        return `€${amount.toFixed(2)}`;
    };

    const getManagerDisplayName = (email: string): string => {
        const user = users.find(u => u.email === email);
        if (user) {
            return user.profile.displayName || `${user.profile.firstName} ${user.profile.lastName}`;
        }
        return email;
    };

    if (tasks.length === 0) {
        return (
            <div className="mika-task-table-container">
                <div className="mika-task-table-empty">
                    <div className="mika-task-table-empty-icon">📋</div>
                    <h3>{t('taskTable.noTasks')}</h3>
                </div>
            </div>
        );
    }

    return (
        <div className="mika-task-table-container">
            <div className="mika-task-table-wrapper">
                <table className="mika-task-table">
                    <thead className="mika-task-table-head">
                    <tr>
                        <th>{t('taskTable.name')}</th>
                        <th>{t('taskTable.status')}</th>
                        <th>{t('taskTable.manager')}</th>
                        <th>{t('taskTable.monetary')}</th>
                        <th>{t('taskTable.actions')}</th>
                    </tr>
                    </thead>
                    <tbody className="mika-task-table-body">
                    {tasks.map((task) => (
                        <tr key={task.id} className="mika-task-table-row">
                            <td className="mika-task-name">
                                <div className="mika-task-name-content">
                                    <span className="mika-task-title">
                                        {getLocalizedContent(task.name)}
                                    </span>
                                    {task.description && (
                                        <span className="mika-task-description">
                                            {getLocalizedContent(task.description)}
                                        </span>
                                    )}
                                    {task.extraInformation && (
                                        <span className="mika-task-extra">
                                            {getLocalizedContent(task.extraInformation)}
                                        </span>
                                    )}
                                </div>
                            </td>
                            <td>
                                <span className={`mika-task-status ${getStatusClass(task.status)}`}>
                                    {t(`taskStatus.${task.status}`)}
                                </span>
                            </td>
                            <td className="mika-task-manager">
                                <div className="mika-manager-info">
                                    <span className="mika-manager-name">
                                        {getManagerDisplayName(task.taskManager)}
                                    </span>
                                    <span className="mika-manager-email">
                                        {task.taskManager}
                                    </span>
                                </div>
                            </td>
                            <td className="mika-task-monetary">
                                {formatCurrency(task.monetaryRequirement)}
                            </td>
                            <td>
                                <div className="mika-task-actions">
                                    <button
                                        className="mika-action-button mika-action-edit"
                                        onClick={() => onEdit(task)}
                                        title={t('taskTable.edit')}
                                    >
                                        ✏️
                                    </button>
                                    <button
                                        className="mika-action-button mika-action-delete"
                                        onClick={() => onDelete(task)}
                                        title={t('taskTable.delete')}
                                    >
                                        🗑️
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default TaskTable;