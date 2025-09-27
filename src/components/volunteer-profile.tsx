import React, { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Badge } from "./ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Separator } from "./ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Edit, MapPin, Calendar, Star, MessageCircle, Settings, Camera, Globe } from "lucide-react";

interface VolunteerProfileProps {
  onBack: () => void;
}

// Mock volunteer data
const volunteerData = {
  id: "vol_123",
  firstName: "Sarah",
  lastName: "Chen",
  email: "sarah.chen@email.com",
  country: "United States",
  city: "San Francisco",
  avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b4d4?w=150&h=150&fit=crop&crop=face",
  bio: "I'm a digital nomad with a passion for sustainable travel and cultural exchange. I love helping hostels with their social media and connecting with fellow travelers. Currently on a year-long journey through Southeast Asia!",
  skills: ["Social Media", "Photography", "Reception", "Marketing", "Teaching"],
  languages: ["English", "Spanish", "Portuguese"],
  experience: "intermediate",
  joinDate: "March 2024",
  completedVolunteering: 3,
  totalRating: 4.8,
  reviews: [
    {
      id: 1,
      hostelName: "Nomad's Paradise",
      location: "Bangkok, Thailand",
      rating: 5,
      comment: "Sarah was amazing! Great with social media and helped us increase our Instagram followers by 200%. Very professional and friendly.",
      date: "2 weeks ago"
    },
    {
      id: 2,
      hostelName: "Surf & Stay",
      location: "Lisbon, Portugal", 
      rating: 5,
      comment: "Fantastic volunteer! Sarah helped with reception and was always willing to go the extra mile. Guests loved her!",
      date: "1 month ago"
    },
    {
      id: 3,
      hostelName: "Mountain View Lodge",
      location: "Cusco, Peru",
      rating: 4,
      comment: "Good work with our marketing materials. Very creative and professional approach.",
      date: "3 months ago"
    }
  ],
  currentlyAt: {
    hostelName: "Beach Paradise Hostel",
    location: "Bali, Indonesia",
    startDate: "November 15, 2024",
    endDate: "December 15, 2024",
    status: "active"
  },
  availability: {
    from: "January 2025",
    to: "June 2025"
  },
  preferences: {
    accommodationType: "Shared dormitory",
    workHoursPerDay: "4-5 hours",
    preferredRegions: ["Southeast Asia", "South America", "Europe"],
    minimumStay: "2 weeks",
    maximumStay: "2 months"
  }
};

