import { createSlice } from '@reduxjs/toolkit';
import { api } from '../../services/api';

const productSlice = createSlice({
  name: 'products',
  initialState: { list: [], loading: false, error: null },
  extraReducers: (builder) => {
    builder.addMatcher(
      api.endpoints.getProductsByCategory.matchPending,
      (state) => {
        state.loading = true;
      }
    );
    builder.addMatcher(
      api.endpoints.getProductsByCategory.matchFulfilled,
      (state, { payload }) => {
        state.loading = false;
        state.list = payload;
      }
    );
    builder.addMatcher(
      api.endpoints.getProductsByCategory.matchRejected,
      (state, { error }) => {
        state.loading = false;
        state.error = error.message;
      }
    );
  },
});

export default productSlice.reducer;
