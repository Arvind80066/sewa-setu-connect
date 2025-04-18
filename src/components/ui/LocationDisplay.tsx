
import React from 'react';

interface LocationDisplayProps {
  distance?: number;
  address?: string;
  showIcon?: boolean;
  className?: string;
}

const LocationDisplay: React.FC<LocationDisplayProps> = ({
  distance,
  address,
  showIcon = true,
  className = '',
}) => {
  return (
    <div className={`flex items-center text-sm text-gray-600 ${className}`}>
      {showIcon && (
        <svg
          className="h-4 w-4 mr-1 text-sewasetu-primary"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
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
      )}
      {distance !== undefined && (
        <span className="font-medium">{distance} km away</span>
      )}
      {distance !== undefined && address && <span className="mx-1">·</span>}
      {address && <span>{address}</span>}
    </div>
  );
};

export default LocationDisplay;
