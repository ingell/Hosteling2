import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
import { Badge } from "../../ui/badge";
import { Button } from "../../ui/button";

interface Volunteer {
  id: number;
  name: string;
  avatar: string;
  role: string;
  startDate: string;
  endDate: string;
  skills: string[];
}

interface HostelVolunteersTabProps {
  volunteers: Volunteer[];
}

export function HostelVolunteersTab({ volunteers }: HostelVolunteersTabProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Current Volunteers ({volunteers.length})</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {volunteers.map((volunteer) => (
          <div
            key={volunteer.id}
            className="flex items-center justify-between p-4 border rounded-lg"
          >
            <div className="flex items-center space-x-4">
              <Avatar>
                <AvatarImage src={volunteer.avatar} alt={volunteer.name} />
                <AvatarFallback>
                  {volunteer.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div>
                <h4 className="font-medium">{volunteer.name}</h4>
                <p className="text-sm text-muted-foreground">
                  {volunteer.role}
                </p>
                <p className="text-xs text-muted-foreground">
                  {volunteer.startDate} - {volunteer.endDate}
                </p>
              </div>
            </div>
            <div className="text-right">
              <div className="flex flex-wrap gap-1 justify-end mb-2">
                {volunteer.skills.slice(0, 2).map((skill) => (
                  <Badge key={skill} variant="outline" className="text-xs">
                    {skill}
                  </Badge>
                ))}
              </div>
              <Button variant="outline" size="sm">
                Message
              </Button>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
