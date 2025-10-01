import React from "react";
import { HostelCard } from "./HostelCard";
import { Button } from "../ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Loader2, Grid3X3, List, SortDesc } from "lucide-react";

interface Hostel {
  id: string;
  name: string;
  location: string;
  country: string;
  image: string;
  rating: number;
  reviewCount: number;
  roles: string[];
  commitment: string;
  workHours: string;
  accommodationType: string;
  amenities: string[];
  mealsIncluded: boolean;
  description: string;
  urgent: boolean;
  lastPosted: string;
  verified?: boolean;
}

interface HostelGridProps {
  hostels: Hostel[];
  onHostelClick: (hostelId: string) => void;
  onApply: (hostelId: string) => void;
  onFavorite?: (hostelId: string) => void;
  favoriteHostels?: Set<string>;
  isLoading?: boolean;
  hasMore?: boolean;
  onLoadMore?: () => void;
  sortBy?: string;
  onSortChange?: (sortBy: string) => void;
  viewMode?: 'grid' | 'list';
  onViewModeChange?: (mode: 'grid' | 'list') => void;
  showApplyButton?: boolean;
  emptyMessage?: string;
}

export function HostelGrid({
  hostels,
  onHostelClick,
  onApply,
  onFavorite,
  favoriteHostels = new Set(),
  isLoading = false,
  hasMore = false,
  onLoadMore,
  sortBy = 'newest',
  onSortChange,
  viewMode = 'grid',
  onViewModeChange,
  showApplyButton = true,
  emptyMessage = "No hostels found matching your criteria."
}: HostelGridProps) {
  if (isLoading && hostels.length === 0) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-orange-500" />
          <p className="text-muted-foreground">Finding hostels...</p>
        </div>
      </div>
    );
  }

  if (hostels.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="max-w-md mx-auto">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold mb-2">No hostels found</h3>
          <p className="text-muted-foreground">{emptyMessage}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Controls Bar */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center space-x-4">
          <p className="text-sm text-muted-foreground">
            {hostels.length} hostel{hostels.length !== 1 ? 's' : ''} found
          </p>
          
          {/* Urgent count */}
          {hostels.some(h => h.urgent) && (
            <div className="flex items-center space-x-1 text-sm text-red-600">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
              <span>{hostels.filter(h => h.urgent).length} urgent</span>
            </div>
          )}
        </div>

        <div className="flex items-center space-x-4">
          {/* Sort */}
          {onSortChange && (
            <div className="flex items-center space-x-2">
              <SortDesc className="w-4 h-4 text-muted-foreground" />
              <Select value={sortBy} onValueChange={onSortChange}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest first</SelectItem>
                  <SelectItem value="rating">Highest rated</SelectItem>
                  <SelectItem value="urgent">Urgent first</SelectItem>
                  <SelectItem value="alphabetical">A to Z</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}

          {/* View Mode Toggle */}
          {onViewModeChange && (
            <div className="flex items-center bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => onViewModeChange('grid')}
                className={`p-2 rounded transition-colors ${
                  viewMode === 'grid' 
                    ? 'bg-white shadow-sm text-orange-600' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Grid3X3 className="w-4 h-4" />
              </button>
              <button
                onClick={() => onViewModeChange('list')}
                className={`p-2 rounded transition-colors ${
                  viewMode === 'list' 
                    ? 'bg-white shadow-sm text-orange-600' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Hostel Grid/List */}
      <div className={`${
        viewMode === 'grid' 
          ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' 
          : 'space-y-4'
      }`}>
        {hostels.map((hostel) => (
          <HostelCard
            key={hostel.id}
            hostel={hostel}
            onHostelClick={onHostelClick}
            onApply={onApply}
            onFavorite={onFavorite}
            isFavorited={favoriteHostels.has(hostel.id)}
            showApplyButton={showApplyButton}
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
              'Load More Hostels'
            )}
          </Button>
        </div>
      )}

      {/* Loading More Indicator */}
      {isLoading && hostels.length > 0 && (
        <div className="text-center py-4">
          <Loader2 className="w-6 h-6 animate-spin mx-auto text-orange-500" />
        </div>
      )}
    </div>
  );
}