
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { MessageCircle, Shield, Phone, FileText } from 'lucide-react';

const HelpCenterScreen = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Help Center</h1>
      
      <div className="grid gap-4">
        <Card className="p-4">
          <div className="flex items-start space-x-4">
            <MessageCircle className="w-6 h-6 text-blue-500" />
            <div>
              <h3 className="font-semibold mb-1">Customer Support</h3>
              <p className="text-sm text-gray-600 mb-2">
                Need help with your booking? Our support team is here 24/7.
              </p>
              <Button variant="outline" size="sm">Contact Support</Button>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <Link to="/help/privacy" className="flex items-start space-x-4">
            <Shield className="w-6 h-6 text-green-500" />
            <div>
              <h3 className="font-semibold mb-1">Privacy Policy</h3>
              <p className="text-sm text-gray-600">
                Learn how we protect and handle your data
              </p>
            </div>
          </Link>
        </Card>

        <Card className="p-4">
          <div className="flex items-start space-x-4">
            <FileText className="w-6 h-6 text-orange-500" />
            <div>
              <h3 className="font-semibold mb-1">FAQs</h3>
              <p className="text-sm text-gray-600">
                Find answers to commonly asked questions
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default HelpCenterScreen;
