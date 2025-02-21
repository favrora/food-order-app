import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    total: 0,
  },
  reducers: {
    addToCart: (state, { payload }) => {
      state.items.push(payload);
      state.total += parseFloat(payload.rating_quality); // Add the price to the total amount
    },
    removeFromCart: (state, { payload }) => {
      state.total -= parseFloat(state.items[payload].rating_quality); // Remove the price from the total amount
      state.items.splice(payload, 1);
    },
    clearCart: (state) => {
      state.items = [];
      state.total = 0;
    },
  },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
