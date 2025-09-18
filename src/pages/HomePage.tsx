/**
 * Home page - main landing page with hero section and search
 */

import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '@/components/layout/Navbar';
import { SearchBar } from '@/components/features/SearchBar';
import { LocationCard } from '@/components/features/LocationCard';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';
import { ErrorMessage } from '@/components/common/ErrorMessage';
import { useLocations } from '@/hooks/useLocations';
import { useAuth } from '@/hooks/useAuth';
import { useFavorites } from '@/hooks/useFavorites';
import type { LocationSearchParams } from '@/types';

const HomePage = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const { locations, isLoading, error, searchLocations, clearError } = useLocations();
  const { getFavorites } = useFavorites();

  // Load featured locations and user favorites on mount
  useEffect(() => {
    // Load featured locations (first 6)
    searchLocations({ limit: 6, sortBy: 'rating', sortOrder: 'desc' });

    // Load user favorites if authenticated and is client
    if (isAuthenticated && user?.role === 'CLIENT') {
      getFavorites();
    }
  }, [isAuthenticated, user, searchLocations, getFavorites]);

  const handleSearch = (params: LocationSearchParams) => {
    // Navigate to search page with params
    const searchParams = new URLSearchParams();
    if (params.city) searchParams.append('city', params.city);
    if (params.minGuests) searchParams.append('minGuests', params.minGuests.toString());
    if (params.maxPrice) searchParams.append('maxPrice', params.maxPrice.toString());
    
    navigate(`/search?${searchParams.toString()}`);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4">
        <div className="container mx-auto max-w-6xl">
          {/* Hero Content */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
              Trova la tua
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                {' '}location perfetta
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Scopri location uniche per matrimoni, eventi e occasioni speciali. 
              La tua giornata perfetta inizia qui.
            </p>
          </div>

          {/* Search Bar */}
          <SearchBar 
            onSearch={handleSearch}
            isLoading={isLoading}
            className="mb-16"
          />
        </div>
      </section>

      {/* Featured Locations */}
      <section className="pb-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Location in evidenza
            </h2>
            <p className="text-muted-foreground">
              Le location più apprezzate dalla nostra community
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <ErrorMessage 
              message={error} 
              onDismiss={clearError}
              className="mb-8"
            />
          )}

          {/* Loading State */}
          {isLoading && (
            <div className="flex justify-center py-12">
              <LoadingSpinner size="lg" />
            </div>
          )}

          {/* Locations Grid */}
          {!isLoading && locations.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {locations.map((location) => (
                <LocationCard
                  key={location.id}
                  location={location}
                  showActions={true}
                />
              ))}
            </div>
          )}

          {/* Empty State */}
          {!isLoading && locations.length === 0 && !error && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">
                Nessuna location trovata al momento.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-primary mb-2">500+</div>
              <div className="text-muted-foreground">Location disponibili</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">1000+</div>
              <div className="text-muted-foreground">Eventi realizzati</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">98%</div>
              <div className="text-muted-foreground">Clienti soddisfatti</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;