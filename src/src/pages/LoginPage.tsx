import React from 'react';
import { useNavigate } from 'react-router-dom';
import { LoginFlow } from '../../components/login-flow';
import { useAppContext } from '../contexts/AppContext';

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { handleLogin, isLoggedIn } = useAppContext();

  // Redirect to dashboard if already logged in
  React.useEffect(() => {
    if (isLoggedIn) {
      navigate('/dashboard');
    }
  }, [isLoggedIn, navigate]);

  const onLogin = (credentials: { email: string; password: string; type: 'volunteer' | 'hostel' }) => {
    handleLogin(credentials);
    if (credentials) {
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