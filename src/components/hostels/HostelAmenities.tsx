import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Wifi, Coffee, Car, Utensils, Bed, Shield, Bath, Tv, MapPin, Waves } from "lucide-react";
import { motion } from "motion/react";

interface HostelAmenitiesProps {
  amenities?: string[];
  customAmenities?: Array<{
    icon: React.ReactNode;
    name: string;
    available: boolean;
  }>;
}

export function HostelAmenities({ amenities, customAmenities }: HostelAmenitiesProps) {
  const standardAmenities = [
    { icon: <Wifi className="w-4 h-4" />, name: "Free WiFi", available: true },
    { icon: <Coffee className="w-4 h-4" />, name: "Kitchen Access", available: true },
    { icon: <Car className="w-4 h-4" />, name: "Parking", available: true },
    { icon: <Utensils className="w-4 h-4" />, name: "Meals Included", available: true },
    { icon: <Bed className="w-4 h-4" />, name: "Private Room", available: false },
    { icon: <Shield className="w-4 h-4" />, name: "24/7 Security", available: true },
    { icon: <Bath className="w-4 h-4" />, name: "Hot Showers", available: true },
    { icon: <Tv className="w-4 h-4" />, name: "Common Room", available: true },
    { icon: <MapPin className="w-4 h-4" />, name: "City Center", available: true },
    { icon: <Waves className="w-4 h-4" />, name: "Near Beach", available: false }
  ];

  const displayAmenities = customAmenities || standardAmenities;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      <Card>
        <CardHeader>
          <CardTitle>Amenities & Features</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {displayAmenities.map((amenity, index) => (
              <div 
                key={index} 
                className={`flex items-center space-x-3 p-3 rounded-lg border transition-colors ${
                  amenity.available 
                    ? "bg-orange-50 border-orange-100 text-orange-900" 
                    : "bg-gray-50 border-gray-200 text-gray-500"
                }`}
              >
                <div className={amenity.available ? "text-orange-600" : "text-gray-400"}>
                  {amenity.icon}
                </div>
                <span className="text-sm font-medium">{amenity.name}</span>
                {!amenity.available && (
                  <span className="text-xs text-gray-400 ml-auto">N/A</span>
                )}
              </div>
            ))}
          </div>
          
          <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <h4 className="font-semibold text-blue-900 mb-2">Included in your stay</h4>
            <div className="grid md:grid-cols-2 gap-2 text-sm text-blue-800">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full" />
                <span>Accommodation in shared dorm</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full" />
                <span>Breakfast daily</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full" />
                <span>One main meal per day</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full" />
                <span>Laundry facilities</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}