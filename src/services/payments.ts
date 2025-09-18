/**
 * Payment service - handles all payment-related API calls
 */

import { api } from './api';
import type { 
  Payment, 
  CreatePaymentRequest, 
  PaymentStatus,
  ApiResponse 
} from '@/types';

export class PaymentService {
  // Create payment (Client only)
  async createPayment(data: CreatePaymentRequest): Promise<ApiResponse<Payment>> {
    return api.post<ApiResponse<Payment>>('/payments', data);
  }

  // Process payment with Stripe (Client only)
  async processPayment(paymentId: string, stripeToken: string): Promise<ApiResponse<Payment>> {
    return api.post<ApiResponse<Payment>>(`/payments/${paymentId}/process?stripeToken=${stripeToken}`);
  }

  // Get payment by ID
  async getPaymentById(id: string): Promise<ApiResponse<Payment>> {
    return api.get<ApiResponse<Payment>>(`/payments/${id}`);
  }

  // Get payment by booking ID
  async getPaymentByBookingId(bookingId: string): Promise<ApiResponse<Payment>> {
    return api.get<ApiResponse<Payment>>(`/payments/booking/${bookingId}`);
  }

  // Get client's payments
  async getMyPayments(): Promise<ApiResponse<Payment[]>> {
    return api.get<ApiResponse<Payment[]>>('/payments/my-payments');
  }

  // Refund payment (Provider only)
  async refundPayment(paymentId: string): Promise<ApiResponse<Payment>> {
    return api.post<ApiResponse<Payment>>(`/payments/${paymentId}/refund`);
  }

  // Update payment status (Provider only)
  async updatePaymentStatus(paymentId: string, status: PaymentStatus): Promise<ApiResponse<Payment>> {
    return api.put<ApiResponse<Payment>>(`/payments/${paymentId}/status?status=${status}`);
  }
}

export const paymentService = new PaymentService();