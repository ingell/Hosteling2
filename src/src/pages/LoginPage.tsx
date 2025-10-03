import React from 'react';
import { useNavigate } from 'react-router-dom';
import { LoginFlow } from '../../components/login-flow';
import { useApp } from '../shared/contexts/AppContext';

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { login, isLoggedIn } = useApp();

  // Redirect to dashboard if already logged in
  React.useEffect(() => {
    if (isLoggedIn) {
      navigate('/dashboard');
    }
  }, [isLoggedIn, navigate]);

  const onLogin = async (credentials: { email: string; password: string; type: 'volunteer' | 'hostel' }) => {
    const success = await login(credentials.email, credentials.password);
    if (success) {
      navigate('/dashboard');
    }
  };

  const onBack = () => {
    navigate('/');
  };

  const onSignupRedirect = () => {
    navigate('/signup');
  };

  return (
    <LoginFlow 
      onLogin={onLogin}
      onBack={onBack}
      onSignupRedirect={onSignupRedirect}
    />
  );
};