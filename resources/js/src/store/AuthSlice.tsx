// src/features/auth/authSlice.ts
import { createSlice, PayloadAction, isFulfilled } from '@reduxjs/toolkit';
import { api } from '../api/api';

// User interface
interface User {
  id: number;
  name: string;
  email: string;
}

// Auth state
interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  user: null,
  loading: false,
  error: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    // FETCH USER
    builder.addMatcher(api.endpoints.fetchUser.matchPending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addMatcher(
      api.endpoints.fetchUser.matchFulfilled,
      (state, action: PayloadAction<User>) => {
        state.user = action.payload;
        state.isAuthenticated = true;
        state.loading = false;
      }
    );
    builder.addMatcher(api.endpoints.fetchUser.matchRejected, (state, action) => {
      state.user = null;
      state.isAuthenticated = false;
      state.error = action.error?.message || 'Failed to fetch user';
      state.loading = false;
    });

    // LOGIN
    builder.addMatcher(api.endpoints.login.matchPending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addMatcher(
      api.endpoints.login.matchFulfilled,
      (state, action: PayloadAction<User>) => {
        state.user = action.payload;
        state.isAuthenticated = true;
        state.loading = false;
      }
    );
    builder.addMatcher(api.endpoints.login.matchRejected, (state, action) => {
      state.user = null;
      state.isAuthenticated = false;
      state.error = action.error?.message || 'Login failed';
      state.loading = false;
    });

    // LOGOUT
    builder.addMatcher(api.endpoints.logout.matchFulfilled, (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.error = null;
    });
  },
});

export default authSlice.reducer;
