import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface InteractiveMapProps {
  address?: string;
  className?: string;
}

const InteractiveMap: React.FC<InteractiveMapProps> = ({ 
  address = "Via Milano, 127, 22063 Cantù CO", 
  className = "h-64" 
}) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [mapboxToken, setMapboxToken] = useState<string>('');
  const [showTokenInput, setShowTokenInput] = useState(true);

  // Coordinates for Via Milano, 127, 22063 Cantù CO
  const coordinates: [number, number] = [9.14770, 45.72556];

  // Mapbox public token
  const MAPBOX_TOKEN = 'pk.eyJ1IjoiY2hhYmEyMTIiLCJhIjoiY21iYXYzdWU2MTJocjJrcDl2Yzk2aGJiNiJ9.tv5XrXls7Mg7Dv5Pc9w9WQ';

  useEffect(() => {
    setMapboxToken(MAPBOX_TOKEN);
    setShowTokenInput(false);
  }, []);

  const initializeMap = () => {
    if (!mapContainer.current || !mapboxToken) return;

    mapboxgl.accessToken = mapboxToken;
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/light-v11',
      center: coordinates,
      zoom: 15,
      scrollZoom: false
    });

    // Add marker
    new mapboxgl.Marker({
      color: '#1877F2'
    })
    .setLngLat(coordinates)
    .setPopup(
      new mapboxgl.Popup({ offset: 25 })
        .setHTML(`
          <div class="text-center p-2">
            <strong>Moschea di Cantù</strong><br />
            Via Milano, 127<br />22063 Cantù (CO)
          </div>
        `)
    )
    .addTo(map.current);

    // Add navigation controls
    map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

    setShowTokenInput(false);
  };

  useEffect(() => {
    if (mapboxToken && !showTokenInput) {
      initializeMap();
    }

    return () => {
      map.current?.remove();
    };
  }, [mapboxToken, showTokenInput]);

  const handleTokenSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mapboxToken.trim()) {
      initializeMap();
    }
  };

  if (showTokenInput) {
    return (
      <div className={`bg-gray-50 rounded-xl ${className} flex items-center justify-center p-6`}>
        <div className="text-center max-w-md">
          <h4 className="font-medium text-gray-900 mb-3">Configura Mappa Interattiva</h4>
          <p className="text-sm text-gray-600 mb-4">
            Per visualizzare la mappa, inserisci il tuo token pubblico di Mapbox.
            <br />
            <a 
              href="https://mapbox.com/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              Ottieni il token qui →
            </a>
          </p>
          <form onSubmit={handleTokenSubmit} className="space-y-3">
            <Input
              type="text"
              placeholder="pk.eyJ1IjoieW91ci11c2VybmFtZSIsImEiOiJ..."
              value={mapboxToken}
              onChange={(e) => setMapboxToken(e.target.value)}
              className="text-sm"
            />
            <Button type="submit" size="sm" className="w-full">
              Carica Mappa
            </Button>
          </form>
          <p className="text-xs text-gray-500 mt-3">
            {address}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={`rounded-xl overflow-hidden ${className}`}>
      <div ref={mapContainer} className="w-full h-full min-h-0" />
    </div>
  );
};

export default InteractiveMap;