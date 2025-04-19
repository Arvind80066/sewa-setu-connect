import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Layers } from 'lucide-react'; // Replace LogoIcon with a valid Lucide icon

const SplashScreen = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/onboarding');
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-sewasetu-primary to-blue-600">
      <motion.div
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{
          type: 'spring',
          stiffness: 100,
          damping: 10,
          duration: 3,
        }}
        className="text-center"
      >
        <motion.div
          initial={{ scale: 0.5, rotate: -45 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{
            type: 'spring',
            stiffness: 100,
            damping: 15,
            duration: 1.5,
          }}
          className="mb-4"
        >
          <Layers className="w-24 h-24 text-white" />
        </motion.div>
        <motion.h1
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            delay: 1.5,
            duration: 1.5,
            type: 'spring',
            stiffness: 80,
            damping: 20,
          }}
          className="text-4xl font-bold text-white"
        >
          SewaSetu
        </motion.h1>
      </motion.div>
    </div>
  );
};

export default SplashScreen;
