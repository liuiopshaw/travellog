// 旅记 TravelLog — Notification API Service

import client from '../../../infrastructure/http/client';
import { isMockMode } from '../../../infrastructure/http/helpers';
import { mockNotifications } from '../../../shared/utils/mockData';

export const NotificationApi = {
  async getNotifications(page = 1, pageSize = 20) {
    if (isMockMode()) return { list: mockNotifications, total: mockNotifications.length, page, pageSize, hasMore: false };
    const res = await client.get('/api/notifications', { params: { page, pageSize } });
    return res.data.data;
  },

  async readAll() {
    if (isMockMode()) return {};
    const res = await client.put('/api/notifications/read-all');
    return res.data.data;
  },

  async getUnreadCount() {
    if (isMockMode()) return { count: mockNotifications.filter(n => !n.isRead).length };
    const res = await client.get('/api/notifications/unread-count');
    return res.data.data;
  },
};
