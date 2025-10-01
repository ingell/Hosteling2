import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Star, MessageCircle, Shield, Clock, TrendingUp } from "lucide-react";
import { motion } from "motion/react";

interface HostelHostInfoProps {
  hostel: {
    id: string;
    name: string;
    hostName?: string;
    hostAvatar?: string;
    hostRating?: number;
    hostExperience?: string;
    responseTime?: string;
    responseRate?: number;
    memberSince?: string;
    totalVolunteers?: number;
    verified?: boolean;
  };
  onViewProfile?: (hostId: string) => void;
  onContact: (hostelId: string) => void;
}

export function HostelHostInfo({ hostel, onViewProfile, onContact }: HostelHostInfoProps) {
  const hostName = hostel.hostName || `${hostel.name} Team`;
  const hostRating = hostel.hostRating || 4.8;
  const responseTime = hostel.responseTime || "< 24 hours";
  const responseRate = hostel.responseRate || 98;
  const memberSince = hostel.memberSince || "2020";
  const totalVolunteers = hostel.totalVolunteers || 156;

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.1 }}
    >
      <Card>
        <CardHeader>
          <CardTitle>Your Host</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Host Profile */}
          <div className="flex items-center space-x-4">
            <div className="relative">
              {hostel.hostAvatar ? (
                <img 
                  src={hostel.hostAvatar} 
                  alt={hostName}
                  className="w-16 h-16 rounded-full object-cover"
                />
              ) : (
                <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-semibold text-lg">
                    {hostName[0]}
                  </span>
                </div>
              )}
              {hostel.verified && (
                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                  <Shield className="w-3 h-3 text-white" />
                </div>
              )}
            </div>
            
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-1">
                <h4 className="font-semibold">{hostName}</h4>
                {hostel.verified && (
                  <Badge variant="secondary" className="bg-blue-100 text-blue-700 text-xs">
                    Verified
                  </Badge>
                )}
              </div>
              <div className="text-sm text-muted-foreground">Hostel Manager</div>
              <div className="flex items-center space-x-1 mt-1">
                <Star className="w-4 h-4 text-yellow-400 fill-current" />
                <span className="text-sm font-medium">{hostRating}</span>
                <span className="text-xs text-muted-foreground">host rating</span>
              </div>
            </div>
          </div>

          {/* Host Stats */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-green-50 rounded-lg p-3 border border-green-200">
              <div className="flex items-center space-x-2 mb-1">
                <Clock className="w-4 h-4 text-green-600" />
                <span className="text-sm font-medium text-green-800">Response</span>
              </div>
              <div className="text-xs text-green-700">
                <div>{responseTime}</div>
                <div>{responseRate}% rate</div>
              </div>
            </div>
            
            <div className="bg-blue-50 rounded-lg p-3 border border-blue-200">
              <div className="flex items-center space-x-2 mb-1">
                <TrendingUp className="w-4 h-4 text-blue-600" />
                <span className="text-sm font-medium text-blue-800">Experience</span>
              </div>
              <div className="text-xs text-blue-700">
                <div>Since {memberSince}</div>
                <div>{totalVolunteers} volunteers</div>
              </div>
            </div>
          </div>

          {/* Host Details */}
          <div className="space-y-3 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Languages:</span>
              <div className="flex space-x-1">
                <Badge variant="outline" className="text-xs">English</Badge>
                <Badge variant="outline" className="text-xs">Local</Badge>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Hosting since:</span>
              <span className="font-medium">{memberSince}</span>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Total volunteers:</span>
              <span className="font-medium">{totalVolunteers}+</span>
            </div>
          </div>

          {/* Host Reviews Preview */}
          <div className="bg-gray-50 rounded-lg p-3 border">
            <div className="text-sm font-medium mb-2">What volunteers say:</div>
            <div className="text-xs text-muted-foreground space-y-1">
              <div>"Amazing support and clear communication" - Sarah</div>
              <div>"Made me feel welcome from day one" - Marco</div>
              <div>"Great orientation and ongoing help" - Emma</div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-2">
            <Button 
              variant="outline" 
              size="sm" 
              className="w-full"
              onClick={() => onViewProfile?.(hostel.id)}
            >
              View Host Profile
            </Button>
            
            <Button 
              variant="ghost" 
              size="sm" 
              className="w-full text-orange-600 hover:bg-orange-50"
              onClick={() => onContact(hostel.id)}
            >
              <MessageCircle className="w-4 h-4 mr-2" />
              Send Message
            </Button>
          </div>

          {/* Safety Note */}
          <div className="bg-amber-50 rounded-lg p-3 border border-amber-200">
            <div className="flex items-center space-x-2 mb-1">
              <Shield className="w-4 h-4 text-amber-600" />
              <span className="text-sm font-medium text-amber-800">Safety First</span>
            </div>
            <div className="text-xs text-amber-700">
              All hosts are verified and reviewed by our community. Report any concerns to our support team.
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}