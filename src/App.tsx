import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { SignupChoice } from "./components/signup-choice";
import { SignupFlow } from "./components/signup-flow";
import { HostelSignupFlow } from "./components/hostel-signup-flow";
import { HowItWorks } from "./components/how-it-works";
import { ForHostels } from "./components/for-hostels";
import { LoggedInView } from "./components/logged-in-view";
import { LoginFlow } from "./components/login-flow";
import { HostelDetailView } from "./components/hostel-detail-view";
import { LocalStorageManager } from "./components/utils/local-storage";
import { Users, Heart, Clock, Globe } from "lucide-react";
import { VolunteerProfile, HostelProfile } from "./types/UserProfiles";

const featuredHostels = [
  {
    id: 1,
    name: "Nomad's Paradise",
    location: "Bangkok, Thailand",
    image:
      "https://images.unsplash.com/photo-1549872178-96db16a53ca8?w=400&h=300&fit=crop",
    volunteersNeeded: 3,
    commitment: "2-4 weeks",
    tasks: ["Reception", "Cleaning", "Events"],
    rating: 4.8,
    description:
      "A vibrant hostel in the heart of Bangkok offering authentic local experiences.",
  },
  {
    id: 2,
    name: "Surf & Stay Hostel",
    location: "Lisbon, Portugal",
    image:
      "https://images.unsplash.com/photo-1709805619372-40de3f158e83?w=400&h=300&fit=crop",
    volunteersNeeded: 2,
    commitment: "3-6 weeks",
    tasks: ["Maintenance", "Tours", "Bar Help"],
    rating: 4.9,
    description:
      "Beachside hostel perfect for surf enthusiasts and digital nomads.",
  },
  {
    id: 3,
    name: "Mountain View Lodge",
    location: "Cusco, Peru",
    image:
      "https://images.unsplash.com/photo-1706823871410-ed8b01faef7e?w=400&h=300&fit=crop",
    volunteersNeeded: 4,
    commitment: "4-8 weeks",
    tasks: ["Kitchen", "Housekeeping", "Social Media"],
    rating: 4.7,
    description:
      "Gateway to Machu Picchu with stunning mountain views and local culture.",
  },
];

const benefits = [
  {
    icon: <Heart className="w-6 h-6" />,
    title: "100% Free",
    description:
      "No booking fees or commissions. Connect directly with hostels at zero cost.",
  },
  {
    icon: <Globe className="w-6 h-6" />,
    title: "Global Network",
    description:
      "Access opportunities in over 50 countries across 6 continents.",
  },
  {
    icon: <Users className="w-6 h-6" />,
    title: "Community",
    description:
      "Join a community of like-minded travelers and make lifelong connections.",
  },
  {
    icon: <Clock className="w-6 h-6" />,
    title: "Flexible",
    description:
      "Choose your commitment length and type of work that suits your travel plans.",
  },
];

