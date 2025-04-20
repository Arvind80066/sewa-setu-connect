import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Mail, MessageSquare, Phone, Whatsapp } from 'lucide-react';

const ContactSupportScreen = () => {
  const navigate = useNavigate();

  const openWhatsApp = () => {
    // Replace with your actual WhatsApp number
    window.location.href = 'https://wa.me/+1234567890?text=I%20need%20support';
  };

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
        <h1 className="text-2xl font-bold">📞 Contact Support</h1>
      </div>

      <div className="space-y-4">
        <Card className="p-6">
          <div className="flex items-center gap-4 mb-4">
            <MessageSquare className="w-6 h-6 text-blue-500" />
            <h2 className="text-xl font-semibold">Chat Support</h2>
          </div>
          <p className="text-gray-600 mb-4">
            Get instant help from our support team through chat. Available 24/7.
          </p>
          <Button className="w-full">Start Chat</Button>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-4 mb-4">
            <Mail className="w-6 h-6 text-green-500" />
            <h2 className="text-xl font-semibold">Email Support</h2>
          </div>
          <p className="text-gray-600 mb-4">
            Send us an email at support@sewasetu.app. We typically respond within 24 hours.
          </p>
          <Button 
            variant="outline" 
            className="w-full"
            onClick={() => window.location.href = 'mailto:support@sewasetu.app'}
          >
            Send Email
          </Button>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-4 mb-4">
            <Phone className="w-6 h-6 text-red-500" />
            <h2 className="text-xl font-semibold">Phone Support</h2>
          </div>
          <p className="text-gray-600 mb-4">
            Call us directly for urgent matters. Available Mon-Sat, 9 AM - 6 PM.
          </p>
          <Button 
            variant="outline" 
            className="w-full"
            onClick={() => window.location.href = 'tel:+1234567890'}
          >
            Call Support
          </Button>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-4 mb-4">
            <Whatsapp className="w-6 h-6 text-green-600" />
            <h2 className="text-xl font-semibold">WhatsApp Support</h2>
          </div>
          <p className="text-gray-600 mb-4">
            Get instant support through WhatsApp. Quick and convenient communication.
          </p>
          <Button 
            className="w-full" 
            variant="outline"
            onClick={openWhatsApp}
          >
            Start WhatsApp Chat
          </Button>
        </Card>
      </div>
    </div>
  );
};

export default ContactSupportScreen;
