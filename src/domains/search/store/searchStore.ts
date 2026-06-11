// 旅记 TravelLog — Search Store (Zustand)

import { create } from 'zustand';
import { SearchApi } from '../services/searchApi';
import type { MockContent } from '../../../shared/utils/mockData';

interface SearchState {
  keyword: string;
  results: MockContent[];
  hotKeywords: string[];
  suggestions: string[];
  loading: boolean;
  total: number;
  page: number;
  hasMore: boolean;
  sort: string;

  search: (keyword: string, page?: number) => Promise<void>;
  searchWithFilters: (params: any) => Promise<void>;
  fetchHotKeywords: () => Promise<void>;
  suggest: (kw: string) => Promise<void>;
  setSort: (sort: string) => void;
  setKeyword: (kw: string) => void;
}

export const useSearchStore = create<SearchState>((set, get) => ({
  keyword: '',
  results: [],
  hotKeywords: [],
  suggestions: [],
  loading: false,
  total: 0,
  page: 1,
  hasMore: false,
  sort: 'default',

  search: async (keyword, page = 1) => {
    set({ loading: true, keyword });
    try {
      const res = await SearchApi.search(keyword, page);
      set({
        results: page === 1 ? res.list : [...get().results, ...res.list],
        total: res.total, page, hasMore: res.hasMore, loading: false,
      });
    } catch { set({ loading: false }); }
  },

  searchWithFilters: async (params) => {
    set({ loading: true });
    try {
      const res = await SearchApi.filter(params);
      set({ results: res.list, total: res.total, page: 1, hasMore: res.hasMore, loading: false });
    } catch { set({ loading: false }); }
  },

  fetchHotKeywords: async () => {
    const res = await SearchApi.getHotKeywords();
    set({ hotKeywords: res.keywords });
  },

  suggest: async (kw) => {
    if (kw.length < 1) { set({ suggestions: [] }); return; }
    try {
      const res = await SearchApi.suggest(kw);
      set({ suggestions: res.suggestions });
    } catch { /* ignore */ }
  },

  setSort: (sort) => set({ sort }),
  setKeyword: (kw) => set({ keyword: kw }),
}));
