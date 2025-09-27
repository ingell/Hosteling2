import React, { useState } from "react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Separator } from "./ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Edit, MapPin, Calendar, Star, Users, Settings, Camera, Globe, Bed, Clock, Wifi, Coffee, X } from "lucide-react";

interface HostelProfileProps {
  onBack: () => void;
}

// Mock hostel data
const hostelData = {
  id: "hostel_456",
  name: "Nomad's Paradise",
  contactName: "Carlos Mendoza",
  email: "info@nomadsparadise.com",
  phone: "+66 2 123 4567",
  country: "Thailand",
  city: "Bangkok",
  address: "123 Backpacker Street, Khao San Road, Bangkok 10200",
  type: "Backpacker Hostel",
  totalBeds: 50,
  establishedYear: 2018,
  avatar: "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=150&h=150&fit=crop",
  photos: [
    "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop"
  ],
  description: "Welcome to Nomad's Paradise! We're a vibrant backpacker hostel located in the heart of Bangkok's famous Khao San Road. Our friendly atmosphere and helpful staff make it the perfect base for exploring Thailand. We offer clean, comfortable accommodations and a great social environment where travelers from around the world come together.",
  amenities: ["Free WiFi", "Breakfast included", "Kitchen access", "Laundry", "Common room", "Garden/Terrace", "Tours", "24/7 reception"],
  languages: ["English", "Thai", "Spanish"],
  volunteerRoles: ["Reception", "Cleaning", "Social Media", "Tours", "Kitchen"],
  accommodationType: "Shared dormitory",
  mealsIncluded: true,
  wifiIncluded: true,
  workHoursPerDay: "4-5 hours",
  minimumStay: "2 weeks",
  maximumStay: "3 months",
  joinDate: "August 2023",
  totalRating: 4.8,
  reviewCount: 24,
  currentVolunteers: 3,
  totalVolunteersHosted: 45,
  reviews: [
    {
      id: 1,
      volunteerName: "Sarah Chen",
      volunteerAvatar: "https://images.unsplash.com/photo-1494790108755-2616b612b4d4?w=40&h=40&fit=crop&crop=face",
      rating: 5,
      comment: "Amazing experience! The hostel team was so welcoming and the location is perfect. I helped with social media and learned so much about Thai culture.",
      date: "1 week ago",
      skills: ["Social Media", "Photography"]
    },
    {
      id: 2,
      volunteerName: "Jake Morrison",
      volunteerAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face",
      rating: 5,
      comment: "Great hostel to volunteer at! Carlos and the team are fantastic. The work-life balance was perfect and I met amazing people.",
      date: "2 weeks ago",
      skills: ["Reception", "Tours"]
    },
    {
      id: 3,
      volunteerName: "Emma Rodriguez",
      volunteerAvatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face",
      rating: 4,
      comment: "Really enjoyed my time here. Good facilities and nice atmosphere. Would definitely recommend to other volunteers!",
      date: "1 month ago",
      skills: ["Cleaning", "Kitchen"]
    }
  ],
  currentVolunteers: [
    {
      id: 1,
      name: "Maria Santos",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=40&h=40&fit=crop&crop=face",
      role: "Reception",
      startDate: "November 1, 2024",
      endDate: "December 15, 2024",
      skills: ["Reception", "Spanish", "Marketing"]
    },
    {
      id: 2,
      name: "Tom Wilson",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face",
      role: "Social Media",
      startDate: "October 15, 2024",
      endDate: "January 15, 2025",
      skills: ["Social Media", "Photography", "Marketing"]
    },
    {
      id: 3,
      name: "Lisa Chen",
      avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=40&h=40&fit=crop&crop=face",
      role: "Kitchen & Tours",
      startDate: "November 10, 2024",
      endDate: "December 20, 2024",
      skills: ["Kitchen", "Tours", "Chinese"]
    }
  ]
};

