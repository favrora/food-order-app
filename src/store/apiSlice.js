import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BASE_URL = "https://foodprint.p.rapidapi.com/api/foodprint/";
const CACHE_EXPIRATION = 1000 * 60 * 60 * 24; // 24 hours

const fetchWithCache = async (url) => {
  const cachedData = JSON.parse(localStorage.getItem(url));
  const now = Date.now();

  // Check if there is correct data in the cache
  if (cachedData && Array.isArray(cachedData.data) && cachedData.data.length > 0 && now - cachedData.timestamp < CACHE_EXPIRATION) {
    return cachedData.data;
  }

  try {
    const response = await fetch(url, {
      headers: {
        "x-rapidapi-host": "foodprint.p.rapidapi.com",
        "x-rapidapi-key": "0e0b5e80e5msh7e16c53a5b27a64p13843bjsna871f39189ca",
      },
    });

    if (!response.ok) throw new Error(`API error! Status: ${response.status}`);

    const data = await response.json();

    // Save to cache only if it is an array with categories/products
    if (Array.isArray(data) && data.length > 0) {
      localStorage.setItem(url, JSON.stringify({ data, timestamp: now }));
    }

    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return []; // Returning an empty array instead of an error
  }
};

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    getCategories: builder.query({
      queryFn: async () => {
        const data = await fetchWithCache(BASE_URL + "getCategories");
        return { data };
      },
    }),
    getProductsByCategory: builder.query({
      query: (category) => `category/${category}`,
      queryFn: async (category) => {
        const data = await fetchWithCache(BASE_URL + `category/${category}`);
        return { data };
      },
    }),
  }),
});

export const { useGetCategoriesQuery, useGetProductsByCategoryQuery } = apiSlice;
