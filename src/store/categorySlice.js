import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../api/api";

// Fetch all categories
export const fetchCategories = createAsyncThunk("categories/fetch", async () => {
  const { data } = await api.get("getCategories");
  return data;
});

const categorySlice = createSlice({
  name: "categories",
  initialState: { list: [], loading: false, error: null },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => { state.loading = true; })
      .addCase(fetchCategories.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.list = payload;
      })
      .addCase(fetchCategories.rejected, (state, { error }) => {
        state.loading = false;
        state.error = error.message;
      });
  },
});

export default categorySlice.reducer;
