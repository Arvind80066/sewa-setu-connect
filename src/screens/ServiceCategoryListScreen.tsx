
import React from 'react';
import { categories } from '@/services/mockData';
import ServiceCategoryCard from '@/components/ServiceCategoryCard';

const ServiceCategoryListScreen = () => {
  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-6">All Service Categories</h1>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {categories.map((category) => (
          <ServiceCategoryCard key={category.id} category={category} />
        ))}
      </div>
    </div>
  );
};

export default ServiceCategoryListScreen;
