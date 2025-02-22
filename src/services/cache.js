import { CACHE_EXPIRATION } from '../config';

export const getCachedData = (url) => {
  try {
    const cached = localStorage.getItem(url);
    if (cached) {
      const { data, timestamp } = JSON.parse(cached);
      if (
        Array.isArray(data) &&
        data.length &&
        Date.now() - timestamp < CACHE_EXPIRATION
      ) {
        return data;
      }
    }
  } catch (error) {
    console.error('Error parsing cache:', error);
  }
  return null;
};

export const setCachedData = (url, data) => {
  if (Array.isArray(data) && data.length) {
    localStorage.setItem(url, JSON.stringify({ data, timestamp: Date.now() }));
  }
};
