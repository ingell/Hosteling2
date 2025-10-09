import React from 'react';
import { useNavigate } from 'react-router-dom';
import { HowItWorks } from '../../../components/pages/landing/how-it-works';

export const HowItWorksPage: React.FC = () => {
  const navigate = useNavigate();

  const handleSignupClick = () => {
    navigate('/signup');
  };

  return <HowItWorks onSignupClick={handleSignupClick} />;
};