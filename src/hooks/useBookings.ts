/**
 * Bookings hook - manages booking data and operations
 */

import { useState, useCallback } from 'react';
import { bookingService } from '@/services/bookings';
import type { Booking, CreateBookingRequest, BookingStatus } from '@/types';

interface UseBookingsReturn {
  bookings: Booking[];
  currentBooking: Booking | null;
  isLoading: boolean;
  error: string | null;
  createBooking: (data: CreateBookingRequest) => Promise<Booking>;
  getBookingById: (id: string) => Promise<void>;
  getMyBookings: () => Promise<void>;
  getProviderBookings: () => Promise<void>;
  updateBookingStatus: (id: string, status: BookingStatus) => Promise<void>;
  cancelBooking: (id: string) => Promise<void>;
  clearError: () => void;
}

export const useBookings = (): UseBookingsReturn => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [currentBooking, setCurrentBooking] = useState<Booking | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createBooking = useCallback(async (data: CreateBookingRequest): Promise<Booking> => {
    try {
      setIsLoading(true);
      setError(null);
      
      const response = await bookingService.createBooking(data);
      setBookings(prev => [response.data, ...prev]);
      
      return response.data;
    } catch (err: any) {
      setError(err.message || 'Failed to create booking');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const getBookingById = useCallback(async (id: string) => {
    try {
      setIsLoading(true);
      setError(null);
      
      const response = await bookingService.getBookingById(id);
      setCurrentBooking(response.data);
    } catch (err: any) {
      setError(err.message || 'Failed to get booking');
      setCurrentBooking(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const getMyBookings = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const response = await bookingService.getMyBookings();
      setBookings(response.data);
    } catch (err: any) {
      setError(err.message || 'Failed to get your bookings');
      setBookings([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const getProviderBookings = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const response = await bookingService.getProviderBookings();
      setBookings(response.data);
    } catch (err: any) {
      setError(err.message || 'Failed to get provider bookings');
      setBookings([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const updateBookingStatus = useCallback(async (id: string, status: BookingStatus) => {
    try {
      setIsLoading(true);
      setError(null);
      
      const response = await bookingService.updateBookingStatus(id, status);
      
      // Update booking in list
      setBookings(prev => 
        prev.map(booking => 
          booking.id === id ? response.data : booking
        )
      );
      
      // Update current booking if it's the same
      if (currentBooking?.id === id) {
        setCurrentBooking(response.data);
      }
    } catch (err: any) {
      setError(err.message || 'Failed to update booking status');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [currentBooking]);

  const cancelBooking = useCallback(async (id: string) => {
    try {
      setIsLoading(true);
      setError(null);
      
      await bookingService.cancelBooking(id);
      
      // Remove booking from list
      setBookings(prev => prev.filter(booking => booking.id !== id));
      
      // Clear current booking if it was cancelled
      if (currentBooking?.id === id) {
        setCurrentBooking(null);
      }
    } catch (err: any) {
      setError(err.message || 'Failed to cancel booking');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [currentBooking]);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    bookings,
    currentBooking,
    isLoading,
    error,
    createBooking,
    getBookingById,
    getMyBookings,
    getProviderBookings,
    updateBookingStatus,
    cancelBooking,
    clearError,
  };
};