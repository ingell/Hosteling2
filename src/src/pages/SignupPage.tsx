import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SignupChoice } from '../../components/signup-choice';
import { SignupFlow } from '../../components/signup-flow';
import { HostelSignupFlow } from '../../components/hostel-signup-flow';
import { useAppContext } from '../contexts/AppContext';

type SignupStep = 'choice' | 'volunteer-signup' | 'hostel-signup';

export const SignupPage: React.FC = () => {
  const navigate = useNavigate();
  const { handleSignupComplete, isLoggedIn } = useAppContext();
  const [currentStep, setCurrentStep] = useState<SignupStep>('choice');

  // Redirect to dashboard if already logged in
  React.useEffect(() => {
    if (isLoggedIn) {
      navigate('/dashboard');
    }
  }, [isLoggedIn, navigate]);

  const onChoice = (type: 'volunteer' | 'hostel') => {
    if (type === 'volunteer') {
      setCurrentStep('volunteer-signup');
    } else {
      setCurrentStep('hostel-signup');
    }
  };

  const onSignupComplete = (data: any, type: 'volunteer' | 'hostel') => {
    handleSignupComplete(data, type);
    navigate('/dashboard');
  };

  const onBack = () => {
    if (currentStep === 'choice') {
      navigate('/');
    } else {
      setCurrentStep('choice');
    }
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 'choice':
        return <SignupChoice onChoice={onChoice} onBack={onBack} />;
      case 'volunteer-signup':
        return <SignupFlow onComplete={(data) => onSignupComplete(data, 'volunteer')} onBack={onBack} />;
      case 'hostel-signup':
        return <HostelSignupFlow onComplete={(data) => onSignupComplete(data, 'hostel')} onBack={onBack} />;
      default:
        return <SignupChoice onChoice={onChoice} onBack={onBack} />;
    }
  };

  return renderCurrentStep();
};