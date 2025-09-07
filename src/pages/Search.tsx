import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import SearchFilters from "@/components/SearchFilters";
import SearchResults from "@/components/SearchResults";
import MapView from "@/components/MapView";
import { mockLocations, Location } from "@/data/locations";
import { SearchFilters as SearchFiltersType } from "@/types/search";

const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [locations, setLocations] = useState<Location[]>(mockLocations);
  const [filteredLocations, setFilteredLocations] = useState<Location[]>(mockLocations);
  const [filters, setFilters] = useState<SearchFiltersType>({
    query: searchParams.get('query') || '',
    city: searchParams.get('city') as any || 'all',
    venueType: searchParams.get('venueType') as any || 'all',
    priceRange: searchParams.get('priceRange') as any || 'all',
    capacity: searchParams.get('capacity') as any || 'all',
    date: searchParams.get('date') || '',
    features: searchParams.get('features')?.split(',') || [],
    sortBy: searchParams.get('sortBy') as any || 'relevance'
  });

  const [viewMode, setViewMode] = useState<'grid' | 'map'>('grid');
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Apply enhanced filters and search
  useEffect(() => {
    let filtered = [...locations];

    // Text search across multiple fields
    if (filters.query) {
      const query = filters.query.toLowerCase();
      filtered = filtered.filter(location => 
        location.name.toLowerCase().includes(query) ||
        location.city.toLowerCase().includes(query) ||
        location.type.toLowerCase().includes(query) ||
        location.description?.toLowerCase().includes(query) ||
        location.features?.some(feature => feature.toLowerCase().includes(query))
      );
    }

    // City filter
    if (filters.city && filters.city !== 'all') {
      filtered = filtered.filter(location => location.city === filters.city);
    }

    // Venue type filter
    if (filters.venueType && filters.venueType !== 'all') {
      filtered = filtered.filter(location => location.type === filters.venueType);
    }

    // Price range filter with enhanced logic
    if (filters.priceRange && filters.priceRange !== 'all') {
      const [min, max] = filters.priceRange.split('-').map(Number);
      filtered = filtered.filter(location => {
        const priceMatch = location.priceRange.match(/€(\d+)-?(\d+)?/);
        if (!priceMatch) return false;
        
        const locationMinPrice = parseInt(priceMatch[1]);
        const locationMaxPrice = priceMatch[2] ? parseInt(priceMatch[2]) : locationMinPrice;
        
        if (max) {
          return locationMinPrice <= max && locationMaxPrice >= min;
        } else {
          return locationMinPrice >= min;
        }
      });
    }

    // Capacity filter with enhanced ranges
    if (filters.capacity && filters.capacity !== 'all') {
      const [min, max] = filters.capacity.split('-').map(Number);
      filtered = filtered.filter(location => {
        const capacity = location.capacity;
        return capacity >= min && (max ? capacity <= max : true);
      });
    }

    // Features filter
    if (filters.features && filters.features.length > 0) {
      filtered = filtered.filter(location => 
        filters.features.every(feature => 
          location.features?.includes(feature)
        )
      );
    }

    // Enhanced sorting
    switch (filters.sortBy) {
      case 'price_asc':
        filtered.sort((a, b) => {
          const priceA = parseInt(a.priceRange.match(/€(\d+)/)?.[1] || '0');
          const priceB = parseInt(b.priceRange.match(/€(\d+)/)?.[1] || '0');
          return priceA - priceB;
        });
        break;
      case 'price_desc':
        filtered.sort((a, b) => {
          const priceA = parseInt(a.priceRange.match(/€(\d+)/)?.[1] || '0');
          const priceB = parseInt(b.priceRange.match(/€(\d+)/)?.[1] || '0');
          return priceB - priceA;
        });
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'name':
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'capacity':
        filtered.sort((a, b) => b.capacity - a.capacity);
        break;
      default:
        // Relevance - keep original order with query-based relevance
        if (filters.query) {
          filtered.sort((a, b) => {
            const aRelevance = calculateRelevance(a, filters.query);
            const bRelevance = calculateRelevance(b, filters.query);
            return bRelevance - aRelevance;
          });
        }
        break;
    }

    setFilteredLocations(filtered);
  }, [filters, locations]);

  // Calculate search relevance score
  const calculateRelevance = (location: Location, query: string): number => {
    const lowerQuery = query.toLowerCase();
    let score = 0;

    // Name match (highest weight)
    if (location.name.toLowerCase().includes(lowerQuery)) score += 10;
    
    // City match
    if (location.city.toLowerCase().includes(lowerQuery)) score += 8;
    
    // Type match
    if (location.type.toLowerCase().includes(lowerQuery)) score += 6;
    
    // Features match
    location.features?.forEach(feature => {
      if (feature.toLowerCase().includes(lowerQuery)) score += 4;
    });
    
    // Description match
    if (location.description?.toLowerCase().includes(lowerQuery)) score += 2;

    return score;
  };

  // Update URL when filters change
  useEffect(() => {
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value && value !== 'all' && value !== '') {
        if (Array.isArray(value)) {
          if (value.length > 0) params.set(key, value.join(','));
        } else {
          params.set(key, value);
        }
      }
    });
    setSearchParams(params);
  }, [filters, setSearchParams]);

  const handleFiltersChange = (newFilters: Partial<SearchFiltersType>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  const clearFilters = () => {
    setFilters({
      query: '',
      city: 'all' as any,
      venueType: 'all' as any,
      priceRange: 'all' as any,
      capacity: 'all' as any,
      date: '',
      features: [],
      sortBy: 'relevance' as any
    });
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <div className="pt-24 pb-12 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header with collapsing behavior */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <motion.h1 
              animate={{ 
                fontSize: isCollapsed ? "1.5rem" : "1.875rem",
                marginBottom: isCollapsed ? "0.25rem" : "0.5rem" 
              }}
              className="font-bold text-foreground transition-all duration-300"
            >
              Trova la tua location ideale
            </motion.h1>
            <motion.div
              animate={{ opacity: isCollapsed ? 0.7 : 1 }}
              className="flex items-center justify-between"
            >
              <p className="text-muted-foreground">
                {filteredLocations.length} location trovate
                {filters.query && ` per "${filters.query}"`}
              </p>
              
              {/* Sort and View Controls */}
              <div className="flex items-center gap-4">
                <select
                  value={filters.sortBy}
                  onChange={(e) => handleFiltersChange({ sortBy: e.target.value as any })}
                  className="bg-glass-card border border-glass-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                >
                  <option value="relevance">Rilevanza</option>
                  <option value="price_asc">Prezzo crescente</option>
                  <option value="price_desc">Prezzo decrescente</option>
                  <option value="rating">Rating</option>
                  <option value="name">Nome</option>
                  <option value="capacity">Capacità</option>
                </select>

                <div className="flex items-center gap-2">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setViewMode('grid')}
                    className={`px-4 py-2 rounded-lg transition-all duration-200 ${
                      viewMode === 'grid'
                        ? 'bg-primary text-white shadow-lg'
                        : 'bg-glass-card text-muted-foreground hover:text-foreground hover:bg-white/10'
                    }`}
                  >
                    Griglia
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setViewMode('map')}
                    className={`px-4 py-2 rounded-lg transition-all duration-200 ${
                      viewMode === 'map'
                        ? 'bg-primary text-white shadow-lg'
                        : 'bg-glass-card text-muted-foreground hover:text-foreground hover:bg-white/10'
                    }`}
                  >
                    Mappa
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>

          <div className="grid lg:grid-cols-4 gap-8">
            {/* Enhanced Filters Sidebar */}
            <motion.div 
              className="lg:col-span-1"
              animate={{ opacity: isCollapsed ? 0.8 : 1 }}
              transition={{ duration: 0.3 }}
            >
              <SearchFilters
                filters={filters}
                onFiltersChange={handleFiltersChange}
                onClearFilters={clearFilters}
              />
            </motion.div>

            {/* Main Content with Enhanced Animations */}
            <motion.div 
              className="lg:col-span-3"
              layout
              transition={{ duration: 0.3 }}
            >
              {viewMode === 'grid' ? (
                <SearchResults 
                  locations={filteredLocations} 
                  searchQuery={filters.query}
                  onFocus={setIsCollapsed}
                />
              ) : (
                <MapView locations={filteredLocations} />
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
