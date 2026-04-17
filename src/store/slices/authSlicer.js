import { createSlice } from '@reduxjs/toolkit';

const authSlicer = createSlice({
  name: 'auth',
  initialState: {
    token: null,
    user: null,
    isAuthenticated: false,
    loading: false,
  },
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    addToken: (state, action) => {
      state.token = action.payload.token;
      state.user = action.payload.user || null;
      state.isAuthenticated = true;
    },
    removeToken: (state) => {
      state.token = null;
      state.user = null;
      state.isAuthenticated = false;
    },
  },
});

export const { addToken, removeToken, setLoading } = authSlicer.actions;
export default authSlicer.reducer;
