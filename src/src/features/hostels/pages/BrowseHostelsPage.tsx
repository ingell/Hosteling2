import React, { useState, useEffect } from 'react';
import { HostelGrid } from '../components/HostelGrid';
import { useLanguage } from '../../../shared/contexts/LanguageContext';
import { Hostel } from '../../../shared/types';
import { hostelService } from '../services/hostelService';

export function BrowseHostelsPage() {
  const [hostels, setHostels] = useState<Hostel[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('newest');
  const [favoriteHostels, setFavoriteHostels] = useState<Set<string>>(new Set());
  
  const { t } = useLanguage();

  useEffect(() => {
    loadHostels();
  }, []);

  const loadHostels = async () => {
    setIsLoading(true);
    try {
      const data = await hostelService.getHostels();
      setHostels(data);
    } catch (error) {
      console.error('Error loading hostels:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleHostelClick = (hostelId: string) => {
    // Navigate to hostel detail page
    console.log('Navigate to hostel:', hostelId);
  };

  const handleApply = (hostelId: string) => {
    // Handle application
    console.log('Apply to hostel:', hostelId);
  };

  const handleFavorite = (hostelId: string) => {
    const newFavorites = new Set(favoriteHostels);
    if (newFavorites.has(hostelId)) {
      newFavorites.delete(hostelId);
    } else {
      newFavorites.add(hostelId);
    }
    setFavoriteHostels(newFavorites);
  };

  const handleSortChange = (newSortBy: string) => {
    setSortBy(newSortBy);
    // Apply sorting logic here
    const sortedHostels = [...hostels];
    switch (newSortBy) {
      case 'rating':
        sortedHostels.sort((a, b) => b.rating - a.rating);
        break;
      case 'urgent':
        sortedHostels.sort((a, b) => (b.urgent ? 1 : 0) - (a.urgent ? 1 : 0));
        break;
      case 'alphabetical':
        sortedHostels.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default: // newest
        sortedHostels.sort((a, b) => new Date(b.lastPosted).getTime() - new Date(a.lastPosted).getTime());
    }
    setHostels(sortedHostels);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl mb-4 text-gray-900">
            {t('browse.title') || 'Browse Hostels'}
          </h1>
          <p className="text-gray-600">
            {t('browse.description') || 'Find volunteer opportunities at hostels worldwide'}
          </p>
        </div>

        <HostelGrid
          hostels={hostels}
          onHostelClick={handleHostelClick}
          onApply={handleApply}
          onFavorite={handleFavorite}
          favoriteHostels={favoriteHostels}
          isLoading={isLoading}
          sortBy={sortBy}
          onSortChange={handleSortChange}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
        />
      </div>
    </div>
  );
}