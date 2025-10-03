import React from 'react';
import { Terms } from '../../components/terms';

export const TermsPage: React.FC = () => {
  const handleBack = () => {
    window.history.back();
  };
  
  return <Terms onBack={handleBack} />;
};