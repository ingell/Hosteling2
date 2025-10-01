import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from '../types';
import { authService } from '../../features/authentication/services/authService';

export type UserType = 'volunteer' | 'hostel';

interface AppContextType {
  userType: UserType;
  setUserType: (type: UserType) => void;
  isLoggedIn: boolean;
  setIsLoggedIn: (loggedIn: boolean) => void;
  currentUser: User | null;
  setCurrentUser: (user: User | null) => void;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (data: any) => Promise<boolean>;
  logout: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [userType, setUserType] = useState<UserType>('volunteer');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  // Load user data on app start
  useEffect(() => {
    document.title = "Hosteling - Free Volunteer Opportunities at Hostels Worldwide";
    const user = authService.getCurrentUser();
    if (user) {
      setCurrentUser(user);
      setUserType(user.userType);
      setIsLoggedIn(true);
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const user = await authService.login({ email, password });
      if (user) {
        setCurrentUser(user);
        setUserType(user.userType);
        setIsLoggedIn(true);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const signup = async (data: any): Promise<boolean> => {
    try {
      const user = await authService.signup(data);
      if (user) {
        setCurrentUser(user);
        setUserType(user.userType);
        setIsLoggedIn(true);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Signup error:', error);
      return false;
    }
  };

  const logout = () => {
    authService.logout();
    setCurrentUser(null);
    setIsLoggedIn(false);
  };

  const value = {
    userType,
    setUserType,
    isLoggedIn,
    setIsLoggedIn,
    currentUser,
    setCurrentUser,
    login,
    signup,
    logout,
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};