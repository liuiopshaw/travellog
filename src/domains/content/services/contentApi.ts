// 旅记 TravelLog — Content API Service

import client from '../../../infrastructure/http/client';
import { isMockMode } from '../../../infrastructure/http/helpers';
import { mockContents, mockCategories, mockBanners } from '../../../shared/utils/mockData';

export const ContentApi = {
  async getCategories() {
    if (isMockMode()) return { list: mockCategories };
    const res = await client.get('/api/categories');
    return res.data.data;
  },

  async getBanners() {
    if (isMockMode()) return { list: mockBanners };
    const res = await client.get('/api/content/banners');
    return res.data.data;
  },

  async getRecommend(page = 1, pageSize = 10) {
    if (isMockMode()) {
      return { list: mockContents, total: mockContents.length, page, pageSize, hasMore: false };
    }
    const res = await client.get('/api/content/recommend', { params: { page, pageSize } });
    return res.data.data;
  },

  async getDetail(id: string) {
    if (isMockMode()) {
      const c = mockContents.find(x => x.id === id) || mockContents[0];
      return c;
    }
    const res = await client.get(`/api/content/${id}`);
    return res.data.data;
  },

  async getRelated(id: string) {
    if (isMockMode()) return { list: mockContents.slice(0, 3) };
    const res = await client.get(`/api/content/${id}/related`);
    return res.data.data;
  },

  async create(data: any) {
    if (isMockMode()) return { id: 'mock-new-id' };
    const res = await client.post('/api/content', data);
    return res.data.data;
  },

  async update(id: string, data: any) {
    if (isMockMode()) return { id };
    const res = await client.put(`/api/content/${id}`, data);
    return res.data.data;
  },
};
