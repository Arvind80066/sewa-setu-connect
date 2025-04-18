
import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getProviderById, getCategoryById } from '@/services/mockData';
import StarRating from '@/components/ui/StarRating';
import LocationDisplay from '@/components/ui/LocationDisplay';
import StatusBadge from '@/components/ui/StatusBadge';
import { useToast } from '@/hooks/use-toast';

const ServiceProviderScreen = () => {
  const { providerId } = useParams<{ providerId: string }>();
  const [provider, setProvider] = useState<any>(null);
  const [category, setCategory] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    if (!providerId) return;
    
    const loadProvider = () => {
      setIsLoading(true);
      try {
        const providerData = getProviderById(providerId);
        setProvider(providerData);
        
        if (providerData) {
          const categoryData = getCategoryById(providerData.categoryId);
          setCategory(categoryData);
        }
      } catch (error) {
        console.error('Error loading provider:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadProvider();
  }, [providerId]);

  const handleBookNow = () => {
    if (!provider) return;
    navigate(`/booking/${providerId}`);
  };

  const handleContact = () => {
    toast({
      title: "Contact initiated",
      description: `You'll be connected with ${provider.name} shortly.`
    });
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sewasetu-primary"></div>
      </div>
    );
  }

  if (!provider) {
    return (
      <div className="container mx-auto px-4 py-10 text-center">
        <p className="text-gray-500 mb-4">Service provider not found</p>
        <Link to="/" className="sewasetu-btn-primary">
          Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="pb-20">
      {/* Header */}
      <div className="bg-sewasetu-primary text-white p-4 relative">
        <Link
          to={`/category/${provider.categoryId}`}
          className="absolute top-4 left-4 flex items-center"
        >
          <svg
            className="w-5 h-5"
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
          <span className="sr-only">Back</span>
        </Link>
      </div>

      {/* Provider Profile */}
      <div className="container mx-auto px-4">
        <div className="relative -mt-16 mb-6 flex justify-center">
          <img
            src={provider.photo}
            alt={provider.name}
            className="w-32 h-32 rounded-full border-4 border-white object-cover"
          />
        </div>

        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold">{provider.name}</h1>
          <div className="flex items-center justify-center mt-2">
            <span className="mr-2">{category?.name}</span>
            <StatusBadge status={provider.availableNow ? 'available' : 'busy'} />
          </div>
          <div className="flex justify-center mt-2">
            <StarRating rating={provider.rating} totalRatings={provider.totalRatings} size="lg" />
          </div>
          <div className="mt-2 flex justify-center">
            <LocationDisplay distance={provider.distance} address={provider.location.address} />
          </div>
        </div>

        <div className="sewasetu-card p-4 mb-6">
          <h2 className="font-bold text-lg mb-2">About</h2>
          <p className="text-gray-600">{provider.description}</p>
        </div>

        <div className="sewasetu-card p-4 mb-6">
          <h2 className="font-bold text-lg mb-2">Service Details</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-gray-500">Experience</p>
              <p className="font-medium">{provider.experience}</p>
            </div>
            <div>
              <p className="text-gray-500">Rate</p>
              <p className="font-medium">₹{provider.hourlyRate}/hour</p>
            </div>
            <div className="col-span-2">
              <p className="text-gray-500">Skills</p>
              <div className="flex flex-wrap gap-2 mt-1">
                {provider.skills.map((skill: string, index: number) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-gray-100 text-gray-800 text-sm rounded-full"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="sewasetu-card p-4 mb-6">
          <h2 className="font-bold text-lg mb-2">Location</h2>
          <div className="bg-gray-200 rounded-lg h-40 flex items-center justify-center">
            <p className="text-gray-500">Map view would appear here</p>
          </div>
          <p className="mt-2 text-gray-600">{provider.location.address}</p>
        </div>

        {/* Action buttons */}
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-200">
          <div className="container mx-auto flex gap-4">
            <button
              onClick={handleContact}
              className="flex-1 py-3 border border-sewasetu-primary text-sewasetu-primary font-medium rounded-lg"
            >
              Contact
            </button>
            <button
              onClick={handleBookNow}
              className="flex-1 sewasetu-btn-primary py-3"
            >
              Book Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceProviderScreen;
