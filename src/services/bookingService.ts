
import { Booking } from './mockData';

// Create a new booking
export const createBooking = async (bookingData: Omit<Booking, 'id' | 'createdAt'>): Promise<Booking> => {
  // In a real app, this would be an API call to create a booking
  return new Promise((resolve) => {
    setTimeout(() => {
      const newBooking: Booking = {
        ...bookingData,
        id: `booking_${Date.now()}`,
        createdAt: new Date(),
      };
      
      // In a real app, we would save this to Firebase/database
      // For now, we'll log it and return it
      console.log('New booking created:', newBooking);
      resolve(newBooking);
    }, 1000);
  });
};

// Cancel a booking
export const cancelBooking = async (bookingId: string): Promise<boolean> => {
  // In a real app, this would be an API call to update the booking status
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(`Booking ${bookingId} cancelled`);
      resolve(true);
    }, 1000);
  });
};

// Check if a booking can be cancelled (less than 24 hours before service date)
export const canCancelBooking = (booking: Booking): boolean => {
  if (booking.status !== 'pending' && booking.status !== 'confirmed') {
    return false;
  }
  
  const now = new Date();
  const serviceDate = new Date(booking.serviceDate);
  const timeDifference = serviceDate.getTime() - now.getTime();
  const hoursDifference = timeDifference / (1000 * 60 * 60);
  
  return hoursDifference >= 2; // Can cancel if more than 2 hours before service
};
