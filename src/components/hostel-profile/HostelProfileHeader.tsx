import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";
import { MapPin, Calendar, Bed, Star } from "lucide-react";

interface HostelProfileHeaderProps {
  hostelData: {
    name: string;
    avatar: string;
    city: string;
    country: string;
    establishedYear: number;
    totalBeds: number;
    type: string;
    totalVolunteersHosted: number;
    totalRating: number;
    reviewCount: number;
    amenities: string[];
  };
}

export function HostelProfileHeader({ hostelData }: HostelProfileHeaderProps) {
  return (
    <div className="mb-8">
      <div className="flex flex-col lg:flex-row items-start lg:items-center space-y-6 lg:space-y-0 lg:space-x-8">
        {/* Avatar */}
        <div className="relative">
          <Avatar className="w-32 h-32">
            <AvatarImage src={hostelData.avatar} alt={hostelData.name} />
            <AvatarFallback className="text-2xl">
              {hostelData.name.substring(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </div>

        {/* Hostel Details */}
        <div className="flex-1 space-y-4">
          <div>
            <h1 className="text-3xl mb-2">{hostelData.name}</h1>
            <div className="flex flex-col space-y-1 text-muted-foreground">
              <div className="flex items-center">
                <MapPin className="w-4 h-4 mr-1" />
                {hostelData.city}, {hostelData.country}
              </div>
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-1" />
                Established {hostelData.establishedYear}
              </div>
              <div className="flex items-center">
                <Bed className="w-4 h-4 mr-1" />
                {hostelData.totalBeds} beds • {hostelData.type}
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="flex items-center space-x-8">
            <div className="text-center">
              <div className="text-2xl">{hostelData.totalVolunteersHosted}</div>
              <div className="text-sm text-muted-foreground">
                Total Volunteers
              </div>
            </div>
            <div className="text-center">
              <div className="flex items-center text-2xl">
                {hostelData.totalRating}
                <Star className="w-5 h-5 ml-1 fill-yellow-400 text-yellow-400" />
              </div>
              <div className="text-sm text-muted-foreground">
                Rating ({hostelData.reviewCount})
              </div>
            </div>
          </div>

          {/* Amenities */}
          <div className="flex flex-wrap gap-2">
            {hostelData.amenities.slice(0, 4).map((amenity) => (
              <Badge key={amenity} variant="secondary" className="text-xs">
                {amenity}
              </Badge>
            ))}
            {hostelData.amenities.length > 4 && (
              <Badge variant="outline" className="text-xs">
                +{hostelData.amenities.length - 4} more
              </Badge>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
