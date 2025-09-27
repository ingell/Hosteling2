import React, { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Separator } from "./ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { LocalStorageManager } from "./utils/local-storage";
import { Bell, CheckCheck, Trash2, UserCheck, MessageSquare, Star, Calendar, MapPin, Heart } from "lucide-react";

interface NotificationsProps {
  onBack: () => void;
  userType: 'volunteer' | 'hostel';
}

// Mock notifications data
const mockNotifications = [
  {
    id: "1",
    type: "application",
    title: "New Application Received",
    message: "Sarah Chen applied for the Social Media position at your hostel",
    timestamp: "2024-11-20T11:30:00Z",
    read: false,
    actionUrl: "/applications/1",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b4d4?w=40&h=40&fit=crop&crop=face",
    priority: "high"
  },
  {
    id: "2", 
    type: "message",
    title: "New Message",
    message: "Jake Morrison sent you a message about the reception position",
    timestamp: "2024-11-20T10:15:00Z",
    read: false,
    actionUrl: "/messages/2",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face",
    priority: "medium"
  },
  {
    id: "3",
    type: "review",
    title: "New Review Received", 
    message: "Maria Santos left you a 5-star review for her recent stay",
    timestamp: "2024-11-20T09:45:00Z",
    read: true,
    actionUrl: "/reviews/3",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=40&h=40&fit=crop&crop=face",
    priority: "low"
  },
  {
    id: "4",
    type: "application_status",
    title: "Application Update",
    message: "Your application to Beach Paradise Hostel has been accepted!",
    timestamp: "2024-11-20T08:30:00Z", 
    read: false,
    actionUrl: "/applications/4",
    avatar: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=40&h=40&fit=crop",
    priority: "high"
  },
  {
    id: "5",
    type: "reminder",
    title: "Profile Reminder",
    message: "Complete your profile to get more visibility from hostels",
    timestamp: "2024-11-20T07:00:00Z",
    read: true,
    actionUrl: "/profile",
    avatar: null,
    priority: "low"
  },
  {
    id: "6",
    type: "volunteer_interest", 
    title: "Volunteer Interested",
    message: "Alex Rivera is interested in your hostel and wants to connect",
    timestamp: "2024-11-19T16:20:00Z",
    read: true,
    actionUrl: "/volunteers/6",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face",
    priority: "medium"
  },
  {
    id: "7",
    type: "system",
    title: "Platform Update",
    message: "New features added: Enhanced messaging and improved search filters",
    timestamp: "2024-11-19T12:00:00Z",
    read: true,
    actionUrl: "/updates",
    avatar: null,
    priority: "low"
  }
];

