import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface AdminUser {
  id: string;
  username: string;
  role: 'super_admin' | 'admin' | 'moderator';
  permissions: string[];
}

interface AdminContextType {
  isAdminLoggedIn: boolean;
  adminUser: AdminUser | null;
  adminLogin: (username: string, password: string) => boolean;
  adminLogout: () => void;
  hasPermission: (permission: string) => boolean;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (context === undefined) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
};

// Demo admin accounts for development
const ADMIN_ACCOUNTS = [
  {
    id: 'admin_1',
    username: 'admin',
    password: 'admin123',
    role: 'super_admin' as const,
    permissions: [
      'view_users',
      'edit_users',
      'delete_users',
      'view_hostels',
      'edit_hostels',
      'delete_hostels',
      'send_emails',
      'view_analytics',
      'manage_admins',
    ],
  },
  {
    id: 'mod_1',
    username: 'moderator',
    password: 'mod123',
    role: 'moderator' as const,
    permissions: [
      'view_users',
      'view_hostels',
      'send_emails',
      'view_analytics',
    ],
  },
];

interface AdminProviderProps {
  children: ReactNode;
}

export const AdminProvider: React.FC<AdminProviderProps> = ({ children }) => {
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [adminUser, setAdminUser] = useState<AdminUser | null>(null);

  // Load admin session from localStorage on app start
  useEffect(() => {
    const savedAdminSession = localStorage.getItem('hosteling-admin-session');
    if (savedAdminSession) {
      try {
        const session = JSON.parse(savedAdminSession);
        if (session.expiresAt > Date.now()) {
          setAdminUser(session.user);
          setIsAdminLoggedIn(true);
        } else {
          // Session expired
          localStorage.removeItem('hosteling-admin-session');
        }
      } catch (error) {
        console.error('Error loading admin session:', error);
        localStorage.removeItem('hosteling-admin-session');
      }
    }
  }, []);

  const adminLogin = (username: string, password: string): boolean => {
    const adminAccount = ADMIN_ACCOUNTS.find(
      (account) => account.username === username && account.password === password
    );

    if (adminAccount) {
      const user: AdminUser = {
        id: adminAccount.id,
        username: adminAccount.username,
        role: adminAccount.role,
        permissions: adminAccount.permissions,
      };

      setAdminUser(user);
      setIsAdminLoggedIn(true);

      // Save session to localStorage (expires in 8 hours)
      const session = {
        user,
        expiresAt: Date.now() + 8 * 60 * 60 * 1000, // 8 hours
      };
      localStorage.setItem('hosteling-admin-session', JSON.stringify(session));

      return true;
    }

    return false;
  };

  const adminLogout = () => {
    setAdminUser(null);
    setIsAdminLoggedIn(false);
    localStorage.removeItem('hosteling-admin-session');
  };

  const hasPermission = (permission: string): boolean => {
    if (!adminUser) return false;
    return adminUser.permissions.includes(permission);
  };

  const value = {
    isAdminLoggedIn,
    adminUser,
    adminLogin,
    adminLogout,
    hasPermission,
  };

  return <AdminContext.Provider value={value}>{children}</AdminContext.Provider>;
};