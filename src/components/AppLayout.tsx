
import React from 'react';
import { Outlet } from 'react-router-dom';
import BottomNavigation from './BottomNavigation';

const AppLayout = () => {
  return (
    <div className="min-h-screen pb-16"> {/* pb-16 adds padding to account for the bottom nav */}
      <Outlet />
      <BottomNavigation />
    </div>
  );
};

export default AppLayout;
