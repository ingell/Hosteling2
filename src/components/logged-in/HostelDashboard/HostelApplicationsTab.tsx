import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
import { Badge } from "../../ui/badge";
import { Button } from "../../ui/button";

interface Application {
  id: number;
  name: string;
  avatar: string;
  skills: string[];
  availability: string;
  rating: number;
  applied: string;
}

interface HostelApplicationsTabProps {
  applications: Application[];
}

export function HostelApplicationsTab({
  applications,
}: HostelApplicationsTabProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Pending Applications ({applications.length})</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {applications.map((application) => (
          <div
            key={application.id}
            className="flex items-center space-x-4 p-4 border rounded-lg"
          >
            <Avatar>
              <AvatarImage src={application.avatar} alt={application.name} />
              <AvatarFallback>
                {application.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h4 className="font-medium">{application.name}</h4>
              <div className="flex flex-wrap gap-1 mt-1">
                {application.skills.map((skill) => (
                  <Badge key={skill} variant="outline" className="text-xs">
                    {skill}
                  </Badge>
                ))}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Available: {application.availability}
              </p>
              <p className="text-xs text-muted-foreground">
                Applied: {application.applied}
              </p>
            </div>
            <div className="text-right">
              <div className="flex items-center text-sm mb-2">
                <span className="text-yellow-500 font-bold">
                  {application.rating}
                </span>
                <span className="ml-1 text-muted-foreground">/ 5</span>
              </div>
              <div className="flex space-x-2">
                <Button size="sm" variant="outline">
                  Decline
                </Button>
                <Button size="sm">Accept</Button>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
