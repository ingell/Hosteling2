import React, { useState, useEffect } from "react";
import { FilterBar } from "../shared/FilterBar";
import { HostelGrid } from "../hostels/HostelGrid";
import { Button } from "../ui/button";
import { ArrowLeft } from "lucide-react";
import { motion } from "motion/react";

interface BrowseHostelsPageProps {
  onBack: () => void;
  onHostelClick: (hostelId: string) => void;
  onApply: (hostelId: string) => void;
}

// Sample hostels data - in a real app this would come from API
const getSampleHostelsData = () => [
  {
    id: "1",
    name: "Nomad's Paradise Bangkok",
    location: "Bangkok, Thailand",
    country: "Thailand",
    image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=400&h=300&fit=crop",
    rating: 4.8,
    reviewCount: 24,
    roles: ["Reception", "Social Media", "Tours"],
    commitment: "2-8 weeks",
    workHours: "4-5 hours/day",
    accommodationType: "Shared Dorm",
    amenities: ["Free WiFi", "Breakfast", "Kitchen", "Common Room"],
    mealsIncluded: true,
    description: "Vibrant backpacker hostel in the heart of Khao San Road. Perfect for travelers who want to experience authentic Bangkok culture.",
    urgent: false,
    lastPosted: "2 days ago",
    verified: true
  },
  {
    id: "2", 
    name: "Surf Paradise Portugal",
    location: "Lisbon, Portugal",
    country: "Portugal",
    image: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=400&h=300&fit=crop",
    rating: 4.9,
    reviewCount: 31,
    roles: ["Reception", "Bar Help", "Events"],
    commitment: "3-12 weeks",
    workHours: "5-6 hours/day", 
    accommodationType: "Private Room",
    amenities: ["Free WiFi", "Kitchen", "Bar", "Terrace"],
    mealsIncluded: false,
    description: "Stylish hostel near the ocean with amazing sunset views. Perfect for digital nomads and surf enthusiasts.",
    urgent: true,
    lastPosted: "1 day ago",
    verified: true
  },
  {
    id: "3",
    name: "Cultural Hub Barcelona", 
    location: "Barcelona, Spain",
    country: "Spain",
    image: "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=400&h=300&fit=crop",
    rating: 4.6,
    reviewCount: 18,
    roles: ["Reception", "Cleaning", "Marketing"],
    commitment: "2-6 weeks",
    workHours: "4-6 hours/day",
    accommodationType: "Shared Dorm",
    amenities: ["Free WiFi", "Kitchen", "Common Room", "Lockers"],
    mealsIncluded: true,
    description: "Modern hostel in the Gothic Quarter, surrounded by art, culture, and incredible food.",
    urgent: false,
    lastPosted: "3 days ago",
    verified: false
  },
  {
    id: "4",
    name: "Mountain View Hostel",
    location: "Interlaken, Switzerland", 
    country: "Switzerland",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=300&fit=crop",
    rating: 4.7,
    reviewCount: 22,
    roles: ["Reception", "Maintenance", "Tours"],
    commitment: "4-10 weeks",
    workHours: "5-7 hours/day",
    accommodationType: "Shared Dorm",
    amenities: ["Free WiFi", "Kitchen", "Laundry", "Storage"],
    mealsIncluded: true,
    description: "Alpine hostel with stunning mountain views. Perfect for adventure lovers and hiking enthusiasts.",
    urgent: true,
    lastPosted: "1 day ago",
    verified: true
  },
  {
    id: "5",
    name: "Beachfront Bali Retreat",
    location: "Canggu, Bali",
    country: "Indonesia", 
    image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=400&h=300&fit=crop",
    rating: 4.5,
    reviewCount: 16,
    roles: ["Social Media", "Events", "Bar Help"],
    commitment: "2-8 weeks",
    workHours: "4-5 hours/day",
    accommodationType: "Private Room",
    amenities: ["Free WiFi", "Pool", "Kitchen", "Beach Access"],
    mealsIncluded: false,
    description: "Tropical paradise hostel steps from the beach. Join our community of surfers, yogis, and digital nomads.",
    urgent: false,
    lastPosted: "4 days ago",
    verified: true
  }
];

