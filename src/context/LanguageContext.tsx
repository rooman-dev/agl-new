import { createContext, useContext, useState, useEffect, useCallback, ReactNode, FC } from 'react';
import { translations, Language, TranslationKey, defaultLanguage, getDirection, isRTL } from '@/i18n';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: (key: TranslationKey) => string;
  isRTL: boolean;
  direction: 'ltr' | 'rtl';
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const STORAGE_KEY = 'siteLanguage';

interface LanguageProviderProps {
  children: ReactNode;
}

// Font families for each language
const FONTS = {
  en: {
    body: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    heading: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
  },
  ar: {
    body: "'IBM Plex Sans Arabic', 'Noto Sans Arabic', 'Tahoma', sans-serif",
    heading: "'IBM Plex Sans Arabic', 'Noto Sans Arabic', 'Tahoma', sans-serif"
  }
};

export const LanguageProvider: FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(STORAGE_KEY) as Language;
      return saved && ['en', 'ar'].includes(saved) ? saved : defaultLanguage;
    }
    return defaultLanguage;
  });

  const direction = getDirection(language);
  const rtl = isRTL(language);

  // Update document attributes and fonts when language changes
  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;
    
    // Set language and direction
    html.lang = language;
    html.dir = direction;
    body.style.direction = direction;
    
    // Set CSS custom properties for fonts
    const fonts = FONTS[language];
    html.style.setProperty('--font-family', fonts.body);
    html.style.setProperty('--font-family-heading', fonts.heading);
    
    // Add/remove RTL class for additional styling
    if (rtl) {
      html.classList.add('rtl');
      html.classList.remove('ltr');
    } else {
      html.classList.add('ltr');
      html.classList.remove('rtl');
    }
    
    // Force re-render of fonts by toggling a class
    body.classList.add('lang-switching');
    requestAnimationFrame(() => {
      body.classList.remove('lang-switching');
    });
    
    // Save to localStorage
    localStorage.setItem(STORAGE_KEY, language);
  }, [language, direction, rtl]);

  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang);
  }, []);

  const toggleLanguage = useCallback(() => {
    setLanguageState(prev => prev === 'en' ? 'ar' : 'en');
  }, []);

  const t = useCallback((key: TranslationKey): string => {
    return translations[language][key] || key;
  }, [language]);

  const value: LanguageContextType = {
    language,
    setLanguage,
    toggleLanguage,
    t,
    isRTL: rtl,
    direction,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export default LanguageContext;
