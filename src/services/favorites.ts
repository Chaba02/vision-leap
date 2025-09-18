/**
 * Favorites service - handles favorite locations (Client only)
 */

import { api } from './api';
import type { Favorite, ApiResponse } from '@/types';

export class FavoriteService {
  // Add location to favorites
  async addToFavorites(locationId: string): Promise<ApiResponse<Favorite>> {
    return api.post<ApiResponse<Favorite>>(`/favorites/${locationId}`);
  }

  // Remove location from favorites
  async removeFromFavorites(locationId: string): Promise<ApiResponse<void>> {
    return api.delete<ApiResponse<void>>(`/favorites/${locationId}`);
  }

  // Get user's favorite locations
  async getFavorites(): Promise<ApiResponse<Favorite[]>> {
    return api.get<ApiResponse<Favorite[]>>('/favorites');
  }

  // Check if location is in favorites
  async checkIsFavorite(locationId: string): Promise<ApiResponse<{ isFavorite: boolean }>> {
    return api.get<ApiResponse<{ isFavorite: boolean }>>(`/favorites/${locationId}/check`);
  }
}

export const favoriteService = new FavoriteService();