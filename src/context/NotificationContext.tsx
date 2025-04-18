
import React, { createContext, useState, useContext } from 'react';

interface Notification {
  id: string;
  title: string;
  message: string;
  read: boolean;
  createdAt: Date;
}

interface NotificationContextType {
  notifications: Notification[];
  enabled: boolean;
  toggleNotifications: () => void;
  addNotification: (title: string, message: string) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  clearAll: () => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
};

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [enabled, setEnabled] = useState(true);

  // Toggle notifications on/off
  const toggleNotifications = () => {
    setEnabled(!enabled);
    localStorage.setItem('sewasetu_notifications_enabled', (!enabled).toString());
  };

  // Add a new notification
  const addNotification = (title: string, message: string) => {
    if (!enabled) return;
    
    const newNotification: Notification = {
      id: Date.now().toString(),
      title,
      message,
      read: false,
      createdAt: new Date(),
    };
    
    setNotifications(prev => [newNotification, ...prev]);
    
    // Trigger browser notification if supported
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification(title, { body: message });
    }
  };

  // Mark a notification as read
  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  // Mark all notifications as read
  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notif => ({ ...notif, read: true }))
    );
  };

  // Clear all notifications
  const clearAll = () => {
    setNotifications([]);
  };

  return (
    <NotificationContext.Provider 
      value={{ 
        notifications, 
        enabled, 
        toggleNotifications, 
        addNotification, 
        markAsRead,
        markAllAsRead,
        clearAll 
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};
