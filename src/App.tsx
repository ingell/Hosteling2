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
import { LoginFlow } from "./components/login-flow";
import { SearchWithSuggestions } from "./components/search-with-suggestions";
import { HostelDetailView } from "./components/hostel-detail-view";
import { LocalStorageManager } from "./components/utils/local-storage";
import { VolunteerCommunity } from "./components/volunteer-community";
import { SafetyGuidelines } from "./components/safety-guidelines";
import { About } from "./components/about";
import { HelpCenter } from "./components/help-center";
import { Contact } from "./components/contact";
import { Terms } from "./components/terms";
import { Privacy } from "./components/privacy";
import { Search, MapPin, Users, Heart, Clock, Globe } from "lucide-react";
import { motion } from "motion/react";

const featuredHostels = [
  {
    id: 1,
    name: "Nomad's Paradise",
    location: "Bangkok, Thailand",
    image: "https://images.unsplash.com/photo-1549872178-96db16a53ca8?w=400&h=300&fit=crop",
    volunteersNeeded: 3,
    commitment: "2-4 weeks",
    tasks: ["Reception", "Cleaning", "Events"],
    rating: 4.8,
    description: "A vibrant hostel in the heart of Bangkok offering authentic local experiences."
  },
  {
    id: 2,
    name: "Surf & Stay Hostel",
    location: "Lisbon, Portugal",
    image: "https://images.unsplash.com/photo-1709805619372-40de3f158e83?w=400&h=300&fit=crop",
    volunteersNeeded: 2,
    commitment: "3-6 weeks",
    tasks: ["Maintenance", "Tours", "Bar Help"],
    rating: 4.9,
    description: "Beachside hostel perfect for surf enthusiasts and digital nomads."
  },
  {
    id: 3,
    name: "Mountain View Lodge",
    location: "Cusco, Peru",
    image: "https://images.unsplash.com/photo-1706823871410-ed8b01faef7e?w=400&h=300&fit=crop",
    volunteersNeeded: 4,
    commitment: "4-8 weeks",
    tasks: ["Kitchen", "Housekeeping", "Social Media"],
    rating: 4.7,
    description: "Gateway to Machu Picchu with stunning mountain views and local culture."
  }
];

const benefits = [
  { icon: <Heart className="w-6 h-6" />, title: "100% Free", description: "No booking fees or commissions. Connect directly with hostels at zero cost." },
  { icon: <Globe className="w-6 h-6" />, title: "Global Network", description: "Access opportunities in over 50 countries across 6 continents." },
  { icon: <Users className="w-6 h-6" />, title: "Community", description: "Join a community of like-minded travelers and make lifelong connections." },
  { icon: <Clock className="w-6 h-6" />, title: "Flexible", description: "Choose your commitment length and type of work that suits your travel plans." }
];

