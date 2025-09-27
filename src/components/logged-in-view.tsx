import React, { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { VolunteerProfile } from "./volunteer-profile";
import { HostelProfile } from "./hostel-profile";
import { BrowseHostels } from "./browse-hostels";
import { BrowseVolunteers } from "./browse-volunteers";
import { Messages } from "./messages";
import { Notifications } from "./notifications";
import { LocalStorageManager } from "./utils/local-storage";
import {
  Search,
  MapPin,
  Star,
  MessageCircle,
  Bell,
  Settings,
  User,
  Calendar,
  Filter,
  Heart,
  Plus,
  Users,
  BarChart3,
  TrendingUp,
  Clock,
} from "lucide-react";

interface LoggedInViewProps {
  userType: "volunteer" | "hostel";
  onLogout: () => void;
}

// Mock data
const volunteerDashboardData = {
  user: {
    name: "Sarah Chen",
    avatar:
      "https://images.unsplash.com/photo-1494790108755-2616b612b4d4?w=40&h=40&fit=crop&crop=face",
    location: "San Francisco, USA",
    completedVolunteering: 3,
    rating: 4.8,
  },
  currentVolunteering: {
    hostelName: "Beach Paradise Hostel",
    location: "Bali, Indonesia",
    startDate: "Nov 15",
    endDate: "Dec 15",
    daysLeft: 18,
    role: "Social Media & Reception",
  },
  savedOpportunities: [
    {
      id: 1,
      name: "Jungle Retreat Lodge",
      location: "Costa Rica",
      image:
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=200&fit=crop",
      roles: ["Eco Tourism", "Reception"],
      rating: 4.9,
      commitment: "2-6 weeks",
    },
    {
      id: 2,
      name: "Mountain Hostel",
      location: "Peru",
      image:
        "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=300&h=200&fit=crop",
      roles: ["Kitchen", "Tours"],
      rating: 4.7,
      commitment: "4-8 weeks",
    },
  ],
  recentActivity: [
    {
      id: 1,
      text: "Started volunteering at Beach Paradise Hostel",
      date: "Nov 15",
      type: "started",
    },
    {
      id: 2,
      text: "Received 5-star review from Surf & Stay",
      date: "Nov 10",
      type: "review",
    },
    {
      id: 3,
      text: "Applied to Mountain Hostel in Peru",
      date: "Nov 5",
      type: "applied",
    },
  ],
  upcomingOpportunities: [
    {
      id: 1,
      name: "Surf Camp Hostel",
      location: "Portugal",
      image:
        "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=300&h=200&fit=crop",
      roles: ["Reception", "Events"],
      rating: 4.8,
      commitment: "3-5 weeks",
      urgent: true,
    },
    {
      id: 2,
      name: "City Center Backpackers",
      location: "Berlin, Germany",
      image:
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=200&fit=crop",
      roles: ["Bar Help", "Tours"],
      rating: 4.6,
      commitment: "2-4 weeks",
      urgent: false,
    },
  ],
};

const hostelDashboardData = {
  user: {
    name: "Nomad's Paradise",
    contactName: "Carlos Mendoza",
    avatar:
      "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=40&h=40&fit=crop",
    location: "Bangkok, Thailand",
    totalVolunteers: 45,
    rating: 4.8,
  },
  currentVolunteers: [
    {
      id: 1,
      name: "Maria Santos",
      avatar:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=40&h=40&fit=crop&crop=face",
      role: "Reception",
      endDate: "Dec 15",
      rating: 5,
    },
    {
      id: 2,
      name: "Tom Wilson",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face",
      role: "Social Media",
      endDate: "Jan 15",
      rating: 5,
    },
  ],
  pendingApplications: [
    {
      id: 1,
      name: "Emma Johnson",
      avatar:
        "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=40&h=40&fit=crop&crop=face",
      skills: ["Kitchen", "Cleaning"],
      availability: "Dec 1 - Feb 28",
      rating: 4.9,
      applied: "2 days ago",
    },
    {
      id: 2,
      name: "Alex Rivera",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face",
      skills: ["Reception", "Tours"],
      availability: "Jan 15 - Mar 15",
      rating: 4.7,
      applied: "1 day ago",
    },
  ],
  stats: {
    totalApplications: 12,
    responseRate: "95%",
    averageStay: "6 weeks",
    repeatVolunteers: "30%",
  },
  recentActivity: [
    {
      id: 1,
      text: "New application from Emma Johnson",
      date: "2 days ago",
      type: "application",
    },
    {
      id: 2,
      text: "Tom Wilson extended stay until Jan 15",
      date: "3 days ago",
      type: "extension",
    },
    {
      id: 3,
      text: "Received 5-star review from Sarah Chen",
      date: "1 week ago",
      type: "review",
    },
  ],
};

export function LoggedInView({ userType, onLogout }: LoggedInViewProps) {
  const [currentView, setCurrentView] = useState("dashboard");
  const [activeTab, setActiveTab] = useState("overview");
  const [unreadMessages, setUnreadMessages] = useState(0);
  const [unreadNotifications, setUnreadNotifications] = useState(0);

  // Load unread counts from localStorage
  useEffect(() => {
    const messageCount = LocalStorageManager.getUnreadMessageCount();
    const notificationCount = LocalStorageManager.getUnreadNotificationCount();
    setUnreadMessages(messageCount);
    setUnreadNotifications(notificationCount);
  }, [currentView]);

  // Handle browse hostels actions
  const handleHostelClick = (hostelId: string) => {
    console.log("View hostel details:", hostelId);
    // In a real app, navigate to hostel detail page
  };

  const handleApplyToHostel = (hostelId: string) => {
    console.log("Apply to hostel:", hostelId);
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
    console.log("View volunteer profile:", volunteerId);
    // In a real app, navigate to volunteer detail page
  };

  const handleContactVolunteer = (volunteerId: string) => {
    console.log("Contact volunteer:", volunteerId);
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
    return <VolunteerProfile onBack={() => setCurrentView("dashboard")} />;
  }

  if (currentView === "hostel-profile") {
    return <HostelProfile onBack={() => setCurrentView("dashboard")} />;
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
  const userData = isVolunteer
    ? volunteerDashboardData.user
    : hostelDashboardData.user;

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
                  <AvatarImage src={userData.avatar} alt={userData.name} />
                  <AvatarFallback>
                    {userData.name.substring(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <span className="hidden md:inline">{userData.name}</span>
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
            Welcome back,{" "}
            {isVolunteer ? userData.name : hostelDashboardData.user.contactName}
            !
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
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="opportunities">Browse</TabsTrigger>
              <TabsTrigger value="saved">Saved</TabsTrigger>
              <TabsTrigger value="applications">Applications</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-2">
                      <BarChart3 className="w-5 h-5 text-primary" />
                      <div>
                        <p className="text-2xl">
                          {volunteerDashboardData.user.completedVolunteering}
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
                        <p className="text-2xl">
                          {volunteerDashboardData.user.rating}
                        </p>
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
                        <p className="text-2xl">
                          {volunteerDashboardData.currentVolunteering.daysLeft}
                        </p>
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
                          {volunteerDashboardData.savedOpportunities.length}
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
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="font-medium">
                              {
                                volunteerDashboardData.currentVolunteering
                                  .hostelName
                              }
                            </h3>
                            <p className="text-sm text-muted-foreground flex items-center">
                              <MapPin className="w-3 h-3 mr-1" />
                              {
                                volunteerDashboardData.currentVolunteering
                                  .location
                              }
                            </p>
                            <p className="text-sm mt-1">
                              Role:{" "}
                              {volunteerDashboardData.currentVolunteering.role}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {
                                volunteerDashboardData.currentVolunteering
                                  .startDate
                              }{" "}
                              -{" "}
                              {
                                volunteerDashboardData.currentVolunteering
                                  .endDate
                              }
                            </p>
                          </div>
                          <div className="text-right">
                            <div className="text-2xl font-bold text-green-600">
                              {
                                volunteerDashboardData.currentVolunteering
                                  .daysLeft
                              }
                            </div>
                            <div className="text-xs text-muted-foreground">
                              days left
                            </div>
                          </div>
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
                      <div className="space-y-4">
                        {volunteerDashboardData.upcomingOpportunities.map(
                          (opportunity) => (
                            <div
                              key={opportunity.id}
                              className="flex items-center space-x-4 p-4 border rounded-lg"
                            >
                              <ImageWithFallback
                                src={opportunity.image}
                                alt={opportunity.name}
                                className="w-16 h-16 rounded-lg object-cover"
                              />
                              <div className="flex-1">
                                <div className="flex items-center space-x-2">
                                  <h4 className="font-medium">
                                    {opportunity.name}
                                  </h4>
                                  {opportunity.urgent && (
                                    <Badge
                                      variant="destructive"
                                      className="text-xs"
                                    >
                                      Urgent
                                    </Badge>
                                  )}
                                </div>
                                <p className="text-sm text-muted-foreground flex items-center">
                                  <MapPin className="w-3 h-3 mr-1" />
                                  {opportunity.location}
                                </p>
                                <div className="flex items-center space-x-4 mt-1">
                                  <span className="text-xs text-muted-foreground">
                                    {opportunity.commitment}
                                  </span>
                                  <div className="flex items-center text-xs">
                                    <Star className="w-3 h-3 mr-1 fill-yellow-400 text-yellow-400" />
                                    {opportunity.rating}
                                  </div>
                                </div>
                              </div>
                              <Button size="sm">Apply</Button>
                            </div>
                          )
                        )}
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
                      <div className="space-y-3">
                        {volunteerDashboardData.recentActivity.map(
                          (activity) => (
                            <div
                              key={activity.id}
                              className="flex items-start space-x-3"
                            >
                              <div
                                className={`w-2 h-2 rounded-full mt-2 ${
                                  activity.type === "started"
                                    ? "bg-green-500"
                                    : activity.type === "review"
                                    ? "bg-yellow-500"
                                    : "bg-blue-500"
                                }`}
                              ></div>
                              <div>
                                <p className="text-sm">{activity.text}</p>
                                <p className="text-xs text-muted-foreground">
                                  {activity.date}
                                </p>
                              </div>
                            </div>
                          )
                        )}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Saved Opportunities */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Saved Opportunities</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {volunteerDashboardData.savedOpportunities.map(
                          (opportunity) => (
                            <div
                              key={opportunity.id}
                              className="flex items-center space-x-3"
                            >
                              <ImageWithFallback
                                src={opportunity.image}
                                alt={opportunity.name}
                                className="w-10 h-10 rounded object-cover"
                              />
                              <div className="flex-1">
                                <h5 className="text-sm font-medium">
                                  {opportunity.name}
                                </h5>
                                <p className="text-xs text-muted-foreground">
                                  {opportunity.location}
                                </p>
                              </div>
                            </div>
                          )
                        )}
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
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {volunteerDashboardData.savedOpportunities.map(
                      (opportunity) => (
                        <div
                          key={opportunity.id}
                          className="border rounded-lg p-4"
                        >
                          <ImageWithFallback
                            src={opportunity.image}
                            alt={opportunity.name}
                            className="w-full h-32 rounded object-cover mb-3"
                          />
                          <h4 className="font-medium">{opportunity.name}</h4>
                          <p className="text-sm text-muted-foreground flex items-center">
                            <MapPin className="w-3 h-3 mr-1" />
                            {opportunity.location}
                          </p>
                          <div className="flex items-center justify-between mt-2">
                            <div className="flex items-center text-sm">
                              <Star className="w-3 h-3 mr-1 fill-yellow-400 text-yellow-400" />
                              {opportunity.rating}
                            </div>
                            <Button size="sm">Apply</Button>
                          </div>
                        </div>
                      )
                    )}
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
          </Tabs>
        )}

        {/* Hostel Dashboard */}
        {!isVolunteer && (
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="volunteers">Browse Volunteers</TabsTrigger>
              <TabsTrigger value="applications">Applications</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-2">
                      <Users className="w-5 h-5 text-primary" />
                      <div>
                        <p className="text-2xl">
                          {hostelDashboardData.user.totalVolunteers}
                        </p>
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
                        <p className="text-2xl">
                          {hostelDashboardData.user.rating}
                        </p>
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
                        <p className="text-2xl">
                          {hostelDashboardData.currentVolunteers.length}
                        </p>
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
                          {hostelDashboardData.pendingApplications.length}
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
                      <div className="space-y-4">
                        {hostelDashboardData.pendingApplications.map(
                          (application) => (
                            <div
                              key={application.id}
                              className="flex items-center space-x-4 p-4 border rounded-lg"
                            >
                              <Avatar>
                                <AvatarImage
                                  src={application.avatar}
                                  alt={application.name}
                                />
                                <AvatarFallback>
                                  {application.name
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                                </AvatarFallback>
                              </Avatar>
                              <div className="flex-1">
                                <h4 className="font-medium">
                                  {application.name}
                                </h4>
                                <div className="flex flex-wrap gap-1 mt-1">
                                  {application.skills.map((skill) => (
                                    <Badge
                                      key={skill}
                                      variant="outline"
                                      className="text-xs"
                                    >
                                      {skill}
                                    </Badge>
                                  ))}
                                </div>
                                <p className="text-xs text-muted-foreground mt-1">
                                  Available: {application.availability}
                                </p>
                              </div>
                              <div className="text-right">
                                <div className="flex items-center text-sm mb-2">
                                  <Star className="w-3 h-3 mr-1 fill-yellow-400 text-yellow-400" />
                                  {application.rating}
                                </div>
                                <div className="flex space-x-2">
                                  <Button size="sm" variant="outline">
                                    Decline
                                  </Button>
                                  <Button size="sm">Accept</Button>
                                </div>
                              </div>
                            </div>
                          )
                        )}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Current Volunteers */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Current Volunteers</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {hostelDashboardData.currentVolunteers.map(
                          (volunteer) => (
                            <div
                              key={volunteer.id}
                              className="flex items-center space-x-4 p-4 border rounded-lg"
                            >
                              <Avatar>
                                <AvatarImage
                                  src={volunteer.avatar}
                                  alt={volunteer.name}
                                />
                                <AvatarFallback>
                                  {volunteer.name
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                                </AvatarFallback>
                              </Avatar>
                              <div className="flex-1">
                                <h4 className="font-medium">
                                  {volunteer.name}
                                </h4>
                                <p className="text-sm text-muted-foreground">
                                  {volunteer.role}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                  Until {volunteer.endDate}
                                </p>
                              </div>
                              <div className="text-right">
                                <div className="flex items-center text-sm mb-2">
                                  <Star className="w-3 h-3 mr-1 fill-yellow-400 text-yellow-400" />
                                  {volunteer.rating}
                                </div>
                                <Button size="sm" variant="outline">
                                  Message
                                </Button>
                              </div>
                            </div>
                          )
                        )}
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
                          <span className="font-medium">
                            {hostelDashboardData.stats.responseRate}
                          </span>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-sm">
                          <span>Average Stay</span>
                          <span className="font-medium">
                            {hostelDashboardData.stats.averageStay}
                          </span>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-sm">
                          <span>Repeat Volunteers</span>
                          <span className="font-medium">
                            {hostelDashboardData.stats.repeatVolunteers}
                          </span>
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
                      <div className="space-y-3">
                        {hostelDashboardData.recentActivity.map((activity) => (
                          <div
                            key={activity.id}
                            className="flex items-start space-x-3"
                          >
                            <div
                              className={`w-2 h-2 rounded-full mt-2 ${
                                activity.type === "application"
                                  ? "bg-blue-500"
                                  : activity.type === "extension"
                                  ? "bg-green-500"
                                  : "bg-yellow-500"
                              }`}
                            ></div>
                            <div>
                              <p className="text-sm">{activity.text}</p>
                              <p className="text-xs text-muted-foreground">
                                {activity.date}
                              </p>
                            </div>
                          </div>
                        ))}
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
                  <div className="space-y-4">
                    {hostelDashboardData.pendingApplications.map(
                      (application) => (
                        <div
                          key={application.id}
                          className="flex items-center space-x-4 p-4 border rounded-lg"
                        >
                          <Avatar>
                            <AvatarImage
                              src={application.avatar}
                              alt={application.name}
                            />
                            <AvatarFallback>
                              {application.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <h4 className="font-medium">{application.name}</h4>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {application.skills.map((skill) => (
                                <Badge
                                  key={skill}
                                  variant="outline"
                                  className="text-xs"
                                >
                                  {skill}
                                </Badge>
                              ))}
                            </div>
                            <p className="text-xs text-muted-foreground mt-1">
                              Available: {application.availability} • Applied{" "}
                              {application.applied}
                            </p>
                          </div>
                          <div className="text-right">
                            <div className="flex items-center text-sm mb-2">
                              <Star className="w-3 h-3 mr-1 fill-yellow-400 text-yellow-400" />
                              {application.rating}
                            </div>
                            <div className="flex space-x-2">
                              <Button size="sm" variant="outline">
                                View Profile
                              </Button>
                              <Button size="sm" variant="outline">
                                Decline
                              </Button>
                              <Button size="sm">Accept</Button>
                            </div>
                          </div>
                        </div>
                      )
                    )}
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
