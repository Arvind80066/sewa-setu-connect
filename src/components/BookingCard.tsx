
import React from 'react';
import { Booking, getProviderById } from '@/services/mockData';
import { canCancelBooking } from '@/services/bookingService';
import { format } from 'date-fns';
import StatusBadge from './ui/StatusBadge';

interface BookingCardProps {
  booking: Booking;
  onCancel: (bookingId: string) => void;
}

const BookingCard: React.FC<BookingCardProps> = ({ booking, onCancel }) => {
  const provider = getProviderById(booking.providerId);
  const canCancel = canCancelBooking(booking);
  
  return (
    <div className="sewasetu-card p-4">
      <div className="flex justify-between items-center mb-3">
        <div className="font-medium">{booking.serviceDetails}</div>
        <StatusBadge status={booking.status} />
      </div>
      
      {provider && (
        <div className="flex items-center mb-3">
          <img
            src={provider.photo}
            alt={provider.name}
            className="w-10 h-10 rounded-full mr-3"
          />
          <div>
            <div className="font-medium">{provider.name}</div>
            <div className="text-sm text-gray-500">
              {getCategoryName(provider.categoryId)}
            </div>
          </div>
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
        <div>
          <div className="text-gray-500">Date & Time</div>
          <div>
            {format(new Date(booking.serviceDate), 'PPP')} at{' '}
            {format(new Date(booking.serviceDate), 'p')}
          </div>
        </div>
        
        <div>
          <div className="text-gray-500">Location</div>
          <div>{booking.location}</div>
        </div>
        
        <div>
          <div className="text-gray-500">Booking Date</div>
          <div>{format(new Date(booking.createdAt), 'PPP')}</div>
        </div>
        
        <div>
          <div className="text-gray-500">Price</div>
          <div>₹{booking.price}</div>
        </div>
      </div>
      
      {canCancel && (
        <div className="mt-4">
          <button
            onClick={(e) => {
              e.preventDefault();
              onCancel(booking.id);
            }}
            className="text-sm text-red-600 hover:text-red-800 font-medium"
          >
            Cancel Booking
          </button>
        </div>
      )}
    </div>
  );
};

// Helper function to get category name
function getCategoryName(categoryId: string): string {
  const categories: Record<string, string> = {
    '1': 'Plumber',
    '2': 'Electrician',
    '3': 'Carpenter',
    '4': 'Cleaner',
    '5': 'Painter',
    '6': 'AC Repair',
    '7': 'Pest Control',
    '8': 'Gardener',
  };
  
  return categories[categoryId] || 'Service Provider';
}

export default BookingCard;
