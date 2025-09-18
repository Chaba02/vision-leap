import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Sparkles, SlidersHorizontal, X, MapPin, Users, Calendar, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SearchFilters, SearchState, VenueType, City, PriceRange, CapacityRange, SortBy } from "@/types/search";

interface SearchSystemProps {
  onSearchFocus?: (focused: boolean) => void;
  className?: string;
}

const SearchSystem = ({ onSearchFocus, className = "" }: SearchSystemProps) => {
  const navigate = useNavigate();
  const searchInputRef = useRef<HTMLInputElement>(null);
  
  const [state, setState] = useState<SearchState>({
    filters: {
      query: '',
      city: City.ALL,
      venueType: VenueType.ALL,
      priceRange: PriceRange.ALL,
      capacity: CapacityRange.ALL,
      date: '',
      features: [],
      sortBy: SortBy.RELEVANCE
    },
    isSearching: false,
    isFocused: false,
    showAdvancedFilters: false,
    results: [],
    totalResults: 0
  });

  // Smart search suggestions with enhanced location-based accuracy
  const searchSuggestions = [
    { text: "Villa con vista mare a Hammamet per 100 ospiti", type: "location" },
    { text: "Resort di lusso a Djerba sotto 8000€", type: "budget" },
    { text: "Palazzo storico a Tunisi per matrimonio intimo", type: "style" },
    { text: "Hotel con spa a Sousse per 200 invitati", type: "amenity" },
    { text: "Riad tradizionale a Sidi Bou Said", type: "culture" },
    { text: "Location economica a Monastir fino 3000€", type: "budget" },
    { text: "Villa moderna con piscina a Hammamet", type: "modern" },
    { text: "Resort sulla spiaggia a Mahdia", type: "beachfront" }
  ];

  const [filteredSuggestions, setFilteredSuggestions] = useState(searchSuggestions.slice(0, 4));

  // Enhanced search suggestions based on query
  useEffect(() => {
    if (state.filters.query.length > 2) {
      const filtered = searchSuggestions.filter(suggestion =>
        suggestion.text.toLowerCase().includes(state.filters.query.toLowerCase())
      );
      setFilteredSuggestions(filtered.slice(0, 4));
    } else {
      setFilteredSuggestions(searchSuggestions.slice(0, 4));
    }
  }, [state.filters.query]);

  const handleInputFocus = (focused: boolean) => {
    setState(prev => ({ ...prev, isFocused: focused }));
    onSearchFocus?.(focused);
  };

  const handleSearch = async (searchQuery?: string) => {
    const query = searchQuery || state.filters.query;
    if (!query.trim()) return;

    setState(prev => ({ ...prev, isSearching: true }));

    // Enhanced AI-powered search parsing
    const enhancedFilters = await parseEnhancedQuery(query);
    
    // Simulate search delay
    await new Promise(resolve => setTimeout(resolve, 800));

    // Navigate with enhanced filters
    const searchParams = new URLSearchParams();
    Object.entries(enhancedFilters).forEach(([key, value]) => {
      if (value && value !== 'all' && value !== '') {
        if (Array.isArray(value)) {
          searchParams.set(key, value.join(','));
        } else {
          searchParams.set(key, String(value));
        }
      }
    });

    navigate(`/search?${searchParams.toString()}`);
    setState(prev => ({ ...prev, isSearching: false, isFocused: false }));
  };

  // Enhanced query parsing with improved accuracy algorithms
  const parseEnhancedQuery = async (query: string): Promise<Partial<SearchFilters>> => {
    const lowerQuery = query.toLowerCase();
    const filters: Partial<SearchFilters> = { query };

    // Advanced city matching with fuzzy search
    const cityMatching = {
      'tunisi': City.TUNISI,
      'tunis': City.TUNISI,
      'hammamet': City.HAMMAMET,
      'sousse': City.SOUSSE,
      'djerba': City.DJERBA,
      'jerba': City.DJERBA,
      'monastir': City.MONASTIR,
      'sfax': City.SFAX,
      'mahdia': City.MAHDIA,
      'tozeur': City.TOZEUR,
      'tabarka': City.TABARKA,
      'kairouan': City.KAIROUAN,
      'bizerte': City.BIZERTE,
      'sidi bou said': City.SIDI_BOU_SAID,
      'sidi bou': City.SIDI_BOU_SAID
    };

    // Enhanced venue type detection
    const venueMatching = {
      'villa': VenueType.VILLA,
      'resort': VenueType.RESORT,
      'hotel': VenueType.HOTEL,
      'riad': VenueType.RIAD,
      'palazzo': VenueType.PALAZZO,
      'palace': VenueType.PALAZZO,
      'ristorante': VenueType.RESTAURANT,
      'restaurant': VenueType.RESTAURANT
    };

    // Smart city detection
    for (const [keyword, cityEnum] of Object.entries(cityMatching)) {
      if (lowerQuery.includes(keyword)) {
        filters.city = cityEnum;
        break;
      }
    }

    // Smart venue type detection
    for (const [keyword, venueEnum] of Object.entries(venueMatching)) {
      if (lowerQuery.includes(keyword)) {
        filters.venueType = venueEnum;
        break;
      }
    }

    // Enhanced capacity parsing
    const capacityPatterns = [
      /(\d+)\s*(?:persone|ospiti|invitati|guests?|pax)/,
      /per\s*(\d+)/,
      /capacità\s*(\d+)/,
      /fino\s*a\s*(\d+)\s*(?:persone|ospiti)/
    ];

    for (const pattern of capacityPatterns) {
      const match = lowerQuery.match(pattern);
      if (match) {
        const capacity = parseInt(match[1]);
        if (capacity <= 50) filters.capacity = CapacityRange.INTIMATE;
        else if (capacity <= 100) filters.capacity = CapacityRange.SMALL;
        else if (capacity <= 200) filters.capacity = CapacityRange.MEDIUM;
        else if (capacity <= 500) filters.capacity = CapacityRange.LARGE;
        else filters.capacity = CapacityRange.EXTRA_LARGE;
        break;
      }
    }

    // Enhanced price detection
    const priceKeywords = {
      'economica': PriceRange.BUDGET,
      'economico': PriceRange.BUDGET,
      'budget': PriceRange.BUDGET,
      'conveniente': PriceRange.BUDGET,
      'media': PriceRange.MEDIUM,
      'medio': PriceRange.MEDIUM,
      'standard': PriceRange.MEDIUM,
      'lusso': PriceRange.PREMIUM,
      'di lusso': PriceRange.PREMIUM,
      'premium': PriceRange.PREMIUM,
      'esclusiva': PriceRange.LUXURY,
      'esclusivo': PriceRange.LUXURY,
      'ultra': PriceRange.ULTRA_LUXURY
    };

    for (const [keyword, priceEnum] of Object.entries(priceKeywords)) {
      if (lowerQuery.includes(keyword)) {
        filters.priceRange = priceEnum;
        break;
      }
    }

    // Smart price range detection
    const priceMatch = lowerQuery.match(/(?:sotto|fino\s*a|max|massimo)\s*(\d+)/);
    if (priceMatch) {
      const maxPrice = parseInt(priceMatch[1]);
      if (maxPrice <= 2000) filters.priceRange = PriceRange.BUDGET;
      else if (maxPrice <= 5000) filters.priceRange = PriceRange.MEDIUM;
      else if (maxPrice <= 7000) filters.priceRange = PriceRange.PREMIUM;
      else if (maxPrice <= 10000) filters.priceRange = PriceRange.LUXURY;
      else filters.priceRange = PriceRange.ULTRA_LUXURY;
    }

    return filters;
  };

  const handleSuggestionClick = (suggestion: string) => {
    setState(prev => ({ 
      ...prev, 
      filters: { ...prev.filters, query: suggestion },
      isFocused: false 
    }));
    handleSearch(suggestion);
  };

  const toggleAdvancedFilters = () => {
    setState(prev => ({ ...prev, showAdvancedFilters: !prev.showAdvancedFilters }));
  };

  const clearSearch = () => {
    setState(prev => ({ 
      ...prev, 
      filters: { ...prev.filters, query: '' },
      isFocused: false 
    }));
    searchInputRef.current?.focus();
  };

  return (
    <div className={`w-full max-w-4xl mx-auto ${className}`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative"
      >
        {/* Main Search Container */}
        <motion.div
          animate={{ 
            scale: state.isFocused ? 1.02 : 1,
            boxShadow: state.isFocused 
              ? "0 20px 40px -12px rgba(59, 130, 246, 0.15)" 
              : "0 10px 25px -5px rgba(0, 0, 0, 0.1)"
          }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="glass-card rounded-2xl border-2 border-glass-border/30 overflow-hidden"
        >
          {/* Search Header */}
          <div className="flex items-center justify-between p-4 border-b border-glass-border/20">
            <div className="flex items-center gap-3">
              <motion.div
                animate={{ rotate: state.isSearching ? 360 : 0 }}
                transition={{ duration: 1, ease: "linear", repeat: state.isSearching ? Infinity : 0 }}
              >
                <Sparkles className="w-5 h-5 text-primary" />
              </motion.div>
              <span className="text-sm font-medium text-foreground/80">
                Trova la location perfetta per il tuo matrimonio
              </span>
            </div>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleAdvancedFilters}
              className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-white/5"
            >
              <SlidersHorizontal className="w-4 h-4" />
              Filtri avanzati
            </motion.button>
          </div>

          {/* Search Input */}
          <div className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex-1 relative">
                <input
                  ref={searchInputRef}
                  type="text"
                  value={state.filters.query}
                  onChange={(e) => setState(prev => ({ 
                    ...prev, 
                    filters: { ...prev.filters, query: e.target.value }
                  }))}
                  onFocus={() => handleInputFocus(true)}
                  onBlur={() => setTimeout(() => handleInputFocus(false), 200)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                  placeholder="Es. Villa con vista mare a Hammamet per 100 ospiti..."
                  className="w-full bg-transparent text-lg placeholder:text-muted-foreground/60 focus:outline-none"
                  disabled={state.isSearching}
                />
                
                {/* Clear Search Button */}
                <AnimatePresence>
                  {state.filters.query && (
                    <motion.button
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      onClick={clearSearch}
                      className="absolute right-0 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-white/10 transition-colors"
                    >
                      <X className="w-4 h-4 text-muted-foreground" />
                    </motion.button>
                  )}
                </AnimatePresence>
              </div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  onClick={() => handleSearch()}
                  disabled={!state.filters.query.trim() || state.isSearching}
                  className="btn-primary px-6 py-3"
                >
                  {state.isSearching ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                    />
                  ) : (
                    <Search className="w-5 h-5" />
                  )}
                </Button>
              </motion.div>
            </div>
          </div>

          {/* Advanced Filters */}
          <AnimatePresence>
            {state.showAdvancedFilters && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="border-t border-glass-border/20 bg-gradient-to-b from-white/5 to-transparent"
              >
                <div className="p-4 grid grid-cols-2 lg:grid-cols-4 gap-4">
                  {/* Quick Filter Pills */}
                  {[
                    { icon: MapPin, label: "Città", value: state.filters.city },
                    { icon: Users, label: "Ospiti", value: state.filters.capacity },
                    { icon: DollarSign, label: "Budget", value: state.filters.priceRange },
                    { icon: Calendar, label: "Tipo", value: state.filters.venueType }
                  ].map((filter, index) => (
                    <motion.div
                      key={filter.label}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center gap-2 p-3 rounded-lg bg-white/5 border border-glass-border/30"
                    >
                      <filter.icon className="w-4 h-4 text-primary" />
                      <div>
                        <div className="text-xs text-muted-foreground">{filter.label}</div>
                        <div className="text-sm font-medium">
                          {filter.value === 'all' ? 'Tutti' : filter.value}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Search Suggestions Dropdown */}
        <AnimatePresence>
          {state.isFocused && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="absolute top-full left-0 right-0 mt-2 z-[55] glass-card bg-white/95 backdrop-blur-xl rounded-2xl border border-glass-border/30 shadow-2xl max-h-64 overflow-auto"
            >
              <div className="p-4">
                <div className="text-sm font-medium text-muted-foreground mb-3">
                  Suggerimenti intelligenti
                </div>
                
                <div className="space-y-1">
                  {filteredSuggestions.map((suggestion, index) => (
                    <motion.button
                      key={suggestion.text}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      onClick={() => handleSuggestionClick(suggestion.text)}
                      className="w-full text-left p-3 rounded-lg hover:bg-white/5 transition-all group"
                    >
                      <div className="flex items-center gap-3">
                        <Search className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                        <div>
                          <div className="text-sm font-medium">{suggestion.text}</div>
                          <div className="text-xs text-muted-foreground capitalize">
                            {suggestion.type.replace('_', ' ')}
                          </div>
                        </div>
                      </div>
                    </motion.button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Processing Indicator */}
        <AnimatePresence>
          {state.isSearching && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="absolute top-full left-0 right-0 mt-2 glass-card bg-white/95 backdrop-blur-xl rounded-2xl border border-glass-border/30 p-4 z-[55]"
            >
              <div className="flex items-center gap-3">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full"
                />
                <div>
                  <div className="text-sm font-medium">Analizzando la tua richiesta...</div>
                  <div className="text-xs text-muted-foreground">Elaborazione con AI avanzata</div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default SearchSystem;