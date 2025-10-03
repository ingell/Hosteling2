import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type Language = 'en' | 'es';

interface Translations {
  [key: string]: {
    en: string;
    es: string;
  };
}

const translations: Translations = {
  // Common
  'common.email': { en: 'Email', es: 'Correo electrónico' },
  'common.password': { en: 'Password', es: 'Contraseña' },
  'common.name': { en: 'Name', es: 'Nombre' },
  'common.location': { en: 'Location', es: 'Ubicación' },
  'common.volunteer': { en: 'Volunteer', es: 'Voluntario' },
  'common.hostel': { en: 'Hostel', es: 'Albergue' },
  'common.loading': { en: 'Loading...', es: 'Cargando...' },
  'common.save': { en: 'Save', es: 'Guardar' },
  'common.cancel': { en: 'Cancel', es: 'Cancelar' },
  
  // Login
  'login.title': { en: 'Sign in to your account', es: 'Inicia sesión en tu cuenta' },
  'login.description': { en: 'Welcome back! Please sign in to continue.', es: '¡Bienvenido de nuevo! Por favor inicia sesión para continuar.' },
  'login.emailPlaceholder': { en: 'Enter your email', es: 'Ingresa tu correo electrónico' },
  'login.passwordPlaceholder': { en: 'Enter your password', es: 'Ingresa tu contraseña' },
  'login.signIn': { en: 'Sign In', es: 'Iniciar Sesión' },
  'login.welcomeBack': { en: 'Welcome back to Hosteling', es: 'Bienvenido de nuevo a Hosteling' },
  'login.noAccount': { en: "Don't have an account?", es: '¿No tienes una cuenta?' },
  'login.signUpHere': { en: 'Sign up here', es: 'Regístrate aquí' },
  'login.forgotPassword': { en: 'Forgot your password?', es: '¿Olvidaste tu contraseña?' },
  'login.invalidCredentials': { en: 'Invalid email or password', es: 'Correo electrónico o contraseña inválidos' },
  'login.error': { en: 'An error occurred during login', es: 'Ocurrió un error durante el inicio de sesión' },
  
  // Signup
  'signup.title': { en: 'Create your account', es: 'Crea tu cuenta' },
  'signup.description': { en: 'Join the Hosteling community today!', es: '¡Únete a la comunidad Hosteling hoy!' },
  'signup.userType': { en: 'Account Type', es: 'Tipo de Cuenta' },
  'signup.selectUserType': { en: 'Select account type', es: 'Selecciona el tipo de cuenta' },
  'signup.namePlaceholder': { en: 'Enter your full name', es: 'Ingresa tu nombre completo' },
  'signup.emailPlaceholder': { en: 'Enter your email address', es: 'Ingresa tu dirección de correo electrónico' },
  'signup.locationPlaceholder': { en: 'Enter your location', es: 'Ingresa tu ubicación' },
  'signup.passwordPlaceholder': { en: 'Create a password', es: 'Crea una contraseña' },
  'signup.confirmPassword': { en: 'Confirm Password', es: 'Confirmar Contraseña' },
  'signup.confirmPasswordPlaceholder': { en: 'Confirm your password', es: 'Confirma tu contraseña' },
  'signup.createAccount': { en: 'Create Account', es: 'Crear Cuenta' },
  'signup.joinCommunity': { en: 'Join the Hosteling community', es: 'Únete a la comunidad Hosteling' },
  'signup.alreadyHaveAccount': { en: 'Already have an account?', es: '¿Ya tienes una cuenta?' },
  'signup.signInHere': { en: 'Sign in here', es: 'Inicia sesión aquí' },
  'signup.passwordMismatch': { en: 'Passwords do not match', es: 'Las contraseñas no coinciden' },
  'signup.error': { en: 'An error occurred during signup', es: 'Ocurrió un error durante el registro' },
  
  // Header
  'header.dashboard': { en: 'Dashboard', es: 'Panel' },
  'header.browse': { en: 'Browse', es: 'Explorar' },
  'header.community': { en: 'Community', es: 'Comunidad' },
  'header.howItWorks': { en: 'How it works', es: 'Cómo funciona' },
  'header.forHostels': { en: 'For Hostels', es: 'Para Albergues' },
  'header.login': { en: 'Login', es: 'Iniciar sesión' },
  'header.signup': { en: 'Sign up', es: 'Registrarse' },
  'header.logout': { en: 'Logout', es: 'Cerrar sesión' },
  'header.admin': { en: 'Admin', es: 'Admin' },
  
  // Landing page
  'landing.hero.title': { 
    en: 'Discover the World Through Volunteering', 
    es: 'Descubre el Mundo a Través del Voluntariado' 
  },
  'landing.hero.subtitle': { 
    en: 'Connect with amazing hostels worldwide and gain unforgettable experiences while helping local communities. Work, learn, and explore like never before.',
    es: 'Conecta con albergues increíbles en todo el mundo y obtén experiencias inolvidables mientras ayudas a las comunidades locales. Trabaja, aprende y explora como nunca antes.'
  },
  'landing.hero.startVolunteering': { en: 'Start Volunteering', es: 'Comenzar Voluntariado' },

  // Footer
  'footer.about': { en: 'About', es: 'Acerca de' },
  'footer.help': { en: 'Help Center', es: 'Centro de Ayuda' },
  'footer.contact': { en: 'Contact', es: 'Contacto' },
  'footer.terms': { en: 'Terms', es: 'Términos' },
  'footer.privacy': { en: 'Privacy', es: 'Privacidad' },
  'footer.safety': { en: 'Safety Guidelines', es: 'Pautas de Seguridad' },
  'footer.copyright': { en: '© 2024 Hosteling. All rights reserved.', es: '© 2024 Hosteling. Todos los derechos reservados.' },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  // Load language from localStorage on app start
  useEffect(() => {
    const savedLanguage = localStorage.getItem('hosteling-language') as Language;
    if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'es')) {
      setLanguage(savedLanguage);
    }
  }, []);

  // Save language to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('hosteling-language', language);
  }, [language]);

  const t = (key: string): string => {
    const translation = translations[key];
    if (translation) {
      return translation[language];
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