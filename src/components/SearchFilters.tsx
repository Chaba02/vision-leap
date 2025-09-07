// ===== FIXED SearchFilters.tsx =====
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Filter, MapPin, Building, Users, DollarSign, Calendar, Star, Wifi, Car, Utensils, Waves, TreePine, Music, Camera, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SearchFilters as SearchFiltersType, VenueType, City, PriceRange, CapacityRange } from "@/types/search";

interface SearchFiltersProps {
  filters: Partial<SearchFiltersType>;
  onFiltersChange: (filters: Partial<SearchFiltersType>) => void;
  onClearFilters: () => void;
}

const SearchFilters = ({ filters, onFiltersChange, onClearFilters }: SearchFiltersProps) => {
  const [expandedSections, setExpandedSections] = useState<string[]>(['location', 'details']);

  const toggleSection = (section: string) => {
    setExpandedSections(prev => 
      prev.includes(section) 
        ? prev.filter(s => s !== section)
        : [...prev, section]
    );
  };

  const availableFeatures = [
    { id: 'vista-mare', label: 'Vista mare panoramica', icon: Waves },
    { id: 'piscina', label: 'Piscina privata', icon: Waves },
    { id: 'giardini', label: 'Giardini curati', icon: TreePine },
    { id: 'parcheggio', label: 'Parcheggio privato', icon: Car },
    { id: 'catering', label: 'Servizio catering', icon: Utensils },
    { id: 'wifi', label: 'WiFi gratuito', icon: Wifi },
    { id: 'musica', label: 'Sistema audio/video', icon: Music },
    { id: 'fotografia', label: 'Aree fotografiche', icon: Camera },
    { id: 'romantico', label: 'Atmosfera romantica', icon: Heart }
  ];

  const filterSections = [
    {
      id: 'location',
      title: 'Posizione',
      icon: MapPin,
      content: (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Città</label>
            <select
              value={filters.city || City.ALL}
              onChange={(e) => onFiltersChange({ city: e.target.value as City })}
              className="w-full bg-glass-card border border-glass-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
            >
              <option value={City.ALL}>Tutte le città</option>
              <option value={City.TUNISI}>Tunisi</option>
              <option value={City.HAMMAMET}>Hammamet</option>
              <option value={City.SOUSSE}>Sousse</option>
              <option value={City.DJERBA}>Djerba</option>
              <option value={City.MONASTIR}>Monastir</option>
              <option value={City.SFAX}>Sfax</option>
              <option value={City.MAHDIA}>Mahdia</option>
              <option value={City.TOZEUR}>Tozeur</option>
              <option value={City.TABARKA}>Tabarka</option>
              <option value={City.KAIROUAN}>Kairouan</option>
              <option value={City.BIZERTE}>Bizerte</option>
              <option value={City.SIDI_BOU_SAID}>Sidi Bou Said</option>
            </select>
          </div>
        </div>
      )
    },
    {
      id: 'details',
      title: 'Dettagli Evento',
      icon: Calendar,
      content: (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Tipo Location</label>
            <select
              value={filters.venueType || VenueType.ALL}
              onChange={(e) => onFiltersChange({ venueType: e.target.value as VenueType })}
              className="w-full bg-glass-card border border-glass-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
            >
              <option value={VenueType.ALL}>Tutte le tipologie</option>
              <option value={VenueType.VILLA}>Villa</option>
              <option value={VenueType.RESORT}>Resort</option>
              <option value={VenueType.HOTEL}>Hotel</option>
              <option value={VenueType.RIAD}>Riad</option>
              <option value={VenueType.PALAZZO}>Palazzo</option>
              <option value={VenueType.RESTAURANT}>Ristorante</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Numero Ospiti</label>
            <select
              value={filters.capacity || CapacityRange.ALL}
              onChange={(e) => onFiltersChange({ capacity: e.target.value as CapacityRange })}
              className="w-full bg-glass-card border border-glass-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
            >
              <option value={CapacityRange.ALL}>Qualsiasi numero</option>
              <option value={CapacityRange.INTIMATE}>Fino a 50 ospiti</option>
              <option value={CapacityRange.SMALL}>50 - 100 ospiti</option>
              <option value={CapacityRange.MEDIUM}>100 - 200 ospiti</option>
              <option value={CapacityRange.LARGE}>200 - 500 ospiti</option>
              <option value={CapacityRange.EXTRA_LARGE}>Più di 500 ospiti</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Data Evento</label>
            <input
              type="date"
              value={filters.date || ''}
              onChange={(e) => onFiltersChange({ date: e.target.value })}
              className="w-full bg-glass-card border border-glass-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>
        </div>
      )
    },
    {
      id: 'budget',
      title: 'Budget',
      icon: DollarSign,
      content: (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-3">Fascia di Prezzo</label>
            <div className="space-y-2">
              {[
                { value: PriceRange.ALL, label: 'Qualsiasi budget' },
                { value: PriceRange.BUDGET, label: '€0 - €2.000 (Economico)' },
                { value: PriceRange.MEDIUM, label: '€2.000 - €5.000 (Medio)' },
                { value: PriceRange.PREMIUM, label: '€5.000 - €7.000 (Premium)' },
                { value: PriceRange.LUXURY, label: '€7.000 - €10.000 (Lusso)' },
                { value: PriceRange.ULTRA_LUXURY, label: '€10.000+ (Ultra Lusso)' }
              ].map((option) => (
                <motion.label
                  key={option.value}
                  whileHover={{ scale: 1.02 }}
                  className="flex items-center gap-3 p-3 rounded-lg bg-glass-card/50 border border-glass-border/30 cursor-pointer hover:bg-glass-card transition-colors"
                >
                  <input
                    type="radio"
                    name="priceRange"
                    value={option.value}
                    checked={filters.priceRange === option.value}
                    onChange={(e) => onFiltersChange({ priceRange: e.target.value as PriceRange })}
                    className="sr-only"
                  />
                  <div className={`w-4 h-4 rounded-full border-2 ${
                    filters.priceRange === option.value 
                      ? 'border-primary bg-primary' 
                      : 'border-glass-border'
                  }`}>
                    {filters.priceRange === option.value && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="w-full h-full rounded-full bg-white scale-50"
                      />
                    )}
                  </div>
                  <span className="text-sm font-medium">{option.label}</span>
                </motion.label>
              ))}
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'features',
      title: 'Servizi e Caratteristiche',
      icon: Star,
      content: (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-3">Servizi Disponibili</label>
            <div className="grid grid-cols-1 gap-2">
              {availableFeatures.map((feature) => (
                <motion.label
                  key={feature.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center gap-3 p-3 rounded-lg bg-glass-card/50 border border-glass-border/30 cursor-pointer hover:bg-glass-card transition-colors"
                >
                  <input
                    type="checkbox"
                    checked={filters.features?.includes(feature.label) || false}
                    onChange={(e) => {
                      const currentFeatures = filters.features || [];
                      if (e.target.checked) {
                        onFiltersChange({ 
                          features: [...currentFeatures, feature.label] 
                        });
                      } else {
                        onFiltersChange({ 
                          features: currentFeatures.filter(f => f !== feature.label) 
                        });
                      }
                    }}
                    className="sr-only"
                  />
                  <div className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                    filters.features?.includes(feature.label)
                      ? 'border-primary bg-primary text-white' 
                      : 'border-glass-border'
                  }`}>
                    {filters.features?.includes(feature.label) && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="text-xs"
                      >
                        ✓
                      </motion.div>
                    )}
                  </div>
                  <feature.icon className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium flex-1">{feature.label}</span>
                </motion.label>
              ))}
            </div>
          </div>
        </div>
      )
    }
  ];

  // FIX: Use proper enum comparison instead of string comparison
  const activeFiltersCount = Object.entries(filters).filter(([key, value]) => {
    if (!value) return false;
    
    // Handle enum values properly
    if (key === 'city' && value !== City.ALL) return true;
    if (key === 'venueType' && value !== VenueType.ALL) return true;
    if (key === 'priceRange' && value !== PriceRange.ALL) return true;
    if (key === 'capacity' && value !== CapacityRange.ALL) return true;
    if (key === 'date' && value !== '') return true;
    if (key === 'features' && Array.isArray(value) && value.length > 0) return true;
    if (key === 'query' && value !== '') return true;
    
    return false;
  }).length;

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
      className="glass-card rounded-2xl border border-glass-border/30 overflow-hidden"
    >
      {/* Header */}
      <div className="p-4 border-b border-glass-border/20">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Filter className="w-5 h-5 text-primary" />
            <h3 className="font-semibold text-foreground">Filtri di Ricerca</h3>
          </div>
          {activeFiltersCount > 0 && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="px-2 py-1 bg-primary text-white text-xs rounded-full font-medium"
            >
              {activeFiltersCount}
            </motion.div>
          )}
        </div>
        
        {activeFiltersCount > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="mt-3"
          >
            <Button
              onClick={onClearFilters}
              variant="outline"
              size="sm"
              className="w-full"
            >
              Cancella tutti i filtri
            </Button>
          </motion.div>
        )}
      </div>

      {/* Filter Sections */}
      <div className="divide-y divide-glass-border/20">
        {filterSections.map((section) => (
          <motion.div key={section.id} className="overflow-hidden">
            <motion.button
              whileHover={{ backgroundColor: "rgba(255, 255, 255, 0.02)" }}
              onClick={() => toggleSection(section.id)}
              className="w-full p-4 flex items-center justify-between text-left transition-colors"
            >
              <div className="flex items-center gap-3">
                <section.icon className="w-4 h-4 text-primary" />
                <span className="font-medium text-foreground">{section.title}</span>
              </div>
              <motion.div
                animate={{ rotate: expandedSections.includes(section.id) ? 180 : 0 }}
                transition={{ duration: 0.2 }}
                className="text-muted-foreground"
              >
                ▼
              </motion.div>
            </motion.button>
            
            <AnimatePresence>
              {expandedSections.includes(section.id) && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="px-4 pb-4"
                >
                  {section.content}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

// ===== URL PARSER UTILITY =====
export const parseUrlParams = (searchParams: URLSearchParams): Partial<SearchFiltersType> => {
  const filters: Partial<SearchFiltersType> = {};

  // Parse query
  const query = searchParams.get('query');
  if (query) filters.query = query;

  // Parse city
  const city = searchParams.get('city');
  if (city && Object.values(City).includes(city as City)) {
    filters.city = city as City;
  }

  // Parse venue type
  const venueType = searchParams.get('venueType');
  if (venueType && Object.values(VenueType).includes(venueType as VenueType)) {
    filters.venueType = venueType as VenueType;
  }

  // Parse price range
  const priceRange = searchParams.get('priceRange');
  if (priceRange && Object.values(PriceRange).includes(priceRange as PriceRange)) {
    filters.priceRange = priceRange as PriceRange;
  }

  // Parse capacity
  const capacity = searchParams.get('capacity');
  if (capacity && Object.values(CapacityRange).includes(capacity as CapacityRange)) {
    filters.capacity = capacity as CapacityRange;
  }

  // Parse date
  const date = searchParams.get('date');
  if (date) filters.date = date;

  // Parse features
  const features = searchParams.get('features');
  if (features) {
    filters.features = features.split(',').filter(f => f.trim() !== '');
  }

  return filters;
};

// ===== LOCATION FILTERING UTILITY =====
export const filterLocations = (locations: any[], filters: Partial<SearchFiltersType>) => {
  return locations.filter(location => {
    // City filter
    if (filters.city && filters.city !== City.ALL) {
      if (location.city !== filters.city) return false;
    }

    // Venue type filter
    if (filters.venueType && filters.venueType !== VenueType.ALL) {
      if (location.type !== filters.venueType) return false;
    }

    // Capacity filter
    if (filters.capacity && filters.capacity !== CapacityRange.ALL) {
      const capacity = location.capacity;
      switch (filters.capacity) {
        case CapacityRange.INTIMATE:
          if (capacity > 50) return false;
          break;
        case CapacityRange.SMALL:
          if (capacity <= 50 || capacity > 100) return false;
          break;
        case CapacityRange.MEDIUM:
          if (capacity <= 100 || capacity > 200) return false;
          break;
        case CapacityRange.LARGE:
          if (capacity <= 200 || capacity > 500) return false;
          break;
        case CapacityRange.EXTRA_LARGE:
          if (capacity <= 500) return false;
          break;
      }
    }

    // Price range filter
    if (filters.priceRange && filters.priceRange !== PriceRange.ALL) {
      const price = location.priceRange?.min || 0;
      switch (filters.priceRange) {
        case PriceRange.BUDGET:
          if (price > 2000) return false;
          break;
        case PriceRange.MEDIUM:
          if (price <= 2000 || price > 5000) return false;
          break;
        case PriceRange.PREMIUM:
          if (price <= 5000 || price > 7000) return false;
          break;
        case PriceRange.LUXURY:
          if (price <= 7000 || price > 10000) return false;
          break;
        case PriceRange.ULTRA_LUXURY:
          if (price <= 10000) return false;
          break;
      }
    }

    // Features filter
    if (filters.features && filters.features.length > 0) {
      const hasAllFeatures = filters.features.every(feature => 
        location.features?.includes(feature)
      );
      if (!hasAllFeatures) return false;
    }

    // Query filter (search in name and description)
    if (filters.query && filters.query.trim() !== '') {
      const query = filters.query.toLowerCase();
      const matchesName = location.name.toLowerCase().includes(query);
      const matchesDescription = location.description?.toLowerCase().includes(query);
      if (!matchesName && !matchesDescription) return false;
    }

    return true;
  });
};

export default SearchFilters;