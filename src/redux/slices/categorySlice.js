import { createSlice } from '@reduxjs/toolkit';
import { api } from '../../services/api';

const categorySlice = createSlice({
  name: 'categories',
  initialState: { list: [], selectedCategory: null },
  reducers: {
    setCategory: (state, action) => {
      state.selectedCategory = action.payload;
      localStorage.setItem('selectedCategory', action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      api.endpoints.getCategories.matchFulfilled,
      (state, { payload }) => {
        state.list = payload;
      }
    );
  },
});

export const { setCategory } = categorySlice.actions;
export default categorySlice.reducer;