export default function App() {
  const [searchLocation, setSearchLocation] = useState("");
  const [currentView, setCurrentView] = useState<"landing" | "signup-choice" | "signup" | "hostel-signup" | "how-it-works" | "for-hostels" | "logged-in" | "login" | "hostel-detail" | "browse" | "volunteer-community" | "safety-guidelines" | "about" | "help-center" | "contact" | "terms" | "privacy">("landing");
  const [userType, setUserType] = useState<"volunteer" | "hostel">("volunteer");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState<any>(null);
  const [selectedHostel, setSelectedHostel] = useState<any>(null);
  const [searchResults, setSearchResults] = useState<any[]>([]);

  // Load user data from localStorage on app start
  useEffect(() => {
    document.title = "Hosteling - Free Volunteer Opportunities at Hostels Worldwide";
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
        message: `Welcome back to Hosteling, ${storedUserData.type === 'volunteer' 
          ? storedUserData.profile.firstName 
          : storedUserData.profile.contactFirstName}!`,
        priority: "low"
      });
    }
  }, []);

  const handleSignupComplete = (data: any, type: "volunteer" | "hostel") => {
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
      title: "Welcome to Hosteling!",
      message: `Your ${type} account has been created successfully. Start exploring opportunities!`,
      priority: "high"
    });

    setUserData(newUserData);
    setUserType(type);
    setIsLoggedIn(true);
    setCurrentView("logged-in");
  };

  const handleLogin = (credentials: { email: string; password: string; type: 'volunteer' | 'hostel' }) => {
    // Check if user exists in localStorage
    const existingUserData = LocalStorageManager.getUserData();
    
    if (existingUserData && 
        existingUserData.profile.email === credentials.email && 
        existingUserData.type === credentials.type) {
      
      // User exists, log them in
      const updatedUserData = { ...existingUserData, isLoggedIn: true };
      LocalStorageManager.saveUserData(updatedUserData);
      
      LocalStorageManager.addNotification({
        type: "system",
        title: "Welcome back!",
        message: `Successfully logged in to your ${credentials.type} account.`,
        priority: "medium"
      });

      setUserData(updatedUserData);
      setUserType(credentials.type);
      setIsLoggedIn(true);
      setCurrentView("logged-in");
    } else {
      // User doesn't exist or wrong credentials
      LocalStorageManager.addNotification({
        type: "error",
        title: "Login Failed",
        message: "Invalid email or password. Please check your credentials or sign up.",
        priority: "high"
      });
    }
  };

  const handleLogout = () => {
    LocalStorageManager.clearUserData();
    setUserData(null);
    setIsLoggedIn(false);
    setCurrentView("landing");
  };

  const handleSearch = (location: string) => {
    // Filter hostels based on search location
    const filtered = featuredHostels.filter(hostel => 
      hostel.location.toLowerCase().includes(location.toLowerCase()) ||
      hostel.name.toLowerCase().includes(location.toLowerCase())
    );
    setSearchResults(filtered);
    setCurrentView("browse");
  };

  const handleHostelClick = (hostel: any) => {
    setSelectedHostel(hostel);
    setCurrentView("hostel-detail");
  };

  const handleApply = (hostelId: string) => {
    if (!isLoggedIn) {
      LocalStorageManager.addNotification({
        type: "warning",
        title: "Please Log In",
        message: "You need to log in to apply for positions.",
        priority: "high"
      });
      setCurrentView("login");
      return;
    }
    
    LocalStorageManager.addNotification({
      type: "success",
      title: "Application Sent!",
      message: "Your application has been sent to the hostel.",
      priority: "high"
    });
  };

  const handleContact = (hostelId: string) => {
    if (!isLoggedIn) {
      LocalStorageManager.addNotification({
        type: "warning",
        title: "Please Log In",
        message: "You need to log in to contact hostels.",
        priority: "high"
      });
      setCurrentView("login");
      return;
    }
    
    LocalStorageManager.addNotification({
      type: "info",
      title: "Message Sent!",
      message: "Your message has been sent to the hostel.",
      priority: "medium"
    });
  };

  if (currentView === "logged-in") {
    return (
      <LoggedInView 
        userType={userType}
        onLogout={handleLogout}
      />
    );
  }

  if (currentView === "login") {
    return (
      <LoginFlow 
        onLogin={handleLogin}
        onBack={() => setCurrentView("landing")}
        onSignupRedirect={() => setCurrentView("signup-choice")}
      />
    );
  }

  if (currentView === "hostel-detail") {
    return (
      <HostelDetailView
        hostel={selectedHostel}
        onBack={() => setCurrentView(searchResults.length > 0 ? "browse" : "landing")}
        onApply={handleApply}
        onContact={handleContact}
        userType={userType}
      />
    );
  }

  if (currentView === "browse") {
    const hostelsToShow = searchResults.length > 0 ? searchResults : featuredHostels;
    
    return (
      <div className="min-h-screen bg-background">
        <header className="border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center space-x-2 cursor-pointer" onClick={() => setCurrentView("landing")}>
                <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-lg flex items-center justify-center">
                  <Users className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl">Hosteling</span>
              </div>
              <nav className="hidden md:flex space-x-8">
                <Button variant="ghost" onClick={() => setCurrentView("how-it-works")}>How it works</Button>
                <Button variant="ghost" onClick={() => setCurrentView("for-hostels")}>For Hostels</Button>
                <Button variant="ghost" onClick={() => setCurrentView("login")}>Login</Button>
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

        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="mb-8">
            <div className="max-w-2xl">
              <SearchWithSuggestions
                value={searchLocation}
                onChange={setSearchLocation}
                onSearch={handleSearch}
              />
            </div>
          </div>

          <div className="space-y-6">
            <h2 className="text-2xl font-bold">
              {searchResults.length > 0 ? `Found ${hostelsToShow.length} opportunities` : 'Featured Opportunities'}
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {hostelsToShow.map((hostel) => (
                <Card key={hostel.id} className="group hover:shadow-lg transition-all duration-300 overflow-hidden cursor-pointer"
                      onClick={() => handleHostelClick(hostel)}>
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
                          {hostel.tasks.map((task: string, taskIndex: number) => (
                            <Badge key={taskIndex} variant="outline" className="text-xs">
                              {task}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
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
                <span className="text-xl">Hosteling</span>
              </div>
              <nav className="hidden md:flex space-x-8">
                <Button variant="ghost" onClick={() => setCurrentView("how-it-works")}>How it works</Button>
                <Button variant="ghost" onClick={() => setCurrentView("for-hostels")}>For Hostels</Button>
                <Button variant="ghost" onClick={() => setCurrentView("login")}>Login</Button>
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
                <span className="text-xl">Hosteling</span>
              </div>
              <nav className="hidden md:flex space-x-8">
                <Button variant="ghost" onClick={() => setCurrentView("how-it-works")}>How it works</Button>
                <Button variant="ghost" onClick={() => setCurrentView("for-hostels")}>For Hostels</Button>
                <Button variant="ghost" onClick={() => setCurrentView("login")}>Login</Button>
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
              <span className="text-xl">Hosteling</span>
            </div>
            <nav className="hidden md:flex space-x-8">
              <Button variant="ghost" onClick={() => setCurrentView("how-it-works")}>How it works</Button>
              <Button variant="ghost" onClick={() => setCurrentView("for-hostels")}>For Hostels</Button>
              <Button variant="ghost" onClick={() => setCurrentView("login")}>Login</Button>
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
              <div className="p-4 bg-background rounded-lg shadow-lg">
                <SearchWithSuggestions
                  value={searchLocation}
                  onChange={setSearchLocation}
                  onSearch={handleSearch}
                />
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
            <h2>How Hosteling works</h2>
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

                    <Button className="w-full" onClick={(e) => { e.stopPropagation(); handleHostelClick(hostel); }}>Apply now</Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button variant="outline" size="lg" onClick={() => setCurrentView("browse")}>
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
            <Button variant="outline" size="lg" className="px-8 border-orange-200 text-orange-600 hover:bg-orange-50" onClick={() => setCurrentView("how-it-works")}>
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
                <span className="text-lg">Hosteling</span>
              </div>
              <p className="text-muted-foreground text-sm">
                Connecting volunteers with hostels worldwide. Travel more, spend less.
              </p>
            </div>
            <div className="space-y-4">
              <h4>For Volunteers</h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div className="cursor-pointer hover:text-foreground" onClick={() => setCurrentView("how-it-works")}>How it works</div>
                <div className="cursor-pointer hover:text-foreground" onClick={() => setCurrentView("browse")}>Browse opportunities</div>
                <div className="cursor-pointer hover:text-foreground">Safety guidelines</div>
                <div className="cursor-pointer hover:text-foreground">Community</div>
              </div>
            </div>
            <div className="space-y-4">
              <h4>For Hostels</h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div className="cursor-pointer hover:text-foreground" onClick={() => setCurrentView("for-hostels")}>List your hostel</div>
                <div className="cursor-pointer hover:text-foreground" onClick={() => setCurrentView("for-hostels")}>Find volunteers</div>
                <div className="cursor-pointer hover:text-foreground">Pricing</div>
                <div className="cursor-pointer hover:text-foreground">Resources</div>
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
            © 2024 Hosteling. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}