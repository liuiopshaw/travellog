// 旅记 TravelLog — API Service Helpers

import { API_CONFIG } from './api-config';

/**
 * Execute a callback only in real (non-mock) mode.
 * In mock mode, returns undefined (caller should use mock data).
 */
export async function realOnly<T>(fn: () => Promise<T>): Promise<T | undefined> {
  if (API_CONFIG.USE_MOCK) return undefined;
  return fn();
}

/** Check if mock mode is active */
export function isMockMode(): boolean {
  return API_CONFIG.USE_MOCK;
}
