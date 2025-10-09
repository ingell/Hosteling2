import React, { useState } from "react";
import { Button } from "../../../ui/button";
import { Input } from "../../../ui/input";
import { Badge } from "../../../ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "../../../ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../ui/select";
import { Checkbox } from "../../../ui/checkbox";
import { Slider } from "../../../ui/slider";
import { Avatar, AvatarFallback, AvatarImage } from "../../../ui/avatar";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../../../ui/dialog";
import { Textarea } from "../../../ui/textarea";
import { Label } from "../../../ui/label";
import { ImageWithFallback } from "../../../figma/ImageWithFallback";
import { API } from "../../../utils/api";
import { LocalStorageManager } from "../../../utils/local-storage";
import { Search, MapPin, Star, Heart, Filter, Users, Clock, Globe, Calendar, ChevronDown, MessageCircle, Send } from "lucide-react";
import { toast } from "sonner@2.0.3";

interface BrowseVolunteersProps {
  onBack: () => void;
  onVolunteerClick: (volunteerId: string) => void;
  onContact: (volunteerId: string) => void;
}

// Sample volunteers data - in a real app this would come from API
const getSampleVolunteersData = () => [
  {
    id: "1",
    firstName: "Sarah",
    lastName: "Chen", 
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b4d4?w=150&h=150&fit=crop&crop=face",
    location: "San Francisco, USA",
    country: "United States",
    age: 25,
    rating: 4.8,
    reviewCount: 12,
    completedVolunteering: 5,
    skills: ["Social Media", "Photography", "Reception", "Marketing"],
    languages: ["English", "Spanish", "Portuguese"],
    experience: "Intermediate",
    availability: {
      from: "January 2025",
      to: "June 2025"
    },
    preferences: {
      workHours: "4-5 hours/day",
      accommodation: "Shared Dorm",
      minimumStay: "2 weeks",
      maximumStay: "2 months"
    },
    bio: "Digital nomad passionate about sustainable travel and cultural exchange. Love helping with social media and connecting with fellow travelers.",
    joinDate: "March 2024",
    lastActive: "2 hours ago",
    verified: true,
    urgentAvailable: false
  },
  {
    id: "2",
    firstName: "Jake",
    lastName: "Morrison",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    location: "London, UK",
    country: "United Kingdom", 
    age: 28,
    rating: 4.9,
    reviewCount: 18,
    completedVolunteering: 8,
    skills: ["Reception", "Tours", "Bar Help", "Events"],
    languages: ["English", "French", "German"],
    experience: "Advanced",
    availability: {
      from: "December 2024",
      to: "May 2025"
    },
    preferences: {
      workHours: "5-6 hours/day",
      accommodation: "Private Room",
      minimumStay: "3 weeks",
      maximumStay: "3 months"
    },
    bio: "Experienced traveler and hostel volunteer with expertise in guest relations and tour guiding. Always eager to create memorable experiences for guests.",
    joinDate: "January 2023",
    lastActive: "1 day ago",
    verified: true,
    urgentAvailable: true
  },
  {
    id: "3", 
    firstName: "Emma",
    lastName: "Rodriguez",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    location: "Barcelona, Spain",
    country: "Spain",
    age: 23,
    rating: 4.7,
    reviewCount: 9,
    completedVolunteering: 3,
    skills: ["Kitchen", "Cleaning", "Teaching", "Events"],
    languages: ["Spanish", "English", "Catalan"],
    experience: "Beginner",
    availability: {
      from: "February 2025", 
      to: "August 2025"
    },
    preferences: {
      workHours: "4-5 hours/day",
      accommodation: "Shared Dorm",
      minimumStay: "4 weeks",
      maximumStay: "4 months"
    },
    bio: "Recent graduate excited to explore the world while helping hostels. Passionate about cooking and cultural exchange.",
    joinDate: "September 2024",
    lastActive: "3 hours ago",
    verified: true,
    urgentAvailable: false
  },
  {
    id: "4",
    firstName: "Alex",
    lastName: "Rivera", 
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    location: "Mexico City, Mexico",
    country: "Mexico",
    age: 26,
    rating: 4.6,
    reviewCount: 14,
    completedVolunteering: 6,
    skills: ["Reception", "Social Media", "Tours", "Web Design"],
    languages: ["Spanish", "English"],
    experience: "Intermediate",
    availability: {
      from: "January 2025",
      to: "July 2025" 
    },
    preferences: {
      workHours: "5-6 hours/day",
      accommodation: "Private Room",
      minimumStay: "2 weeks",
      maximumStay: "2 months"
    },
    bio: "Tech-savvy traveler with web design skills. Love helping hostels improve their online presence and guest experience.",
    joinDate: "June 2023",
    lastActive: "5 hours ago",
    verified: true,
    urgentAvailable: true
  },
  {
    id: "5",
    firstName: "Maria",
    lastName: "Santos",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
    location: "Rio de Janeiro, Brazil",
    country: "Brazil",
    age: 24,
    rating: 4.9,
    reviewCount: 11,
    completedVolunteering: 4,
    skills: ["Reception", "Events", "Marketing", "Portuguese"],
    languages: ["Portuguese", "English", "Spanish"],
    experience: "Intermediate", 
    availability: {
      from: "March 2025",
      to: "September 2025"
    },
    preferences: {
      workHours: "4-5 hours/day",
      accommodation: "Shared Dorm", 
      minimumStay: "3 weeks",
      maximumStay: "3 months"
    },
    bio: "Outgoing Brazilian traveler with event management experience. Love creating fun activities and helping guests explore local culture.",
    joinDate: "April 2024",
    lastActive: "1 hour ago",
    verified: true,
    urgentAvailable: false
  },
  {
    id: "6",
    firstName: "Tom",
    lastName: "Wilson",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    location: "Sydney, Australia", 
    country: "Australia",
    age: 30,
    rating: 4.8,
    reviewCount: 22,
    completedVolunteering: 10,
    skills: ["Maintenance", "Reception", "Kitchen", "Photography"],
    languages: ["English"],
    experience: "Advanced",
    availability: {
      from: "December 2024",
      to: "June 2025"
    },
    preferences: {
      workHours: "6-8 hours/day",
      accommodation: "Private Room",
      minimumStay: "4 weeks", 
      maximumStay: "6 months"
    },
    bio: "Experienced handyman and photographer. Great with maintenance work and love capturing beautiful moments for hostel marketing.",
    joinDate: "November 2022",
    lastActive: "30 minutes ago",
    verified: true,
    urgentAvailable: true
  }
];

