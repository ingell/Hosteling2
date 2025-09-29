import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Globe } from "lucide-react";

interface HostelProfileDetailsProps {
  hostelData: {
    contactName: string;
    email: string;
    phone: string;
    address: string;
    amenities: string[];
    languages: string[];
  };
}

export function HostelProfileDetails({
  hostelData,
}: HostelProfileDetailsProps) {
  return (
    <div className="space-y-6">
      {/* Contact Information */}
      <Card>
        <CardHeader>
          <CardTitle>Contact Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div>
            <span className="text-sm font-medium">Contact Person</span>
            <p className="text-muted-foreground">{hostelData.contactName}</p>
          </div>
          <div>
            <span className="text-sm font-medium">Email</span>
            <p className="text-muted-foreground">{hostelData.email}</p>
          </div>
          <div>
            <span className="text-sm font-medium">Phone</span>
            <p className="text-muted-foreground">{hostelData.phone}</p>
          </div>
          <div>
            <span className="text-sm font-medium">Address</span>
            <p className="text-muted-foreground text-sm">
              {hostelData.address}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Amenities */}
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

      {/* Languages */}
      <Card>
        <CardHeader>
          <CardTitle>Languages</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {hostelData.languages.map((language) => (
              <Badge key={language} variant="outline" className="text-xs">
                <Globe className="w-3 h-3 mr-1" />
                {language}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
