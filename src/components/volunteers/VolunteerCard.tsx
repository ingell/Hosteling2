import React from "react";
import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { MessageCircle, Star, MapPin, Calendar, Users, Globe } from "lucide-react";
import { motion } from "motion/react";

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

interface VolunteerCardProps {
  volunteer: Volunteer;
  onVolunteerClick: (volunteerId: string) => void;
  onContact: (volunteerId: string) => void;
  showRequestButton?: boolean;
  isRequested?: boolean;
}

export function VolunteerCard({ 
  volunteer, 
  onVolunteerClick, 
  onContact, 
  showRequestButton = true,
  isRequested = false 
}: VolunteerCardProps) {
  const getExperienceColor = (experience: string) => {
    switch (experience.toLowerCase()) {
      case 'beginner':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'intermediate':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'advanced':
        return 'bg-red-100 text-red-700 border-red-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="hover:shadow-lg transition-all duration-300 cursor-pointer group">
        <CardContent className="p-6">
          <div className="flex items-start space-x-4">
            {/* Avatar */}
            <div className="relative">
              <Avatar className="w-16 h-16">
                <AvatarImage src={volunteer.avatar} alt={`${volunteer.firstName} ${volunteer.lastName}`} />
                <AvatarFallback className="bg-gradient-to-r from-orange-500 to-yellow-500 text-white">
                  {volunteer.firstName[0]}{volunteer.lastName[0]}
                </AvatarFallback>
              </Avatar>
              {volunteer.verified && (
                <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
              )}
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h3 
                    className="font-semibold text-lg group-hover:text-orange-600 transition-colors cursor-pointer"
                    onClick={() => onVolunteerClick(volunteer.id)}
                  >
                    {volunteer.firstName} {volunteer.lastName}
                  </h3>
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <MapPin className="w-4 h-4" />
                    <span>{volunteer.location}</span>
                    <span>•</span>
                    <span>{volunteer.age} years old</span>
                  </div>
                </div>
                
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="font-medium">{volunteer.rating}</span>
                  <span className="text-sm text-muted-foreground">({volunteer.reviewCount})</span>
                </div>
              </div>

              {/* Experience and Stats */}
              <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-3">
                <div className="flex items-center space-x-1">
                  <Users className="w-4 h-4" />
                  <span>{volunteer.completedVolunteering} completed</span>
                </div>
                <Badge variant="outline" className={getExperienceColor(volunteer.experience)}>
                  {volunteer.experience}
                </Badge>
              </div>

              {/* Skills */}
              <div className="mb-3">
                <div className="flex flex-wrap gap-1">
                  {volunteer.skills.slice(0, 4).map((skill, index) => (
                    <Badge key={index} variant="secondary" className="text-xs bg-orange-100 text-orange-700">
                      {skill}
                    </Badge>
                  ))}
                  {volunteer.skills.length > 4 && (
                    <Badge variant="secondary" className="text-xs bg-gray-100 text-gray-600">
                      +{volunteer.skills.length - 4} more
                    </Badge>
                  )}
                </div>
              </div>

              {/* Languages */}
              <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-3">
                <Globe className="w-4 h-4" />
                <span>{volunteer.languages.slice(0, 3).join(', ')}</span>
                {volunteer.languages.length > 3 && (
                  <span>+{volunteer.languages.length - 3} more</span>
                )}
              </div>

              {/* Availability */}
              <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-4">
                <Calendar className="w-4 h-4" />
                <span>Available: {volunteer.availability.from} - {volunteer.availability.to}</span>
              </div>

              {/* Bio Preview */}
              {volunteer.bio && (
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                  {volunteer.bio}
                </p>
              )}

              {/* Action Buttons */}
              <div className="flex space-x-2">
                <Button 
                  size="sm"
                  className="flex-1"
                  onClick={() => onVolunteerClick(volunteer.id)}
                >
                  View Profile
                </Button>
                
                {showRequestButton && (
                  <Button 
                    variant={isRequested ? "secondary" : "outline"}
                    size="sm"
                    className={`flex-1 ${isRequested ? 'bg-green-100 text-green-700 border-green-200' : 'border-orange-200 text-orange-600 hover:bg-orange-50'}`}
                    onClick={() => onContact(volunteer.id)}
                    disabled={isRequested}
                  >
                    <MessageCircle className="w-4 h-4 mr-2" />
                    {isRequested ? 'Request Sent' : 'Send Request'}
                  </Button>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}