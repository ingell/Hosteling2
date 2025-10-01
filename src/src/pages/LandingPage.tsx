import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui/button';
import { Card, CardContent } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { ImageWithFallback } from '../../components/figma/ImageWithFallback';
import { SearchWithSuggestions } from '../../components/common/SearchWithSuggestions';
import { MapPin, Heart, Globe, Users, Clock } from 'lucide-react';
import { motion } from 'motion/react';
import { featuredHostels } from '../../constants/data';
import { useLanguage } from '../contexts/LanguageContext';

const benefits = [
  { icon: <Heart className="w-6 h-6" />, title: "100% Free", description: "No booking fees or commissions. Connect directly with hostels at zero cost." },
  { icon: <Globe className="w-6 h-6" />, title: "Global Network", description: "Access opportunities in over 50 countries across 6 continents." },
  { icon: <Users className="w-6 h-6" />, title: "Community", description: "Join a community of like-minded travelers and make lifelong connections." },
  { icon: <Clock className="w-6 h-6" />, title: "Flexible", description: "Choose your commitment length and type of work that suits your travel plans." }
];

export const LandingPage: React.FC = () => {
  const [searchLocation, setSearchLocation] = useState("");
  const navigate = useNavigate();
  const { t } = useLanguage();

  const handleSearch = (location: string) => {
    navigate(`/browse?search=${encodeURIComponent(location)}`);
  };

  const handleHostelClick = (hostel: any) => {
    navigate(`/hostel/${hostel.id}`);
  };

  return (
    <div>
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
                {t('landing.hero.title')}
                <span className="text-primary"> Stay for free.</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                {t('landing.hero.subtitle')}
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

                    <Button 
                      className="w-full" 
                      onClick={(e) => { 
                        e.stopPropagation(); 
                        handleHostelClick(hostel); 
                      }}
                    >
                      Apply now
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button variant="outline" size="lg" onClick={() => navigate('/browse')}>
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
              onClick={() => navigate('/signup')}
            >
              {t('landing.hero.startVolunteering')}
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="px-8 border-orange-200 text-orange-600 hover:bg-orange-50" 
              onClick={() => navigate('/how-it-works')}
            >
              Learn More
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};