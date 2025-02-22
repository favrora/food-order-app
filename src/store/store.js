import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./apiSlice";
import categoryReducer from "./categorySlice";
import productReducer from "./productSlice";
import cartReducer from "./cartSlice";
import locationReducer from "./locationSlice";

export default configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    categories: categoryReducer,
    products: productReducer,
    cart: cartReducer,
    location: locationReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});
