// 旅记 TravelLog — API Configuration
// USE_MOCK=true → local mockData  |  USE_MOCK=false → localhost:3000 backend

export const API_CONFIG = {
  /** Toggle mock mode: true = inline mock data, false = real backend */
  USE_MOCK: false as boolean,

  /** Backend base URL */
  BASE_URL: 'http://localhost:3000' as string,

  /** Request timeout (ms) */
  TIMEOUT: 10000 as number,
};
