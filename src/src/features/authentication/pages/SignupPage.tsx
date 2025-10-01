import React from 'react';
import { Link } from 'react-router-dom';
import { SignupForm } from '../components/SignupForm';
import { useLanguage } from '../../../shared/contexts/LanguageContext';

export function SignupPage() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h1 className="text-3xl mb-2 text-orange-600">Hosteling</h1>
          <p className="text-gray-600">{t('signup.joinCommunity')}</p>
        </div>
        
        <SignupForm />
        
        <div className="text-center">
          <p className="text-sm text-gray-600">
            {t('signup.alreadyHaveAccount')}{' '}
            <Link to="/login" className="text-orange-600 hover:text-orange-500">
              {t('signup.signInHere')}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}