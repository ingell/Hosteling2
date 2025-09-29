import React, { useState, useEffect } from "react";
import { LocalStorageManager } from "../utils/local-storage";
import { Header } from "./Header";
import { VolunteerDashboard } from "./VolunteerDashboard";

export function LoggedInView({ userType, onLogout }: LoggedInViewProps) {
  const [userData, setUserData] = useState<any>(null);
  const [activeTab, setActiveTab] = useState("overview");
  const [unreadMessages, setUnreadMessages] = useState(0);
  const [unreadNotifications, setUnreadNotifications] = useState(0);

  useEffect(() => {
    const storedUserData = LocalStorageManager.getUserData();
    if (storedUserData) {
      setUserData(storedUserData);
    }
  }, []);

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-background">
      <Header
        userData={userData}
        unreadMessages={unreadMessages}
        unreadNotifications={unreadNotifications}
        onMessagesClick={() => setActiveTab("messages")}
        onNotificationsClick={() => setActiveTab("notifications")}
        onProfileClick={() =>
          setActiveTab(
            userType === "volunteer" ? "volunteer-profile" : "hostel-profile"
          )
        }
        onLogout={onLogout}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {userType === "volunteer" ? (
          <VolunteerDashboard
            userData={userData}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
        ) : (
          <HostelDashboard
            userData={userData}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
        )}
      </div>
    </div>
  );
}
