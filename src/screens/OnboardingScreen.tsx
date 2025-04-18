
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, MapPin, Clock } from 'lucide-react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";

const onboardingSteps = [
  {
    title: "Easily book trusted services",
    description: "Find and book verified service providers in your area",
    icon: Search,
  },
  {
    title: "Find the best workers near you",
    description: "Locate skilled professionals in your neighborhood",
    icon: MapPin,
  },
  {
    title: "Track your service in real-time",
    description: "Stay updated with live progress of your service request",
    icon: Clock,
  },
];

const OnboardingScreen = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const navigate = useNavigate();

  const handleNext = () => {
    if (currentStep < onboardingSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      navigate('/choose-role');
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Carousel className="w-full h-screen" setApi={(api) => {
        api?.on('select', () => {
          setCurrentStep(api.selectedScrollSnap());
        });
      }}>
        <CarouselContent>
          {onboardingSteps.map((step, index) => (
            <CarouselItem key={index}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col items-center justify-center h-screen px-4"
              >
                <step.icon className="w-24 h-24 text-sewasetu-primary mb-8" />
                <h2 className="text-2xl font-bold text-center mb-4">{step.title}</h2>
                <p className="text-muted-foreground text-center mb-8">
                  {step.description}
                </p>
              </motion.div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="absolute bottom-10 w-full px-4">
          <Button 
            className="w-full"
            onClick={handleNext}
          >
            {currentStep === onboardingSteps.length - 1 ? "Let's Go" : "Next"}
          </Button>
        </div>
      </Carousel>
    </div>
  );
};

export default OnboardingScreen;
