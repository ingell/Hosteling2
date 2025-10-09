import React, { useState } from "react";
import { Button } from "../../ui/button";
import { HostelHeader } from "../../hostels/HostelHeader";
import { PhotoGallery } from "../../features/PhotoGallery";
import { HostelDescription } from "../../hostels/HostelDescription";
import { HostelAmenities } from "../../hostels/HostelAmenities";
import { HostelRequirements } from "../../hostels/HostelRequirements";
import { HostelApplicationCard } from "../../hostels/HostelApplicationCard";
import { HostelHostInfo } from "../../hostels/HostelHostInfo";
import { ReviewSystem } from "../../features/ReviewSystem";
import { CalendarIntegration } from "../../features/CalendarIntegration";

interface HostelDetailViewProps {
  hostel: any;
  onBack: () => void;
  onApply: (hostelId: string) => void;
  onContact: (hostelId: string) => void;
  userType: 'volunteer' | 'hostel';
}

export function HostelDetailView({ hostel, onBack, onApply, onContact, userType }: HostelDetailViewProps) {
  const [isFavorited, setIsFavorited] = useState(false);
  const [isApplied, setIsApplied] = useState(false);

  if (!hostel) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-yellow-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Hostel not found</h2>
          <Button onClick={onBack} variant="outline">
            ← Go Back
          </Button>
        </div>
      </div>
    );
  }

  const handleApply = (hostelId: string) => {
    setIsApplied(true);
    onApply(hostelId);
  };

  const handleFavorite = () => {
    setIsFavorited(!isFavorited);
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    // You could add a toast notification here
  };

  // Sample images for the gallery
  const galleryImages = [
    hostel.image,
    `https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=800&h=600&fit=crop`,
    `https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=800&h=600&fit=crop`,
    `https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=600&fit=crop`,
    `https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&h=600&fit=crop`
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-yellow-50">
      <HostelHeader 
        onBack={onBack}
        onShare={handleShare}
        onFavorite={handleFavorite}
        isFavorited={isFavorited}
      />

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            <PhotoGallery
              images={galleryImages}
              name={hostel.name}
              location={hostel.location}
              rating={hostel.rating || 4.8}
              reviewCount={127}
            />

            <HostelDescription hostel={hostel} />

            <HostelAmenities />

            <HostelRequirements hostel={hostel} />

            <CalendarIntegration
              hostelId={hostel.id}
              userType={userType}
              mode="booking"
            />

            <ReviewSystem
              hostelId={hostel.id}
              averageRating={hostel.rating || 4.8}
              totalReviews={127}
              userType={userType}
            />

          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <HostelApplicationCard
              hostel={hostel}
              onApply={handleApply}
              onContact={onContact}
              onSaveToFavorites={() => setIsFavorited(!isFavorited)}
              userType={userType}
              isFavorited={isFavorited}
              isApplied={isApplied}
            />

            <HostelHostInfo
              hostel={hostel}
              onContact={onContact}
            />
          </div>
        </div>
      </div>
    </div>
  );
}