import React, { useState } from "react";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { Badge } from "../../ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../ui/select";
import { Checkbox } from "../../ui/checkbox";
import { Slider } from "../../ui/slider";
import { ImageWithFallback } from "../../figma/ImageWithFallback";
import { AdvancedSearch } from "../../AdvancedSearch";
import { Search, MapPin, Star, Heart, Filter, Users, Clock, Wifi, Coffee, Camera, ChevronDown } from "lucide-react";

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
    image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=400&h=300&fit=crop",
    rating: 4.8,
    reviewCount: 24,
    roles: ["Reception", "Social Media", "Tours"],
    commitment: "2-8 weeks",
    accommodation: "Private room",
    meals: true,
    wifi: true,
    description: "A vibrant backpacker hostel in the heart of Bangkok's cultural district. Join our team and help create unforgettable experiences for travelers from around the world.",
    amenities: ["Free WiFi", "Kitchen access", "Common room", "Tours", "Laundry"],
    workHours: "4-5 hours/day",
    tags: ["Social", "Cultural", "City Center"],
    verified: true,
    urgentNeed: false,
    responseRate: 95,
    languages: ["English", "Thai"]
  },
  {
    id: "2", 
    name: "Mountain View Lodge",
    location: "Pokhara, Nepal",
    country: "Nepal",
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop",
    rating: 4.9,
    reviewCount: 18,
    roles: ["Kitchen", "Maintenance", "Trekking Guide"],
    commitment: "4-12 weeks",
    accommodation: "Shared dorm",
    meals: true,
    wifi: true,
    description: "Stunning mountain lodge offering breathtaking views of the Himalayas. Perfect for outdoor enthusiasts looking to combine work with adventure.",
    amenities: ["Mountain views", "Trekking gear", "Organic garden", "Yoga studio"],
    workHours: "5-6 hours/day",
    tags: ["Nature", "Adventure", "Mountains"],
    verified: true,
    urgentNeed: true,
    responseRate: 98,
    languages: ["English", "Nepali", "Hindi"]
  },
  {
    id: "3",
    name: "Surf & Stay Hostel",
    location: "Canggu, Indonesia", 
    country: "Indonesia",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop",
    rating: 4.7,
    reviewCount: 31,
    roles: ["Bar help", "Photography", "Surfing instructor"],
    commitment: "3-6 weeks",
    accommodation: "Shared dorm",
    meals: false,
    wifi: true,
    description: "Beachfront hostel with an amazing surf community. Help us manage our beach bar and capture the perfect moments for our guests.",
    amenities: ["Beach access", "Surf boards", "Beach bar", "Pool"],
    workHours: "4-5 hours/day",
    tags: ["Beach", "Surf", "Community"],
    verified: true,
    urgentNeed: false,
    responseRate: 88,
    languages: ["English", "Indonesian"]
  },
  {
    id: "4",
    name: "Eco Green Hostel",
    location: "Manuel Antonio, Costa Rica",
    country: "Costa Rica", 
    image: "https://images.unsplash.com/photo-1518012312832-5b0b3b9c0b7a?w=400&h=300&fit=crop",
    rating: 4.6,
    reviewCount: 22,
    roles: ["Gardening", "Teaching", "Administration"],
    commitment: "6-16 weeks",
    accommodation: "Private room",
    meals: true,
    wifi: true,
    description: "Sustainable eco-hostel in the rainforest. Join our mission to promote environmental awareness while providing unforgettable jungle experiences.",
    amenities: ["Organic garden", "Wildlife tours", "Sustainable practices", "Yoga deck"],
    workHours: "5-6 hours/day", 
    tags: ["Eco", "Rainforest", "Sustainable"],
    verified: true,
    urgentNeed: true,
    responseRate: 92,
    languages: ["English", "Spanish"]
  },
  {
    id: "5",
    name: "Urban Backpackers Hub",
    location: "Melbourne, Australia",
    country: "Australia",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop",
    rating: 4.4,
    reviewCount: 19,
    roles: ["Cleaning", "Events", "Night shift"],
    commitment: "4-8 weeks",
    accommodation: "Shared dorm",
    meals: false,
    wifi: true,
    description: "Modern hostel in Melbourne's cultural quarter. Be part of our dynamic team organizing events and maintaining our vibrant community space.",
    amenities: ["Game room", "Coworking space", "Events", "City location"],
    workHours: "4-5 hours/day",
    tags: ["Urban", "Events", "Modern"],
    verified: true,
    urgentNeed: false,
    responseRate: 90,
    languages: ["English"]
  },
  {
    id: "6",
    name: "Desert Oasis Lodge",
    location: "Merzouga, Morocco",
    country: "Morocco",
    image: "https://images.unsplash.com/photo-1544427920-c49ccfb85579?w=400&h=300&fit=crop",
    rating: 4.8,
    reviewCount: 15,
    roles: ["Marketing", "Web design", "Camel trekking guide"],
    commitment: "3-10 weeks",
    accommodation: "Traditional tent",
    meals: true,
    wifi: true,
    description: "Unique desert experience in authentic Berber camp. Help us share the magic of the Sahara with travelers seeking adventure and cultural immersion.",
    amenities: ["Desert tours", "Traditional music", "Stargazing", "Camel trekking"],
    workHours: "3-4 hours/day",
    tags: ["Desert", "Cultural", "Unique"],
    verified: true,
    urgentNeed: false,
    responseRate: 87,
    languages: ["English", "French", "Arabic", "Berber"]
  }
];

