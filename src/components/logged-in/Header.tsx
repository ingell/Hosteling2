import React from "react";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";
import { MessageCircle, Bell, Users } from "lucide-react";

interface HeaderProps {
  userData: any;
  unreadMessages: number;
  unreadNotifications: number;
  onMessagesClick: () => void;
  onNotificationsClick: () => void;
  onProfileClick: () => void;
  onLogout: () => void;
}

export function Header({
  userData,
  unreadMessages,
  unreadNotifications,
  onMessagesClick,
  onNotificationsClick,
  onProfileClick,
  onLogout,
}: HeaderProps) {
  return (
    <header className="border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Users className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl">Hosteling</span>
          </div>

          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              className="relative"
              onClick={onMessagesClick}
            >
              <MessageCircle className="w-4 h-4" />
              {unreadMessages > 0 && (
                <Badge className="absolute -top-1 -right-1 w-5 h-5 text-xs p-0 flex items-center justify-center bg-red-500">
                  {unreadMessages}
                </Badge>
              )}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="relative"
              onClick={onNotificationsClick}
            >
              <Bell className="w-4 h-4" />
              {unreadNotifications > 0 && (
                <Badge className="absolute -top-1 -right-1 w-5 h-5 text-xs p-0 flex items-center justify-center bg-red-500">
                  {unreadNotifications}
                </Badge>
              )}
            </Button>
            <Button variant="ghost" size="sm" onClick={onProfileClick}>
              <Avatar className="w-6 h-6 mr-2">
                <AvatarImage
                  src={userData?.profile.avatar}
                  alt={
                    userData?.profile.firstName ||
                    userData?.profile.contactFirstName
                  }
                />
                <AvatarFallback>
                  {userData?.profile.firstName?.substring(0, 2).toUpperCase() ||
                    userData?.profile.contactFirstName
                      ?.substring(0, 2)
                      .toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <span className="hidden md:inline">
                {userData?.profile.firstName ||
                  userData?.profile.contactFirstName}
              </span>
            </Button>
            <Button variant="outline" size="sm" onClick={onLogout}>
              Logout
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
