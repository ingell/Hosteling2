import React, { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Checkbox } from "./ui/checkbox";
import { Slider } from "./ui/slider";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { AdvancedSearch } from "./AdvancedSearch";
import {
  Search,
  MapPin,
  Star,
  Heart,
  Filter,
  Users,
  Clock,
  Wifi,
  Coffee,
  Camera,
  ChevronDown,
  Calendar,
} from "lucide-react";

interface BrowseHostelsProps {
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
    image:
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=400&h=300&fit=crop",
    rating: 4.8,
    reviewCount: 24,
    roles: ["Reception", "Social Media", "Tours"],
    commitment: "2-8 weeks",
    workHours: "4-5 hours/day",
    accommodationType: "Shared Dorm",
    amenities: ["Free WiFi", "Breakfast", "Kitchen", "Common Room"],
    mealsIncluded: true,
    description:
      "Vibrant backpacker hostel in the heart of Khao San Road. Perfect for travelers who want to experience authentic Bangkok culture.",
    urgent: false,
    lastPosted: "2 days ago",
  },
  {
    id: "2",
    name: "Surf Paradise Portugal",
    location: "Lisbon, Portugal",
    country: "Portugal",
    image:
      "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=400&h=300&fit=crop",
    rating: 4.9,
    reviewCount: 31,
    roles: ["Reception", "Bar Help", "Events"],
    commitment: "3-12 weeks",
    workHours: "5-6 hours/day",
    accommodationType: "Private Room",
    amenities: ["Free WiFi", "Kitchen", "Bar", "Terrace"],
    mealsIncluded: false,
    description:
      "Coastal hostel perfect for surf lovers. Great community atmosphere with weekly events and beach access.",
    urgent: true,
    lastPosted: "1 day ago",
  },
  {
    id: "3",
    name: "Mountain View Lodge",
    location: "Cusco, Peru",
    country: "Peru",
    image:
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop",
    rating: 4.7,
    reviewCount: 18,
    roles: ["Kitchen", "Maintenance", "Tours"],
    commitment: "4-16 weeks",
    workHours: "4-5 hours/day",
    accommodationType: "Shared Dorm",
    amenities: ["Free WiFi", "Breakfast", "Garden", "Tours"],
    mealsIncluded: true,
    description:
      "Cozy lodge near Machu Picchu with stunning mountain views. Perfect for adventure seekers and nature lovers.",
    urgent: false,
    lastPosted: "3 days ago",
  },
  {
    id: "4",
    name: "Jungle Eco Resort",
    location: "Manuel Antonio, Costa Rica",
    country: "Costa Rica",
    image:
      "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=400&h=300&fit=crop",
    rating: 4.9,
    reviewCount: 27,
    roles: ["Eco Tourism", "Reception", "Teaching"],
    commitment: "6-24 weeks",
    workHours: "3-4 hours/day",
    accommodationType: "Private Room",
    amenities: ["Free WiFi", "Pool", "Jungle Tours", "Wildlife"],
    mealsIncluded: true,
    description:
      "Sustainable eco-lodge in the rainforest. Learn about conservation while helping with eco-tourism activities.",
    urgent: true,
    lastPosted: "5 hours ago",
  },
  {
    id: "5",
    name: "Berlin Creative Hub",
    location: "Berlin, Germany",
    country: "Germany",
    image:
      "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=400&h=300&fit=crop",
    rating: 4.6,
    reviewCount: 22,
    roles: ["Social Media", "Events", "Marketing"],
    commitment: "2-6 weeks",
    workHours: "5-6 hours/day",
    accommodationType: "Shared Dorm",
    amenities: ["Free WiFi", "Coworking", "Events", "Bar"],
    mealsIncluded: false,
    description:
      "Modern hostel in trendy neighborhood. Perfect for digital nomads and creative travelers.",
    urgent: false,
    lastPosted: "1 week ago",
  },
  {
    id: "6",
    name: "Island Paradise Hostel",
    location: "Koh Phi Phi, Thailand",
    country: "Thailand",
    image:
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=400&h=300&fit=crop",
    rating: 4.8,
    reviewCount: 35,
    roles: ["Bar Help", "Diving", "Beach Activities"],
    commitment: "3-8 weeks",
    workHours: "4-5 hours/day",
    accommodationType: "Shared Dorm",
    amenities: ["Beach Access", "Diving", "Bar", "Free WiFi"],
    mealsIncluded: true,
    description:
      "Tropical paradise hostel on beautiful Phi Phi island. Perfect for beach lovers and diving enthusiasts.",
    urgent: false,
    lastPosted: "4 days ago",
  },
];