export function HostelProfile({ onBack }: HostelProfileProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b">
        <div className="max-w-6xl mx-auto px-4 py-4">
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

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Profile Header */}
        <Card className="mb-8">
          <CardContent className="p-8">
            <div className="flex flex-col lg:flex-row items-start lg:items-center space-y-6 lg:space-y-0 lg:space-x-8">
              <div className="relative">
                <Avatar className="w-32 h-32">
                  <AvatarImage src={hostelData.avatar} alt={hostelData.name} />
                  <AvatarFallback className="text-2xl">
                    {hostelData.name.substring(0, 2).toUpperCase()}
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
                  <h1 className="text-3xl mb-2">{hostelData.name}</h1>
                  <div className="flex flex-col space-y-1 text-muted-foreground">
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 mr-1" />
                      {hostelData.city}, {hostelData.country}
                    </div>
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      Established {hostelData.establishedYear}
                    </div>
                    <div className="flex items-center">
                      <Bed className="w-4 h-4 mr-1" />
                      {hostelData.totalBeds} beds • {hostelData.type}
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-8">
                  <div className="text-center">
                    <div className="text-2xl">{hostelData.totalVolunteersHosted}</div>
                    <div className="text-sm text-muted-foreground">Total Volunteers</div>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center text-2xl">
                      {hostelData.totalRating}
                      <Star className="w-5 h-5 ml-1 fill-yellow-400 text-yellow-400" />
                    </div>
                    <div className="text-sm text-muted-foreground">Rating ({hostelData.reviewCount})</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl">{hostelData.currentVolunteers.length}</div>
                    <div className="text-sm text-muted-foreground">Current Volunteers</div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {hostelData.amenities.slice(0, 4).map((amenity) => (
                    <Badge key={amenity} variant="secondary" className="text-xs">
                      {amenity}
                    </Badge>
                  ))}
                  {hostelData.amenities.length > 4 && (
                    <Badge variant="outline" className="text-xs">
                      +{hostelData.amenities.length - 4} more
                    </Badge>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Profile Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="volunteers">Current Volunteers</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
            <TabsTrigger value="photos">Photos</TabsTrigger>
            <TabsTrigger value="applications">Applications</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>About Our Hostel</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{hostelData.description}</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Volunteer Opportunities</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="text-sm font-medium mb-2">Available Roles</h4>
                      <div className="flex flex-wrap gap-2">
                        {hostelData.volunteerRoles.map((role) => (
                          <Badge key={role} variant="outline">
                            {role}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="font-medium">Work Hours:</span>
                        <p className="text-muted-foreground">{hostelData.workHoursPerDay}</p>
                      </div>
                      <div>
                        <span className="font-medium">Accommodation:</span>
                        <p className="text-muted-foreground">{hostelData.accommodationType}</p>
                      </div>
                      <div>
                        <span className="font-medium">Minimum Stay:</span>
                        <p className="text-muted-foreground">{hostelData.minimumStay}</p>
                      </div>
                      <div>
                        <span className="font-medium">Maximum Stay:</span>
                        <p className="text-muted-foreground">{hostelData.maximumStay}</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4 text-sm">
                      <div className="flex items-center">
                        {hostelData.mealsIncluded ? (
                          <Coffee className="w-4 h-4 mr-1 text-green-500" />
                        ) : (
                          <X className="w-4 h-4 mr-1 text-red-500" />
                        )}
                        Meals {hostelData.mealsIncluded ? "Included" : "Not Included"}
                      </div>
                      <div className="flex items-center">
                        {hostelData.wifiIncluded ? (
                          <Wifi className="w-4 h-4 mr-1 text-green-500" />
                        ) : (
                          <X className="w-4 h-4 mr-1 text-red-500" />
                        )}
                        WiFi {hostelData.wifiIncluded ? "Included" : "Not Included"}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Contact Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>
                      <span className="text-sm font-medium">Contact Person</span>
                      <p className="text-muted-foreground">{hostelData.contactName}</p>
                    </div>
                    <div>
                      <span className="text-sm font-medium">Email</span>
                      <p className="text-muted-foreground">{hostelData.email}</p>
                    </div>
                    <div>
                      <span className="text-sm font-medium">Phone</span>
                      <p className="text-muted-foreground">{hostelData.phone}</p>
                    </div>
                    <div>
                      <span className="text-sm font-medium">Address</span>
                      <p className="text-muted-foreground text-sm">{hostelData.address}</p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Amenities</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {hostelData.amenities.map((amenity) => (
                        <Badge key={amenity} variant="secondary" className="text-xs">
                          {amenity}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Languages</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {hostelData.languages.map((language) => (
                        <Badge key={language} variant="outline" className="text-xs">
                          <Globe className="w-3 h-3 mr-1" />
                          {language}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="volunteers" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Current Volunteers ({hostelData.currentVolunteers.length})</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {hostelData.currentVolunteers.map((volunteer) => (
                  <div key={volunteer.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <Avatar>
                        <AvatarImage src={volunteer.avatar} alt={volunteer.name} />
                        <AvatarFallback>{volunteer.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div>
                        <h4 className="font-medium">{volunteer.name}</h4>
                        <p className="text-sm text-muted-foreground">{volunteer.role}</p>
                        <p className="text-xs text-muted-foreground">
                          {volunteer.startDate} - {volunteer.endDate}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex flex-wrap gap-1 justify-end mb-2">
                        {volunteer.skills.slice(0, 2).map((skill) => (
                          <Badge key={skill} variant="outline" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                      <Button variant="outline" size="sm">
                        Message
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reviews" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Reviews from Volunteers ({hostelData.reviewCount})</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {hostelData.reviews.map((review, index) => (
                  <div key={review.id}>
                    <div className="flex items-start space-x-4">
                      <Avatar>
                        <AvatarImage src={review.volunteerAvatar} alt={review.volunteerName} />
                        <AvatarFallback>{review.volunteerName.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 space-y-2">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium">{review.volunteerName}</h4>
                            <div className="flex flex-wrap gap-1">
                              {review.skills.map((skill) => (
                                <Badge key={skill} variant="outline" className="text-xs">
                                  {skill}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="flex items-center">
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
                    </div>
                    {index < hostelData.reviews.length - 1 && <Separator className="mt-6" />}
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="photos" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Hostel Photos</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {hostelData.photos.map((photo, index) => (
                    <div key={index} className="aspect-square overflow-hidden rounded-lg">
                      <ImageWithFallback
                        src={photo}
                        alt={`${hostelData.name} photo ${index + 1}`}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  ))}
                  {isEditing && (
                    <div className="aspect-square border-2 border-dashed border-muted rounded-lg flex items-center justify-center">
                      <Button variant="outline" size="sm">
                        <Camera className="w-4 h-4 mr-2" />
                        Add Photo
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="applications" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Applications</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-muted-foreground">
                  <Users className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>No pending applications at the moment.</p>
                  <p className="text-sm">Applications from volunteers will appear here.</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}