// src/components/common/LanguageSwitcher.tsx
import React from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { Language } from '../../types/language';
import '../../styles/common/LanguageSwitcher.css';

const LanguageSwitcher: React.FC = () => {
    const { language, setLanguage } = useLanguage();

    const handleLanguageChange = (newLanguage: Language) => {
        setLanguage(newLanguage);
    };

    return (
        <div className="mika-language-switcher">
            <button
                className={`mika-lang-btn ${language === 'et' ? 'active' : ''}`}
                onClick={() => handleLanguageChange('et')}
            >
                ET
            </button>
            <span className="mika-lang-divider">|</span>
            <button
                className={`mika-lang-btn ${language === 'ua' ? 'active' : ''}`}
                onClick={() => handleLanguageChange('ua')}
            >
                UA
            </button>
        </div>
    );
};

export default LanguageSwitcher;