import React, { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { VolunteerProfile } from "./volunteer-profile";
import { HostelProfile } from "./hostel-profile";
import { EditVolunteerProfile } from "./edit-volunteer-profile";
import { EditHostelProfile } from "./edit-hostel-profile";
import { BrowseHostels } from "./browse-hostels";
import { BrowseVolunteers } from "./browse-volunteers";
import { Messages } from "./messages";
import { Notifications } from "./notifications";
import { VolunteerRequests } from "./volunteer-requests";
import { LocalStorageManager } from "./utils/local-storage";
import { API } from "./utils/api";
import {
  Search,
  Star,
  MessageCircle,
  Bell,
  Calendar,
  Heart,
  Users,
  BarChart3,
  TrendingUp,
  Clock,
} from "lucide-react";

interface LoggedInViewProps {
  userType: "volunteer" | "hostel";
  onLogout: () => void;
}

// Define the VolunteerRequest type based on the API response structure
type VolunteerRequest = {
  id: string;
  status: string;
  // Add other fields as needed based on the API response
};

// Helper function to get user display name
const getUserDisplayName = (userData: any) => {
  if (userData.type === "volunteer") {
    return `${userData.profile.firstName} ${userData.profile.lastName}`;
  } else {
    return userData.profile.hostelName;
  }
};

export function LoggedInView({ userType, onLogout }: LoggedInViewProps) {
  const [currentView, setCurrentView] = useState("dashboard");
  const [activeTab, setActiveTab] = useState("overview");
  const [unreadMessages, setUnreadMessages] = useState(0);
  const [unreadNotifications, setUnreadNotifications] = useState(0);
  const [userData, setUserData] = useState<any>(null);
  const [volunteerRequests, setVolunteerRequests] = useState<
    VolunteerRequest[]
  >([]);

  // Load user data from localStorage
  useEffect(() => {
    const data = LocalStorageManager.getUserData();
    setUserData(data);

    // Load volunteer requests for current user
    if (data) {
      loadVolunteerRequests(data);
    }
  }, []);

  const loadVolunteerRequests = async (userData: any) => {
    try {
      let requests: VolunteerRequest[] = [];
      if (userData.type === "volunteer") {
        requests = await API.getVolunteerRequests(userData.id);
      } else {
        requests = await API.getHostelRequests(userData.id);
      }
      setVolunteerRequests(requests);
    } catch (error) {
      console.error("Failed to load volunteer requests:", error);
    }
  };

  // Load unread counts from localStorage
  useEffect(() => {
    const messageCount = LocalStorageManager.getUnreadMessageCount();
    const notificationCount = API.getUnreadNotificationCount();
    setUnreadMessages(messageCount);
    setUnreadNotifications(notificationCount);
  }, [currentView]);

  // Handle browse hostels actions
  const handleHostelClick = (hostelId: string) => {
    // In a real app, navigate to hostel detail page
  };

  const handleApplyToHostel = (hostelId: string) => {
    // Add application to localStorage
    LocalStorageManager.addApplication({
      hostelId,
      type: "hostel_application",
      status: "pending",
    });

    // Add notification
    LocalStorageManager.addNotification({
      type: "application_status",
      title: "Application Submitted",
      message: "Your application has been submitted successfully!",
      priority: "medium",
    });

    alert("Application submitted successfully!");
  };

  // Handle browse volunteers actions
  const handleVolunteerClick = (volunteerId: string) => {
    // In a real app, navigate to volunteer detail page
  };

  const handleContactVolunteer = (volunteerId: string) => {
    // Add message to localStorage
    LocalStorageManager.addMessage({
      recipientId: volunteerId,
      content: "Hi! I'm interested in having you volunteer at our hostel.",
      type: "volunteer_contact",
    });

    // Add notification
    LocalStorageManager.addNotification({
      type: "message",
      title: "Message Sent",
      message: "Your message has been sent to the volunteer!",
      priority: "low",
    });

    alert("Message sent successfully!");
  };

  if (currentView === "volunteer-profile") {
    return (
      <VolunteerProfile
        onBack={() => setCurrentView("dashboard")}
        onEdit={() => setCurrentView("edit-volunteer-profile")}
      />
    );
  }

  if (currentView === "hostel-profile") {
    return (
      <HostelProfile
        onBack={() => setCurrentView("dashboard")}
        onEdit={() => setCurrentView("edit-hostel-profile")}
      />
    );
  }

  if (currentView === "edit-volunteer-profile") {
    return (
      <EditVolunteerProfile
        onBack={() => setCurrentView("volunteer-profile")}
        onSave={() => {
          setCurrentView("volunteer-profile");
          // Reload user data
          const data = LocalStorageManager.getUserData();
          setUserData(data);
        }}
      />
    );
  }

  if (currentView === "edit-hostel-profile") {
    return (
      <EditHostelProfile
        onBack={() => setCurrentView("hostel-profile")}
        onSave={() => {
          setCurrentView("hostel-profile");
          // Reload user data
          const data = LocalStorageManager.getUserData();
          setUserData(data);
        }}
      />
    );
  }

  if (currentView === "volunteer-requests") {
    return <VolunteerRequests onBack={() => setCurrentView("dashboard")} />;
  }

  if (currentView === "browse-hostels") {
    return (
      <BrowseHostels
        onBack={() => setCurrentView("dashboard")}
        onHostelClick={handleHostelClick}
        onApply={handleApplyToHostel}
      />
    );
  }

  if (currentView === "browse-volunteers") {
    return (
      <BrowseVolunteers
        onBack={() => setCurrentView("dashboard")}
        onVolunteerClick={handleVolunteerClick}
        onContact={handleContactVolunteer}
      />
    );
  }

  if (currentView === "messages") {
    return (
      <Messages
        onBack={() => setCurrentView("dashboard")}
        userType={userType}
      />
    );
  }

  if (currentView === "notifications") {
    return (
      <Notifications
        onBack={() => setCurrentView("dashboard")}
        userType={userType}
      />
    );
  }

  const isVolunteer = userType === "volunteer";

  if (!userData) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground mb-4">Loading your profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
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
                onClick={() => setCurrentView("messages")}
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
                onClick={() => setCurrentView("notifications")}
              >
                <Bell className="w-4 h-4" />
                {unreadNotifications > 0 && (
                  <Badge className="absolute -top-1 -right-1 w-5 h-5 text-xs p-0 flex items-center justify-center bg-red-500">
                    {unreadNotifications}
                  </Badge>
                )}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() =>
                  setCurrentView(
                    isVolunteer ? "volunteer-profile" : "hostel-profile"
                  )
                }
              >
                <Avatar className="w-6 h-6 mr-2">
                  <AvatarImage
                    src="https://images.unsplash.com/photo-1494790108755-2616b612b4d4?w=40&h=40&fit=crop&crop=face"
                    alt={userData ? getUserDisplayName(userData) : ""}
                  />
                  <AvatarFallback>
                    {userData && getUserDisplayName(userData)
                      ? getUserDisplayName(userData)
                          .substring(0, 2)
                          .toUpperCase()
                      : "U"}
                  </AvatarFallback>
                </Avatar>
                <span className="hidden md:inline">
                  {userData ? getUserDisplayName(userData) : "User"}
                </span>
              </Button>
              <Button variant="outline" size="sm" onClick={onLogout}>
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl mb-2">
            Welcome back, {userData ? getUserDisplayName(userData) : "User"}!
          </h1>
          <p className="text-muted-foreground">
            {isVolunteer
              ? "Here's what's happening with your volunteer journey"
              : "Here's what's happening at your hostel"}
          </p>
        </div>

        {/* Volunteer Dashboard */}
        {isVolunteer && (
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="opportunities">Browse</TabsTrigger>
              <TabsTrigger value="saved">Saved</TabsTrigger>
              <TabsTrigger value="applications">Applications</TabsTrigger>
              <TabsTrigger value="requests">Requests</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-2">
                      <BarChart3 className="w-5 h-5 text-primary" />
                      <div>
                        <p className="text-2xl">
                          {
                            LocalStorageManager.getApplications().filter(
                              (app) => app.status === "completed"
                            ).length
                          }
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Completed
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-2">
                      <Star className="w-5 h-5 text-yellow-500" />
                      <div>
                        <p className="text-2xl">4.8</p>
                        <p className="text-sm text-muted-foreground">Rating</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-2">
                      <Clock className="w-5 h-5 text-blue-500" />
                      <div>
                        <p className="text-2xl">-</p>
                        <p className="text-sm text-muted-foreground">
                          Days Left
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-2">
                      <Heart className="w-5 h-5 text-red-500" />
                      <div>
                        <p className="text-2xl">
                          {LocalStorageManager.getSavedItems().length}
                        </p>
                        <p className="text-sm text-muted-foreground">Saved</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                  {/* Current Volunteering */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Currently Volunteering</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
                        <div className="text-center">
                          <p className="text-muted-foreground">
                            No active volunteering positions
                          </p>
                          <p className="text-sm text-muted-foreground mt-1">
                            Apply to hostels to start your volunteer journey!
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Recommended Opportunities */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Recommended for You</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-center py-8">
                        <p className="text-muted-foreground">
                          No recommendations yet
                        </p>
                        <p className="text-sm text-muted-foreground mt-1">
                          Complete your profile to get personalized
                          recommendations!
                        </p>
                        <Button
                          className="mt-4"
                          onClick={() => setCurrentView("opportunities")}
                        >
                          Browse Opportunities
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="space-y-6">
                  {/* Recent Activity */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Recent Activity</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-center py-4">
                        <p className="text-muted-foreground">
                          No recent activity
                        </p>
                        <p className="text-sm text-muted-foreground mt-1">
                          Your volunteer activities will appear here
                        </p>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Saved Opportunities */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Saved Opportunities</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-center py-4">
                        <p className="text-muted-foreground">
                          No saved opportunities
                        </p>
                        <p className="text-sm text-muted-foreground mt-1">
                          Heart opportunities while browsing to save them here!
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="opportunities">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Browse Opportunities</CardTitle>
                    <Button onClick={() => setCurrentView("browse-hostels")}>
                      <Search className="w-4 h-4 mr-2" />
                      Browse All Hostels
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8">
                    <Search className="w-12 h-12 mx-auto mb-4 text-muted-foreground opacity-50" />
                    <h3 className="text-lg mb-2">
                      Discover Amazing Opportunities
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      Browse thousands of volunteer opportunities worldwide
                    </p>
                    <Button onClick={() => setCurrentView("browse-hostels")}>
                      Start Browsing
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="saved">
              <Card>
                <CardHeader>
                  <CardTitle>Saved Opportunities</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8">
                    <p className="text-muted-foreground">
                      No saved opportunities
                    </p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Save opportunities while browsing to see them here!
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="applications">
              <Card>
                <CardHeader>
                  <CardTitle>Your Applications</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8 text-muted-foreground">
                    <Calendar className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>No applications yet</p>
                    <p className="text-sm">
                      Your applications to hostels will appear here
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="requests">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Volunteer Requests</CardTitle>
                    <Button
                      onClick={() => setCurrentView("volunteer-requests")}
                    >
                      <MessageCircle className="w-4 h-4 mr-2" />
                      View All Requests
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8">
                    <MessageCircle className="w-12 h-12 mx-auto mb-4 text-muted-foreground opacity-50" />
                    <h3 className="text-lg mb-2">Volunteer Requests</h3>
                    <p className="text-muted-foreground mb-4">
                      Hostels that want you to volunteer will send requests here
                    </p>
                    <Button
                      onClick={() => setCurrentView("volunteer-requests")}
                    >
                      View Requests
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        )}

        {/* Hostel Dashboard */}
        {!isVolunteer && (
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="volunteers">Browse Volunteers</TabsTrigger>
              <TabsTrigger value="applications">Applications</TabsTrigger>
              <TabsTrigger value="requests">Requests</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-2">
                      <Users className="w-5 h-5 text-primary" />
                      <div>
                        <p className="text-2xl">0</p>
                        <p className="text-sm text-muted-foreground">
                          Total Volunteers
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-2">
                      <Star className="w-5 h-5 text-yellow-500" />
                      <div>
                        <p className="text-2xl">4.8</p>
                        <p className="text-sm text-muted-foreground">Rating</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-2">
                      <Clock className="w-5 h-5 text-blue-500" />
                      <div>
                        <p className="text-2xl">0</p>
                        <p className="text-sm text-muted-foreground">Current</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-2">
                      <TrendingUp className="w-5 h-5 text-green-500" />
                      <div>
                        <p className="text-2xl">
                          {LocalStorageManager.getApplications().length}
                        </p>
                        <p className="text-sm text-muted-foreground">Pending</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                  {/* Pending Applications */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Pending Applications</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-center py-8">
                        <p className="text-muted-foreground">
                          No pending applications
                        </p>
                        <p className="text-sm text-muted-foreground mt-1">
                          Applications from volunteers will appear here
                        </p>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Current Volunteers */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Current Volunteers</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-center py-8">
                        <p className="text-muted-foreground">
                          No current volunteers
                        </p>
                        <p className="text-sm text-muted-foreground mt-1">
                          Volunteers working at your hostel will appear here
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="space-y-6">
                  {/* Stats */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Quick Stats</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <div className="flex justify-between text-sm">
                          <span>Response Rate</span>
                          <span className="font-medium">95%</span>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-sm">
                          <span>Average Stay</span>
                          <span className="font-medium">6 weeks</span>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-sm">
                          <span>Repeat Volunteers</span>
                          <span className="font-medium">30%</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Recent Activity */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Recent Activity</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-center py-4">
                        <p className="text-muted-foreground">
                          No recent activity
                        </p>
                        <p className="text-sm text-muted-foreground mt-1">
                          Activity from your hostel will appear here
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="volunteers">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Find Volunteers</CardTitle>
                    <Button onClick={() => setCurrentView("browse-volunteers")}>
                      <Users className="w-4 h-4 mr-2" />
                      Browse All Volunteers
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8">
                    <Users className="w-12 h-12 mx-auto mb-4 text-muted-foreground opacity-50" />
                    <h3 className="text-lg mb-2">
                      Discover Amazing Volunteers
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      Find skilled volunteers from around the world
                    </p>
                    <Button onClick={() => setCurrentView("browse-volunteers")}>
                      Start Browsing
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="applications">
              <Card>
                <CardHeader>
                  <CardTitle>All Applications</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8">
                    <p className="text-muted-foreground">No applications yet</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Applications from volunteers will appear here
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="requests">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Volunteer Requests Sent</CardTitle>
                    <Button
                      onClick={() => setCurrentView("volunteer-requests")}
                    >
                      <MessageCircle className="w-4 h-4 mr-2" />
                      View All Requests
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8">
                    <MessageCircle className="w-12 h-12 mx-auto mb-4 text-muted-foreground opacity-50" />
                    <h3 className="text-lg mb-2">Volunteer Requests</h3>
                    <p className="text-muted-foreground mb-4">
                      Track requests you've sent to potential volunteers
                    </p>
                    <Button
                      onClick={() => setCurrentView("volunteer-requests")}
                    >
                      View Requests
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="analytics">
              <Card>
                <CardHeader>
                  <CardTitle>Analytics & Insights</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8 text-muted-foreground">
                    <BarChart3 className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>Analytics dashboard coming soon</p>
                    <p className="text-sm">
                      Track volunteer performance, application trends, and more
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        )}
      </div>
    </div>
  );
}
