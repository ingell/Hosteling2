import React from 'react';
import { Link } from 'react-router-dom';
import { LoginForm } from '../components/LoginForm';
import { useLanguage } from '../../../shared/contexts/LanguageContext';

export function LoginPage() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h1 className="text-3xl mb-2 text-orange-600">Hosteling</h1>
          <p className="text-gray-600">{t('login.welcomeBack')}</p>
        </div>
        
        <LoginForm />
        
        <div className="text-center space-y-2">
          <p className="text-sm text-gray-600">
            {t('login.noAccount')}{' '}
            <Link to="/signup" className="text-orange-600 hover:text-orange-500">
              {t('login.signUpHere')}
            </Link>
          </p>
          <Link to="/forgot-password" className="text-sm text-orange-600 hover:text-orange-500">
            {t('login.forgotPassword')}
          </Link>
        </div>
      </div>
    </div>
  );
}