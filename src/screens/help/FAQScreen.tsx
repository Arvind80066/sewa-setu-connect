
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const FAQScreen = () => {
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
        <h1 className="text-2xl font-bold">❓ Frequently Asked Questions</h1>
      </div>

      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger>How do I book a service?</AccordionTrigger>
          <AccordionContent>
            You can book a service by browsing through our categories, selecting a service provider, 
            and choosing your preferred time slot. Follow the booking steps and confirm your appointment.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-2">
          <AccordionTrigger>What payment methods are accepted?</AccordionTrigger>
          <AccordionContent>
            We accept various payment methods including credit/debit cards, UPI, and digital wallets. 
            All payments are processed securely through our platform.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-3">
          <AccordionTrigger>Can I reschedule or cancel a booking?</AccordionTrigger>
          <AccordionContent>
            Yes, you can reschedule or cancel a booking through your bookings page. 
            Please note that cancellation policies may apply depending on how close to the appointment time you cancel.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-4">
          <AccordionTrigger>How are service providers verified?</AccordionTrigger>
          <AccordionContent>
            All service providers undergo a thorough verification process including identity verification, 
            background checks, and skill assessment before they can offer services on our platform.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-5">
          <AccordionTrigger>What if I'm not satisfied with the service?</AccordionTrigger>
          <AccordionContent>
            Your satisfaction is our priority. If you're not happy with a service, please contact our 
            support team within 24 hours of service completion, and we'll work to resolve the issue.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default FAQScreen;
