import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BASE_URL = "https://foodprint.p.rapidapi.com/api/foodprint/";
const HEADERS = {
  "x-rapidapi-host": "foodprint.p.rapidapi.com",
  "x-rapidapi-key": "0e0b5e80e5msh7e16c53a5b27a64p13843bjsna871f39189ca",
};
const CACHE_EXPIRATION = 1000 * 60 * 60 * 24; // 24 hours

const fetchWithCache = async (endpoint) => {
  const url = BASE_URL + endpoint;
  const now = Date.now();

  try {
    const cached = localStorage.getItem(url);
    if (cached) {
      const { data, timestamp } = JSON.parse(cached);
      if (Array.isArray(data) && data.length && now - timestamp < CACHE_EXPIRATION) {
        return data;
      }
    }
  } catch (error) {
    console.error("Error parsing cache:", error);
  }

  try {
    const response = await fetch(url, { headers: HEADERS });
    if (!response.ok) throw new Error(`API error: ${response.status}`);

    const data = await response.json();
    if (Array.isArray(data) && data.length) {
      localStorage.setItem(url, JSON.stringify({ data, timestamp: now }));
    }
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    getCategories: builder.query({ queryFn: () => fetchWithCache("getCategories").then((data) => ({ data })) }),
    getProductsByCategory: builder.query({ queryFn: (category) => fetchWithCache(`category/${category}`).then((data) => ({ data })) }),
  }),
});

export const { useGetCategoriesQuery, useGetProductsByCategoryQuery } = apiSlice;
