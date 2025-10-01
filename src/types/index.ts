// User and Profile Types
export interface VolunteerProfile {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  nationality: string;
  languages: string[];
  skills: string[];
  experience: string;
  bio: string;
  availability: {
    startDate: string;
    endDate: string;
    minDuration: string;
    maxDuration: string;
  };
  preferences: {
    regions: string[];
    hostelTypes: string[];
    workTypes: string[];
  };
}

export interface HostelProfile {
  hostelName: string;
  contactFirstName: string;
  contactLastName: string;
  email: string;
  phone: string;
  address: {
    street: string;
    city: string;
    country: string;
    postalCode: string;
  };
  description: string;
  amenities: string[];
  workOpportunities: string[];
  requirements: string[];
  images: string[];
}

export interface UserData {
  id: string;
  type: "volunteer" | "hostel";
  isLoggedIn: boolean;
  profile: VolunteerProfile | HostelProfile;
  savedItems: string[];
  applications: Application[];
  messages: Message[];
  notifications: Notification[];
}

// Hostel and Opportunity Types
export interface Hostel {
  id: number;
  name: string;
  location: string;
  image: string;
  volunteersNeeded: number;
  commitment: string;
  tasks: string[];
  rating: number;
  description: string;
}

export interface Application {
  id: string;
  hostelId: string;
  status: "pending" | "accepted" | "rejected";
  appliedDate: string;
  message?: string;
}

// Communication Types
export interface Message {
  id: string;
  from: string;
  to: string;
  subject: string;
  content: string;
  timestamp: string;
  read: boolean;
}

export interface Notification {
  id?: string;
  type: "success" | "error" | "warning" | "info" | "system";
  title: string;
  message: string;
  priority: "low" | "medium" | "high";
  timestamp?: string;
  read?: boolean;
}

// UI and Navigation Types
export type ViewType =
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
  | "privacy";

export interface LoginCredentials {
  email: string;
  password: string;
  type: "volunteer" | "hostel";
}

// Component Props Types
export interface SearchProps {
  value: string;
  onChange: (value: string) => void;
  onSearch: (location: string) => void;
}

export interface BenefitItem {
  icon: React.ReactNode; // Ensure the icon can accept JSX elements
  title: string;
  description: string;
}
