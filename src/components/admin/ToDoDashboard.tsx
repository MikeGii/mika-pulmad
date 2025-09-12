// src/components/admin/ToDoDashboard.tsx
import React from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import '../../styles/admin/ToDoDashboard.css';

const ToDoDashboard: React.FC = () => {
    const { t } = useLanguage();

    return (
        <section className="mika-todo-dashboard">
            <div className="mika-todo-content">
                <div className="mika-todo-header">
                    <h2 className="mika-todo-title">{t('todo.title')}</h2>
                    <p className="mika-todo-subtitle">{t('todo.subtitle')}</p>
                </div>

                <div className="mika-todo-container">
                    {/* This is where the todo items will be displayed */}
                    <div className="mika-todo-empty">
                        <div className="mika-todo-empty-icon">📝</div>
                        <h3>{t('todo.empty.title')}</h3>
                        <p>{t('todo.empty.description')}</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ToDoDashboard;