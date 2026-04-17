import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlicer';

const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});
export default store;