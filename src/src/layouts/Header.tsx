import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '../../components/ui/avatar';
import { Badge } from '../../components/ui/badge';
import { Users, MessageCircle, Bell, Shield } from 'lucide-react';
import { useApp } from '../shared/contexts/AppContext';
import { useLanguage } from '../shared/contexts/LanguageContext';
import { useAdmin } from '../contexts/AdminContext';
import { LanguageSwitcher } from '../components/LanguageSwitcher';
import hostelingLogo from 'figma:asset/bbf68b3edaa3adc76aa448f54dec7f61afe7db87.png';

interface HeaderProps {
  variant?: 'default' | 'minimal';
}

export const Header: React.FC<HeaderProps> = ({ variant = 'default' }) => {
  const navigate = useNavigate();
  const { isLoggedIn, logout, currentUser } = useApp();
  const { t } = useLanguage();
  const { isAdminLoggedIn } = useAdmin();

  const handleLogoutClick = () => {
    logout();
    navigate('/');
  };

  // Helper function to get user display name
  const getUserDisplayName = (user: any) => {
    if (!user) return 'User';
    return user.name || 'User';
  };

  return (
    <header className="border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center">
            <img 
              src={hostelingLogo} 
              alt="Hosteling - Work. stay. belong. live local." 
              className="h-10 w-auto hover:opacity-90 transition-opacity"
            />
          </Link>
          
          {variant === 'default' && (
            <nav className="hidden md:flex items-center space-x-4">
              {isLoggedIn ? (
                <>
                  <Button variant="ghost" asChild>
                    <Link to="/dashboard">{t('header.dashboard')}</Link>
                  </Button>
                  <Button variant="ghost" asChild>
                    <Link to="/browse">{t('header.browse')}</Link>
                  </Button>
                  <Button variant="ghost" asChild>
                    <Link to="/volunteer-community">{t('header.community')}</Link>
                  </Button>
                  
                  <div className="flex items-center space-x-2">
                    <Button variant="ghost" size="sm" className="relative">
                      <MessageCircle className="w-4 h-4" />
                      <Badge className="absolute -top-1 -right-1 w-5 h-5 text-xs p-0 flex items-center justify-center bg-red-500">
                        2
                      </Badge>
                    </Button>
                    
                    <Button variant="ghost" size="sm" className="relative">
                      <Bell className="w-4 h-4" />
                      <Badge className="absolute -top-1 -right-1 w-5 h-5 text-xs p-0 flex items-center justify-center bg-red-500">
                        3
                      </Badge>
                    </Button>
                    
                    <div className="flex items-center space-x-2 ml-2">
                      <Avatar className="w-8 h-8">
                        <AvatarImage 
                          src={currentUser?.profileImage} 
                          alt={getUserDisplayName(currentUser)} 
                        />
                        <AvatarFallback>
                          {getUserDisplayName(currentUser).substring(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-sm font-medium">
                        {getUserDisplayName(currentUser)}
                      </span>
                    </div>
                    
                    <Button variant="outline" size="sm" onClick={handleLogoutClick}>
                      {t('header.logout')}
                    </Button>
                  </div>
                </>
              ) : (
                <>
                  <Button variant="ghost" asChild>
                    <Link to="/how-it-works">{t('header.howItWorks')}</Link>
                  </Button>
                  <Button variant="ghost" asChild>
                    <Link to="/for-hostels">{t('header.forHostels')}</Link>
                  </Button>
                  <Button variant="ghost" asChild>
                    <Link to="/login">{t('header.login')}</Link>
                  </Button>
                  <Button 
                    asChild
                    className="bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white"
                  >
                    <Link to="/signup">{t('header.signup')}</Link>
                  </Button>
                </>
              )}
              
              {/* Language Switcher */}
              <LanguageSwitcher />
              
              {/* Admin Link */}
              {isAdminLoggedIn ? (
                <Button variant="ghost" size="sm" asChild>
                  <Link to="/admin/dashboard" className="text-red-600">
                    <Shield className="w-4 h-4 mr-1" />
                    {t('header.admin')}
                  </Link>
                </Button>
              ) : (
                <Button variant="ghost" size="sm" asChild>
                  <Link to="/admin/login" className="text-gray-500">
                    <Shield className="w-4 h-4" />
                  </Link>
                </Button>
              )}
            </nav>
          )}
        </div>
      </div>
    </header>
  );
};