import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getCachedData, setCachedData } from './cache';

const API_URL = import.meta.env.VITE_API_URL;
const HEADERS = {
  'x-rapidapi-host': import.meta.env.VITE_RAPIDAPI_HOST,
  'x-rapidapi-key': import.meta.env.VITE_RAPIDAPI_KEY,
};

const fetchWithCache = async (endpoint) => {
  const url = API_URL + endpoint;
  const cachedData = getCachedData(url);

  if (cachedData) return cachedData;

  try {
    const response = await fetch(url, { headers: HEADERS });
    if (!response.ok) throw new Error(`API error: ${response.status}`);

    const data = await response.json();

    setCachedData(url, data);

    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    return [];
  }
};

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
  endpoints: (builder) => ({
    getCategories: builder.query({
      queryFn: () => fetchWithCache('getCategories').then((data) => ({ data })),
    }),
    getProductsByCategory: builder.query({
      queryFn: (category) =>
        fetchWithCache(`category/${category}`).then((data) => ({ data })),
    }),
  }),
});

export const { useGetCategoriesQuery, useGetProductsByCategoryQuery } = api;
