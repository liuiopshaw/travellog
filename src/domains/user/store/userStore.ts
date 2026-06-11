// 旅记 TravelLog — User Store (Zustand)

import { create } from 'zustand';
import { UserApi } from '../services/userApi';
import type { MockContent } from '../../../shared/utils/mockData';

interface UserProfile {
  id: string; username: string; phone: string; avatar: string | null; bio?: string; location?: string;
  stats?: { favCount: number; contentCount: number; commentCount: number };
}

interface UserState {
  profile: UserProfile | null;
  favorites: MockContent[];
  myContents: MockContent[];
  loading: boolean;

  fetchProfile: () => Promise<void>;
  fetchFavorites: () => Promise<void>;
  fetchMyContents: () => Promise<void>;
  updateProfile: (data: any) => Promise<void>;
}

export const useUserStore = create<UserState>((set) => ({
  profile: null,
  favorites: [],
  myContents: [],
  loading: false,

  fetchProfile: async () => {
    set({ loading: true });
    try {
      const data = await UserApi.getProfile();
      set({ profile: data, loading: false });
    } catch { set({ loading: false }); }
  },

  fetchFavorites: async () => {
    try {
      const res = await UserApi.getFavorites();
      set({ favorites: res.list });
    } catch { /* ignore */ }
  },

  fetchMyContents: async () => {
    try {
      const res = await UserApi.getMyContents();
      set({ myContents: res.list });
    } catch { /* ignore */ }
  },

  updateProfile: async (data) => {
    await UserApi.updateProfile(data);
    const profile = await UserApi.getProfile();
    set({ profile });
  },
}));
