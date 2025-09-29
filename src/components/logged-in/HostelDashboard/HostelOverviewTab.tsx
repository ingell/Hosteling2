import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
import { Badge } from "../../ui/badge";
import { Coffee, Wifi, X } from "lucide-react";

interface HostelOverviewTabProps {
  hostelData: {
    description: string;
    volunteerRoles: string[];
    workHoursPerDay: string;
    accommodationType: string;
    minimumStay: string;
    maximumStay: string;
    mealsIncluded: boolean;
    wifiIncluded: boolean;
    amenities: string[];
  };
}

export function HostelOverviewTab({ hostelData }: HostelOverviewTabProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-6">
        {/* About the Hostel */}
        <Card>
          <CardHeader>
            <CardTitle>About Our Hostel</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">{hostelData.description}</p>
          </CardContent>
        </Card>

        {/* Volunteer Opportunities */}
        <Card>
          <CardHeader>
            <CardTitle>Volunteer Opportunities</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="text-sm font-medium mb-2">Available Roles</h4>
              <div className="flex flex-wrap gap-2">
                {hostelData.volunteerRoles.map((role) => (
                  <Badge key={role} variant="outline">
                    {role}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-medium">Work Hours:</span>
                <p className="text-muted-foreground">
                  {hostelData.workHoursPerDay}
                </p>
              </div>
              <div>
                <span className="font-medium">Accommodation:</span>
                <p className="text-muted-foreground">
                  {hostelData.accommodationType}
                </p>
              </div>
              <div>
                <span className="font-medium">Minimum Stay:</span>
                <p className="text-muted-foreground">
                  {hostelData.minimumStay}
                </p>
              </div>
              <div>
                <span className="font-medium">Maximum Stay:</span>
                <p className="text-muted-foreground">
                  {hostelData.maximumStay}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-4 text-sm">
              <div className="flex items-center">
                {hostelData.mealsIncluded ? (
                  <Coffee className="w-4 h-4 mr-1 text-green-500" />
                ) : (
                  <X className="w-4 h-4 mr-1 text-red-500" />
                )}
                Meals {hostelData.mealsIncluded ? "Included" : "Not Included"}
              </div>
              <div className="flex items-center">
                {hostelData.wifiIncluded ? (
                  <Wifi className="w-4 h-4 mr-1 text-green-500" />
                ) : (
                  <X className="w-4 h-4 mr-1 text-red-500" />
                )}
                WiFi {hostelData.wifiIncluded ? "Included" : "Not Included"}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Amenities */}
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Amenities</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {hostelData.amenities.map((amenity) => (
                <Badge key={amenity} variant="secondary" className="text-xs">
                  {amenity}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
