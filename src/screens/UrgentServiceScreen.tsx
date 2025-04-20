
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

const UrgentServiceScreen = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Request submitted",
        description: "We'll connect you with an available service provider shortly."
      });
      navigate('/bookings');
    }, 1500);
  };

  return (
    <div className="container mx-auto px-4 py-6 pb-20">
      <div className="flex items-center mb-6">
        <button 
          onClick={() => navigate(-1)}
          className="mr-2 p-2 rounded-full hover:bg-gray-100"
        >
          <svg
            className="w-5 h-5"
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
        </button>
        <h1 className="text-2xl font-bold">Urgent Service Request</h1>
      </div>

      <div className="bg-orange-50 rounded-lg p-4 mb-6">
        <h2 className="text-lg font-medium mb-2">Priority Service</h2>
        <p className="text-gray-600">
          Our providers will respond to your request within 30 minutes. 
          Priority service has an additional charge.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="service" className="block text-sm font-medium mb-1">
            Type of Service Required
          </label>
          <Input id="service" placeholder="e.g., Plumbing, Electrical, Cleaning" required />
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium mb-1">
            Describe the Issue
          </label>
          <Textarea 
            id="description" 
            placeholder="Please provide details about your urgent request" 
            rows={4}
            required
          />
        </div>

        <div>
          <label htmlFor="address" className="block text-sm font-medium mb-1">
            Service Address
          </label>
          <Input id="address" placeholder="Enter your complete address" required />
        </div>

        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <span className="animate-spin h-4 w-4 mr-2 border-2 border-white border-t-transparent rounded-full"></span>
              Processing...
            </>
          ) : (
            "Request Urgent Service"
          )}
        </Button>
      </form>
    </div>
  );
};

export default UrgentServiceScreen;
