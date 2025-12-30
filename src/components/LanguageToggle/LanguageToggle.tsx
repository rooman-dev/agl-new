import { FC } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import './LanguageToggle.css';

const LanguageToggle: FC = () => {
  const { language, toggleLanguage } = useLanguage();
  const isArabic = language === 'ar';

  return (
    <label className="language-toggle">
      <input
        type="checkbox"
        checked={isArabic}
        onChange={toggleLanguage}
        aria-label="Toggle language"
      />
      <span className="toggle-slider">
        <span className="toggle-label-text toggle-label-en">EN</span>
        <span className="toggle-label-text toggle-label-ar">العربية</span>
      </span>
    </label>
  );
};

export default LanguageToggle;
