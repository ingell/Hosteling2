import React, { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
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
import { Badge } from "./ui/badge";
import { Calendar } from "./ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import {
  Search,
  MapPin,
  Calendar as CalendarIcon,
  Star,
  Filter,
  X,
  Globe,
  Users,
  Clock,
  Wifi,
  Car,
  Coffee,
  Utensils,
} from "lucide-react";
import { format } from "date-fns";

interface AdvancedSearchProps {
  userType: "volunteer" | "hostel";
  onSearch: (filters: any) => void;
  onClose: () => void;
}

const countries = [
  "Spain",
  "Portugal",
  "France",
  "Italy",
  "Germany",
  "Netherlands",
  "Thailand",
  "Vietnam",
  "Australia",
  "New Zealand",
  "Canada",
  "USA",
  "Mexico",
  "Costa Rica",
  "Peru",
  "Brazil",
  "Argentina",
  "Chile",
];

const languages = [
  "English",
  "Spanish",
  "French",
  "German",
  "Italian",
  "Portuguese",
  "Dutch",
  "Thai",
  "Vietnamese",
  "Mandarin",
  "Japanese",
  "Korean",
];

const volunteerSkills = [
  "Reception",
  "Housekeeping",
  "Social Media",
  "Tour Guide",
  "Kitchen Help",
  "Maintenance",
  "Event Planning",
  "Language Exchange",
  "Photography",
  "Marketing",
];

const hostelAmenities = [
  "Free WiFi",
  "Kitchen",
  "Laundry",
  "Bar",
  "Pool",
  "AC",
  "Parking",
  "Breakfast",
  "Tours",
  "Bike Rental",
  "Common Area",
  "Rooftop",
];

export function AdvancedSearch({
  userType,
  onSearch,
  onClose,
}: AdvancedSearchProps) {
  const [filters, setFilters] = useState({
    location: "",
    country: "",
    availableFrom: null as Date | null,
    availableTo: null as Date | null,
    duration: [2, 12], // weeks
    rating: [4.0],
    languages: [] as string[],
    skills: [] as string[],
    amenities: [] as string[],
    priceRange: [0, 100], // per night for hostels
    roomType: "",
    workHours: [10, 40], // hours per week
    accommodationType: "",
  });

  const handleFilterChange = (key: string, value: any) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const toggleArrayItem = (key: string, item: string) => {
    setFilters((prev) => {
      const currentValue = prev[key as keyof typeof prev];
      if (Array.isArray(currentValue)) {
        return {
          ...prev,
          [key]: (currentValue as string[]).includes(item)
            ? (currentValue as string[]).filter((i) => i !== item)
            : [...(currentValue as string[]), item],
        };
      }
      return prev;
    });
  };

  const clearFilters = () => {
    setFilters({
      location: "",
      country: "",
      availableFrom: null,
      availableTo: null,
      duration: [2, 12],
      rating: [4.0],
      languages: [],
      skills: [],
      amenities: [],
      priceRange: [0, 100],
      roomType: "",
      workHours: [10, 40],
      accommodationType: "",
    });
  };

  const handleSearch = () => {
    onSearch(filters);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center space-x-2">
              <Filter className="w-5 h-5" />
              <span>Advanced Search</span>
            </CardTitle>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Location */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="location">City/Location</Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  id="location"
                  placeholder="Barcelona, Tokyo, etc..."
                  value={filters.location}
                  onChange={(e) =>
                    handleFilterChange("location", e.target.value)
                  }
                  className="pl-10"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="country">Country</Label>
              <Select
                onValueChange={(value) => handleFilterChange("country", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select country" />
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
          </div>

          {/* Dates */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Available From</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left font-normal"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {filters.availableFrom
                      ? format(filters.availableFrom, "PPP")
                      : "Pick a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={filters.availableFrom}
                    onSelect={(date) =>
                      handleFilterChange("availableFrom", date)
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div className="space-y-2">
              <Label>Available To</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left font-normal"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {filters.availableTo
                      ? format(filters.availableTo, "PPP")
                      : "Pick a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={filters.availableTo}
                    onSelect={(date) => handleFilterChange("availableTo", date)}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          {/* Duration & Work Hours */}
          {userType === "volunteer" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>
                  Duration (weeks): {filters.duration[0]} -{" "}
                  {filters.duration[1]}
                </Label>
                <Slider
                  value={filters.duration}
                  onValueChange={(value) =>
                    handleFilterChange("duration", value)
                  }
                  max={52}
                  min={1}
                  step={1}
                  className="w-full"
                />
              </div>
              <div className="space-y-2">
                <Label>
                  Work Hours per Week: {filters.workHours[0]} -{" "}
                  {filters.workHours[1]}
                </Label>
                <Slider
                  value={filters.workHours}
                  onValueChange={(value) =>
                    handleFilterChange("workHours", value)
                  }
                  max={50}
                  min={5}
                  step={5}
                  className="w-full"
                />
              </div>
            </div>
          )}

          {/* Rating */}
          <div className="space-y-2">
            <Label>Minimum Rating: {filters.rating[0]} stars</Label>
            <Slider
              value={filters.rating}
              onValueChange={(value) => handleFilterChange("rating", value)}
              max={5}
              min={1}
              step={0.5}
              className="w-full"
            />
          </div>

          {/* Languages */}
          <div className="space-y-2">
            <Label>Languages</Label>
            <div className="flex flex-wrap gap-2">
              {languages.map((language) => (
                <Badge
                  key={language}
                  variant={
                    filters.languages.includes(language) ? "default" : "outline"
                  }
                  className="cursor-pointer"
                  onClick={() => toggleArrayItem("languages", language)}
                >
                  <Globe className="w-3 h-3 mr-1" />
                  {language}
                </Badge>
              ))}
            </div>
          </div>

          {/* Skills (for volunteers) or Amenities (for hostels) */}
          {userType === "volunteer" ? (
            <div className="space-y-2">
              <Label>Skills</Label>
              <div className="flex flex-wrap gap-2">
                {volunteerSkills.map((skill) => (
                  <Badge
                    key={skill}
                    variant={
                      filters.skills.includes(skill) ? "default" : "outline"
                    }
                    className="cursor-pointer"
                    onClick={() => toggleArrayItem("skills", skill)}
                  >
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-2">
              <Label>Amenities</Label>
              <div className="flex flex-wrap gap-2">
                {hostelAmenities.map((amenity) => (
                  <Badge
                    key={amenity}
                    variant={
                      filters.amenities.includes(amenity)
                        ? "default"
                        : "outline"
                    }
                    className="cursor-pointer"
                    onClick={() => toggleArrayItem("amenities", amenity)}
                  >
                    {amenity}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Accommodation Type */}
          {userType === "volunteer" && (
            <div className="space-y-2">
              <Label htmlFor="accommodation">Preferred Accommodation</Label>
              <Select
                onValueChange={(value) =>
                  handleFilterChange("accommodationType", value)
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select accommodation type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="private-room">Private Room</SelectItem>
                  <SelectItem value="shared-room">Shared Room</SelectItem>
                  <SelectItem value="dorm">Dorm Bed</SelectItem>
                  <SelectItem value="any">Any</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex justify-between pt-4">
            <Button variant="outline" onClick={clearFilters}>
              Clear All Filters
            </Button>
            <div className="space-x-2">
              <Button variant="ghost" onClick={onClose}>
                Cancel
              </Button>
              <Button
                onClick={handleSearch}
                className="bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white"
              >
                <Search className="w-4 h-4 mr-2" />
                Apply Filters
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
