import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { MapPin, Navigation, Maximize2, Minimize2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Location } from "@/data/locations";

interface MapViewProps {
  locations: Location[];
}

// Mock coordinates for different cities in Tunisia
const cityCoordinates: { [key: string]: { lat: number; lng: number } } = {
  'Tunisi': { lat: 36.8065, lng: 10.1815 },
  'Hammamet': { lat: 36.4, lng: 10.6167 },
  'Sousse': { lat: 35.8256, lng: 10.6411 },
  'Monastir': { lat: 35.7781, lng: 10.8262 },
  'Djerba': { lat: 33.8078, lng: 10.8592 },
  'Sidi Bou Said': { lat: 36.8667, lng: 10.3333 }
};

const MapView = ({ locations }: MapViewProps) => {
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const mapRef = useRef<HTMLDivElement>(null);

  // Calculate center of all locations
  const getMapCenter = () => {
    if (locations.length === 0) return { lat: 36.8065, lng: 10.1815 }; // Default to Tunis
    
    const coords = locations.map(loc => cityCoordinates[loc.city] || { lat: 36.8065, lng: 10.1815 });
    const avgLat = coords.reduce((sum, coord) => sum + coord.lat, 0) / coords.length;
    const avgLng = coords.reduce((sum, coord) => sum + coord.lng, 0) / coords.length;
    
    return { lat: avgLat, lng: avgLng };
  };

  const center = getMapCenter();

  // Mock map implementation - in a real app you'd use Google Maps, Mapbox, etc.
  useEffect(() => {
    if (mapRef.current) {
      // This is a placeholder - in a real implementation you'd initialize the map here
      console.log('Map initialized with center:', center);
    }
  }, [center]);

  const handleLocationClick = (location: Location) => {
    setSelectedLocation(location);
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  if (locations.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-12"
      >
        <div className="glass-card p-12 rounded-2xl">
          <MapPin className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-xl font-semibold text-foreground mb-2">
            Nessuna location da mostrare
          </h3>
          <p className="text-muted-foreground">
            Modifica i filtri per vedere le location sulla mappa
          </p>
        </div>
      </motion.div>
    );
  }

  return (
    <div className={`space-y-4 ${isFullscreen ? 'fixed inset-0 z-50 bg-background p-4' : ''}`}>
      {/* Map Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-foreground">
            Mappa delle location
          </h2>
          <p className="text-sm text-muted-foreground">
            {locations.length} location trovate
          </p>
        </div>
        
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={toggleFullscreen}
            className="btn-secondary"
          >
            {isFullscreen ? (
              <>
                <Minimize2 className="w-4 h-4 mr-1" />
                Riduci
              </>
            ) : (
              <>
                <Maximize2 className="w-4 h-4 mr-1" />
                Espandi
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Map Container */}
      <div className={`relative ${isFullscreen ? 'h-[calc(100vh-8rem)]' : 'h-96'} rounded-2xl overflow-hidden`}>
        {/* Mock Map Background */}
        <div 
          ref={mapRef}
          className="w-full h-full bg-gradient-to-br from-blue-100 to-green-100 relative"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23d1d5db' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}
        >
          {/* Map Center Indicator */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="w-4 h-4 bg-primary rounded-full border-2 border-white shadow-lg animate-pulse" />
          </div>

          {/* Location Markers */}
          {locations.map((location, index) => {
            const coords = cityCoordinates[location.city] || { lat: 36.8065, lng: 10.1815 };
            // Mock positioning - in a real map you'd convert lat/lng to pixel coordinates
            const x = 20 + (index * 15) % 60;
            const y = 20 + (index * 20) % 60;
            
            return (
              <motion.div
                key={location.id}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="absolute cursor-pointer group"
                style={{ left: `${x}%`, top: `${y}%` }}
                onClick={() => handleLocationClick(location)}
              >
                <div className="relative">
                  <div className="w-8 h-8 bg-primary rounded-full border-2 border-white shadow-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                    <MapPin className="w-4 h-4 text-white" />
                  </div>
                  <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    {location.name}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Map Controls */}
        <div className="absolute top-4 right-4 space-y-2">
          <Button
            variant="outline"
            size="sm"
            className="bg-white/90 backdrop-blur-sm"
            onClick={() => {
              // Center map on all locations
              console.log('Centering map on locations');
            }}
          >
            <Navigation className="w-4 h-4" />
          </Button>
        </div>

        {/* Map Legend */}
        <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-3 text-xs">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-3 h-3 bg-primary rounded-full" />
            <span>Location disponibili</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-blue-500 rounded-full" />
            <span>Centro mappa</span>
          </div>
        </div>
      </div>

      {/* Selected Location Details */}
      {selectedLocation && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card p-6 rounded-2xl"
        >
          <div className="flex items-start gap-4">
            <img
              src={selectedLocation.image}
              alt={selectedLocation.name}
              className="w-20 h-20 object-cover rounded-lg"
            />
            <div className="flex-1">
              <h3 className="font-semibold text-foreground mb-2">
                {selectedLocation.name}
              </h3>
              <p className="text-sm text-muted-foreground mb-2">
                {selectedLocation.city} • {selectedLocation.type}
              </p>
              <p className="text-sm text-muted-foreground mb-3">
                {selectedLocation.description}
              </p>
              <div className="flex items-center gap-4 text-sm">
                <span className="text-primary font-semibold">
                  {selectedLocation.priceRange}
                </span>
                <span className="text-muted-foreground">
                  Fino a {selectedLocation.capacity} ospiti
                </span>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setSelectedLocation(null)}
              className="btn-secondary"
            >
              Chiudi
            </Button>
          </div>
        </motion.div>
      )}

      {/* Location List (for mobile) */}
      <div className="lg:hidden space-y-3">
        <h3 className="font-semibold text-foreground">Location trovate</h3>
        {locations.map((location) => (
          <motion.div
            key={location.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card p-4 rounded-lg cursor-pointer hover:bg-white/5 transition-colors"
            onClick={() => handleLocationClick(location)}
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                <MapPin className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-foreground">{location.name}</h4>
                <p className="text-sm text-muted-foreground">{location.city}</p>
              </div>
              <span className="text-sm text-primary font-semibold">
                {location.priceRange}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default MapView;
