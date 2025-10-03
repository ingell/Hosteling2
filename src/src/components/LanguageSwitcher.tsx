import React from 'react';
import { Button } from '../shared/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../shared/ui/dropdown-menu';
import { Globe } from 'lucide-react';
import { useLanguage, Language } from '../shared/contexts/LanguageContext';

const LANGUAGES = [
  { code: 'en' as Language, name: 'English', flag: '🇺🇸' },
  { code: 'es' as Language, name: 'Español', flag: '🇪🇸' },
];

export const LanguageSwitcher: React.FC = () => {
  const { language, setLanguage } = useLanguage();

  const currentLanguage = LANGUAGES.find(lang => lang.code === language);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="flex items-center space-x-2">
          <Globe className="w-4 h-4" />
          <span className="text-sm">{currentLanguage?.flag} {currentLanguage?.code.toUpperCase()}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {LANGUAGES.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => setLanguage(lang.code)}
            className={`flex items-center space-x-2 ${language === lang.code ? 'bg-orange-50' : ''}`}
          >
            <span>{lang.flag}</span>
            <span>{lang.name}</span>
            {language === lang.code && (
              <span className="ml-auto text-orange-500">✓</span>
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};