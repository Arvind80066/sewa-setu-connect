import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Mail, MessageSquare, Phone } from 'lucide-react';

// ✅ Custom WhatsApp icon component
const WhatsAppIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    fill="currentColor"
    className="text-green-600"
    viewBox="0 0 24 24"
  >
    <path d="M20.52 3.48A11.85 11.85 0 0012 0C5.37 0 0 5.37 0 12a11.85 11.85 0 001.66 6.11L0 24l5.89-1.56A11.85 11.85 0 0012 24c6.63 0 12-5.37 12-12a11.85 11.85 0 00-3.48-8.52zM12 21.53a9.54 9.54 0 01-4.82-1.29l-.34-.2-3.49.92.93-3.39-.22-.35A9.54 9.54 0 1121.54 12 9.56 9.56 0 0112 21.53zm5.27-7.3l-1.48-.72a1.1 1.1 0 00-1.26.21l-.65.66a7.42 7.42 0 01-3.61-3.6l.66-.66a1.09 1.09 0 00.2-1.26l-.72-1.48a1.1 1.1 0 00-1.56-.47 4.89 4.89 0 00-2.12 4.12 8.44 8.44 0 008.43 8.43 4.9 4.9 0 004.13-2.12 1.1 1.1 0 00-.48-1.56z"/>
  </svg>
);

const ContactSupportScreen = () => {
  const navigate = useNavigate();

  const openWhatsApp = () => {
    const message = encodeURIComponent('Hi! I need support from Sewasetu.');
    window.open(`https://wa.me/918006670417?text=${message}`, '_blank');
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
            <WhatsAppIcon />
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
