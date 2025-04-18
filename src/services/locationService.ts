
// Mock user's current location (Bangalore coordinates)
const DEFAULT_LOCATION = {
  latitude: 12.9716,
  longitude: 77.5946
};

interface Location {
  latitude: number;
  longitude: number;
  accuracy?: number;
}

export const getCurrentLocation = (): Promise<Location> => {
  return new Promise((resolve, reject) => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude, accuracy } = position.coords;
          resolve({ latitude, longitude, accuracy });
        },
        (error) => {
          console.warn('Error getting location:', error.message);
          // Fall back to default location
          resolve(DEFAULT_LOCATION);
        },
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
      );
    } else {
      console.warn('Geolocation is not supported by this browser');
      resolve(DEFAULT_LOCATION);
    }
  });
};

// Function to get readable address from coordinates (would use Geocoding API in a real app)
export const getAddressFromCoordinates = async (
  latitude: number, 
  longitude: number
): Promise<string> => {
  // In a real app, you would use a geocoding service like Google Maps Geocoding API
  // For this demo, we'll return a mock address
  return 'Near you, Bangalore';
};

// Function to format the location for display
export const formatLocationForDisplay = (location: string): string => {
  if (!location) return 'Location not available';
  return location;
};
