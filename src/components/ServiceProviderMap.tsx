
import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { ServiceProvider } from '@/services/mockData';
import { getCurrentLocation } from '@/services/locationService';

interface ServiceProviderMapProps {
  providers: ServiceProvider[];
  onProviderClick?: (provider: ServiceProvider) => void;
}

const ServiceProviderMap: React.FC<ServiceProviderMapProps> = ({ providers, onProviderClick }) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [mapboxToken, setMapboxToken] = useState('');

  useEffect(() => {
    const loadMap = async () => {
      if (!mapContainer.current || !mapboxToken) return;

      const userLocation = await getCurrentLocation();

      mapboxgl.accessToken = mapboxToken;
      
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/streets-v12',
        center: [userLocation.longitude, userLocation.latitude],
        zoom: 12
      });

      // Add user location marker
      new mapboxgl.Marker({ color: '#FF0000' })
        .setLngLat([userLocation.longitude, userLocation.latitude])
        .setPopup(new mapboxgl.Popup().setHTML('<p>Your location</p>'))
        .addTo(map.current);

      // Add markers for providers
      providers.forEach(provider => {
        const marker = new mapboxgl.Marker({ color: '#4CAF50' })
          .setLngLat([provider.location.longitude, provider.location.latitude])
          .setPopup(
            new mapboxgl.Popup().setHTML(`
              <div>
                <h3 class="font-bold">${provider.name}</h3>
                <p>${provider.skills.join(', ')}</p>
                <p>₹${provider.hourlyRate}/hour</p>
              </div>
            `)
          )
          .addTo(map.current);

        // Add click handler
        marker.getElement().addEventListener('click', () => {
          onProviderClick?.(provider);
        });
      });

      // Add navigation controls
      map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');
    };

    loadMap();

    return () => {
      if (map.current) {
        map.current.remove();
      }
    };
  }, [providers, mapboxToken, onProviderClick]);

  // Temporary token input for development
  if (!mapboxToken) {
    return (
      <div className="p-4">
        <p className="mb-2 text-sm text-gray-600">
          Please enter your Mapbox public token to view the map. You can get it from mapbox.com
        </p>
        <input
          type="text"
          placeholder="Enter Mapbox token"
          className="w-full p-2 border rounded"
          onChange={(e) => setMapboxToken(e.target.value)}
        />
      </div>
    );
  }

  return <div ref={mapContainer} className="w-full h-[400px] rounded-lg" />;
};

export default ServiceProviderMap;
