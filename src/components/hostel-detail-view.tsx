import React from "react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { 
  MapPin, 
  ArrowLeft, 
  Clock, 
  Users, 
  Calendar,
  Wifi,
  Coffee,
  Car,
  Utensils,
  Bed,
  Shield,
  Star,
  MessageCircle,
  Heart,
  Share2
} from "lucide-react";
import { motion } from "motion/react";

interface HostelDetailViewProps {
  hostel: any;
  onBack: () => void;
  onApply: (hostelId: string) => void;
  onContact: (hostelId: string) => void;
  userType: 'volunteer' | 'hostel';
}

export function HostelDetailView({ hostel, onBack, onApply, onContact, userType }: HostelDetailViewProps) {
  if (!hostel) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-yellow-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Hostel not found</h2>
          <Button onClick={onBack} variant="outline">
            ← Go Back
          </Button>
        </div>
      </div>
    );
  }

  // Standard amenities list
  const amenities = [
    { icon: <Wifi className="w-4 h-4" />, name: "Free WiFi" },
    { icon: <Coffee className="w-4 h-4" />, name: "Kitchen Access" },
    { icon: <Car className="w-4 h-4" />, name: "Parking" },
    { icon: <Utensils className="w-4 h-4" />, name: "Meals Included" },
    { icon: <Bed className="w-4 h-4" />, name: "Private Room" },
    { icon: <Shield className="w-4 h-4" />, name: "24/7 Security" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-yellow-50">
      {/* Header */}
      <div className="bg-white border-b sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Button variant="ghost" onClick={onBack} className="flex items-center space-x-2">
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Browse</span>
            </Button>
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="sm">
                <Share2 className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <Heart className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Hero Image */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="relative rounded-2xl overflow-hidden"
            >
              <ImageWithFallback
                src={hostel.image}
                alt={hostel.name}
                className="w-full h-80 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 text-white">
                <div className="flex items-center space-x-2 mb-2">
                  <Star className="w-5 h-5 text-yellow-400 fill-current" />
                  <span className="font-semibold">{hostel.rating}</span>
                  <span className="text-white/80">• 127 reviews</span>
                </div>
                <h1 className="text-3xl font-bold mb-2">{hostel.name}</h1>
                <div className="flex items-center space-x-2 text-white/90">
                  <MapPin className="w-4 h-4" />
                  <span>{hostel.location}</span>
                </div>
              </div>
            </motion.div>

            {/* Description */}
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
                        {hostel.tasks?.map((task: string, index: number) => (
                          <div key={index} className="flex items-center space-x-2 text-sm">
                            <div className="w-2 h-2 bg-orange-500 rounded-full" />
                            <span>{task}</span>
                          </div>
                        )) || [
                          "Reception and guest check-in/out",
                          "Cleaning and maintenance tasks", 
                          "Social media and marketing support",
                          "Event coordination and guest activities"
                        ].map((task, index) => (
                          <div key={index} className="flex items-center space-x-2 text-sm">
                            <div className="w-2 h-2 bg-orange-500 rounded-full" />
                            <span>{task}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-3">
                      <h4 className="font-semibold">What we offer:</h4>
                      <div className="space-y-2 text-sm">
                        <div>• Free accommodation in shared dorm</div>
                        <div>• Breakfast and one meal per day</div>
                        <div>• Free WiFi and laundry</div>
                        <div>• Local area orientation</div>
                        <div>• Certificate of completion</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Amenities */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>Amenities & Features</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {amenities.map((amenity, index) => (
                      <div key={index} className="flex items-center space-x-3 p-3 rounded-lg bg-orange-50 border border-orange-100">
                        <div className="text-orange-600">{amenity.icon}</div>
                        <span className="text-sm font-medium">{amenity.name}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Requirements */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>Requirements</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold mb-2">Skills needed:</h4>
                      <div className="flex flex-wrap gap-2">
                        {(hostel.skillsNeeded || ['English speaking', 'Customer service', 'Teamwork', 'Flexibility']).map((skill: string, index: number) => (
                          <Badge key={index} variant="secondary" className="bg-orange-100 text-orange-700 border-orange-200">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Other requirements:</h4>
                      <div className="space-y-1 text-sm text-muted-foreground">
                        <div>• Minimum age: 18 years</div>
                        <div>• Minimum commitment: {hostel.commitment || '2 weeks'}</div>
                        <div>• Basic English required</div>
                        <div>• Travel insurance recommended</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Application Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Card className="sticky top-24">
                <CardHeader>
                  <CardTitle>Apply Now</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center space-x-2 text-muted-foreground">
                        <Users className="w-4 h-4" />
                        <span>Volunteers needed:</span>
                      </div>
                      <Badge variant="secondary">{hostel.volunteersNeeded || '2-3'}</Badge>
                    </div>
                    
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center space-x-2 text-muted-foreground">
                        <Calendar className="w-4 h-4" />
                        <span>Commitment:</span>
                      </div>
                      <span className="font-medium">{hostel.commitment || '2-4 weeks'}</span>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center space-x-2 text-muted-foreground">
                        <Clock className="w-4 h-4" />
                        <span>Hours per day:</span>
                      </div>
                      <span className="font-medium">4-6 hours</span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Button 
                      className="w-full bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white"
                      onClick={() => onApply(hostel.id)}
                      disabled={userType === 'hostel'}
                    >
                      {userType === 'hostel' ? 'Cannot Apply (Hostel Account)' : 'Apply Now'}
                    </Button>
                    <Button 
                      variant="outline" 
                      className="w-full border-orange-200 text-orange-600 hover:bg-orange-50"
                      onClick={() => onContact(hostel.id)}
                    >
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Send Message
                    </Button>
                  </div>

                  <div className="pt-4 border-t text-center">
                    <p className="text-xs text-muted-foreground">
                      By applying, you agree to our{" "}
                      <Button variant="link" className="p-0 h-auto text-xs underline">
                        Terms & Conditions
                      </Button>
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Host Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>Your Host</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-semibold">
                        {hostel.hostName?.[0] || hostel.name[0]}
                      </span>
                    </div>
                    <div>
                      <div className="font-semibold">{hostel.hostName || `${hostel.name} Team`}</div>
                      <div className="text-sm text-muted-foreground">Hostel Manager</div>
                    </div>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    <div>• Member since 2020</div>
                    <div>• Response time: &lt; 24 hours</div>
                    <div>• 98% response rate</div>
                  </div>
                  <Button variant="outline" size="sm" className="w-full">
                    View Host Profile
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}