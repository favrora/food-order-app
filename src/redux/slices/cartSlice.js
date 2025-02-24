import { createSlice } from '@reduxjs/toolkit';

const loadCartFromStorage = () => {
  const storedCart = localStorage.getItem('cart');
  return storedCart ? JSON.parse(storedCart) : { items: [], total: 0 };
};

const saveCartToStorage = (state) => {
  localStorage.setItem('cart', JSON.stringify(state));
};

const cartSlice = createSlice({
  name: 'cart',
  initialState: loadCartFromStorage(),
  reducers: {
    addToCart: (state, { payload }) => {
      const existingItem = state.items.find(
        (item) => item.name === payload.name
      );

      const newQuantity =
        payload.quantity ?? (existingItem ? existingItem.quantity + 1 : 1);

      if (existingItem) {
        state.total +=
          (newQuantity - existingItem.quantity) *
          parseFloat(existingItem.rating_quality);
        existingItem.quantity = newQuantity;
      } else {
        state.items.push({ ...payload, quantity: newQuantity });
        state.total += newQuantity * parseFloat(payload.rating_quality);
      }

      state.total = Math.max(0, state.total);
      saveCartToStorage(state);
    },

    removeFromCart: (state, { payload }) => {
      const existingItem = state.items.find((item) => item.name === payload);
      if (existingItem) {
        state.total -= parseFloat(existingItem.rating_quality);
        if (existingItem.quantity > 1) {
          existingItem.quantity -= 1;
        } else {
          state.items = state.items.filter((item) => item.name !== payload);
        }
      }
      state.total = Math.max(0, state.total);
      saveCartToStorage(state);
    },

    clearItemFromCart: (state, { payload }) => {
      state.items = state.items.filter((item) => item.name !== payload);
      state.total = state.items.reduce(
        (sum, item) => sum + item.quantity * parseFloat(item.rating_quality),
        0
      );
      saveCartToStorage(state);
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

export const {
  addToCart,
  removeFromCart,
  clearItemFromCart,
  clearCart,
  loadCart,
} = cartSlice.actions;

export default cartSlice.reducer;
