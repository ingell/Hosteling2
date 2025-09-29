import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
import { ImageWithFallback } from "../../figma/ImageWithFallback";

interface HostelPhotosTabProps {
  photos: string[];
}

export function HostelPhotosTab({ photos }: HostelPhotosTabProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Hostel Photos</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {photos.map((photo, index) => (
            <ImageWithFallback
              key={index}
              src={photo}
              alt={`Hostel photo ${index + 1}`}
              className="w-full h-32 object-cover rounded-lg"
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
