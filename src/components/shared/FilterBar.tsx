import React from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Checkbox } from "../ui/checkbox";
import { Slider } from "../ui/slider";
import { Badge } from "../ui/badge";
import { Search, Filter, X, MapPin, Calendar, Users, Star } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

interface FilterBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  location: string;
  onLocationChange: (location: string) => void;
  filters: {
    commitment?: string[];
    rating?: number[];
    amenities?: string[];
    urgentOnly?: boolean;
    verified?: boolean;
  };
  onFiltersChange: (filters: any) => void;
  activeFilters: number;
  onClearFilters: () => void;
  suggestions?: string[];
  showAdvanced?: boolean;
}

export function FilterBar({
  searchQuery,
  onSearchChange,
  location,
  onLocationChange,
  filters,
  onFiltersChange,
  activeFilters,
  onClearFilters,
  suggestions = [],
  showAdvanced = true
}: FilterBarProps) {
  const commitmentOptions = [
    "1-2 weeks", "2-4 weeks", "1-3 months", "3+ months"
  ];

  const amenityOptions = [
    "Free WiFi", "Kitchen Access", "Meals Included", "Private Room", 
    "24/7 Security", "Parking", "Common Room", "Near Beach"
  ];

  const locationSuggestions = [
    "Bangkok, Thailand", "Lisbon, Portugal", "Barcelona, Spain", 
    "Bali, Indonesia", "Prague, Czech Republic", "Berlin, Germany"
  ];

  return (
    <div className="bg-white border-b sticky top-0 z-30">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="space-y-4">
          {/* Main Search Bar */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search hostels, cities, or roles..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="pl-10"
              />
              {/* Search Suggestions */}
              {searchQuery && suggestions.length > 0 && (
                <div className="absolute top-full left-0 right-0 bg-white border border-t-0 rounded-b-lg shadow-lg z-40 max-h-60 overflow-y-auto">
                  {suggestions.map((suggestion, index) => (
                    <button
                      key={index}
                      onClick={() => onSearchChange(suggestion)}
                      className="w-full text-left px-4 py-2 hover:bg-gray-50 text-sm"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="md:w-64 relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Where do you want to go?"
                value={location}
                onChange={(e) => onLocationChange(e.target.value)}
                className="pl-10"
              />
              {/* Location Suggestions */}
              {location && locationSuggestions.filter(loc => 
                loc.toLowerCase().includes(location.toLowerCase())
              ).length > 0 && (
                <div className="absolute top-full left-0 right-0 bg-white border border-t-0 rounded-b-lg shadow-lg z-40 max-h-60 overflow-y-auto">
                  {locationSuggestions
                    .filter(loc => loc.toLowerCase().includes(location.toLowerCase()))
                    .map((suggestion, index) => (
                      <button
                        key={index}
                        onClick={() => onLocationChange(suggestion)}
                        className="w-full text-left px-4 py-2 hover:bg-gray-50 text-sm"
                      >
                        {suggestion}
                      </button>
                    ))}
                </div>
              )}
            </div>

            {showAdvanced && (
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="relative">
                    <Filter className="w-4 h-4 mr-2" />
                    Filters
                    {activeFilters > 0 && (
                      <Badge className="ml-2 bg-orange-500 text-white text-xs">
                        {activeFilters}
                      </Badge>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80 p-0" align="end">
                  <div className="p-4 space-y-6">
                    <div className="flex items-center justify-between">
                      <h4 className="font-semibold">Filters</h4>
                      {activeFilters > 0 && (
                        <Button variant="ghost" size="sm" onClick={onClearFilters}>
                          <X className="w-4 h-4 mr-1" />
                          Clear all
                        </Button>
                      )}
                    </div>

                    {/* Commitment Duration */}
                    <div>
                      <label className="text-sm font-medium mb-2 block">
                        <Calendar className="w-4 h-4 inline mr-1" />
                        Commitment Duration
                      </label>
                      <div className="space-y-2">
                        {commitmentOptions.map((option) => (
                          <div key={option} className="flex items-center space-x-2">
                            <Checkbox
                              checked={filters.commitment?.includes(option)}
                              onCheckedChange={(checked) => {
                                const current = filters.commitment || [];
                                const updated = checked
                                  ? [...current, option]
                                  : current.filter(c => c !== option);
                                onFiltersChange({ ...filters, commitment: updated });
                              }}
                            />
                            <span className="text-sm">{option}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Rating Filter */}
                    <div>
                      <label className="text-sm font-medium mb-2 block">
                        <Star className="w-4 h-4 inline mr-1" />
                        Minimum Rating
                      </label>
                      <div className="px-2">
                        <Slider
                          value={filters.rating || [4]}
                          onValueChange={(value) => onFiltersChange({ ...filters, rating: value })}
                          max={5}
                          min={1}
                          step={0.1}
                          className="w-full"
                        />
                        <div className="flex justify-between text-xs text-muted-foreground mt-1">
                          <span>1.0</span>
                          <span className="font-medium">{filters.rating?.[0] || 4}+</span>
                          <span>5.0</span>
                        </div>
                      </div>
                    </div>

                    {/* Amenities */}
                    <div>
                      <label className="text-sm font-medium mb-2 block">
                        <Users className="w-4 h-4 inline mr-1" />
                        Amenities
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        {amenityOptions.map((amenity) => (
                          <div key={amenity} className="flex items-center space-x-2">
                            <Checkbox
                              checked={filters.amenities?.includes(amenity)}
                              onCheckedChange={(checked) => {
                                const current = filters.amenities || [];
                                const updated = checked
                                  ? [...current, amenity]
                                  : current.filter(a => a !== amenity);
                                onFiltersChange({ ...filters, amenities: updated });
                              }}
                            />
                            <span className="text-xs">{amenity}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Quick Filters */}
                    <div>
                      <label className="text-sm font-medium mb-2 block">Quick Filters</label>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            checked={filters.urgentOnly}
                            onCheckedChange={(checked) => 
                              onFiltersChange({ ...filters, urgentOnly: checked })}
                          />
                          <span className="text-sm">Urgent hiring only</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            checked={filters.verified}
                            onCheckedChange={(checked) => 
                              onFiltersChange({ ...filters, verified: checked })}
                          />
                          <span className="text-sm">Verified hostels only</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            )}
          </div>

          {/* Active Filters Display */}
          {activeFilters > 0 && (
            <div className="flex flex-wrap gap-2 items-center">
              <span className="text-sm text-muted-foreground">Active filters:</span>
              
              {filters.commitment?.map((commitment) => (
                <Badge key={commitment} variant="secondary" className="bg-orange-100 text-orange-700">
                  {commitment}
                  <button
                    onClick={() => {
                      const updated = filters.commitment?.filter(c => c !== commitment) || [];
                      onFiltersChange({ ...filters, commitment: updated });
                    }}
                    className="ml-1 hover:bg-orange-200 rounded-full p-0.5"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </Badge>
              ))}

              {filters.rating && filters.rating[0] > 1 && (
                <Badge variant="secondary" className="bg-yellow-100 text-yellow-700">
                  {filters.rating[0]}+ stars
                  <button
                    onClick={() => onFiltersChange({ ...filters, rating: undefined })}
                    className="ml-1 hover:bg-yellow-200 rounded-full p-0.5"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </Badge>
              )}

              {filters.urgentOnly && (
                <Badge variant="secondary" className="bg-red-100 text-red-700">
                  Urgent only
                  <button
                    onClick={() => onFiltersChange({ ...filters, urgentOnly: false })}
                    className="ml-1 hover:bg-red-200 rounded-full p-0.5"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </Badge>
              )}

              {filters.verified && (
                <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                  Verified only
                  <button
                    onClick={() => onFiltersChange({ ...filters, verified: false })}
                    className="ml-1 hover:bg-blue-200 rounded-full p-0.5"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </Badge>
              )}

              <Button variant="ghost" size="sm" onClick={onClearFilters} className="text-muted-foreground">
                Clear all
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}