
import React from 'react';
import { Link } from 'react-router-dom';
import { ServiceCategory } from '@/services/mockData';

interface ServiceCategoryCardProps {
  category: ServiceCategory;
}

const ServiceCategoryCard: React.FC<ServiceCategoryCardProps> = ({ category }) => {
  return (
    <Link
      to={`/category/${category.id}`}
      className="sewasetu-card p-4 flex flex-col items-center justify-center text-center transition-all hover:scale-105"
    >
      <div className="text-3xl mb-2">{category.icon}</div>
      <h3 className="font-medium text-lg text-sewasetu-dark mb-1">
        {category.name}
      </h3>
      <p className="text-sm text-gray-500">{category.description}</p>
    </Link>
  );
};

export default ServiceCategoryCard;