export function BrowseHostelsPage({ onBack, onHostelClick, onApply }: BrowseHostelsPageProps) {
  const [hostels, setHostels] = useState(getSampleHostelsData());
  const [filteredHostels, setFilteredHostels] = useState(hostels);
  const [searchQuery, setSearchQuery] = useState("");
  const [location, setLocation] = useState("");
  const [filters, setFilters] = useState({
    commitment: [],
    rating: [4],
    amenities: [],
    urgentOnly: false,
    verified: false
  });
  const [sortBy, setSortBy] = useState("newest");
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [favoriteHostels, setFavoriteHostels] = useState(new Set<string>());
  const [isLoading, setIsLoading] = useState(false);

  // Filter and search logic
  useEffect(() => {
    let filtered = [...hostels];

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(hostel => 
        hostel.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        hostel.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        hostel.roles.some(role => role.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    // Location filter
    if (location) {
      filtered = filtered.filter(hostel => 
        hostel.location.toLowerCase().includes(location.toLowerCase()) ||
        hostel.country.toLowerCase().includes(location.toLowerCase())
      );
    }

    // Commitment filter
    if (filters.commitment && filters.commitment.length > 0) {
      // This would need more sophisticated matching in a real app
      filtered = filtered.filter(hostel => 
        filters.commitment.some(commitment => 
          hostel.commitment.toLowerCase().includes(commitment.toLowerCase())
        )
      );
    }

    // Rating filter
    if (filters.rating && filters.rating[0] > 1) {
      filtered = filtered.filter(hostel => hostel.rating >= filters.rating[0]);
    }

    // Urgent only filter
    if (filters.urgentOnly) {
      filtered = filtered.filter(hostel => hostel.urgent);
    }

    // Verified only filter
    if (filters.verified) {
      filtered = filtered.filter(hostel => hostel.verified);
    }

    // Sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'rating':
          return b.rating - a.rating;
        case 'urgent':
          if (a.urgent && !b.urgent) return -1;
          if (!a.urgent && b.urgent) return 1;
          return 0;
        case 'alphabetical':
          return a.name.localeCompare(b.name);
        case 'newest':
        default:
          // Mock sorting by date - in real app would use actual dates
          const dateOrder = { "1 day ago": 3, "2 days ago": 2, "3 days ago": 1, "4 days ago": 0 };
          return (dateOrder[b.lastPosted as keyof typeof dateOrder] || 0) - (dateOrder[a.lastPosted as keyof typeof dateOrder] || 0);
      }
    });

    setFilteredHostels(filtered);
  }, [hostels, searchQuery, location, filters, sortBy]);

  const handleFavorite = (hostelId: string) => {
    setFavoriteHostels(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(hostelId)) {
        newFavorites.delete(hostelId);
      } else {
        newFavorites.add(hostelId);
      }
      return newFavorites;
    });
  };

  const getActiveFiltersCount = () => {
    let count = 0;
    if (filters.commitment && filters.commitment.length > 0) count += filters.commitment.length;
    if (filters.rating && filters.rating[0] > 1) count++;
    if (filters.amenities && filters.amenities.length > 0) count += filters.amenities.length;
    if (filters.urgentOnly) count++;
    if (filters.verified) count++;
    return count;
  };

  const clearFilters = () => {
    setFilters({
      commitment: [],
      rating: [1],
      amenities: [],
      urgentOnly: false,
      verified: false
    });
    setSearchQuery("");
    setLocation("");
  };

  const searchSuggestions = [
    "Reception work", "Social media", "Bar help", "Tours guide", 
    "Marketing", "Events coordination", "Cleaning", "Maintenance"
  ].filter(suggestion => 
    searchQuery && suggestion.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-yellow-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" onClick={onBack} className="flex items-center space-x-2">
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </Button>
              <div>
                <h1 className="text-2xl font-bold">Browse Hostels</h1>
                <p className="text-muted-foreground">Find your perfect volunteer opportunity</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Bar */}
      <FilterBar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        location={location}
        onLocationChange={setLocation}
        filters={filters}
        onFiltersChange={setFilters}
        activeFilters={getActiveFiltersCount()}
        onClearFilters={clearFilters}
        suggestions={searchSuggestions}
      />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <HostelGrid
            hostels={filteredHostels}
            onHostelClick={onHostelClick}
            onApply={onApply}
            onFavorite={handleFavorite}
            favoriteHostels={favoriteHostels}
            isLoading={isLoading}
            sortBy={sortBy}
            onSortChange={setSortBy}
            viewMode={viewMode}
            onViewModeChange={setViewMode}
            emptyMessage="Try adjusting your search criteria or explore different locations."
          />
        </motion.div>
      </div>
    </div>
  );
}