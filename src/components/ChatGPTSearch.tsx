import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Send, Sparkles, MapPin, Users, DollarSign, Calendar, Settings, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SearchFilters, VenueType, City, PriceRange, CapacityRange } from "@/types/search";
import { 
  serializeFiltersToURL, 
  getCityFromText, 
  getVenueTypeFromText, 
  getCapacityFromNumber,
  getPriceRangeFromNumber,
  getPriceRangeFromText,
  getFeaturesFromText
} from "@/lib/search-utils";

const ChatGPTSearch = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  
  // Advanced filters state
  const [filters, setFilters] = useState<Partial<SearchFilters>>({
    city: City.ALL,
    venueType: VenueType.ALL,
    capacity: CapacityRange.ALL,
    priceRange: PriceRange.ALL,
    features: []
  });
  
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
    if (!searchQuery.trim() && filters.city === City.ALL && filters.venueType === VenueType.ALL && filters.capacity === CapacityRange.ALL && filters.priceRange === PriceRange.ALL) return;

    setIsLoading(true);

    // Combine parsed filters from query with manual advanced filters
    const parsedFilters = searchQuery.trim() ? parseSearchQuery(searchQuery) : {};
    const combinedFilters: Partial<SearchFilters> = {
      ...parsedFilters,
      // Advanced filters override parsed ones if they're not ALL
      city: filters.city !== City.ALL ? filters.city : parsedFilters.city || City.ALL,
      venueType: filters.venueType !== VenueType.ALL ? filters.venueType : parsedFilters.venueType || VenueType.ALL,
      capacity: filters.capacity !== CapacityRange.ALL ? filters.capacity : parsedFilters.capacity || CapacityRange.ALL,
      priceRange: filters.priceRange !== PriceRange.ALL ? filters.priceRange : parsedFilters.priceRange || PriceRange.ALL,
      features: [...(filters.features || []), ...(parsedFilters.features || [])]
    };

    // Simulate AI processing delay
    await new Promise(resolve => setTimeout(resolve, 800));

    // Navigate to search page with standardized URL parameters
    const searchParams = serializeFiltersToURL(combinedFilters);
    navigate(`/search?${searchParams.toString()}`);
    setIsLoading(false);
  };

  const parseSearchQuery = (query: string): Partial<SearchFilters> => {
    const lowerQuery = query.toLowerCase();
    const filters: Partial<SearchFilters> = {
      // DON'T include query parameter in URL - only parsed filters
      city: getCityFromText(query),
      venueType: getVenueTypeFromText(query),
      priceRange: PriceRange.ALL,
      capacity: CapacityRange.ALL,
      features: getFeaturesFromText(query)
    };

    // Parse capacity from numbers in text
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
        filters.capacity = getCapacityFromNumber(capacity);
        break;
      }
    }

    // Parse numerical price ranges 
    const pricePatterns = [
      { pattern: /sotto\s*(\d+)/, handler: getPriceRangeFromNumber },
      { pattern: /meno\s*di\s*(\d+)/, handler: getPriceRangeFromNumber },
      { pattern: /fino\s*a\s*(\d+)/, handler: getPriceRangeFromNumber }
    ];

    for (const { pattern, handler } of pricePatterns) {
      const match = lowerQuery.match(pattern);
      if (match) {
        filters.priceRange = handler(parseInt(match[1]));
        break;
      }
    }

    // Parse qualitative price terms if no numerical price found
    if (filters.priceRange === PriceRange.ALL) {
      filters.priceRange = getPriceRangeFromText(query);
    }


    // Special cases for capacity (override numerical detection)
    if (lowerQuery.includes('intimo') || lowerQuery.includes('piccolo')) {
      filters.capacity = CapacityRange.INTIMATE;
    } else if (lowerQuery.includes('grande') || lowerQuery.includes('molti ospiti')) {
      filters.capacity = CapacityRange.LARGE;
    }
    return filters;
  };

  const handleSuggestionClick = (suggestion: string) => {
    setQuery(suggestion);
    handleSearch(suggestion);
  };

  // Advanced filters handlers
  const updateFilter = <K extends keyof SearchFilters>(key: K, value: SearchFilters[K]) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({
      city: City.ALL,
      venueType: VenueType.ALL,
      capacity: CapacityRange.ALL,
      priceRange: PriceRange.ALL,
      features: []
    });
    setQuery("");
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
          <div className="flex flex-wrap justify-center gap-3">
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
            
            {/* Advanced Filters Toggle */}
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.1 }}
              onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
              className={`flex items-center gap-2 px-4 py-2 glass-card rounded-full text-sm transition-all duration-200 group ${
                showAdvancedFilters 
                  ? 'text-primary border-primary/30 bg-primary/5' 
                  : 'text-muted-foreground hover:text-foreground hover:bg-white/5'
              }`}
            >
              <Settings className="w-4 h-4 group-hover:text-primary transition-colors" />
              Filtri Avanzati
            </motion.button>
          </div>
        </motion.div>

        {/* Advanced Filters Panel */}
        <AnimatePresence>
          {showAdvancedFilters && (
            <motion.div
              initial={{ opacity: 0, y: -10, height: 0 }}
              animate={{ opacity: 1, y: 0, height: "auto" }}
              exit={{ opacity: 0, y: -10, height: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-6 glass-card rounded-2xl border border-glass-border/30 p-6 overflow-hidden"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium">Filtri Avanzati</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearFilters}
                  className="text-muted-foreground hover:text-foreground"
                >
                  <X className="w-4 h-4 mr-2" />
                  Pulisci
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* City Filter */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">Città</label>
                  <Select value={filters.city} onValueChange={(value) => updateFilter('city', value as City)}>
                    <SelectTrigger className="glass-card border-glass-border">
                      <SelectValue placeholder="Seleziona città" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value={City.ALL}>Tutte le città</SelectItem>
                      <SelectItem value={City.TUNISI}>Tunisi</SelectItem>
                      <SelectItem value={City.HAMMAMET}>Hammamet</SelectItem>
                      <SelectItem value={City.SOUSSE}>Sousse</SelectItem>
                      <SelectItem value={City.DJERBA}>Djerba</SelectItem>
                      <SelectItem value={City.MONASTIR}>Monastir</SelectItem>
                      <SelectItem value={City.SFAX}>Sfax</SelectItem>
                      <SelectItem value={City.MAHDIA}>Mahdia</SelectItem>
                      <SelectItem value={City.TOZEUR}>Tozeur</SelectItem>
                      <SelectItem value={City.TABARKA}>Tabarka</SelectItem>
                      <SelectItem value={City.KAIROUAN}>Kairouan</SelectItem>
                      <SelectItem value={City.BIZERTE}>Bizerte</SelectItem>
                      <SelectItem value={City.SIDI_BOU_SAID}>Sidi Bou Said</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Venue Type Filter */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">Tipo Location</label>
                  <Select value={filters.venueType} onValueChange={(value) => updateFilter('venueType', value as VenueType)}>
                    <SelectTrigger className="glass-card border-glass-border">
                      <SelectValue placeholder="Tipo location" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value={VenueType.ALL}>Tutti i tipi</SelectItem>
                      <SelectItem value={VenueType.VILLA}>Villa</SelectItem>
                      <SelectItem value={VenueType.RESORT}>Resort</SelectItem>
                      <SelectItem value={VenueType.HOTEL}>Hotel</SelectItem>
                      <SelectItem value={VenueType.RIAD}>Riad</SelectItem>
                      <SelectItem value={VenueType.PALAZZO}>Palazzo</SelectItem>
                      <SelectItem value={VenueType.RESTAURANT}>Ristorante</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Capacity Filter */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">Capacità</label>
                  <Select value={filters.capacity} onValueChange={(value) => updateFilter('capacity', value as CapacityRange)}>
                    <SelectTrigger className="glass-card border-glass-border">
                      <SelectValue placeholder="Numero ospiti" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value={CapacityRange.ALL}>Qualsiasi capacità</SelectItem>
                      <SelectItem value={CapacityRange.INTIMATE}>Intimo (fino a 50)</SelectItem>
                      <SelectItem value={CapacityRange.SMALL}>Piccolo (50-100)</SelectItem>
                      <SelectItem value={CapacityRange.MEDIUM}>Medio (100-200)</SelectItem>
                      <SelectItem value={CapacityRange.LARGE}>Grande (200-500)</SelectItem>
                      <SelectItem value={CapacityRange.EXTRA_LARGE}>Extra Large (500+)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Price Range Filter */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">Budget</label>
                  <Select value={filters.priceRange} onValueChange={(value) => updateFilter('priceRange', value as PriceRange)}>
                    <SelectTrigger className="glass-card border-glass-border">
                      <SelectValue placeholder="Range di prezzo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value={PriceRange.ALL}>Qualsiasi budget</SelectItem>
                      <SelectItem value={PriceRange.BUDGET}>Budget (€500-2.000)</SelectItem>
                      <SelectItem value={PriceRange.MEDIUM}>Medio (€2.000-5.000)</SelectItem>
                      <SelectItem value={PriceRange.PREMIUM}>Premium (€5.000-7.000)</SelectItem>
                      <SelectItem value={PriceRange.LUXURY}>Lusso (€7.000-10.000)</SelectItem>
                      <SelectItem value={PriceRange.ULTRA_LUXURY}>Ultra Lusso (€10.000+)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Apply Filters Button */}
              <div className="flex justify-center mt-6">
                <Button
                  onClick={() => handleSearch()}
                  className="btn-primary px-8 py-3"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2"
                    />
                  ) : (
                    <Search className="w-5 h-5 mr-2" />
                  )}
                  Cerca con Filtri
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

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