
import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { MessageSquare, Shield, FileText, HelpCircle } from 'lucide-react';

const HelpCenterScreen = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Help Center</h1>
      
      <div className="grid gap-4">
        <Card className="p-4">
          <Link to="/help/contact" className="flex items-start space-x-4">
            <MessageSquare className="w-6 h-6 text-blue-500" />
            <div>
              <h3 className="font-semibold mb-1">Contact Support</h3>
              <p className="text-sm text-gray-600">
                Need help? Our support team is available 24/7
              </p>
            </div>
          </Link>
        </Card>

        <Card className="p-4">
          <Link to="/help/faq" className="flex items-start space-x-4">
            <HelpCircle className="w-6 h-6 text-green-500" />
            <div>
              <h3 className="font-semibold mb-1">Frequently Asked Questions</h3>
              <p className="text-sm text-gray-600">
                Find answers to common questions
              </p>
            </div>
          </Link>
        </Card>

        <Card className="p-4">
          <Link to="/help/privacy" className="flex items-start space-x-4">
            <Shield className="w-6 h-6 text-purple-500" />
            <div>
              <h3 className="font-semibold mb-1">Privacy Policy</h3>
              <p className="text-sm text-gray-600">
                Learn how we protect and handle your data
              </p>
            </div>
          </Link>
        </Card>

        <Card className="p-4">
          <Link to="/help/terms" className="flex items-start space-x-4">
            <FileText className="w-6 h-6 text-orange-500" />
            <div>
              <h3 className="font-semibold mb-1">Terms of Service</h3>
              <p className="text-sm text-gray-600">
                Read our terms and conditions
              </p>
            </div>
          </Link>
        </Card>
      </div>
    </div>
  );
};

export default HelpCenterScreen;
