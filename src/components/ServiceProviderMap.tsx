
import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
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

// This component is needed to update the map center after the map is initialized
const MapCenterUpdater = ({ center }: { center: [number, number] }) => {
  const map = useMap();
  React.useEffect(() => {
    map.setView(center);
  }, [center, map]);
  return null;
};

const ServiceProviderMap: React.FC<ServiceProviderMapProps> = ({ providers, onProviderClick }) => {
  const [userLocation, setUserLocation] = React.useState({ latitude: 12.9716, longitude: 77.5946 });

  React.useEffect(() => {
    const loadUserLocation = async () => {
      const location = await getCurrentLocation();
      setUserLocation(location);
    };
    loadUserLocation();
  }, []);

  const position: [number, number] = [userLocation.latitude, userLocation.longitude];

  return (
    <div style={{ height: '400px', width: '100%', borderRadius: '0.5rem' }}>
      <MapContainer
        style={{ height: '100%', width: '100%' }}
        zoom={13}
        scrollWheelZoom={false}
      >
        {/* Use the updater component to set the center */}
        <MapCenterUpdater center={position} />
        
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        
        {/* User location marker */}
        <Marker position={position}>
          <Popup>Your location</Popup>
        </Marker>

        {/* Service provider markers */}
        {providers.map((provider) => {
          const providerPosition: [number, number] = [
            provider.location.latitude,
            provider.location.longitude
          ];
          
          return (
            <Marker
              key={provider.id}
              position={providerPosition}
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
          );
        })}
      </MapContainer>
    </div>
  );
};

export default ServiceProviderMap;
