/**
 * Booking service - handles all booking-related API calls
 */

import { api } from './api';
import type { 
  Booking, 
  CreateBookingRequest, 
  BookingStatus,
  ApiResponse 
} from '@/types';

export class BookingService {
  // Create new booking (Client only)
  async createBooking(data: CreateBookingRequest): Promise<ApiResponse<Booking>> {
    return api.post<ApiResponse<Booking>>('/bookings', data);
  }

  // Get booking by ID
  async getBookingById(id: string): Promise<ApiResponse<Booking>> {
    return api.get<ApiResponse<Booking>>(`/bookings/${id}`);
  }

  // Get client's bookings
  async getMyBookings(): Promise<ApiResponse<Booking[]>> {
    return api.get<ApiResponse<Booking[]>>('/bookings/my-bookings');
  }

  // Get provider's bookings
  async getProviderBookings(): Promise<ApiResponse<Booking[]>> {
    return api.get<ApiResponse<Booking[]>>('/bookings/provider-bookings');
  }

  // Update booking status (Provider only)
  async updateBookingStatus(id: string, status: BookingStatus): Promise<ApiResponse<Booking>> {
    return api.put<ApiResponse<Booking>>(`/bookings/${id}/status?status=${status}`);
  }

  // Cancel booking
  async cancelBooking(id: string): Promise<ApiResponse<void>> {
    return api.delete<ApiResponse<void>>(`/bookings/${id}`);
  }
}

export const bookingService = new BookingService();