export function Notifications({ onBack, userType }: NotificationsProps) {
  const [notifications, setNotifications] = useState(mockNotifications);
  const [filter, setFilter] = useState<'all' | 'unread' | 'important'>('all');

  // Load notifications from localStorage on mount
  useEffect(() => {
    const storedNotifications = LocalStorageManager.getNotifications();
    if (storedNotifications.length > 0) {
      // In a real app, you'd merge stored notifications with mock data
      console.log("Stored notifications:", storedNotifications);
    }
  }, []);

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'application':
        return <UserCheck className="w-5 h-5 text-blue-500" />;
      case 'message':
        return <MessageSquare className="w-5 h-5 text-green-500" />;
      case 'review':
        return <Star className="w-5 h-5 text-yellow-500" />;
      case 'application_status':
        return <CheckCheck className="w-5 h-5 text-purple-500" />;
      case 'reminder':
        return <Calendar className="w-5 h-5 text-orange-500" />;
      case 'volunteer_interest':
        return <Heart className="w-5 h-5 text-red-500" />;
      case 'system':
        return <Bell className="w-5 h-5 text-gray-500" />;
      default:
        return <Bell className="w-5 h-5 text-gray-500" />;
    }
  };

  const markAsRead = (notificationId: string) => {
    setNotifications(prev => prev.map(notif => 
      notif.id === notificationId ? { ...notif, read: true } : notif
    ));
    LocalStorageManager.markNotificationAsRead(notificationId);
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(notif => ({ ...notif, read: true })));
    notifications.forEach(notif => {
      if (!notif.read) {
        LocalStorageManager.markNotificationAsRead(notif.id);
      }
    });
  };

  const deleteNotification = (notificationId: string) => {
    setNotifications(prev => prev.filter(notif => notif.id !== notificationId));
    // In a real app, you'd also remove from localStorage
  };

  const filteredNotifications = notifications.filter(notif => {
    switch (filter) {
      case 'unread':
        return !notif.read;
      case 'important':
        return notif.priority === 'high' || notif.priority === 'medium';
      default:
        return true;
    }
  });

  const unreadCount = notifications.filter(notif => !notif.read).length;

  const formatTimeAgo = (timestamp: string) => {
    const now = new Date();
    const time = new Date(timestamp);
    const diffInMinutes = Math.floor((now.getTime() - time.getTime()) / (1000 * 60));

    if (diffInMinutes < 1) return 'just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <Button variant="ghost" onClick={onBack}>
                ← Back to Dashboard
              </Button>
              <div className="flex items-center space-x-3 mt-2">
                <h1 className="text-2xl">Notifications</h1>
                {unreadCount > 0 && (
                  <Badge className="bg-primary text-primary-foreground">
                    {unreadCount} new
                  </Badge>
                )}
              </div>
              <p className="text-muted-foreground">Stay updated with your volunteer journey</p>
            </div>
            {unreadCount > 0 && (
              <Button variant="outline" onClick={markAllAsRead}>
                <CheckCheck className="w-4 h-4 mr-2" />
                Mark all read
              </Button>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6">
        {/* Filter Tabs */}
        <Tabs value={filter} onValueChange={(value) => setFilter(value as 'all' | 'unread' | 'important')} className="mb-6">
          <TabsList>
            <TabsTrigger value="all">All ({notifications.length})</TabsTrigger>
            <TabsTrigger value="unread">Unread ({unreadCount})</TabsTrigger>
            <TabsTrigger value="important">
              Important ({notifications.filter(n => n.priority === 'high' || n.priority === 'medium').length})
            </TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Notifications List */}
        <div className="space-y-2">
          {filteredNotifications.map((notification, index) => (
            <Card 
              key={notification.id} 
              className={`hover:shadow-md transition-shadow cursor-pointer ${
                !notification.read ? 'border-l-4 border-l-primary bg-primary/5' : ''
              }`}
              onClick={() => markAsRead(notification.id)}
            >
              <CardContent className="p-4">
                <div className="flex items-start space-x-4">
                  {/* Icon/Avatar */}
                  <div className="flex-shrink-0">
                    {notification.avatar ? (
                      <Avatar className="w-10 h-10">
                        <AvatarImage src={notification.avatar} alt="Avatar" />
                        <AvatarFallback>{notification.title.substring(0, 2).toUpperCase()}</AvatarFallback>
                      </Avatar>
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                        {getNotificationIcon(notification.type)}
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <h3 className={`text-sm ${!notification.read ? 'font-semibold' : 'font-medium'}`}>
                            {notification.title}
                          </h3>
                          {!notification.read && (
                            <div className="w-2 h-2 bg-primary rounded-full"></div>
                          )}
                          {notification.priority === 'high' && (
                            <Badge variant="destructive" className="text-xs px-1.5 py-0.5">
                              Urgent
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">
                          {notification.message}
                        </p>
                        <p className="text-xs text-muted-foreground mt-2">
                          {formatTimeAgo(notification.timestamp)}
                        </p>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center space-x-2 ml-4">
                        {!notification.read && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              markAsRead(notification.id);
                            }}
                          >
                            <CheckCheck className="w-4 h-4" />
                          </Button>
                        )}
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteNotification(notification.id);
                          }}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredNotifications.length === 0 && (
          <div className="text-center py-12">
            <Bell className="w-12 h-12 mx-auto mb-4 text-muted-foreground opacity-50" />
            <h3 className="text-lg mb-2">
              {filter === 'all' ? 'No notifications yet' :
               filter === 'unread' ? 'All caught up!' :
               'No important notifications'}
            </h3>
            <p className="text-muted-foreground">
              {filter === 'all' 
                ? "You'll receive notifications about applications, messages, and updates here"
                : filter === 'unread' 
                ? "You've read all your notifications"
                : "No high-priority notifications at the moment"
              }
            </p>
          </div>
        )}

        {/* Quick Actions */}
        {notifications.length > 0 && (
          <Card className="mt-8">
            <CardHeader>
              <CardTitle className="text-lg">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Button variant="outline" className="justify-start">
                  <MessageSquare className="w-4 h-4 mr-2" />
                  View Messages
                </Button>
                <Button variant="outline" className="justify-start">
                  <UserCheck className="w-4 h-4 mr-2" />
                  {userType === 'volunteer' ? 'My Applications' : 'View Applications'}
                </Button>
                <Button variant="outline" className="justify-start">
                  <Star className="w-4 h-4 mr-2" />
                  Reviews & Ratings
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}