const countries = [
  "All Countries",
  "Thailand",
  "Portugal",
  "Peru",
  "Costa Rica",
  "Germany",
];
const roles = [
  "Reception",
  "Social Media",
  "Kitchen",
  "Bar Help",
  "Tours",
  "Maintenance",
  "Events",
  "Teaching",
  "Eco Tourism",
  "Diving",
];
const accommodationTypes = [
  "Any",
  "Shared Dorm",
  "Private Room",
  "Staff Quarters",
];

export function BrowseHostels({
  onBack,
  onHostelClick,
  onApply,
}: BrowseHostelsProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("All Countries");
  const [selectedRoles, setSelectedRoles] = useState<string[]>([]);
  const [selectedAccommodation, setSelectedAccommodation] = useState("Any");
  const [ratingFilter, setRatingFilter] = useState([0]);
  const [mealsIncluded, setMealsIncluded] = useState(false);
  const [urgentOnly, setUrgentOnly] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [showAdvancedSearch, setShowAdvancedSearch] = useState(false);
  const [savedHostels, setSavedHostels] = useState<string[]>([]);
  const [advancedFilters, setAdvancedFilters] = useState<any>(null);

  const toggleRole = (role: string) => {
    setSelectedRoles((prev) =>
      prev.includes(role) ? prev.filter((r) => r !== role) : [...prev, role]
    );
  };

  const toggleSaved = (hostelId: string) => {
    setSavedHostels((prev) =>
      prev.includes(hostelId)
        ? prev.filter((id) => id !== hostelId)
        : [...prev, hostelId]
    );
  };

  const filteredHostels = getSampleHostelsData().filter((hostel) => {
    const matchesSearch =
      hostel.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      hostel.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCountry =
      selectedCountry === "All Countries" || hostel.country === selectedCountry;
    const matchesRoles =
      selectedRoles.length === 0 ||
      selectedRoles.some((role) => hostel.roles.includes(role));
    const matchesAccommodation =
      selectedAccommodation === "Any" ||
      hostel.accommodationType === selectedAccommodation;
    const matchesRating = hostel.rating >= ratingFilter[0];
    const matchesMeals = !mealsIncluded || hostel.mealsIncluded;
    const matchesUrgent = !urgentOnly || hostel.urgent;

    return (
      matchesSearch &&
      matchesCountry &&
      matchesRoles &&
      matchesAccommodation &&
      matchesRating &&
      matchesMeals &&
      matchesUrgent
    );
  });

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <Button variant="ghost" onClick={onBack}>
                ← Back to Dashboard
              </Button>
              <h1 className="text-2xl mt-2">Browse Volunteer Opportunities</h1>
              <p className="text-muted-foreground">
                Find your next volunteer experience worldwide
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Search and Filters */}
        <div className="space-y-4 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search by hostel name or location..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="w-full md:w-auto"
            >
              <Filter className="w-4 h-4 mr-2" />
              Filters
              <ChevronDown
                className={`w-4 h-4 ml-2 transition-transform ${
                  showFilters ? "rotate-180" : ""
                }`}
              />
            </Button>
          </div>

          {showFilters && (
            <Card>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Country
                    </label>
                    <Select
                      value={selectedCountry}
                      onValueChange={setSelectedCountry}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {countries.map((country) => (
                          <SelectItem key={country} value={country}>
                            {country}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Accommodation
                    </label>
                    <Select
                      value={selectedAccommodation}
                      onValueChange={setSelectedAccommodation}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {accommodationTypes.map((type) => (
                          <SelectItem key={type} value={type}>
                            {type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Minimum Rating
                    </label>
                    <div className="px-2">
                      <Slider
                        value={ratingFilter}
                        onValueChange={setRatingFilter}
                        max={5}
                        min={0}
                        step={0.1}
                        className="w-full"
                      />
                      <div className="flex justify-between text-xs text-muted-foreground mt-1">
                        <span>Any</span>
                        <span>{ratingFilter[0].toFixed(1)}+</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="meals"
                        checked={mealsIncluded}
                        onCheckedChange={setMealsIncluded}
                      />
                      <label htmlFor="meals" className="text-sm">
                        Meals included
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="urgent"
                        checked={urgentOnly}
                        onCheckedChange={setUrgentOnly}
                      />
                      <label htmlFor="urgent" className="text-sm">
                        Urgent positions only
                      </label>
                    </div>
                  </div>
                </div>

                <div className="mt-6">
                  <label className="text-sm font-medium mb-3 block">
                    Volunteer Roles
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    {roles.map((role) => (
                      <div key={role} className="flex items-center space-x-2">
                        <Checkbox
                          id={role}
                          checked={selectedRoles.includes(role)}
                          onCheckedChange={() => toggleRole(role)}
                        />
                        <label htmlFor={role} className="text-sm">
                          {role}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Results Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl">Available Opportunities</h2>
            <p className="text-muted-foreground">
              {filteredHostels.length} hostels found
            </p>
          </div>
        </div>

        {/* Hostels Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredHostels.map((hostel) => (
            <Card
              key={hostel.id}
              className="hover:shadow-lg transition-shadow cursor-pointer"
            >
              <div className="relative">
                <ImageWithFallback
                  src={hostel.image}
                  alt={hostel.name}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
                <Button
                  variant="ghost"
                  size="sm"
                  className={`absolute top-2 right-2 rounded-full w-8 h-8 p-0 ${
                    savedHostels.includes(hostel.id)
                      ? "text-red-500"
                      : "text-white"
                  }`}
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleSaved(hostel.id);
                  }}
                >
                  <Heart
                    className={`w-4 h-4 ${
                      savedHostels.includes(hostel.id) ? "fill-current" : ""
                    }`}
                  />
                </Button>
                {hostel.urgent && (
                  <Badge className="absolute top-2 left-2 bg-red-500">
                    Urgent
                  </Badge>
                )}
              </div>

              <CardContent className="p-4">
                <div className="space-y-3">
                  <div>
                    <h3 className="font-medium text-lg line-clamp-1">
                      {hostel.name}
                    </h3>
                    <div className="flex items-center text-muted-foreground text-sm">
                      <MapPin className="w-3 h-3 mr-1" />
                      {hostel.location}
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 mr-1" />
                      <span className="text-sm">{hostel.rating}</span>
                      <span className="text-muted-foreground text-sm ml-1">
                        ({hostel.reviewCount})
                      </span>
                    </div>
                    <span className="text-muted-foreground text-xs">
                      {hostel.lastPosted}
                    </span>
                  </div>

                  <div className="space-y-2">
                    <div className="flex flex-wrap gap-1">
                      {hostel.roles.slice(0, 3).map((role) => (
                        <Badge
                          key={role}
                          variant="secondary"
                          className="text-xs"
                        >
                          {role}
                        </Badge>
                      ))}
                      {hostel.roles.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{hostel.roles.length - 3}
                        </Badge>
                      )}
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground">
                      <div className="flex items-center">
                        <Clock className="w-3 h-3 mr-1" />
                        {hostel.workHours}
                      </div>
                      <div className="flex items-center">
                        <Users className="w-3 h-3 mr-1" />
                        {hostel.accommodationType}
                      </div>
                      <div className="flex items-center">
                        <Calendar className="w-3 h-3 mr-1" />
                        {hostel.commitment}
                      </div>
                      <div className="flex items-center">
                        {hostel.mealsIncluded ? (
                          <Coffee className="w-3 h-3 mr-1 text-green-500" />
                        ) : (
                          <Coffee className="w-3 h-3 mr-1 text-gray-400" />
                        )}
                        Meals {hostel.mealsIncluded ? "✓" : "✗"}
                      </div>
                    </div>
                  </div>

                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {hostel.description}
                  </p>

                  <div className="flex space-x-2 pt-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1"
                      onClick={(e) => {
                        e.stopPropagation();
                        onHostelClick(hostel.id);
                      }}
                    >
                      View Details
                    </Button>
                    <Button
                      size="sm"
                      className="flex-1"
                      onClick={(e) => {
                        e.stopPropagation();
                        onApply(hostel.id);
                      }}
                    >
                      Apply Now
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredHostels.length === 0 && (
          <div className="text-center py-12">
            <Search className="w-12 h-12 mx-auto mb-4 text-muted-foreground opacity-50" />
            <h3 className="text-lg mb-2">No hostels found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search criteria or filters
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
