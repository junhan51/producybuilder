import { useState, useRef, useEffect } from 'react';
import { useLanguage } from '../i18n/LanguageContext';

const LanguageSelector = () => {
  const { language, setLanguage, languageNames } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const languages = ['en', 'zh', 'ko', 'de', 'es'] as const;

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-colors text-sm font-bold text-slate-300"
      >
        <span className="material-symbols-outlined text-lg">language</span>
        <span className="hidden sm:inline">{languageNames[language]}</span>
        <span className="material-symbols-outlined text-sm">
          {isOpen ? 'expand_less' : 'expand_more'}
        </span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-40 py-2 glass-card rounded-xl border border-white/10 shadow-2xl z-50">
          {languages.map((lang) => (
            <button
              key={lang}
              onClick={() => {
                setLanguage(lang);
                setIsOpen(false);
              }}
              className={`w-full px-4 py-2.5 text-left text-sm font-medium transition-colors flex items-center gap-2 ${
                language === lang
                  ? 'bg-primary/20 text-primary'
                  : 'text-slate-300 hover:bg-white/5 hover:text-white'
              }`}
            >
              {language === lang && (
                <span className="material-symbols-outlined text-sm">check</span>
              )}
              <span className={language !== lang ? 'ml-6' : ''}>{languageNames[lang]}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageSelector;
