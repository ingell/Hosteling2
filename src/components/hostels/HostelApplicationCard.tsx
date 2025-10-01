import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Users, Calendar, Clock, MessageCircle, Send, Heart } from "lucide-react";
import { motion } from "motion/react";

interface HostelApplicationCardProps {
  hostel: {
    id: string;
    volunteersNeeded?: string;
    commitment?: string;
    workHours?: string;
    urgentHiring?: boolean;
  };
  onApply: (hostelId: string) => void;
  onContact: (hostelId: string) => void;
  onSaveToFavorites?: (hostelId: string) => void;
  userType: 'volunteer' | 'hostel';
  isFavorited?: boolean;
  isApplied?: boolean;
}

export function HostelApplicationCard({ 
  hostel, 
  onApply, 
  onContact,
  onSaveToFavorites,
  userType,
  isFavorited = false,
  isApplied = false
}: HostelApplicationCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
    >
      <Card className="sticky top-24">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Apply Now</CardTitle>
            {hostel.urgentHiring && (
              <Badge variant="destructive" className="animate-pulse">
                Urgent
              </Badge>
            )}
          </div>
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
              <span className="font-medium">{hostel.workHours || '4-6 hours'}</span>
            </div>
          </div>

          {/* Quick Application Stats */}
          <div className="bg-blue-50 rounded-lg p-3 space-y-2">
            <div className="text-sm font-medium text-blue-900">Application Status</div>
            <div className="grid grid-cols-2 gap-2 text-xs text-blue-700">
              <div>• Response time: &lt; 24hrs</div>
              <div>• Acceptance rate: 85%</div>
            </div>
          </div>

          <div className="space-y-3">
            {userType === 'volunteer' ? (
              <>
                <Button 
                  className={`w-full ${
                    isApplied 
                      ? 'bg-green-600 hover:bg-green-700' 
                      : 'bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600'
                  } text-white`}
                  onClick={() => onApply(hostel.id)}
                  disabled={isApplied}
                >
                  {isApplied ? (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      Application Sent
                    </>
                  ) : (
                    'Apply Now'
                  )}
                </Button>
                
                <div className="grid grid-cols-2 gap-2">
                  <Button 
                    variant="outline" 
                    className="border-orange-200 text-orange-600 hover:bg-orange-50"
                    onClick={() => onContact(hostel.id)}
                  >
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Message
                  </Button>
                  
                  <Button 
                    variant="outline"
                    className={`${
                      isFavorited 
                        ? 'border-red-200 text-red-600 hover:bg-red-50' 
                        : 'border-gray-200 text-gray-600 hover:bg-gray-50'
                    }`}
                    onClick={() => onSaveToFavorites?.(hostel.id)}
                  >
                    <Heart className={`w-4 h-4 mr-2 ${isFavorited ? 'fill-current' : ''}`} />
                    {isFavorited ? 'Saved' : 'Save'}
                  </Button>
                </div>
              </>
            ) : (
              <div className="text-center">
                <Badge variant="secondary" className="mb-3">
                  Hostel Account
                </Badge>
                <p className="text-sm text-muted-foreground mb-4">
                  Switch to a volunteer account to apply for positions
                </p>
                <Button 
                  variant="outline" 
                  className="w-full border-orange-200 text-orange-600 hover:bg-orange-50"
                  onClick={() => onContact(hostel.id)}
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Contact Hostel
                </Button>
              </div>
            )}
          </div>

          {/* Application Tips */}
          {userType === 'volunteer' && !isApplied && (
            <div className="bg-amber-50 rounded-lg p-3 space-y-2 border border-amber-200">
              <div className="text-sm font-medium text-amber-900">Application Tips</div>
              <div className="text-xs text-amber-700 space-y-1">
                <div>• Complete your profile for better chances</div>
                <div>• Mention relevant experience</div>
                <div>• Be specific about your availability</div>
                <div>• Show enthusiasm for the location</div>
              </div>
            </div>
          )}

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
  );
}