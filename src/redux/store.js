import { configureStore } from '@reduxjs/toolkit';
import { api } from '../services/api';
import categoryReducer from './slices/categorySlice';
import productReducer from './slices/productSlice';
import cartReducer from './slices/cartSlice';
import locationReducer from './slices/locationSlice';

export default configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    categories: categoryReducer,
    products: productReducer,
    cart: cartReducer,
    location: locationReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});
