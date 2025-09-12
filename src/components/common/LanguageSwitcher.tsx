// src/components/common/LanguageSwitcher.tsx
import React from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { Language } from '../../types/language';
import '../../styles/common/LanguageSwitcher.css';

const LanguageSwitcher: React.FC = () => {
    const { language, setLanguage, t } = useLanguage();

    const handleLanguageChange = (newLanguage: Language) => {
        setLanguage(newLanguage);
    };

    return (
        <div className="language-switcher">
            <button
                className={`lang-btn ${language === 'et' ? 'active' : ''}`}
                onClick={() => handleLanguageChange('et')}
            >
                ET
            </button>
            <button
                className={`lang-btn ${language === 'ua' ? 'active' : ''}`}
                onClick={() => handleLanguageChange('ua')}
            >
                UA
            </button>
        </div>
    );
};

export default LanguageSwitcher;