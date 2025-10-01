import React from "react";
import { Card, CardContent } from "../../../shared/ui/card";
import { Badge } from "../../../shared/ui/badge";
import { Button } from "../../../shared/ui/button";
import { ImageWithFallback } from "../../../shared/components/ImageWithFallback";
import { Star, MapPin, Users, Clock, Heart, Calendar, Zap } from "lucide-react";
import { motion } from "motion/react";
import { Hostel } from "../../../shared/types";

interface HostelCardProps {
  hostel: Hostel;
  onHostelClick: (hostelId: string) => void;
  onApply: (hostelId: string) => void;
  onFavorite?: (hostelId: string) => void;
  isFavorited?: boolean;
  showApplyButton?: boolean;
}

export function HostelCard({ 
  hostel, 
  onHostelClick, 
  onApply, 
  onFavorite,
  isFavorited = false,
  showApplyButton = true 
}: HostelCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 group cursor-pointer">
        <div className="relative">
          <ImageWithFallback
            src={hostel.image}
            alt={hostel.name}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
            onClick={() => onHostelClick(hostel.id)}
          />
          
          {/* Overlay badges */}
          <div className="absolute top-3 left-3 flex flex-wrap gap-2">
            {hostel.urgent && (
              <Badge className="bg-red-500 text-white animate-pulse">
                <Zap className="w-3 h-3 mr-1" />
                Urgent
              </Badge>
            )}
            {hostel.verified && (
              <Badge className="bg-blue-500 text-white">
                Verified
              </Badge>
            )}
          </div>

          {/* Favorite button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onFavorite?.(hostel.id);
            }}
            className="absolute top-3 right-3 w-8 h-8 bg-white/90 hover:bg-white rounded-full flex items-center justify-center transition-colors"
          >
            <Heart 
              className={`w-4 h-4 ${isFavorited ? 'text-red-500 fill-current' : 'text-gray-600'}`} 
            />
          </button>

          {/* Rating overlay */}
          <div className="absolute bottom-3 left-3 bg-black/70 text-white px-2 py-1 rounded-full text-sm flex items-center space-x-1">
            <Star className="w-3 h-3 fill-current text-yellow-400" />
            <span>{hostel.rating}</span>
            <span className="text-white/80">({hostel.reviewCount})</span>
          </div>
        </div>

        <CardContent className="p-4">
          <div className="space-y-3">
            {/* Header */}
            <div>
              <h3 
                className="font-semibold text-lg group-hover:text-orange-600 transition-colors cursor-pointer line-clamp-1"
                onClick={() => onHostelClick(hostel.id)}
              >
                {hostel.name}
              </h3>
              <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4" />
                <span>{hostel.location}</span>
              </div>
            </div>

            {/* Roles */}
            <div className="flex flex-wrap gap-1">
              {hostel.roles.slice(0, 3).map((role, index) => (
                <Badge key={index} variant="secondary" className="text-xs bg-orange-100 text-orange-700">
                  {role}
                </Badge>
              ))}
              {hostel.roles.length > 3 && (
                <Badge variant="secondary" className="text-xs bg-gray-100 text-gray-600">
                  +{hostel.roles.length - 3} more
                </Badge>
              )}
            </div>

            {/* Details */}
            <div className="space-y-2 text-sm text-muted-foreground">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-1">
                  <Calendar className="w-4 h-4" />
                  <span>{hostel.commitment}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Clock className="w-4 h-4" />
                  <span>{hostel.workHours}</span>
                </div>
              </div>
              
              <div className="flex items-center space-x-1">
                <Users className="w-4 h-4" />
                <span>{hostel.accommodationType}</span>
                {hostel.mealsIncluded && (
                  <>
                    <span>•</span>
                    <span>Meals included</span>
                  </>
                )}
              </div>
            </div>

            {/* Description preview */}
            <p className="text-sm text-muted-foreground line-clamp-2">
              {hostel.description}
            </p>

            {/* Key amenities */}
            <div className="flex flex-wrap gap-1">
              {hostel.amenities.slice(0, 4).map((amenity, index) => (
                <span key={index} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                  {amenity}
                </span>
              ))}
              {hostel.amenities.length > 4 && (
                <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                  +{hostel.amenities.length - 4} more
                </span>
              )}
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between pt-2 border-t">
              <span className="text-xs text-muted-foreground">
                Posted {hostel.lastPosted}
              </span>
              
              {showApplyButton && (
                <div className="flex space-x-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => onHostelClick(hostel.id)}
                  >
                    View Details
                  </Button>
                  <Button 
                    size="sm"
                    className="bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white"
                    onClick={(e) => {
                      e.stopPropagation();
                      onApply(hostel.id);
                    }}
                  >
                    Apply Now
                  </Button>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}