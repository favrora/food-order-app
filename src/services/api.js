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

    createOrder: builder.mutation({
      // Real API request (uncomment when API is available)
      /*
      query: ({ cartItems, deliveryData }) => ({
        url: 'create-order',
        method: 'POST',
        body: {
          products: cartItems.map((item) => item.name),
          delivery: deliveryData,
        },
      }),
      */

      // Mocked API response (instant success)
      queryFn: async ({ cartItems, deliveryData }) => {
        console.log({
          message: 'Order successfully created!',
          products: cartItems.map((item) => item.name),
          delivery: deliveryData,
        });

        return { data: { success: true } };
      },
    }),

    getOrderStatus: builder.query({
      // Real API request (uncomment when API is available)
      /*
      query: (orderId) => ({
        url: `order-status/${orderId}`,
        method: 'GET',
      }),
      */

      // Mocked API response (instant success)
      queryFn: async () => {
        let status = 0;
        return new Promise((resolve) => {
          setTimeout(() => {
            status = 1;
            resolve({ data: { status } });
          }, 3000);
        });
      },
    }),
  }),
});

export const {
  useGetCategoriesQuery,
  useGetProductsByCategoryQuery,
  useCreateOrderMutation,
  useGetOrderStatusQuery,
} = api;
