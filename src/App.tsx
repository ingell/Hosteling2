import React, { useState, useEffect } from "react";
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
import { Card, CardContent } from "./components/ui/card";
import { Badge } from "./components/ui/badge";
import { ImageWithFallback } from "./components/figma/ImageWithFallback";
import { SignupChoice } from "./components/signup-choice";
import { SignupFlow } from "./components/signup-flow";
import { HostelSignupFlow } from "./components/hostel-signup-flow";
import { HowItWorks } from "./components/how-it-works";
import { ForHostels } from "./components/for-hostels";
import { LoggedInView } from "./components/logged-in-view";
import { LocalStorageManager } from "./components/utils/local-storage";
import { Search, MapPin, Users, Heart, Clock, Globe } from "lucide-react";
import { motion } from "motion/react";

const featuredHostels = [
  {
    id: 1,
    name: "Nomad's Paradise",
    location: "Bangkok, Thailand",
    image: "https://images.unsplash.com/photo-1549872178-96db16a53ca8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2JpbGUlMjBhcHAlMjBpbnRlcmZhY2V8ZW58MXx8fHwxNzU4NjQ5MjQ3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    volunteersNeeded: 3,
    commitment: "2-4 weeks",
    tasks: ["Reception", "Cleaning", "Events"],
    rating: 4.8
  },
  {
    id: 2,
    name: "Surf & Stay Hostel",
    location: "Lisbon, Portugal",
    image: "https://images.unsplash.com/photo-1709805619372-40de3f158e83?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3N0ZWwlMjBhY2NvbW1vZGF0aW9uJTIwdHJhdmVsfGVufDF8fHx8MTc1ODg4NTU5NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    volunteersNeeded: 2,
    commitment: "3-6 weeks",
    tasks: ["Maintenance", "Tours", "Bar Help"],
    rating: 4.9
  },
  {
    id: 3,
    name: "Mountain View Lodge",
    location: "Cusco, Peru",
    image: "https://images.unsplash.com/photo-1706823871410-ed8b01faef7e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b3JsZCUyMG1hcCUyMHRyYXZlbCUyMGRlc3RpbmF0aW9uc3xlbnwxfHx8fDE3NTg3OTcwNDJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    volunteersNeeded: 4,
    commitment: "4-8 weeks",
    tasks: ["Kitchen", "Housekeeping", "Social Media"],
    rating: 4.7
  }
];

const benefits = [
  {
    icon: <Heart className="w-6 h-6" />,
    title: "100% Free",
    description: "No booking fees or commissions. Connect directly with hostels at zero cost."
  },
  {
    icon: <Globe className="w-6 h-6" />,
    title: "Global Network",
    description: "Access opportunities in over 50 countries across 6 continents."
  },
  {
    icon: <Users className="w-6 h-6" />,
    title: "Community",
    description: "Join a community of like-minded travelers and make lifelong connections."
  },
  {
    icon: <Clock className="w-6 h-6" />,
    title: "Flexible",
    description: "Choose your commitment length and type of work that suits your travel plans."
  }
];

