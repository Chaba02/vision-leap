import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Send, Sparkles, MapPin, Users, DollarSign, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SearchFilters, VenueType, City, PriceRange, CapacityRange } from "@/types/search";

const ChatGPTSearch = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Search suggestions based on query
  const suggestions = [
    "Villa con vista mare a Hammamet",
    "Resort di lusso per 200 ospiti",
    "Riad tradizionale a Tunisi",
    "Location economica sotto 3000€",
    "Matrimonio intimo per 50 persone",
    "Palazzo storico a Djerba",
    "Hotel con piscina a Sousse",
    "Villa moderna con giardino",
    "Resort con spa e wellness",
    "Riad con cortile e fontana",
    "Hotel di charme nel centro",
    "Villa di lusso con piscina",
    "Location economica per 100 ospiti",
    "Resort sulla spiaggia di Djerba",
    "Palazzo con terrazza panoramica",
    "Villa con piscina privata"
  ];

  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);

  useEffect(() => {
    if (query.length > 2) {
      const filtered = suggestions.filter(suggestion =>
        suggestion.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredSuggestions(filtered.slice(0, 4));
    } else {
      setFilteredSuggestions(suggestions.slice(0, 4));
    }
  }, [query]);

  const handleSearch = async (searchQuery: string = query) => {
    if (!searchQuery.trim()) return;

    setIsLoading(true);

    // Parse the natural language query
    const parsedFilters = parseSearchQuery(searchQuery);

    // Simulate AI processing delay
    await new Promise(resolve => setTimeout(resolve, 800));

    // Navigate to search page with parsed filters
    const searchParams = new URLSearchParams();
    Object.entries(parsedFilters).forEach(([key, value]) => {
      if (value && value !== City.ALL && value !== VenueType.ALL && value !== PriceRange.ALL && value !== CapacityRange.ALL && value !== '') {
        if (Array.isArray(value) && value.length > 0) {
          searchParams.set(key, value.join(','));
        } else if (!Array.isArray(value)) {
          searchParams.set(key, String(value));
        }
      }
    });

    navigate(`/search?${searchParams.toString()}`);
    setIsLoading(false);
  };

  const parseSearchQuery = (query: string): Partial<SearchFilters> => {
    const lowerQuery = query.toLowerCase();
    const filters: Partial<SearchFilters> = {
      city: City.ALL,
      venueType: VenueType.ALL,
      priceRange: PriceRange.ALL,
      capacity: CapacityRange.ALL,
      features: []
    };

    console.log('🔍 Parsing search query:', query);

    // Parse city with normalized enum values
    const cityMappings: Record<string, City> = {
      'tunisi': City.TUNISI,
      'hammamet': City.HAMMAMET,
      'sousse': City.SOUSSE,
      'djerba': City.DJERBA,
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

    for (const [key, value] of Object.entries(cityMappings)) {
      if (lowerQuery.includes(key)) {
        filters.city = value;
        console.log('🏙️ City detected:', value);
        break;
      }
    }

    // Parse venue type with normalized enum values
    const venueMappings: Record<string, VenueType> = {
      'villa': VenueType.VILLA,
      'resort': VenueType.RESORT,
      'hotel': VenueType.HOTEL,
      'riad': VenueType.RIAD,
      'palazzo': VenueType.PALAZZO,
      'palace': VenueType.PALAZZO,
      'ristorante': VenueType.RESTAURANT
    };

    for (const [key, value] of Object.entries(venueMappings)) {
      if (lowerQuery.includes(key)) {
        filters.venueType = value;
        console.log('🏢 Venue type detected:', value);
        break;
      }
    }

    // Parse capacity with normalized enum values
    const capacityPatterns = [
      /(\d+)\s*(?:persone|ospiti|invitati|guests?)/,
      /per\s*(\d+)/,
      /(\d+)\s*persone/,
      /(\d+)\s*ospiti/
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
        console.log('👥 Capacity detected:', capacity, '->', filters.capacity);
        break;
      }
    }

    // Parse price with normalized enum values
    const pricePatterns = [
      { pattern: /sotto\s*(\d+)/, handler: (price: number) => {
        if (price <= 2000) return PriceRange.BUDGET;
        if (price <= 5000) return PriceRange.MEDIUM;
        if (price <= 7000) return PriceRange.PREMIUM;
        if (price <= 10000) return PriceRange.LUXURY;
        return PriceRange.ULTRA_LUXURY;
      }},
      { pattern: /meno\s*di\s*(\d+)/, handler: (price: number) => {
        if (price <= 2000) return PriceRange.BUDGET;
        if (price <= 5000) return PriceRange.MEDIUM;
        if (price <= 7000) return PriceRange.PREMIUM;
        if (price <= 10000) return PriceRange.LUXURY;
        return PriceRange.ULTRA_LUXURY;
      }},
      { pattern: /fino\s*a\s*(\d+)/, handler: (price: number) => {
        if (price <= 2000) return PriceRange.BUDGET;
        if (price <= 5000) return PriceRange.MEDIUM;
        if (price <= 7000) return PriceRange.PREMIUM;
        if (price <= 10000) return PriceRange.LUXURY;
        return PriceRange.ULTRA_LUXURY;
      }}
    ];

    for (const { pattern, handler } of pricePatterns) {
      const match = lowerQuery.match(pattern);
      if (match) {
        filters.priceRange = handler(parseInt(match[1]));
        console.log('💰 Price range detected:', filters.priceRange);
        break;
      }
    }

    // Parse qualitative price terms with enum values
    if (lowerQuery.includes('economica') || lowerQuery.includes('economico') || lowerQuery.includes('budget')) {
      filters.priceRange = PriceRange.BUDGET;
      console.log('💰 Price detected: economica -> BUDGET');
    } else if (lowerQuery.includes('media') || lowerQuery.includes('medio')) {
      filters.priceRange = PriceRange.MEDIUM;
      console.log('💰 Price detected: media -> MEDIUM');
    } else if (lowerQuery.includes('lusso') || lowerQuery.includes('di lusso') || lowerQuery.includes('premium')) {
      filters.priceRange = PriceRange.PREMIUM;
      console.log('💰 Price detected: lusso -> PREMIUM');
    } else if (lowerQuery.includes('ultra lusso') || lowerQuery.includes('ultra-lusso')) {
      filters.priceRange = PriceRange.ULTRA_LUXURY;
      console.log('💰 Price detected: ultra lusso -> ULTRA_LUXURY');
    } else if (lowerQuery.includes('luxury')) {
      filters.priceRange = PriceRange.LUXURY;
      console.log('💰 Price detected: luxury -> LUXURY');
    }

    // Parse features with standardized names matching SearchFilters
    const featureMappings: Record<string, string> = {
      'vista mare': 'Vista mare panoramica',
      'spiaggia': 'Spiaggia privata',
      'piscina': 'Piscina privata',
      'giardino': 'Giardini curati',
      'parcheggio': 'Parcheggio privato',
      'catering': 'Servizio catering',
      'wifi': 'WiFi gratuito',
      'tradizionale': 'Architettura tradizionale',
      'moderno': 'Design moderno',
      'storico': 'Palazzo storico',
      'intimo': 'Atmosfera romantica',
      'romantico': 'Atmosfera romantica',
      'cortile': 'Cortile interno',
      'terrazza': 'Terrazza privata',
      'panoramica': 'Vista panoramica',
      'musica': 'Sistema audio/video',
      'audio': 'Sistema audio/video',
      'fotografia': 'Aree fotografiche',
      'foto': 'Aree fotografiche'
    };

    const detectedFeatures: string[] = [];
    for (const [key, value] of Object.entries(featureMappings)) {
      if (lowerQuery.includes(key)) {
        detectedFeatures.push(value);
        console.log('✨ Feature detected:', value);
      }
    }
    filters.features = detectedFeatures;

    // Special cases for capacity
    if (lowerQuery.includes('intimo') || lowerQuery.includes('piccolo')) {
      filters.capacity = CapacityRange.INTIMATE;
      console.log('👥 Special case: intimo/piccolo -> INTIMATE');
    } else if (lowerQuery.includes('grande') || lowerQuery.includes('molti ospiti')) {
      filters.capacity = CapacityRange.LARGE;
      console.log('👥 Special case: grande/molti ospiti -> LARGE');
    }

    console.log('🎯 Final parsed filters:', filters);
    return filters;
  };

  const handleSuggestionClick = (suggestion: string) => {
    setQuery(suggestion);
    handleSearch(suggestion);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSearch();
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="relative"
      >
        {/* Main Search Input */}
        <div className={`relative transition-all duration-300 ${isFocused ? 'scale-105' : 'scale-100'}`}>
          <div className={`glass-card p-4 rounded-2xl border-2 transition-all duration-300 ${
            isFocused
              ? 'border-primary/50 shadow-lg shadow-primary/10'
              : 'border-glass-border/30 hover:border-glass-border/50'
          }`}>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Sparkles className="w-5 h-5" />
                <span className="text-sm font-medium">Cerca la tua location ideale</span>
              </div>
            </div>

            <div className="flex items-center gap-3 mt-3">
              <div className="flex-1 relative">
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyPress={handleKeyPress}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setTimeout(() => setIsFocused(false), 200)}
                  placeholder="Es. Villa con vista mare a Hammamet per 100 ospiti..."
                  className="w-full bg-transparent text-lg placeholder:text-muted-foreground/60 focus:outline-none resize-none"
                  disabled={isLoading}
                />
              </div>

              <Button
                onClick={() => handleSearch()}
                disabled={!query.trim() || isLoading}
                className={`btn-primary px-6 py-3 transition-all duration-200 ${
                  isLoading ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {isLoading ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                  />
                ) : (
                  <Send className="w-5 h-5" />
                )}
              </Button>
            </div>
          </div>

          {/* Search Suggestions */}
          <AnimatePresence>
            {isFocused && (
              <motion.div
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="absolute top-full left-0 right-0 mt-2 z-[100] bg-white/95 backdrop-blur-lg border border-glass-border/30 rounded-2xl shadow-lg max-h-64 overflow-auto p-4"
              >
                <div className="space-y-2">
                  <div className="text-sm font-medium text-muted-foreground mb-3">
                    Suggerimenti popolari
                  </div>

                  {filteredSuggestions.map((suggestion, index) => (
                    <motion.button
                      key={suggestion}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      onClick={() => handleSuggestionClick(suggestion)}
                      className="w-full text-left p-3 rounded-lg hover:bg-white/50 transition-colors group"
                    >
                      <div className="flex items-center gap-3">
                        <Search className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                        <span className="text-sm">{suggestion}</span>
                      </div>
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Quick Filters */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex flex-wrap justify-center gap-3 mt-6"
        >
          {[
            { icon: MapPin, label: "Per città", query: "Villa a Hammamet" },
            { icon: Users, label: "Per ospiti", query: "Location per 100 ospiti" },
            { icon: DollarSign, label: "Per budget", query: "Location economica sotto 3000€" },
            { icon: Calendar, label: "Per tipo", query: "Resort di lusso" }
          ].map((filter, index) => (
            <motion.button
              key={filter.label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.7 + index * 0.1 }}
              onClick={() => handleSuggestionClick(filter.query)}
              className="flex items-center gap-2 px-4 py-2 glass-card rounded-full text-sm text-muted-foreground hover:text-foreground hover:bg-white/5 transition-all duration-200 group"
            >
              <filter.icon className="w-4 h-4 group-hover:text-primary transition-colors" />
              {filter.label}
            </motion.button>
          ))}
        </motion.div>

        {/* AI Processing Indicator */}
        <AnimatePresence>
          {isLoading && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="absolute top-full left-0 right-0 mt-2 glass-card rounded-2xl border border-glass-border/30 p-4 z-50"
            >
              <div className="flex items-center gap-3">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full"
                />
                <span className="text-sm text-muted-foreground">
                  Analizzando la tua richiesta...
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default ChatGPTSearch;