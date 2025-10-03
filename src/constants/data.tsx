import { Hostel, BenefitItem } from "../types";
import { Heart, Globe, Users, Clock } from "lucide-react";

export const featuredHostels: Hostel[] = [
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

export const benefits: BenefitItem[] = [
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

export const popularDestinations = [
  "Bangkok",
  "Lisbon",
  "Buenos Aires",
  "Berlin",
  "Bali",
];
