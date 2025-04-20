
import React from 'react';
import { useNavigate } from 'react-router-dom';

const TermsScreen = () => {
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
        <h1 className="text-2xl font-bold">📋 Terms of Service</h1>
      </div>

      <div className="prose prose-slate max-w-none">
        <p className="text-gray-600 mb-4">
          Last Updated: April 20, 2025
        </p>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">1. Acceptance of Terms</h2>
          <p>
            By accessing and using SewaSetu's services, you agree to be bound by these Terms of Service. 
            If you do not agree to these terms, please do not use our services.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">2. Service Description</h2>
          <p>
            SewaSetu is a platform connecting service providers with users seeking various services. 
            We do not provide services directly but facilitate connections between users and service providers.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">3. User Accounts</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>You must create an account to use our services</li>
            <li>You are responsible for maintaining account security</li>
            <li>Accurate and up-to-date information is required</li>
            <li>One person may only have one active account</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">4. Service Provider Terms</h2>
          <p>
            Service providers must comply with additional terms, including background checks, 
            insurance requirements, and service quality standards.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">5. Payments and Fees</h2>
          <p>
            Users agree to pay for services through our platform. We charge service fees for platform 
            maintenance and support. Cancellation fees may apply as per our cancellation policy.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">6. Dispute Resolution</h2>
          <p>
            Any disputes will be resolved through our platform's dispute resolution process. 
            Users agree to attempt resolution through our system before seeking legal action.
          </p>
        </section>
      </div>
    </div>
  );
};

export default TermsScreen;
