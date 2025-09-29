import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
import { Badge } from "../../ui/badge";
import { Separator } from "../../ui/separator";
import { Star } from "lucide-react";

interface Review {
  id: number;
  volunteerName: string;
  volunteerAvatar: string;
  rating: number;
  comment: string;
  date: string;
  skills: string[];
}

interface HostelReviewsTabProps {
  reviews: Review[];
}

export function HostelReviewsTab({ reviews }: HostelReviewsTabProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Reviews from Volunteers ({reviews.length})</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {reviews.map((review, index) => (
          <div key={review.id}>
            <div className="flex items-start space-x-4">
              <Avatar>
                <AvatarImage
                  src={review.volunteerAvatar}
                  alt={review.volunteerName}
                />
                <AvatarFallback>
                  {review.volunteerName
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-2">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">{review.volunteerName}</h4>
                    <div className="flex flex-wrap gap-1">
                      {review.skills.map((skill) => (
                        <Badge
                          key={skill}
                          variant="outline"
                          className="text-xs"
                        >
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < review.rating
                              ? "fill-yellow-400 text-yellow-400"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">
                  {review.comment}
                </p>
                <p className="text-xs text-muted-foreground">{review.date}</p>
              </div>
            </div>
            {index < reviews.length - 1 && <Separator className="mt-6" />}
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
