/**
 * TypeScript type definitions for the entire application
 */

// User types
export type UserRole = 'CLIENT' | 'PROVIDER';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  phone?: string;
  avatar?: string;
  createdAt: string;
  updatedAt: string;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  name: string;
  role: UserRole;
  phone?: string;
}

// Location types
export interface Location {
  id: string;
  title: string;
  description: string;
  city: string;
  address: string;
  price: number;
  maxGuests: number;
  images: string[];
  amenities: string[];
  providerId: string;
  provider: User;
  rating: number;
  reviewCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface LocationSearchParams {
  city?: string;
  minGuests?: number;
  maxPrice?: number;
  page?: number;
  limit?: number;
  sortBy?: 'price' | 'rating' | 'createdAt';
  sortOrder?: 'asc' | 'desc';
}

export interface CreateLocationRequest {
  title: string;
  description: string;
  city: string;
  address: string;
  price: number;
  maxGuests: number;
  images: string[];
  amenities: string[];
}

// Booking types
export type BookingStatus = 'PENDING' | 'CONFIRMED' | 'CANCELLED' | 'COMPLETED';

export interface Booking {
  id: string;
  locationId: string;
  location: Location;
  clientId: string;
  client: User;
  checkIn: string;
  checkOut: string;
  guests: number;
  totalPrice: number;
  status: BookingStatus;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateBookingRequest {
  locationId: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  notes?: string;
}

// Payment types
export type PaymentStatus = 'PENDING' | 'COMPLETED' | 'FAILED' | 'REFUNDED';

export interface Payment {
  id: string;
  bookingId: string;
  booking: Booking;
  amount: number;
  status: PaymentStatus;
  stripePaymentId?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreatePaymentRequest {
  bookingId: string;
  amount: number;
}

// Favorites types
export interface Favorite {
  id: string;
  locationId: string;
  location: Location;
  userId: string;
  createdAt: string;
}

// Notification types
export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  isRead: boolean;
  type: 'booking' | 'payment' | 'system';
  relatedId?: string;
  createdAt: string;
}

// API Response types
export interface ApiResponse<T> {
  data: T;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface ApiError {
  message: string;
  code?: number;
  details?: any;
}

// UI State types
export interface LoadingState {
  isLoading: boolean;
  error: string | null;
}