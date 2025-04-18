
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Briefcase, BriefcaseBusiness } from 'lucide-react';
import { Button } from '@/components/ui/button';

const ChooseRoleScreen = () => {
  const navigate = useNavigate();

  const handleHireClick = () => {
    navigate('/signup');
  };

  const handleFindJobClick = () => {
    window.location.href = 'https://play.google.com/store/apps/details?id=com.sewasetu.worker';
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      <h1 className="text-3xl font-bold text-center mb-8">Choose Your Role</h1>
      
      <motion.div 
        className="space-y-4 w-full max-w-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Button
          variant="outline"
          className="w-full h-32 flex flex-col items-center justify-center gap-4"
          onClick={handleHireClick}
        >
          <Briefcase className="w-12 h-12" />
          <span className="text-lg">Want to Hire</span>
        </Button>

        <Button
          variant="outline"
          className="w-full h-32 flex flex-col items-center justify-center gap-4"
          onClick={handleFindJobClick}
        >
          <BriefcaseBusiness className="w-12 h-12" />
          <span className="text-lg">Find a Job</span>
        </Button>
      </motion.div>
    </div>
  );
};

export default ChooseRoleScreen;
