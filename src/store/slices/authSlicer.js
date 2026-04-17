import { createSlice } from '@reduxjs/toolkit';

const token = localStorage.getItem('access_token');

const authSlicer = createSlice({
  name: 'auth',
  initialState: {
    token: token || null,
    user: null,
    isAuthenticated: !!token,
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
      localStorage.setItem('access_token', action.payload.token);
    },
    removeToken: (state) => {
      state.token = null;
      state.user = null;
      state.isAuthenticated = false;
      localStorage.removeItem('access_token');
    },
  },
});

export const { addToken, removeToken, setLoading } = authSlicer.actions;
export default authSlicer.reducer;
