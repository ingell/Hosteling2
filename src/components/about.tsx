import React from "react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { ArrowLeft, Heart, Globe, Users, Target, Award, Zap } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface AboutProps {
  onBack: () => void;
  onSignupClick?: () => void;
}

const stats = [
  { number: "50+", label: "Countries" },
  { number: "10,000+", label: "Volunteers" },
  { number: "2,500+", label: "Partner Hostels" },
  { number: "100%", label: "Free Platform" }
];

const values = [
  {
    icon: <Heart className="w-8 h-8" />,
    title: "Community First",
    description: "We believe in building genuine connections between travelers and local communities, fostering understanding and friendship across cultures."
  },
  {
    icon: <Globe className="w-8 h-8" />,
    title: "Sustainable Travel",
    description: "By connecting volunteers with hostels, we promote responsible tourism that gives back to local communities and reduces travel costs."
  },
  {
    icon: <Users className="w-8 h-8" />,
    title: "Equal Access",
    description: "Our platform is 100% free, ensuring that financial barriers never prevent someone from exploring the world through volunteering."
  },
  {
    icon: <Target className="w-8 h-8" />,
    title: "Authentic Experiences",
    description: "We facilitate genuine cultural exchange, allowing volunteers to experience destinations like locals while contributing meaningfully."
  }
];

const team = [
  {
    name: "Sarah Johnson",
    role: "Founder & CEO",
    image: "https://images.unsplash.com/photo-1494790108755-2616b612b4d4?w=200&h=200&fit=crop&crop=face",
    bio: "Former backpacker who volunteered at 20+ hostels across 4 continents. Passionate about making travel accessible to everyone."
  },
  {
    name: "Marcus Chen",
    role: "Head of Community",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face",
    bio: "Hostel industry veteran with 15+ years experience. Believes in the power of volunteer programs to transform both travelers and hostels."
  },
  {
    name: "Elena Rodriguez",
    role: "Safety & Trust Director",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face",
    bio: "Travel safety expert and former diplomatic security officer. Ensures our platform maintains the highest safety standards."
  }
];

export function About({ onBack, onSignupClick }: AboutProps) {
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <section className="py-20 text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl mb-6">
              Making travel accessible through 
              <span className="text-primary"> community</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              We're on a mission to connect passionate travelers with amazing hostels worldwide, 
              creating opportunities for authentic cultural exchange while making travel more affordable.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-primary mb-2">{stat.number}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Our Story */}
        <section className="py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl mb-6">Our Story</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Hosteling was born from a simple realization: there are thousands of amazing hostels around the world 
                  that need help, and millions of travelers who want to explore but can't afford expensive accommodation.
                </p>
                <p>
                  After spending years volunteering at hostels across Southeast Asia, South America, and Europe, 
                  our founder Sarah saw how these connections transformed both volunteers and hostel communities. 
                  But finding these opportunities was difficult, scattered across different websites and word-of-mouth networks.
                </p>
                <p>
                  We created Hosteling to solve this problem – a dedicated platform where volunteers and hostels 
                  can find each other easily, safely, and completely free of charge. No booking fees, no commissions, 
                  just genuine connections that benefit everyone involved.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square rounded-2xl overflow-hidden">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=600&h=600&fit=crop"
                  alt="Travelers at a hostel"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-primary rounded-2xl flex items-center justify-center">
                <Heart className="w-12 h-12 text-primary-foreground" />
              </div>
            </div>
          </div>
        </section>

        {/* Our Values */}
        <section className="py-20">
          <div className="text-center mb-16">
            <h2 className="text-3xl mb-4">Our Values</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              These principles guide everything we do and shape the community we're building together.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="p-8 hover:shadow-lg transition-shadow">
                <CardContent className="p-0">
                  <div className="flex items-start space-x-4">
                    <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center text-primary flex-shrink-0">
                      {value.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
                      <p className="text-muted-foreground">{value.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Team */}
        <section className="py-20">
          <div className="text-center mb-16">
            <h2 className="text-3xl mb-4">Meet Our Team</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              A passionate group of travelers, hostel experts, and community builders dedicated to making travel accessible for everyone.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-8">
                  <div className="w-24 h-24 rounded-full overflow-hidden mx-auto mb-4">
                    <ImageWithFallback
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                  <Badge variant="secondary" className="mb-4">{member.role}</Badge>
                  <p className="text-sm text-muted-foreground">{member.bio}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Impact */}
        <section className="py-20">
          <Card className="bg-gradient-to-r from-orange-50 to-yellow-50 dark:from-orange-950/20 dark:to-yellow-950/20 border-0">
            <CardContent className="p-12 text-center">
              <div className="max-w-3xl mx-auto">
                <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-lg flex items-center justify-center mx-auto mb-8">
                  <Award className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-3xl mb-6">Our Impact</h2>
                <p className="text-lg text-muted-foreground mb-8">
                  Since launching, we've facilitated over 25,000 volunteer placements, saved travelers millions in accommodation costs, 
                  and helped thousands of hostels find dedicated volunteers. But more than numbers, we've created a global community 
                  of like-minded travelers who believe in giving back.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div>
                    <div className="text-2xl font-bold text-primary mb-2">$15M+</div>
                    <div className="text-sm text-muted-foreground">Saved by volunteers</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-primary mb-2">180+</div>
                    <div className="text-sm text-muted-foreground">Cities covered</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-primary mb-2">4.9⭐</div>
                    <div className="text-sm text-muted-foreground">Average rating</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* CTA */}
        {onSignupClick && (
          <section className="py-20 text-center">
            <div className="max-w-2xl mx-auto">
              <h2 className="text-3xl mb-4">Join Our Community</h2>
              <p className="text-muted-foreground mb-8">
                Ready to start your volunteer journey? Join thousands of travelers who are exploring the world 
                while making a positive impact on local communities.
              </p>
              <Button 
                size="lg"
                onClick={onSignupClick}
                className="bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white px-8"
              >
                <Zap className="w-4 h-4 mr-2" />
                Get Started Today
              </Button>
            </div>
          </section>
        )}
      </div>

      {/* Footer */}
      <footer className="border-t py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <Users className="w-5 h-5 text-primary-foreground" />
                </div>
                <span className="text-lg">Hosteling</span>
              </div>
              <p className="text-muted-foreground text-sm">
                Connecting volunteers with hostels worldwide. Travel more, spend less.
              </p>
            </div>
            <div className="space-y-4">
              <h4>Company</h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div className="cursor-pointer hover:text-foreground">About Us</div>
                <div className="cursor-pointer hover:text-foreground">Our Team</div>
                <div className="cursor-pointer hover:text-foreground">Careers</div>
                <div className="cursor-pointer hover:text-foreground">Press</div>
              </div>
            </div>
            <div className="space-y-4">
              <h4>Support</h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div className="cursor-pointer hover:text-foreground">Help Center</div>
                <div className="cursor-pointer hover:text-foreground">Contact Us</div>
                <div className="cursor-pointer hover:text-foreground">Community Guidelines</div>
              </div>
            </div>
            <div className="space-y-4">
              <h4>Legal</h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div className="cursor-pointer hover:text-foreground">Terms of Service</div>
                <div className="cursor-pointer hover:text-foreground">Privacy Policy</div>
              </div>
            </div>
          </div>
          <div className="border-t pt-8 mt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2024 Hosteling. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}