// 旅记 TravelLog — Search API Service

import client from '../../../infrastructure/http/client';
import { isMockMode } from '../../../infrastructure/http/helpers';
import { mockContents } from '../../../shared/utils/mockData';

export const SearchApi = {
  async search(keyword: string, page = 1, pageSize = 10, sort = 'default') {
    if (isMockMode()) {
      const kw = keyword.toLowerCase();
      const list = mockContents.filter(c =>
        c.title.includes(keyword) || c.description.includes(keyword) ||
        c.tags.some(t => t.includes(keyword)) || c.region.includes(keyword) ||
        (c.category?.name && c.category.name.includes(keyword))
      );
      return { list, total: list.length, page, pageSize, hasMore: false };
    }
    const res = await client.get('/api/content/search', { params: { keyword, page, pageSize, sort } });
    return res.data.data;
  },

  async filter(params: { category?: string; region?: string; priceMin?: number; priceMax?: number; ratingMin?: number; page?: number; pageSize?: number; sort?: string }) {
    if (isMockMode()) {
      let list = [...mockContents];
      if (params.category) list = list.filter(c => c.category?.id === params.category);
      if (params.ratingMin) list = list.filter(c => c.rating >= params.ratingMin!);
      return { list, total: list.length, page: params.page || 1, pageSize: params.pageSize || 10, hasMore: false };
    }
    const res = await client.get('/api/content/filter', { params });
    return res.data.data;
  },

  async getHotKeywords() {
    if (isMockMode()) return { keywords: ['古镇', '海岛', '火锅', '雪山', '自驾', '赏秋', '潜水', '民宿', '樱花', '草原'] };
    const res = await client.get('/api/search/hot-keywords');
    return res.data.data;
  },

  async suggest(keyword: string) {
    if (isMockMode()) {
      const suggestions = mockContents
        .filter(c => c.title.includes(keyword) || c.region.includes(keyword))
        .map(c => c.title)
        .slice(0, 8);
      return { suggestions };
    }
    const res = await client.get('/api/search/suggest', { params: { keyword } });
    return res.data.data;
  },
};
