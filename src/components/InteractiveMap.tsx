
import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { MapPin } from 'lucide-react';

// Fix per l'icona del marker di Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface InteractiveMapProps {
  address?: string;
  className?: string;
}

const InteractiveMap: React.FC<InteractiveMapProps> = ({ 
  address = "Via Milano, 127, 22063 Cantù CO", 
  className = "h-64" 
}) => {
  // Coordinates for Via Milano, 127, 22063 Cantù CO
  const coordinates: [number, number] = [45.72556, 9.14770];

  return (
    <div className={`rounded-xl overflow-hidden ${className}`}>
      <MapContainer
        center={coordinates}
        zoom={15}
        scrollWheelZoom={false}
        className="w-full h-full min-h-0 z-0"
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={coordinates}>
          <Popup>
            <div className="text-center p-2">
              <div className="flex items-center justify-center mb-2">
                <MapPin className="w-4 h-4 text-primary mr-1" />
                <strong>Moschea di Cantù</strong>
              </div>
              <div className="text-sm text-gray-600">
                Via Milano, 127<br />
                22063 Cantù (CO)
              </div>
            </div>
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default InteractiveMap;
