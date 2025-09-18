/**
 * Location service - handles all location-related API calls
 */

import { api } from './api';
import type { 
  Location, 
  LocationSearchParams,
  CreateLocationRequest,
  ApiResponse,
  PaginatedResponse 
} from '@/types';

export class LocationService {
  // Get all locations with pagination and sorting
  async getLocations(params: LocationSearchParams = {}): Promise<PaginatedResponse<Location>> {
    const queryParams = new URLSearchParams();
    
    if (params.page) queryParams.append('page', params.page.toString());
    if (params.limit) queryParams.append('limit', params.limit.toString());
    if (params.sortBy) queryParams.append('sortBy', params.sortBy);
    if (params.sortOrder) queryParams.append('sortOrder', params.sortOrder);

    const endpoint = `/locations${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
    return api.get<PaginatedResponse<Location>>(endpoint);
  }

  // Search locations with filters
  async searchLocations(params: LocationSearchParams): Promise<PaginatedResponse<Location>> {
    const queryParams = new URLSearchParams();
    
    if (params.city) queryParams.append('city', params.city);
    if (params.minGuests) queryParams.append('minGuests', params.minGuests.toString());
    if (params.maxPrice) queryParams.append('maxPrice', params.maxPrice.toString());
    if (params.page) queryParams.append('page', params.page.toString());
    if (params.limit) queryParams.append('limit', params.limit.toString());
    if (params.sortBy) queryParams.append('sortBy', params.sortBy);
    if (params.sortOrder) queryParams.append('sortOrder', params.sortOrder);

    return api.get<PaginatedResponse<Location>>(`/locations/search?${queryParams.toString()}`);
  }

  // Get location by ID
  async getLocationById(id: string): Promise<ApiResponse<Location>> {
    return api.get<ApiResponse<Location>>(`/locations/${id}`);
  }

  // Create new location (Provider only)
  async createLocation(data: CreateLocationRequest): Promise<ApiResponse<Location>> {
    return api.post<ApiResponse<Location>>('/locations', data);
  }

  // Update location (Provider only)
  async updateLocation(id: string, data: Partial<CreateLocationRequest>): Promise<ApiResponse<Location>> {
    return api.put<ApiResponse<Location>>(`/locations/${id}`, data);
  }

  // Delete location (Provider only)
  async deleteLocation(id: string): Promise<ApiResponse<void>> {
    return api.delete<ApiResponse<void>>(`/locations/${id}`);
  }

  // Get provider's locations
  async getMyLocations(): Promise<ApiResponse<Location[]>> {
    return api.get<ApiResponse<Location[]>>('/locations/my-locations');
  }
}

export const locationService = new LocationService();