
export interface ServiceCategory {
  id: string;
  name: string;
  icon: string;
  description: string;
}

export interface ServiceProvider {
  id: string;
  name: string;
  categoryId: string;
  photo: string;
  rating: number;
  totalRatings: number;
  skills: string[];
  experience: string;
  hourlyRate: number;
  availableNow: boolean;
  description: string;
  location: {
    latitude: number;
    longitude: number;
    address: string;
  };
  distance?: number; // Will be calculated based on user's location
}

export interface Booking {
  id: string;
  userId: string;
  providerId: string;
  serviceDate: Date;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  createdAt: Date;
  serviceDetails: string;
  location: string;
  price: number;
}

// Service Categories
export const categories: ServiceCategory[] = [
  {
    id: '1',
    name: 'Plumber',
    icon: '🔧',
    description: 'Fix leaks, repair taps, unblock drains and more',
  },
  {
    id: '2',
    name: 'Electrician',
    icon: '⚡',
    description: 'Electrical repairs, wiring, installation, and more',
  },
  {
    id: '3',
    name: 'Carpenter',
    icon: '🪚',
    description: 'Furniture repair, assembly, and custom woodwork',
  },
  {
    id: '4',
    name: 'Cleaner',
    icon: '🧹',
    description: 'House cleaning, deep cleaning, and sanitization',
  },
  {
    id: '5',
    name: 'Painter',
    icon: '🎨',
    description: 'Interior and exterior painting services',
  },
  {
    id: '6',
    name: 'AC Repair',
    icon: '❄️',
    description: 'AC service, installation, and repair',
  },
  {
    id: '7',
    name: 'Pest Control',
    icon: '🐜',
    description: 'Remove pests and prevent infestations',
  },
  {
    id: '8',
    name: 'Gardener',
    icon: '🌱',
    description: 'Garden maintenance, plant care, and landscaping',
  },
];

// Service Providers
export const serviceProviders: ServiceProvider[] = [
  {
    id: '1',
    name: 'Rajesh Kumar',
    categoryId: '1', // Plumber
    photo: 'https://randomuser.me/api/portraits/men/35.jpg',
    rating: 4.8,
    totalRatings: 124,
    skills: ['Leak Fixing', 'Pipe Installation', 'Bathroom Fitting'],
    experience: '8 years',
    hourlyRate: 500,
    availableNow: true,
    description: 'Professional plumber with expertise in all types of plumbing work. Available for emergency services.',
    location: {
      latitude: 12.9716,
      longitude: 77.5946,
      address: 'Jayanagar, Bangalore',
    },
  },
  {
    id: '2',
    name: 'Suresh Patel',
    categoryId: '1', // Plumber
    photo: 'https://randomuser.me/api/portraits/men/43.jpg',
    rating: 4.5,
    totalRatings: 98,
    skills: ['Water Heater Repair', 'Drainage Solutions', 'Sink Installation'],
    experience: '5 years',
    hourlyRate: 450,
    availableNow: false,
    description: 'Specialized in modern bathroom fittings and water heater installations.',
    location: {
      latitude: 12.9352,
      longitude: 77.6245,
      address: 'Koramangala, Bangalore',
    },
  },
  {
    id: '3',
    name: 'Vinod Sharma',
    categoryId: '2', // Electrician
    photo: 'https://randomuser.me/api/portraits/men/22.jpg',
    rating: 4.9,
    totalRatings: 156,
    skills: ['Wiring', 'Circuit Repair', 'Appliance Installation'],
    experience: '12 years',
    hourlyRate: 600,
    availableNow: true,
    description: 'Certified electrician with experience in residential and commercial projects.',
    location: {
      latitude: 12.9782,
      longitude: 77.6408,
      address: 'Indiranagar, Bangalore',
    },
  },
  {
    id: '4',
    name: 'Arjun Singh',
    categoryId: '3', // Carpenter
    photo: 'https://randomuser.me/api/portraits/men/67.jpg',
    rating: 4.7,
    totalRatings: 89,
    skills: ['Furniture Repair', 'Custom Woodwork', 'Cabinet Installation'],
    experience: '10 years',
    hourlyRate: 550,
    availableNow: true,
    description: 'Skilled carpenter specializing in custom furniture and woodworking.',
    location: {
      latitude: 12.9850,
      longitude: 77.7544,
      address: 'Whitefield, Bangalore',
    },
  },
  {
    id: '5',
    name: 'Priya Desai',
    categoryId: '4', // Cleaner
    photo: 'https://randomuser.me/api/portraits/women/28.jpg',
    rating: 4.6,
    totalRatings: 112,
    skills: ['Deep Cleaning', 'Sanitization', 'Regular Maintenance'],
    experience: '6 years',
    hourlyRate: 350,
    availableNow: false,
    description: 'Professional cleaner with attention to detail and eco-friendly cleaning solutions.',
    location: {
      latitude: 12.9952,
      longitude: 77.6245,
      address: 'HSR Layout, Bangalore',
    },
  },
  {
    id: '6',
    name: 'Rahul Verma',
    categoryId: '2', // Electrician
    photo: 'https://randomuser.me/api/portraits/men/52.jpg',
    rating: 4.4,
    totalRatings: 78,
    skills: ['Electric Panel Repair', 'Lighting Installation', 'Fan Repairs'],
    experience: '7 years',
    hourlyRate: 550,
    availableNow: true,
    description: 'Specialized in home automation and smart home electrical setup.',
    location: {
      latitude: 12.9010,
      longitude: 77.6682,
      address: 'Electronic City, Bangalore',
    },
  },
  {
    id: '7',
    name: 'Meena Kumari',
    categoryId: '5', // Painter
    photo: 'https://randomuser.me/api/portraits/women/55.jpg',
    rating: 4.9,
    totalRatings: 65,
    skills: ['Wall Painting', 'Texturing', 'Waterproofing'],
    experience: '9 years',
    hourlyRate: 500,
    availableNow: false,
    description: 'Expert painter with knowledge of latest color trends and techniques.',
    location: {
      latitude: 12.9342,
      longitude: 77.6551,
      address: 'BTM Layout, Bangalore',
    },
  },
  {
    id: '8',
    name: 'Santosh Kumar',
    categoryId: '6', // AC Repair
    photo: 'https://randomuser.me/api/portraits/men/48.jpg',
    rating: 4.8,
    totalRatings: 103,
    skills: ['AC Service', 'Installation', 'Gas Refilling'],
    experience: '11 years',
    hourlyRate: 700,
    availableNow: true,
    description: 'Certified AC technician for all brands. Emergency services available.',
    location: {
      latitude: 12.9345,
      longitude: 77.5432,
      address: 'Vijayanagar, Bangalore',
    },
  },
];

