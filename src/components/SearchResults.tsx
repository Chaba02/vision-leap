import { useState } from "react";
import { motion } from "framer-motion";
import { LocationCard } from "@/components/LocationCard";
import { Button } from "@/components/ui/button";
import { Location } from "@/data/locations";
import { ChevronLeft, ChevronRight, Grid, List } from "lucide-react";

interface SearchResultsProps {
  locations: Location[];
  searchQuery?: string;
  onFocus?: (focused: boolean) => void;
}

const SearchResults = ({ locations, searchQuery, onFocus }: SearchResultsProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const itemsPerPage = 9;

  const totalPages = Math.ceil(locations.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentLocations = locations.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (locations.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-12"
      >
        <div className="glass-card p-12 rounded-2xl">
          <h3 className="text-xl font-semibold text-foreground mb-4">
            Nessuna location trovata
          </h3>
          <p className="text-muted-foreground mb-6">
            Prova a modificare i filtri per trovare la location perfetta per te
          </p>
          <Button 
            onClick={() => window.location.reload()}
            className="btn-primary"
          >
            Ricarica la ricerca
          </Button>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Results Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-foreground">
            Risultati della ricerca
          </h2>
          <p className="text-sm text-muted-foreground">
            {locations.length} location trovate
          </p>
        </div>
        
        <div className="flex items-center gap-2">
          <Button
            variant={viewMode === 'grid' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('grid')}
            className="p-2"
          >
            <Grid className="w-4 h-4" />
          </Button>
          <Button
            variant={viewMode === 'list' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('list')}
            className="p-2"
          >
            <List className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Results Grid/List */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className={
          viewMode === 'grid'
            ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            : "space-y-4"
        }
      >
        {currentLocations.map((location, index) => (
          <motion.div
            key={location.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className={viewMode === 'list' ? 'w-full' : ''}
          >
            <LocationCard 
              location={location} 
              variant={viewMode === 'list' ? 'horizontal' : 'vertical'}
            />
          </motion.div>
        ))}
      </motion.div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 pt-8">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="btn-secondary"
          >
            <ChevronLeft className="w-4 h-4 mr-1" />
            Precedente
          </Button>

          <div className="flex items-center gap-1">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
              // Show first page, last page, current page, and pages around current
              const shouldShow = 
                page === 1 || 
                page === totalPages || 
                (page >= currentPage - 1 && page <= currentPage + 1);

              if (!shouldShow) {
                // Show ellipsis for gaps
                if (page === 2 && currentPage > 4) {
                  return <span key={`ellipsis-${page}`} className="px-2 text-muted-foreground">...</span>;
                }
                if (page === totalPages - 1 && currentPage < totalPages - 3) {
                  return <span key={`ellipsis-${page}`} className="px-2 text-muted-foreground">...</span>;
                }
                return null;
              }

              return (
                <Button
                  key={page}
                  variant={currentPage === page ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => handlePageChange(page)}
                  className={
                    currentPage === page 
                      ? 'btn-primary' 
                      : 'btn-secondary'
                  }
                >
                  {page}
                </Button>
              );
            })}
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="btn-secondary"
          >
            Successiva
            <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        </div>
      )}

      {/* Results Summary */}
      <div className="text-center pt-4 border-t border-glass-border/30">
        <p className="text-sm text-muted-foreground">
          Mostrando {startIndex + 1}-{Math.min(endIndex, locations.length)} di {locations.length} location
        </p>
      </div>
    </div>
  );
};

export default SearchResults;
