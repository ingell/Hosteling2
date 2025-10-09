import React, { useState, useEffect } from "react";
import { Button } from "../../../ui/button";
import { Input } from "../../../ui/input";
import { Label } from "../../../ui/label";
import { Badge } from "../../../ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "../../../ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../../../ui/avatar";
import { Separator } from "../../../ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../../ui/tabs";
import { ImageWithFallback } from "../../../figma/ImageWithFallback";
import { LocalStorageManager, UserData } from "../../../utils/local-storage";
import { Edit, MapPin, Calendar, Star, MessageCircle, Settings, Camera, Globe } from "lucide-react";

interface VolunteerProfileProps {
  onBack: () => void;
  onEdit?: () => void;
}

export function VolunteerProfile({ onBack, onEdit }: VolunteerProfileProps) {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const data = LocalStorageManager.getUserData();
    setUserData(data);
  }, []);

  if (!userData || userData.type !== 'volunteer') {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="w-96">
          <CardContent className="p-6 text-center">
            <p className="text-muted-foreground mb-4">No volunteer profile found</p>
            <Button onClick={onBack}>Go Back</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const profile = userData.profile;
  const applications = LocalStorageManager.getApplications();
  const savedItems = LocalStorageManager.getSavedItems();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-white">
        <div className="max-w-4xl mx-auto px-4 py-4">
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

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Profile Header */}
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
          <div className="flex flex-col md:flex-row md:items-center gap-6">
            <div className="relative">
              <Avatar className="w-24 h-24">
                <AvatarImage src="https://images.unsplash.com/photo-1494790108755-2616b612b4d4?w=150&h=150&fit=crop&crop=face" />
                <AvatarFallback className="text-2xl bg-gradient-to-r from-orange-500 to-yellow-500 text-white">
                  {profile.firstName[0]}{profile.lastName[0]}
                </AvatarFallback>
              </Avatar>
              <Button size="sm" variant="outline" className="absolute -bottom-2 -right-2 w-8 h-8 p-0 rounded-full">
                <Camera className="w-4 h-4" />
              </Button>
            </div>
            
            <div className="flex-1">
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                <div>
                  <h1 className="text-3xl font-bold">{profile.firstName} {profile.lastName}</h1>
                  <p className="text-muted-foreground flex items-center mt-1">
                    <MapPin className="w-4 h-4 mr-1" />
                    {profile.city}, {profile.country}
                  </p>
                </div>
                <div className="flex items-center gap-4 mt-4 md:mt-0">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-orange-600">{applications.length}</p>
                    <p className="text-sm text-muted-foreground">Applications</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-orange-600">{savedItems.length}</p>
                    <p className="text-sm text-muted-foreground">Saved</p>
                  </div>
                </div>
              </div>
              
              <p className="text-muted-foreground mb-4">
                {profile.bio || "No bio available"}
              </p>
              
              <div className="flex flex-wrap gap-2">
                {profile.skills?.map((skill, index) => (
                  <Badge key={index} variant="secondary" className="bg-orange-100 text-orange-800">
                    {skill}
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
            <TabsTrigger value="applications">Applications</TabsTrigger>
            <TabsTrigger value="saved">Saved</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Basic Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Globe className="w-5 h-5 mr-2 text-orange-600" />
                    Basic Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">Email</Label>
                    <p>{profile.email}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">Location</Label>
                    <p>{profile.city}, {profile.country}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">Languages</Label>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {profile.languages?.map((language, index) => (
                        <Badge key={index} variant="outline">{language}</Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">Experience Level</Label>
                    <p className="capitalize">{profile.experience || "Not specified"}</p>
                  </div>
                </CardContent>
              </Card>

              {/* Availability */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Calendar className="w-5 h-5 mr-2 text-orange-600" />
                    Availability
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">Available From</Label>
                    <p>{profile.availability?.from ? new Date(profile.availability.from).toLocaleDateString() : "Not specified"}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">Available Until</Label>
                    <p>{profile.availability?.to ? new Date(profile.availability.to).toLocaleDateString() : "Not specified"}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">Preferred Commitment</Label>
                    <p>{profile.commitment || "Not specified"}</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="applications" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Your Applications</CardTitle>
                <p className="text-muted-foreground">Track your volunteer applications</p>
              </CardHeader>
              <CardContent>
                {applications.length === 0 ? (
                  <div className="text-center py-8">
                    <MessageCircle className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                    <p className="text-muted-foreground">No applications yet</p>
                    <p className="text-sm text-muted-foreground">Start applying to hostels to see your applications here</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {applications.map((application, index) => (
                      <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <h4 className="font-medium">{application.hostelName || `Application #${index + 1}`}</h4>
                          <p className="text-sm text-muted-foreground">
                            Applied: {new Date(application.appliedDate).toLocaleDateString()}
                          </p>
                        </div>
                        <Badge variant={application.status === 'pending' ? 'secondary' : 'default'}>
                          {application.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="saved" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Saved Opportunities</CardTitle>
                <p className="text-muted-foreground">Your bookmarked hostel opportunities</p>
              </CardHeader>
              <CardContent>
                {savedItems.length === 0 ? (
                  <div className="text-center py-8">
                    <Star className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                    <p className="text-muted-foreground">No saved opportunities yet</p>
                    <p className="text-sm text-muted-foreground">Save interesting opportunities to view them here</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {savedItems.map((itemId, index) => (
                      <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <h4 className="font-medium">Saved Opportunity #{index + 1}</h4>
                          <p className="text-sm text-muted-foreground">Item ID: {itemId}</p>
                        </div>
                        <Button variant="outline" size="sm">
                          View Details
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
                  Account Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Email Notifications</h4>
                    <p className="text-sm text-muted-foreground">Receive updates about your applications</p>
                  </div>
                  <Button variant="outline" size="sm">
                    Manage
                  </Button>
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Privacy Settings</h4>
                    <p className="text-sm text-muted-foreground">Control who can see your profile</p>
                  </div>
                  <Button variant="outline" size="sm">
                    Configure
                  </Button>
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-red-600">Delete Account</h4>
                    <p className="text-sm text-muted-foreground">Permanently delete your account and data</p>
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