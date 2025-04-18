
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getProviderById, getCategoryById } from '@/services/mockData';
import { createBooking } from '@/services/bookingService';
import { useAuth } from '@/context/AuthContext';
import { useNotifications } from '@/context/NotificationContext';
import { useToast } from '@/hooks/use-toast';
import StarRating from '@/components/ui/StarRating';

const BookingScreen = () => {
  const { providerId } = useParams<{ providerId: string }>();
  const [provider, setProvider] = useState<any>(null);
  const [category, setCategory] = useState<any>(null);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [serviceDetails, setServiceDetails] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user } = useAuth();
  const { addNotification } = useNotifications();
  const { toast } = useToast();
  const navigate = useNavigate();

  // Available time slots
  const timeSlots = [
    '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', 
    '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM'
  ];

  // Set minimum date to today
  const today = new Date();
  const minDate = today.toISOString().split('T')[0];

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!provider || !user || !selectedDate || !selectedTime || !serviceDetails) {
      toast({
        title: "Missing information",
        description: "Please fill all fields before booking",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      const serviceDateTime = new Date(`${selectedDate}T${selectedTime.slice(0, 2)}:${selectedTime.slice(3, 5)}:00`);
      
      const bookingData = {
        userId: user.id,
        providerId: provider.id,
        serviceDate: serviceDateTime,
        status: 'pending' as const,
        serviceDetails,
        location: user.address || 'Default address',
        price: provider.hourlyRate * 2, // Assume 2 hours of service
      };
      
      await createBooking(bookingData);
      
      // Send notification
      addNotification(
        'Booking request sent',
        `Your booking request with ${provider.name} has been sent successfully.`
      );
      
      toast({
        title: "Booking successful!",
        description: "Your service request has been successfully submitted.",
      });
      
      // Navigate to bookings page
      navigate('/bookings');
    } catch (error) {
      console.error('Error creating booking:', error);
      toast({
        title: "Booking failed",
        description: "There was a problem creating your booking. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
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
    <div className="container mx-auto px-4 py-6">
      <Link
        to={`/provider/${providerId}`}
        className="flex items-center text-sewasetu-primary mb-6"
      >
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
        <span>Back to Provider</span>
      </Link>

      <h1 className="text-2xl font-bold mb-6">Book a Service</h1>
      
      {/* Provider info */}
      <div className="sewasetu-card p-4 mb-6 flex items-center">
        <img
          src={provider.photo}
          alt={provider.name}
          className="w-16 h-16 rounded-full object-cover mr-4"
        />
        <div>
          <h2 className="font-bold">{provider.name}</h2>
          <p className="text-sm text-gray-500">{category?.name}</p>
          <StarRating rating={provider.rating} showCount={false} size="sm" />
          <p className="text-sm text-sewasetu-primary font-medium">
            ₹{provider.hourlyRate}/hour
          </p>
        </div>
      </div>

      {/* Booking form */}
      <form onSubmit={handleSubmit}>
        <div className="sewasetu-card p-4 mb-6">
          <h2 className="font-bold mb-4">Schedule Service</h2>
          
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">
              Select Date
            </label>
            <input
              type="date"
              min={minDate}
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="sewasetu-input"
              required
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">
              Select Time
            </label>
            <div className="grid grid-cols-3 gap-2">
              {timeSlots.map((time) => (
                <button
                  key={time}
                  type="button"
                  className={`p-2 rounded-lg text-sm font-medium border ${
                    selectedTime === time
                      ? 'bg-sewasetu-primary text-white border-sewasetu-primary'
                      : 'bg-white text-gray-700 border-gray-300 hover:border-sewasetu-primary'
                  }`}
                  onClick={() => setSelectedTime(time)}
                >
                  {time}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="sewasetu-card p-4 mb-6">
          <h2 className="font-bold mb-4">Service Details</h2>
          
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">
              Describe what you need help with
            </label>
            <textarea
              value={serviceDetails}
              onChange={(e) => setServiceDetails(e.target.value)}
              className="sewasetu-input min-h-[100px]"
              placeholder="Describe your service needs in detail..."
              required
            />
          </div>
        </div>

        <div className="sewasetu-card p-4 mb-8">
          <h2 className="font-bold mb-4">Location & Payment</h2>
          
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">
              Service Location
            </label>
            <div className="sewasetu-input bg-gray-50 flex items-center">
              <svg
                className="w-5 h-5 text-gray-500 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              <span>{user?.address || 'Your current location'}</span>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">
              Payment Summary
            </label>
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Service charge (estimated 2 hours)</span>
                <span>₹{provider.hourlyRate * 2}</span>
              </div>
              <div className="flex justify-between font-bold text-lg pt-2 border-t border-gray-200 mt-2">
                <span>Total</span>
                <span>₹{provider.hourlyRate * 2}</span>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                Final charges will be based on actual service duration
              </p>
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="sewasetu-btn-primary w-full py-3"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Processing...' : 'Confirm Booking'}
        </button>
      </form>
    </div>
  );
};

export default BookingScreen;
