import React, { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { LocalStorageManager } from "./utils/local-storage";
import { ArrowLeft, MapPin, MessageCircle, Users, Calendar, Coffee, Camera, Mountain, Music, Book } from "lucide-react";

interface VolunteerCommunityProps {
  onBack?: () => void;
}

const mockVolunteers = [
  {
    id: 1,
    name: "Sarah Chen",
    location: "Bangkok, Thailand",
    profileImage: "https://images.unsplash.com/photo-1494790108755-2616b612b4d4?w=100&h=100&fit=crop&crop=face",
    bio: "Digital nomad exploring Southeast Asia. Love photography and local food!",
    interests: ["Photography", "Food", "Culture"],
    lastActive: "2 hours ago",
    isOnline: true,
    currentHostel: "Nomad's Paradise",
    joinedDate: "2024-01-15"
  },
  {
    id: 2,
    name: "Marcus Rodriguez",
    location: "Lisbon, Portugal",
    profileImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
    bio: "Surf instructor volunteering at beach hostels. Always up for adventures!",
    interests: ["Surfing", "Music", "Travel"],
    lastActive: "1 day ago",
    isOnline: false,
    currentHostel: "Surf & Stay Hostel",
    joinedDate: "2023-11-20"
  },
  {
    id: 3,
    name: "Emma Thompson",
    location: "Cusco, Peru",
    profileImage: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
    bio: "Backpacker and yoga instructor. Exploring South America one hostel at a time.",
    interests: ["Yoga", "Hiking", "Meditation"],
    lastActive: "30 minutes ago",
    isOnline: true,
    currentHostel: "Mountain View Lodge",
    joinedDate: "2024-02-10"
  },
  {
    id: 4,
    name: "James Park",
    location: "Berlin, Germany", 
    profileImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
    bio: "Tech volunteer helping hostels with digital solutions. Coffee enthusiast!",
    interests: ["Tech", "Coffee", "Art"],
    lastActive: "4 hours ago",
    isOnline: false,
    currentHostel: "Berlin Backpackers",
    joinedDate: "2023-12-05"
  }
];

const upcomingEvents = [
  {
    id: 1,
    title: "Bangkok Food Tour",
    date: "2024-03-25",
    time: "18:00",
    location: "Khao San Road",
    organizer: "Sarah Chen",
    attendees: 8,
    maxAttendees: 12,
    description: "Join us for an authentic street food adventure!"
  },
  {
    id: 2,
    title: "Lisbon Surf Session",
    date: "2024-03-27",
    time: "07:00",
    location: "Praia do Guincho",
    organizer: "Marcus Rodriguez",
    attendees: 5,
    maxAttendees: 8,
    description: "Morning surf session followed by breakfast on the beach."
  },
  {
    id: 3,
    title: "Cusco Hiking Group",
    date: "2024-03-28",
    time: "06:00",
    location: "Rainbow Mountain",
    organizer: "Emma Thompson",
    attendees: 15,
    maxAttendees: 20,
    description: "Day hike to the famous Rainbow Mountain. All levels welcome!"
  }
];

const interestIcons: { [key: string]: React.ReactNode } = {
  Photography: <Camera className="w-4 h-4" />,
  Food: <Coffee className="w-4 h-4" />,
  Culture: <Book className="w-4 h-4" />,
  Surfing: <Users className="w-4 h-4" />,
  Music: <Music className="w-4 h-4" />,
  Travel: <MapPin className="w-4 h-4" />,
  Yoga: <Users className="w-4 h-4" />,
  Hiking: <Mountain className="w-4 h-4" />,
  Meditation: <Users className="w-4 h-4" />,
  Tech: <Users className="w-4 h-4" />,
  Coffee: <Coffee className="w-4 h-4" />,
  Art: <Users className="w-4 h-4" />
};

export function VolunteerCommunity({ onBack }: VolunteerCommunityProps) {
  const [activeTab, setActiveTab] = useState("volunteers");
  const [searchLocation, setSearchLocation] = useState("");
  const [userData, setUserData] = useState<any>(null);

  useEffect(() => {
    const data = LocalStorageManager.getUserData();
    setUserData(data);
  }, []);

  const handleMessageVolunteer = (volunteerId: number) => {
    LocalStorageManager.addMessage({
      recipientId: volunteerId.toString(),
      content: "Hi! I saw your profile in the volunteer community and would love to connect!",
      type: "volunteer_message"
    });
    
    LocalStorageManager.addNotification({
      type: "message",
      title: "Message Sent",
      message: "Your message has been sent to the volunteer!",
      priority: "low"
    });
    
    alert("Message sent successfully!");
  };

  const handleJoinEvent = (eventId: number) => {
    LocalStorageManager.addNotification({
      type: "event",
      title: "Event Joined!",
      message: "You've successfully joined the event. Check your calendar for details!",
      priority: "medium"
    });
    
    alert("Successfully joined the event!");
  };

  const filteredVolunteers = mockVolunteers.filter(volunteer =>
    searchLocation === "" || volunteer.location.toLowerCase().includes(searchLocation.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              {onBack && (
                <Button variant="ghost" onClick={onBack}>
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back
                </Button>
              )}
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <Users className="w-5 h-5 text-primary-foreground" />
                </div>
                <span className="text-xl">Hosteling</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl mb-2">Volunteer Community</h1>
          <p className="text-muted-foreground">
            Connect with fellow volunteers, join local events, and build lasting friendships while traveling the world.
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList>
            <TabsTrigger value="volunteers">Nearby Volunteers</TabsTrigger>
            <TabsTrigger value="events">Local Events</TabsTrigger>
            <TabsTrigger value="groups">Interest Groups</TabsTrigger>
          </TabsList>

          <TabsContent value="volunteers" className="space-y-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <Input
                  placeholder="Search by location..."
                  value={searchLocation}
                  onChange={(e) => setSearchLocation(e.target.value)}
                />
              </div>
              <Button variant="outline">
                <MapPin className="w-4 h-4 mr-2" />
                Near Me
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredVolunteers.map((volunteer) => (
                <Card key={volunteer.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4 mb-4">
                      <div className="relative">
                        <Avatar className="w-12 h-12">
                          <AvatarImage src={volunteer.profileImage} alt={volunteer.name} />
                          <AvatarFallback>{volunteer.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        {volunteer.isOnline && (
                          <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-background rounded-full"></div>
                        )}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold">{volunteer.name}</h3>
                        <p className="text-sm text-muted-foreground flex items-center">
                          <MapPin className="w-3 h-3 mr-1" />
                          {volunteer.location}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {volunteer.isOnline ? 'Online now' : `Active ${volunteer.lastActive}`}
                        </p>
                      </div>
                    </div>

                    <p className="text-sm text-muted-foreground mb-4">{volunteer.bio}</p>

                    <div className="space-y-3">
                      <div>
                        <p className="text-xs font-medium text-muted-foreground mb-2">INTERESTS</p>
                        <div className="flex flex-wrap gap-1">
                          {volunteer.interests.map((interest) => (
                            <Badge key={interest} variant="secondary" className="text-xs">
                              {interestIcons[interest]}
                              <span className="ml-1">{interest}</span>
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div>
                        <p className="text-xs font-medium text-muted-foreground mb-1">CURRENTLY AT</p>
                        <p className="text-sm">{volunteer.currentHostel}</p>
                      </div>

                      <Button 
                        className="w-full" 
                        size="sm"
                        onClick={() => handleMessageVolunteer(volunteer.id)}
                      >
                        <MessageCircle className="w-4 h-4 mr-2" />
                        Send Message
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="events" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Upcoming Events</h2>
              <Button>
                <Calendar className="w-4 h-4 mr-2" />
                Create Event
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {upcomingEvents.map((event) => (
                <Card key={event.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg">{event.title}</CardTitle>
                        <p className="text-sm text-muted-foreground flex items-center mt-1">
                          <MapPin className="w-3 h-3 mr-1" />
                          {event.location}
                        </p>
                      </div>
                      <Badge variant="outline">
                        {event.attendees}/{event.maxAttendees}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        {new Date(event.date).toLocaleDateString()}
                      </div>
                      <div>{event.time}</div>
                    </div>

                    <p className="text-sm">{event.description}</p>

                    <div className="flex items-center space-x-2 text-sm">
                      <span className="text-muted-foreground">Organized by:</span>
                      <span className="font-medium">{event.organizer}</span>
                    </div>

                    <Button 
                      className="w-full" 
                      size="sm"
                      disabled={event.attendees >= event.maxAttendees}
                      onClick={() => handleJoinEvent(event.id)}
                    >
                      {event.attendees >= event.maxAttendees ? 'Event Full' : 'Join Event'}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="groups" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6 text-center space-y-4">
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center mx-auto">
                    <Camera className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Photography Enthusiasts</h3>
                    <p className="text-sm text-muted-foreground">Share your travel photos and tips</p>
                  </div>
                  <div className="flex items-center justify-center space-x-4 text-sm text-muted-foreground">
                    <span>152 members</span>
                    <span>•</span>
                    <span>15 online</span>
                  </div>
                  <Button size="sm" className="w-full">Join Group</Button>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6 text-center space-y-4">
                  <div className="w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center mx-auto">
                    <Mountain className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Adventure Seekers</h3>
                    <p className="text-sm text-muted-foreground">Plan hiking trips and outdoor activities</p>
                  </div>
                  <div className="flex items-center justify-center space-x-4 text-sm text-muted-foreground">
                    <span>89 members</span>
                    <span>•</span>
                    <span>8 online</span>
                  </div>
                  <Button size="sm" className="w-full">Join Group</Button>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6 text-center space-y-4">
                  <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/20 rounded-lg flex items-center justify-center mx-auto">
                    <Coffee className="w-6 h-6 text-orange-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Foodies United</h3>
                    <p className="text-sm text-muted-foreground">Discover local cuisine together</p>
                  </div>
                  <div className="flex items-center justify-center space-x-4 text-sm text-muted-foreground">
                    <span>203 members</span>
                    <span>•</span>
                    <span>23 online</span>
                  </div>
                  <Button size="sm" className="w-full">Join Group</Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}