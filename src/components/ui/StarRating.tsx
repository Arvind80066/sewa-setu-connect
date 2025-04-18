
import React from 'react';

interface StarRatingProps {
  rating: number;
  totalRatings?: number;
  size?: 'sm' | 'md' | 'lg';
  showCount?: boolean;
}

const StarRating: React.FC<StarRatingProps> = ({ 
  rating,
  totalRatings,
  size = 'md',
  showCount = true
}) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating - fullStars >= 0.5;
  
  const sizeClass = {
    sm: 'h-3 w-3',
    md: 'h-4 w-4',
    lg: 'h-5 w-5',
  }[size];

  return (
    <div className="flex items-center">
      <div className="flex">
        {[...Array(5)].map((_, i) => (
          <svg
            key={i}
            className={`${sizeClass} ${
              i < fullStars
                ? 'text-yellow-400'
                : i === fullStars && hasHalfStar
                ? 'text-yellow-400'
                : 'text-gray-300'
            }`}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            {i === fullStars && hasHalfStar ? (
              <path
                fillRule="evenodd"
                d="M10 .3l2.217 6.836h7.177l-5.805 4.237 2.218 6.837L10 14.12 4.194 18.21l2.218-6.837L.607 7.136h7.177L10 .3z"
                clipRule="evenodd"
                fill="url(#half-star)"
              />
            ) : (
              <path
                fillRule="evenodd"
                d="M10 .3l2.217 6.836h7.177l-5.805 4.237 2.218 6.837L10 14.12 4.194 18.21l2.218-6.837L.607 7.136h7.177L10 .3z"
                clipRule="evenodd"
              />
            )}
            {i === fullStars && hasHalfStar && (
              <defs>
                <linearGradient id="half-star" x1="0" x2="100%" y1="0" y2="0">
                  <stop offset="50%" stopColor="currentColor" />
                  <stop offset="50%" stopColor="#D1D5DB" />
                </linearGradient>
              </defs>
            )}
          </svg>
        ))}
      </div>
      {showCount && (
        <div className="ml-1.5 text-sm text-gray-600">
          {rating.toFixed(1)}
          {totalRatings !== undefined && (
            <span className="ml-1 text-gray-400">({totalRatings})</span>
          )}
        </div>
      )}
    </div>
  );
};

export default StarRating;
