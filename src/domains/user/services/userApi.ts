// 旅记 TravelLog — User API Service

import client from '../../../infrastructure/http/client';
import { isMockMode } from '../../../infrastructure/http/helpers';
import { mockCurrentUser, mockContents } from '../../../shared/utils/mockData';

export const UserApi = {
  async getProfile() {
    if (isMockMode()) return { ...mockCurrentUser, stats: { favCount: 3, contentCount: 2, commentCount: 5 } };
    const res = await client.get('/api/user/profile');
    return res.data.data;
  },

  async updateProfile(data: any) {
    if (isMockMode()) return {};
    const res = await client.put('/api/user/profile', data);
    return res.data.data;
  },

  async updateAvatar(avatar: string) {
    if (isMockMode()) return { avatar };
    const res = await client.post('/api/user/avatar', { avatar });
    return res.data.data;
  },

  async getFavorites(page = 1, pageSize = 10) {
    if (isMockMode()) return { list: mockContents.slice(0, 2).map(c => ({ ...c, isFavorited: true })), total: 2, page, pageSize, hasMore: false };
    const res = await client.get('/api/user/favorites', { params: { page, pageSize } });
    return res.data.data;
  },

  async getMyContents(page = 1, pageSize = 10) {
    if (isMockMode()) return { list: mockContents.slice(0, 2), total: 2, page, pageSize, hasMore: false };
    const res = await client.get('/api/user/contents', { params: { page, pageSize } });
    return res.data.data;
  },
};
