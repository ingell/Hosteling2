import React from 'react';
import { LoggedInView } from '../../components/logged-in-view';
import { useAppContext } from '../contexts/AppContext';

export const DashboardPage: React.FC = () => {
  const { userType, handleLogout } = useAppContext();

  return (
    <LoggedInView 
      userType={userType}
      onLogout={handleLogout}
    />
  );
};