/**
 * Search bar component for location search
 * Handles city search with filters
 */

import { useState } from 'react';
import { Search, MapPin, Users, Euro } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import type { LocationSearchParams } from '@/types';

interface SearchBarProps {
  onSearch: (params: LocationSearchParams) => void;
  isLoading?: boolean;
  className?: string;
}

export const SearchBar = ({ onSearch, isLoading = false, className }: SearchBarProps) => {
  const [searchParams, setSearchParams] = useState<LocationSearchParams>({
    city: '',
    minGuests: undefined,
    maxPrice: undefined,
  });

  const handleInputChange = (field: keyof LocationSearchParams, value: string | number) => {
    setSearchParams(prev => ({
      ...prev,
      [field]: value === '' ? undefined : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch({
      ...searchParams,
      page: 1, // Reset to first page on new search
    });
  };

  const handleQuickSearch = (city: string) => {
    const params = { ...searchParams, city, page: 1 };
    setSearchParams(params);
    onSearch(params);
  };

  return (
    <div className={className}>
      <Card className="p-6 shadow-lg border-0 glass-card">
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Main search row */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* City search */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                Destinazione
              </label>
              <Input
                placeholder="Dove vuoi andare?"
                value={searchParams.city || ''}
                onChange={(e) => handleInputChange('city', e.target.value)}
                className="glass-input"
              />
            </div>

            {/* Guests */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground flex items-center gap-2">
                <Users className="w-4 h-4" />
                Ospiti
              </label>
              <Input
                type="number"
                placeholder="Numero ospiti"
                min="1"
                value={searchParams.minGuests || ''}
                onChange={(e) => handleInputChange('minGuests', parseInt(e.target.value))}
                className="glass-input"
              />
            </div>

            {/* Max Price */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground flex items-center gap-2">
                <Euro className="w-4 h-4" />
                Prezzo max
              </label>
              <Input
                type="number"
                placeholder="€ per notte"
                min="0"
                value={searchParams.maxPrice || ''}
                onChange={(e) => handleInputChange('maxPrice', parseInt(e.target.value))}
                className="glass-input"
              />
            </div>

            {/* Search button */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-transparent">Search</label>
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full btn-primary flex items-center gap-2"
              >
                <Search className="w-4 h-4" />
                {isLoading ? 'Ricerca...' : 'Cerca'}
              </Button>
            </div>
          </div>

          {/* Quick city suggestions */}
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Destinazioni popolari:</p>
            <div className="flex flex-wrap gap-2">
              {['Roma', 'Milano', 'Firenze', 'Venezia', 'Napoli', 'Bologna'].map((city) => (
                <Button
                  key={city}
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => handleQuickSearch(city)}
                  className="glass-input border-glass-border/50 hover:bg-primary/10"
                >
                  {city}
                </Button>
              ))}
            </div>
          </div>
        </form>
      </Card>
    </div>
  );
};