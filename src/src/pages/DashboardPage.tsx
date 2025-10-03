import React from 'react';
import { LoggedInView } from '../../components/logged-in-view';
import { useApp } from '../shared/contexts/AppContext';

export const DashboardPage: React.FC = () => {
  const { userType, logout } = useApp();

  return (
    <LoggedInView 
      userType={userType}
      onLogout={logout}
    />
  );
};