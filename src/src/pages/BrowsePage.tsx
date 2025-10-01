import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Card, CardContent } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { Button } from '../../components/ui/button';
import { ImageWithFallback } from '../../components/figma/ImageWithFallback';
import { SearchWithSuggestions } from '../../components/common/SearchWithSuggestions';
import { MapPin } from 'lucide-react';
import { featuredHostels } from '../../constants/data';
import { useLanguage } from '../contexts/LanguageContext';

export const BrowsePage: React.FC = () => {
  const { t } = useLanguage();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [searchLocation, setSearchLocation] = useState(searchParams.get('search') || '');
  const [searchResults, setSearchResults] = useState<any[]>([]);

  useEffect(() => {
    const searchQuery = searchParams.get('search');
    if (searchQuery) {
      setSearchLocation(searchQuery);
      handleSearch(searchQuery);
    } else {
      setSearchResults([]);
    }
  }, [searchParams]);

  const handleSearch = (location: string) => {
    // Filter hostels based on search location
    const filtered = featuredHostels.filter(hostel => 
      hostel.location.toLowerCase().includes(location.toLowerCase()) ||
      hostel.name.toLowerCase().includes(location.toLowerCase())
    );
    setSearchResults(filtered);
  };

  const handleHostelClick = (hostel: any) => {
    navigate(`/hostel/${hostel.id}`);
  };

  const hostelsToShow = searchResults.length > 0 ? searchResults : featuredHostels;

  return (
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
          {searchResults.length > 0 ? t('browse.foundOpportunities').replace('{count}', hostelsToShow.length.toString()) : t('browse.featuredOpportunities')}
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {hostelsToShow.map((hostel) => (
            <Card 
              key={hostel.id} 
              className="group hover:shadow-lg transition-all duration-300 overflow-hidden cursor-pointer"
              onClick={() => handleHostelClick(hostel)}
            >
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
                    <span className="text-muted-foreground">{t('browse.volunteersNeeded')}:</span>
                    <Badge variant="secondary">{hostel.volunteersNeeded}</Badge>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">{t('browse.commitment')}:</span>
                    <span>{hostel.commitment}</span>
                  </div>
                  <div className="space-y-2">
                    <span className="text-sm text-muted-foreground">{t('browse.tasks')}:</span>
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
  );
};