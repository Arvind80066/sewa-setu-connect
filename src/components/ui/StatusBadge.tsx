
import React from 'react';
import { cn } from '@/lib/utils';

type StatusType = 'pending' | 'confirmed' | 'completed' | 'cancelled' | 'available' | 'busy';

interface StatusBadgeProps {
  status: StatusType;
  className?: string;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status, className }) => {
  const getStatusStyles = () => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'confirmed':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'completed':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'cancelled':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'available':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'busy':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusText = () => {
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  return (
    <span
      className={cn(
        'px-2.5 py-0.5 text-xs font-medium rounded-full border',
        getStatusStyles(),
        className
      )}
    >
      {getStatusText()}
    </span>
  );
};

export default StatusBadge;
