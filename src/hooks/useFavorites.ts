/**
 * Favorites hook - manages favorite locations (Client only)
 */

import { useState, useCallback } from 'react';
import { favoriteService } from '@/services/favorites';
import type { Favorite } from '@/types';

interface UseFavoritesReturn {
  favorites: Favorite[];
  isLoading: boolean;
  error: string | null;
  addToFavorites: (locationId: string) => Promise<void>;
  removeFromFavorites: (locationId: string) => Promise<void>;
  getFavorites: () => Promise<void>;
  checkIsFavorite: (locationId: string) => Promise<boolean>;
  isFavorite: (locationId: string) => boolean;
  clearError: () => void;
}

export const useFavorites = (): UseFavoritesReturn => {
  const [favorites, setFavorites] = useState<Favorite[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const addToFavorites = useCallback(async (locationId: string) => {
    try {
      setIsLoading(true);
      setError(null);
      
      const response = await favoriteService.addToFavorites(locationId);
      setFavorites(prev => [response.data, ...prev]);
    } catch (err: any) {
      setError(err.message || 'Failed to add to favorites');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const removeFromFavorites = useCallback(async (locationId: string) => {
    try {
      setIsLoading(true);
      setError(null);
      
      await favoriteService.removeFromFavorites(locationId);
      setFavorites(prev => prev.filter(fav => fav.locationId !== locationId));
    } catch (err: any) {
      setError(err.message || 'Failed to remove from favorites');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const getFavorites = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const response = await favoriteService.getFavorites();
      setFavorites(response.data);
    } catch (err: any) {
      setError(err.message || 'Failed to get favorites');
      setFavorites([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const checkIsFavorite = useCallback(async (locationId: string): Promise<boolean> => {
    try {
      const response = await favoriteService.checkIsFavorite(locationId);
      return response.data.isFavorite;
    } catch (err) {
      console.error('Failed to check favorite status:', err);
      return false;
    }
  }, []);

  const isFavorite = useCallback((locationId: string): boolean => {
    return favorites.some(fav => fav.locationId === locationId);
  }, [favorites]);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    favorites,
    isLoading,
    error,
    addToFavorites,
    removeFromFavorites,
    getFavorites,
    checkIsFavorite,
    isFavorite,
    clearError,
  };
};