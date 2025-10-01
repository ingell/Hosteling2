import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { motion } from "motion/react";

interface HostelDescriptionProps {
  hostel: {
    name: string;
    location: string;
    description?: string;
    tasks?: string[];
  };
}

export function HostelDescription({ hostel }: HostelDescriptionProps) {
  const defaultTasks = [
    "Reception and guest check-in/out",
    "Cleaning and maintenance tasks", 
    "Social media and marketing support",
    "Event coordination and guest activities"
  ];

  const defaultOffers = [
    "Free accommodation in shared dorm",
    "Breakfast and one meal per day",
    "Free WiFi and laundry",
    "Local area orientation",
    "Certificate of completion"
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.1 }}
    >
      <Card>
        <CardHeader>
          <CardTitle>About this opportunity</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground leading-relaxed">
            {hostel.description || `Welcome to ${hostel.name}! We're a vibrant hostel located in the heart of ${hostel.location}, offering an authentic local experience for travelers from around the world. Our team is passionate about creating memorable experiences and we're looking for enthusiastic volunteers to join our community.

We offer a unique opportunity to immerse yourself in the local culture while gaining valuable hospitality experience. You'll work alongside our friendly staff and meet fellow travelers from diverse backgrounds.`}
          </p>

          <div className="grid md:grid-cols-2 gap-4 pt-4">
            <div className="space-y-3">
              <h4 className="font-semibold">What you'll do:</h4>
              <div className="space-y-2">
                {(hostel.tasks || defaultTasks).map((task, index) => (
                  <div key={index} className="flex items-center space-x-2 text-sm">
                    <div className="w-2 h-2 bg-orange-500 rounded-full flex-shrink-0" />
                    <span>{task}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="font-semibold">What we offer:</h4>
              <div className="space-y-2 text-sm">
                {defaultOffers.map((offer, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0" />
                    <span>{offer}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}