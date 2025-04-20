
import React from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const PrivacyScreen = () => {
  const navigate = useNavigate();

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
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
        <h1 className="text-2xl font-bold">Privacy Policy</h1>
      </div>

      <div className="prose prose-slate max-w-none">
        <p className="text-gray-600 mb-4">
          Last updated: April 20, 2025
        </p>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Overview</h2>
          <p className="mb-4">
            This Privacy Policy describes how we collect, use, and handle your information 
            when you use our service booking platform.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Information We Collect</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Basic profile information (name, email, phone number)</li>
            <li>Service booking history and preferences</li>
            <li>Location data (with your permission)</li>
            <li>Device information and usage statistics</li>
          </ul>
        </section>
      </div>
    </div>
  );
};

export default PrivacyScreen;
