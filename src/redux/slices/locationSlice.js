import { createSlice } from '@reduxjs/toolkit';

const initialState = localStorage.getItem('selectedLocation')
  ? localStorage.getItem('selectedLocation')
  : null;

const locationSlice = createSlice({
  name: 'location',
  initialState,
  reducers: {
    setLocation: (_, action) => {
      localStorage.setItem('selectedLocation', action.payload);
      return action.payload;
    },
    clearLocation: () => {
      localStorage.removeItem('selectedLocation');
      return null;
    },
  },
});

export const { setLocation, clearLocation } = locationSlice.actions;
export default locationSlice.reducer;
