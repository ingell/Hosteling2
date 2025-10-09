import React, { useState, useEffect } from "react";
import { Button } from "../../../ui/button";
import { Badge } from "../../../ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "../../../ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../../../ui/avatar";
import { Separator } from "../../../ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../../ui/tabs";
import { ImageWithFallback } from "../../../figma/ImageWithFallback";
import { LocalStorageManager, UserData } from "../../../utils/local-storage";
import { 
  Edit, MapPin, Phone, Mail, Calendar, Star, Users, Settings, 
  Camera, Bed, Home, Wifi, Coffee, Utensils, Car, MessageCircle,
  UserPlus, Building2, Clock
} from "lucide-react";

interface HostelProfileProps {
  onBack: () => void;
  onEdit?: () => void;
}

export function HostelProfile({ onBack, onEdit }: HostelProfileProps) {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const data = LocalStorageManager.getUserData();
    setUserData(data);
  }, []);

  if (!userData || userData.type !== 'hostel') {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="w-96">
          <CardContent className="p-6 text-center">
            <p className="text-muted-foreground mb-4">No hostel profile found</p>
            <Button onClick={onBack}>Go Back</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const profile = userData.profile;
  const messages = LocalStorageManager.getMessages();
  const applications = LocalStorageManager.getApplications();

  // Mock amenities icons
  const amenityIcons: { [key: string]: React.ReactNode } = {
    'Free WiFi': <Wifi className="w-4 h-4" />,
    'Breakfast included': <Coffee className="w-4 h-4" />,
    'Kitchen access': <Utensils className="w-4 h-4" />,
    'Laundry': <Home className="w-4 h-4" />,
    'Common room': <Users className="w-4 h-4" />,
    'Garden/Terrace': <Home className="w-4 h-4" />,
    'Tours': <Car className="w-4 h-4" />,
    '24/7 reception': <Clock className="w-4 h-4" />
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-white">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Button variant="ghost" onClick={onBack}>
              ← Back
            </Button>
            <Button variant="outline" onClick={onEdit}>
              <Edit className="w-4 h-4 mr-2" />
              Edit Profile
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Profile Header */}
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
          <div className="flex flex-col lg:flex-row lg:items-start gap-6">
            <div className="flex flex-col items-center lg:items-start">
              <div className="relative mb-4">
                <Avatar className="w-32 h-32">
                  <AvatarImage src="https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=150&h=150&fit=crop" />
                  <AvatarFallback className="text-3xl bg-gradient-to-r from-orange-500 to-yellow-500 text-white">
                    {profile.hostelName[0]}
                  </AvatarFallback>
                </Avatar>
                <Button size="sm" variant="outline" className="absolute -bottom-2 -right-2 w-8 h-8 p-0 rounded-full">
                  <Camera className="w-4 h-4" />
                </Button>
              </div>
              
              {/* Photo Gallery */}
              <div className="grid grid-cols-3 gap-2 w-full max-w-xs">
                {profile.photos?.slice(0, 3).map((photo, index) => (
                  <div key={index} className="relative aspect-square rounded-lg overflow-hidden">
                    <ImageWithFallback
                      src={photo}
                      alt={`${profile.hostelName} photo ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
            
            <div className="flex-1">
              <div className="flex flex-col xl:flex-row xl:items-start justify-between mb-6">
                <div className="mb-4 xl:mb-0">
                  <h1 className="text-3xl font-bold mb-2">{profile.hostelName}</h1>
                  <div className="space-y-2 text-muted-foreground">
                    <p className="flex items-center">
                      <MapPin className="w-4 h-4 mr-2" />
                      {profile.address}, {profile.city}, {profile.country}
                    </p>
                    <p className="flex items-center">
                      <Mail className="w-4 h-4 mr-2" />
                      {profile.email}
                    </p>
                    <p className="flex items-center">
                      <Phone className="w-4 h-4 mr-2" />
                      {profile.phone}
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-6">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-orange-600">{applications.length}</p>
                    <p className="text-sm text-muted-foreground">Applications</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-orange-600">{messages.length}</p>
                    <p className="text-sm text-muted-foreground">Messages</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-orange-600">{profile.totalBeds || 'N/A'}</p>
                    <p className="text-sm text-muted-foreground">Total Beds</p>
                  </div>
                </div>
              </div>
              
              <p className="text-muted-foreground mb-4 leading-relaxed">
                {profile.description || "No description available"}
              </p>
              
              <div className="flex flex-wrap gap-2">
                {profile.volunteerRoles?.map((role, index) => (
                  <Badge key={index} variant="secondary" className="bg-orange-100 text-orange-800">
                    {role}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Profile Content */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="volunteers">Volunteers</TabsTrigger>
            <TabsTrigger value="messages">Messages</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Basic Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Building2 className="w-5 h-5 mr-2 text-orange-600" />
                    Hostel Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-medium text-sm text-muted-foreground">Hostel Type</h4>
                    <p>{profile.hostelType || "Not specified"}</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-sm text-muted-foreground">Established</h4>
                    <p>{profile.establishedYear || "Not specified"}</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-sm text-muted-foreground">Contact Person</h4>
                    <p>{profile.contactFirstName} {profile.contactLastName}</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-sm text-muted-foreground">Languages</h4>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {profile.languages?.map((language, index) => (
                        <Badge key={index} variant="outline" className="text-xs">{language}</Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Work Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <UserPlus className="w-5 h-5 mr-2 text-orange-600" />
                    Volunteer Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-medium text-sm text-muted-foreground">Work Hours/Day</h4>
                    <p>{profile.workHoursPerDay || "Not specified"}</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-sm text-muted-foreground">Minimum Stay</h4>
                    <p>{profile.minimumStay || "Not specified"}</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-sm text-muted-foreground">Maximum Stay</h4>
                    <p>{profile.maximumStay || "Not specified"}</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-sm text-muted-foreground">Accommodation</h4>
                    <p>{profile.accommodationType || "Not specified"}</p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-medium text-sm text-muted-foreground">Included</h4>
                    <div className="flex flex-wrap gap-1">
                      {profile.mealsIncluded && <Badge variant="outline" className="text-xs">Meals</Badge>}
                      {profile.wifiIncluded && <Badge variant="outline" className="text-xs">WiFi</Badge>}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Amenities */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Star className="w-5 h-5 mr-2 text-orange-600" />
                    Amenities
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-3">
                    {profile.amenities?.map((amenity, index) => (
                      <div key={index} className="flex items-center space-x-2 text-sm">
                        {amenityIcons[amenity] || <Star className="w-4 h-4" />}
                        <span>{amenity}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="volunteers" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Current & Past Volunteers</CardTitle>
                <p className="text-muted-foreground">Manage your volunteer applications and reviews</p>
              </CardHeader>
              <CardContent>
                {applications.length === 0 ? (
                  <div className="text-center py-8">
                    <Users className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                    <p className="text-muted-foreground">No applications yet</p>
                    <p className="text-sm text-muted-foreground">Applications from volunteers will appear here</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {applications.map((application, index) => (
                      <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center space-x-4">
                          <Avatar>
                            <AvatarFallback>V{index + 1}</AvatarFallback>
                          </Avatar>
                          <div>
                            <h4 className="font-medium">Application #{index + 1}</h4>
                            <p className="text-sm text-muted-foreground">
                              Applied: {new Date(application.appliedDate).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge variant={application.status === 'pending' ? 'secondary' : 'default'}>
                            {application.status}
                          </Badge>
                          <Button variant="outline" size="sm">
                            View
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="messages" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Messages</CardTitle>
                <p className="text-muted-foreground">Communications with volunteers</p>
              </CardHeader>
              <CardContent>
                {messages.length === 0 ? (
                  <div className="text-center py-8">
                    <MessageCircle className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                    <p className="text-muted-foreground">No messages yet</p>
                    <p className="text-sm text-muted-foreground">Messages with volunteers will appear here</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {messages.map((message, index) => (
                      <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <h4 className="font-medium">Message #{index + 1}</h4>
                          <p className="text-sm text-muted-foreground">
                            {new Date(message.timestamp).toLocaleDateString()}
                          </p>
                        </div>
                        <Button variant="outline" size="sm">
                          View
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Settings className="w-5 h-5 mr-2 text-orange-600" />
                  Hostel Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Listing Visibility</h4>
                    <p className="text-sm text-muted-foreground">Control if your hostel appears in search results</p>
                  </div>
                  <Button variant="outline" size="sm">
                    Manage
                  </Button>
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Notification Preferences</h4>
                    <p className="text-sm text-muted-foreground">Set how you receive application updates</p>
                  </div>
                  <Button variant="outline" size="sm">
                    Configure
                  </Button>
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-red-600">Delete Hostel Profile</h4>
                    <p className="text-sm text-muted-foreground">Permanently remove your hostel from the platform</p>
                  </div>
                  <Button variant="destructive" size="sm">
                    Delete
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}