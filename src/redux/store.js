import { configureStore } from '@reduxjs/toolkit';
import toggleReducer from './toggleSlice';

const store = configureStore({
  reducer: {
    toggle: toggleReducer, // Add the toggle reducer
  },
});

export default store;