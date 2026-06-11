// 旅记 TravelLog — Auth Store (Zustand)

import { create } from 'zustand';
import { AuthApi, AuthResponse } from '../services/authApi';
import { TokenStorage } from '../../../infrastructure/storage/token-storage';

interface AuthState {
  isLoggedIn: boolean;
  user: AuthResponse['user'] | null;
  loading: boolean;
  error: string | null;

  login: (account: string, password: string) => Promise<void>;
  register: (phone: string, code: string, password: string, username: string) => Promise<void>;
  logout: () => Promise<void>;
  restoreSession: () => Promise<void>;
  clearError: () => void;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  isLoggedIn: false,
  user: null,
  loading: false,
  error: null,

  login: async (account, password) => {
    set({ loading: true, error: null });
    try {
      const res = await AuthApi.login({ account, password });
      await TokenStorage.saveTokens(res.accessToken, res.refreshToken);
      await TokenStorage.saveUser(res.user);
      set({ isLoggedIn: true, user: res.user, loading: false });
    } catch (e: any) {
      set({ error: e.response?.data?.message || e.message || '登录失败', loading: false });
    }
  },

  register: async (phone, code, password, username) => {
    set({ loading: true, error: null });
    try {
      const res = await AuthApi.register({ phone, code, password, username });
      await TokenStorage.saveTokens(res.accessToken, res.refreshToken);
      await TokenStorage.saveUser(res.user);
      set({ isLoggedIn: true, user: res.user, loading: false });
    } catch (e: any) {
      set({ error: e.response?.data?.message || e.message || '注册失败', loading: false });
    }
  },

  logout: async () => {
    await TokenStorage.clear();
    set({ isLoggedIn: false, user: null, error: null });
  },

  restoreSession: async () => {
    const user = await TokenStorage.getUser();
    const token = await TokenStorage.getAccessToken();
    if (user && token) {
      set({ isLoggedIn: true, user });
    }
  },

  clearError: () => set({ error: null }),
}));
