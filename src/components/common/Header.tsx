// src/components/common/Header.tsx
import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { useNavigate } from 'react-router-dom';
import LanguageSwitcher from './LanguageSwitcher';
import '../../styles/common/Header.css';

const Header: React.FC = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { currentUser, logout } = useAuth();
    const { t } = useLanguage();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await logout();
            setIsMenuOpen(false);
        } catch (error) {
            console.error('Failed to logout:', error);
        }
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const navigateTo = (path: string) => {
        navigate(path);
        setIsMenuOpen(false);
    };

    const hasAccountManagement = currentUser?.email === 'mike.gross@mika-pulm.ee';

    return (
        <>
            <header className="header-container">
                <div className="header-content">
                    <div className="header-left">
                        {/* Empty space for balance */}
                    </div>

                    <div className="header-center">
                        <h1 className="header-title">{t('header.title')}</h1>
                    </div>

                    <div className="header-right">
                        <LanguageSwitcher />
                        <button className="burger-menu" onClick={toggleMenu}>
                            <span className={`burger-line ${isMenuOpen ? 'open' : ''}`}></span>
                            <span className={`burger-line ${isMenuOpen ? 'open' : ''}`}></span>
                            <span className={`burger-line ${isMenuOpen ? 'open' : ''}`}></span>
                        </button>
                    </div>
                </div>
            </header>

            <div className={`dropdown-menu ${isMenuOpen ? 'open' : ''}`}>
                <div className="menu-content">
                    <div className="user-info-menu">
                        <span className="user-email">{currentUser?.email}</span>
                    </div>

                    <div className="menu-divider"></div>

                    <nav className="menu-nav">
                        <button onClick={() => navigateTo('/admin')} className="menu-item">
                            <span className="menu-icon">📊</span>
                            {t('menu.dashboard')}
                        </button>

                        {/* Add this new menu item */}
                        <button onClick={() => navigateTo('/admin/tasks')} className="menu-item">
                            <span className="menu-icon">📋</span>
                            {t('menu.taskManagement')}
                        </button>

                        <button onClick={() => navigateTo('/admin/financial')} className="menu-item">
                            <span className="menu-icon">💰</span>
                            {t('menu.financialManagement')}
                        </button>

                        {hasAccountManagement && (
                            <button onClick={() => navigateTo('/admin/accounts')} className="menu-item">
                                <span className="menu-icon">👤</span>
                                {t('menu.userManagement')}
                            </button>
                        )}
                    </nav>

                    <div className="menu-divider"></div>

                    <button onClick={handleLogout} className="logout-menu-btn">
                        <span className="menu-icon">🚪</span>
                        {t('menu.logout')}
                    </button>
                </div>
            </div>

            {isMenuOpen && <div className="menu-overlay" onClick={() => setIsMenuOpen(false)}></div>}
        </>
    );
};

export default Header;