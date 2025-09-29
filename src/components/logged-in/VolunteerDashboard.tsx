import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { BarChart3, Star, Clock, Heart } from "lucide-react";

interface VolunteerDashboardProps {
  userData: {
    profile: {
      completedVolunteering: number;
      rating: number;
      daysLeft: number;
      savedOpportunities: string[];
    };
  };
  onLogout: () => void;
}

export function VolunteerDashboard({
  userData,
  onLogout,
}: VolunteerDashboardProps) {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <BarChart3 className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-xl">Volunteer Dashboard</span>
            </div>
            <button
              onClick={onLogout}
              className="text-sm text-red-500 hover:underline"
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="opportunities">Opportunities</TabsTrigger>
            <TabsTrigger value="saved">Saved</TabsTrigger>
            <TabsTrigger value="applications">Applications</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-2">
                    <BarChart3 className="w-5 h-5 text-primary" />
                    <div>
                      <p className="text-2xl">
                        {userData.profile.completedVolunteering || 0}
                      </p>
                      <p className="text-sm text-muted-foreground">Completed</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-2">
                    <Star className="w-5 h-5 text-yellow-500" />
                    <div>
                      <p className="text-2xl">{userData.profile.rating || 0}</p>
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
                        {userData.profile.daysLeft || 0}
                      </p>
                      <p className="text-sm text-muted-foreground">Days Left</p>
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
                        {userData.profile.savedOpportunities.length || 0}
                      </p>
                      <p className="text-sm text-muted-foreground">Saved</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Opportunities Tab */}
          <TabsContent value="opportunities">
            <p>Browse volunteer opportunities here.</p>
          </TabsContent>

          {/* Saved Tab */}
          <TabsContent value="saved">
            <p>View your saved opportunities here.</p>
          </TabsContent>

          {/* Applications Tab */}
          <TabsContent value="applications">
            <p>Track your applications here.</p>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
