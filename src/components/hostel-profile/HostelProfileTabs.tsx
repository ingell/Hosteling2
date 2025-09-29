import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { HostelVolunteersTab } from "../logged-in/HostelDashboard/HostelVolunteersTab";
import { HostelReviewsTab } from "../logged-in/HostelDashboard/HostelReviewsTab";
import { HostelPhotosTab } from "../logged-in/HostelDashboard/HostelPhotosTab";
import { HostelApplicationsTab } from "../logged-in/HostelDashboard/HostelApplicationsTab";
import { HostelOverviewTab } from "../logged-in/HostelDashboard/HostelOverviewTab"; // Fixed typo

interface HostelProfileTabsProps {
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
}

export function HostelProfileTabs({ hostelData }: HostelProfileTabsProps) {
  const [activeTab, setActiveTab] = useState("overview");

  return (
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
  );
}
