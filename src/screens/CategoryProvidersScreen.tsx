import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getCategoryById, getNearbyProviders, ServiceProvider } from '@/services/mockData';
import { getCurrentLocation, isWithinRadius } from '@/services/locationService';
import ServiceProviderCard from '@/components/ServiceProviderCard';
import ServiceProviderMap from '@/components/ServiceProviderMap';
import { useNavigate } from 'react-router-dom';

const CategoryProvidersScreen = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const [providers, setProviders] = useState<ServiceProvider[]>([]);
  const [category, setCategory] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [sortBy, setSortBy] = useState<'distance' | 'rating' | 'price'>('distance');
  const navigate = useNavigate();

  useEffect(() => {
    const loadProviders = async () => {
      if (!categoryId) return;

      setIsLoading(true);
      try {
        const catData = getCategoryById(categoryId);
        setCategory(catData);

        const location = await getCurrentLocation();
        const providerList = getNearbyProviders(location.latitude, location.longitude, categoryId)
          .filter(provider => 
            isWithinRadius(
              location.latitude,
              location.longitude,
              provider.location.latitude,
              provider.location.longitude,
              10 // 10km radius
            )
          );
        setProviders(providerList);
      } catch (error) {
        console.error('Error loading providers:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadProviders();
  }, [categoryId]);

  const handleProviderClick = (provider: ServiceProvider) => {
    navigate(`/provider/${provider.id}`);
  };

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
      {/* Back navigation */}
      <Link to="/categories" className="flex items-center text-sewasetu-primary mb-4">
        <svg
          className="w-5 h-5 mr-1"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M15 19l-7-7 7-7"
          ></path>
        </svg>
        <span>Back to Categories</span>
      </Link>

      {/* Category header */}
      {category && (
        <div className="mb-6">
          <div className="flex items-center">
            <span className="text-3xl mr-2">{category.icon}</span>
            <h1 className="text-2xl font-bold">{category.name}</h1>
          </div>
          <p className="text-gray-600 mt-2">{category.description}</p>
        </div>
      )}

      {/* Map Section */}
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Service Providers Near You</h2>
        <ServiceProviderMap 
          providers={sortedProviders}
          onProviderClick={handleProviderClick}
        />
      </div>

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
          <p className="text-gray-500">No service providers found in this category.</p>
          <Link
            to="/categories"
            className="text-sewasetu-primary font-medium mt-2 inline-block"
          >
            Browse other categories
          </Link>
        </div>
      )}
    </div>
  );
};

export default CategoryProvidersScreen;
