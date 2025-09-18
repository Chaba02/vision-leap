import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, MapPin, Users, DollarSign, Building } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { tunisianCities, venueTypes } from "@/data/locations";
import { SearchFilters, VenueType, City, PriceRange, CapacityRange } from "@/types/search";
import { serializeFiltersToURL } from "@/lib/search-utils";

interface SearchBarProps {
  onSearch: (filters: SearchFilters) => void;
}

export const SearchBar = ({ onSearch }: SearchBarProps) => {
  const navigate = useNavigate();
  const [filters, setFilters] = useState<SearchFilters>({
    query: '',
    city: City.ALL,
    venueType: VenueType.ALL,
    capacity: CapacityRange.ALL,
    priceRange: PriceRange.ALL,
    date: '',
    features: [],
    sortBy: 'relevance' as any
  });

  const handleSearch = () => {
    // Navigate to search page with standardized URL parameters
    const searchParams = serializeFiltersToURL(filters);
    navigate(`/search?${searchParams.toString()}`);
    
    // Also call the onSearch callback for backward compatibility
    onSearch(filters);
  };

  const priceRanges = [
    { value: PriceRange.BUDGET, label: "Fino a €2000" },
    { value: PriceRange.MEDIUM, label: "€2000 - €5000" },
    { value: PriceRange.PREMIUM, label: "€5000 - €7000" },
    { value: PriceRange.LUXURY, label: "€7000 - €10000" },
    { value: PriceRange.ULTRA_LUXURY, label: "€10000+" }
  ];

  const capacityRanges = [
    { value: CapacityRange.INTIMATE, label: "Fino a 50 ospiti" },
    { value: CapacityRange.SMALL, label: "50-100 ospiti" },
    { value: CapacityRange.MEDIUM, label: "100-200 ospiti" },
    { value: CapacityRange.LARGE, label: "200-500 ospiti" },
    { value: CapacityRange.EXTRA_LARGE, label: "500+ ospiti" }
  ];

  return (
    <div className="w-full max-w-6xl mx-auto px-4">
      <div className="glass-card p-6">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {/* Città */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground flex items-center gap-2">
              <MapPin className="w-4 h-4 text-primary" />
              Città
            </label>
            <Select value={filters.city} onValueChange={(value) => setFilters({...filters, city: value as City})}>
              <SelectTrigger className="search-input">
                <SelectValue placeholder="Tutte le città" />
              </SelectTrigger>
              <SelectContent className="glass-card border-glass-border/50">
                <SelectItem value={City.ALL}>Tutte le città</SelectItem>
                {Object.values(City).filter(city => city !== City.ALL).map((city) => (
                  <SelectItem key={city} value={city}>{city}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Tipo Location */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground flex items-center gap-2">
              <Building className="w-4 h-4 text-primary" />
              Tipo
            </label>
            <Select value={filters.venueType} onValueChange={(value) => setFilters({...filters, venueType: value as VenueType})}>
              <SelectTrigger className="search-input">
                <SelectValue placeholder="Tutti i tipi" />
              </SelectTrigger>
              <SelectContent className="glass-card border-glass-border/50">
                <SelectItem value={VenueType.ALL}>Tutti i tipi</SelectItem>
                {Object.values(VenueType).filter(type => type !== VenueType.ALL).map((type) => (
                  <SelectItem key={type} value={type}>{type}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Capienza */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground flex items-center gap-2">
              <Users className="w-4 h-4 text-primary" />
              Ospiti
            </label>
            <Select value={filters.capacity} onValueChange={(value) => setFilters({...filters, capacity: value as CapacityRange})}>
              <SelectTrigger className="search-input">
                <SelectValue placeholder="N° ospiti" />
              </SelectTrigger>
              <SelectContent className="glass-card border-glass-border/50">
                <SelectItem value={CapacityRange.ALL}>Qualsiasi</SelectItem>
                {capacityRanges.map((range) => (
                  <SelectItem key={range.value} value={range.value}>{range.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Budget */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-primary" />
              Budget
            </label>
            <Select value={filters.priceRange} onValueChange={(value) => setFilters({...filters, priceRange: value as PriceRange})}>
              <SelectTrigger className="search-input">
                <SelectValue placeholder="Budget" />
              </SelectTrigger>
              <SelectContent className="glass-card border-glass-border/50">
                <SelectItem value={PriceRange.ALL}>Qualsiasi</SelectItem>
                {priceRanges.map((range) => (
                  <SelectItem key={range.value} value={range.value}>{range.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Pulsante Cerca */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-transparent">Cerca</label>
            <Button 
              onClick={handleSearch}
              className="btn-primary w-full flex items-center gap-2"
            >
              <Search className="w-4 h-4" />
              Cerca
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};