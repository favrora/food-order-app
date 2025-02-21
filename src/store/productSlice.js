import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../api/api";

// Fetch all products for selected categry
export const fetchProducts = createAsyncThunk("products/fetch", async (category) => {
  const { data } = await api.get(`category/${category}`);
  return data;
});

const productSlice = createSlice({
  name: "products",
  initialState: { list: [], loading: false, error: null },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => { state.loading = true; })
      .addCase(fetchProducts.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.list = payload;
      })
      .addCase(fetchProducts.rejected, (state, { error }) => {
        state.loading = false;
        state.error = error.message;
      });
  },
});

export default productSlice.reducer;
