import { Hostel } from '../../../shared/types';

// Mock data for hostels
const mockHostels: Hostel[] = [
  {
    id: '1',
    name: 'Barcelona Beach Hostel',
    location: 'Barcelona, Spain',
    country: 'Spain',
    image: 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=400&h=300&fit=crop',
    rating: 4.7,
    reviewCount: 156,
    roles: ['Reception', 'Social Media', 'Housekeeping'],
    commitment: '2-4 weeks',
    workHours: '20 hours/week',
    accommodationType: 'Shared dorm',
    amenities: ['Free WiFi', 'Kitchen', 'Laundry', 'Bar'],
    mealsIncluded: true,
    description: 'Join our vibrant team at Barcelona Beach Hostel! We're looking for enthusiastic volunteers to help with daily operations.',
    urgent: true,
    lastPosted: '2 days ago',
    verified: true
  },
  {
    id: '2',
    name: 'Lisbon Central Backpackers',
    location: 'Lisbon, Portugal',
    country: 'Portugal',
    image: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=400&h=300&fit=crop',
    rating: 4.5,
    reviewCount: 89,
    roles: ['Tour Guide', 'Reception', 'Bar Staff'],
    commitment: '1-3 months',
    workHours: '25 hours/week',
    accommodationType: 'Private room',
    amenities: ['Free WiFi', 'Kitchen', 'Common Area', 'Rooftop Terrace'],
    mealsIncluded: false,
    description: 'Experience the heart of Lisbon while helping fellow travelers. Perfect for outgoing personalities!',
    urgent: false,
    lastPosted: '1 week ago',
    verified: true
  },
  {
    id: '3',
    name: 'Berlin Mitte Hostel',
    location: 'Berlin, Germany',
    country: 'Germany',
    image: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=300&fit=crop',
    rating: 4.8,
    reviewCount: 203,
    roles: ['Social Media', 'Event Planning', 'Housekeeping'],
    commitment: '3-6 months',
    workHours: '18 hours/week',
    accommodationType: 'Shared dorm',
    amenities: ['Free WiFi', 'Kitchen', 'Bike Rental', 'Event Space'],
    mealsIncluded: true,
    description: 'Join our creative community in the heart of Berlin. Help organize events and connect with travelers from around the world.',
    urgent: false,
    lastPosted: '3 days ago',
    verified: false
  },
  {
    id: '4',
    name: 'Bangkok Backpackers Lodge',
    location: 'Bangkok, Thailand',
    country: 'Thailand',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop',
    rating: 4.3,
    reviewCount: 127,
    roles: ['Reception', 'Tour Guide', 'Social Media'],
    commitment: '1-2 months',
    workHours: '22 hours/week',
    accommodationType: 'Private room',
    amenities: ['Free WiFi', 'Pool', 'Restaurant', 'Laundry'],
    mealsIncluded: true,
    description: 'Discover amazing Thailand while helping travelers navigate this incredible city. Thai language lessons included!',
    urgent: true,
    lastPosted: '5 days ago',
    verified: true
  },
  {
    id: '5',
    name: 'Buenos Aires Tango Hostel',
    location: 'Buenos Aires, Argentina',
    country: 'Argentina',
    image: 'https://images.unsplash.com/photo-1582735689369-4fe89db99dde?w=400&h=300&fit=crop',
    rating: 4.6,
    reviewCount: 178,
    roles: ['Reception', 'Bar Staff', 'Event Planning'],
    commitment: '2-5 months',
    workHours: '20 hours/week',
    accommodationType: 'Shared dorm',
    amenities: ['Free WiFi', 'Kitchen', 'Tango Classes', 'Rooftop Bar'],
    mealsIncluded: false,
    description: 'Experience the passion of Buenos Aires! Help run our tango-themed hostel and learn to dance.',
    urgent: false,
    lastPosted: '1 week ago',
    verified: true
  }
];

class HostelService {
  async getHostels(): Promise<Hostel[]> {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    return mockHostels;
  }

  async getHostelById(id: string): Promise<Hostel | null> {
    await new Promise(resolve => setTimeout(resolve, 500));
    return mockHostels.find(hostel => hostel.id === id) || null;
  }

  async searchHostels(query: string): Promise<Hostel[]> {
    await new Promise(resolve => setTimeout(resolve, 800));
    return mockHostels.filter(hostel =>
      hostel.name.toLowerCase().includes(query.toLowerCase()) ||
      hostel.location.toLowerCase().includes(query.toLowerCase()) ||
      hostel.country.toLowerCase().includes(query.toLowerCase()) ||
      hostel.roles.some(role => role.toLowerCase().includes(query.toLowerCase()))
    );
  }

  async applyToHostel(hostelId: string, applicationData: any): Promise<boolean> {
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log('Application submitted:', { hostelId, applicationData });
    return true;
  }
}

export const hostelService = new HostelService();