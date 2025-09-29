import React from "react";
import { HostelDashboard } from "./HostelDashboard";
import { VolunteerDashboard } from "./VolunteerDashboard";

interface LoggedInViewProps {
  userType: "volunteer" | "hostel";
  userData: any; // Replace `any` with a proper type for user data
  onLogout: () => void;
}

export function LoggedInView({
  userType,
  userData,
  onLogout,
}: LoggedInViewProps) {
  return (
    <div className="min-h-screen bg-background">
      {userType === "volunteer" ? (
        <VolunteerDashboard userData={userData} onLogout={onLogout} />
      ) : (
        <HostelDashboard hostelData={userData} onBack={onLogout} />
      )}
    </div>
  );
}
