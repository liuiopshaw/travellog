// 旅记 TravelLog — HTTP Client
// Axios instance with Token injection + 401 auto-refresh

import axios, { AxiosError } from 'axios';
import { API_CONFIG } from './api-config';
import { TokenStorage } from '../storage/token-storage';

const client = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  timeout: API_CONFIG.TIMEOUT,
  headers: { 'Content-Type': 'application/json' },
});

// ── Request interceptor: inject access token ──
client.interceptors.request.use(async (config) => {
  const token = await TokenStorage.getAccessToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ── Response interceptor: handle 401 → refresh token ──
let isRefreshing = false;
let refreshQueue: Array<(token: string) => void> = [];

client.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as any;
    if (error.response?.status !== 401 || originalRequest._retry) {
      return Promise.reject(error);
    }
    originalRequest._retry = true;

    if (!isRefreshing) {
      isRefreshing = true;
      try {
        const refreshToken = await TokenStorage.getRefreshToken();
        if (!refreshToken) throw new Error('No refresh token');

        const res = await axios.post(`${API_CONFIG.BASE_URL}/api/auth/refresh-token`, { refreshToken });
        const { accessToken, refreshToken: newRt } = res.data.data;

        await TokenStorage.saveTokens(accessToken, newRt);
        isRefreshing = false;

        // Retry queued requests
        refreshQueue.forEach((cb) => cb(accessToken));
        refreshQueue = [];

        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return client(originalRequest);
      } catch {
        isRefreshing = false;
        refreshQueue = [];
        await TokenStorage.clear();
        return Promise.reject(error);
      }
    }

    // Queue the request while refreshing
    return new Promise((resolve) => {
      refreshQueue.push((token: string) => {
        originalRequest.headers.Authorization = `Bearer ${token}`;
        resolve(client(originalRequest));
      });
    });
  },
);

export default client;
