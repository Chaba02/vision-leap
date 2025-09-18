/**
 * Search page - displays search results with filters and pagination
 */

import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Filter, SortAsc, SortDesc, Search, X } from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { SearchBar } from '@/components/features/SearchBar';
import { LocationCard } from '@/components/features/LocationCard';
import SearchFilters from '@/components/SearchFilters';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';
import { ErrorMessage } from '@/components/common/ErrorMessage';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useLocations } from '@/hooks/useLocations';
import { useAuth } from '@/hooks/useAuth';
import { useFavorites } from '@/hooks/useFavorites';
import { PAGINATION } from '@/utils/constants';
import type { LocationSearchParams } from '@/types';
import { SearchFilters as SearchFiltersType } from '@/types/search';

const SearchPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { user, isAuthenticated } = useAuth();
  const { locations, pagination, isLoading, error, searchLocations, clearError } = useLocations();
  const { getFavorites } = useFavorites();
  
  const [sortBy, setSortBy] = useState<'price' | 'rating' | 'createdAt'>('rating');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<Partial<SearchFiltersType>>({});

  // Parse URL search params
  const getSearchParamsFromUrl = (): LocationSearchParams => {
    const params: LocationSearchParams = {
      page: currentPage,
      limit: PAGINATION.DEFAULT_LIMIT,
      sortBy,
      sortOrder,
    };

    const city = searchParams.get('city');
    const minGuests = searchParams.get('minGuests');
    const maxPrice = searchParams.get('maxPrice');

    if (city) params.city = city;
    if (minGuests) params.minGuests = parseInt(minGuests);
    if (maxPrice) params.maxPrice = parseInt(maxPrice);

    return params;
  };

  // Load search results and favorites
  useEffect(() => {
    const params = getSearchParamsFromUrl();
    searchLocations(params);

    // Load user favorites if authenticated and is client
    if (isAuthenticated && user?.role === 'CLIENT') {
      getFavorites();
    }
  }, [searchParams, currentPage, sortBy, sortOrder, isAuthenticated, user]);

  const handleSearch = (newParams: LocationSearchParams) => {
    // Update URL params
    const urlParams = new URLSearchParams();
    if (newParams.city) urlParams.set('city', newParams.city);
    if (newParams.minGuests) urlParams.set('minGuests', newParams.minGuests.toString());
    if (newParams.maxPrice) urlParams.set('maxPrice', newParams.maxPrice.toString());
    
    setSearchParams(urlParams);
    setCurrentPage(1); // Reset to first page
  };

  const handleSortChange = (newSortBy: string) => {
    setSortBy(newSortBy as 'price' | 'rating' | 'createdAt');
    setCurrentPage(1);
  };

  const handleOrderChange = () => {
    setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc');
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const generatePageNumbers = () => {
    if (!pagination) return [];
    
    const { page, totalPages } = pagination;
    const pages: number[] = [];
    
    // Show max 5 page numbers
    const maxVisible = 5;
    let start = Math.max(1, page - Math.floor(maxVisible / 2));
    let end = Math.min(totalPages, start + maxVisible - 1);
    
    // Adjust start if we're near the end
    if (end - start + 1 < maxVisible) {
      start = Math.max(1, end - maxVisible + 1);
    }
    
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    
    return pages;
  };

  const handleFiltersChange = (newFilters: Partial<SearchFiltersType>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
    // Convert filters to search params
    const params: LocationSearchParams = {
      page: 1,
      limit: PAGINATION.DEFAULT_LIMIT,
      sortBy,
      sortOrder,
    };
    
    if (newFilters.city) params.city = newFilters.city;
    // Add other filter conversions as needed
    
    setCurrentPage(1);
    searchLocations(params);
  };

  const handleClearFilters = () => {
    setFilters({});
    setSearchParams(new URLSearchParams());
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto max-w-7xl px-4">
          {/* Search Header */}
          <div className="glass-card p-6 mb-8">
            <SearchBar 
              onSearch={handleSearch}
              isLoading={isLoading}
              className="mb-6"
            />
            
            {/* Header with filters toggle */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex items-center gap-4">
                <div>
                  <h1 className="text-section text-foreground mb-1">
                    Risultati della ricerca
                  </h1>
                  {pagination && (
                    <p className="text-muted-foreground">
                      {pagination.total} location trovate
                    </p>
                  )}
                </div>
                
                {/* Mobile filters toggle */}
                <Button
                  variant="outline"
                  onClick={() => setShowFilters(!showFilters)}
                  className="sm:hidden flex items-center gap-2"
                >
                  {showFilters ? <X className="w-4 h-4" /> : <Filter className="w-4 h-4" />}
                  Filtri
                </Button>
              </div>

              {/* Sorting */}
              <div className="flex items-center gap-3">
                <Select value={sortBy} onValueChange={handleSortChange}>
                  <SelectTrigger className="w-40 glass-card">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="rating">Valutazione</SelectItem>
                    <SelectItem value="price">Prezzo</SelectItem>
                    <SelectItem value="createdAt">Più recenti</SelectItem>
                  </SelectContent>
                </Select>
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleOrderChange}
                  className="p-2 glass-card"
                >
                  {sortOrder === 'asc' ? <SortAsc className="w-4 h-4" /> : <SortDesc className="w-4 h-4" />}
                </Button>
              </div>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <ErrorMessage 
              message={error} 
              onDismiss={clearError}
              className="mb-8"
            />
          )}

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Filters Sidebar */}
            <div className={`lg:col-span-1 ${showFilters ? 'block' : 'hidden lg:block'}`}>
              <div className="sticky top-32">
                <SearchFilters
                  filters={filters}
                  onFiltersChange={handleFiltersChange}
                  onClearFilters={handleClearFilters}
                />
              </div>
            </div>

            {/* Results Column */}
            <div className="lg:col-span-3">
              {/* Loading State */}
              {isLoading && (
                <div className="flex justify-center py-20">
                  <LoadingSpinner size="lg" />
                </div>
              )}

              {/* Results Grid */}
              {!isLoading && locations.length > 0 && (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-12">
                    {locations.map((location) => (
                      <LocationCard
                        key={location.id}
                        location={location}
                        showActions={true}
                      />
                    ))}
                  </div>

                  {/* Pagination */}
                  {pagination && pagination.totalPages > 1 && (
                    <div className="flex justify-center items-center gap-2 glass-card p-4">
                      <Button
                        variant="outline"
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                      >
                        Precedente
                      </Button>

                      {generatePageNumbers().map((pageNum) => (
                        <Button
                          key={pageNum}
                          variant={pageNum === currentPage ? "default" : "outline"}
                          onClick={() => handlePageChange(pageNum)}
                          className="w-10"
                        >
                          {pageNum}
                        </Button>
                      ))}

                      <Button
                        variant="outline"
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === pagination.totalPages}
                      >
                        Successiva
                      </Button>
                    </div>
                  )}
                </>
              )}

              {/* Empty State */}
              {!isLoading && locations.length === 0 && !error && (
                <div className="text-center py-20 glass-card">
                  <div className="w-24 h-24 mx-auto bg-muted/30 rounded-full flex items-center justify-center mb-6 backdrop-blur-sm">
                    <Search className="w-12 h-12 text-muted-foreground" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-3">
                    Nessuna location trovata
                  </h3>
                  <p className="text-muted-foreground mb-8 max-w-md mx-auto">
                    Prova a modificare i filtri di ricerca o espandi i criteri per trovare più risultati.
                  </p>
                  <Button
                    onClick={handleClearFilters}
                    className="btn-primary"
                  >
                    Rimuovi tutti i filtri
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SearchPage;