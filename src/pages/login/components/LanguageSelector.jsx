import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const LanguageSelector = () => {
  const [selectedLanguage, setSelectedLanguage] = useState('fr');
  const [isOpen, setIsOpen] = useState(false);

  const languages = [
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'ar', name: 'العربية', flag: '🇲🇦' }
  ];

  const handleLanguageChange = (languageCode) => {
    setSelectedLanguage(languageCode);
    setIsOpen(false);
    // Here you would implement actual language switching logic
    console.log('Language changed to:', languageCode);
  };

  const selectedLang = languages.find(lang => lang.code === selectedLanguage);

  return (
    <div className="relative">
      <Button
        variant="ghost"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 text-text-secondary hover:text-text-primary"
      >
        <span className="text-lg">{selectedLang?.flag}</span>
        <span className="text-sm font-medium">{selectedLang?.name}</span>
        <Icon 
          name="ChevronDown" 
          size={14} 
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
          <div className="absolute top-full right-0 mt-2 w-40 bg-surface border border-border rounded-lg shadow-elevation-3 z-300">
            <div className="py-2">
              {languages.map((language) => (
                <button
                  key={language.code}
                  onClick={() => handleLanguageChange(language.code)}
                  className={`
                    flex items-center w-full px-4 py-2 text-sm transition-colors duration-200
                    ${selectedLanguage === language.code 
                      ? 'bg-primary-50 text-primary-700' :'text-text-primary hover:bg-surface-secondary'
                    }
                  `}
                >
                  <span className="text-lg mr-3">{language.flag}</span>
                  <span className="font-medium">{language.name}</span>
                  {selectedLanguage === language.code && (
                    <Icon name="Check" size={14} className="ml-auto text-primary" />
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

export default LanguageSelector;