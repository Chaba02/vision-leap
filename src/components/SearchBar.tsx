import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, MapPin, Users, DollarSign, Building } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { tunisianCities, venueTypes } from "@/data/locations";

interface SearchBarProps {
  onSearch: (filters: SearchFilters) => void;
}

export interface SearchFilters {
  city: string;
  venueType: string;
  capacity: string;
  priceRange: string;
  date: string;
  features: string[];
}

export const SearchBar = ({ onSearch }: SearchBarProps) => {
  const navigate = useNavigate();
  const [filters, setFilters] = useState<SearchFilters>({
    city: "",
    venueType: "",
    capacity: "",
    priceRange: "",
    date: "",
    features: [],
  });

  const handleSearch = () => {
    // Navigate to search page with filters as URL parameters
    const searchParams = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value && value !== 'all') {
        searchParams.set(key, value);
      }
    });
    
    navigate(`/search?${searchParams.toString()}`);
    
    // Also call the onSearch callback for backward compatibility
    onSearch(filters);
  };

  const priceRanges = [
    "0-2000",
    "2000-3500", 
    "3500-5000",
    "5000-7000",
    "7000-"
  ];

  const capacityRanges = [
    "0-50",
    "50-100",
    "100-150", 
    "150-200",
    "200-"
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
            <Select value={filters.city} onValueChange={(value) => setFilters({...filters, city: value})}>
              <SelectTrigger className="search-input">
                <SelectValue placeholder="Tutte le città" />
              </SelectTrigger>
              <SelectContent className="glass-card border-glass-border/50">
                <SelectItem value="all">Tutte le città</SelectItem>
                {tunisianCities.map((city) => (
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
            <Select value={filters.venueType} onValueChange={(value) => setFilters({...filters, venueType: value})}>
              <SelectTrigger className="search-input">
                <SelectValue placeholder="Tutti i tipi" />
              </SelectTrigger>
              <SelectContent className="glass-card border-glass-border/50">
                <SelectItem value="all">Tutti i tipi</SelectItem>
                {venueTypes.map((type) => (
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
            <Select value={filters.capacity} onValueChange={(value) => setFilters({...filters, capacity: value})}>
              <SelectTrigger className="search-input">
                <SelectValue placeholder="N° ospiti" />
              </SelectTrigger>
              <SelectContent className="glass-card border-glass-border/50">
                <SelectItem value="all">Qualsiasi</SelectItem>
                {capacityRanges.map((range) => (
                  <SelectItem key={range} value={range}>{range}</SelectItem>
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
            <Select value={filters.priceRange} onValueChange={(value) => setFilters({...filters, priceRange: value})}>
              <SelectTrigger className="search-input">
                <SelectValue placeholder="Budget" />
              </SelectTrigger>
              <SelectContent className="glass-card border-glass-border/50">
                <SelectItem value="all">Qualsiasi</SelectItem>
                {priceRanges.map((range) => (
                  <SelectItem key={range} value={range}>
                    {range === "0-2000" ? "Fino a €2000" :
                     range === "2000-3500" ? "€2000 - €3500" :
                     range === "3500-5000" ? "€3500 - €5000" :
                     range === "5000-7000" ? "€5000 - €7000" :
                     range === "7000-" ? "€7000+" : range}
                  </SelectItem>
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