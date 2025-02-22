import { createSlice } from '@reduxjs/toolkit';

const loadCartFromStorage = () => {
  const storedCart = localStorage.getItem('cart');
  return storedCart ? JSON.parse(storedCart) : { items: [], total: 0 };
};

const cartSlice = createSlice({
  name: 'cart',
  initialState: loadCartFromStorage(),
  reducers: {
    addToCart: (state, { payload }) => {
      const existingItem = state.items.find(
        (item) => item.name === payload.name
      );
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...payload, quantity: 1 });
      }
      state.total = Math.max(
        0,
        state.total + parseFloat(payload.rating_quality)
      );
      localStorage.setItem('cart', JSON.stringify(state));
    },
    removeFromCart: (state, { payload }) => {
      const existingItem = state.items.find((item) => item.name === payload);
      if (existingItem) {
        if (existingItem.quantity > 1) {
          existingItem.quantity -= 1;
          state.total -= parseFloat(existingItem.rating_quality);
        } else {
          state.items = state.items.filter((item) => item.name !== payload);
          state.total -= parseFloat(existingItem.rating_quality);
        }
      }
      state.total = Math.max(0, state.total);
      localStorage.setItem('cart', JSON.stringify(state));
    },
    clearCart: (state) => {
      state.items = [];
      state.total = 0;
      localStorage.removeItem('cart');
    },
    loadCart: (state) => {
      const savedCart = loadCartFromStorage();
      state.items = savedCart.items;
      state.total = savedCart.total;
    },
  },
});

export const { addToCart, removeFromCart, clearCart, loadCart } =
  cartSlice.actions;
export default cartSlice.reducer;