export default function App() {
  const [searchLocation, setSearchLocation] = useState("");
  const [currentView, setCurrentView] = useState<
    | "landing"
    | "signup-choice"
    | "signup"
    | "hostel-signup"
    | "how-it-works"
    | "for-hostels"
    | "logged-in"
    | "login"
    | "hostel-detail"
    | "browse"
    | "volunteer-community"
    | "safety-guidelines"
    | "about"
    | "help-center"
    | "contact"
    | "terms"
    | "privacy"
  >("landing");
  const [userType, setUserType] = useState<"volunteer" | "hostel">("volunteer");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState<any>(null);
  const [selectedHostel, setSelectedHostel] = useState<any>(null);
  const [searchResults, setSearchResults] = useState<any[]>([]);

  // Load user data from localStorage on app start
  useEffect(() => {
    document.title =
      "Hosteling - Free Volunteer Opportunities at Hostels Worldwide";
    const storedUserData = LocalStorageManager.getUserData();
    if (storedUserData && storedUserData.isLoggedIn) {
      setUserData(storedUserData);
      setUserType(storedUserData.type);
      setIsLoggedIn(true);
      setCurrentView("logged-in");

      // Add welcome back notification with type narrowing
      if (storedUserData.type === "hostel") {
        LocalStorageManager.addNotification({
          type: "system",
          title: "Welcome back!",
          message: `Welcome back to Hosteling, ${
            (storedUserData.profile as HostelProfile).contactFirstName
          }!`,
          priority: "low",
        });
      } else {
        LocalStorageManager.addNotification({
          type: "system",
          title: "Welcome back!",
          message: `Welcome back to Hosteling, ${
            (storedUserData.profile as VolunteerProfile).firstName
          }!`,
          priority: "low",
        });
      }
    }
  }, []);

  const handleSignupComplete = (data: any, type: "volunteer" | "hostel") => {
    // Create user data object for localStorage
    const newUserData = {
      id: Date.now().toString(),
      type,
      isLoggedIn: true,
      profile: data,
      savedItems: [],
      applications: [],
      messages: [],
      notifications: [],
    };

    // Save to localStorage
    LocalStorageManager.saveUserData(newUserData);

    // Add welcome notification
    LocalStorageManager.addNotification({
      type: "system",
      title: "Welcome to Hosteling!",
      message: `Your ${type} account has been created successfully. Start exploring opportunities!`,
      priority: "high",
    });

    setUserData(newUserData);
    setUserType(type);
    setIsLoggedIn(true);
    setCurrentView("logged-in");
  };

  const handleLogin = (credentials: {
    email: string;
    password: string;
    type: "volunteer" | "hostel";
  }) => {
    // Check if user exists in localStorage
    const existingUserData = LocalStorageManager.getUserData();

    if (
      existingUserData &&
      existingUserData.profile.email === credentials.email &&
      existingUserData.type === credentials.type
    ) {
      // User exists, log them in
      const updatedUserData = { ...existingUserData, isLoggedIn: true };
      LocalStorageManager.saveUserData(updatedUserData);

      LocalStorageManager.addNotification({
        type: "system",
        title: "Welcome back!",
        message: `Successfully logged in to your ${credentials.type} account.`,
        priority: "medium",
      });

      setUserData(updatedUserData);
      setUserType(credentials.type);
      setIsLoggedIn(true);
      setCurrentView("logged-in");
    } else {
      // User doesn't exist or wrong credentials
      LocalStorageManager.addNotification({
        type: "error",
        title: "Login Failed",
        message:
          "Invalid email or password. Please check your credentials or sign up.",
        priority: "high",
      });
    }
  };

  const handleLogout = () => {
    LocalStorageManager.clearUserData();
    setUserData(null);
    setIsLoggedIn(false);
    setCurrentView("landing");
  };

  const handleSearch = (location: string) => {
    // Filter hostels based on search location
    const filtered = featuredHostels.filter(
      (hostel) =>
        hostel.location.toLowerCase().includes(location.toLowerCase()) ||
        hostel.name.toLowerCase().includes(location.toLowerCase())
    );
    setSearchResults(filtered);
    setCurrentView("browse");
  };

  const handleHostelClick = (hostel: any) => {
    setSelectedHostel(hostel);
    setCurrentView("hostel-detail");
  };

  const handleApply = (hostelId: string) => {
    if (!isLoggedIn) {
      LocalStorageManager.addNotification({
        type: "warning",
        title: "Please Log In",
        message: "You need to log in to apply for positions.",
        priority: "high",
      });
      setCurrentView("login");
      return;
    }

    LocalStorageManager.addNotification({
      type: "success",
      title: "Application Sent!",
      message: "Your application has been sent to the hostel.",
      priority: "high",
    });
  };

  const handleContact = (hostelId: string) => {
    if (!isLoggedIn) {
      LocalStorageManager.addNotification({
        type: "warning",
        title: "Please Log In",
        message: "You need to log in to contact hostels.",
        priority: "high",
      });
      setCurrentView("login");
      return;
    }

    LocalStorageManager.addNotification({
      type: "info",
      title: "Message Sent!",
      message: "Your message has been sent to the hostel.",
      priority: "medium",
    });
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route
          path="/how-it-works"
          element={
            <HowItWorks onSignupClick={() => setCurrentView("signup-choice")} />
          }
        />
        <Route
          path="/for-hostels"
          element={
            <ForHostels onSignupClick={() => setCurrentView("signup-choice")} />
          }
        />
        <Route
          path="/login"
          element={
            <LoginFlow
              onLogin={handleLogin}
              onBack={() => setCurrentView("landing")}
              onSignupRedirect={() => setCurrentView("signup-choice")}
            />
          }
        />
        <Route
          path="/signup-choice"
          element={
            <SignupChoice
              onChoice={(type) =>
                setCurrentView(
                  type === "volunteer" ? "signup" : "hostel-signup"
                )
              }
              onBack={() => setCurrentView("landing")}
            />
          }
        />
        <Route
          path="/signup"
          element={
            <SignupFlow
              onComplete={(data) => handleSignupComplete(data, "volunteer")}
              onBack={() => setCurrentView("signup-choice")}
            />
          }
        />
        <Route
          path="/hostel-signup"
          element={
            <HostelSignupFlow
              onComplete={(data) => handleSignupComplete(data, "hostel")}
              onBack={() => setCurrentView("signup-choice")}
            />
          }
        />
        <Route
          path="/logged-in"
          element={<LoggedInView userType={userType} onLogout={handleLogout} />}
        />
        <Route
          path="/hostel-detail"
          element={
            <HostelDetailView
              hostel={selectedHostel}
              onBack={() =>
                setCurrentView(searchResults.length > 0 ? "browse" : "landing")
              }
              onApply={handleApply}
              onContact={handleContact}
              userType={userType}
            />
          }
        />
        <Route path="/browse" element={<BrowsePage />} />
      </Routes>
    </Router>
  );
}

function LandingPage() {
  // Extract the landing page content from the current `App` component
  return (
    <div className="min-h-screen bg-background">
      {/* ...existing landing page content... */}
    </div>
  );
}

function BrowsePage() {
  // Extract the browse page content from the current `App` component
  return (
    <div className="min-h-screen bg-background">
      {/* ...existing browse page content... */}
    </div>
  );
}
