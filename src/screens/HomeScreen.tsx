
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { categories, ServiceProvider, getNearbyProviders } from '@/services/mockData';
import { getCurrentLocation } from '@/services/locationService';
import ServiceCategoryCard from '@/components/ServiceCategoryCard';
import ServiceProviderCard from '@/components/ServiceProviderCard';

const HomeScreen = () => {
  const { user } = useAuth();
  const [nearbyProviders, setNearbyProviders] = useState<ServiceProvider[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadNearbyProviders = async () => {
      try {
        const location = await getCurrentLocation();
        const providers = getNearbyProviders(location.latitude, location.longitude);
        setNearbyProviders(providers.slice(0, 5)); // Get top 5 nearest providers
      } catch (error) {
        console.error('Error loading nearby providers:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadNearbyProviders();
  }, []);

  return (
    <div className="pb-20">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-sewasetu-primary to-blue-600 text-white py-10 px-4 rounded-b-3xl">
        <div className="container mx-auto">
          <h1 className="text-3xl font-bold mb-3">
            {user ? `Welcome, ${user.name.split(' ')[0]}!` : 'Welcome to SewaSetu'}
          </h1>
          <p className="text-lg opacity-90 mb-8">
            Find trusted service providers near you
          </p>
          <div className="relative">
            <input
              type="text"
              placeholder="Search for services..."
              className="w-full py-3 px-4 pr-10 rounded-lg text-gray-800 focus:outline-none"
            />
            <button className="absolute right-3 top-1/2 transform -translate-y-1/2">
              <svg
                className="w-5 h-5 text-gray-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                ></path>
              </svg>
            </button>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 mt-8">
        {/* Service Categories */}
        <section className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-800">Service Categories</h2>
            <Link to="/categories" className="text-sewasetu-primary text-sm font-medium">
              View All
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categories.slice(0, 4).map((category) => (
              <ServiceCategoryCard key={category.id} category={category} />
            ))}
          </div>
        </section>

        {/* Nearby Service Providers */}
        <section className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-800">Nearby Providers</h2>
            <Link to="/providers" className="text-sewasetu-primary text-sm font-medium">
              View All
            </Link>
          </div>
          {isLoading ? (
            <div className="flex justify-center py-10">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-sewasetu-primary"></div>
            </div>
          ) : nearbyProviders.length > 0 ? (
            <div className="space-y-4">
              {nearbyProviders.map((provider) => (
                <ServiceProviderCard key={provider.id} provider={provider} />
              ))}
            </div>
          ) : (
            <div className="text-center py-10 text-gray-500">
              No nearby service providers found. Try expanding your search.
            </div>
          )}
        </section>

        {/* Quick Booking */}
        <section className="mb-8">
          <div className="sewasetu-card p-6 bg-gradient-to-r from-orange-50 to-yellow-50">
            <h3 className="text-lg font-bold text-sewasetu-dark mb-2">
              Need urgent help?
            </h3>
            <p className="text-gray-600 mb-4">
              Book our express service for immediate assistance
            </p>
            <Link to="/urgent" className="sewasetu-btn-secondary">
              Book Urgent Service
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
};

export default HomeScreen;
