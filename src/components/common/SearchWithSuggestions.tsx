import React, { useState, useRef, useEffect } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
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
  { name: "Mumbai, India", country: "India", continent: "Asia" },
  { name: "Delhi, India", country: "India", continent: "Asia" },
  { name: "Goa, India", country: "India", continent: "Asia" },
  { name: "Kathmandu, Nepal", country: "Nepal", continent: "Asia" },
  { name: "Pokhara, Nepal", country: "Nepal", continent: "Asia" },
  { name: "Istanbul, Turkey", country: "Turkey", continent: "Europe/Asia" },
  { name: "Cappadocia, Turkey", country: "Turkey", continent: "Europe/Asia" },
  { name: "Cairo, Egypt", country: "Egypt", continent: "Africa" },
  { name: "Marrakech, Morocco", country: "Morocco", continent: "Africa" },
  { name: "Cape Town, South Africa", country: "South Africa", continent: "Africa" },
  { name: "Nairobi, Kenya", country: "Kenya", continent: "Africa" },
  { name: "New York, USA", country: "USA", continent: "North America" },
  { name: "Los Angeles, USA", country: "USA", continent: "North America" },
  { name: "San Francisco, USA", country: "USA", continent: "North America" },
  { name: "Vancouver, Canada", country: "Canada", continent: "North America" },
  { name: "Toronto, Canada", country: "Canada", continent: "North America" },
  { name: "Montreal, Canada", country: "Canada", continent: "North America" }
];

export function SearchWithSuggestions({ 
  value, 
  onChange, 
  onSearch, 
  placeholder = "Where do you want to volunteer?" 
}: SearchWithSuggestionsProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [filteredPlaces, setFilteredPlaces] = useState<typeof popularPlaces>([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (value.length > 0) {
      const filtered = popularPlaces.filter(place =>
        place.name.toLowerCase().includes(value.toLowerCase()) ||
        place.country.toLowerCase().includes(value.toLowerCase()) ||
        place.continent.toLowerCase().includes(value.toLowerCase())
      ).slice(0, 8); // Limit to 8 results
      setFilteredPlaces(filtered);
      setIsOpen(filtered.length > 0);
    } else {
      setFilteredPlaces(popularPlaces.slice(0, 8)); // Show popular places when empty
      setIsOpen(false);
    }
    setSelectedIndex(-1);
  }, [value]);

  const handleInputFocus = () => {
    setFilteredPlaces(value.length > 0 ? filteredPlaces : popularPlaces.slice(0, 8));
    setIsOpen(true);
  };

  const handleInputBlur = (e: React.FocusEvent) => {
    // Delay hiding to allow click events on suggestions
    if (!dropdownRef.current?.contains(e.relatedTarget as Node)) {
      setTimeout(() => setIsOpen(false), 100);
    }
  };

  const handleSuggestionClick = (place: typeof popularPlaces[0]) => {
    onChange(place.name);
    setIsOpen(false);
    onSearch(place.name);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev => 
          prev < filteredPlaces.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => prev > 0 ? prev - 1 : -1);
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0 && selectedIndex < filteredPlaces.length) {
          handleSuggestionClick(filteredPlaces[selectedIndex]);
        } else if (value) {
          onSearch(value);
          setIsOpen(false);
        }
        break;
      case 'Escape':
        setIsOpen(false);
        inputRef.current?.blur();
        break;
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (value) {
      onSearch(value);
      setIsOpen(false);
    }
  };

  const clearSearch = () => {
    onChange("");
    setIsOpen(false);
    inputRef.current?.focus();
  };

  return (
    <div className="relative">
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative flex">
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground z-10">
            <Search className="w-4 h-4" />
          </div>
          <Input
            ref={inputRef}
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            className="pl-10 pr-20 h-12 text-base"
          />
          {value && (
            <button
              type="button"
              onClick={clearSearch}
              className="absolute right-16 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground z-10"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <Button 
            type="submit" 
            className="absolute right-1 top-1/2 transform -translate-y-1/2 h-10 px-4 bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600"
          >
            Search
          </Button>
        </div>
      </form>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={dropdownRef}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 right-0 z-50 bg-background border border-border rounded-lg shadow-lg mt-1 max-h-80 overflow-y-auto"
          >
            <div className="p-2">
              {value.length === 0 && (
                <div className="px-3 py-2 text-sm text-muted-foreground border-b">
                  Popular destinations
                </div>
              )}
              {filteredPlaces.map((place, index) => (
                <motion.div
                  key={place.name}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.05 }}
                  className={`flex items-center space-x-3 px-3 py-3 rounded-md cursor-pointer transition-colors ${
                    index === selectedIndex 
                      ? 'bg-primary/10 text-primary' 
                      : 'hover:bg-muted'
                  }`}
                  onClick={() => handleSuggestionClick(place)}
                >
                  <MapPin className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="text-sm truncate">{place.name}</div>
                    <div className="text-xs text-muted-foreground">{place.continent}</div>
                  </div>
                </motion.div>
              ))}
              {filteredPlaces.length === 0 && value.length > 0 && (
                <div className="px-3 py-4 text-sm text-muted-foreground text-center">
                  No destinations found for "{value}"
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}