import React from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Users, Building2, MapPin, Heart, Globe, ArrowRight, CheckCircle } from "lucide-react";
import { motion } from "motion/react";

interface SignupChoiceProps {
  onChoice: (type: 'volunteer' | 'hostel') => void;
  onBack: () => void;
}

export function SignupChoice({ onChoice, onBack }: SignupChoiceProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-yellow-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <Button variant="ghost" onClick={onBack} className="mb-6">
            ← Back to Home
          </Button>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-orange-600 to-yellow-600 bg-clip-text text-transparent">
              Join Hosteling
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Choose how you'd like to get started with the world's leading volunteer accommodation platform
            </p>
          </motion.div>
        </div>

        {/* Choice Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Volunteer Card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="relative overflow-hidden hover:shadow-xl transition-all duration-300 border-2 hover:border-orange-200 group cursor-pointer h-full"
                  onClick={() => onChoice('volunteer')}>
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-yellow-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <CardHeader className="text-center pb-4">
                <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-full flex items-center justify-center">
                  <Users className="w-10 h-10 text-white" />
                </div>
                <CardTitle className="text-2xl mb-2">I'm a Volunteer</CardTitle>
                <p className="text-muted-foreground">
                  Find amazing hostels worldwide and exchange work for accommodation
                </p>
              </CardHeader>

              <CardContent className="space-y-6">
                {/* Hero Image */}
                <div className="relative rounded-lg overflow-hidden">
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400&h=200&fit=crop"
                    alt="Volunteers traveling"
                    className="w-full h-40 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                  <Badge className="absolute top-3 left-3 bg-orange-500 hover:bg-orange-600">
                    Free to Join
                  </Badge>
                </div>

                {/* Benefits */}
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-orange-500 flex-shrink-0" />
                    <span className="text-sm">Browse thousands of hostels worldwide</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-orange-500 flex-shrink-0" />
                    <span className="text-sm">Work 4-6 hours for free accommodation</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-orange-500 flex-shrink-0" />
                    <span className="text-sm">Connect with fellow travelers</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-orange-500 flex-shrink-0" />
                    <span className="text-sm">Build your travel portfolio</span>
                  </div>
                </div>

                <Button 
                  className="w-full bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white"
                  onClick={() => onChoice('volunteer')}
                >
                  Start as Volunteer
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          {/* Hostel Card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Card className="relative overflow-hidden hover:shadow-xl transition-all duration-300 border-2 hover:border-orange-200 group cursor-pointer h-full"
                  onClick={() => onChoice('hostel')}>
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-yellow-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <CardHeader className="text-center pb-4">
                <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-full flex items-center justify-center">
                  <Building2 className="w-10 h-10 text-white" />
                </div>
                <CardTitle className="text-2xl mb-2">I own a Hostel</CardTitle>
                <p className="text-muted-foreground">
                  Find skilled volunteers to help grow your hostel business
                </p>
              </CardHeader>

              <CardContent className="space-y-6">
                {/* Hero Image */}
                <div className="relative rounded-lg overflow-hidden">
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=400&h=200&fit=crop"
                    alt="Beautiful hostel"
                    className="w-full h-40 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                  <Badge className="absolute top-3 left-3 bg-orange-500 hover:bg-orange-600">
                    Better than Paid Platforms
                  </Badge>
                </div>

                {/* Benefits */}
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-orange-500 flex-shrink-0" />
                    <span className="text-sm">Access to skilled volunteers globally</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-orange-500 flex-shrink-0" />
                    <span className="text-sm">No expensive platform fees</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-orange-500 flex-shrink-0" />
                    <span className="text-sm">Verified volunteer profiles</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-orange-500 flex-shrink-0" />
                    <span className="text-sm">Direct communication tools</span>
                  </div>
                </div>

                <Button 
                  className="w-full bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white"
                  onClick={() => onChoice('hostel')}
                >
                  Start as Hostel
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center mt-12"
        >
          <div className="flex items-center justify-center space-x-8 text-sm text-muted-foreground">
            <div className="flex items-center space-x-2">
              <Globe className="w-4 h-4 text-orange-500" />
              <span>190+ Countries</span>
            </div>
            <div className="flex items-center space-x-2">
              <Heart className="w-4 h-4 text-orange-500" />
              <span>50,000+ Happy Users</span>
            </div>
            <div className="flex items-center space-x-2">
              <MapPin className="w-4 h-4 text-orange-500" />
              <span>5,000+ Hostels</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}