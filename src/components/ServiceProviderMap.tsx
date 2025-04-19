
import React from 'react';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import { ServiceProvider } from '@/services/mockData';
import { getCurrentLocation } from '@/services/locationService';

interface ServiceProviderMapProps {
  providers: ServiceProvider[];
  onProviderClick?: (provider: ServiceProvider) => void;
}

const ServiceProviderMap: React.FC<ServiceProviderMapProps> = ({ providers, onProviderClick }) => {
  const [userLocation, setUserLocation] = React.useState({ latitude: 12.9716, longitude: 77.5946 });
  const [selectedProvider, setSelectedProvider] = React.useState<ServiceProvider | null>(null);

  React.useEffect(() => {
    const loadUserLocation = async () => {
      const location = await getCurrentLocation();
      setUserLocation(location);
    };
    loadUserLocation();
  }, []);

  const center = {
    lat: userLocation.latitude,
    lng: userLocation.longitude
  };

  const mapContainerStyle = {
    height: '400px',
    width: '100%',
    borderRadius: '0.5rem'
  };

  return (
    <LoadScript googleMapsApiKey="AIzaSyAIwufZ3oKFnuGQdYquZt5v0Tlx55HMg9Q">
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={13}
        center={center}
        options={{
          disableDefaultUI: false,
          zoomControl: true,
          scrollwheel: false,
          styles: [
            {
              featureType: 'poi',
              elementType: 'labels',
              stylers: [{ visibility: 'off' }]
            }
          ]
        }}
      >
        {/* User location marker */}
        <Marker
          position={center}
          icon={{
            url: 'https://maps.google.com/mapfiles/ms/icons/blue-dot.png'
          }}
        />

        {/* Service provider markers */}
        {providers.map((provider) => (
          <Marker
            key={provider.id}
            position={{
              lat: provider.location.latitude,
              lng: provider.location.longitude
            }}
            onClick={() => {
              setSelectedProvider(provider);
              onProviderClick?.(provider);
            }}
          />
        ))}

        {/* Info window for selected provider */}
        {selectedProvider && (
          <InfoWindow
            position={{
              lat: selectedProvider.location.latitude,
              lng: selectedProvider.location.longitude
            }}
            onCloseClick={() => setSelectedProvider(null)}
          >
            <div>
              <h3 className="font-bold">{selectedProvider.name}</h3>
              <p>{selectedProvider.skills.join(', ')}</p>
              <p>₹{selectedProvider.hourlyRate}/hour</p>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </LoadScript>
  );
};

export default ServiceProviderMap;

