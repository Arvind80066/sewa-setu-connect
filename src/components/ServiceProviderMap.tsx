
import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { ServiceProvider } from '@/services/mockData';
import { getCurrentLocation } from '@/services/locationService';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default marker icons in Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface ServiceProviderMapProps {
  providers: ServiceProvider[];
  onProviderClick?: (provider: ServiceProvider) => void;
}

const ServiceProviderMap: React.FC<ServiceProviderMapProps> = ({ providers, onProviderClick }) => {
  const [userLocation, setUserLocation] = React.useState({ latitude: 12.9716, longitude: 77.5946 });

  React.useEffect(() => {
    const loadUserLocation = async () => {
      const location = await getCurrentLocation();
      setUserLocation(location);
    };
    loadUserLocation();
  }, []);

  return (
    <MapContainer
      center={[userLocation.latitude, userLocation.longitude]}
      zoom={13}
      style={{ height: '400px', width: '100%', borderRadius: '0.5rem' }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      
      {/* User location marker */}
      <Marker position={[userLocation.latitude, userLocation.longitude]}>
        <Popup>Your location</Popup>
      </Marker>

      {/* Service provider markers */}
      {providers.map((provider) => (
        <Marker
          key={provider.id}
          position={[provider.location.latitude, provider.location.longitude]}
          eventHandlers={{
            click: () => onProviderClick?.(provider),
          }}
        >
          <Popup>
            <div>
              <h3 className="font-bold">{provider.name}</h3>
              <p>{provider.skills.join(', ')}</p>
              <p>₹{provider.hourlyRate}/hour</p>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default ServiceProviderMap;