export default function App() {
  const [searchLocation, setSearchLocation] = useState("");
  const [currentView, setCurrentView] = useState<"landing" | "signup-choice" | "signup" | "hostel-signup" | "how-it-works" | "for-hostels" | "logged-in">("landing");
  const [userType, setUserType] = useState<"volunteer" | "hostel">("volunteer");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState<any>(null);

  // Load user data from localStorage on app start
  useEffect(() => {
    const storedUserData = LocalStorageManager.getUserData();
    if (storedUserData && storedUserData.isLoggedIn) {
      setUserData(storedUserData);
      setUserType(storedUserData.type);
      setIsLoggedIn(true);
      setCurrentView("logged-in");
      
      // Add welcome back notification
      LocalStorageManager.addNotification({
        type: "system",
        title: "Welcome back!",
        message: `Welcome back to VolunteerStay, ${storedUserData.type === 'volunteer' 
          ? storedUserData.profile.firstName 
          : storedUserData.profile.contactFirstName}!`,
        priority: "low"
      });
    }
  }, []);

  const handleSignupComplete = (data: any, type: "volunteer" | "hostel") => {
    console.log("Signup completed:", data);
    
    // Create user data object for localStorage
    const newUserData = {
      id: Date.now().toString(),
      type,
      isLoggedIn: true,
      profile: data,
      savedItems: [],
      applications: [],
      messages: [],
      notifications: []
    };

    // Save to localStorage
    LocalStorageManager.saveUserData(newUserData);
    
    // Add welcome notification
    LocalStorageManager.addNotification({
      type: "system",
      title: "Welcome to VolunteerStay!",
      message: `Your ${type} account has been created successfully. Start exploring opportunities!`,
      priority: "high"
    });

    setUserData(newUserData);
    setUserType(type);
    setIsLoggedIn(true);
    setCurrentView("logged-in");
  };

  const handleLogin = (type: "volunteer" | "hostel") => {
    // For demo purposes, create a mock logged-in user
    const mockUserData = {
      id: "demo_" + Date.now(),
      type,
      isLoggedIn: true,
      profile: type === 'volunteer' ? {
        firstName: "Demo",
        lastName: "User",
        email: "demo@email.com",
        country: "United States",
        city: "San Francisco",
        skills: ["Reception", "Social Media"],
        languages: ["English"],
        experience: "Intermediate",
        bio: "Demo volunteer user"
      } : {
        hostelName: "Demo Hostel",
        contactFirstName: "Demo",
        contactLastName: "Manager",
        email: "demo@hostel.com",
        country: "Thailand",
        city: "Bangkok",
        description: "Demo hostel for testing"
      },
      savedItems: [],
      applications: [],
      messages: [],
      notifications: []
    };

    LocalStorageManager.saveUserData(mockUserData);
    LocalStorageManager.addNotification({
      type: "system", 
      title: "Demo Login",
      message: "You're logged in as a demo user. Sign up to save your data permanently!",
      priority: "medium"
    });

    setUserData(mockUserData);
    setUserType(type);
    setIsLoggedIn(true);
    setCurrentView("logged-in");
  };

  const handleLogout = () => {
    LocalStorageManager.clearUserData();
    setUserData(null);
    setIsLoggedIn(false);
    setCurrentView("landing");
  };

  if (currentView === "logged-in") {
    return (
      <LoggedInView 
        userType={userType}
        onLogout={handleLogout}
      />
    );
  }

  if (currentView === "signup-choice") {
    return (
      <SignupChoice 
        onChoice={(type) => {
          if (type === 'volunteer') {
            setCurrentView("signup");
          } else {
            setCurrentView("hostel-signup");
          }
        }}
        onBack={() => setCurrentView("landing")}
      />
    );
  }

  if (currentView === "signup") {
    return (
      <SignupFlow 
        onComplete={(data) => handleSignupComplete(data, "volunteer")}
        onBack={() => setCurrentView("signup-choice")}
      />
    );
  }

  if (currentView === "hostel-signup") {
    return (
      <HostelSignupFlow 
        onComplete={(data) => handleSignupComplete(data, "hostel")}
        onBack={() => setCurrentView("signup-choice")}
      />
    );
  }

  if (currentView === "how-it-works") {
    return (
      <div>
        <header className="border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center space-x-2 cursor-pointer" onClick={() => setCurrentView("landing")}>
                <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-lg flex items-center justify-center">
                  <Users className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl">VolunteerStay</span>
              </div>
              <nav className="hidden md:flex space-x-8">
                <Button variant="ghost" onClick={() => setCurrentView("how-it-works")}>How it works</Button>
                <Button variant="ghost" onClick={() => setCurrentView("for-hostels")}>For Hostels</Button>
                <Button variant="ghost">Login</Button>
                <Button 
                  onClick={() => setCurrentView("signup-choice")}
                  className="bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white"
                >
                  Sign up
                </Button>
              </nav>
            </div>
          </div>
        </header>
        <HowItWorks onSignupClick={() => setCurrentView("signup-choice")} />
      </div>
    );
  }

  if (currentView === "for-hostels") {
    return (
      <div>
        <header className="border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center space-x-2 cursor-pointer" onClick={() => setCurrentView("landing")}>
                <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-lg flex items-center justify-center">
                  <Users className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl">VolunteerStay</span>
              </div>
              <nav className="hidden md:flex space-x-8">
                <Button variant="ghost" onClick={() => setCurrentView("how-it-works")}>How it works</Button>
                <Button variant="ghost" onClick={() => setCurrentView("for-hostels")}>For Hostels</Button>
                <Button variant="ghost">Login</Button>
                <Button 
                  onClick={() => setCurrentView("signup-choice")}
                  className="bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white"
                >
                  Sign up
                </Button>
              </nav>
            </div>
          </div>
        </header>
        <ForHostels onSignupClick={() => setCurrentView("signup-choice")} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-lg flex items-center justify-center">
                <Users className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl">VolunteerStay</span>
            </div>
            <nav className="hidden md:flex space-x-8">
              <Button variant="ghost" onClick={() => setCurrentView("how-it-works")}>How it works</Button>
              <Button variant="ghost" onClick={() => setCurrentView("for-hostels")}>For Hostels</Button>
              <Button variant="ghost" onClick={() => handleLogin("volunteer")}>Login</Button>
              <Button 
                onClick={() => setCurrentView("signup-choice")}
                className="bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white"
              >
                Sign up
              </Button>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 px-4 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <h1 className="text-4xl md:text-6xl max-w-4xl mx-auto">
                Volunteer at hostels worldwide.
                <span className="text-primary"> Stay for free.</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Connect with hostels around the globe, contribute your skills, and explore the world without breaking the bank. 100% free platform.
              </p>
            </div>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <div className="flex flex-col sm:flex-row gap-4 p-4 bg-background rounded-lg shadow-lg">
                <div className="relative flex-1">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                  <Input
                    placeholder="Where do you want to volunteer?"
                    value={searchLocation}
                    onChange={(e) => setSearchLocation(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Button size="lg" className="px-8">
                  <Search className="w-5 h-5 mr-2" />
                  Search
                </Button>
              </div>
            </div>

            <div className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
              <span>Popular: Bangkok</span>
              <span>Lisbon</span>
              <span>Buenos Aires</span>
              <span>Berlin</span>
              <span>Bali</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-4 mb-16">
            <h2>How VolunteerStay works</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Simple, free, and direct. No middleman, no fees, just authentic connections between travelers and hostels.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center space-y-4"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto text-primary">
                  {benefit.icon}
                </div>
                <h3>{benefit.title}</h3>
                <p className="text-muted-foreground">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Opportunities */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-4 mb-16">
            <h2>Featured volunteer opportunities</h2>
            <p className="text-muted-foreground">
              Start your journey with these amazing hostels looking for volunteers right now.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredHostels.map((hostel, index) => (
              <motion.div
                key={hostel.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="group hover:shadow-lg transition-all duration-300 overflow-hidden">
                  <div className="aspect-[4/3] overflow-hidden">
                    <ImageWithFallback
                      src={hostel.image}
                      alt={hostel.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <CardContent className="p-6 space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <h3>{hostel.name}</h3>
                        <div className="flex items-center space-x-1">
                          <span className="text-sm">⭐</span>
                          <span className="text-sm">{hostel.rating}</span>
                        </div>
                      </div>
                      <p className="text-muted-foreground flex items-center">
                        <MapPin className="w-4 h-4 mr-1" />
                        {hostel.location}
                      </p>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Volunteers needed:</span>
                        <Badge variant="secondary">{hostel.volunteersNeeded}</Badge>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Commitment:</span>
                        <span>{hostel.commitment}</span>
                      </div>
                      <div className="space-y-2">
                        <span className="text-sm text-muted-foreground">Tasks:</span>
                        <div className="flex flex-wrap gap-1">
                          {hostel.tasks.map((task, taskIndex) => (
                            <Badge key={taskIndex} variant="outline" className="text-xs">
                              {task}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>

                    <Button className="w-full">Apply now</Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button variant="outline" size="lg">
              View all opportunities
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="space-y-4">
            <h2>Ready to start your volunteer journey?</h2>
            <p className="text-muted-foreground">
              Join thousands of travelers who have discovered the world through volunteering. 
              Create your profile today and start connecting with hostels.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="px-8 bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white" 
              onClick={() => setCurrentView("signup-choice")}
            >
              Get Started
            </Button>
            <Button variant="outline" size="lg" className="px-8 border-orange-200 text-orange-600 hover:bg-orange-50">
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <Users className="w-5 h-5 text-primary-foreground" />
                </div>
                <span className="text-lg">VolunteerStay</span>
              </div>
              <p className="text-muted-foreground text-sm">
                Connecting volunteers with hostels worldwide. Travel more, spend less.
              </p>
            </div>
            <div className="space-y-4">
              <h4>For Volunteers</h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div>How it works</div>
                <div>Browse opportunities</div>
                <div>Safety guidelines</div>
                <div>Community</div>
              </div>
            </div>
            <div className="space-y-4">
              <h4>For Hostels</h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div>List your hostel</div>
                <div>Find volunteers</div>
                <div>Pricing</div>
                <div>Resources</div>
              </div>
            </div>
            <div className="space-y-4">
              <h4>Support</h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div>Help center</div>
                <div>Contact us</div>
                <div>Terms of service</div>
                <div>Privacy policy</div>
              </div>
            </div>
          </div>
          <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
            © 2024 VolunteerStay. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}