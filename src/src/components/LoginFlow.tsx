import React from 'react';
import { LoginFlow as OriginalLoginFlow } from '../components/login-flow';

interface LoginFlowProps {
  onLogin: (credentials: { email: string; password: string; type: 'volunteer' | 'hostel' }) => void;
  onBack: () => void;
  onSignupRedirect: () => void;
}

export const LoginFlow: React.FC<LoginFlowProps> = (props) => {
  return <OriginalLoginFlow {...props} />;
};