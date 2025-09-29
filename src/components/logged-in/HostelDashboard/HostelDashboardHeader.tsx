import React from "react";
import { Button } from "../../ui/button";
import { Settings, Edit } from "lucide-react";

interface HostelDashboardHeaderProps {
  isEditing: boolean;
  onBack: () => void;
  toggleEditing: () => void;
}

export function HostelDashboardHeader({
  isEditing,
  onBack,
  toggleEditing,
}: HostelDashboardHeaderProps) {
  return (
    <div className="border-b">
      <div className="max-w-6xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Button variant="ghost" onClick={onBack}>
            ← Back to Dashboard
          </Button>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </Button>
            <Button
              variant={isEditing ? "default" : "outline"}
              size="sm"
              onClick={toggleEditing}
            >
              <Edit className="w-4 h-4 mr-2" />
              {isEditing ? "Save Changes" : "Edit Profile"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
