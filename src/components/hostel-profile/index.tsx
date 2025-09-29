import React from "react";
import { HostelProfileHeader } from "./HostelProfileHeader";
import { HostelProfileDetails } from "./HostelProfileDetails";
import { HostelProfileTabs } from "./HostelProfileTabs";

interface HostelProfileProps {
  hostelData: {
    name: string;
    avatar: string;
    city: string;
    country: string;
    establishedYear: number;
    totalBeds: number;
    type: string;
    totalVolunteersHosted: number;
    totalRating: number;
    reviewCount: number;
    amenities: string[];
    contactName: string;
    email: string;
    phone: string;
    address: string;
    languages: string[];
    description: string;
    volunteerRoles: string[];
    workHoursPerDay: string;
    accommodationType: string;
    minimumStay: string;
    maximumStay: string;
    mealsIncluded: boolean;
    wifiIncluded: boolean;
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

export function HostelProfile({ hostelData, onBack }: HostelProfileProps) {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <HostelProfileHeader hostelData={hostelData} />
        <HostelProfileDetails hostelData={hostelData} />
        <HostelProfileTabs hostelData={hostelData} />
      </div>
    </div>
  );
}
