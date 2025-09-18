/**
 * Locations hook - manages location data and search functionality
 */

import { useState, useCallback } from 'react';
import { locationService } from '@/services/locations';
import type { 
  Location, 
  LocationSearchParams, 
  CreateLocationRequest,
  PaginatedResponse 
} from '@/types';

interface UseLocationsReturn {
  locations: Location[];
  currentLocation: Location | null;
  pagination: PaginatedResponse<Location>['pagination'] | null;
  isLoading: boolean;
  error: string | null;
  searchLocations: (params: LocationSearchParams) => Promise<void>;
  getLocationById: (id: string) => Promise<void>;
  createLocation: (data: CreateLocationRequest) => Promise<Location>;
  updateLocation: (id: string, data: Partial<CreateLocationRequest>) => Promise<Location>;
  deleteLocation: (id: string) => Promise<void>;
  getMyLocations: () => Promise<void>;
  clearError: () => void;
}

export const useLocations = (): UseLocationsReturn => {
  const [locations, setLocations] = useState<Location[]>([]);
  const [currentLocation, setCurrentLocation] = useState<Location | null>(null);
  const [pagination, setPagination] = useState<PaginatedResponse<Location>['pagination'] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const searchLocations = useCallback(async (params: LocationSearchParams) => {
    try {
      setIsLoading(true);
      setError(null);
      
      const response = await locationService.searchLocations(params);
      setLocations(response.data);
      setPagination(response.pagination);
    } catch (err: any) {
      setError(err.message || 'Failed to search locations');
      setLocations([]);
      setPagination(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const getLocationById = useCallback(async (id: string) => {
    try {
      setIsLoading(true);
      setError(null);
      
      const response = await locationService.getLocationById(id);
      setCurrentLocation(response.data);
    } catch (err: any) {
      setError(err.message || 'Failed to get location');
      setCurrentLocation(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const createLocation = useCallback(async (data: CreateLocationRequest): Promise<Location> => {
    try {
      setIsLoading(true);
      setError(null);
      
      const response = await locationService.createLocation(data);
      return response.data;
    } catch (err: any) {
      setError(err.message || 'Failed to create location');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const updateLocation = useCallback(async (id: string, data: Partial<CreateLocationRequest>): Promise<Location> => {
    try {
      setIsLoading(true);
      setError(null);
      
      const response = await locationService.updateLocation(id, data);
      
      // Update current location if it's the same
      if (currentLocation?.id === id) {
        setCurrentLocation(response.data);
      }
      
      // Update in locations list
      setLocations(prev => 
        prev.map(loc => loc.id === id ? response.data : loc)
      );
      
      return response.data;
    } catch (err: any) {
      setError(err.message || 'Failed to update location');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [currentLocation]);

  const deleteLocation = useCallback(async (id: string) => {
    try {
      setIsLoading(true);
      setError(null);
      
      await locationService.deleteLocation(id);
      
      // Remove from locations list
      setLocations(prev => prev.filter(loc => loc.id !== id));
      
      // Clear current location if it was deleted
      if (currentLocation?.id === id) {
        setCurrentLocation(null);
      }
    } catch (err: any) {
      setError(err.message || 'Failed to delete location');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [currentLocation]);

  const getMyLocations = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const response = await locationService.getMyLocations();
      setLocations(response.data);
      setPagination(null); // Clear pagination for provider locations
    } catch (err: any) {
      setError(err.message || 'Failed to get your locations');
      setLocations([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    locations,
    currentLocation,
    pagination,
    isLoading,
    error,
    searchLocations,
    getLocationById,
    createLocation,
    updateLocation,
    deleteLocation,
    getMyLocations,
    clearError,
  };
};