// 旅记 TravelLog — Browse History (AsyncStorage)

import AsyncStorage from '@react-native-async-storage/async-storage';
import type { MockContent } from '../../../shared/utils/mockData';

const KEY = 'travellog_browse_history';
const MAX = 50;

interface BrowseEntry {
  id: string;
  title: string;
  coverImage: string;
  region: string;
  rating: number;
  viewedAt: string;
}

export const BrowseHistory = {
  async getAll(): Promise<BrowseEntry[]> {
    const raw = await AsyncStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : [];
  },

  async add(content: MockContent): Promise<void> {
    const list = await this.getAll();
    const filtered = list.filter(e => e.id !== content.id);
    filtered.unshift({
      id: content.id,
      title: content.title,
      coverImage: content.coverImage,
      region: content.region || content.location,
      rating: content.rating,
      viewedAt: new Date().toISOString(),
    });
    await AsyncStorage.setItem(KEY, JSON.stringify(filtered.slice(0, MAX)));
  },

  async clear(): Promise<void> {
    await AsyncStorage.removeItem(KEY);
  },
};
