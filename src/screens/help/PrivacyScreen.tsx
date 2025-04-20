
import React from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { Mail, MapPin } from 'lucide-react';

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
        <h1 className="text-2xl font-bold">📜 Privacy Policy – SewaSetu</h1>
      </div>

      <div className="prose prose-slate max-w-none">
        <p className="text-gray-600 mb-4">
          Last Updated: April 20, 2025
        </p>

        <p className="mb-6">
          Welcome to SewaSetu! Your privacy is very important to us. This Privacy Policy explains how we collect, use, share, and protect your personal information when you use our mobile application or website.
        </p>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">1. Information We Collect</h2>
          <p className="mb-4">We may collect the following types of information:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Personal Information:</strong> Name, email, phone number, address, etc., when you register or update your profile.</li>
            <li><strong>Location Information:</strong> If you allow location access, we use it to connect you with nearby service providers.</li>
            <li><strong>Usage Data:</strong> Information about how you use our app, including pages viewed, features used, etc.</li>
            <li><strong>Device Information:</strong> Device type, OS, browser type, and other technical data.</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">2. How We Use Your Information</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Create and manage your account.</li>
            <li>Connect you with relevant service providers.</li>
            <li>Improve app performance and user experience.</li>
            <li>Send notifications, updates, and customer support messages.</li>
            <li>Prevent fraud and ensure platform safety.</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">3. Sharing Your Information</h2>
          <p className="mb-4">We may share your information with:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Service Providers:</strong> To help fulfill your service requests.</li>
            <li><strong>Law Enforcement:</strong> If required by law or legal process.</li>
            <li><strong>Third-party tools:</strong> Like analytics or error tracking services (Google Analytics, Firebase, etc.) — only necessary data is shared.</li>
          </ul>
          <p className="mt-4 font-semibold">We never sell your personal data.</p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">4. Data Security</h2>
          <p>We use strong encryption, secure servers, and access controls to protect your data. However, no method is 100% secure, so we cannot guarantee absolute security.</p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">5. Your Rights</h2>
          <p className="mb-4">You can:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>View or update your profile at any time.</li>
            <li>Request deletion of your account and data.</li>
            <li>Control app permissions from your device settings.</li>
          </ul>
          <p className="mt-4">To exercise your rights, contact us at support@sewasetu.app.</p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">6. Children's Privacy</h2>
          <p>SewaSetu is not intended for children under 13. We do not knowingly collect data from children. If we discover such data, we will delete it immediately.</p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">7. Changes to This Policy</h2>
          <p>We may update this Privacy Policy from time to time. We'll notify you of any major changes through the app or email.</p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">8. Contact Us</h2>
          <p className="mb-4">If you have any questions about this Privacy Policy, feel free to contact us:</p>
          <div className="flex flex-col space-y-2">
            <div className="flex items-center gap-2">
              <Mail className="w-5 h-5" />
              <span>Email: support@sewasetu.app</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5" />
              <span>Address: [Your Office Address, if any]</span>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default PrivacyScreen;
