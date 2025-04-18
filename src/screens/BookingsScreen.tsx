
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { getUserBookings, Booking } from '@/services/mockData';
import { cancelBooking } from '@/services/bookingService';
import BookingCard from '@/components/BookingCard';
import { useToast } from '@/hooks/use-toast';

const BookingsScreen = () => {
  const [activeTab, setActiveTab] = useState<'upcoming' | 'past'>('upcoming');
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    if (!user) return;

    const loadBookings = () => {
      setIsLoading(true);
      try {
        // In a real app, this would fetch from an API
        const userBookings = getUserBookings(user.id);
        setBookings(userBookings);
      } catch (error) {
        console.error('Error loading bookings:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadBookings();
  }, [user]);

  const handleCancelBooking = async (bookingId: string) => {
    try {
      await cancelBooking(bookingId);
      
      // Update local state to reflect cancellation
      setBookings(prevBookings => 
        prevBookings.map(booking => 
          booking.id === bookingId 
            ? { ...booking, status: 'cancelled' as const } 
            : booking
        )
      );
      
      toast({
        title: "Booking cancelled",
        description: "Your booking has been cancelled successfully.",
      });
    } catch (error) {
      console.error('Error cancelling booking:', error);
      toast({
        title: "Error",
        description: "Could not cancel booking. Please try again.",
        variant: "destructive",
      });
    }
  };

  const filteredBookings = bookings.filter(booking => {
    const bookingDate = new Date(booking.serviceDate);
    const now = new Date();
    
    if (activeTab === 'upcoming') {
      return bookingDate > now && booking.status !== 'completed' && booking.status !== 'cancelled';
    } else {
      return bookingDate < now || booking.status === 'completed' || booking.status === 'cancelled';
    }
  });

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-6">My Bookings</h1>
      
      {/* Tabs */}
      <div className="flex border-b mb-6">
        <button
          className={`pb-2 px-4 text-center ${
            activeTab === 'upcoming'
              ? 'border-b-2 border-sewasetu-primary text-sewasetu-primary font-medium'
              : 'text-gray-500'
          }`}
          onClick={() => setActiveTab('upcoming')}
        >
          Upcoming
        </button>
        <button
          className={`pb-2 px-4 text-center ${
            activeTab === 'past'
              ? 'border-b-2 border-sewasetu-primary text-sewasetu-primary font-medium'
              : 'text-gray-500'
          }`}
          onClick={() => setActiveTab('past')}
        >
          Past
        </button>
      </div>

      {/* Booking list */}
      {isLoading ? (
        <div className="flex justify-center py-10">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-sewasetu-primary"></div>
        </div>
      ) : filteredBookings.length > 0 ? (
        <div className="space-y-4">
          {filteredBookings.map((booking) => (
            <BookingCard
              key={booking.id}
              booking={booking}
              onCancel={handleCancelBooking}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-10">
          <div className="text-5xl mb-4">🗓️</div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            {activeTab === 'upcoming' ? 'No upcoming bookings' : 'No past bookings'}
          </h3>
          <p className="text-gray-500">
            {activeTab === 'upcoming'
              ? 'Book a service to see your upcoming appointments here'
              : 'Your booking history will appear here once you complete services'}
          </p>
        </div>
      )}
    </div>
  );
};

export default BookingsScreen;