const countries = ["All Countries", "United States", "United Kingdom", "Spain", "Mexico", "Brazil", "Australia"];
const skills = ["Reception", "Social Media", "Kitchen", "Bar Help", "Tours", "Maintenance", "Events", "Teaching", "Marketing", "Photography", "Web Design", "Cleaning"];
const experienceLevels = ["Any", "Beginner", "Intermediate", "Advanced"];
const accommodationTypes = ["Any", "Shared Dorm", "Private Room", "Staff Quarters"];

export function BrowseVolunteers({ onBack, onVolunteerClick, onContact }: BrowseVolunteersProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("All Countries");
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [selectedExperience, setSelectedExperience] = useState("Any");
  const [selectedAccommodation, setSelectedAccommodation] = useState("Any");
  const [ratingFilter, setRatingFilter] = useState([0]);
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [urgentAvailable, setUrgentAvailable] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [favoriteVolunteers, setFavoriteVolunteers] = useState<string[]>([]);
  const [selectedVolunteer, setSelectedVolunteer] = useState<any>(null);
  const [requestMessage, setRequestMessage] = useState("");
  const [requestPosition, setRequestPosition] = useState("");
  const [requestDuration, setRequestDuration] = useState("");
  const [requestStartDate, setRequestStartDate] = useState("");
  const [isSubmittingRequest, setIsSubmittingRequest] = useState(false);

  const toggleSkill = (skill: string) => {
    setSelectedSkills(prev => 
      prev.includes(skill) 
        ? prev.filter(s => s !== skill)
        : [...prev, skill]
    );
  };

  const toggleFavorite = (volunteerId: string) => {
    setFavoriteVolunteers(prev => 
      prev.includes(volunteerId)
        ? prev.filter(id => id !== volunteerId)
        : [...prev, volunteerId]
    );
  };

  const handleSendRequest = async () => {
    if (!selectedVolunteer || !requestMessage.trim()) {
      toast.error("Please fill in the message field");
      return;
    }

    setIsSubmittingRequest(true);
    try {
      const userData = LocalStorageManager.getUserData();
      if (!userData || userData.type !== 'hostel') {
        toast.error("Only hostels can send volunteer requests");
        return;
      }

      await API.sendVolunteerRequest({
        hostelId: userData.id,
        hostelName: userData.profile.hostelName,
        volunteerId: selectedVolunteer.id,
        volunteerName: `${selectedVolunteer.firstName} ${selectedVolunteer.lastName}`,
        message: requestMessage,
        position: requestPosition,
        duration: requestDuration,
        startDate: requestStartDate
      });

      toast.success("Volunteer request sent successfully!");
      setSelectedVolunteer(null);
      setRequestMessage("");
      setRequestPosition("");
      setRequestDuration("");
      setRequestStartDate("");
    } catch (error) {
      toast.error("Failed to send volunteer request");
    } finally {
      setIsSubmittingRequest(false);
    }
  };

  const filteredVolunteers = getSampleVolunteersData().filter(volunteer => {
    const matchesSearch = volunteer.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         volunteer.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         volunteer.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCountry = selectedCountry === "All Countries" || volunteer.country === selectedCountry;
    const matchesSkills = selectedSkills.length === 0 || selectedSkills.some(skill => volunteer.skills.includes(skill));
    const matchesExperience = selectedExperience === "Any" || volunteer.experience === selectedExperience;
    const matchesAccommodation = selectedAccommodation === "Any" || volunteer.preferences.accommodation === selectedAccommodation;
    const matchesRating = volunteer.rating >= ratingFilter[0];
    const matchesVerified = !verifiedOnly || volunteer.verified;
    const matchesUrgent = !urgentAvailable || volunteer.urgentAvailable;

    return matchesSearch && matchesCountry && matchesSkills && matchesExperience && 
           matchesAccommodation && matchesRating && matchesVerified && matchesUrgent;
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
              <h1 className="text-2xl mt-2">Browse Available Volunteers</h1>
              <p className="text-muted-foreground">Find the perfect volunteers for your hostel</p>
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
                placeholder="Search by volunteer name or location..."
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
              <ChevronDown className={`w-4 h-4 ml-2 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
            </Button>
          </div>

          {showFilters && (
            <Card>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Country</label>
                    <Select value={selectedCountry} onValueChange={setSelectedCountry}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {countries.map(country => (
                          <SelectItem key={country} value={country}>{country}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">Experience Level</label>
                    <Select value={selectedExperience} onValueChange={setSelectedExperience}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {experienceLevels.map(level => (
                          <SelectItem key={level} value={level}>{level}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">Accommodation Preference</label>
                    <Select value={selectedAccommodation} onValueChange={setSelectedAccommodation}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {accommodationTypes.map(type => (
                          <SelectItem key={type} value={type}>{type}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">Minimum Rating</label>
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
                </div>

                <div className="mt-6 space-y-3">
                  <div className="flex items-center space-x-6">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="verified"
                        checked={verifiedOnly}
                        onCheckedChange={setVerifiedOnly}
                      />
                      <label htmlFor="verified" className="text-sm">Verified volunteers only</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="urgent"
                        checked={urgentAvailable}
                        onCheckedChange={setUrgentAvailable}
                      />
                      <label htmlFor="urgent" className="text-sm">Available immediately</label>
                    </div>
                  </div>
                </div>

                <div className="mt-6">
                  <label className="text-sm font-medium mb-3 block">Skills & Expertise</label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    {skills.map(skill => (
                      <div key={skill} className="flex items-center space-x-2">
                        <Checkbox
                          id={skill}
                          checked={selectedSkills.includes(skill)}
                          onCheckedChange={() => toggleSkill(skill)}
                        />
                        <label htmlFor={skill} className="text-sm">{skill}</label>
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
            <h2 className="text-xl">Available Volunteers</h2>
            <p className="text-muted-foreground">{filteredVolunteers.length} volunteers found</p>
          </div>
        </div>

        {/* Volunteers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVolunteers.map((volunteer) => (
            <Card key={volunteer.id} className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="p-6">
                <div className="space-y-4">
                  {/* Header */}
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      <Avatar className="w-12 h-12">
                        <AvatarImage src={volunteer.avatar} alt={`${volunteer.firstName} ${volunteer.lastName}`} />
                        <AvatarFallback>{volunteer.firstName[0]}{volunteer.lastName[0]}</AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-medium">{volunteer.firstName} {volunteer.lastName}</h3>
                        <div className="flex items-center text-muted-foreground text-sm">
                          <MapPin className="w-3 h-3 mr-1" />
                          {volunteer.location}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {volunteer.verified && (
                        <Badge variant="secondary" className="text-xs">Verified</Badge>
                      )}
                      <Button
                        variant="ghost"
                        size="sm"
                        className={`rounded-full w-8 h-8 p-0 ${
                          favoriteVolunteers.includes(volunteer.id) ? 'text-red-500' : 'text-gray-400'
                        }`}
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleFavorite(volunteer.id);
                        }}
                      >
                        <Heart className={`w-4 h-4 ${favoriteVolunteers.includes(volunteer.id) ? 'fill-current' : ''}`} />
                      </Button>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 mr-1" />
                      <span>{volunteer.rating}</span>
                      <span className="text-muted-foreground ml-1">({volunteer.reviewCount})</span>
                    </div>
                    <div className="flex items-center space-x-4">
                      <span className="text-muted-foreground">{volunteer.completedVolunteering} completed</span>
                      <span className="text-muted-foreground">{volunteer.experience}</span>
                    </div>
                  </div>

                  {volunteer.urgentAvailable && (
                    <Badge className="w-full justify-center bg-green-500">
                      Available Immediately
                    </Badge>
                  )}

                  {/* Skills */}
                  <div>
                    <div className="flex flex-wrap gap-1">
                      {volunteer.skills.slice(0, 4).map((skill) => (
                        <Badge key={skill} variant="outline" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                      {volunteer.skills.length > 4 && (
                        <Badge variant="secondary" className="text-xs">
                          +{volunteer.skills.length - 4}
                        </Badge>
                      )}
                    </div>
                  </div>

                  {/* Languages */}
                  <div className="flex items-center space-x-2">
                    <Globe className="w-4 h-4 text-muted-foreground" />
                    <div className="flex flex-wrap gap-1">
                      {volunteer.languages.map((language) => (
                        <span key={language} className="text-xs text-muted-foreground">
                          {language}{volunteer.languages.indexOf(language) < volunteer.languages.length - 1 ? ',' : ''}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Availability */}
                  <div className="space-y-1">
                    <div className="flex items-center text-sm">
                      <Calendar className="w-3 h-3 mr-1 text-muted-foreground" />
                      <span className="text-muted-foreground">Available: {volunteer.availability.from} - {volunteer.availability.to}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <Clock className="w-3 h-3 mr-1 text-muted-foreground" />
                      <span className="text-muted-foreground">Prefers: {volunteer.preferences.workHours}</span>
                    </div>
                  </div>

                  {/* Bio */}
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {volunteer.bio}
                  </p>

                  {/* Last Active */}
                  <div className="text-xs text-muted-foreground">
                    Last active: {volunteer.lastActive}
                  </div>

                  {/* Actions */}
                  <div className="flex space-x-2 pt-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex-1"
                      onClick={(e) => {
                        e.stopPropagation();
                        onVolunteerClick(volunteer.id);
                      }}
                    >
                      View Profile
                    </Button>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button 
                          size="sm" 
                          className="flex-1"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedVolunteer(volunteer);
                          }}
                        >
                          <Send className="w-4 h-4 mr-1" />
                          Request
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-md">
                        <DialogHeader>
                          <DialogTitle>Send Volunteer Request</DialogTitle>
                          <DialogDescription>
                            Send a personalized request to this volunteer to join your hostel team.
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                            <Avatar className="w-10 h-10">
                              <AvatarImage src={selectedVolunteer?.avatar} />
                              <AvatarFallback>
                                {selectedVolunteer ? `${selectedVolunteer.firstName[0]}${selectedVolunteer.lastName[0]}` : 'V'}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium">
                                {selectedVolunteer ? `${selectedVolunteer.firstName} ${selectedVolunteer.lastName}` : ''}
                              </p>
                              <p className="text-sm text-muted-foreground">
                                {selectedVolunteer?.location}
                              </p>
                            </div>
                          </div>
                          
                          <div>
                            <Label htmlFor="position">Position (Optional)</Label>
                            <Input
                              id="position"
                              placeholder="e.g., Reception, Kitchen Help"
                              value={requestPosition}
                              onChange={(e) => setRequestPosition(e.target.value)}
                            />
                          </div>

                          <div className="grid grid-cols-2 gap-2">
                            <div>
                              <Label htmlFor="duration">Duration</Label>
                              <Input
                                id="duration"
                                placeholder="e.g., 2-4 weeks"
                                value={requestDuration}
                                onChange={(e) => setRequestDuration(e.target.value)}
                              />
                            </div>
                            <div>
                              <Label htmlFor="startDate">Start Date</Label>
                              <Input
                                id="startDate"
                                type="date"
                                value={requestStartDate}
                                onChange={(e) => setRequestStartDate(e.target.value)}
                              />
                            </div>
                          </div>

                          <div>
                            <Label htmlFor="message">Message *</Label>
                            <Textarea
                              id="message"
                              placeholder="Introduce your hostel and explain why you'd like this volunteer to join your team..."
                              value={requestMessage}
                              onChange={(e) => setRequestMessage(e.target.value)}
                              rows={4}
                              required
                            />
                          </div>

                          <div className="flex justify-end gap-2">
                            <Button 
                              variant="outline" 
                              onClick={() => setSelectedVolunteer(null)}
                            >
                              Cancel
                            </Button>
                            <Button 
                              onClick={handleSendRequest}
                              disabled={isSubmittingRequest || !requestMessage.trim()}
                            >
                              {isSubmittingRequest ? 'Sending...' : 'Send Request'}
                            </Button>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredVolunteers.length === 0 && (
          <div className="text-center py-12">
            <Search className="w-12 h-12 mx-auto mb-4 text-muted-foreground opacity-50" />
            <h3 className="text-lg mb-2">No volunteers found</h3>
            <p className="text-muted-foreground">Try adjusting your search criteria or filters</p>
          </div>
        )}
      </div>
    </div>
  );
}