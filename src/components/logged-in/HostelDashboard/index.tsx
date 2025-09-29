import React, { useState } from "react";
import { HostelDashboardHeader } from "./HostelDashboardHeader";
import { HostelOverviewTab } from "./HostelOverviewTab";
import { HostelVolunteersTab } from "./HostelVolunteersTab";
import { HostelReviewsTab } from "./HostelReviewsTab";
import { HostelPhotosTab } from "./HostelPhotosTab";
import { HostelApplicationsTab } from "./HostelApplicationsTab";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../ui/tabs";

interface HostelDashboardProps {
  hostelData: {
    description: string;
    volunteerRoles: string[];
    workHoursPerDay: string;
    accommodationType: string;
    minimumStay: string;
    maximumStay: string;
    mealsIncluded: boolean;
    wifiIncluded: boolean;
    amenities: string[];
    currentVolunteers: {
      id: number;
      name: string;
      avatar: string;
      role: string;
      startDate: string;
      endDate: string;
      skills: string[];
    }[];
    reviews: {
      id: number;
      volunteerName: string;
      volunteerAvatar: string;
      rating: number;
      comment: string;
      date: string;
      skills: string[];
    }[];
    photos: string[];
    applications: {
      id: number;
      name: string;
      avatar: string;
      skills: string[];
      availability: string;
      rating: number;
      applied: string;
    }[];
  };
  onBack: () => void;
}

export function HostelDashboard({ hostelData, onBack }: HostelDashboardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="min-h-screen bg-background">
      <HostelDashboardHeader
        isEditing={isEditing}
        onBack={onBack}
        toggleEditing={() => setIsEditing(!isEditing)}
      />
      <div className="max-w-6xl mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="volunteers">Current Volunteers</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
            <TabsTrigger value="photos">Photos</TabsTrigger>
            <TabsTrigger value="applications">Applications</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <HostelOverviewTab hostelData={hostelData} />
          </TabsContent>

          <TabsContent value="volunteers">
            <HostelVolunteersTab volunteers={hostelData.currentVolunteers} />
          </TabsContent>

          <TabsContent value="reviews">
            <HostelReviewsTab reviews={hostelData.reviews} />
          </TabsContent>

          <TabsContent value="photos">
            <HostelPhotosTab photos={hostelData.photos} />
          </TabsContent>

          <TabsContent value="applications">
            <HostelApplicationsTab applications={hostelData.applications} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
