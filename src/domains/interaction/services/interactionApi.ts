// 旅记 TravelLog — Interaction API Service

import client from '../../../infrastructure/http/client';
import { isMockMode } from '../../../infrastructure/http/helpers';
import { mockComments } from '../../../shared/utils/mockData';

export const InteractionApi = {
  async getComments(contentId: string, page = 1, pageSize = 20, sort = 'newest') {
    if (isMockMode()) return { list: mockComments, total: mockComments.length, page, pageSize, hasMore: false };
    const res = await client.get(`/api/content/${contentId}/comments`, { params: { page, pageSize, sort } });
    return res.data.data;
  },

  async createComment(contentId: string, content: string, parentId?: string, images?: string[]) {
    if (isMockMode()) return { id: 'cm-mock-new' };
    const res = await client.post(`/api/content/${contentId}/comments`, { content, parentId, images });
    return res.data.data;
  },

  async deleteComment(commentId: string) {
    if (isMockMode()) return {};
    const res = await client.delete(`/api/comments/${commentId}`);
    return res.data.data;
  },

  async like(contentId: string) {
    if (isMockMode()) return { liked: true };
    const res = await client.post(`/api/content/${contentId}/like`);
    return res.data.data;
  },

  async unlike(contentId: string) {
    if (isMockMode()) return { liked: false };
    const res = await client.delete(`/api/content/${contentId}/like`);
    return res.data.data;
  },

  async favorite(contentId: string) {
    if (isMockMode()) return { favorited: true };
    const res = await client.post(`/api/content/${contentId}/favorite`);
    return res.data.data;
  },

  async unfavorite(contentId: string) {
    if (isMockMode()) return { favorited: false };
    const res = await client.delete(`/api/content/${contentId}/favorite`);
    return res.data.data;
  },
};
