import { createContext, useContext, useState, ReactNode } from 'react';
import { translations, errorMap } from '../i18n/translations';

type Language = 'en' | 'tl' | 'ceb';

interface LanguageContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
    t: (key: string) => string;
    mapError: (msg: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
    const [language, setLanguage] = useState<Language>('tl'); // Default to Tagalog/Taglish

    const t = (key: string): string => {
        // @ts-ignore
        return translations[language][key] || key;
    };

    const mapError = (msg: string): string => {
        const key = errorMap[msg];
        if (key) return t(key);
        return msg;
    };

    return (
        <LanguageContext.Provider value={{ language, setLanguage, t, mapError }}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useT() {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error('useT must be used within a LanguageProvider');
    }
    return context;
}
