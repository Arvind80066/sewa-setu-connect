
import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useTheme } from '@/context/ThemeContext';
import { useNotifications } from '@/context/NotificationContext';
import { useToast } from '@/hooks/use-toast';
import { Link } from 'react-router-dom';

const ProfileScreen = () => {
  const { user, logout, updateProfile } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const { enabled: notificationsEnabled, toggleNotifications } = useNotifications();
  const { toast } = useToast();
  
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(user?.name || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [address, setAddress] = useState(user?.address || '');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
      toast({ title: "Logged out successfully" });
    } catch (error) {
      console.error('Logout error:', error);
      toast({ 
        title: "Error", 
        description: "Could not log out. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await updateProfile({ name, phone, address });
      setIsEditing(false);
      toast({ title: "Profile updated successfully" });
    } catch (error) {
      console.error('Update profile error:', error);
      toast({ 
        title: "Error", 
        description: "Could not update profile. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-6">Profile</h1>

      {/* Profile Info */}
      <div className="sewasetu-card p-6 mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-medium">Personal Information</h2>
          {!isEditing && (
            <button 
              onClick={() => setIsEditing(true)}
              className="text-sm text-sewasetu-primary font-medium"
            >
              Edit
            </button>
          )}
        </div>

        {isEditing ? (
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="sewasetu-input"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  value={user?.email}
                  className="sewasetu-input bg-gray-50"
                  readOnly
                  disabled
                />
                <p className="text-xs text-gray-500 mt-1">
                  Email cannot be changed
                </p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="sewasetu-input"
                  placeholder="Enter phone number"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Address
                </label>
                <textarea
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="sewasetu-input"
                  rows={3}
                  placeholder="Enter your address"
                />
              </div>
              
              <div className="flex gap-3">
                <button 
                  type="submit"
                  className="sewasetu-btn-primary flex-1"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Saving...' : 'Save Changes'}
                </button>
                <button 
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-5 py-2.5 border border-gray-300 text-gray-700 rounded-lg flex-1"
                >
                  Cancel
                </button>
              </div>
            </div>
          </form>
        ) : (
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-500">Full Name</p>
              <p className="font-medium">{user?.name}</p>
            </div>
            
            <div>
              <p className="text-sm text-gray-500">Email</p>
              <p className="font-medium">{user?.email}</p>
            </div>
            
            <div>
              <p className="text-sm text-gray-500">Phone Number</p>
              <p className="font-medium">{user?.phone || 'Not provided'}</p>
            </div>
            
            <div>
              <p className="text-sm text-gray-500">Address</p>
              <p className="font-medium">{user?.address || 'Not provided'}</p>
            </div>
          </div>
        )}
      </div>

      {/* Settings */}
      <div className="sewasetu-card p-6 mb-6">
        <h2 className="text-lg font-medium mb-4">App Settings</h2>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Dark Mode</p>
              <p className="text-sm text-gray-500">Switch between light and dark theme</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                className="sr-only peer" 
                checked={theme === 'dark'}
                onChange={toggleTheme}
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-sewasetu-primary rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-sewasetu-primary"></div>
            </label>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Notifications</p>
              <p className="text-sm text-gray-500">Enable push notifications</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                className="sr-only peer" 
                checked={notificationsEnabled}
                onChange={toggleNotifications}
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-sewasetu-primary rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-sewasetu-primary"></div>
            </label>
          </div>
        </div>
      </div>

      {/* Help & Support */}
      <div className="sewasetu-card p-6 mb-6">
        <h2 className="text-lg font-medium mb-4">Help & Support</h2>
        
        <div className="space-y-3">
          <Link to="/help/faq" className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg">
            <span>Frequently Asked Questions</span>
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
            </svg>
          </Link>
          
          <Link to="/help/contact" className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg">
            <span>Contact Support</span>
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
            </svg>
          </Link>
          
          <Link to="/help/terms" className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg">
            <span>Terms of Service</span>
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
            </svg>
          </Link>
          
          <Link to="/help/privacy" className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg">
            <span>Privacy Policy</span>
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
            </svg>
          </Link>
        </div>
      </div>

      {/* Logout Button */}
      <button
        onClick={handleLogout}
        className="w-full py-3 border border-red-500 text-red-500 font-medium rounded-lg hover:bg-red-50 transition-colors"
      >
        Logout
      </button>
    </div>
  );
};

export default ProfileScreen;
