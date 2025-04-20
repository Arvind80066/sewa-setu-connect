
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getNearbyProviders, ServiceProvider } from '@/services/mockData';
import { getCurrentLocation } from '@/services/locationService';
import ServiceProviderCard from '@/components/ServiceProviderCard';

const ServiceProvidersScreen = () => {
  const [providers, setProviders] = useState<ServiceProvider[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sortBy, setSortBy] = useState<'distance' | 'rating' | 'price'>('distance');

  useEffect(() => {
    const loadProviders = async () => {
      setIsLoading(true);
      try {
        const location = await getCurrentLocation();
        const providersData = getNearbyProviders(location.latitude, location.longitude);
        setProviders(providersData);
      } catch (error) {
        console.error('Error loading providers:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadProviders();
  }, []);

  const sortedProviders = [...providers].sort((a, b) => {
    switch (sortBy) {
      case 'distance':
        return (a.distance || 0) - (b.distance || 0);
      case 'rating':
        return b.rating - a.rating;
      case 'price':
        return a.hourlyRate - b.hourlyRate;
      default:
        return 0;
    }
  });

  return (
    <div className="container mx-auto px-4 py-6 pb-20">
      <h1 className="text-2xl font-bold mb-6">All Service Providers</h1>
      
      {/* Filters */}
      <div className="mb-6 flex flex-wrap gap-2">
        <button
          onClick={() => setSortBy('distance')}
          className={`px-4 py-2 rounded-full text-sm ${
            sortBy === 'distance'
              ? 'bg-sewasetu-primary text-white'
              : 'bg-gray-100 text-gray-700'
          }`}
        >
          Nearest
        </button>
        <button
          onClick={() => setSortBy('rating')}
          className={`px-4 py-2 rounded-full text-sm ${
            sortBy === 'rating'
              ? 'bg-sewasetu-primary text-white'
              : 'bg-gray-100 text-gray-700'
          }`}
        >
          Top Rated
        </button>
        <button
          onClick={() => setSortBy('price')}
          className={`px-4 py-2 rounded-full text-sm ${
            sortBy === 'price'
              ? 'bg-sewasetu-primary text-white'
              : 'bg-gray-100 text-gray-700'
          }`}
        >
          Price: Low to High
        </button>
      </div>

      {/* Provider list */}
      {isLoading ? (
        <div className="flex justify-center py-10">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-sewasetu-primary"></div>
        </div>
      ) : sortedProviders.length > 0 ? (
        <div className="space-y-4">
          {sortedProviders.map((provider) => (
            <ServiceProviderCard key={provider.id} provider={provider} />
          ))}
        </div>
      ) : (
        <div className="text-center py-10">
          <p className="text-gray-500">No service providers found.</p>
          <Link
            to="/categories"
            className="text-sewasetu-primary font-medium mt-2 inline-block"
          >
            Browse categories
          </Link>
        </div>
      )}
    </div>
  );
};

export default ServiceProvidersScreen;
