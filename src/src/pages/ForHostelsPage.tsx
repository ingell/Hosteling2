import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ForHostels } from '../../components/for-hostels';

export const ForHostelsPage: React.FC = () => {
  const navigate = useNavigate();

  const handleSignupClick = () => {
    navigate('/signup');
  };

  return <ForHostels onSignupClick={handleSignupClick} />;
};