// 旅记 TravelLog — Token Storage
// Persists accessToken + refreshToken in AsyncStorage

import AsyncStorage from '@react-native-async-storage/async-storage';

const KEYS = {
  ACCESS_TOKEN: 'travellog_access_token',
  REFRESH_TOKEN: 'travellog_refresh_token',
  USER: 'travellog_user',
};

export const TokenStorage = {
  async getAccessToken(): Promise<string | null> {
    return AsyncStorage.getItem(KEYS.ACCESS_TOKEN);
  },

  async getRefreshToken(): Promise<string | null> {
    return AsyncStorage.getItem(KEYS.REFRESH_TOKEN);
  },

  async saveTokens(accessToken: string, refreshToken: string): Promise<void> {
    await AsyncStorage.setItem(KEYS.ACCESS_TOKEN, accessToken);
    await AsyncStorage.setItem(KEYS.REFRESH_TOKEN, refreshToken);
  },

  async saveUser(user: any): Promise<void> {
    await AsyncStorage.setItem(KEYS.USER, JSON.stringify(user));
  },

  async getUser(): Promise<any | null> {
    const raw = await AsyncStorage.getItem(KEYS.USER);
    return raw ? JSON.parse(raw) : null;
  },

  async clear(): Promise<void> {
    await AsyncStorage.removeItem(KEYS.ACCESS_TOKEN);
    await AsyncStorage.removeItem(KEYS.REFRESH_TOKEN);
    await AsyncStorage.removeItem(KEYS.USER);
  },
};
