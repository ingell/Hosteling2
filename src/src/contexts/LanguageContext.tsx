import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import enTranslations from "./translations/en.json";
import esTranslations from "./translations/es.json";

export type Language = "en" | "es";

const translationsMap = {
  en: enTranslations,
  es: esTranslations,
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({
  children,
}) => {
  const [language, setLanguage] = useState<Language>("en");

  // Load language from localStorage on app start
  useEffect(() => {
    const savedLanguage = localStorage.getItem(
      "hosteling-language"
    ) as Language;
    if (savedLanguage && (savedLanguage === "en" || savedLanguage === "es")) {
      setLanguage(savedLanguage);
    }
  }, []);

  // Save language to localStorage when it changes
  useEffect(() => {
    localStorage.setItem("hosteling-language", language);
  }, [language]);

  const t = (key: string): string => {
    const translations = translationsMap[language];
    const translation = translations[key];
    if (translation) {
      return translation;
    }
    // Return the key if translation is not found (for development)
    console.warn(`Translation missing for key: ${key}`);
    return key;
  };

  const value = {
    language,
    setLanguage,
    t,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};
