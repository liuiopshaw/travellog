// 旅记 TravelLog — Content Store (Zustand)

import { create } from 'zustand';
import { ContentApi } from '../services/contentApi';
import type { MockCategory, MockBanner, MockContent } from '../../../shared/utils/mockData';

interface ContentState {
  categories: MockCategory[];
  banners: MockBanner[];
  recommendList: MockContent[];
  currentDetail: MockContent | null;
  relatedList: MockContent[];
  loading: boolean;
  refreshing: boolean;
  detailLoading: boolean;
  page: number;
  hasMore: boolean;

  fetchHomeData: () => Promise<void>;
  refreshRecommend: () => Promise<void>;
  loadMore: () => Promise<void>;
  fetchDetail: (id: string) => Promise<void>;
  fetchRelated: (id: string) => Promise<void>;
}

export const useContentStore = create<ContentState>((set, get) => ({
  categories: [],
  banners: [],
  recommendList: [],
  currentDetail: null,
  relatedList: [],
  loading: true,
  refreshing: false,
  detailLoading: false,
  page: 1,
  hasMore: true,

  fetchHomeData: async () => {
    set({ loading: true });
    try {
      const [catRes, banRes, recRes] = await Promise.all([
        ContentApi.getCategories(),
        ContentApi.getBanners(),
        ContentApi.getRecommend(1, 10),
      ]);
      set({
        categories: catRes.list,
        banners: banRes.list,
        recommendList: recRes.list,
        page: 1,
        hasMore: recRes.hasMore ?? false,
        loading: false,
      });
    } catch {
      set({ loading: false });
    }
  },

  refreshRecommend: async () => {
    set({ refreshing: true });
    try {
      const res = await ContentApi.getRecommend(1, 10);
      set({ recommendList: res.list, page: 1, hasMore: res.hasMore ?? false, refreshing: false });
    } catch { set({ refreshing: false }); }
  },

  loadMore: async () => {
    const { page, hasMore, loading } = get();
    if (!hasMore || loading) return;
    const nextPage = page + 1;
    try {
      const res = await ContentApi.getRecommend(nextPage, 10);
      set({
        recommendList: [...get().recommendList, ...res.list],
        page: nextPage,
        hasMore: res.hasMore ?? false,
      });
    } catch { /* ignore */ }
  },

  fetchDetail: async (id) => {
    set({ detailLoading: true });
    try {
      const data = await ContentApi.getDetail(id);
      set({ currentDetail: data as MockContent, detailLoading: false });
    } catch { set({ detailLoading: false }); }
  },

  fetchRelated: async (id) => {
    try {
      const res = await ContentApi.getRelated(id);
      set({ relatedList: res.list });
    } catch { /* ignore */ }
  },
}));
