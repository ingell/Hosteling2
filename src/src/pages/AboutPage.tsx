import React from 'react';
import { AboutPage as AboutPageComponent } from '../../components/pages/static/AboutPage';

export const AboutPage: React.FC = () => {
  const handleBack = () => {
    window.history.back();
  };
  
  return <AboutPageComponent onBack={handleBack} />;
};