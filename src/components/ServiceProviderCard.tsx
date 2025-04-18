
import React from 'react';
import { Link } from 'react-router-dom';
import { ServiceProvider } from '@/services/mockData';
import StarRating from './ui/StarRating';
import LocationDisplay from './ui/LocationDisplay';
import StatusBadge from './ui/StatusBadge';

interface ServiceProviderCardProps {
  provider: ServiceProvider;
}

const ServiceProviderCard: React.FC<ServiceProviderCardProps> = ({ provider }) => {
  return (
    <Link
      to={`/provider/${provider.id}`}
      className="sewasetu-card p-4 flex flex-col md:flex-row gap-4 w-full"
    >
      <div className="flex-shrink-0">
        <img
          src={provider.photo}
          alt={provider.name}
          className="w-20 h-20 rounded-full object-cover border-2 border-sewasetu-primary"
        />
      </div>
      <div className="flex-1">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
          <h3 className="font-medium text-lg">{provider.name}</h3>
          <div>
            <StatusBadge status={provider.availableNow ? 'available' : 'busy'} />
          </div>
        </div>
        <div className="mt-1">
          <StarRating rating={provider.rating} totalRatings={provider.totalRatings} />
        </div>
        <div className="mt-1 text-sm">
          <span className="font-medium">₹{provider.hourlyRate}</span>/hour • {provider.experience} exp
        </div>
        <div className="mt-1 flex flex-wrap gap-1">
          {provider.skills.slice(0, 3).map((skill, index) => (
            <span
              key={index}
              className="inline-block px-2 py-1 text-xs bg-gray-100 rounded-full mr-1"
            >
              {skill}
            </span>
          ))}
        </div>
        <div className="mt-2">
          <LocationDisplay distance={provider.distance} address={provider.location.address} />
        </div>
      </div>
    </Link>
  );
};

export default ServiceProviderCard;
