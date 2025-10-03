import React from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { ArrowLeft, Shield, AlertTriangle, CheckCircle, Phone, Users, MapPin } from "lucide-react";

interface SafetyGuidelinesProps {
  onBack: () => void;
  onSignupClick?: () => void;
}

const safetyTips = [
  {
    icon: <CheckCircle className="w-5 h-5" />,
    title: "Research Your Destination",
    description: "Always research the hostel, location, and local customs before arriving. Check reviews and ratings from other volunteers."
  },
  {
    icon: <Shield className="w-5 h-5" />,
    title: "Verify Hostel Legitimacy", 
    description: "Ensure the hostel is registered and has proper licenses. Ask for official documentation and contact details."
  },
  {
    icon: <Users className="w-5 h-5" />,
    title: "Trust Your Instincts",
    description: "If something feels wrong or unsafe, trust your gut feeling. You can always leave if you're uncomfortable."
  },
  {
    icon: <Phone className="w-5 h-5" />,
    title: "Stay Connected",
    description: "Keep regular contact with family/friends. Share your location and hostel details with trusted contacts."
  },
  {
    icon: <MapPin className="w-5 h-5" />,
    title: "Know Your Rights",
    description: "Understand local labor laws and your rights as a volunteer. Work should never exceed agreed hours or involve dangerous tasks."
  },
  {
    icon: <AlertTriangle className="w-5 h-5" />,
    title: "Emergency Preparedness",
    description: "Have emergency contacts, know local emergency numbers, and keep important documents secure and accessible."
  }
];

const redFlags = [
  "Requests for upfront payment or fees",
  "Unclear or excessive work expectations",
  "Poor accommodation conditions",
  "Lack of proper documentation or licenses",
  "Isolation from other volunteers or locals",
  "Pressure to stay longer than agreed",
  "Unsafe working conditions or environments",
  "No clear contact person or management"
];

export function SafetyGuidelines({ onBack, onSignupClick }: SafetyGuidelinesProps) {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" onClick={onBack}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <Users className="w-5 h-5 text-primary-foreground" />
                </div>
                <span className="text-xl">Hosteling</span>
              </div>
            </div>
            {onSignupClick && (
              <Button 
                onClick={onSignupClick}
                className="bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white"
              >
                Get Started
              </Button>
            )}
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg flex items-center justify-center mx-auto mb-6">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl mb-4">Safety Guidelines</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Your safety is our priority. Follow these guidelines to ensure a positive and secure volunteering experience.
          </p>
        </div>

        {/* Safety Tips */}
        <section className="mb-12">
          <h2 className="text-2xl mb-6">Essential Safety Tips</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {safetyTips.map((tip, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0 text-primary">
                      {tip.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">{tip.title}</h3>
                      <p className="text-sm text-muted-foreground">{tip.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Red Flags */}
        <section className="mb-12">
          <Card className="border-red-200 dark:border-red-800">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-red-600 dark:text-red-400">
                <AlertTriangle className="w-5 h-5" />
                <span>Red Flags to Watch Out For</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-muted-foreground mb-4">
                Be aware of these warning signs that may indicate an unsafe or illegitimate opportunity:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {redFlags.map((flag, index) => (
                  <div key={index} className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-sm">{flag}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Emergency Contacts */}
        <section className="mb-12">
          <Card className="border-blue-200 dark:border-blue-800">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-blue-600 dark:text-blue-400">
                <Phone className="w-5 h-5" />
                <span>Emergency Information</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Before You Travel</h4>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <p>• Research local emergency numbers for your destination</p>
                  <p>• Register with your embassy or consulate if traveling internationally</p>
                  <p>• Ensure you have travel insurance that covers volunteering activities</p>
                  <p>• Share your itinerary with trusted contacts back home</p>
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold mb-2">Universal Emergency Numbers</h4>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                  <div className="space-y-1">
                    <p className="font-medium">Europe (EU)</p>
                    <p className="text-muted-foreground">112</p>
                  </div>
                  <div className="space-y-1">
                    <p className="font-medium">North America</p>
                    <p className="text-muted-foreground">911</p>
                  </div>
                  <div className="space-y-1">
                    <p className="font-medium">Australia/NZ</p>
                    <p className="text-muted-foreground">000 / 111</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Reporting */}
        <section className="mb-12">
          <Card>
            <CardHeader>
              <CardTitle>Report Safety Concerns</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                If you encounter any safety issues or have concerns about a hostel or situation, please report it immediately. 
                Your reports help keep the entire community safe.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button className="bg-red-600 hover:bg-red-700">
                  <AlertTriangle className="w-4 h-4 mr-2" />
                  Report Emergency
                </Button>
                <Button variant="outline">
                  Report Safety Concern
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* CTA */}
        {onSignupClick && (
          <section className="text-center">
            <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 border-0">
              <CardContent className="p-8">
                <h3 className="text-xl mb-4">Ready to Start Your Safe Journey?</h3>
                <p className="text-muted-foreground mb-6">
                  Join thousands of volunteers who travel safely and responsibly with Hosteling.
                </p>
                <Button 
                  size="lg"
                  onClick={onSignupClick}
                  className="bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white"
                >
                  Start Volunteering Safely
                </Button>
              </CardContent>
            </Card>
          </section>
        )}
      </div>
    </div>
  );
}