export function VolunteerProfile({ onBack }: VolunteerProfileProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Button variant="ghost" onClick={onBack}>
              ← Back to Dashboard
            </Button>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </Button>
              <Button 
                variant={isEditing ? "default" : "outline"} 
                size="sm"
                onClick={() => setIsEditing(!isEditing)}
              >
                <Edit className="w-4 h-4 mr-2" />
                {isEditing ? "Save Changes" : "Edit Profile"}
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Profile Header */}
        <Card className="mb-8">
          <CardContent className="p-8">
            <div className="flex flex-col md:flex-row items-start md:items-center space-y-6 md:space-y-0 md:space-x-8">
              <div className="relative">
                <Avatar className="w-32 h-32">
                  <AvatarImage src={volunteerData.avatar} alt={`${volunteerData.firstName} ${volunteerData.lastName}`} />
                  <AvatarFallback className="text-2xl">
                    {volunteerData.firstName[0]}{volunteerData.lastName[0]}
                  </AvatarFallback>
                </Avatar>
                {isEditing && (
                  <Button 
                    size="sm" 
                    className="absolute -bottom-2 -right-2 rounded-full w-8 h-8 p-0"
                  >
                    <Camera className="w-4 h-4" />
                  </Button>
                )}
              </div>
              
              <div className="flex-1 space-y-4">
                <div>
                  <h1 className="text-2xl mb-2">
                    {volunteerData.firstName} {volunteerData.lastName}
                  </h1>
                  <div className="flex items-center text-muted-foreground space-x-4">
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 mr-1" />
                      {volunteerData.city}, {volunteerData.country}
                    </div>
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      Joined {volunteerData.joinDate}
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-6">
                  <div className="text-center">
                    <div className="text-2xl">{volunteerData.completedVolunteering}</div>
                    <div className="text-sm text-muted-foreground">Completed</div>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center text-2xl">
                      {volunteerData.totalRating}
                      <Star className="w-5 h-5 ml-1 fill-yellow-400 text-yellow-400" />
                    </div>
                    <div className="text-sm text-muted-foreground">Rating</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl">{volunteerData.reviews.length}</div>
                    <div className="text-sm text-muted-foreground">Reviews</div>
                  </div>
                </div>

                {volunteerData.currentlyAt.status === "active" && (
                  <div className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                      <div>
                        <p className="text-sm">Currently volunteering at</p>
                        <p className="font-medium">{volunteerData.currentlyAt.hostelName}, {volunteerData.currentlyAt.location}</p>
                        <p className="text-sm text-muted-foreground">
                          {volunteerData.currentlyAt.startDate} - {volunteerData.currentlyAt.endDate}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Profile Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
            <TabsTrigger value="preferences">Preferences</TabsTrigger>
            <TabsTrigger value="activity">Activity</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>About Me</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">{volunteerData.bio}</p>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium mb-2">Skills</h4>
                    <div className="flex flex-wrap gap-2">
                      {volunteerData.skills.map((skill) => (
                        <Badge key={skill} variant="secondary">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium mb-2">Languages</h4>
                    <div className="flex flex-wrap gap-2">
                      {volunteerData.languages.map((language) => (
                        <Badge key={language} variant="outline">
                          <Globe className="w-3 h-3 mr-1" />
                          {language}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Availability</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium">Available From</Label>
                    <p className="text-muted-foreground">{volunteerData.availability.from}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Available Until</Label>
                    <p className="text-muted-foreground">{volunteerData.availability.to}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reviews" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Reviews from Hostels</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {volunteerData.reviews.map((review, index) => (
                  <div key={review.id}>
                    <div className="space-y-3">
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="font-medium">{review.hostelName}</h4>
                          <p className="text-sm text-muted-foreground">{review.location}</p>
                        </div>
                        <div className="flex items-center">
                          <div className="flex items-center mr-2">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-4 h-4 ${
                                  i < review.rating 
                                    ? "fill-yellow-400 text-yellow-400" 
                                    : "text-gray-300"
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-sm text-muted-foreground">{review.date}</span>
                        </div>
                      </div>
                      <p className="text-muted-foreground text-sm">{review.comment}</p>
                    </div>
                    {index < volunteerData.reviews.length - 1 && <Separator className="mt-6" />}
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="preferences" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Volunteer Preferences</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium">Accommodation Type</Label>
                    <p className="text-muted-foreground">{volunteerData.preferences.accommodationType}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Work Hours per Day</Label>
                    <p className="text-muted-foreground">{volunteerData.preferences.workHoursPerDay}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Minimum Stay</Label>
                    <p className="text-muted-foreground">{volunteerData.preferences.minimumStay}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Maximum Stay</Label>
                    <p className="text-muted-foreground">{volunteerData.preferences.maximumStay}</p>
                  </div>
                </div>
                
                <div>
                  <Label className="text-sm font-medium mb-2 block">Preferred Regions</Label>
                  <div className="flex flex-wrap gap-2">
                    {volunteerData.preferences.preferredRegions.map((region) => (
                      <Badge key={region} variant="outline">
                        {region}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="activity" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                    <div>
                      <p className="text-sm">Started volunteering at Beach Paradise Hostel</p>
                      <p className="text-xs text-muted-foreground">November 15, 2024</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                    <div>
                      <p className="text-sm">Received 5-star review from Surf & Stay Hostel</p>
                      <p className="text-xs text-muted-foreground">October 28, 2024</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                    <div>
                      <p className="text-sm">Completed volunteering at Surf & Stay Hostel</p>
                      <p className="text-xs text-muted-foreground">October 25, 2024</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                    <div>
                      <p className="text-sm">Applied to Beach Paradise Hostel</p>
                      <p className="text-xs text-muted-foreground">October 20, 2024</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}