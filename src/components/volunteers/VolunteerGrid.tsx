import React from "react";
import { VolunteerCard } from "./VolunteerCard";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";

interface Volunteer {
  id: string;
  firstName: string;
  lastName: string;
  avatar?: string;
  location: string;
  country: string;
  age: number;
  rating: number;
  reviewCount: number;
  completedVolunteering: number;
  skills: string[];
  languages: string[];
  experience: string;
  availability: {
    from: string;
    to: string;
  };
  preferences: {
    workHours: string;
    accommodation: string;
    minimumStay: string;
    maximumStay: string;
  };
  bio?: string;
  verified?: boolean;
}

interface VolunteerGridProps {
  volunteers: Volunteer[];
  onVolunteerClick: (volunteerId: string) => void;
  onContact: (volunteerId: string) => void;
  showRequestButton?: boolean;
  requestedVolunteers?: Set<string>;
  isLoading?: boolean;
  hasMore?: boolean;
  onLoadMore?: () => void;
  emptyMessage?: string;
}

export function VolunteerGrid({
  volunteers,
  onVolunteerClick,
  onContact,
  showRequestButton = true,
  requestedVolunteers = new Set(),
  isLoading = false,
  hasMore = false,
  onLoadMore,
  emptyMessage = "No volunteers found matching your criteria."
}: VolunteerGridProps) {
  if (isLoading && volunteers.length === 0) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-orange-500" />
          <p className="text-muted-foreground">Finding volunteers...</p>
        </div>
      </div>
    );
  }

  if (volunteers.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="max-w-md mx-auto">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold mb-2">No volunteers found</h3>
          <p className="text-muted-foreground">{emptyMessage}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Results Count */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Showing {volunteers.length} volunteer{volunteers.length !== 1 ? 's' : ''}
        </p>
      </div>

      {/* Volunteer Grid */}
      <div className="grid gap-6">
        {volunteers.map((volunteer) => (
          <VolunteerCard
            key={volunteer.id}
            volunteer={volunteer}
            onVolunteerClick={onVolunteerClick}
            onContact={onContact}
            showRequestButton={showRequestButton}
            isRequested={requestedVolunteers.has(volunteer.id)}
          />
        ))}
      </div>

      {/* Load More Button */}
      {hasMore && (
        <div className="text-center pt-6">
          <Button 
            variant="outline" 
            onClick={onLoadMore}
            disabled={isLoading}
            className="min-w-32"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Loading...
              </>
            ) : (
              'Load More Volunteers'
            )}
          </Button>
        </div>
      )}

      {/* Loading More Indicator */}
      {isLoading && volunteers.length > 0 && (
        <div className="text-center py-4">
          <Loader2 className="w-6 h-6 animate-spin mx-auto text-orange-500" />
        </div>
      )}
    </div>
  );
}