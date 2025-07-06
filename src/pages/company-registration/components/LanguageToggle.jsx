import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const LanguageToggle = () => {
  const [currentLanguage, setCurrentLanguage] = useState('fr');
  const [isOpen, setIsOpen] = useState(false);

  const languages = [
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'ar', name: 'العربية', flag: '🇲🇦' }
  ];

  const currentLang = languages.find(lang => lang.code === currentLanguage);

  const handleLanguageChange = (langCode) => {
    setCurrentLanguage(langCode);
    setIsOpen(false);
    // Here you would typically update the app's language context console.log('Language changed to:', langCode);
  };

  return (
    <div className="relative">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2"
      >
        <span className="text-lg">{currentLang.flag}</span>
        <span className="hidden sm:block text-sm font-medium">
          {currentLang.name}
        </span>
        <Icon 
          name="ChevronDown" 
          size={16} 
          className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
        />
      </Button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 z-200" 
            onClick={() => setIsOpen(false)}
          />
          
          {/* Dropdown Menu */}
          <div className="absolute right-0 top-full mt-2 w-40 bg-surface border border-border rounded-lg shadow-elevation-3 z-300">
            <div className="py-2">
              {languages.map((language) => (
                <button
                  key={language.code}
                  onClick={() => handleLanguageChange(language.code)}
                  className={`
                    flex items-center w-full px-4 py-2 text-sm transition-colors duration-200
                    ${currentLanguage === language.code 
                      ? 'bg-primary-50 text-primary font-medium' :'text-text-primary hover:bg-surface-secondary'
                    }
                  `}
                >
                  <span className="mr-3 text-lg">{language.flag}</span>
                  <span>{language.name}</span>
                  {currentLanguage === language.code && (
                    <Icon name="Check" size={16} className="ml-auto" />
                  )}
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default LanguageToggle;