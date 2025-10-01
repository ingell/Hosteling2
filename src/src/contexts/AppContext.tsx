import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { LocalStorageManager } from '../../components/utils/local-storage';
import { emailService } from '../services/emailService';
import { useLanguage } from './LanguageContext';

export type UserType = 'volunteer' | 'hostel';
export type UserData = {
  id: string;
  type: UserType;
  isLoggedIn: boolean;
  profile: any;
  savedItems: any[];
  applications: any[];
  messages: any[];
  notifications: any[];
};

interface AppContextType {
  userType: UserType;
  setUserType: (type: UserType) => void;
  isLoggedIn: boolean;
  setIsLoggedIn: (loggedIn: boolean) => void;
  userData: UserData | null;
  setUserData: (data: UserData | null) => void;
  handleSignupComplete: (data: any, type: UserType) => void;
  handleLogin: (credentials: { email: string; password: string; type: UserType }) => void;
  handleLogout: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};

interface AppProviderProps {
  children: ReactNode;
}

// Dummy accounts for testing
const DUMMY_ACCOUNTS = [
  {
    id: 'volunteer_demo',
    email: 'volunteer@test.com',
    password: 'password123',
    type: 'volunteer' as UserType,
    profile: {
      firstName: 'Sarah',
      lastName: 'Johnson',
      email: 'volunteer@test.com',
      phone: '+1234567890',
      nationality: 'American',
      dateOfBirth: '1995-06-15',
      languages: ['English', 'Spanish', 'French'],
      skills: ['Social Media', 'Reception', 'Housekeeping', 'Tour Guide'],
      bio: 'Passionate traveler with 3+ years of hostel volunteering experience. Love meeting new people and helping with digital marketing!',
      availability: {
        from: '2024-01-15',
        to: '2024-06-15'
      },
      currentLocation: 'Barcelona, Spain',
      profileImage: 'https://images.unsplash.com/photo-1494790108755-2616b612b4d4?w=200&h=200&fit=crop&crop=face'
    }
  },
  {
    id: 'hostel_demo',
    email: 'hostel@test.com',
    password: 'password123',
    type: 'hostel' as UserType,
    profile: {
      hostelName: 'Barcelona Beach Hostel',
      email: 'hostel@test.com',
      contactFirstName: 'Maria',
      contactLastName: 'Garcia',
      contactPhone: '+34123456789',
      address: 'Carrer de Pelai, 22, Barcelona, Spain',
      city: 'Barcelona',
      country: 'Spain',
      description: 'A vibrant beachside hostel in the heart of Barcelona. We offer a fun, social atmosphere perfect for backpackers and digital nomads.',
      amenities: ['Free WiFi', 'Kitchen', 'Laundry', 'Bar', 'Common Area', 'Beach Access'],
      website: 'https://barcelonabeachhostel.com',
      socialMedia: {
        instagram: '@barcelonabeachhostel',
        facebook: 'Barcelona Beach Hostel'
      },
      totalBeds: 50,
      rating: 4.7,
      profileImage: 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=200&h=200&fit=crop'
    }
  }
];

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [userType, setUserType] = useState<UserType>('volunteer');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState<UserData | null>(null);

  // Load user data from localStorage on app start
  useEffect(() => {
    document.title = "Hosteling - Free Volunteer Opportunities at Hostels Worldwide";
    const storedUserData = LocalStorageManager.getUserData();
    if (storedUserData && storedUserData.isLoggedIn) {
      setUserData(storedUserData);
      setUserType(storedUserData.type);
      setIsLoggedIn(true);
      
      // Add welcome back notification
      LocalStorageManager.addNotification({
        type: "system",
        title: "Welcome back!",
        message: `Welcome back to Hosteling, ${storedUserData.type === 'volunteer' 
          ? storedUserData.profile.firstName 
          : storedUserData.profile.contactFirstName}!`,
        priority: "low"
      });
    }
  }, []);

  const handleSignupComplete = async (data: any, type: UserType) => {
    // Create user data object for localStorage
    const newUserData: UserData = {
      id: Date.now().toString(),
      type,
      isLoggedIn: true,
      profile: data,
      savedItems: [],
      applications: [],
      messages: [],
      notifications: []
    };

    // Save to localStorage
    LocalStorageManager.saveUserData(newUserData);
    
    // Add welcome notification
    LocalStorageManager.addNotification({
      type: "system",
      title: "Welcome to Hosteling!",
      message: `Your ${type} account has been created successfully. Start exploring opportunities!`,
      priority: "high"
    });

    // Send welcome email
    try {
      await emailService.sendWelcomeEmail(type, data.email, data, 'en');
    } catch (error) {
      console.error('Error sending welcome email:', error);
    }

    setUserData(newUserData);
    setUserType(type);
    setIsLoggedIn(true);
  };

  const handleLogin = (credentials: { email: string; password: string; type: UserType }) => {
    // First check dummy accounts
    const dummyAccount = DUMMY_ACCOUNTS.find(account => 
      account.email === credentials.email && 
      account.password === credentials.password &&
      account.type === credentials.type
    );

    if (dummyAccount) {
      // Create user data from dummy account
      const userData: UserData = {
        id: dummyAccount.id,
        type: dummyAccount.type,
        isLoggedIn: true,
        profile: dummyAccount.profile,
        savedItems: [],
        applications: [],
        messages: [],
        notifications: []
      };

      LocalStorageManager.saveUserData(userData);
      
      LocalStorageManager.addNotification({
        type: "system",
        title: "Welcome back!",
        message: `Successfully logged in to your ${credentials.type} account.`,
        priority: "medium"
      });

      setUserData(userData);
      setUserType(credentials.type);
      setIsLoggedIn(true);
      return;
    }

    // Check if user exists in localStorage
    const existingUserData = LocalStorageManager.getUserData();
    
    if (existingUserData && 
        existingUserData.profile.email === credentials.email && 
        existingUserData.type === credentials.type) {
      
      // User exists, log them in
      const updatedUserData = { ...existingUserData, isLoggedIn: true };
      LocalStorageManager.saveUserData(updatedUserData);
      
      LocalStorageManager.addNotification({
        type: "system",
        title: "Welcome back!",
        message: `Successfully logged in to your ${credentials.type} account.`,
        priority: "medium"
      });

      setUserData(updatedUserData);
      setUserType(credentials.type);
      setIsLoggedIn(true);
    } else {
      // User doesn't exist or wrong credentials
      LocalStorageManager.addNotification({
        type: "error",
        title: "Login Failed",
        message: "Invalid email or password. Please check your credentials or sign up. Try the demo accounts: volunteer@test.com / hostel@test.com with password 'password123'",
        priority: "high"
      });
    }
  };

  const handleLogout = () => {
    LocalStorageManager.clearUserData();
    setUserData(null);
    setIsLoggedIn(false);
  };

  const value = {
    userType,
    setUserType,
    isLoggedIn,
    setIsLoggedIn,
    userData,
    setUserData,
    handleSignupComplete,
    handleLogin,
    handleLogout,
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};