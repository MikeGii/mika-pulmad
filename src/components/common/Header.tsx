// src/components/common/Header.tsx
import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import '../../styles/common/Header.css';

const Header: React.FC = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { currentUser, logout } = useAuth();
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

    // Check if user has account management access
    const hasAccountManagement = currentUser?.email === 'mike.gross@mika-pulm.ee';

    return (
        <>
            <header className="header-container">
                <div className="header-content">
                    <div className="header-left"></div>

                    <div className="header-center">
                        <h1 className="header-title">Mike & Kateryna Pulmad</h1>
                    </div>

                    <div className="header-right">
                        <button className="burger-menu" onClick={toggleMenu}>
                            <span className={`burger-line ${isMenuOpen ? 'open' : ''}`}></span>
                            <span className={`burger-line ${isMenuOpen ? 'open' : ''}`}></span>
                            <span className={`burger-line ${isMenuOpen ? 'open' : ''}`}></span>
                        </button>
                    </div>
                </div>
            </header>

            {/* Dropdown Menu */}
            <div className={`dropdown-menu ${isMenuOpen ? 'open' : ''}`}>
                <div className="menu-content">
                    <div className="user-info-menu">
                        <span className="user-email">{currentUser?.email}</span>
                        <span className="user-role">Administrator</span>
                    </div>

                    <div className="menu-divider"></div>

                    <nav className="menu-nav">
                        <button onClick={() => navigateTo('/admin')} className="menu-item">
                            <span className="menu-icon">📊</span>
                            Dashboard
                        </button>

                        {hasAccountManagement && (
                            <button onClick={() => navigateTo('/admin/accounts')} className="menu-item">
                                <span className="menu-icon">👤</span>
                                Account Management
                            </button>
                        )}
                    </nav>

                    <div className="menu-divider"></div>

                    <button onClick={handleLogout} className="logout-menu-btn">
                        <span className="menu-icon">🚪</span>
                        Logout
                    </button>
                </div>
            </div>

            {/* Overlay */}
            {isMenuOpen && <div className="menu-overlay" onClick={() => setIsMenuOpen(false)}></div>}
        </>
    );
};

export default Header;