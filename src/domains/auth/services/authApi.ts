// 旅记 TravelLog — Auth API Service

import client from '../../../infrastructure/http/client';
import { isMockMode } from '../../../infrastructure/http/helpers';
import {
  mockCurrentUser, mockIsLoggedIn,
} from '../../../shared/utils/mockData';

export interface LoginRequest { account: string; password: string }
export interface RegisterRequest { phone: string; code: string; password: string; username: string }
export interface SendCodeRequest { phone: string; type: string }
export interface ResetPasswordRequest { phone: string; code: string; newPassword: string }

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  user: { id: string; username: string; phone?: string; avatar: string | null };
}

export const AuthApi = {
  async sendCode(data: SendCodeRequest): Promise<{ expireIn: number }> {
    if (isMockMode()) return { expireIn: 300 };
    const res = await client.post('/api/auth/send-code', data);
    return res.data.data;
  },

  async register(data: RegisterRequest): Promise<AuthResponse> {
    if (isMockMode()) {
      return { accessToken: 'mock-at', refreshToken: 'mock-rt', user: { ...mockCurrentUser, phone: data.phone } };
    }
    const res = await client.post('/api/auth/register', data);
    return res.data.data;
  },

  async login(data: LoginRequest): Promise<AuthResponse> {
    if (isMockMode()) {
      return { accessToken: 'mock-at', refreshToken: 'mock-rt', user: mockCurrentUser };
    }
    const res = await client.post('/api/auth/login', data);
    return res.data.data;
  },

  async resetPassword(data: ResetPasswordRequest): Promise<void> {
    if (isMockMode()) return;
    await client.post('/api/auth/reset-password', data);
  },

  async refreshToken(refreshToken: string): Promise<{ accessToken: string; refreshToken: string }> {
    if (isMockMode()) return { accessToken: 'mock-at', refreshToken: 'mock-rt' };
    const res = await client.post('/api/auth/refresh-token', { refreshToken });
    return res.data.data;
  },
};
