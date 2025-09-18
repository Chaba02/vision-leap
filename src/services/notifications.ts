/**
 * Notification service - handles all notification-related API calls
 */

import { api } from './api';
import type { Notification, ApiResponse } from '@/types';

export class NotificationService {
  // Get all notifications
  async getNotifications(): Promise<ApiResponse<Notification[]>> {
    return api.get<ApiResponse<Notification[]>>('/notifications');
  }

  // Get unread notifications
  async getUnreadNotifications(): Promise<ApiResponse<Notification[]>> {
    return api.get<ApiResponse<Notification[]>>('/notifications/unread');
  }

  // Get unread notifications count
  async getUnreadCount(): Promise<ApiResponse<{ count: number }>> {
    return api.get<ApiResponse<{ count: number }>>('/notifications/unread/count');
  }

  // Mark notification as read
  async markAsRead(id: string): Promise<ApiResponse<Notification>> {
    return api.put<ApiResponse<Notification>>(`/notifications/${id}/read`);
  }

  // Mark all notifications as read
  async markAllAsRead(): Promise<ApiResponse<void>> {
    return api.put<ApiResponse<void>>('/notifications/read-all');
  }

  // Delete notification
  async deleteNotification(id: string): Promise<ApiResponse<void>> {
    return api.delete<ApiResponse<void>>(`/notifications/${id}`);
  }
}

export const notificationService = new NotificationService();