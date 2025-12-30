import { en, TranslationKey } from './en';
import { ar } from './ar';

export type Language = 'en' | 'ar';

export const translations: Record<Language, typeof en> = {
  en,
  ar,
};

export type { TranslationKey };

export const defaultLanguage: Language = 'en';

export const isRTL = (lang: Language): boolean => lang === 'ar';

export const getDirection = (lang: Language): 'ltr' | 'rtl' => 
  isRTL(lang) ? 'rtl' : 'ltr';
