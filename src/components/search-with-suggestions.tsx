import React, { useState, useRef, useEffect } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { MapPin, Search, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface SearchWithSuggestionsProps {
  value: string;
  onChange: (value: string) => void;
  onSearch: (location: string) => void;
  placeholder?: string;
}

// Popular destinations and cities
const popularPlaces = [
  { name: "Bangkok, Thailand", country: "Thailand", continent: "Asia" },
  { name: "Lisbon, Portugal", country: "Portugal", continent: "Europe" },
  { name: "Buenos Aires, Argentina", country: "Argentina", continent: "South America" },
  { name: "Berlin, Germany", country: "Germany", continent: "Europe" },
  { name: "Bali, Indonesia", country: "Indonesia", continent: "Asia" },
  { name: "Barcelona, Spain", country: "Spain", continent: "Europe" },
  { name: "Amsterdam, Netherlands", country: "Netherlands", continent: "Europe" },
  { name: "Prague, Czech Republic", country: "Czech Republic", continent: "Europe" },
  { name: "Melbourne, Australia", country: "Australia", continent: "Oceania" },
  { name: "Sydney, Australia", country: "Australia", continent: "Oceania" },
  { name: "Rio de Janeiro, Brazil", country: "Brazil", continent: "South America" },
  { name: "Lima, Peru", country: "Peru", continent: "South America" },
  { name: "Mexico City, Mexico", country: "Mexico", continent: "North America" },
  { name: "London, United Kingdom", country: "United Kingdom", continent: "Europe" },
  { name: "Paris, France", country: "France", continent: "Europe" },
  { name: "Rome, Italy", country: "Italy", continent: "Europe" },
  { name: "Venice, Italy", country: "Italy", continent: "Europe" },
  { name: "Florence, Italy", country: "Italy", continent: "Europe" },
  { name: "Vienna, Austria", country: "Austria", continent: "Europe" },
  { name: "Budapest, Hungary", country: "Hungary", continent: "Europe" },
  { name: "Krakow, Poland", country: "Poland", continent: "Europe" },
  { name: "Dublin, Ireland", country: "Ireland", continent: "Europe" },
  { name: "Edinburgh, Scotland", country: "Scotland", continent: "Europe" },
  { name: "Stockholm, Sweden", country: "Sweden", continent: "Europe" },
  { name: "Copenhagen, Denmark", country: "Denmark", continent: "Europe" },
  { name: "Helsinki, Finland", country: "Finland", continent: "Europe" },
  { name: "Oslo, Norway", country: "Norway", continent: "Europe" },
  { name: "Reykjavik, Iceland", country: "Iceland", continent: "Europe" },
  { name: "Tokyo, Japan", country: "Japan", continent: "Asia" },
  { name: "Kyoto, Japan", country: "Japan", continent: "Asia" },
  { name: "Seoul, South Korea", country: "South Korea", continent: "Asia" },
  { name: "Singapore", country: "Singapore", continent: "Asia" },
  { name: "Ho Chi Minh City, Vietnam", country: "Vietnam", continent: "Asia" },
  { name: "Hanoi, Vietnam", country: "Vietnam", continent: "Asia" },
  { name: "Chiang Mai, Thailand", country: "Thailand", continent: "Asia" },
  { name: "Phnom Penh, Cambodia", country: "Cambodia", continent: "Asia" },
  { name: "Yangon, Myanmar", country: "Myanmar", continent: "Asia" },
  { name: "Kathmandu, Nepal", country: "Nepal", continent: "Asia" },
  { name: "New Delhi, India", country: "India", continent: "Asia" },
  { name: "Mumbai, India", country: "India", continent: "Asia" },
  { name: "Goa, India", country: "India", continent: "Asia" },
  { name: "Colombo, Sri Lanka", country: "Sri Lanka", continent: "Asia" },
  { name: "Cape Town, South Africa", country: "South Africa", continent: "Africa" },
  { name: "Marrakech, Morocco", country: "Morocco", continent: "Africa" },
  { name: "Cairo, Egypt", country: "Egypt", continent: "Africa" },
  { name: "New York, USA", country: "USA", continent: "North America" },
  { name: "Los Angeles, USA", country: "USA", continent: "North America" },
  { name: "San Francisco, USA", country: "USA", continent: "North America" },
  { name: "Chicago, USA", country: "USA", continent: "North America" },
  { name: "Vancouver, Canada", country: "Canada", continent: "North America" },
  { name: "Toronto, Canada", country: "Canada", continent: "North America" },
  { name: "Montreal, Canada", country: "Canada", continent: "North America" },
  { name: "Cusco, Peru", country: "Peru", continent: "South America" },
  { name: "Quito, Ecuador", country: "Ecuador", continent: "South America" },
  { name: "La Paz, Bolivia", country: "Bolivia", continent: "South America" },
  { name: "Santiago, Chile", country: "Chile", continent: "South America" },
  { name: "Valparaiso, Chile", country: "Chile", continent: "South America" },
  { name: "Mendoza, Argentina", country: "Argentina", continent: "South America" },
  { name: "Montevideo, Uruguay", country: "Uruguay", continent: "South America" }
];

export function SearchWithSuggestions({ value, onChange, onSearch, placeholder = "Where do you want to volunteer?" }: SearchWithSuggestionsProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [suggestions, setSuggestions] = useState<typeof popularPlaces>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Filter suggestions based on input
  useEffect(() => {
    if (value.trim().length === 0) {
      setSuggestions(popularPlaces.slice(0, 8)); // Show popular places when empty
    } else {
      const filtered = popularPlaces.filter(place => 
        place.name.toLowerCase().includes(value.toLowerCase()) ||
        place.country.toLowerCase().includes(value.toLowerCase()) ||
        place.continent.toLowerCase().includes(value.toLowerCase())
      ).slice(0, 8);
      setSuggestions(filtered);
    }
  }, [value]);

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
    setIsOpen(true);
  };

  const handleSuggestionClick = (place: typeof popularPlaces[0]) => {
    onChange(place.name);
    setIsOpen(false);
    onSearch(place.name);
  };

  const handleSearch = () => {
    onSearch(value);
    setIsOpen(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    } else if (e.key === 'Escape') {
      setIsOpen(false);
    }
  };

  const clearSearch = () => {
    onChange('');
    inputRef.current?.focus();
    setIsOpen(true);
  };

  return (
    <div ref={containerRef} className="relative flex-1">
      <div className="relative">
        <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5 z-10" />
        <Input
          ref={inputRef}
          placeholder={placeholder}
          value={value}
          onChange={handleInputChange}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
          className="pl-10 pr-20"
        />
        {value && (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={clearSearch}
            className="absolute right-12 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0 hover:bg-gray-100 rounded-full z-10"
          >
            <X className="h-4 w-4" />
          </Button>
        )}
        <Button
          type="button"
          onClick={handleSearch}
          size="sm"
          className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 px-3 bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white z-10"
        >
          <Search className="w-4 h-4" />
        </Button>
      </div>

      <AnimatePresence>
        {isOpen && suggestions.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 right-0 mt-1 bg-white border rounded-lg shadow-lg z-50 max-h-64 overflow-y-auto"
          >
            <div className="py-2">
              {value.trim().length === 0 && (
                <div className="px-4 py-2 text-sm text-muted-foreground border-b">
                  Popular destinations
                </div>
              )}
              {suggestions.map((place, index) => (
                <motion.button
                  key={`${place.name}-${index}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.1, delay: index * 0.02 }}
                  onClick={() => handleSuggestionClick(place)}
                  className="w-full text-left px-4 py-3 hover:bg-orange-50 transition-colors duration-150 flex items-center space-x-3 group"
                >
                  <MapPin className="w-4 h-4 text-muted-foreground group-hover:text-orange-500 transition-colors" />
                  <div className="flex-1">
                    <div className="text-sm font-medium text-gray-900 group-hover:text-orange-700 transition-colors">
                      {place.name}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {place.country} • {place.continent}
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}