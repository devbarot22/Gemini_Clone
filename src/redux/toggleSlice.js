import { createSlice } from '@reduxjs/toolkit';

const toggleSlice = createSlice({
  name: 'toggle',
  initialState: {
    isToggled: false, // Initial state
  },
  reducers: {
    toggle: (state) => {
      state.isToggled = !state.isToggled; // Toggle the state
    },
  },
});

export const { toggle } = toggleSlice.actions;
export default toggleSlice.reducer;