export function BrowseHostelsPage({ onBack, onHostelClick, onApply }: BrowseHostelsProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCountry, setFilterCountry] = useState("all");
  const [filterRoles, setFilterRoles] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState("rating");
  const [showAdvancedSearch, setShowAdvancedSearch] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [commitmentFilter, setCommitmentFilter] = useState<string[]>([]);
  const [accommodationFilter, setAccommodationFilter] = useState<string[]>([]);
  const [mealsFilter, setMealsFilter] = useState<boolean | null>(null);
  const [ratingFilter, setRatingFilter] = useState([0]);
  const [urgentOnly, setUrgentOnly] = useState(false);
  const [verifiedOnly, setVerifiedOnly] = useState(false);

  const hostelsData = getSampleHostelsData();

  const toggleFavorite = (hostelId: string) => {
    setFavorites(prev => 
      prev.includes(hostelId) 
        ? prev.filter(id => id !== hostelId)
        : [...prev, hostelId]
    );
  };

  const toggleRoleFilter = (role: string) => {
    setFilterRoles(prev =>
      prev.includes(role)
        ? prev.filter(r => r !== role)
        : [...prev, role]
    );
  };

  const toggleCommitmentFilter = (commitment: string) => {
    setCommitmentFilter(prev =>
      prev.includes(commitment)
        ? prev.filter(c => c !== commitment)
        : [...prev, commitment]
    );
  };

  const toggleAccommodationFilter = (accommodation: string) => {
    setAccommodationFilter(prev =>
      prev.includes(accommodation)
        ? prev.filter(a => a !== accommodation)
        : [...prev, accommodation]
    );
  };

  const clearFilters = () => {
    setSearchTerm("");
    setFilterCountry("all");
    setFilterRoles([]);
    setCommitmentFilter([]);
    setAccommodationFilter([]);
    setMealsFilter(null);
    setRatingFilter([0]);
    setUrgentOnly(false);
    setVerifiedOnly(false);
  };

  const filteredHostels = hostelsData.filter(hostel => {
    // Search term filter
    const matchesSearch = searchTerm === "" || 
      hostel.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      hostel.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      hostel.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      hostel.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));

    // Country filter
    const matchesCountry = filterCountry === "all" || hostel.country === filterCountry;

    // Roles filter
    const matchesRoles = filterRoles.length === 0 || 
      filterRoles.some(role => hostel.roles.includes(role));

    // Commitment filter
    const matchesCommitment = commitmentFilter.length === 0 ||
      commitmentFilter.some(commitment => hostel.commitment.includes(commitment));

    // Accommodation filter
    const matchesAccommodation = accommodationFilter.length === 0 ||
      accommodationFilter.includes(hostel.accommodation);

    // Meals filter
    const matchesMeals = mealsFilter === null || hostel.meals === mealsFilter;

    // Rating filter
    const matchesRating = hostel.rating >= ratingFilter[0];

    // Urgent filter
    const matchesUrgent = !urgentOnly || hostel.urgentNeed;

    // Verified filter
    const matchesVerified = !verifiedOnly || hostel.verified;

    return matchesSearch && matchesCountry && matchesRoles && matchesCommitment && 
           matchesAccommodation && matchesMeals && matchesRating && matchesUrgent && matchesVerified;
  });

  const sortedHostels = [...filteredHostels].sort((a, b) => {
    switch (sortBy) {
      case "rating":
        return b.rating - a.rating;
      case "newest":
        return a.name.localeCompare(b.name); // Placeholder sorting
      case "urgent":
        return (b.urgentNeed ? 1 : 0) - (a.urgentNeed ? 1 : 0);
      case "response":
        return b.responseRate - a.responseRate;
      default:
        return 0;
    }
  });

  const allRoles = Array.from(new Set(hostelsData.flatMap(h => h.roles)));
  const allCountries = Array.from(new Set(hostelsData.map(h => h.country)));

  if (showAdvancedSearch) {
    return (
      <AdvancedSearch 
        onBack={() => setShowAdvancedSearch(false)}
        onSearch={(filters) => {
          // Apply advanced search filters
          console.log("Advanced search filters:", filters);
          setShowAdvancedSearch(false);
        }}
      />
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Button variant="ghost" onClick={onBack}>
              ← Back
            </Button>
            <h1 className="font-bold">Browse Hostels</h1>
            <Button variant="outline" size="sm" onClick={() => setShowAdvancedSearch(true)}>
              Advanced Search
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        {/* Search and Quick Filters */}
        <div className="space-y-4 mb-6">
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search hostels, locations, or roles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button 
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2"
            >
              <Filter className="w-4 h-4" />
              Filters
              <ChevronDown className={`w-4 h-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
            </Button>
          </div>

          {/* Quick Filters */}
          <div className="flex flex-wrap gap-2">
            <Button
              variant={urgentOnly ? "default" : "outline"}
              size="sm"
              onClick={() => setUrgentOnly(!urgentOnly)}
            >
              🔥 Urgent Needs
            </Button>
            <Button
              variant={verifiedOnly ? "default" : "outline"}
              size="sm"
              onClick={() => setVerifiedOnly(!verifiedOnly)}
            >
              ✓ Verified Only
            </Button>
            <Button
              variant={mealsFilter === true ? "default" : "outline"}
              size="sm"
              onClick={() => setMealsFilter(mealsFilter === true ? null : true)}
            >
              🍽️ Meals Included
            </Button>
            {(filterRoles.length > 0 || filterCountry !== "all" || urgentOnly || verifiedOnly || mealsFilter !== null) && (
              <Button variant="ghost" size="sm" onClick={clearFilters}>
                Clear All
              </Button>
            )}
          </div>

          {/* Expanded Filters */}
          {showFilters && (
            <Card>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Country</label>
                    <Select value={filterCountry} onValueChange={setFilterCountry}>
                      <SelectTrigger>
                        <SelectValue placeholder="All countries" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Countries</SelectItem>
                        {allCountries.map(country => (
                          <SelectItem key={country} value={country}>{country}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">Sort by</label>
                    <Select value={sortBy} onValueChange={setSortBy}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="rating">Highest Rated</SelectItem>
                        <SelectItem value="newest">Newest</SelectItem>
                        <SelectItem value="urgent">Urgent Needs</SelectItem>
                        <SelectItem value="response">Response Rate</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">Minimum Rating</label>
                    <div className="px-3">
                      <Slider
                        value={ratingFilter}
                        onValueChange={setRatingFilter}
                        max={5}
                        min={0}
                        step={0.1}
                        className="w-full"
                      />
                      <div className="flex justify-between text-xs text-muted-foreground mt-1">
                        <span>0</span>
                        <span>{ratingFilter[0].toFixed(1)}+</span>
                        <span>5</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">Volunteer Roles</label>
                    <div className="grid grid-cols-2 gap-2 max-h-32 overflow-y-auto">
                      {allRoles.map(role => (
                        <div key={role} className="flex items-center space-x-2">
                          <Checkbox
                            id={role}
                            checked={filterRoles.includes(role)}
                            onCheckedChange={() => toggleRoleFilter(role)}
                          />
                          <label htmlFor={role} className="text-sm">{role}</label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">Commitment</label>
                    <div className="space-y-2">
                      {["2-4 weeks", "1-3 months", "3+ months"].map(commitment => (
                        <div key={commitment} className="flex items-center space-x-2">
                          <Checkbox
                            id={commitment}
                            checked={commitmentFilter.includes(commitment)}
                            onCheckedChange={() => toggleCommitmentFilter(commitment)}
                          />
                          <label htmlFor={commitment} className="text-sm">{commitment}</label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">Accommodation</label>
                    <div className="space-y-2">
                      {["Private room", "Shared dorm", "Traditional tent"].map(accommodation => (
                        <div key={accommodation} className="flex items-center space-x-2">
                          <Checkbox
                            id={accommodation}
                            checked={accommodationFilter.includes(accommodation)}
                            onCheckedChange={() => toggleAccommodationFilter(accommodation)}
                          />
                          <label htmlFor={accommodation} className="text-sm">{accommodation}</label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Results Summary */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-muted-foreground">
            {sortedHostels.length} hostels found
          </p>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              Map View
            </Button>
            <Button variant="outline" size="sm">
              List View
            </Button>
          </div>
        </div>

        {/* Hostels Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedHostels.map((hostel) => (
            <Card key={hostel.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative">
                <ImageWithFallback
                  src={hostel.image}
                  alt={hostel.name}
                  className="w-full h-48 object-cover"
                />
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute top-2 right-2 bg-white/80 hover:bg-white"
                  onClick={() => toggleFavorite(hostel.id)}
                >
                  <Heart 
                    className={`w-4 h-4 ${favorites.includes(hostel.id) ? 'fill-red-500 text-red-500' : ''}`} 
                  />
                </Button>
                {hostel.urgentNeed && (
                  <Badge className="absolute top-2 left-2 bg-red-500">
                    🔥 Urgent
                  </Badge>
                )}
                {hostel.verified && (
                  <Badge className="absolute bottom-2 left-2 bg-green-500">
                    ✓ Verified
                  </Badge>
                )}
              </div>

              <CardContent className="p-4">
                <div className="space-y-3">
                  <div>
                    <h3 className="font-semibold hover:text-primary cursor-pointer" 
                        onClick={() => onHostelClick(hostel.id)}>
                      {hostel.name}
                    </h3>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <MapPin className="w-4 h-4 mr-1" />
                      {hostel.location}
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 mr-1" />
                      <span className="text-sm font-medium">{hostel.rating}</span>
                      <span className="text-sm text-muted-foreground ml-1">({hostel.reviewCount})</span>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {hostel.responseRate}% response rate
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1">
                    {hostel.roles.slice(0, 3).map((role) => (
                      <Badge key={role} variant="secondary" className="text-xs">
                        {role}
                      </Badge>
                    ))}
                    {hostel.roles.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{hostel.roles.length - 3} more
                      </Badge>
                    )}
                  </div>

                  <div className="space-y-2 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Commitment:</span>
                      <span>{hostel.commitment}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Work hours:</span>
                      <span>{hostel.workHours}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Accommodation:</span>
                      <span>{hostel.accommodation}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    {hostel.meals && (
                      <div className="flex items-center">
                        <Coffee className="w-4 h-4 mr-1" />
                        Meals
                      </div>
                    )}
                    {hostel.wifi && (
                      <div className="flex items-center">
                        <Wifi className="w-4 h-4 mr-1" />
                        WiFi
                      </div>
                    )}
                  </div>

                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {hostel.description}
                  </p>

                  <div className="flex gap-2 pt-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex-1"
                      onClick={() => onHostelClick(hostel.id)}
                    >
                      View Details
                    </Button>
                    <Button 
                      size="sm" 
                      className="flex-1"
                      onClick={() => onApply(hostel.id)}
                    >
                      Apply Now
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {sortedHostels.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-medium mb-2">No hostels found</h3>
            <p className="text-muted-foreground mb-4">
              Try adjusting your search criteria or filters
            </p>
            <Button onClick={clearFilters}>Clear All Filters</Button>
          </div>
        )}
      </div>
    </div>
  );
}