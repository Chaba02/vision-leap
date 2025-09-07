import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Filter, MapPin, Building, Users, DollarSign, Calendar, Star, Wifi, Car, Utensils, Waves, TreePine, Music, Camera, Heart, ChevronDown } from "lucide-react";
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

  const activeFiltersCount = Object.entries(filters).filter(([key, value]) => {
    if (!value) return false;
    
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
    <div className="bg-card border border-border rounded-2xl shadow-lg overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-border bg-gradient-to-r from-primary/5 to-secondary/5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Filter className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h3 className="font-bold text-foreground text-lg">Filtri di Ricerca</h3>
              <p className="text-sm text-muted-foreground">Trova la location perfetta</p>
            </div>
          </div>
          {activeFiltersCount > 0 && (
            <div className="flex items-center justify-center w-8 h-8 bg-primary text-primary-foreground text-sm rounded-full font-bold">
              {activeFiltersCount}
            </div>
          )}
        </div>
        
        {activeFiltersCount > 0 && (
          <div className="mt-4">
            <Button
              onClick={onClearFilters}
              variant="outline"
              size="sm"
              className="w-full"
            >
              Cancella tutti i filtri
            </Button>
          </div>
        )}
      </div>

      {/* Filter Sections */}
      <div className="divide-y divide-border">
        {/* Location Section */}
        <div className="overflow-hidden">
          <button
            onClick={() => toggleSection('location')}
            className="w-full p-5 flex items-center justify-between text-left hover:bg-muted/30 transition-colors"
          >
            <div className="flex items-center gap-4">
              <div className={`p-2 rounded-lg transition-colors ${
                expandedSections.includes('location') 
                  ? 'bg-primary text-primary-foreground' 
                  : 'bg-muted text-muted-foreground'
              }`}>
                <MapPin className="w-4 h-4" />
              </div>
              <span className="font-semibold text-foreground text-base">Posizione</span>
            </div>
            <ChevronDown className={`w-5 h-5 text-muted-foreground transition-transform ${
              expandedSections.includes('location') ? 'rotate-180' : ''
            }`} />
          </button>
          
          <AnimatePresence>
            {expandedSections.includes('location') && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="px-6 pb-6 bg-muted/10"
              >
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Città</label>
                  <select
                    value={filters.city || City.ALL}
                    onChange={(e) => onFiltersChange({ city: e.target.value as City })}
                    className="w-full bg-background border-2 border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
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
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Details Section */}
        <div className="overflow-hidden">
          <button
            onClick={() => toggleSection('details')}
            className="w-full p-5 flex items-center justify-between text-left hover:bg-muted/30 transition-colors"
          >
            <div className="flex items-center gap-4">
              <div className={`p-2 rounded-lg transition-colors ${
                expandedSections.includes('details') 
                  ? 'bg-primary text-primary-foreground' 
                  : 'bg-muted text-muted-foreground'
              }`}>
                <Calendar className="w-4 h-4" />
              </div>
              <span className="font-semibold text-foreground text-base">Dettagli Evento</span>
            </div>
            <ChevronDown className={`w-5 h-5 text-muted-foreground transition-transform ${
              expandedSections.includes('details') ? 'rotate-180' : ''
            }`} />
          </button>
          
          <AnimatePresence>
            {expandedSections.includes('details') && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="px-6 pb-6 bg-muted/10"
              >
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Tipo Location</label>
                    <select
                      value={filters.venueType || VenueType.ALL}
                      onChange={(e) => onFiltersChange({ venueType: e.target.value as VenueType })}
                      className="w-full bg-background border-2 border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
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
                      className="w-full bg-background border-2 border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
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
                      className="w-full bg-background border-2 border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                    />
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Budget Section */}
        <div className="overflow-hidden">
          <button
            onClick={() => toggleSection('budget')}
            className="w-full p-5 flex items-center justify-between text-left hover:bg-muted/30 transition-colors"
          >
            <div className="flex items-center gap-4">
              <div className={`p-2 rounded-lg transition-colors ${
                expandedSections.includes('budget') 
                  ? 'bg-primary text-primary-foreground' 
                  : 'bg-muted text-muted-foreground'
              }`}>
                <DollarSign className="w-4 h-4" />
              </div>
              <span className="font-semibold text-foreground text-base">Budget</span>
            </div>
            <ChevronDown className={`w-5 h-5 text-muted-foreground transition-transform ${
              expandedSections.includes('budget') ? 'rotate-180' : ''
            }`} />
          </button>
          
          <AnimatePresence>
            {expandedSections.includes('budget') && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="px-6 pb-6 bg-muted/10"
              >
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
                      <label
                        key={option.value}
                        className="flex items-center gap-4 p-4 rounded-xl bg-muted/30 border-2 border-border/30 cursor-pointer hover:bg-muted/50 hover:border-primary/30 transition-all"
                      >
                        <input
                          type="radio"
                          name="priceRange"
                          value={option.value}
                          checked={filters.priceRange === option.value}
                          onChange={(e) => onFiltersChange({ priceRange: e.target.value as PriceRange })}
                          className="sr-only"
                        />
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                          filters.priceRange === option.value 
                            ? 'border-primary bg-primary' 
                            : 'border-border/50'
                        }`}>
                          {filters.priceRange === option.value && (
                            <div className="w-2 h-2 rounded-full bg-primary-foreground" />
                          )}
                        </div>
                        <span className="text-sm font-semibold text-foreground">{option.label}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Features Section */}
        <div className="overflow-hidden">
          <button
            onClick={() => toggleSection('features')}
            className="w-full p-5 flex items-center justify-between text-left hover:bg-muted/30 transition-colors"
          >
            <div className="flex items-center gap-4">
              <div className={`p-2 rounded-lg transition-colors ${
                expandedSections.includes('features') 
                  ? 'bg-primary text-primary-foreground' 
                  : 'bg-muted text-muted-foreground'
              }`}>
                <Star className="w-4 h-4" />
              </div>
              <span className="font-semibold text-foreground text-base">Servizi e Caratteristiche</span>
            </div>
            <ChevronDown className={`w-5 h-5 text-muted-foreground transition-transform ${
              expandedSections.includes('features') ? 'rotate-180' : ''
            }`} />
          </button>
          
          <AnimatePresence>
            {expandedSections.includes('features') && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="px-6 pb-6 bg-muted/10"
              >
                <div>
                  <label className="block text-sm font-medium text-foreground mb-3">Servizi Disponibili</label>
                  <div className="grid grid-cols-1 gap-2">
                    {availableFeatures.map((feature) => (
                      <label
                        key={feature.id}
                        className="flex items-center gap-4 p-4 rounded-xl bg-muted/30 border-2 border-border/30 cursor-pointer hover:bg-muted/50 hover:border-primary/30 transition-all"
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
                        <div className={`w-5 h-5 rounded-lg border-2 flex items-center justify-center transition-all ${
                          filters.features?.includes(feature.label)
                            ? 'border-primary bg-primary text-primary-foreground' 
                            : 'border-border/50'
                        }`}>
                          {filters.features?.includes(feature.label) && (
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                          )}
                        </div>
                        <feature.icon className={`w-5 h-5 transition-colors ${
                          filters.features?.includes(feature.label) ? 'text-primary' : 'text-muted-foreground'
                        }`} />
                        <span className="text-sm font-semibold flex-1 text-foreground">{feature.label}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default SearchFilters;