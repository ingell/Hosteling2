import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom"; // Added import for useLocation
import { Button } from "../../components/ui/button";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../components/ui/avatar";
import { Badge } from "../../components/ui/badge";
import { Users, MessageCircle, Bell, Shield, ArrowLeft } from "lucide-react"; // Added import for ArrowLeft
import { useAppContext } from "../contexts/AppContext";
import { useLanguage } from "../contexts/LanguageContext";
import { useAdmin } from "../contexts/AdminContext";
import { LanguageSwitcher } from "../components/LanguageSwitcher";

interface HeaderProps {
  variant?: "default" | "minimal";
}

export const Header: React.FC<HeaderProps> = ({ variant = "default" }) => {
  const navigate = useNavigate();
  const location = useLocation(); // Get the current location
  const { isLoggedIn, handleLogout, userData } = useAppContext();
  const { t } = useLanguage();
  const { isAdminLoggedIn } = useAdmin();

  const handleLogoutClick = () => {
    handleLogout();
    navigate("/");
  };

  const handleBackClick = () => {
    navigate(-1); // Navigate to the previous page
  };

  const isOnMainPage = location.pathname === "/"; // Check if the user is on the main page

  // Helper function to get user display name
  const getUserDisplayName = (userData: any) => {
    if (!userData) return "User";
    if (userData.type === "volunteer") {
      return `${userData.profile.firstName} ${userData.profile.lastName}`;
    } else {
      return userData.profile.hostelName;
    }
  };

  return (
    <header className="border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <Link
              to={isLoggedIn ? "/dashboard" : "/"}
              className="flex items-center space-x-2"
            >
              <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-lg flex items-center justify-center">
                <Users className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl">Hosteling</span>
            </Link>

            {/* Back Button */}
            {!isOnMainPage && (
              <Button variant="ghost" size="sm" onClick={handleBackClick}>
                <ArrowLeft className="w-5 h-5" />
              </Button>
            )}
          </div>

          {variant === "default" && (
            <nav className="hidden md:flex items-center space-x-4">
              {isLoggedIn ? (
                <>
                  <Button variant="ghost" asChild>
                    <Link to="/dashboard">{t("header.dashboard")}</Link>
                  </Button>
                  <Button variant="ghost" asChild>
                    <Link to="/browse">{t("header.browse")}</Link>
                  </Button>
                  <Button variant="ghost" asChild>
                    <Link to="/volunteer-community">
                      {t("header.community")}
                    </Link>
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
                          src={userData?.profile.profileImage}
                          alt={getUserDisplayName(userData)}
                        />
                        <AvatarFallback>
                          {getUserDisplayName(userData)
                            .substring(0, 2)
                            .toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-sm font-medium">
                        {getUserDisplayName(userData)}
                      </span>
                    </div>

                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleLogoutClick}
                    >
                      {t("header.logout")}
                    </Button>
                  </div>
                </>
              ) : (
                <>
                  <Button variant="ghost" asChild>
                    <Link to="/how-it-works">{t("header.howItWorks")}</Link>
                  </Button>
                  <Button variant="ghost" asChild>
                    <Link to="/for-hostels">{t("header.forHostels")}</Link>
                  </Button>
                  <Button variant="ghost" asChild>
                    <Link to="/login">{t("header.login")}</Link>
                  </Button>
                  <Button
                    asChild
                    className="bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white"
                  >
                    <Link to="/signup">{t("header.signup")}</Link>
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
                    {t("header.admin")}
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