// Sample bookings
export const bookings: Booking[] = [
  {
    id: '1',
    userId: '1',
    providerId: '1',
    serviceDate: new Date('2025-05-10T10:00:00'),
    status: 'confirmed',
    createdAt: new Date('2025-05-05T14:23:00'),
    serviceDetails: 'Fixing kitchen sink leak',
    location: 'Home - Jayanagar, Bangalore',
    price: 800,
  },
  {
    id: '2',
    userId: '1',
    providerId: '3',
    serviceDate: new Date('2025-05-15T15:30:00'),
    status: 'pending',
    createdAt: new Date('2025-05-07T09:15:00'),
    serviceDetails: 'Fan installation in bedroom',
    location: 'Home - Jayanagar, Bangalore',
    price: 1200,
  },
  {
    id: '3',
    userId: '1',
    providerId: '5',
    serviceDate: new Date('2025-04-28T09:00:00'),
    status: 'completed',
    createdAt: new Date('2025-04-25T10:30:00'),
    serviceDetails: 'Full house deep cleaning',
    location: 'Home - Jayanagar, Bangalore',
    price: 2500,
  },
  {
    id: '4',
    userId: '1',
    providerId: '7',
    serviceDate: new Date('2025-04-22T11:00:00'),
    status: 'cancelled',
    createdAt: new Date('2025-04-18T16:45:00'),
    serviceDetails: 'Painting living room walls',
    location: 'Home - Jayanagar, Bangalore',
    price: 3500,
  },
];

// Helper function to calculate distance between two coordinates
export const calculateDistance = (
  lat1: number, 
  lon1: number, 
  lat2: number, 
  lon2: number
): number => {
  const R = 6371; // Radius of the earth in km
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
    Math.sin(dLon/2) * Math.sin(dLon/2); 
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  const d = R * c; // Distance in km
  return parseFloat(d.toFixed(1));
};

function deg2rad(deg: number): number {
  return deg * (Math.PI/180);
}

// Get nearby providers based on location
export const getNearbyProviders = (
  latitude: number, 
  longitude: number, 
  categoryId?: string
): ServiceProvider[] => {
  return serviceProviders
    .filter(provider => !categoryId || provider.categoryId === categoryId)
    .map(provider => ({
      ...provider,
      distance: calculateDistance(
        latitude,
        longitude,
        provider.location.latitude,
        provider.location.longitude
      )
    }))
    .sort((a, b) => (a.distance || 0) - (b.distance || 0));
};

// Get bookings for a user
export const getUserBookings = (userId: string): Booking[] => {
  return bookings.filter(booking => booking.userId === userId);
};

// Get a service provider by ID
export const getProviderById = (id: string): ServiceProvider | undefined => {
  return serviceProviders.find(provider => provider.id === id);
};

// Get a category by ID
export const getCategoryById = (id: string): ServiceCategory | undefined => {
  return categories.find(category => category.id === id);
};
